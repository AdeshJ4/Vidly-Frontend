import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

const MovieForm = () => {
  const [data, setData] = useState({
    title: "",
    genreId: "",
    numberInStock: 0,
    dailyRentalRate: 0,
  });
  const [genres, setGenres] = useState([]);
  const { id } = useParams(); 
  const navigate = useNavigate();

  const {
    handleSubmit,
    register
  } = useForm();

  const populateGenres = async () => {
    const { data: genresData } = await getGenres();
    setGenres(genresData);
  };

  const populateMovie = async () => {
    try {
      const movieId = id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      setData(mapToViewModel(movie));
    } catch (ex) {
      if (ex.response && ex.response.status === 404) navigate("*");
    }
  };

  const fetchData = async () => {
    populateGenres();
    populateMovie();
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const onSubmit = async (submittedData) => {
    console.log(submittedData);
    await saveMovie(submittedData);
    navigate("/movies");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Movie Name
        </label>
        <input
          {...register("title")}
          type="text"
          defaultValue=""
          className="form-control"
        />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Genre</label>
        <select {...register("genreId")} className="form-control">
          <option value="">Select Genre -- </option>
          {genres.map((genre) => (
            <option key={genre._id} value={genre._id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">number In Stock</label>
        <input
          type="number"
          {...register("numberInStock")}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          daily Rental Rate
        </label>
        <input
          type="number"
          {...register("dailyRentalRate")}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default MovieForm;







// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import { getGenres } from "../services/genreService";
// import { getMovie, saveMovie } from "../services/movieService";

// const MovieForm = () => {
//   const [data, setData] = useState({
//     title: "",
//     genreId: "",
//     numberInStock: 0,
//     dailyRentalRate: 0,
//   });
//   const [genres, setGenres] = useState([]);
//   const { id } = useParams(); 
//   const navigate = useNavigate();

//   const {
//     handleSubmit,
//     register
//   } = useForm();

//   const populateGenres = async () => {
//     const { data: genresData } = await getGenres();
//     setGenres(genresData);
//   };

//   const populateMovie = async () => {
//     try {
//       const movieId = id;
//       if (movieId === "new") return;
//       const { data: movie } = await getMovie(movieId);
//       setData(mapToViewModel(movie));
//     } catch (ex) {
//       if (ex.response && ex.response.status === 404) navigate("*");
//     }
//   };

//   const fetchData = async () => {
//     populateGenres();
//     populateMovie();
//   };

//   useEffect(() => {
//     fetchData();
//   }, [id]);

//   const onSubmit = async (submittedData) => {
//     console.log(submittedData);
//     await saveMovie(submittedData);
//     navigate("/movies");
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="mb-3">
//         <label htmlFor="name" className="form-label">
//           Movie Name
//         </label>
//         <input
//           {...register("title")}
//           type="text"
//           defaultValue=""
//           className="form-control"
//         />
//       </div>

//       <div className="form-group mb-3">
//         <label className="form-label">Genre</label>
//         <select {...register("genreId")} className="form-control">
//           <option value="">Select Genre -- </option>
//           {genres.map((genre) => (
//             <option key={genre._id} value={genre._id}>
//               {genre.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-3">
//         <label className="form-label">number In Stock</label>
//         <input
//           type="number"
//           {...register("numberInStock")}
//           className="form-control"
//         />
//       </div>

//       <div className="mb-3">
//         <label htmlFor="age" className="form-label">
//           daily Rental Rate
//         </label>
//         <input
//           type="number"
//           {...register("dailyRentalRate")}
//           className="form-control"
//         />
//       </div>

//       <button type="submit" className="btn btn-primary">
//         Submit
//       </button>
//     </form>
//   );
// };

// export default MovieForm;
