package org.JKDW.user.repository;

import org.JKDW.user.model.DTO.EventGeneralDTO;
import org.JKDW.user.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByType(byte type);
    List<Event> findByOwnerId(Long id);
    Event findDetailsEventByTitle(String title);
    List<Event> findByAddressContaining(String address);
}
