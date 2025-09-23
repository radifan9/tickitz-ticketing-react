import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// Redux actions
import { movieActions } from "../../redux/slice/movieSlice";
import { addOrder } from "../../redux/slice/orderSlice";

// Components
import Genres from "../../components/Genres";
import Loader from "../../components/Loader";

// Utils
import { getDuration } from "../../utils/getDuration";
import { formatMovieReleaseDate } from "../../utils/formatMovieReleaseDate";

// External lib
import { toast } from "sonner";
import apiFetch from "../../utils/apiFetch";

// Variables
const orderInputted = {
  isDateChoosed: false,
  isTimeChoosed: false,
  isLocChoosed: false,
  isCinemaChoosed: false,
};
// Collect error messages and show them sequentially
let messages = [];

// MAIN COMPONENT
function Details() {
  // State & Hooks
  const [selectedCinema, setSelectedCinema] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [cinemas, setCinemas] = useState([]);
  const [showCinemas, setShowCinemas] = useState(false);
  // const [cinemaPagination, _] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Helper functions
  function checkIsLoggedIn() {
    if (activeUser == false) {
      // There's no active user, navigate to SignIn
      console.log("⚠️ No logged in user");
      toast.error("You must logged in first 🙏🏻");
      setTimeout(() => {
        navigate("/signin");
      }, 700);
    }
  }

  // Get movie ID from search params and redirect if missing
  const id = searchParams.get("id");
  if (id === null) {
    navigate("/movies");
  }

  // Redux state
  const movieState = useSelector((state) => state.movie);
  const schedules = useSelector((state) => state.movie.schedules);
  const loggedInState = useSelector((state) => state.loggedIn);
  const activeUser = loggedInState.token !== null;

  // Helper functions to get filtered options
  const getAvailableDates = () => {
    if (!schedules || schedules.length === 0) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to start of today

    return [...new Set(schedules.map((schedule) => schedule.show_date))]
      .filter((dateStr) => {
        const date = new Date(dateStr);
        date.setHours(0, 0, 0, 0); // normalize to start of date
        return date >= today; // keep only today or future
      })
      .sort((a, b) => new Date(a) - new Date(b));
  };

  const getAvailableTimes = () => {
    if (!schedules || schedules.length === 0) return [];

    let filteredSchedules = schedules;
    if (selectedDate) {
      filteredSchedules = filteredSchedules.filter(
        (schedule) => schedule.show_date === selectedDate,
      );
    }
    if (selectedLocation) {
      filteredSchedules = filteredSchedules.filter(
        (schedule) => schedule.city_name.toLowerCase() === selectedLocation,
      );
    }

    return [
      ...new Set(filteredSchedules.map((schedule) => schedule.start_at)),
    ].sort();
  };

  const getAvailableLocations = () => {
    if (!schedules || schedules.length === 0) return [];

    let locationFilteredSchedules = schedules;
    if (selectedDate) {
      locationFilteredSchedules = locationFilteredSchedules.filter(
        (schedule) => schedule.show_date === selectedDate,
      );
    }
    if (selectedTime) {
      locationFilteredSchedules = locationFilteredSchedules.filter(
        (schedule) => schedule.start_at === selectedTime,
      );
    }

    // Deduplicate by city_name
    const uniqueCities = Array.from(
      new Set(
        locationFilteredSchedules.map((schedule) =>
          schedule.city_name.toLowerCase(),
        ),
      ),
    );

    return uniqueCities.map((city) => ({
      value: city,
      label: locationFilteredSchedules.find(
        (schedule) => schedule.city_name.toLowerCase() === city,
      ).city_name, // original label-case
    }));
  };

  const getAvailableCinemas = () => {
    if (!schedules || schedules.length === 0) return [];

    let filteredCinemas = schedules;
    if (selectedDate) {
      filteredCinemas = filteredCinemas.filter(
        (schedule) => schedule.show_date === selectedDate,
      );
    }
    if (selectedTime) {
      filteredCinemas = filteredCinemas.filter(
        (schedule) => schedule.start_at === selectedTime,
      );
    }
    if (selectedLocation) {
      filteredCinemas = filteredCinemas.filter(
        (schedules) => schedules.city_name.toLowerCase() === selectedLocation,
      );
    }

    return [
      ...new Set(filteredCinemas.map((schedule) => schedule.cinema_name)),
    ];
  };

  // Effects
  // Fetch movie data when component mounts
  useEffect(() => {
    dispatch(movieActions.getMovieThunk({ movieId: id }));
    dispatch(
      movieActions.getSchedulesBasedOnMovieID({
        movieID: id,
        token: loggedInState.token,
      }),
    );

    // Fetch cinema list
    (async () => {
      try {
        const json = await apiFetch(
          `/api/v1/schedules/cinemas`,
          "GET",
          loggedInState.token,
        );
        setCinemas(json);
      } catch (err) {
        console.error("Error fetching cinemas", err);
        if (err.status == "401") {
          navigate("/signin");
        }
      }
    })();
  }, []);

  // Reset dependent selections when parent selection changes
  useEffect(() => {
    if (selectedDate) {
      // Check if current time is still available
      const availableTimes = getAvailableTimes();
      if (selectedTime && !availableTimes.includes(selectedTime)) {
        setSelectedTime("");
      }
    }
  }, [selectedDate]);

  // Reset showCinemas
  useEffect(() => {
    setShowCinemas(false);
  }, [selectedDate, selectedTime, selectedLocation]);

  // Handle form submission for booking tickets
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the value
    const date = e.target.date.value;
    const time = e.target.time.value;
    const cityLocation = e.target.cityLocation.value;
    const cinema = e.target.cinema.value;

    // Validation
    // date
    if (date !== "") {
      // setOrderInputted((prev) => ({ ...prev, isDateChoosed: true }));
      orderInputted.isDateChoosed = true;
    } else {
      // setOrderInputted((prev) => ({ ...prev, isDateChoosed: false }));
      orderInputted.isDateChoosed = false;
      messages.push("Please input 🗓️ date");
    }

    // time
    if (time !== "") {
      // setOrderInputted((prev) => ({ ...prev, isTimeChoosed: true }));
      orderInputted.isTimeChoosed = true;
    } else {
      // setOrderInputted((prev) => ({ ...prev, isTimeChoosed: false }));
      orderInputted.isTimeChoosed = false;
      messages.push("Please input ⌚ time");
    }

    // location
    if (cityLocation !== "") {
      // setOrderInputted((prev) => ({ ...prev, isLocChoosed: true }));
      orderInputted.isLocChoosed = true;
    } else {
      // setOrderInputted((prev) => ({ ...prev, isLocChoosed: false }));
      orderInputted.isLocChoosed = false;
      messages.push("Please input 📍 city location");
    }

    // cinema
    if (cinema !== "") {
      // setOrderInputted((prev) => ({ ...prev, isCinemaChoosed: true }));
      orderInputted.isCinemaChoosed = true;
    } else {
      // setOrderInputted((prev) => ({ ...prev, isCinemaChoosed: false }));
      orderInputted.isCinemaChoosed = false;
      messages.push("Please choose 🎥 cinema");
    }

    if (messages.length) {
      for (const msg of messages) {
        toast.error(msg, { duration: 1500 });
        // Wait slightly longer than duration to avoid overlap
        await new Promise((res) => setTimeout(res, 1800));
      }
      // After showing the error message, empty it
      messages = [];
    }

    // If there's no error
    if (
      orderInputted.isDateChoosed === true &&
      orderInputted.isTimeChoosed === true &&
      orderInputted.isLocChoosed === true &&
      orderInputted.isCinemaChoosed === true
    ) {
      // Find the matching schedule to get the IDs
      const matchingSchedule = schedules.find(
        (schedule) =>
          schedule.show_date === date &&
          schedule.start_at === time &&
          schedule.city_name.toLowerCase() === cityLocation &&
          schedule.cinema_name === cinema,
      );

      // Find cinema ID from the cinemas array
      const selectedCinemaObj = cinemas.find(
        (c) => c.name.toLowerCase() === cinema.toLowerCase(),
      );

      // Add form data to redux store
      dispatch(
        addOrder({
          scheduleID: matchingSchedule?.schedule_id || null,
          movieId: id,
          date,
          timeID: matchingSchedule?.show_time_id || null,
          time,
          cityLocationID: matchingSchedule?.city_id || null,
          cityLocation,
          cinemaID:
            selectedCinemaObj?.id || matchingSchedule?.cinema_id || null,
          cinema,
        }),
      );

      // Navigate to order page
      navigate("/order");
    }
  };

  // Format date for display
  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Format time for display
  const formatTimeForDisplay = (timeString) => {
    return timeString.slice(0, 5); // Remove seconds, show HH:MM
  };

  return (
    <main
      className={`${movieState.isLoading ? "my-12 flex justify-center" : "flex flex-col items-center"}`}
    >
      {movieState.isLoading && <Loader />}

      {/* When movie is loaded */}
      {movieState?.isSuccess && (
        <>
          {/* Header image */}
          <div className="relative h-110 w-full md:h-90">
            <img
              className="h-full w-full object-cover"
              src={`${import.meta.env.VITE_BACKDROP_PATH}/${movieState.movie.backdrop_img}`}
              alt={movieState.movie?.title || "Movie backdrop"}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <section className="relative mb-8 flex w-full flex-col gap-8 px-[var(--small-pad)] md:px-[var(--medium-pad)]">
            {/* Movie Poster + Info */}
            <div className="-mt-80 flex flex-col items-center gap-4 md:-mt-80 md:flex-row">
              {/* Movie Image */}
              <img
                className="rounded-lg object-cover md:w-[25%]"
                src={`${import.meta.env.VITE_BE_HOST}/${import.meta.env.VITE_POSTER_PATH}/${movieState.movie.poster_img}`}
                alt={`${movieState.title}`}
              />

              {/* Info */}
              <span className="flex flex-col items-center gap-4 md:mt-75 md:ml-2">
                <h1 className="text-3xl font-medium md:self-start">
                  {movieState.movie.title}
                </h1>

                {/* <!-- Genres --> */}
                <div className="genres md:self-start">
                  <ul className="flex flex-wrap items-center gap-2">
                    <Genres genres={movieState.movie.genres} />
                  </ul>
                </div>

                {/* <!-- About Movie --> */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                  {/* Release Date */}
                  <span>
                    <div className="font-light text-[#8692A6]">
                      Release Date
                    </div>
                    <div className="">
                      {formatMovieReleaseDate(movieState.movie.release_date)}
                    </div>
                  </span>

                  {/* Directed by */}
                  <span>
                    <div className="font-light text-[#8692A6]">Directed by</div>
                    <div className="">{movieState.movie.director}</div>
                  </span>
                  <span>
                    <div className="font-light text-[#8692A6]">Duration</div>
                    <div className="">
                      {getDuration(movieState.movie.duration_minutes)}
                    </div>
                  </span>
                  <span>
                    <div className="font-light text-[#8692A6]">Casts</div>
                    <div className="">
                      {movieState.movie.cast?.map((el, idx) => {
                        if (idx == movieState.movie.cast.length - 1) {
                          return (
                            <React.Fragment key={idx}>{el}</React.Fragment>
                          );
                        }
                        return (
                          <React.Fragment key={idx}>{el}, </React.Fragment>
                        );
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
                {movieState.movie.synopsis}
              </p>
            </div>

            {/* <!-- Book Tickets --> */}
            <form
              className="flex flex-col items-center gap-8"
              onSubmit={handleSubmit}
            >
              <h2 className="text-3xl font-light md:self-start">
                Book Tickets
              </h2>
              <div className="grid w-full grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-4">
                {/* Choose Date */}
                <span className="flex flex-col gap-2">
                  <div className="text-xl font-medium">Choose Date</div>
                  <div className="flex items-center gap-3 rounded-md bg-[#EFF0F6] px-4 py-3">
                    <img src="/calender.png" alt="" />
                    <select
                      className="w-full"
                      name="date"
                      value={selectedDate}
                      onChange={(e) => {
                        checkIsLoggedIn();
                        setSelectedDate(e.target.value);
                      }}
                    >
                      {/* Disabled default */}
                      <option disabled selected value="">
                        Select date
                      </option>
                      {getAvailableDates().map((date, idx) => (
                        <option key={idx} value={date}>
                          {formatDateForDisplay(date)}
                        </option>
                      ))}
                    </select>
                  </div>
                </span>

                {/* Choose Time */}
                <span className="flex flex-col gap-2">
                  <div className="text-xl font-medium">Choose Time</div>
                  <div className="flex items-center gap-3 rounded-md bg-[#EFF0F6] px-4 py-3">
                    <img src="/clock.png" alt="clock logo" />
                    <select
                      className="w-full"
                      name="time"
                      id="time"
                      value={selectedTime}
                      onChange={(e) => {
                        checkIsLoggedIn();
                        setSelectedTime(e.target.value);
                      }}
                    >
                      {/* Disabled default */}
                      <option disabled selected value="">
                        Select time
                      </option>
                      {getAvailableTimes().map((time, idx) => (
                        <option key={idx} value={time}>
                          {formatTimeForDisplay(time)}
                        </option>
                      ))}
                    </select>
                  </div>
                </span>

                {/* Choose Location */}
                <span className="flex flex-col gap-2">
                  <div className="text-xl font-medium">Choose Location</div>
                  <div className="flex items-center gap-3 rounded-md bg-[#EFF0F6] px-4 py-3">
                    <img src="/location.png" alt="" />
                    <select
                      className="w-full"
                      name="cityLocation"
                      id=""
                      value={selectedLocation}
                      onChange={(e) => {
                        checkIsLoggedIn();
                        setSelectedLocation(e.target.value);
                      }}
                    >
                      {/* Disabled default */}
                      <option disabled selected value="">
                        Select location
                      </option>
                      {getAvailableLocations().map((location, idx) => (
                        <option key={idx} value={location.value}>
                          {location.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </span>
                <span className="flex flex-col gap-2">
                  <div className="invisible text-xl font-medium">
                    Filter Button
                  </div>
                  <button
                    className="w-full gap-3 rounded-md bg-[#1D4ED8] px-4 py-3 text-[#F8FAFC]"
                    type="button"
                    onClick={() => {
                      checkIsLoggedIn();
                      setShowCinemas(true);
                    }}
                  >
                    Filter
                  </button>
                </span>
              </div>

              {/* <!-- Choose Cinema --> */}
              <div className="self-start">
                <h3 className="text-xl font-medium">Choose Cinema</h3>

                {/* <span className="font-semibold text-[#8692A6]">39 Result</span> */}
              </div>

              <div className="w-full mb-3 grid grid-cols-2 items-center gap-8 md:grid-cols-4">
                {showCinemas &&
                  cinemas
                    .filter((cinema) =>
                      getAvailableCinemas().some(
                        (name) =>
                          name.toLowerCase() === cinema.name.toLowerCase(),
                      ),
                    )
                    .map((el) => (
                      <React.Fragment key={el.id}>
                        <input
                          className="hidden"
                          type="radio"
                          id={el.name}
                          name="cinema"
                          value={el.name}
                          checked={selectedCinema === el.name}
                          onChange={() => {
                            checkIsLoggedIn();
                            setSelectedCinema(el.name);
                          }}
                        />
                        <label
                          htmlFor={el.name}
                          className={`flex max-h-18 cursor-pointer items-center justify-center rounded-lg p-5 hover:shadow-md ${
                            selectedCinema === el.name
                              ? "border-2 border-[#1D4ED8] bg-blue-50"
                              : "border-[1px] border-[#DEDEDE] bg-white"
                          }`}
                        >
                          <img
                            src={`${import.meta.env.VITE_CINEMA_PATH}/${el.img}`}
                            alt={`Logo ${el.name}`}
                          />
                          {/* optional price */}
                        </label>
                      </React.Fragment>
                    ))}
              </div>

              {showCinemas && (
                <button
                  className="w-1/4 cursor-pointer rounded-sm bg-[#1D4ED8] py-4 text-[#F8FAFC]"
                  type="submit"
                >
                  Book Now
                </button>
              )}
            </form>
          </section>
        </>
      )}
    </main>
  );
}

export default Details;
