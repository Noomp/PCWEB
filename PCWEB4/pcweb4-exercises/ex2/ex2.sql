CREATE DATABASE movie_reviews;
USE movie_reviews;

--@block
CREATE TABLE userinfo(
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30) UNIQUE,
    password VARCHAR(30)
);
INSERT INTO userinfo VALUES(NULL,"user1","password1");
INSERT INTO userinfo VALUES(NULL,"user2","password2");
INSERT INTO userinfo VALUES(NULL,"user3","password3");
INSERT INTO userinfo VALUES(NULL,"user4","password4");
INSERT INTO userinfo VALUES(NULL,"user5","password5");


CREATE TABLE movies(
    movie_id INT PRIMARY KEY AUTO_INCREMENT,
    movie_name VARCHAR(30)
);
INSERT INTO movies VALUES(NULL,"movie1");
INSERT INTO movies VALUES(NULL,"movie2");
INSERT INTO movies VALUES(NULL,"movie3");
INSERT INTO movies VALUES(NULL,"movie4");
INSERT INTO movies VALUES(NULL,"movie5");


CREATE TABLE reviews(
    user_id INT,
    movie_id INT,
    ratings DEC(2,1),
    PRIMARY KEY(user_id,movie_id),
    FOREIGN KEY(user_id) REFERENCES userinfo(user_id) ON DELETE CASCADE,
    FOREIGN KEY(movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    CHECK (ratings <= 5.0)
);
INSERT INTO reviews VALUES(1,1,4.5);
INSERT INTO reviews VALUES(1,3,3.0);
INSERT INTO reviews VALUES(2,1,4.7);
INSERT INTO reviews VALUES(3,5,2.5);
INSERT INTO reviews VALUES(4,4,4.1);


CREATE TABLE user_relation(
    follower_id INT,
    following_id INT,
    PRIMARY KEY(follower_id, following_id),
    FOREIGN KEY(follower_id) REFERENCES userinfo(user_id) ON DELETE CASCADE,
    FOREIGN KEY (following_id) REFERENCES userinfo(user_id) ON DELETE CASCADE
);
INSERT INTO user_relation VALUES(1,2);
INSERT INTO user_relation VALUES(1,3);
INSERT INTO user_relation VALUES(2,1);
INSERT INTO user_relation VALUES(3,1);
INSERT INTO user_relation VALUES(4,5);


--@block
SELECT * FROM userinfo;