package org.JKDW.user.service;


import org.JKDW.user.model.BannedUser;
import javax.persistence.NoResultException;

public interface BannedUserService {

    BannedUser createBanForUser(BannedUser bannedUser, Long id);

    void deleteBanForUser(Long id) throws NoResultException;

    BannedUser getInfoAboutBanByUsernameBannedUser(String username) throws NoResultException;

}
