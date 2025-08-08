import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router";

import fetchWithAuth from "../../utils/fetchWithAuth";
import getDetails from "../../utils/getDetails";
import getCredits from "../../utils/getCredits";

function Details() {
  // Hooks
  const [movie, setMovie] = useState({ genres: [] });
  const [credits, setCredits] = useState([]);
  const [selectedCinema, setSelectedCinema] = useState();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  let navigate = useNavigate();

  const urlMovie = `${import.meta.env.VITE_API_URL}/movie/${id}`;
  const urlCredits = `${import.meta.env.VITE_API_URL}/movie/${id}/credits`;

  const cinemaList = [
    {
      name: "ebv",
      src: "/ebv-id.png",
    },
    {
      name: "hiflix",
      src: "/hiflix-red.png",
    },
    {
      name: "CineOne21",
      src: "/CineOne21-fitted.png",
    },
    {
      name: "Cinepolis",
      src: "/cinepolis.png",
    },
  ];

  useEffect(() => {
    (async function name() {
      try {
        // Get Movie Details
        const movieData = await fetchWithAuth(urlMovie);
        const movieDetails = getDetails(movieData);
        setMovie(movieDetails);

        // Get Credits Information
        const movieCredits = await fetchWithAuth(urlCredits);
        const creditsInfo = getCredits(movieCredits);
        setCredits(creditsInfo);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // Handler function
  function handleSubmit(e) {
    e.preventDefault();

    navigate("/order", {
      state: {
        movieId: id,
        date: e.target.date.value,
        time: e.target.time.value,
        cityLocation: e.target.cityLocation.value,
        cinema: e.target.cinema.value,
      },
    });
  }

  return (
    <main className="flex flex-col items-center">
      {/* Header image */}
      <img
        className="w-full object-cover md:h-80"
        src={`https://image.tmdb.org/t/p/original/${movie.backdropPath}`}
        alt="${movieDetails.title}"
      />

      <section className="">
        {/* Movie Poster + Info */}
        <div className="-mt-72 flex flex-col items-center md:flex-row">
          {/* Movie Image */}
          <img
            // width="550px"
            className="aspect-6/7 rounded-2xl object-cover md:w-[30%]"
            src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`}
            alt="${movieDetails.title}"
          />

          {/* Info */}
          <span className="flex flex-col items-center">
            <h1 className="text-xl font-medium">{movie.originalTitle}</h1>

            {/* <!-- Genres --> */}
            <div className="genres">
              <ul className="flex gap-4">
                {movie.genres.map((el, idx) => {
                  return <li key={idx}>{el}</li>;
                })}
              </ul>
            </div>

            {/* <!-- About Movie --> */}
            <div className="grid grid-cols-2">
              <span>
                <div className="font-light text-[#8692A6]">Release Date</div>
                <div className="content-info">{movie.releaseDate}</div>
              </span>
              <span>
                <div className="font-light text-[#8692A6]">Directed by</div>
                <div className="content-info">Jon Watss</div>
              </span>
              <span>
                <div className="font-light text-[#8692A6]" title-content>
                  Duration
                </div>
                <div className="content-info">2 hours 13 minutes</div>
              </span>
              <span>
                <div className="font-light text-[#8692A6]">Casts</div>
                <div className="content-info">
                  {credits.map((el, idx) => {
                    if (idx == credits.length - 1) {
                      return `${el}`;
                    }
                    return `${el}, `;
                  })}
                </div>
              </span>
            </div>
          </span>
        </div>

        {/* Synopsis */}
        <div className="">
          <h3 className="text-xl font-medium">Synopsis</h3>
          <p className="text-base font-light text-[#A0A3BD]">
            {movie.overview}
          </p>
        </div>

        {/* <!-- Book Tickets --> */}
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-light">Book Tickets</h2>
          <div className="grid w-full grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-4">
            {/* Choose Date */}
            <span className="flex flex-col gap-2">
              <div className="text-xl font-medium">Choose Date</div>
              <div className="rounded-md bg-[#EFF0F6] px-4 py-3">
                <select className="w-full" name="date">
                  {(() => {
                    const today = new Date();
                    const option1 = new Date(today);
                    option1.setDate(today.getDate());
                    const option2 = new Date(today);
                    option2.setDate(today.getDate() + 1);
                    function formatDate(date) {
                      return date.toISOString().split("T")[0];
                    }
                    return [option1, option2].map((date, idx) => (
                      <option key={idx} value={formatDate(date)}>
                        {date.toLocaleDateString()}
                      </option>
                    ));
                  })()}
                </select>
              </div>
            </span>
            {/* Choose Time */}
            <span className="flex flex-col gap-2">
              <div className="text-xl font-medium">Choose Time</div>
              <div className="flex items-center gap-3 rounded-md bg-[#EFF0F6] px-4 py-3">
                <img src="/clock.png" alt="" />
                <select className="w-full" name="time" id="time">
                  <option value="13:00">13:00</option>
                  <option value="15:00">15:00</option>
                  <option value="19:30">19:30</option>
                </select>
              </div>
            </span>
            <span className="flex flex-col gap-2">
              <div className="text-xl font-medium">Choose Location</div>
              <div className="flex items-center gap-3 rounded-md bg-[#EFF0F6] px-4 py-3">
                <img src="/location.png" alt="" />
                <select className="w-full" name="cityLocation" id="">
                  <option value="bogor">Bogor</option>
                  <option value="bandung">Bandung</option>
                  <option value="surabaya">Surabaya</option>
                </select>
              </div>
            </span>
            <span className="flex flex-col gap-2">
              <div className="invisible text-xl font-medium">Filter Button</div>
              <button className="w-full gap-3 rounded-md bg-[#1D4ED8] px-4 py-3 text-[#F8FAFC]">
                Filter
              </button>
            </span>
          </div>

          {/* <!-- Choose Cinema --> */}
          <div className="container-cinema">
            <div className="heading-cinema">
              <h3 className="text-xl font-medium">Choose Cinema</h3>
              <span className="font-semibold text-[#8692A6]">39 Result</span>
            </div>
            <div className="grid grid-cols-2 items-center gap-8 md:grid-cols-4">
              {/*  Button Choose Cinema   */}
              {cinemaList.map((el, idx) => {
                return (
                  <>
                    <input
                      key={idx}
                      className="hidden"
                      type="radio"
                      id={el.name}
                      name="cinema"
                      value={el.name}
                      checked={selectedCinema === el.name}
                      onChange={() => setSelectedCinema(el.name)}
                    />
                    <label
                      htmlFor={el.name}
                      className={`flex max-h-18 cursor-pointer items-center justify-center rounded-lg border-[1px] border-[#DEDEDE] p-5 ${
                        selectedCinema === el.name ? "bg-[#1D4ED8]" : "bg-white"
                      }`}
                    >
                      <img className="" src={el.src} alt={`Logo ${el.name}`} />
                    </label>
                  </>
                );
              })}
            </div>

            <div className="btns-num">
              {/* <!-- Number --> */}
              <button>1</button>
              <button>2</button>
              <button>3</button>
              <button>4</button>
            </div>
          </div>

          <button
            className="w-1/4 cursor-pointer rounded-sm bg-[#1D4ED8] py-4 text-[#F8FAFC]"
            type="submit"
          >
            Book Now
          </button>
        </form>
      </section>
    </main>
  );
}

export default Details;
