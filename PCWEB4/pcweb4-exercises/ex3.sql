--Ex 3A
--@block
USE company_data;
SELECT * FROM reviews;

--1. Retrieve all genre and average year from books and group by genre
--@block
SELECT genre, AVG(year)
FROM books
GROUP BY genre;

--2. Retrieve all genre and largest year from books and group by genre
--@block
SELECT genre, MAX(year)
FROM books
GROUP BY genre; 


-- 3. Retrieve all genre and smallest year from books and group by genre
--@block
SELECT genre, MIN(YEAR)
FROM books
GROUP BY genre;


-- 4. Retrieve all information from books sorting by the latest year first
--@block
SELECT *
FROM books
ORDER BY year DESC;

-- 5. Retrieve all information from books sorting by the latest year first, and next, alphabetically by author
--@block
SELECT *
FROM books
ORDER BY year DESC, author ASC;

-- 6. Retrieve all genre and year from books sorting by the genre first, and next, latest year
--@block
SELECT genre, year
FROM books
ORDER BY genre, year DESC;


--@block
SELECT * FROM books;

--Ex 3B
--@block books insert
INSERT INTO books
VALUES (16, "The Metamorphosis", "Franz Kafka", 1915, "fiction", "novella");

INSERT INTO 
books(id, title, author, year, genre, sub_genre) 
VALUES(17, 'A Light in the Attic', 'Shel Silverstein', '1981', 'fiction', 'poems');


--@block reviews insert
INSERT INTO reviews
VALUES (16, 4.0);

INSERT INTO reviews
VALUES (17, 4.9);

--@block UPDATE
UPDATE books 
SET title='Meta' 
WHERE id=16;

UPDATE reviews 
SET average_rating='4.8' 
WHERE book_id='16';

--@block delete
DELETE FROM books 
WHERE id = 16 OR id = 17;
DELETE FROM reviews 
WHERE book_id = 16 OR book_id = 17;

--@blocks
SELECT * FROM reviews;
SELECT * FROM books;

--@block movies_reviews
USE movie_reviews;

--@block Retrieve all movie names using the wildcard for movies ending with a 2
SELECT * 
FROM movies 
WHERE movie_name 
LIKE "%2";

 --@block Retrieve all movie names using the wildcard for movies containing "ovi"
 SELECT * 
 FROM movies 
 WHERE movie_name 
 LIKE "%ovi%";

 --@block Retrieve all movie names using the wildcard for movies beginning with "m"
SELECT * 
FROM movies 
WHERE movie_name 
LIKE "m%";

--@block Retrieve all userinfo using the wildcard for passwords having "p"
SELECT * 
FROM userinfo 
WHERE password 
LIKE "%p%";