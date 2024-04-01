-- Add migration script here

DROP TABLE IF EXISTS user_table;

CREATE TABLE user_table (
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR(64) NOT NULL,
    last_name VARCHAR(64) NOT NULL,
    email VARCHAR(128) NOT NULL,
    password VARCHAR(64) NOT NULL,
    active BOOLEAN DEFAULT TRUE
);

CREATE TABLE tweet_table (
    id INT PRIMARY KEY NOT NULL,
    content TEXT,
    user_id INT,
    title VARCHAR(64),
    create_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    parent_id INT NULL,
    CONSTRAINT fk_user
                         FOREIGN KEY (user_id)
                         REFERENCES user_table(id)
                         ON DELETE CASCADE,
    CONSTRAINT self_reference_parent
        FOREIGN KEY (parent_id)
            REFERENCES tweet_table(id)
            ON DELETE CASCADE

);

CREATE TABLE like_table(
  id INT PRIMARY KEY NOT NULL,
  user_id INT,
  tweet_id INT,
    CONSTRAINT fk_user
                       FOREIGN KEY (user_id)
                       REFERENCES user_table(id)
                       ON DELETE CASCADE,
    CONSTRAINT fk_tweet
                       FOREIGN KEY (tweet_id)
                       REFERENCES tweet_table(id)
                       ON DELETE CASCADE
);

CREATE TABLE follower_table(
                               id INT PRIMARY KEY NOT NULL,
                               user_id INT,
                               follower_id INT,
                               create_at TIMESTAMP DEFAULT NOW(),
                               CONSTRAINT fk_user
                                   FOREIGN KEY (user_id)
                                       REFERENCES user_table(id)
                                       ON DELETE CASCADE,
                               CONSTRAINT fk_user_follower
                                   FOREIGN KEY (follower_id)
                                       REFERENCES user_table(id)
                                       ON DELETE CASCADE
);