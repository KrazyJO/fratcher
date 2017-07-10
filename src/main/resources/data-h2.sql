-- Initialize database on startup. See
-- https://docs.spring.io/spring-boot/docs/current/reference/html/howto-database-initialization.html#howto-initialize-a-database-using-spring-jdbc
-- for explanation. This is a cool spring feature :-).


-- Remove everything.
DELETE FROM USER_;


-- Insert new users.
INSERT INTO USER_ (id, USER_NAME, PASSWORD) VALUES
  (1, 'bob', 'bar'), 
  (2, 'sally', 'foo');