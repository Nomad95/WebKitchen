package org.JKDW.user.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.persistence.NoResultException;

import javassist.NotFoundException;
import org.JKDW.user.model.DTO.UserDetailsAddressDTO;
import org.JKDW.user.model.DTO.UsersParticipationEventDTO;
import org.JKDW.user.model.Event;
import org.JKDW.user.model.UserAccount;
import org.JKDW.user.model.UserDetails;
import org.JKDW.user.model.DTO.UserAccountDTO;
import org.JKDW.user.model.DTO.UserDetailsUpdateDTO;
import org.JKDW.user.repository.UserAccountRepository;
import org.JKDW.user.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


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
	@Transactional
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
	@Transactional
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
	@Transactional
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
	@Transactional
	public void deleteUserDetails(Long id) throws NoResultException {
		UserDetails foundUserDetails = userDetailsRepository.findOne(id);
		if(foundUserDetails == null){
			throw new NoResultException("Cannot delete details. Details not found");
		}

		userDetailsRepository.delete(id);

	}

	/**
	 *
	 * This method checks whether user had fulfilled fields in his profile
	 * required to create new event
	 * @param userId user account id
	 * @return true if user has filled required fields else false
	 * @throws NoResultException when acc or details couldn't be found
     */
	@Override
	@Transactional
	public boolean canCreateEvent(Long userId) throws NoResultException {
		UserAccount foundUserAccount = userAccountRepository.findOne(userId);
		if(foundUserAccount == null)
			throw new NoResultException("User with username: " + userId + " couldn't be found");

		UserDetails foundUserDetails = userDetailsRepository.findByUserAccount(foundUserAccount);
		if(foundUserDetails == null)
			throw new NoResultException("Error in account->detail reference");

		//if user has not filled fields we cannot allow him to create event
		return !canCreate(foundUserDetails);
	}

	/**
	 * For canCreateEvent method
	 */
	private boolean canCreate(UserDetails foundUserDetails) {
		return foundUserDetails.getName() == null
				|| foundUserDetails.getSurname() == null
				|| foundUserDetails.getCity() == null
				|| foundUserDetails.getStreet() == null
				|| foundUserDetails.getStreetNumber() == null
				|| foundUserDetails.getBirthDate() == null
				|| foundUserDetails.getPhoneNumber() == null
				|| foundUserDetails.getSex() == null;
	}

	/**
	 * Checks if user had fulfilled needed fields in his profile to be allowed to participate in event
	 * @param accountId user account id
	 * @return true if can
	 * @throws NoResultException if user wasnt found
     */
	@Override
	@Transactional
	public boolean canParticipate(Long accountId) throws NoResultException {
		UserAccount foundUserAccount = userAccountRepository.findOne(accountId);
		if(foundUserAccount == null)
			throw new NoResultException("User with username: " + accountId + " couldn't be found");

		UserDetails foundUserDetails = userDetailsRepository.findByUserAccount(foundUserAccount);
		if(foundUserDetails == null)
			throw new NoResultException("Error in account->detail reference");

		//if user hasnt fulfilled this fields he cannot take part in events
		return !canParticipate(foundUserDetails);
	}

	/**
	 * For canParticipate method
     */
	private boolean canParticipate(UserDetails foundUserDetails) {
		return foundUserDetails.getName() == null
				|| foundUserDetails.getSurname() == null
				|| foundUserDetails.getBirthDate() == null
				|| foundUserDetails.getSex() == null;
	}

	/**
	 * Finds user details with userAccount id and finds all events he participate in
	 * @param userId user account id
	 * @return list of events
	 * @throws NotFoundException when user couldn't be found
     */
	@Override
	@Transactional
	public List<UsersParticipationEventDTO> getAllUserEventsInWhichHeParticipates(Long userId) throws NotFoundException {
		//find user
		UserDetails foundUserDetails = getUserDetailsByUserAccountId(userId);
		if(foundUserDetails == null)
			throw new NotFoundException("User couldn't be found");

		//get all events ad extract only necassary information
		List<Event> events = foundUserDetails.getEvents();
		if(events == null) //return empty array list if isnt instantiated
			return Collections.emptyList();
		List<UsersParticipationEventDTO> eventsDTO = new ArrayList<>();
		events.forEach( e ->
			eventsDTO.add(new UsersParticipationEventDTO(
					e.getId(),
					e.getTitle(),
					e.getDish_name(),
					e.getType(),
					e.getTime(),
					e.getDate(),
					e.getAcceptedIds().contains(userId)
					))
		);
		return eventsDTO;
	}

	/**
	 * Set UserDetailsDTO witch UserAccountDTO by UserAccount id
	 * @param userDetailsDTO - details which we want to update
	 * @throws NoResultException when details couldn't be found
	 */
	@Override
	@Transactional
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
		foundUserDetails.getUserAccount().setEmail(userDetailsDTO.getUserAccountDTO().getEmail());
		foundUserDetails.getUserAccount().setCountry(userDetailsDTO.getUserAccountDTO().getCountry());
		foundUserDetails.getUserAccount().setLastLogged(userDetailsDTO.getUserAccountDTO().getLastLogged());
		foundUserDetails.getUserAccount().setIsFilled(userDetailsDTO.getUserAccountDTO().getIsFilled());
		foundUserDetails.getUserAccount().setIsVerified(userDetailsDTO.getUserAccountDTO().getIsVerified());
		foundUserDetails.getUserAccount().setCreatedAt(userDetailsDTO.getUserAccountDTO().getCreatedAt());

		userDetailsRepository.save(foundUserDetails);

		return foundUserDetails;
	}

	/**
     * Get UserDetailsDTO with UserAccountDTO by UserAccount id
     * @param id - id UserAccount
     * @throws NoResultException when details couldn't be found
     */
	@Override
	@Transactional
	public UserDetailsUpdateDTO getUserDetailsDTOByUserAccountId(Long id) throws NoResultException {
		UserAccount foundUserAccount = userAccountRepository.findOne(id);
		UserDetails foundUserDetails = userDetailsRepository.findByUserAccount(foundUserAccount);
		UserAccountDTO foundUserAccountDTO = new UserAccountDTO(
				foundUserAccount.getId(),
				foundUserAccount.getUsername(),
				foundUserAccount.getEmail(),
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
	@Transactional
	public UserDetails getUserDetailsbyId(Long id) throws NoResultException {
		return userDetailsRepository.findOne(id);
	}

	/**
	 *
	 * @param userId - id of user account
	 * @return returns user address
	 * @throws NoResultException when an Account couldn't be found
	 */
	@Override
	@Transactional
	public UserDetailsAddressDTO getUserAddressByUserAccountId(Long userId) throws NotFoundException {
		UserAccount foundUserAccount = userAccountRepository.findOne(userId);
		UserDetails foundUserDetails = userDetailsRepository.findByUserAccount(foundUserAccount);
		UserDetailsAddressDTO foundUserAddress = new UserDetailsAddressDTO(
				foundUserDetails.getId(),
				foundUserDetails.getStreet(),
				foundUserDetails.getStreetNumber(),
				foundUserDetails.getFlatNumber(),
				foundUserDetails.getCity());
		if(foundUserAddress == null){
			throw new NoResultException("Cannot find account. Account doesn't exist");
		}
		return foundUserAddress;
	}
}
