package org.JKDW.user.model;


import javax.persistence.*;
import java.util.Date;

@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String content;

    @OneToOne
    private UserAccount recipient;

    @Column(name = "date_of_send")
    private Date dateOfSend;

    @Column(name = "was_read")
    private Boolean wasRead;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public UserAccount getRecipient() {
        return recipient;
    }

    public void setRecipient(UserAccount recipient) {
        this.recipient = recipient;
    }

    public Date getDateOfSend() {
        return dateOfSend;
    }

    public void setDateOfSend(Date dateOfSend) {
        this.dateOfSend = dateOfSend;
    }

    public Boolean getWasRead() {
        return wasRead;
    }

    public void setWasRead(Boolean wasRead) {
        this.wasRead = wasRead;
    }
}

