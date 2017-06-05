package org.JKDW.user.service;

import java.util.Collection;
import java.util.List;

import javax.persistence.NoResultException;

import org.JKDW.user.model.DTO.UserAccountCreateDTO;
import org.JKDW.user.model.DTO.UserAccountDTO;
import org.JKDW.user.model.UserAccount;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

/*
 *
 * We need to change UserAccount to UserAccountDTO later
 *
 */
public interface UserAccountService {

	List<UserAccount> getAllUserAccounts();

	UserAccount getUserAccountById(Long id);

	UserAccountDTO getUserAccountDTOById(Long id);

	UserAccount createUserAccount(UserAccountCreateDTO userAccount);

	UserAccount updateUserAccount(UserAccount userAccount) throws NoResultException;

	void deleteUserAccount(Long id) throws NoResultException;

	UserAccount loadUserByUsername(String username);

	Long findIdOfUsersUsername(String username);

	Boolean checkIsUserBanned(String username);

	Boolean checkVariableIsBanned(String username);

	Boolean checkIfUserHasRoleAdmin();



}
