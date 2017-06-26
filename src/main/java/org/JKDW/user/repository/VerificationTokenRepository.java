package org.JKDW.user.repository;

import org.JKDW.user.model.UserAccount;
import org.JKDW.user.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationTokenRepository
        extends JpaRepository<VerificationToken, Long> {

    VerificationToken findByToken(String token);

    VerificationToken findByUserAccount(UserAccount userAccount);
}
