import React from "react";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Like from "../components/common/Like";
import _ from "lodash";

const MoviesTable = ({ movies, sortColumn, onSort, onLike, onDelete }) => {
  // column fields
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      label: "Like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => onLike(movie)} />
      ),
    },
  ];

  // admin delete operation
  const deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button onClick={() => onDelete(movie)} className="btn btn-danger btn-sm">
        Delete
      </button>
    ),
  };

  // event handlers related to thead
  const raiseSort = (path) => {
    const newSortColumn = { ...sortColumn };
    if (newSortColumn.path === path)
      newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc";
    else {
      newSortColumn.path = path;
      newSortColumn.order = "asc";
    }
    onSort(newSortColumn);
  };

  const renderSortIcon = (column) => {
    if (column.path !== sortColumn.path) return null;
    return sortColumn.order === "asc" ? (
      <i className="fa fa-sort-asc" />
    ) : (
      <i className="fa fa-sort-desc" />
    );
  };

  // event handlers related to tbody
  const renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  const createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };

  const user = auth.getCurrentUser();
  if (user && user.isAdmin) columns.push(deleteColumn);


  
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              className="clickable"
              key={column.path}
              onClick={() => raiseSort(column.path)}
            >
              {column.label} {renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {movies.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={createKey(item, column)}>{renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
