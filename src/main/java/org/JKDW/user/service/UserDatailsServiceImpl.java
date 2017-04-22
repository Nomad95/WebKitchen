package org.JKDW.user.service;

import java.util.List;

import javax.persistence.NoResultException;

import org.JKDW.user.model.UserAccount;
import org.JKDW.user.model.UserDetails;
import org.JKDW.user.model.DTO.UserAccountDTO;
import org.JKDW.user.model.DTO.UserDetailsUpdateDTO;
import org.JKDW.user.repository.UserAccountRepository;
import org.JKDW.user.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 *
 * @author Igor
 * Te serwisy trzeba ulepszyc narazie niech bedzie ten podstawowy crud
 */
@Service
public class UserDatailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserDetailsRepository userDetailsRepository;
	
	@Autowired
	private UserAccountRepository userAccountRepository;


	/**
	 * @return returns all users details
	 */
	@Override
	public List<UserDetails> getAllUserDetails() {
		return userDetailsRepository.findAll();
	}


	/**
	 * 
	 * @param id - id of user account
	 * @return returns details about account specified in parameter
	 * @throws NoResultException when an Account couldn't be found
	 */
	@Override
	public UserDetails getUserDetailsByUserAccountId(Long id) throws NoResultException{
		UserAccount foundUserAccount = userAccountRepository.findOne(id);
		UserDetails foundUserDetails = userDetailsRepository.findByUserAccount(foundUserAccount);
		if(foundUserDetails == null){
			throw new NoResultException("Cannot find account. Account doesn't exist");
		}
		
		return foundUserDetails;
	}


	/**
	 * 
	 * @param userDetails
	 * @return created new user details
	 * @throws Exception, NoResultException
	 */
	@Override
	public UserDetails createUserDetails(UserDetails userDetails) throws NoResultException {
		userDetailsRepository.save(userDetails);
		return userDetails;
	}


	/**
	 *
	 * @param userDetails 
	 * @return updated userDetails
	 * @throws NoResultException when details couldn't be found
	 */
	@Override
	public UserDetails updateUserDetails(UserDetails userDetails) throws NoResultException {
		UserDetails foundUserDetails = userDetailsRepository.findOne(userDetails.getId());
		if(foundUserDetails == null){
			throw new NoResultException("Cannot update details. Details not found");
		}
		userDetailsRepository.save(userDetails);
		return userDetails;
	}

	/**
	 * 
	 * @param id - an details id which we want to delete
	 * @throws NoResultException when details couldn't be found
	 */
	@Override
	public void deleteUserDetails(Long id) throws NoResultException {
		UserDetails foundUserDetails = userDetailsRepository.findOne(id);
		if(foundUserDetails == null){
			throw new NoResultException("Cannot delete details. Details not found");
		}

		userDetailsRepository.delete(id);

	}

	/**
	 * Set UserDetailsDTO witch UserAccountDTO by UserAccount id 
	 * @param userDetailsDTO - details which we want to update
	 * @throws NoResultException when details couldn't be found
	 */
	@Override
	public UserDetails updateUserDetailsDTO(UserDetailsUpdateDTO userDetailsDTO) throws NoResultException {
			UserDetails foundUserDetails = getUserDetailsByUserAccountId(userDetailsDTO.getUserAccountDTO().getId());
			
			if(foundUserDetails == null){
				throw new NoResultException("Cannot update details. Details not found");
				
			}
					
			foundUserDetails.setId(userDetailsDTO.getId());
			foundUserDetails.setName(userDetailsDTO.getName());
			foundUserDetails.setSurname(userDetailsDTO.getSurname());
			foundUserDetails.setStreet(userDetailsDTO.getStreet());
			foundUserDetails.setStreetNumber(userDetailsDTO.getStreetNumber());
			foundUserDetails.setFlatNumber(userDetailsDTO.getFlatNumber());
			foundUserDetails.setPostCode(userDetailsDTO.getPostCode());
			foundUserDetails.setCity(userDetailsDTO.getCity());
			foundUserDetails.setBirthDate(userDetailsDTO.getBirthDate());
			foundUserDetails.setPhoneNumber(userDetailsDTO.getPhoneNumber());
			foundUserDetails.setSex(userDetailsDTO.getSex());
			foundUserDetails.setInterests(userDetailsDTO.getInterests());
			foundUserDetails.setDescription(userDetailsDTO.getDescription());
			foundUserDetails.setPreferredCuisine(userDetailsDTO.getPreferredCuisine());
			foundUserDetails.setProfileCompletion(userDetailsDTO.getProfileCompletion());
			
			foundUserDetails.getUserAccount().setId(userDetailsDTO.getUserAccountDTO().getId());
			foundUserDetails.getUserAccount().setUsername(userDetailsDTO.getUserAccountDTO().getUsername());
			foundUserDetails.getUserAccount().setE_mail(userDetailsDTO.getUserAccountDTO().getEmail());
			foundUserDetails.getUserAccount().setCountry(userDetailsDTO.getUserAccountDTO().getCountry());
			foundUserDetails.getUserAccount().setLastLogged(userDetailsDTO.getUserAccountDTO().getLastLogged());
			foundUserDetails.getUserAccount().setIsFilled(userDetailsDTO.getUserAccountDTO().getIsFilled());
			foundUserDetails.getUserAccount().setIsVerified(userDetailsDTO.getUserAccountDTO().getIsVerified());
			foundUserDetails.getUserAccount().setCreatedAt(userDetailsDTO.getUserAccountDTO().getCreatedAt());
			
			userDetailsRepository.save(foundUserDetails);
			
			return foundUserDetails;
	}

/*
 * Get UserDetailsDTO witch UserAccountDTO by UserAccount id 
 * @param id - id UserAccount
 * @throws NoResultException when details couldn't be found 
 */
	@Override
	public UserDetailsUpdateDTO getUserDetailsDTOByUserAccountId(Long id) throws NoResultException {
		UserAccount foundUserAccount = userAccountRepository.findOne(id);
		UserDetails foundUserDetails = userDetailsRepository.findByUserAccount(foundUserAccount);
		UserAccountDTO foundUserAccountDTO = new UserAccountDTO(
				foundUserAccount.getId(), 
				foundUserAccount.getUsername(),
				foundUserAccount.getE_mail(),
				foundUserAccount.getCountry(),
				foundUserAccount.getNick(),
				foundUserAccount.getLastLogged(),
				foundUserAccount.getFilled(),
				foundUserAccount.getIsVerified(),
				foundUserAccount.getCreatedAt());
		UserDetailsUpdateDTO foundUserDetailsDTO = new UserDetailsUpdateDTO(
				foundUserDetails.getId(),
				foundUserDetails.getName(),
				foundUserDetails.getSurname(),
				foundUserDetails.getStreet(),
				foundUserDetails.getStreetNumber(),
				foundUserDetails.getFlatNumber(),
				foundUserDetails.getPostCode(),
				foundUserDetails.getCity(),
				foundUserDetails.getBirthDate(),
				foundUserDetails.getPhoneNumber(),
				foundUserDetails.getSex(),
				foundUserDetails.getInterests(),
				foundUserDetails.getDescription(),
				foundUserDetails.getPreferredCuisine(),
				foundUserDetails.getProfileCompletion(),
				foundUserAccountDTO);
		if(foundUserDetailsDTO == null){
			throw new NoResultException("Cannot find account. Account doesn't exist");
		}
		return foundUserDetailsDTO;
	}

	/**
	 * 
	 * @param id - id of user details
	 * @return returns user details 
	 * @throws NoResultException when an Account couldn't be found
	 */
	@Override
	public UserDetails getUserDetailsbyId(Long id) throws NoResultException {
		UserDetails foundUserDetails = userDetailsRepository.findOne(id);
		return foundUserDetails;
	}

}
