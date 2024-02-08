import React from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) => {
  return (
    <ul className="list-group">
      <li
        onClick={() => onItemSelect(null)}
        className={selectedItem ? "list-group-item" : "list-group-item active"}
      >
        All
      </li>
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
// import React from "react";

// const ListGroup = ({ genres, selectedGenre, onGenreSelect }) => {
//   return (
//     <ul className="list-group">
//       <li
//         onClick={() => onGenreSelect(null)}
//         className={selectedGenre ? "list-group-item" : "list-group-item active"}
//       >
//         All Genres
//       </li>
//       {genres.map((genre) => (
//         <li
//           key={genre._id}
//           onClick={() => onGenreSelect(genre)}
//           className={
//             genre === selectedGenre
//               ? "list-group-item active"
//               : "list-group-item"
//           }
//         >
//           {genre.name}
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default ListGroup;
