import React from "react";
import { NavLink } from "react-router-dom";
import vidlyHomeImg from "../images/vidly_img.jpg";
import batman from "../images/batman.jpg";
import hobbit from "../images/hobbit.png";
import inception from "../images/inception.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFax } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const Home = () => {
  return (
    <>
      <h1 className="text-center mb-4">
        Welcome to Vidly - Your Movie Rental Destination
      </h1>

      <div className="row">
        <div className="col-md-6">
          <img
            src={vidlyHomeImg}
            alt="Movie Rental"
            className="img-fluid rounded mx-auto d-block"
            style={{ maxWidth: "70%", height: "auto" }}
          />
        </div>
        <div className="col-md-6">
          <p className="lead">
            Explore a vast collection of movies for your entertainment. From
            classic favorites to the latest releases, Vidly has it all.
          </p>
          <p className="lead">
            Sign up to enjoy the benefits of our movie rental service. Rent
            movies, manage your account, and experience the convenience of
            Vidly.
          </p>
          <div className="text-center mt-4">
            <NavLink
              to="/movies"
              className="btn btn-primary btn-lg"
              role="button"
            >
              Explore Movies
            </NavLink>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="row">
          <h2 style={{ textAlign: "center" }}>Top Movies</h2>
          <div className="col-lg-4 mb-4">
            {/* style="width: 18rem;" */}
            {/* <div class="card" style={{ width: "18rem" }}> */}
            <div className="card">
              <img src={batman} alt="" class="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">The Dark Knight</h5>
                <p className="card-text">
                  When the menace known as the Joker wreaks havoc and chaos on
                  the people of Gotham, Batman must accept one of the greatest
                  psychological and physical tests of his ability to fight
                  injustice.
                </p>
                <a href="" className="btn btn-outline-success btn-sm">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            <div className="card">
              <img src={hobbit} alt="" class="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">The Hobbit</h5>
                <p className="card-text">
                  A reluctant Hobbit, Bilbo Baggies, sets out to the Lonely
                  Mountain with a spirited group of dwarves to reclaim their
                  mountain home, and the gold within it from the dragon Smug.
                </p>
                <a href="" className="btn btn-outline-success btn-sm">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 mb-4">
            {/* <div class="card" style={{ width: "18rem" }}> */}
            <div className="card">
              <img src={inception} alt="" class="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">Inception</h5>
                <p className="card-text">
                  A thief who steals corporate secrets through the use of
                  dream-sharing technology is given the inverse task of planting
                  an idea into the mind of a C.E.O., but his tragic past may
                  doom the project and his team to disaster.
                </p>
                <a href="" className="btn btn-outline-success btn-sm">
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <footer
          className="text-white text-center text-lg-start"
          style={{ backgroundColor: "#23242a" }}
        >
          <div className="container p-4">
            <div className="row mt-4">
              {/* checked */}
              <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-4">About company</h5>

                <p>
                  Welcome to Vidly, your ultimate destination for an
                  unparalleled movie rental experience. At Vidly, we're
                  passionate about bringing the joy of movies to your
                  fingertips, providing a vast and diverse collection of films
                  for your entertainment.
                </p>

                <div className="mt-4">
                  <a
                    type="button"
                    class="btn btn-floating btn-warning btn-lg rounded-circle"
                  >
                    <FontAwesomeIcon icon={faGoogle} className="me-2" />
                  </a>

                  <a
                    type="button"
                    class="btn btn-floating btn-warning btn-lg rounded-circle"
                  >
                    <FontAwesomeIcon icon={faFacebook} className="me-2" />
                  </a>
                  <a
                    type="button"
                    class="btn btn-floating btn-warning btn-lg rounded-circle"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a
                    type="button"
                    class="btn btn-floating btn-warning btn-lg rounded-circle"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>
              </div>

              {/* problem */}
              <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-4 pb-1">Search something</h5>

                {/* checked */}
                <div className="form-outline form-white mb-4">
                  <input
                    type="text"
                    id="formControlLg"
                    className="form-control form-control-lg"
                  />
                  <div className="form-notch">
                    <div
                      className="form-notch-leading"
                      style={{ width: "9px" }}
                    ></div>
                    <div
                      className="form-notch-middle"
                      style={{ width: "48.8px" }}
                    ></div>
                    <div className="form-notch-trailing"></div>
                  </div>
                </div>
                <ul className="fa-ul" style={{ marginLeft: "1.65em" }}>
                  <li className="mb-3">
                    <span className="fa-li">
                      <FontAwesomeIcon
                        icon={faHome}
                        style={{ color: "white" }}
                      />
                    </span>
                    <span className="ms-2">Lohegaon, Pune</span>
                  </li>
                  <li className="mb-3">
                    <span className="fa-li">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        style={{ color: "white" }}
                      />
                    </span>
                    <span className="ms-2">
                      vidlymoviesapplication@gmail.com
                    </span>
                  </li>
                  <li className="mb-3">
                    <span className="fa-li">
                      <FontAwesomeIcon
                        icon={faPhone}
                        style={{ color: "white" }}
                      />
                    </span>
                    <span className="ms-2">+91 952 737 0288</span>
                  </li>
                  <li className="mb-3">
                    <span className="fa-li">
                      <FontAwesomeIcon
                        icon={faFax}
                        style={{ color: "white" }}
                      />
                    </span>
                    <span className="ms-2">+91 7721 031 355</span>
                  </li>
                </ul>
              </div>

              {/* checked */}
              <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                <h5 className="text-uppercase mb-4">Opening hours</h5>

                <table className="table text-center text-white">
                  <tbody className="font-weight-normal">
                    <tr>
                      <td>Mon - Thu:</td>
                      <td>8am - 9pm</td>
                    </tr>
                    <tr>
                      <td>Fri - Sat:</td>
                      <td>8am - 1am</td>
                    </tr>
                    <tr>
                      <td>Sunday:</td>
                      <td>9am - 10pm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* checked */}
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2021 Vidly, Inc. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;
