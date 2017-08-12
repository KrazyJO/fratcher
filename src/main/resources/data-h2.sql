-- Initialize database on startup. See
-- https://docs.spring.io/spring-boot/docs/current/reference/html/howto-database-initialization.html#howto-initialize-a-database-using-spring-jdbc
-- for explanation. This is a cool spring feature :-).


-- Remove everything.
DELETE FROM USER__DISLIKED;
DELETE FROM USER__LIKED;
DELETE FROM USER_;
DELETE FROM PROFILE;
DELETE FROM MESSAGE;



INSERT INTO PROFILE (id, description, CREATED_AT, gender, YEAR_OF_BIRTH, hobbies, FIRST_NAME, LAST_NAME) VALUES
  (10, 'Ich bin Bob', parsedatetime('2017-05-20 05:01', 'yyyy-MM-dd HH:mm'), 0, '1982', 'Party Feiern Bechern', 'Bob', 'Bobbius'),
  (20, 'Ich bin Sally', parsedatetime('2016-05-20 05:01', 'yyyy-MM-dd HH:mm'), 1, '1991', 'Reiten Lesen', 'Sally', 'Sallieus'),
  (30, 'Ich bin kai', parsedatetime('2016-05-20 05:01', 'yyyy-MM-dd HH:mm'), 2, '', '', 'Kai', ''),
  (40, 'Ich bin maike', parsedatetime('2016-05-20 05:01', 'yyyy-MM-dd HH:mm'), 2, '', '', '', ''),
  (50, 'Ich bin Batman', parsedatetime('2016-05-20 05:01', 'yyyy-MM-dd HH:mm'), 2, '', 'Fledermäuse', 'Bruce', 'Wayne'),
  (60, 'Ich bin Superman', parsedatetime('2016-05-20 05:01', 'yyyy-MM-dd HH:mm'), 2, '', 'Kryptonit essen', 'Clark', 'Kent');

-- Insert new users.
INSERT INTO USER_ (id, USER_NAME, PASSWORD, PROFILE_ID) VALUES
  (1, 'bob', '4e40b1c638f2e6ad52db4869a50b3ac8174e504a715c0fdd1d5c5eb048dcc7877ef10423483fde63d4dce4351c4797c193bd7755175820d8a3fdc95c40e87309', 10), --bar
  (2, 'sally', '2b0e69f95f16bed3a95a6f0ad2505b00e3fda9b36ee6fc2b14a9b1302e540280b9b3b62c4b85349ee040b54d9a3e69dcb7580fd0d8d1de5b803ea03ed5ef7594', 20), --foo
  (3, 'kai', '4e40b1c638f2e6ad52db4869a50b3ac8174e504a715c0fdd1d5c5eb048dcc7877ef10423483fde63d4dce4351c4797c193bd7755175820d8a3fdc95c40e87309', 30), --bar
  (4, 'maike', '4e40b1c638f2e6ad52db4869a50b3ac8174e504a715c0fdd1d5c5eb048dcc7877ef10423483fde63d4dce4351c4797c193bd7755175820d8a3fdc95c40e87309', 40), --bar
  (5, 'batman', '4e40b1c638f2e6ad52db4869a50b3ac8174e504a715c0fdd1d5c5eb048dcc7877ef10423483fde63d4dce4351c4797c193bd7755175820d8a3fdc95c40e87309', 50), --bar
  (6, 'superman', '4e40b1c638f2e6ad52db4869a50b3ac8174e504a715c0fdd1d5c5eb048dcc7877ef10423483fde63d4dce4351c4797c193bd7755175820d8a3fdc95c40e87309', 60); --bar
  
INSERT INTO USER__LIKED (USER__ID, LIKED_ID) VALUES
	(1, 2),
	(1,3),
	(5,6),
	(2,1),
	(3,5),
	(5,3),
	(6,5),
	(5,1);
	
INSERT INTO USER__DISLIKED (USER__ID, DISLIKED_ID) VALUES
	(3,1);
	
INSERT INTO MESSAGE (ID, CREATED_AT, MESSAGE, READ, USER_ID_FROM, USER_ID_TO) VALUES
	(1, parsedatetime('2017-05-20 05:01', 'yyyy-MM-dd HH:mm'), 'message from bob to sally', true, 1, 2),
	(2, parsedatetime('2017-05-20 05:03', 'yyyy-MM-dd HH:mm'), 'message from sally to bob 2', false, 2, 1),
	(3, parsedatetime('2017-05-20 05:02', 'yyyy-MM-dd HH:mm'), 'message from sally to bob 1', false, 2, 1),
	(4, parsedatetime('2017-05-20 05:03', 'yyyy-MM-dd HH:mm'), 'message from bob to kai', false, 1, 3),
	(5, parsedatetime('2017-05-20 05:03', 'yyyy-MM-dd HH:mm'), 'message from kai to sally', false, 3, 2);