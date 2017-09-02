package org.JKDW.user.repository;

import org.JKDW.user.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long>,
        PagingAndSortingRepository<Event, Long>{

    List<Event> findByType(byte type);
    List<Event> findByOwnerId(Long id);
    Event findDetailsEventByTitle(String title);

    @Query("select e from event e where lower(e.title)  = lower(:title)")
    Page<Event> findByTitleWithLowerCase(@Param( "title") String title, Pageable pageable);


    @Query("select e from event e where ((:title like '%_%' AND lower(e.title) = lower(:title) ) or (:title is null AND e.title like '%')) AND (lower(e.address) like concat('%',:address ,'%')) AND ((e.type = :typeEvent AND :typeEvent between :jeden AND :dwa) OR ((e.type= :jeden OR e.type = :dwa) AND :typeEvent = :zero))  AND (((:date > :dateNull) AND ( e.date = :date)) OR ((:date = :dateNull) AND e.date > :dateNull)) ")
    Page<Event>findByTitleAddressTypeOrDate(@Param("title") String title,
                                            @Param("address") String address,
                                            @Param("typeEvent") byte typeEvent,
                                            @Param("zero") byte zero,
                                            @Param("jeden") byte jeden,
                                            @Param("dwa") byte dwa,
                                            @Param("date") Date date,
                                            @Param("dateNull") Date dateNull,
                                            Pageable pageable);

    @Query(value = "select * from event e order by e.date desc limit 10 ", nativeQuery = true)
    List<Event> findEventToMainPage();
}
