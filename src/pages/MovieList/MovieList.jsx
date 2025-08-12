// --- Library
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useDebounce } from "use-debounce";

// --- Utils
import fetchWithAuth from "../../utils/fetchWithAuth.jsx";
import getGenreNameFromID from "../../utils/getGenreNameFromID.jsx";

// --- Components
import SingleMovie from "../../components/SingleMovie.jsx";
import { Pagination } from "./Pagination.jsx";
import Loader from "../../components/Loader.jsx";

// --- Constants
const FILTER_BUTTONS = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const PAGINATION_ITEMS = [1, 2, 3, "/white-right-arrow.png"];

// --- MAIN COMPONENT
export default function MovieList() {
  // --- --- State Management
  const [checkedFilter, setCheckedFilter] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
  });
  const [debouncedValue] = useDebounce(searchQuery, 1000);
  const [selectedGenreIds, setSelectedGenreIds] = useState("");

  // --- --- Helper Functions
  /**
   * Updates URL search params for genres
   * @param {string} genreIds - Comma-separated genre IDs
   */
  function updateGenresInSearchParams(genreIds) {
    setSearchParams((searchParams) => {
      if (searchParams.has("genres")) {
        // If genres exists, replace existing value for genres
        searchParams.set("genres", genreIds);
      } else {
        // If genres doesn't exists, add new genres param
        searchParams.append("genres", genreIds);
      }
      // Returns updated params
      return searchParams;
    });
  }

  /**
   * Removes specific parameter from search params
   * @param {string} paramName - Parameter name to remove
   */
  function removeFromSearchParams(paramName) {
    console.log(`Removed param ${paramName}`);
    setSearchParams((sp) => {
      sp.delete(paramName);
      return sp;
    });
    console.log(`Param now ${searchParams.get(paramName)}`);
  }

  // Recompute selected genre IDs whenever checkedFilter changes
  useEffect(() => {
    const ids = checkedFilter
      .map((name) => FILTER_BUTTONS.find((g) => g.name === name)?.id)
      .filter(Boolean)
      .join(",");
    setSelectedGenreIds(ids);
  }, [checkedFilter]);

  // --- --- API Functions
  /**
   * Fetches movie list from API based on current filters and search parameters
   */
  async function getMovieList() {
    try {
      // Every time try to fetch, set the isLoading to true
      setLoading(true);

      let urlMovies;
      const genresData = await fetchWithAuth(import.meta.env.VITE_GENRES_API);
      const genresNamed = genresData.genres;

      // If any genre filter is selected, disable query search and use discover endpoint
      if (selectedGenreIds) {
        removeFromSearchParams("query");
        updateGenresInSearchParams(selectedGenreIds);

        urlMovies = `${import.meta.env.VITE_API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=${selectedGenreIds}&${searchParams.toString()}`;
      } else if (searchQuery === "") {
        setSearchParams((searchParams) => {
          searchParams.delete("query");
        });

        // Fetch using now playing API
        urlMovies = `${import.meta.env.VITE_API_URL}/movie/now_playing?${searchParams.toString()}&language=en-US`;
      } else if (searchQuery !== "") {
        // Filter movie based on query
        const encodedQuery = encodeURIComponent(debouncedValue);

        // Set encoded query to search params
        setSearchParams((searchParams) => {
          if (searchParams.has("query")) {
            searchParams.set("query", encodedQuery);
          } else {
            searchParams.append("query", encodedQuery);
          }
          return searchParams;
        });

        urlMovies = `${import.meta.env.VITE_API_URL}/search/movie?query=${encodedQuery}&include_adult=false&language=en-US&${searchParams.toString()}`;
      }

      const moviesData = await fetchWithAuth(urlMovies);
      const results = moviesData.results;

      const movieList = results
        // Sometimes there's a movie with no picture, skip if poster_path is null
        .filter((movie) => movie.poster_path !== null)
        .map((movie) => {
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

  // --- --- Event Handlers

  /**
   * Handles filter button clicks for genre selection
   * @param {string} filterName - Name of the genre to toggle
   */
  const handleFilterClick = (filterName) => {
    setCheckedFilter((prev) => {
      // If clicked genres already in array, remove it
      if (prev.includes(filterName)) {
        return prev.filter((item) => item !== filterName);
      }

      // Otherwise, add it
      return [...prev, filterName];
    });
  };

  // --- --- Effects
  // Fetch movies when search parameters, search query, or genres change
  useEffect(() => {
    getMovieList();
  }, [searchParams, debouncedValue, selectedGenreIds]);

  return (
    <div className="flex w-full flex-col gap-8">
      {/* Hero Section */}
      <section className="relative flex h-96 flex-col items-start justify-center bg-[url('/avengers.png')] bg-cover bg-center px-12 after:absolute after:inset-0 after:bg-black/70 md:px-72">
        <div className="relative z-20 text-lg font-semibold text-[#FFFFFF]">
          LIST MOVIE OF THE WEEK
        </div>
        <div className="relative z-20 text-5xl font-normal text-[#FFFFFF]">
          Experience the Magic of Cinema: Book Your Tickets Today
        </div>
      </section>

      {/* Main */}
      <div className="flex flex-col items-center gap-10">
        {/* Cari Event dan Filter */}
        <div className="flex w-2/3 flex-col gap-8 md:flex-row">
          {/* Filter query */}
          <div className="flex items-center gap-8">
            <label htmlFor="query" className="font-medium text-[#4E4B66]">
              Cari Event
            </label>
            <div className="flex h-16 items-center gap-5 rounded-md border-[1px] border-[#DEDEDE] px-3">
              <img src="/search.png" alt="" />
              <input
                name="query"
                className="outline-0"
                type="text"
                id="query"
                placeholder="New Born Expert"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(() => e.target.value);
                }}
              />
            </div>
          </div>

          {/* Filter Genre */}
          <div className="flex items-center gap-8">
            <div className="font-medium text-[#4E4B66]">Filter</div>
            <div className="flex w-fit flex-wrap gap-1.5">
              {FILTER_BUTTONS.map((el, idx) => (
                <div
                  key={idx}
                  className="flex items-center"
                  onClick={() => handleFilterClick(el.name)}
                >
                  <div
                    className={`cursor-pointer rounded-lg px-5 py-2 text-sm ${
                      checkedFilter.includes(el.name)
                        ? "bg-[#1D4ED8] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {el.name}
                  </div>
                  <input
                    type="checkbox"
                    id={el.name}
                    name={el.name}
                    checked={checkedFilter.includes(el.name)}
                    onChange={() => {}}
                    className="hidden"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid Movie List */}
        <div
          className={`${isLoading ? "" : "grid grid-cols-2 gap-4 md:grid-cols-4"}`}
        >
          {isLoading ? (
            <Loader />
          ) : (
            movies.map((movie, idx) => <SingleMovie key={idx} movie={movie} />)
          )}
        </div>

        {/*  Page Navigation  */}
        <Pagination
          PAGINATION_ITEMS={PAGINATION_ITEMS}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
    </div>
  );
}
