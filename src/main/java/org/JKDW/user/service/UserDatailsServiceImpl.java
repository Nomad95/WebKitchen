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
	 * @param userAccount 
	 * @return returns details about account specified in parameter
	 * @throws NoResultException when an Account couldn't be found
	 */
	@Override
	public UserDetails getUserDetailsByUser(UserAccount userAccount) throws NoResultException{
		UserAccount foundUserAccount = userAccountRepository.findOne(userAccount.getId());
		if(foundUserAccount == null){
			throw new NoResultException("Cannot find account. Account doesn't exist");
		}
		UserDetails foundUserDetails = userDetailsRepository.findOne(foundUserAccount.getId());
		return foundUserDetails;
	}

	
	/**
	 * Creates users details
	 * @param userDetails
	 * @param accountId - we must specify to which account details are injected to
	 * @return created user details
	 * @throws Exception, NoResultException
	 */
	@Override
	public UserDetails createUserDetails(UserDetails userDetails, Long accountId) throws NoResultException {
		
		UserAccount foundUserAccount = userAccountRepository.findOne(accountId);
		if(foundUserAccount == null){
			throw new NoResultException("Account cannot be found");
		}
		userDetails.setUserAccount(foundUserAccount);
		userDetailsRepository.save(userDetails);
		return userDetails;
	}

	
	/**
	 * Updates user Details
	 * @param userDetails - 
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
	 * Deletes user details with dpecified id
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
