import React, { useState } from "react";
import { saveRental } from "../../services/rentalService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const RentalForm = () => {
  const [selectedMovies, setSelectedMovies] = useState([]);

  const addMovie = ({ movieId }) => {
    if (movieId && !selectedMovies.includes(movieId)) {
      setSelectedMovies([...selectedMovies, movieId]);
      setValue("movieId", ""); // Clear the input field after adding the movie
    }
  };

  const removeMovie = (movieId) => {
    const updatedMovies = selectedMovies.filter((id) => id !== movieId);
    setSelectedMovies(updatedMovies);
  };

  const navigate = useNavigate();
  const { handleSubmit, register, setValue } = useForm();

  const onSubmit = (submittedData) => {
    console.log(submittedData);
    saveRental(submittedData);
    navigate("/rentals");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Customer Id</label>
          <input
            {...register("customerId")}
            type="text"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Enter Movie ID:</label>
          <input
            {...register("movieId")}
            type="text"
            className="form-control"
          />
          {/* <button type="submit" onClick={()=>addMovie()}> */}
          <button type="submit">
            Add Movie
          </button>
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Date Returned
          </label>
          <input
            {...register("dateReturned")}
            type="datetime-local"
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {selectedMovies && (
        <>
          <h3>Selected Movies:</h3>
          <ul>
            {selectedMovies.map((movieId) => (
              <li key={movieId}>
                {movieId}
                <button type="button" onClick={() => removeMovie(movieId)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
export default RentalForm;
