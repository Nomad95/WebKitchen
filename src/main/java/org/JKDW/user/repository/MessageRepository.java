package org.JKDW.user.repository;


import org.JKDW.user.model.Message;
import org.JKDW.user.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

  List<Message> findByRecipient(UserAccount recipient);

  List<Message> findMessageBySender(UserAccount sender);

}
