import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import LogoutForm from "./components/LogoutForm";
import Home from "./components/Home";
import NavBar from "./components/navBar";
import Genre from "./components/Genre";
import GenreForm from "./components/GenreForm";
import Movies from "./components/Movies";
import MovieForm from "./components/MovieForm";
import Customer from "./components/Customer";
import CustomerForm from "./components/CustomerForm";
import Rental from "./components/Rental";
import RentalForm from "./components/RentalForm";

import auth from "./services/authService";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/common/ProtectedRoute";

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
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<LogoutForm />} />
          <Route
            path="/movies"
            element={<ProtectedRoute Component={Movies} />}
          />
          <Route
            path="/movies/:id"
            element={<ProtectedRoute Component={MovieForm} />}
          />
          <Route
            path="/genres"
            element={<ProtectedRoute Component={Genre} />}
          />
          <Route
            path="/genres/:id"
            element={<ProtectedRoute Component={GenreForm} />}
          />
          <Route
            path="/customers"
            element={<ProtectedRoute Component={Customer} />}
          />
          <Route
            path="/customers/:id"
            element={<ProtectedRoute Component={CustomerForm} />}
          />
          <Route
            path="/rentals"
            element={<ProtectedRoute Component={Rental} />}
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
