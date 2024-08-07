CREATE DATABASE IF NOT EXISTS athletes;
USE athletes;

CREATE TABLE players (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image VARCHAR(255) NOT NULL
); 

--@block
SELECT * FROM players;