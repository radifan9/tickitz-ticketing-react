import React, { useEffect, useState } from "react";
import "./HomeMovieList.css";

const NOW_PLAYING_API =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const GENRES_API = "https://api.themoviedb.org/3/genre/movie/list?language=en";
const BEARER_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZjQzNWJiZWRhY2M0NDk3MWMxNDc1MTNkYjJmZWU2MiIsIm5iZiI6MTc1MzQ1NzY4Ni42OTQwMDAyLCJzdWIiOiI2ODgzYTQxNjQ4ZWE1NTk3MzM1NWU5NzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RbZg1YOqjIUcqo3C5T5GzumDBEDDi7KFi85Md91coIg";

async function fetchWithAuth(url) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  });
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

const getGenreNameFromID = (listOfGenreID, listOfGenreName) => {
  return listOfGenreID
    .map((id) => {
      const genreObj = listOfGenreName.find((el) => id === el.id);
      return genreObj ? genreObj.name : null;
    })
    .filter(Boolean);
};

export default function HomeMovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getMovieList() {
      try {
        const genresData = await fetchWithAuth(GENRES_API);
        const genresNamed = genresData.genres;

        const moviesData = await fetchWithAuth(NOW_PLAYING_API);
        const results = moviesData.results;

        const movieList = results.map((movie) => {
          return {
            id: movie.id,
            title: movie.original_title,
            genres: getGenreNameFromID(movie.genre_ids, genresNamed),
            src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          };
        });

        setMovies(movieList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getMovieList();
  }, []);

  return (
    <>
      <nav className="nav-container">
        <ul className="navbar">
          <li>
            <a href="./home.html">
              <img src="/tickitz-blue.png" alt="" />
            </a>
          </li>
          <li className="home">
            <a href="./home.html">Home</a>
          </li>
          <li className="movie">
            <a href="./home-movie-list-new.html">Movie</a>
          </li>
          <li className="buy-ticket">
            <a href="./order-page.html">Buy Ticket</a>
          </li>
          <li className="sign-in">
            <a className="btn-signin" href="./login.html">
              Sign In
            </a>
          </li>
          <li className="sign-up">
            <a className="btn-signup" href="./register.html">
              Sign Up
            </a>
          </li>
          {/* <li>Location</li>
        <li><img src="../assets/icons/arrow-negative.png" alt="" /></li>
        <li><img src="../assets/icons/search.png" alt="" /></li>
        <li><img src="../assets/images/profile-pic-small.png" alt="" /></li> */}
          <li className="hamburger-menu">
            <img src="/hamburger-menu.png" alt="" />
          </li>
        </ul>
      </nav>
      <div className="container">
        <section className="f-hero-section">
          <div className="title-list">LIST MOVIE OF THE WEEK</div>
          <div className="title-slogan">
            Experience the Magic of Cinema: Book Your Tickets Today
          </div>
        </section>

        <main className="main-movie-list">
          <div className="f-search-bar">
            <div className="f-search-key">
              <label htmlFor="keyword">Cari Event</label>
              <input type="text" id="keyword" placeholder="New Born Expert" />
            </div>
            <div className="f-select-filter">
              <div className="title-filter">Filter</div>
              <div className="f-filter-list">
                <button>Thriller</button>
                <button>Horror</button>
                <button>Romantic</button>
                <button>Adventure</button>
                <button>Sci-Fi</button>
              </div>
            </div>
          </div>

          {/* Grid Movie List */}
          <div className="g-movie-list">
            {loading ? (
              <div>Loading...</div>
            ) : (
              movies.map((movie) => (
                <div className="f-singular-movie" key={movie.id}>
                  <div className="container-image-poster">
                    <img src={movie.src} alt={movie.title} />
                    <div className="hover-link">
                      <a href="../pages/details.html">Details</a>
                      <a href="../pages/details.html">Buy Ticket</a>
                    </div>
                  </div>
                  <h3>{movie.title}</h3>
                  <div className="genres">
                    <ul>
                      {movie.genres.slice(0, 2).map((genre) => (
                        <li key={genre}>{genre}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* <!-- Page Navigation --> */}
          <div className="container-page-nav">
            <button className="btn-blue">1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button className="btn-blue btn-arrow">
              <img src="../assets/icons/white-right-arrow.png" alt="" />
            </button>
          </div>

          {/* <!-- Subscribe --> */}
          <section className="subscribe">
            <div className="subscribe-text">Subscribe to our newsletter</div>
            <div className="subscribe-input">
              <input type="text" placeholder="First Name" />
              <input type="email" placeholder="Email address" />
              <button className="subscribe-button">Subscribe Now</button>
            </div>
          </section>
        </main>
        <footer>
          <div className="footer-side-side">
            <span className="logo-slogan">
              <img src="../assets/images/tickitz_large.png" alt="" />
              <div>Stop waiting in line. Buy tickets</div>
              <div>conveniently, watch movies quietly.</div>
            </span>
            <span>
              <div className="explore">Explore</div>
              <ul className="explore-list">
                <li>
                  <a href="#">Cinemas</a>
                </li>
                <li>
                  <a href="#">Movies List</a>
                </li>
                <li>
                  <a href="./order-history.html">My Ticket</a>
                </li>
                <li>
                  <a href="#">Notification</a>
                </li>
              </ul>
            </span>
            <span>
              <div className="sponsor">Our Sponsor</div>
              <ul className="sponsor-list">
                <li>
                  <img src="../assets/images/ebv.id 2.png" alt="" />
                </li>
                <li>
                  <img src="../assets/images/CineOne21-fitted.png" alt="" />
                </li>
                <li>
                  <img src="../assets/images/hiflix 2.png" alt="" />
                </li>
              </ul>
            </span>
            <span>
              <div className="follow">Follow us</div>
              <ul className="follow-list">
                <li>
                  <a href="#">
                    <img src="../assets/icons/facebook.png" alt="Facebook" />
                    <span>Tickitz Cinema id</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="../assets/icons/instagram.png" alt="Instagram" />
                    <span>tickitz.id</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="../assets/icons/twitter.png" alt="Twitter" />
                    <span>tickitz.id</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="../assets/icons/youtube.png" alt="Youtube" />
                    <span>Tickitz Cinema id</span>
                  </a>
                </li>
              </ul>
            </span>
          </div>

          <div className="copyright">© 2020 Tickitz. All Rights Reserved.</div>
        </footer>
      </div>
    </>
  );
}
