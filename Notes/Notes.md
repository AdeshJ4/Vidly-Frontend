main.jsx:
--------
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);
    

App.jsx: 
--------
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Blogs from "./Pages/Blogs";
import Contact from "./Pages/Contact";

const App = () => {
  return (
    <>
      <header>
        <h1>Vidly - header</h1>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/heading" element={<><p>You can type anything here</p></>} /> 
      </Routes>
      
      <footer>
        <h1>Vidly - footer</h1>
      </footer>
    </>
  );
};
export default App;


Note: 
1. You can write anything inside element.
<Route path="/heading" element={<><p>You can type anything here</p></>} />  

2. if you give same path for two Route, then only first Route will be rendered.
eg> <Home /> will be rendered and not <Blogs />.
        <Route path="/" element={<Home />} />
        <Route path="/" element={<Blogs />} />

3. instead of using <a href=""> we are going to use <Link to="">. because anchor tag refresh the page but <Link> don't.
<Link> tag automatically swap the things instead of refreshing them.

4. the 'to' attribute of <Link to="/about"> will search url define inside it, in <Route path="/about" element={<Contact />} />
it will compare 'to' url with path url, and if both are match then corresponding element attribute will be executed. 

App.jsx:
-------
      <nav>
        <ul>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/contact" element={<About />} />
      </Routes>


5. You can use <Link to=''> inside a <Button><Link to="/contacts">Contacts</Link></Button>

6. 
App.jsx:
const App = () => {
  return (
    <>
      <Layout />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/movies/:id" element={<Movie />} />
        <Route path="/movies/:id/:name/:genre" element={<Movie />} />
        <Route path="/movies/new" element={<NewMovie />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
};


Layout.jsx
const Layout = () => {
  return (
    <>
      <nav>
            <ul>
              <li >
                <Link to="/">Home</Link>
              </li>
              <li >
                <Link to="/movies">Movies</Link>
              </li>
            </ul>
      </nav>
    </>
  );
};


Movie.jsx
const Movie = () => {
  const { id, name, genre } = useParams();
  return (
    <div className="container mt-4">
      <h4>Movie</h4>
      <p>Id: {id}</p>
      <p>Name: {name}</p>
      <p>Genre: {genre}</p>
      <button>
        <Link to="/movies">Back</Link>
      </button>
    </div>
  );
};


MovieList.jsx
const MovieList = () => {
  return (
    <div className="container mt-4">
      <h4>All Movies</h4>
      <Link to="/movies/101/Movie1/Action">Movie 1</Link> <br />
      <Link to="/movies/102/Movie2/Drama">Movie 2</Link> <br />
      <Link to="/movies/new">Create New Movie</Link>
    </div>
  );
};


NewMovie.jsx:
const NewMovie = () => {
  return (
    <div style={{padding: '20px'}}>
      <div>New Movie</div>
      <form >
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" />
        </div>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Genre</label>
            <input type="text" className="form-control" />
        </div>
        <button type="submit" className="btn btn-light"><Link to='/movies'>Submit</Link></button>
      </form>
    </div>
  );
};
