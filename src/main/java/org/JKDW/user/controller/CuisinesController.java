package org.JKDW.user.controller;

import org.JKDW.user.model.Cuisines;
import org.JKDW.user.service.CuisinesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cuisines")
public class CuisinesController {

	@Autowired
	private CuisinesService cuisinesService;

	/**
	 * 
	 * @return returns all cuisines
	 */
	@RequestMapping(value = "/all", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Cuisines>> getCuisines() {
		List<Cuisines> cuisines = cuisinesService.getAllCuisines();
		return new ResponseEntity<>(cuisines, HttpStatus.OK);
	}

}