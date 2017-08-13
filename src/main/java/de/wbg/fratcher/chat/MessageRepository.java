package de.wbg.fratcher.chat;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface MessageRepository extends CrudRepository<Message, Long>{
	
	@Query("SELECT m FROM Message m WHERE m.userIdFrom in (:userList) and m.userIdTo in (:userList) ORDER BY m.createdAt ASC")
	List<Message> findMessagesForUserByList(@Param("userList") ArrayList<Long> userList);
	
	@Query("SELECT COUNT(m) FROM Message m WHERE m.userIdTo = :userId and m.userIdFrom = :userIdFrom and m.read = false")
	int countUserUnreadMessages(@Param("userId") Long userId, @Param("userIdFrom") Long userIdFrom);
	
	@Query("SELECT m FROM Message m WHERE m.userIdTo = :userId and m.userIdFrom = :userIdFrom and m.read = false")
	List<Message> findUserUnreadMessages(@Param("userId") Long userId, @Param("userIdFrom") Long userIdFrom);
}
