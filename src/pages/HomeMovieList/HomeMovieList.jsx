import React, { useEffect, useState } from "react";
// import "./HomeMovieList.css";

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

          
        </main>
      </div>
    </>
  );
}
