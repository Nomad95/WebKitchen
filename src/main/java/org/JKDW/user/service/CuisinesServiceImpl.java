package org.JKDW.user.service;

import org.JKDW.user.model.Cuisines;
import org.JKDW.user.repository.CuisinesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 *
 * @author Konrad
 * Możliwe że coś tu jeszcze się doda
 */
@Service
public class CuisinesServiceImpl implements CuisinesService {

	@Autowired
	private CuisinesRepository cuisinesRepository;



	@Override
	public List<Cuisines> getAllCuisines() {
		return cuisinesRepository.findAll();
	}



}
