package org.JKDW.user.repository;

import org.JKDW.user.model.rating.RatingOfTheHost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RatingOfTheHostRepository extends JpaRepository<RatingOfTheHost,Long>{

    //TODO: czy host jest potrzebny tutaj?
    @Query("select n from RatingOfTheHost n where n.event.id = :eId and n.author.id = :aId and n.host.id = :hId")
    RatingOfTheHost findRatingForUserAndEvent(
            @Param("eId") Long eventId,
            @Param("aId") Long authorId,
            @Param("hId") Long hostId);

    List<RatingOfTheHost> findByEventId(Long eventId);
}
