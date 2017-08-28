package org.JKDW.user.model;

import lombok.Data;

import java.util.Date;


@Data
public class SearchCriteriaEvents {

    private String title;

    private String address;

    private Date date;

    private String typeEvent;

}
