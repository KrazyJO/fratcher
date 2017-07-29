package de.wbg.fratcher.chat;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import de.wbg.fratcher.user.User;

public interface MessageRepository extends CrudRepository<Message, Long>{

	@Query("SELECT m from Message m WHERE m.userIdFrom = :userIdPartnerOne AND m.userIdTo = :userIdPartnerTwo")
    User findMessagesForUser(@Param("userIdPartnerOne") Long userIdPartnerOne, @Param("userIdPartnerTwo") Long userIdPartnerTwo);
}
