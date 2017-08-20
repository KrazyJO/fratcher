-- Initialize database on startup. See
-- https://docs.spring.io/spring-boot/docs/current/reference/html/howto-database-initialization.html#howto-initialize-a-database-using-spring-jdbc
-- for explanation. This is a cool spring feature :-).


-- Remove everything.
DELETE FROM USER__DISLIKED;
DELETE FROM USER__LIKED;
DELETE FROM USER_;
DELETE FROM PROFILE;
DELETE FROM MESSAGE;
