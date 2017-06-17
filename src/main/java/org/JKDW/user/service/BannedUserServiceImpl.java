package org.JKDW.user.service;


import org.JKDW.user.model.BannedUser;
import org.JKDW.user.model.UserAccount;
import org.JKDW.user.repository.BannedUserRepository;
import org.JKDW.user.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.NoResultException;

@Service
public class BannedUserServiceImpl implements BannedUserService{

    @Autowired
    private BannedUserRepository bannedUserRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;


    @Override
    public BannedUser createBanForUser(BannedUser bannedUser, Long idUserForBan) throws NoResultException,IllegalArgumentException {
        UserAccount userAccountForBan = userAccountRepository.findOne(idUserForBan);
        if(userAccountForBan == null)
            throw new NoResultException("Account for ban does not exist");
        else if(bannedUserRepository.findByUserAccount(userAccountForBan)!= null)
            throw new IllegalArgumentException("This account is already banned");
        bannedUser.setUserAccount(userAccountForBan);
        userAccountForBan.setIsBanned(true);

        bannedUserRepository.save(bannedUser);
        return bannedUser;
    }

    /** Argument od this method is id but not id of ban but id userAccount **/

    @Override
    public void deleteBanForUser(Long idUserWithBan) throws NoResultException {
        UserAccount foundBannedUserAccount = userAccountRepository.findOne(idUserWithBan);
        if(foundBannedUserAccount == null)
            throw new NoResultException("This user does not exisit");
        BannedUser foundBannedUser = bannedUserRepository.findByUserAccount(foundBannedUserAccount);
        if(foundBannedUser == null)
            throw new NoResultException("Can't delete this ban beacause this user hasn't ban");
        bannedUserRepository.delete(foundBannedUser);

        foundBannedUserAccount.setIsBanned(false);
        userAccountRepository.save(foundBannedUserAccount);
    }

    @Override
    public BannedUser getInfoAboutBanByUsernameBannedUser(String username) throws NoResultException {
        UserAccount foundBannedUserAccount = userAccountRepository.findByUsername(username);
        if(foundBannedUserAccount == null)
            throw new NoResultException("This user does not exisit");
        BannedUser foundedBanByUser = bannedUserRepository.findByUserAccount(foundBannedUserAccount);
        if(foundedBanByUser == null)
            throw new NoResultException("Can't delete this ban beacause this user hasn't ban");
        return foundedBanByUser;
    }
}
