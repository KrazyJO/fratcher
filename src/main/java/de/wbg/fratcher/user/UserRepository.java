package de.wbg.fratcher.user;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;


public interface UserRepository extends CrudRepository<User, Long> {

	@Query("SELECT u from User_ u WHERE u.userName = :userName AND u.password = :password")
    User findByUserNameAndPassword(@Param("userName") String userName, @Param("password") String password);
	
	@Query("SELECT u.id from User_ u WHERE u.userName = :userName")
	String findByUserName(@Param("userName") String userName);
}
