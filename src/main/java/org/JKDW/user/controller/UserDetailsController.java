package org.JKDW.user.controller;

import java.util.List;

import org.JKDW.user.model.UserAccount;
import org.JKDW.user.model.UserDetails;
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

@RestController
@RequestMapping("/api/user/details")
public class UserDetailsController {
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@RequestMapping( name="/all",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<UserDetails>> getUserDetails(){
		List<UserDetails> userDetails = userDetailsService.getAllUserDetails();
		return new ResponseEntity<>(userDetails,HttpStatus.OK);
	}
	
/*	@RequestMapping(name="/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDetails> getUserDetailsByUser(@RequestBody UserAccount userAccount){
		UserDetails userDetails = userDetailsService.getUserDetailsByUser(userAccount);
		return new ResponseEntity(userDetails,HttpStatus.OK);
	}*/
	
	/**
	 * 
	 * @param userDetails - new details
	 * @param userAccount - to know to which user account we make new datails
	 * @return created details
	 */
	@RequestMapping(name="/create",method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDetails> createUserDetails(@RequestBody UserDetails userDetails,@RequestBody UserAccount userAccount){
		UserDetails createdUserDetails = userDetailsService.createUserDetails(userDetails, userAccount.getId());
		return new ResponseEntity(createdUserDetails,HttpStatus.CREATED);
	}
	
	/**
	 * //TODO Moze lepiej jak podamy id account a nie id detailsow?
	 * //TODO zmien request mapping
	 * @param userDetails to update
	 * @return updated user details
	 */
	@RequestMapping(name="/{id}",method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDetails> updateUserDetails(@RequestBody UserDetails userDetails){
		UserDetails updatedUserDetails = userDetailsService.updateUserDetails(userDetails);
		return new ResponseEntity(updatedUserDetails,HttpStatus.OK);
	}
	
	/**
	 * 
	 * @param id - id of deleting detail
	 */
	@RequestMapping(name="/{id}",method = RequestMethod.DELETE)
	public ResponseEntity deleteUserDetails(@PathVariable("id") Long id){
		userDetailsService.deleteUserDetails(id);
		return new ResponseEntity(HttpStatus.OK);
	}

}
