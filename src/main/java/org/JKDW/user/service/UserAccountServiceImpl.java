package org.JKDW.user.service;

import java.util.List;

import javax.persistence.NoResultException;

import org.JKDW.user.model.UserAccount;
import org.JKDW.user.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class UserAccountServiceImpl implements UserAccountService {

	@Autowired
	private UserAccountRepository userAccountRepository;


	/**
	 * @return Returns all user accounts
	 */
	@Override
	public List<UserAccount> getAllUserAccounts() {
		List<UserAccount> accounts = userAccountRepository.findAll();
		return accounts;
	}


	/**
	 * @param An id of user account we want to find
	 * @return returns one account specified by an id
	 */
	@Override
	public UserAccount getUserAccountById(Long id) {
		UserAccount account = userAccountRepository.findOne(id);
		return account;
	}


	/**
	 * @param userAccount - new account information
	 * @return returns new account
	 * @throws Exception when an account with specified id exists
	 */
	@Override
	public UserAccount createUserAccount(UserAccount userAccount) {
		userAccountRepository.save(userAccount);
		return userAccount;
	}


	/**
	 * @param userAccount - an account data we want to update
	 * @return updated account information
	 */
	@Override
	public UserAccount updateUserAccount(UserAccount userAccount) throws NoResultException{
		UserAccount foundUserAccount = userAccountRepository.findOne(userAccount.getId());
		if(foundUserAccount == null){
			throw new NoResultException("Cannot update account. Account doesn't exist");
		}

		userAccountRepository.save(userAccount);
		return userAccount;
	}


	/**
	 * @param id of deleted user account
	 */
	@Override
	public void deleteUserAccount(Long id) throws NoResultException{
		UserAccount foundUserAccount = userAccountRepository.findOne(id);
		if(foundUserAccount == null){
			throw new NoResultException("Cannot delete account. Account not found");
		}

		userAccountRepository.delete(id);

	}

}
