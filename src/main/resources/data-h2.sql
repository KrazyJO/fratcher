-- Initialize database on startup. See
-- https://docs.spring.io/spring-boot/docs/current/reference/html/howto-database-initialization.html#howto-initialize-a-database-using-spring-jdbc
-- for explanation. This is a cool spring feature :-).


-- Remove everything.
DELETE FROM USER_;
DELETE FROM PROFILE;

INSERT INTO PROFILE (id, description, CREATED_AT, gender, YEAR_OF_BIRTH, hobbies, FIRST_NAME, LAST_NAME) VALUES
  (1, 'Ich bin Bob', parsedatetime('2017-05-20 05:01', 'yyyy-MM-dd HH:mm'), 0, '1982', 'Party Feiern Bechern', 'Bob', 'Bobbius'),
  (2, 'Ich bin Sally', parsedatetime('2016-05-20 05:01', 'yyyy-MM-dd HH:mm'), 1, '1991', 'Reiten Lesen', 'Sally', 'Sallieus');

-- Insert new users.
INSERT INTO USER_ (id, USER_NAME, PASSWORD, PROFILE_ID) VALUES
  (1, 'bob', '4e40b1c638f2e6ad52db4869a50b3ac8174e504a715c0fdd1d5c5eb048dcc7877ef10423483fde63d4dce4351c4797c193bd7755175820d8a3fdc95c40e87309', 1), --bar
  (2, 'sally', '2b0e69f95f16bed3a95a6f0ad2505b00e3fda9b36ee6fc2b14a9b1302e540280b9b3b62c4b85349ee040b54d9a3e69dcb7580fd0d8d1de5b803ea03ed5ef7594', 2); --foo
  
