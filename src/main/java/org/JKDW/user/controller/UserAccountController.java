package org.JKDW.user.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.JKDW.security.TokenUtils;
import org.JKDW.user.model.DTO.UserAccountPasswordChangeDTO;
import org.JKDW.user.model.DTO.StringRequestBody;
import org.JKDW.user.model.DTO.UserAccountCreateDTO;
import org.JKDW.user.model.DTO.UserAccountDTO;
import org.JKDW.user.model.UserAccount;
import org.JKDW.user.model.UserDetails;
import org.JKDW.user.model.VerificationToken;
import org.springframework.context.ApplicationEventPublisher;

import org.JKDW.user.service.UserAccountService;
import org.JKDW.user.service.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;


import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/user")
public class UserAccountController {

	/**
	 * we get project directory and add path to static\img path
	 */
	private static String UPLOADED_FOLDER = System.getProperty("user.dir") + "\\build\\generated-web-resources\\static\\img\\";


	@Autowired
	private UserAccountService userAccountService;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private TokenUtils tokenUtils;

	/**
	 *
	 * @return all user accounts
	 */
	@RequestMapping( value="/all",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<UserAccount>> getUserAccounts(){
		List<UserAccount> userAccounts = userAccountService.getAllUserAccounts();
		return new ResponseEntity<>(userAccounts,HttpStatus.OK);
	}

	/**
	 *
	 * @param name - username of user account
	 * @return	user specified by name
	 */
	@RequestMapping(value="/account/{name}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserAccount> getUserAccountByName(@PathVariable("name") String name ){
		UserAccount userAccount = userAccountService.loadUserByUsername(name);
		return new ResponseEntity<>(userAccount,HttpStatus.OK);
	}

	/**
	 *
	 * @param userAccount new user account info
	 * @return new user
	 * we use @valid annotation to validate passed object
	 */
	@RequestMapping(value="/create",method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserAccount> createUserAccount(@RequestBody @Valid UserAccountCreateDTO userAccount) {
		UserAccount createdUserAccount = userAccountService.createUserAccount(userAccount);
		//create details and link it with userAccount
		UserDetails userDetails = new UserDetails();
		userDetails.setUserAccount(createdUserAccount);
		userDetailsService.createUserDetails(userDetails);
		prepareUserDirectories(createdUserAccount.getNick()+"\\profilePhoto\\");

		//publish event to create email validation token
		try {
			String appUrl = request.getContextPath();
			eventPublisher.publishEvent(new OnRegistrationCompleteEvent
					(createdUserAccount, request.getLocale(), appUrl));
		} catch (Exception me) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>(createdUserAccount,HttpStatus.CREATED);
	}

	/**
	 *
	 * @param userAccount - data to update
	 * @return updated account information
	 */
	@RequestMapping(value="/{id}",method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserAccount> updateUserAccount(@RequestBody @Valid UserAccount userAccount){
		UserAccount updatedUserAccount = userAccountService.updateUserAccount(userAccount);
		return new ResponseEntity<>(updatedUserAccount,HttpStatus.OK);
	}

	/**
	 * @param id - id of deleting account
	 */
	@RequestMapping(value="/{id}",method = RequestMethod.DELETE)
	public ResponseEntity deleteUserAccount(@PathVariable("id") Long id){
		userAccountService.deleteUserAccount(id);
		return new ResponseEntity(HttpStatus.OK);
	}

	//TODO: Kondziu to twoja metoda?
	@RequestMapping(value = "/account/test/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserAccountDTO> getUserAccountByName(@PathVariable("id") Long id) {
		UserAccountDTO userAccountDTO = userAccountService.getUserAccountDTOById(id);
		return new ResponseEntity<>(userAccountDTO, HttpStatus.OK);
	}

	/**
	 * Finds id of user provided with username
	 * @param username username of user
	 * @return id of user
     */
	@RequestMapping(value="/account/{username}/getid", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Long> getUserIdWithUsername(@PathVariable("username") String username){
		Long idOfUsersUsername = userAccountService.findIdOfUsersUsername(username);
		return new ResponseEntity<>(idOfUsersUsername,HttpStatus.OK);
	}

	@RequestMapping(value = "/checkIsBanned/{username}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> checkIsUserBanned(@PathVariable("username") String username) {
        Boolean status = userAccountService.checkIsUserBanned(username);
        String stringStatus ="{\"status\": \""+ Boolean.toString(status) +"\"}";
		return new ResponseEntity<>(stringStatus, HttpStatus.OK);
	}

	@RequestMapping(value = "/isBanned/{username}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> checkVariableIsBanned(@PathVariable("username") String username) {
		Boolean status = userAccountService.checkIsUserBanned(username);
		String stringStatus ="{\"status\": \""+ Boolean.toString(status) +"\"}";
		return new ResponseEntity<>(stringStatus, HttpStatus.OK);
	}

	@RequestMapping(value = "/getMyRole", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> checkIfUserHasRoleAdmin() {
		if(userAccountService.checkIfUserHasRoleAdmin()){
			return new ResponseEntity<>("{\"role\": \"admin\"}", HttpStatus.OK);
		}

		else{
			return new ResponseEntity<>("{\"role\": \"user\"}", HttpStatus.OK);
		}
	}

	@RequestMapping( value="/nick/all",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Map<String,Object>>> getNickAllOfUsers(){
		List<Map<String,Object>> nicks = userAccountService.getAllNicks();
		return new ResponseEntity<>(nicks,HttpStatus.OK);
	}

	/**
	 * See service for more info
     */
	@RequestMapping( value="/registration/taken/username/{username}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> checkIfUsernameIsTaken(@PathVariable("username")String username){
		Boolean bool = userAccountService.checkIfUsernameIsTaken(username);
		return new ResponseEntity<>(bool,HttpStatus.OK);
	}

	/*
	i made this POST bcuz we cant pass email with coma to url. Email is sent with request body
	 */
	@RequestMapping(
			value="/registration/taken/email",
			method = RequestMethod.POST,
			produces = MediaType.APPLICATION_JSON_VALUE,
			consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> checkIfEmailIsTaken(@RequestBody StringRequestBody email) {
		Boolean bool = userAccountService.checkIfEmailIsTaken(email);
		return new ResponseEntity<>(bool, HttpStatus.OK);
	}

	@RequestMapping( value="/registration/taken/nick/{nick}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> checkIfNickIsTaken(@PathVariable("nick")String nick) {
		Boolean bool = userAccountService.checkIfNickIsTaken(nick);
		return new ResponseEntity<>(bool, HttpStatus.OK);
	}


	/**
	 *
	 * @param userAccountPasswordChangeDTO - id of UserAccount, oldPassword and newPassword
	 * @return updated account information
	 */
	@RequestMapping(value="/changePassword/{id}",method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserAccount> updateUserAccount(@RequestBody UserAccountPasswordChangeDTO userAccountPasswordChangeDTO){
		UserAccount updatedUserAccount = userAccountService.changePassword(userAccountPasswordChangeDTO);
		return new ResponseEntity<>(updatedUserAccount,HttpStatus.OK);
	}

	void prepareUserDirectories(String additionalPath) {
		//create directory if doesn't exist
		File userDirectory = new File(UPLOADED_FOLDER + additionalPath);
		File mainDirectory = new File(UPLOADED_FOLDER);
		mainDirectory.setReadable(true);
		if (!userDirectory.exists()) {
			userDirectory.mkdirs();
			// If you require it to make the entire directory path including parents,
			// use directory.mkdirs(); here instead.
		}

		copyDefaultProfilePhoto(Paths.get(UPLOADED_FOLDER + "profile.jpg"),Paths.get(UPLOADED_FOLDER + additionalPath + "profile.jpg"));
	}
	void copyDefaultProfilePhoto(Path sourcePath, Path targetPath){
		try {
			Files.copy(sourcePath,targetPath);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	@RequestMapping(value = "/myNick", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> getMyNick(HttpServletRequest request) {
		String nick = userAccountService.getMyNickByToken(UserAccountService.getMyUsernameFromToken(request, this.tokenUtils));
		return new ResponseEntity<>("{\"nick\": \"" + nick + "\"}", HttpStatus.OK);
	}

	@RequestMapping(value = "/registration/confirm", method = RequestMethod.GET)
	public ResponseEntity<Boolean> confirmRegistration(@RequestParam("token") String token) {

		VerificationToken verificationToken = userAccountService.getVerificationToken(token);
		//token not provided
		if (verificationToken == null)
			return new ResponseEntity<>(false,HttpStatus.BAD_REQUEST);

		UserAccount userAccount = verificationToken.getUserAccount();
		//Calendar cal = Calendar.getInstance();
		//token expired //TODO: zaimplementowac to ( narazie odpuszczam)
		/*if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0)
			return new ResponseEntity<>(false,HttpStatus.PRECONDITION_FAILED);*/

		userAccount.setEnabled(true);
		userAccountService.updateUserAccount(userAccount);
		return new ResponseEntity<>(true,HttpStatus.OK);
	}

}
