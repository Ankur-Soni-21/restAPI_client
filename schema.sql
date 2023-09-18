CREATE DATABASE users_app;

USE users_app;

CREATE TABLE users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO
    users (username, password)
VALUES
    ('ankur', '1234'),
    ('user1', '4321'),
    ('user2', 'abcd'),
    ('user3', 'dcba'),
    ('user4', 'xyz'),
    ('user5', 'zyx');
    
