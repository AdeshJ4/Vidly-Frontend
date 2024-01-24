import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <h1 className="display-4">Welcome to Vidly!</h1>
        <p className="lead">
          Vidly is your go-to platform for renting and enjoying the latest
          movies. With a wide selection of genres and new releases, Vidly
          ensures you have a fantastic movie-watching experience.
        </p>
        <hr className="my-4" />
        <p>
          Ready for a movie night? Explore our collection and find the perfect
          movie for you.
        </p>
        <NavLink to="/movies" className="btn btn-primary btn-lg" role="button">
          Explore Movies
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
