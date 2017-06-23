package org.JKDW.user.model;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "sender")
    private UserAccount sender;

    private String title;

    @OneToOne
    @JoinColumn(name = "recipient")
    private UserAccount recipient;

    @Column(name = "date_of_send")
    private Date dateOfSend;

    @Lob
    @Column(name = "message_contents")
    @Type(type = "org.hibernate.type.TextType")
    private String messageContents;


    @Column(name = "was_read")
    private Boolean wasRead;

    @Column(name = "nick_recipient")
    private String nickRecipient;

    @Column(name = "nick_sender")
    private String nickSender;

    public Long getId() {
        return id;
    }

    public UserAccount getSender() {
        return sender;
    }

    public void setSender(UserAccount sender) {
        this.sender = sender;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    public String getMessageContents() {
        return messageContents;
    }

    public void setMessageContents(String messageContents) {
        this.messageContents = messageContents;
    }

    public Boolean getWasRead() {
        return wasRead;
    }

    public void setWasRead(Boolean wasRead) {
        this.wasRead = wasRead;
    }

    public String getNickRecipient() {
        return nickRecipient;
    }

    public void setNickRecipient(String nickRecipient) {
        this.nickRecipient = nickRecipient;
    }

    public String getNickSender() {
        return nickSender;
    }

    public void setNickSender(String nickSender) {
        this.nickSender = nickSender;
    }
}
