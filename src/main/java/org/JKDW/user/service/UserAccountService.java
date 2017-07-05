package org.JKDW.user.service;

import java.util.List;
import java.util.Map;

import javax.persistence.NoResultException;
import javax.servlet.http.HttpServletRequest;

import org.JKDW.security.AppConstant;
import org.JKDW.security.TokenUtils;
import org.JKDW.user.model.DTO.StringRequestBody;
import org.JKDW.user.model.DTO.UserAccountCreateDTO;
import org.JKDW.user.model.DTO.UserAccountDTO;
import org.JKDW.user.model.DTO.UserAccountPasswordChangeDTO;
import org.JKDW.user.model.UserAccount;

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

	List<Map<String,Object>> getAllNicks();

	Boolean checkIfUsernameIsTaken(String username);

	Boolean checkIfEmailIsTaken(StringRequestBody email);

	Boolean checkIfNickIsTaken(String nick);

	UserAccount changePassword(UserAccountPasswordChangeDTO userAccountPasswordDTO);

	String getMyNickByToken(String username);

	static String getMyUsernameFromToken(HttpServletRequest request, TokenUtils tokenUtils){
		String myUsernameFromToken;
		String token;

		token = request.getHeader(AppConstant.tokenHeader);
		myUsernameFromToken= tokenUtils.getUsernameFromToken(token);

		return myUsernameFromToken;
	}

}
