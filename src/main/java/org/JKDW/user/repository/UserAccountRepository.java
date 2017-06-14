package org.JKDW.user.repository;

import org.JKDW.user.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long>{
    UserAccount findByUsername(String username);

    UserAccount findByNick(String nick);
}
