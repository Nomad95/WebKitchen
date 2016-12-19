package org.JKDW.user.service;

import java.util.List;

import javax.persistence.NoResultException;

import org.JKDW.user.model.UserAccount;
import org.JKDW.user.model.UserDetails;
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
	public UserDetails getUserDetailsByUserAccount(Long id) throws NoResultException{
		UserDetails foundUserDetails = userDetailsRepository.findOne(id);
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

}
