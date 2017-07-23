package de.wbg.fratcher.user;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import de.wbg.fratcher.profile.Profile;


public interface UserRepository extends CrudRepository<User, Long> {

	@Query("SELECT u from User_ u WHERE u.userName = :userName AND u.password = :password")
    User findByUserNameAndPassword(@Param("userName") String userName, @Param("password") String password);
	
	@Query("SELECT u.id from User_ u WHERE u.userName = :userName")
	String findByUserName(@Param("userName") String userName);
	
	@Query("SELECT u from User_ u WHERE u.userName = :userName")
	User findUserByUserName(@Param("userName") String userName);
	
	@Query("SELECT u.profile FROM User_ u JOIN u.liked l WHERE l.id = :userId and u in (:liked)")
	List<Profile> findMatchesByUser(@Param("userId") Long userId, @Param("liked") ArrayList<User> liked);
	
	@Query("SELECT u from User_ u where u.id = :userId")
	User findUserById(@Param("userId") Long userId);
	
	@Query("SELECT u FROM User_ u WHERE u.id != :userId and u not in (:liked) and u not in (:disliked)")
	List<User> findUserUnmatched(@Param("userId") Long userId,  @Param("liked") ArrayList<User> liked, @Param("disliked") ArrayList<User> disliked);
}
