import { Link, NavLink } from "react-router-dom";
const NavBar = ({ user }) => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#e3f2fd" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarToggleExternalContent"
        >
          {user && (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-item nav-link active" to="/movies">
                    Movies
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-item nav-link" to="/customers">
                    Customers
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-item nav-link" to="/genres">
                    Genres
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-item nav-link" to="/rentals">
                    Rentals
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-item nav-link" to="/profile">
                    {user.name}
                  </NavLink>
                </li>
                {user.isAdmin && (
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/users">
                      Admin
                    </NavLink>
                  </li>
                )}
              </ul>

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
                {user && (
                  <li className="nav-item me-3">
                    <NavLink className="nav-item nav-link" to="/profile">
                      Profile
                    </NavLink>
                  </li>
                )}
                <li className="nav-item me-3">
                  <NavLink className="nav-item nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </ul>
            </>
          )}

          {!user && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
              <li className="nav-item me-3">
                <NavLink className="nav-item nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-item nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
