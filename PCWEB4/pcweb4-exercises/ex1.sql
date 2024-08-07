CREATE TABLE books (
  `id` INTEGER,
  `title` VARCHAR(255),
  `author` VARCHAR(255),
  `year` INTEGER,
  `genre` VARCHAR(255),
  `sub_genre` VARCHAR(255)
); 

INSERT INTO 
	books (id, title, author, year, genre, sub_genre)
VALUES
  ('1', 'Harry Potter and the Half-Blood Prince', 'J. K. Rowling', '2005', 'fiction', 'fantasy'),
  ('2', 'Pride and Prejudice', 'Jane Austen', '1813', 'fiction', 'novel'),
  ('3', 'The Da Vinci Code', 'Dan Brown', '2003', 'fiction', 'mystery'),
  ('4', 'A Game of Thrones', 'George R .R. Martin', '1996', 'fiction', 'fantasy'),
  ('5', 'Where the Crawdads Sing', 'Delia Owens', '2018', 'fiction', 'historical fiction'),
  ('6', 'Harry Potter and the Sorcerers Stone', 'J. K. Rowling', '1997', 'fiction', 'fantasy'),
  ('7', 'Oh the Places Youll Go', 'Dr. Seuss', '1990', 'fiction', 'children'),
  ('8', 'Becoming', 'Michelle Obama', '2018', 'non-fiction', 'memoir'),
  ('9', 'Educated', 'Tara Westover', '2018', 'non-fiction', 'autobiography'),
  ('10', 'The 7 Habits of Highly Effective People', 'Stephen R. Covey', '1989', 'non-fiction', 'self help'),
  ('11', 'Dare to Lead', 'Brene Brown', '2018', 'non-fiction', 'self help'),
  ('12', 'Walden', 'Henry David Thoreau', '1854', 'non-fiction', 'memoir'),
  ('13', 'On the Origin of Species', 'Charles Darwin', '1859', 'non-fiction', 'science'),
  ('14', 'Silent Spring', 'Rachel Carson', '1962', 'non-fiction', 'science'),
  ('15', 'The Diary of A Young Girl', 'Anne Frank', '1947', 'non-fiction', 'autobiography');

CREATE TABLE reviews (
  `book_id` INTEGER,
  `average_rating` FLOAT
); 

INSERT INTO 
	reviews (book_id, average_rating)
VALUES
  ('1', '4.7'),
  ('2', '4.5'),
  ('3', '4.5'),
  ('4', '4.6'),
  ('5', '4.8'),
  ('6', '4.7'),
  ('7', '4.8'),
  ('8', '4.9'),
  ('9', '4.7'),
  ('10', '4.5'),
  ('11', '4.4'),
  ('12', '4.2'),
  ('13', '4.2'),
  ('14', '4.5'),
  ('15', '4.6');

--Exercise 1A
-- 1. Select all books
--@block
SELECT * FROM books;

-- 2. Select title and year from books
--@block
SELECT title, year FROM books;

-- 3. select all books after Y2K
--@block
SELECT * FROM books WHERE year > 2000;

-- 4. select all books before Y2K
--@block
SELECT * FROM books WHERE year < 2000;

--Exercise 1B
-- 1. Select all books in fiction genre
--@block
SELECT * FROM books WHERE  genre = "fiction";

-- 2. Select all title and author after 2000 < year < 2004
--@block
SELECT title, author FROM books WHERE 2000 < year AND year < 2004;

--3. Select title, author, year from books after Y2K and genre is fiction
--@block
SELECT title, author, year FROM books WHERE year > 2000 AND genre = "fiction";

--4. Select title and author before Y2K or after 2004
--@block 
SELECT title, author FROM books WHERE year < 2000 OR year > 2004

--5. title, author and year after 2004
--@block
SELECT title, author, year FROM books WHERE NOT year < 2004