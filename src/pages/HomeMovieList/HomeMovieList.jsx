import React, { useEffect, useState } from "react";
import fetchWithAuth from "../../utils/fetchWithAuth.jsx";
import { useSearchParams } from "react-router";

// async function fetchWithAuth(url) {
//   const res = await fetch(url, {
//     headers: {
//       Authorization: `Bearer ${BEARER_TOKEN}`,
//     },
//   });
//   if (!res.ok) throw new Error("Network response was not ok");
//   return res.json();
// }

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
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });

  useEffect(() => {
    async function getMovieList() {
      console.log(searchParams);
      try {
        const genresData = await fetchWithAuth(import.meta.env.VITE_GENRES_API);
        const genresNamed = genresData.genres;

        const moviesData = await fetchWithAuth(
          import.meta.env.VITE_NOW_PLAYING_API,
        );
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
      <div className="w-full">
        <section className="f-hero-section">
          <div className="title-list">LIST MOVIE OF THE WEEK</div>
          <div className="title-slogan">
            Experience the Magic of Cinema: Book Your Tickets Today
          </div>
        </section>

        {/* Main */}
        <div className="flex flex-col items-center">
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
          <div className="grid grid-cols-2 md:grid-cols-4">
            {loading ? (
              <div>Loading...</div>
            ) : (
              movies.map((movie) => (
                <div className="f-singular-movie" key={movie.id}>
                  <div className="container-image-poster">
                    <img
                      width="264px"
                      src={movie.src}
                      alt={movie.title}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    />
                    <div className="hover-link">
                      {/* <a href="../pages/details.html">Details</a> */}
                      {/* <a href="../pages/details.html">Buy Ticket</a> */}
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
          <div className="flex gap-2">
            {[1, 2, 3].map((pageNumber, idx) => {
              return (
                <span
                  key={idx}
                  className="flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-[#2563EB] p-5 text-[#FFFFFF]"
                  onClick={() => {
                    // Logika paginasi
                    setSearchParams((searchParams) => {
                      if (searchParams.has("page")) {
                        searchParams.set("page", pageNumber);
                      } else {
                        searchParams.append("page", pageNumber);
                      }
                      return searchParams;
                    });
                  }}
                >
                  {pageNumber}
                </span>
              );
            })}
            <button className="btn-blue btn-arrow">
              <img src="../assets/icons/white-right-arrow.png" alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
