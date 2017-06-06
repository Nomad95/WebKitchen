package org.JKDW.user.service;

import java.util.List;

import javax.persistence.NoResultException;

import org.JKDW.user.model.DTO.UserAccountCreateDTO;
import org.JKDW.user.model.DTO.UserAccountDTO;
import org.JKDW.user.model.UserAccount;
import org.JKDW.user.repository.UserAccountRepository;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserAccountServiceImpl implements UserAccountService {

	@Autowired
	private UserAccountRepository userAccountRepository;

	@Autowired
	private SessionFactory sessionFactory;


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
	 * TODO: this can only use ADMIN or noone!
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
		newUserAccount.setAuthorities("ROLE_USER");
		userAccountRepository.save(newUserAccount);
		return newUserAccount;
	}


	/**
	 * @param userAccount - an account data we want to update
	 * @return updated account information
	 */
	@Override
	public UserAccount updateUserAccount(UserAccount userAccount) throws NoResultException{
		UserAccount foundUserAccount = userAccountRepository.findOne(userAccount.getId());
		if(foundUserAccount == null){
			throw new NoResultException("Cannot update account. Account doesn't exist");
		}

		userAccountRepository.save(userAccount);
		return userAccount;
	}


	/**
	 * @param id of deleted user account
	 */
	@Override
	public void deleteUserAccount(Long id) throws NoResultException{
		UserAccount foundUserAccount = userAccountRepository.findOne(id);
		if(foundUserAccount == null){
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

}
