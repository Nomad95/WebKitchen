package org.JKDW.user.repository;

import org.JKDW.user.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAccountRepository extends JpaRepository<UserAccount, Long>{
    UserAccount findByUsername(String username);

    UserAccount findByNick(String nick);

    UserAccount findByEmail(String email);
}
