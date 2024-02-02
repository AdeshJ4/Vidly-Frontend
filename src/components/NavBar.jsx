import { Link, NavLink } from "react-router-dom";
const NavBar = ({ user }) => {
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <Link className="navbar-brand" to="/">
          Vidly
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {user && (
            <>
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <NavLink className="nav-item nav-link active" to="/movies">
                    Movies
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink className="nav-item nav-link" to="/customers">
                    Customers
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink className="nav-item nav-link" to="/genres">
                    Genres
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink className="nav-item nav-link" to="/rentals">
                    Rentals
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink className="nav-item nav-link" to="/profile">
                    {user.name}
                  </NavLink>
                </li>
              </ul>

              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex">
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