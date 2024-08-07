USE movie_reviews;

--@block
SELECT * 
FROM movies;
SELECT * 
FROM reviews;
SELECT *
FROM user_relation;

--@block .1 count number of reviews for movie1
SELECT COUNT(*)
FROM reviews
INNER JOIN movies ON
reviews.movie_id = movies.movie_id
WHERE movie_name = "movie1";

--@block .2 all reviews by those that user1 is following, showing user_id, movie_id and ratings
SELECT r.user_id, r.movie_id, r.ratings, movies.movie_name
FROM reviews AS r
INNER JOIN movies ON 
r.movie_id = movies.movie_id
WHERE user_id IN (
    SELECT following_id
    FROM user_relation
    WHERE follower_id = 1
);


--@block
USE company_data;

--@block
SELECT * FROM books;
SELECT * FROM reviews;

--@block Ex 4B 1.
SELECT title 
FROM books
LEFT JOIN reviews ON 
books.id = reviews.book_id;

--@block 2.
SELECT books.author, reviews.average_rating
FROM books
INNER JOIN reviews ON
books.id = reviews.book_id
WHERE reviews.average_rating > 4.4;