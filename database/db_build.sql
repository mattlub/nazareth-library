BEGIN;

DROP TABLE IF EXISTS books, reservations;

CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    owner VARCHAR(30) NOT NULL,
    summary TEXT NOT NULL,
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    book_id INT NOT NULL REFERENCES books(id),
    name VARCHAR(30) NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO books (title, author, owner, summary, date_created) VALUES
('Book Title 1', 'Author 1', 'Mohamed', 'A short book about nothing much'),
('Book Title 2', 'Author 2', 'Matt', 'A short book about nothing much');

INSERT INTO reservations (book_id, name, from_date, to_date, date_created) VALUES
(1, 'Hiba', '2017-04-01', '2017-04-08'),
(1, 'Jack', '2017-05-01', '2017-05-08');

COMMIT;
