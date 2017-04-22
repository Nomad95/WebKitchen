package org.JKDW.user.controller;

import java.util.List;

import org.JKDW.user.model.UserAccount;
import org.JKDW.user.model.UserDetails;
import org.JKDW.user.model.DTO.UserDetailsUpdateDTO;
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
@RequestMapping("/api/cuisines")
public class CuisinesController {

	@Autowired
	private UserDetailsService userDetailsService;

	/**
	 * 
	 * @return returns all users details
	 */
	@RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<UserDetails>> getUserDetails() {
		List<UserDetails> userDetails = userDetailsService.getAllUserDetails();
		return new ResponseEntity<>(userDetails, HttpStatus.OK);
	}

}