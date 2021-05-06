CREATE TABLE IF NOT EXISTS users (
    email VARCHAR NOT NULL PRIMARY KEY,
    password VARCHAR NOT NULL
)
CREATE TABLE IF NOT EXISTS characters (
    name VARCHAR NOT NULL PRIMARY KEY,
    image VARCHAR NOT NULL,
    age INTEGER,
    weight FLOAT(2),
    history TEXT,
    shows INTEGER[]
)
CREATE TABLE IF NOT EXISTS shows (
    id INTEGER NOT NULL PRIMARY KEY,
    title VARCHAR NOT NULL,
    characters VARCHAR[],
    image VARCHAR NOT NULL,
    release DATE,
    score SMALLINT,
    genre VARCHAR
)
