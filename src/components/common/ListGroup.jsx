import React from "react";

const ListGroup = ({ genres, selectedGenre, onGenreSelect }) => {
  console.log(genres);
  return (
    <ul className="list-group">
      <li
        onClick={() => onGenreSelect(null)}
        className={selectedGenre ? "list-group-item" : "list-group-item active"}
      >
        All Genres
      </li>
      {genres.map((genre) => (
        <li
          key={genre._id}
          onClick={() => onGenreSelect(genre)}
          className={
            genre === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
