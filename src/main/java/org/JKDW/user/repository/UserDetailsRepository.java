package org.JKDW.user.repository;

import org.JKDW.user.model.UserAccount;
import org.JKDW.user.model.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetails, Long>{
	UserDetails findByUserAccount(UserAccount userAccount);

}
