// Library
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useDebounce } from "use-debounce";

// Components
import SingleMovie from "../../components/SingleMovie.jsx";
import { Pagination } from "./Pagination.jsx";
import Loader from "../../components/Loader.jsx";
import fetchBEWithoutAuth from "../../utils/fetchBEWithoutAuth.jsx";

// Constants
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

// MAIN COMPONENT
export default function MovieList() {
  // State Management
  const [checkedFilter, setCheckedFilter] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
  });
  const [debouncedValue] = useDebounce(searchQuery, 1000);
  const [selectedGenreIds, setSelectedGenreIds] = useState("");

  /**
   * Updates URL search params for search query
   * @param {string} encodedQuery - URL-encoded search query
   */
  const updateQueryInSearchParams = (encodedQuery) => {
    // If empty, remove query param instead of setting it to empty string
    if (!encodedQuery) {
      setSearchParams((sp) => {
        sp.delete("keywords");
        return sp;
      });
      return;
    }

    setSearchParams((searchParams) => {
      if (searchParams.has("keywords")) {
        searchParams.set("keywords", encodedQuery);
      } else {
        searchParams.append("keywords", encodedQuery);
      }
      return searchParams;
    });
  };

  /**
   * Removes specific parameter from search params
   * @param {string} paramName - Parameter name to remove
   */
  function removeFromSearchParams(paramName) {
    setSearchParams((sp) => {
      sp.delete(paramName);
      return sp;
    });
  }

  const buildApiUrl = () => {
    const baseUrl = `${import.meta.env.VITE_BE_HOST}/api/v1/movies/`;

    // Create URLSearchParams from current searchParams
    const params = new URLSearchParams();

    // Add page parameter (always present, defaults to 1)
    const page = searchParams.get("page") || "1";
    params.append("page", page);

    // Add keywords if present
    const keywords = searchParams.get("keywords");
    if (keywords && keywords.trim()) {
      params.append("keywords", keywords);
    }

    // Add genres - prioritize searchParams over state for consistency
    const genresFromParams = searchParams.get("genres");
    if (genresFromParams && genresFromParams.trim()) {
      params.append("genres", genresFromParams);
    } else if (selectedGenreIds && selectedGenreIds.trim()) {
      // Only use selectedGenreIds if no genres in searchParams
      params.append("genres", selectedGenreIds);
    }

    // Build final URL
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  // API Functions
  /**
   * Fetches movie list from API based on current filters and search parameters
   */
  async function getMovieList() {
    try {
      // Every time try to fetch, set the isLoading to true
      setLoading(true);

      const urlMovies = buildApiUrl();
      console.log("Fetching movies from:", urlMovies); // For debugging

      // Fetch movies all (without any params)
      const moviesData = await fetchBEWithoutAuth("GET", urlMovies);

      const results = moviesData.data;

      // Handle null or empty results
      if (!results || !Array.isArray(results) || results.length == 0) {
        console.log("No movies found or results is null/empty");
        setMovies([]);
        return;
      }

      const movieList = results
        // Sometimes there's a movie with no picture, skip if poster_path is null
        .filter((movie) => movie.poster_path !== null)
        .map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            // genres: getGenreNameFromID(movie.genres, genresNamed),
            genres: movie.genres,
            src: `${import.meta.env.VITE_POSTER_PATH}/${movie.poster_img}`,
          };
        });

      setMovies(movieList);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  // Event Handlers

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

  // Effects

  // Update selected genre IDs when filter changes
  useEffect(() => {
    const ids = checkedFilter
      .map((name) => FILTER_BUTTONS.find((g) => g.name === name)?.id)
      .filter(Boolean)
      .join(",");
    setSelectedGenreIds(ids);
  }, [checkedFilter]);

  // Update searchParams every debounced value changed
  useEffect(() => {
    const encodedQuery = encodeURIComponent((debouncedValue || "").trim());

    if (!encodedQuery) {
      removeFromSearchParams("keywords");
      return; // prevent re-adding `query` with an empty value below
    }

    updateQueryInSearchParams(encodedQuery);
  }, [debouncedValue]);

  // Fetch movies when search parameters, search query, or genres change
  useEffect(() => {
    console.log(searchParams);
    getMovieList();
  }, [searchParams, selectedGenreIds]);

  return (
    <div className="flex w-full flex-col gap-8">
      {/* Hero Section */}
      <section className="relative flex h-96 flex-col items-start justify-center bg-[url('/avengers.png')] bg-cover bg-center px-12 after:absolute after:inset-0 after:bg-black/70 md:px-[var(--medium-pad)]">
        <div className="relative z-20 text-lg font-semibold text-[#FFFFFF]">
          LIST MOVIE OF THE WEEK
        </div>
        <div className="relative z-20 text-5xl font-normal text-[#FFFFFF]">
          Experience the Magic of Cinema: Book Your Tickets Today
        </div>
      </section>

      {/* Main */}
      <div className="flex flex-col items-center gap-10 px-[var(--small-pad)] md:px-[var(--medium-pad)]">
        {/* Cari Event dan Filter */}
        <div className="flex w-full flex-col items-center gap-8 md:flex-row">
          {/* Filter query */}
          <div className="flex items-center gap-8">
            <label htmlFor="keywords" className="font-medium text-[#4E4B66]">
              Cari Event
            </label>
            <div className="flex h-16 items-center gap-5 rounded-md border-[1px] border-[#DEDEDE] px-3">
              <img src="/search.png" alt="" />
              <input
                name="keywords"
                className="outline-0"
                type="text"
                id="keywords"
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
          className={`${isLoading ? "" : "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-y-8"}`}
        >
          {isLoading ? (
            <Loader />
          ) : (
            movies.map((movie, idx) => <SingleMovie key={idx} movie={movie} />)
          )}
        </div>

        {/*  Page Navigation  */}
        <Pagination
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>
    </div>
  );
}
