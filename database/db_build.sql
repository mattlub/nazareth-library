BEGIN;

DROP TABLE IF EXISTS users, books, reservations CASCADE;

-- TODO: get rid of some not nulls and have js validation
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  username VARCHAR(255) NOT NULL,
  location VARCHAR(100),
  avatar_url VARCHAR(255) NOT NULL,
  github_access_token VARCHAR(255) NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  owner_id INT NOT NULL REFERENCES users(id),
  summary TEXT NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- TODO: remove 'name' from this table
CREATE TABLE reservations (
  id SERIAL PRIMARY KEY,
  book_id INT NOT NULL REFERENCES books(id),
  user_id INT NOT NULL REFERENCES users(id),
  name VARCHAR(30) NOT NULL,
  from_date DATE NOT NULL,
  to_date DATE NOT NULL,
  date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id, name, username, location, avatar_url, github_access_token) VALUES
(1, 'Test User', 'testusername', 'naz', 'fake url', 'fake token');

INSERT INTO books (title, author, owner_id, summary) VALUES
('Book Title 1', 'Author 1', 1, 'A short book about nothing much'),
('Book Title 2', 'Author 2', 1, 'A book about nothing much'),
('Book Title 3', 'Author 3', 1, 'A short book about nothing much');

INSERT INTO reservations (book_id, user_id, name, from_date, to_date) VALUES
(1, 1, 'Hiba', '2017-04-01', '2017-04-08'),
(1, 1, 'Jack', '2017-05-01', '2017-05-08'),
(2, 1, 'Jack', '2017-05-01', '2017-05-08');

COMMIT;
