-- CREATE DATABASE tinkergram;
USE tinkergram;

--@block
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    caption VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
);

--@block update image to accept a longer link
ALTER TABLE posts CHANGE COLUMN image image TEXT;


--@block
SELECT * FROM posts;