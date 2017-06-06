package org.JKDW.user.repository;

import org.JKDW.user.model.BannedUser;
import org.JKDW.user.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BannedUserRepository extends JpaRepository<BannedUser, Long> {
    BannedUser findByUserAccount(UserAccount userAccount);
}
