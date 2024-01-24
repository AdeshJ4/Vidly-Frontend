import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="navbar-nav">
          {!user && (
            <>
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </>
          )}
          {user && (
            <>
              <NavLink className="nav-item nav-link" to="/movies">
                Movies
              </NavLink>
              <NavLink className="nav-item nav-link" to="/customers">
                Customers
              </NavLink>
              <NavLink className="nav-item nav-link" to="/rentals">
                Rentals
              </NavLink>
              <NavLink className="nav-item nav-link" to="/profile">
                {user.name}
              </NavLink>
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

// import React from "react";
// import { Link, NavLink } from "react-router-dom";
// import auth from "../services/authService";

// const NavBar = () => {
//   const user = auth.getCurrentUser();

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <Link className="navbar-brand" to="/">
//         Vidly
//       </Link>
//       <div className="collapse navbar-collapse" id="navbarNav">
//         <ul className="navbar-nav">
//           <li className="nav-item">
//             <NavLink className="nav-link" to="/movies">
//               Movies
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link" to="/customers">
//               Customers
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link" to="/rentals">
//               Rentals
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link" to="/genres">
//               Genres
//             </NavLink>
//           </li>
//           {user ? (
//             <>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/profile">
//                   {user.name}
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/logout">
//                   Logout
//                 </NavLink>
//               </li>
//             </>
//           ) : (
//             <>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/login">
//                   Login
//                 </NavLink>
//               </li>
//               <li className="nav-item">
//                 <NavLink className="nav-link" to="/register">
//                   Register
//                 </NavLink>
//               </li>
//             </>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

// import React from "react";
// import { Link, NavLink } from "react-router-dom";

// const NavBar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <Link className="navbar-brand" to="/">
//         Vidly
//       </Link>
//       <div className="collapse navbar-collapse" id="navbarNav">
//         <ul className="navbar-nav">
//           <li className="nav-item">
//             <NavLink className="nav-link" to="/login">
//               Login
//             </NavLink>
//           </li>
//           <li className="nav-item">
//             <NavLink className="nav-link" to="/register">
//               Register
//             </NavLink>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;
