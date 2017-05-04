package org.JKDW.user.repository;

import org.JKDW.user.model.Cuisines;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CuisinesRepository extends JpaRepository<Cuisines, Long>{

}
