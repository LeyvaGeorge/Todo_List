CREATE DATABASE perntodo;

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    task VARCHAR(255),
    description VARCHAR(255)
);

INSERT INTO todo (task, description)
VALUES ('TODO', 'TODO');