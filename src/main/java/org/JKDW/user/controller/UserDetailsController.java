package org.JKDW.user.controller;

import java.util.List;

import javassist.NotFoundException;
import org.JKDW.user.model.DTO.UserDetailsAddressDTO;
import org.JKDW.user.model.DTO.UsersParticipationEventDTO;
import org.JKDW.user.model.Event;
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
@RequestMapping("/api/user/details")
public class UserDetailsController {

	@Autowired
	private UserDetailsService userDetailsService;

	/**
	 *
	 * @return returns all users details
	 */
	@RequestMapping( value="/all",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<UserDetails>> getUserDetails(){
		List<UserDetails> userDetails = userDetailsService.getAllUserDetails();
		return new ResponseEntity<>(userDetails,HttpStatus.OK);
	}

	/**
	 *
	 * @param id - id of details we want to find (not id of account)
	 * @return one user details
	 */
	@RequestMapping(value="/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDetails> getUserDetailsById(@PathVariable("id") Long id){
		UserDetails userDetails = userDetailsService.getUserDetailsbyId(id);
		return new ResponseEntity(userDetails,HttpStatus.OK);
	}

	/**
	 *
	 * @param userDetails - new details
	 * @return created details
	 */
	@RequestMapping(value="/create",method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDetails> createUserDetails(@RequestBody UserDetails userDetails){
		UserDetails createdUserDetails = userDetailsService.createUserDetails(userDetails);
		return new ResponseEntity(createdUserDetails,HttpStatus.CREATED);
	}

	/**
	 *
	 * @param userDetails to update
	 * @return updated user details
	 */
	@RequestMapping(value="/acc/{id}",method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDetails> updateUserDetails(@RequestBody UserDetails userDetails){
		UserDetails updatedUserDetails = userDetailsService.updateUserDetails(userDetails);
		return new ResponseEntity(updatedUserDetails,HttpStatus.OK);
	}

	/**
	 *
	 * @param id - id of deleting detail
	 */
	@RequestMapping(value="/{id}",method = RequestMethod.DELETE)
	public ResponseEntity deleteUserDetails(@PathVariable("id") Long id){
		userDetailsService.deleteUserDetails(id);
		return new ResponseEntity(HttpStatus.OK);
	}
	/**
	 * get UserDetailsDTO witch UserAccountDTO by UserAccount id
	 * @param id - id of account we want to find (not id of details)
	 * @return one user details
	 */
	@RequestMapping(value = "/account/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDetailsUpdateDTO> getUserDetailsUpdateDTO(@PathVariable("id") Long id) {
		UserDetailsUpdateDTO userDetailsDTO = userDetailsService.getUserDetailsDTOByUserAccountId(id);
		return new ResponseEntity<>(userDetailsDTO, HttpStatus.OK);
	}

	/**
	 * update UserDetails witch UserAccount by UserDetailsDTO and UserAccountDTO
	 * @param userDetailsDTO to update
	 * @return updated userDetails
	 */
	@RequestMapping(value="/{id}",method = RequestMethod.PUT, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDetailsUpdateDTO> updateUserDetailsUpdateDTO(@RequestBody UserDetailsUpdateDTO userDetailsDTO){
		UserDetails updatedUserDetails = userDetailsService.updateUserDetailsDTO(userDetailsDTO);
		return new ResponseEntity(updatedUserDetails,HttpStatus.OK);
	}

	/**
	 * This method checks whether user had fulfilled fields in his profile
	 * required to create new event. See Service for more
     */
	@RequestMapping(value="/eventcheck/cancreate/{userId}",method = RequestMethod.GET)
	public boolean canUserCreateEvent(@PathVariable("userId") Long userId){
		return userDetailsService.canCreateEvent(userId);
	}

	/**
	 * This method checks whether user had fulfilled fields in his profile
	 * required to join to evens. See Service for more
	 */
	@RequestMapping(value="/eventcheck/canjoin/{userId}",method = RequestMethod.GET)
	public boolean canUserJoinAnEvent(@PathVariable("userId") Long userId){
		return userDetailsService.canParticipate(userId);
	}

	/**
	 * //TODO: maybe add more fields??
	 * Finds all user events in which he participates
	 * @param userId user account id
	 * @return list of events
     */
	@RequestMapping(value="/events/{userId}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<UsersParticipationEventDTO>> getAllUsersEventsWhichHeParticipates(@PathVariable("userId") Long userId){
		try {
			return new ResponseEntity<>(userDetailsService.getAllUserEventsWhichHeParticipates(userId),HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	/**
	 * get UserDetailsAddressDTO by UserAccount id -
	 * @param id - id of account we want to find (not id of details)
	 * @return Full user address
	 */
	@RequestMapping(value = "/address/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDetailsAddressDTO> getUserAddress(@PathVariable("id") Long id) {
		UserDetailsAddressDTO userAddress = null;
		try {
			userAddress = userDetailsService.getUserAddressByUserAccountId(id);
			return new ResponseEntity<>(userAddress, HttpStatus.OK);
		} catch (NotFoundException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

	}
}
