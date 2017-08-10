-- up
CREATE TABLE movies (
  id          serial,
  movie_title text,
  sentiment   integer
);
---

-- down
DROP TABLE movies;
