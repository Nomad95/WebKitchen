package org.JKDW.user.service;

import java.util.List;

import javax.persistence.NoResultException;

import org.JKDW.user.model.UserAccount;
import org.JKDW.user.model.UserDetails;
import org.JKDW.user.model.DTO.UserDetailsUpdateDTO;

public interface UserDetailsService {

	List<UserDetails> getAllUserDetails();
	
	//TODO: zamiast tej metody dojeb getUserDetailsbyId a ta dolna przerob  
	UserDetails getUserDetailsByUserAccount(Long id) throws NoResultException;
	
	UserDetailsUpdateDTO getUserDetailsDTOByUserAccount(Long id) throws NoResultException;
	
	UserDetails createUserDetails(UserDetails userDetails) throws NoResultException;
	
	UserDetails updateUserDetails(UserDetails userDetails) throws NoResultException;
	
	UserDetails updateUserDetailsDTO(UserDetailsUpdateDTO userDetails) throws NoResultException;
	
	void deleteUserDetails(Long id) throws NoResultException;

	
}
