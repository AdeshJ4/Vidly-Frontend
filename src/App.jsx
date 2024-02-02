import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Genre from "./components/Genre/Genre";
import GenreForm from "./components/Genre/GenreForm";
import Movies from "./components/Movie/Movies";
import MovieForm from "./components/Movie/MovieForm";
import Customer from "./components/Customer/Customer";
import CustomerForm from "./components/Customer/CustomerForm";
import Rental from "./components/Rentals/Rental";
import RentalForm from "./components/Rentals/RentalForm";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";

import auth from "./services/authService";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    console.log("Current User: ", currentUser);
    setUser(currentUser);
  }, []);

  return (
    <>
      <ToastContainer />
      <NavBar user={user} />
      <main>
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<LogoutForm />} />
          <Route
            path="/movies"
            element={<ProtectedRoute Component={Movies} user={user} />}
          />
          <Route
            path="/movies/:id"
            element={<ProtectedRoute Component={MovieForm} />}
          />
          <Route
            path="/customers"
            element={<ProtectedRoute Component={Customer} user={user} />}
          />
          <Route
            path="/customers/:id"
            element={<ProtectedRoute Component={CustomerForm} />}
          />
          <Route
            path="/genres"
            element={<ProtectedRoute Component={Genre} user={user} />}
          />
          <Route
            path="/genres/:id"
            element={<ProtectedRoute Component={GenreForm} />}
          />
          <Route
            path="/rentals"
            element={<ProtectedRoute Component={Rental} user={user} />}
          />
          <Route
            path="/rentals/:id"
            element={<ProtectedRoute Component={RentalForm} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
