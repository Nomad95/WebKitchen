package org.JKDW.user.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.time.LocalDate;

import java.time.ZoneId;
import java.util.*;

import javax.persistence.NoResultException;
import javax.sql.DataSource;

import org.JKDW.user.model.BannedUser;
import org.JKDW.user.model.DTO.StringRequestBody;
import org.JKDW.user.model.DTO.UserAccountCreateDTO;
import org.JKDW.user.model.DTO.UserAccountDTO;
import org.JKDW.user.model.UserAccount;
import org.JKDW.user.repository.BannedUserRepository;
import org.JKDW.user.repository.UserAccountRepository;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserAccountServiceImpl implements UserAccountService {

    static String ADMIN = "ROLE_ADMIN";

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private SessionFactory sessionFactory;

    @Autowired
    private DataSource dataSource;

    @Autowired
    private BannedUserRepository bannedUserRepository;


    /**
     * @return Returns all user accounts
     */
    @Override
    public List<UserAccount> getAllUserAccounts() {
        List<UserAccount> accounts = userAccountRepository.findAll();
        return accounts;
    }


    /**
     * @param id of user account we want to find
     * @return returns one account specified by an id
     * TODO: this can only use ADMIN
     */
    @Override
    public UserAccount getUserAccountById(Long id) {
        UserAccount account = userAccountRepository.findOne(id);
        return account;
    }

    /**
     * @param id
     * @return we return info about account
     * without password etc
     */
    @Override
    public UserAccountDTO getUserAccountDTOById(Long id) {
        UserAccount userAccount = userAccountRepository.findOne(id);
        System.out.println(userAccount);
        UserAccountDTO userAccountDTO = new UserAccountDTO(
                userAccount.getId(),
                userAccount.getUsername(),
                userAccount.getEmail(),
                userAccount.getCountry(),
                userAccount.getNick(),
                userAccount.getLastLogged(),
                userAccount.getIsFilled(),
                userAccount.getIsVerified(),
                userAccount.getCreatedAt()
        );
        return userAccountDTO;
    }


    /**
     * @param userAccount - new account information
     * @return returns new account
     * @throws Exception when an account with specified id exists
     */
    @Override
    public UserAccount createUserAccount(UserAccountCreateDTO userAccount) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        UserAccount newUserAccount = new UserAccount(userAccount);
        newUserAccount.setPassword(passwordEncoder.encode(userAccount.getPassword()));
        newUserAccount.setIsFilled(false);
        newUserAccount.setIsVerified(false);
        newUserAccount.setIsBanned(false);
        newUserAccount.setAuthorities("ROLE_USER");
        userAccountRepository.save(newUserAccount);
        return newUserAccount;
    }


    /**
     * @param userAccount - an account data we want to update
     * @return updated account information
     */
    @Override
    public UserAccount updateUserAccount(UserAccount userAccount) throws NoResultException {
        UserAccount foundUserAccount = userAccountRepository.findOne(userAccount.getId());
        if (foundUserAccount == null) {
            throw new NoResultException("Cannot update account. Account doesn't exist");
        }

        userAccountRepository.save(userAccount);
        return userAccount;
    }

    /**
     * @param id of deleted user account
     */
    @Override
    public void deleteUserAccount(Long id) throws NoResultException {
        UserAccount foundUserAccount = userAccountRepository.findOne(id);
        if (foundUserAccount == null) {
            throw new NoResultException("Cannot delete account. Account not found");
        }

        userAccountRepository.delete(id);

    }

    @Override
    @Transactional
    public UserAccount loadUserByUsername(String username) {
        return (UserAccount) sessionFactory.getCurrentSession()
                .createCriteria(UserAccount.class)
                .add(Restrictions.eq("username", username))
                .uniqueResult();
    }

    /**
     * Method return value variable of UserAccout: isBanned.
     * Checking if user still has ban. If hasn't ban - unlock user or if he still has - just return true *
     **/
    @Override
    @Transactional
    public Boolean checkIsUserBanned(String username) {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        String sql = "SELECT id, is_banned FROM USER_ACCOUNT WHERE USERNAME = ?";

        UserAccount userAccount = jdbcTemplate.queryForObject(sql, new Object[]{username}, new RowMapper<UserAccount>() {
            @Override
            public UserAccount mapRow(ResultSet rs, int rowNum) throws SQLException {
                UserAccount userAccount = new UserAccount();
                userAccount.setId(rs.getLong("id"));
                userAccount.setIsBanned(rs.getBoolean("is_banned"));
                return userAccount;
            }
        });

        if (userAccount.getIsBanned())
           return checkThatBanIsFinished(userAccount, jdbcTemplate);
        else
           return userAccount.getIsBanned();
    }

    /** Checking if user has ban. Method invoked at every action logged user. **/

    @Override
    @Transactional
    public Boolean checkVariableIsBanned(String username) {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        String sql = "SELECT is_banned FROM USER_ACCOUNT WHERE USERNAME = ?";
        Boolean userAccountStatus =(Boolean) jdbcTemplate.queryForObject(sql, new Object[] { username }, Boolean.class);
        return userAccountStatus;
    }

    @Override
    public Boolean checkIfUserHasRoleAdmin() {
        Boolean isAdmin = false;
        /* Pobiera z SecuirtyUser role w formacie [ROLE_TYP] */
        Collection<SimpleGrantedAuthority> authorities = (Collection<SimpleGrantedAuthority>) SecurityContextHolder.getContext().getAuthentication().getAuthorities();
        System.out.println("W kontexcie jestem "+ authorities);
        for( SimpleGrantedAuthority element : authorities){
            if(element.toString().equals(ADMIN)) {
                isAdmin = true;
            }
        }
       return isAdmin;
    }

    public void deleteBanFromUserAfterTime(UserAccount user) {
        UserAccount foundUserAccountWithBan = userAccountRepository.findOne(user.getId());
        BannedUser foundBannedUser = bannedUserRepository.findByUserAccount(foundUserAccountWithBan);
        if (foundBannedUser == null)
            throw new NoResultException("Can't delete this ban beacause this user hasn't ban");
        bannedUserRepository.delete(foundBannedUser);
    }

    public boolean checkThatBanIsFinished(UserAccount userAccount, JdbcTemplate jdbcTemplate) {
        LocalDate localDate = LocalDate.now();
        Date date = java.sql.Date.valueOf(localDate);
        Date time = new Date();
        SimpleDateFormat parser = new SimpleDateFormat("HH:mm:ss");
        Time timeParsed = java.sql.Time.valueOf(parser.format(time));

        UserAccount bannedUserAccount = userAccountRepository.findOne(userAccount.getId());
        BannedUser bannedUser = bannedUserRepository.findByUserAccount(bannedUserAccount);

        Date firstDateEndOfBan = bannedUser.getDateEndOfBan();
        Time timeEndOfBan = bannedUser.getTimeEndOfBan();

        /* Start Delete timeZone from dateEndOfBan */
        LocalDate helpVariableWithEndDateOfBan = firstDateEndOfBan.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        Date dateEndOfBan = java.sql.Date.valueOf(helpVariableWithEndDateOfBan);

        if (date.before(dateEndOfBan)) {
            return true;
        } else if (date.after(dateEndOfBan)) {
            deleteBanFromUserAfterTime(userAccount);
            setStatusBannedInUserAccount(jdbcTemplate, false, userAccount.getId());
            return false;
        } else if (date.equals(dateEndOfBan)) {
            if (timeParsed.after(timeEndOfBan)) {
                deleteBanFromUserAfterTime(userAccount);
                setStatusBannedInUserAccount(jdbcTemplate, false, userAccount.getId());
                return false;
            } else
                return true;
        } else
            return true;
    }

    public void setStatusBannedInUserAccount(JdbcTemplate jdbcTemplate, boolean status, Long idUser) {
        jdbcTemplate.update(
                "update user_account set is_banned = ? where id = ?",
                status, idUser);
    }

	/**
	 * Finds users Id with provided username
	 * @param username of userAccount
	 * @return id of user
     */
	@Override
    @Transactional
	public Long findIdOfUsersUsername(String username) {
		UserAccount userAccount = loadUserByUsername(username);
		if(userAccount == null)
			return -1L;
		return userAccount.getId();
	}

    @Override
    public  List<Map<String, Object>> getAllNicks() {
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        String sql = "SELECT nick FROM USER_ACCOUNT";

        return jdbcTemplate.queryForList(sql);
    }

    /**
     * Checks if username is taken, if is returns true if not false
     */
    @Override
    public Boolean checkIfUsernameIsTaken(String username) {
        UserAccount byUsername = userAccountRepository.findByUsername(username);
        return byUsername != null;
    }

    /**
     * Checks if email is taken, if is returns true if not false
     */
    @Override
    public Boolean checkIfEmailIsTaken(StringRequestBody email) {
        System.out.println(email);
        UserAccount byEmail = userAccountRepository.findByEmail(email.getEmail());
        return byEmail != null;
    }

    /**
     * Checks if nick is taken, if is returns true if not false
     */
    @Override
    public Boolean checkIfNickIsTaken(String nick) {
        UserAccount byNick = userAccountRepository.findByNick(nick);
        return byNick != null;
    }
}


