import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import apiFetchNoAuth from "../../utils/apiFetchNoAuth";

// Components
import Loader from "../../components/Loader";

// Constants
const CINEMA_LIST = [
  {
    id: 1,
    name: "ebv",
    src: "/ebv-id.png",
    ticket_price: 10,
  },
  {
    id: 2,
    name: "hiflix",
    src: "/hiflix-red.png",
    ticket_price: 15,
  },
  {
    id: 3,
    name: "CineOne21",
    src: "/CineOne21-fitted.png",
    ticket_price: 10,
  },
  {
    id: 4,
    name: "Cinepolis",
    src: "/cinepolis.png",
    ticket_price: 20,
  },
];

const SHOWTIME_LIST = [
  {
    id: 1,
    start_at: "12:00",
  },

  {
    id: 2,
    start_at: "15:00",
  },

  {
    id: 3,
    start_at: "18:00",
  },

  {
    id: 4,
    start_at: "21:00",
  },
];

export const AdminEditMovie = () => {
  // State
  const [selectedCinemas, setSelectedCinemas] = useState([]);
  const [selectedShowTimes, setSelectedShowTimes] = useState([]);
  const [posterName, setPosterName] = useState("Upload Poster");
  const [backdropName, setBackdropName] = useState("Upload Backdrop");
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  const navigate = useNavigate();
  let params = useParams();

  // Redux
  const authState = useSelector((state) => state.loggedIn);
  const { token } = authState;

  // Handler
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const request = new Request(
        `${import.meta.env.VITE_BE_HOST}/api/v1/admin/movies`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const formdata = new FormData();
      const posterFile = e.target.poster_img.files[0];
      const backdropFile = e.target.backdrop_img.files[0];
      formdata.append("poster_img", posterFile);
      formdata.append("backdrop_img", backdropFile);
      formdata.append("title", e.target.movieTitle.value);
      formdata.append("genres", e.target.cat.value);
      formdata.append("age_rating_id", e.target.age_rating_id.value);
      formdata.append("release_date", e.target.releaseDate.value);
      formdata.append(
        "duration_minutes",
        parseInt(e.target.hour.value) * 60 + parseInt(e.target.minute.value),
      );
      formdata.append("director", e.target.director.value);
      formdata.append("cast", e.target.cast.value);
      formdata.append("synopsis", e.target.synopsis.value);
      formdata.append("city_id", e.target.loc.value);
      formdata.append("cinema_id", selectedCinemas);
      formdata.append("show_date", e.target.date.value);
      formdata.append("show_time_id", selectedShowTimes);

      console.log("Form Data : ");
      console.log(formdata);

      const response = await fetch(request, {
        body: formdata,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const result = await response.json();
      console.log(result);

      toast.success(`Successfully added ${e.target.movieTitle.value}!`);
      navigate("/admin/movie", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle cinema
  const toggleCinema = (cinemaName) => {
    setSelectedCinemas((prev) =>
      prev.includes(cinemaName)
        ? prev.filter((c) => c !== cinemaName)
        : [...prev, cinemaName],
    );
  };

  // Toggle showtime
  const toggleShowTime = (showTime) => {
    setSelectedShowTimes((prev) =>
      prev.includes(showTime)
        ? prev.filter((t) => t !== showTime)
        : [...prev, showTime],
    );
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const urlMovie = `${import.meta.env.VITE_BE_HOST}/api/v1/movies/${params.id}`;
      const result = await apiFetchNoAuth("GET", urlMovie);
      setMovieData(result.data);
      setMovieData((prev) => ({
        ...prev,
        hours: Math.floor(result.data.duration_minutes / 60),
        minutes: Math.floor(result.data.duration_minutes % 60),
      }));
    })();
    setIsLoading(false);
  }, []);

  return (
    <div className="mt-8 mb-20 flex w-full flex-col rounded-2xl bg-white p-9">
      <h1 className="mb-9 text-lg font-medium">Edit a Movie</h1>

      {isLoading && <Loader />}

      {!isLoading && (
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* Image */}
          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="text-[#696F79]">
              Poster Image
            </label>
            <div className="w-1/3">
              <img
                className="rounded-xl"
                src={`${import.meta.env.VITE_BE_HOST}/api/v1/img/posters/${movieData.poster_img}`}
                alt=""
              />
            </div>

            <input
              type="file"
              name="poster_img"
              id="poster_img"
              className="hidden"
              onChange={
                (e) => setPosterName(e.target.files[0]?.name || "Upload Poster")
                // e.target.backdrop_img.files[0]
              }
            />
            <label
              htmlFor="poster_img"
              className="flex h-10 w-fit cursor-pointer items-center justify-center rounded-lg bg-[#1D4ED8] px-8 text-sm text-white"
            >
              {posterName}
            </label>

            <label htmlFor="image" className="text-[#696F79]">
              Backdrop Image
            </label>
            <div className="w-2/3">
              <img
                className="rounded-xl"
                src={`${import.meta.env.VITE_BE_HOST}/api/v1/img/backdrops/${movieData.backdrop_img}`}
                alt=""
              />
            </div>

            <input
              type="file"
              name="backdrop_img"
              id="backdrop_img"
              className="hidden"
              onChange={(e) =>
                setBackdropName(e.target.files[0]?.name || "Upload Backdrop")
              }
            />
            <label
              htmlFor="backdrop_img"
              className="flex h-10 w-fit cursor-pointer items-center justify-center rounded-lg bg-[#1D4ED8] px-8 text-sm text-white"
            >
              {backdropName}
            </label>
          </div>

          {/* Movie Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="movieTitle" className="text-[#696F79]">
              Movie Name
            </label>
            <input
              type="text"
              name="movieTitle"
              id="movieTitle"
              className="h-12 rounded-lg border-[1px] border-[#DEDEDE] px-8 text-sm"
              placeholder="Spiderman: Homecoming"
              value={movieData.title}
              onChange={(e) => {
                setMovieData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <label htmlFor="cat" className="text-[#696F79]">
              Category
            </label>
            <input
              type="text"
              name="cat"
              id="cat"
              className="h-12 rounded-lg border-[1px] border-[#DEDEDE] px-8 text-sm"
              placeholder="Action,Adventure,Sci-Fi"
              value={movieData.genres}
              onChange={(e) => {
                setMovieData((prev) => ({
                  ...prev,
                  genres: e.target.value,
                }));
              }}
            />
          </div>

          {/* Rating Umur */}
          <div className="flex flex-col gap-2">
            <label htmlFor="cat" className="text-[#696F79]">
              Age Rating
            </label>
            <div className="flex h-12 rounded-lg border-[1px] border-[#DEDEDE] px-8 text-sm">
              <select
                className="w-full text-[#696F79]"
                name="age_rating_id"
                id="age_rating_id"
                value={movieData.age_rating_id}
                onChange={(e) => {
                  setMovieData((prev) => ({
                    ...prev,
                    age_rating_id: e.target.value,
                  }));
                }}
              >
                <option value="1">SU : Semua Umur</option>
                <option value="2">
                  R13+ : Remaja, Cocok untuk usia 13 tahun ke atas.
                </option>
                <option value="3">
                  R17+ : Dewasa, Cocok untuk usia 17 tahun ke atas.
                </option>
                <option value="4">
                  R21+ : Dewasa, Cocok untuk usia 21 tahun ke atas.
                </option>
              </select>
            </div>
          </div>

          {/* Release Date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="releaseDate" className="text-[#696F79]">
              Release Date
            </label>
            <input
              type="text"
              name="releaseDate"
              id="releaseDate"
              className="h-12 rounded-lg border-[1px] border-[#DEDEDE] px-8 text-sm"
              placeholder="2025-12-30"
              value={movieData.release_date?.slice(0, 10)}
              onChange={(e) => {
                setMovieData((prev) => ({
                  ...prev,
                  release_date: e.target.value,
                }));
              }}
            />
          </div>

          {/* Duration */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              <span className="text-[#696F79]">Duration </span>
              <label htmlFor="hour" className="text-[#696F79]">
                (Hour /
              </label>
              <label htmlFor="minute" className="text-[#696F79]">
                Minute)
              </label>
            </div>

            <input
              type="text"
              name="hour"
              id="hour"
              className="h-12 rounded-lg border-[1px] border-[#DEDEDE] px-8 text-sm"
              placeholder="2"
              value={movieData.hours}
              onChange={(e) => {
                setMovieData((prev) => ({
                  ...prev,
                  hours: e.target.value,
                }));
              }}
            />
            <input
              type="text"
              name="minute"
              id="minute"
              className="h-12 rounded-lg border-[1px] border-[#DEDEDE] px-8 text-sm"
              placeholder="13"
              value={movieData.minutes}
              onChange={(e) => {
                setMovieData((prev) => ({
                  ...prev,
                  minutes: e.target.value,
                }));
              }}
            />
          </div>

          {/* Director Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="director" className="text-[#696F79]">
              Director Name
            </label>
            <input
              type="text"
              name="director"
              id="director"
              className="h-12 rounded-lg border-[1px] border-[#DEDEDE] px-8 text-sm"
              placeholder="Jon Watts"
              value={movieData.director}
              onChange={(e) => {
                setMovieData((prev) => ({
                  ...prev,
                  director: e.target.value,
                }));
              }}
            />
          </div>

          {/* Cast */}
          <div className="flex flex-col gap-2">
            <label htmlFor="cast" className="text-[#696F79]">
              Cast
            </label>
            <input
              type="text"
              name="cast"
              id="cast"
              className="h-12 rounded-lg border-[1px] border-[#DEDEDE] px-8 text-sm"
              placeholder="Tom Holland,Michael Keaton .."
              value={movieData.cast?.join(",") || ""}
              onChange={(e) =>
                setMovieData((prev) => ({
                  ...prev,
                  cast: e.target.value.split(","),
                }))
              }
            />
          </div>

          {/* Synopsis */}
          <div className="flex flex-col gap-2">
            <label htmlFor="synopsis" className="text-[#696F79]">
              Synopsis
            </label>
            <textarea
              name="synopsis"
              id="synopsis"
              rows="4"
              cols="50"
              className="rounded-lg border-[1px] border-[#DEDEDE] px-8"
              placeholder=" Insert your synopsis here..."
            ></textarea>
          </div>

          {/* Add Location */}
          <div className="flex flex-col gap-2">
            <label htmlFor="loc" className="text-[#696F79]">
              Add Location
            </label>
            <input
              type="text"
              name="loc"
              id="loc"
              className="h-12 rounded-lg border-[1px] border-[#DEDEDE] px-8 py-6 text-sm"
              placeholder="1=Jakarta,2=Bogor,3=Depok,4=Tangerang,5=Bekasi"
            />
          </div>

          {/* Cinema */}
          <div className="flex flex-col gap-2">
            <label htmlFor="cat" className="text-[#696F79]">
              Cinema
            </label>
            <div className="mb-3 grid grid-cols-2 items-center gap-8 md:grid-cols-4">
              {CINEMA_LIST.map((el, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <input
                      className="hidden"
                      type="checkbox"
                      id={el.name}
                      name="cinema"
                      value={el.name}
                      checked={selectedCinemas.includes(el.id)}
                      onChange={() => toggleCinema(el.id)}
                    />
                    <label
                      htmlFor={el.name}
                      className={`flex h-18 cursor-pointer items-center justify-center rounded-lg p-1 hover:shadow-md ${
                        selectedCinemas.includes(el.id)
                          ? "border-2 border-[#1D4ED8] bg-blue-50"
                          : "border-[1px] border-[#DEDEDE] bg-white"
                      }`}
                    >
                      <img src={el.src} alt={`Logo ${el.name}`} />
                    </label>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Set date & time */}
          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-[#696F79]">
              Set Date & Time
            </label>
            <div className="flex items-center gap-8 rounded-md bg-[#EFF0F6] px-4 py-3">
              <img src="/calender.png" alt="" />
              <input
                className="flex w-full"
                type="date"
                name="date"
                id="date"
              />
            </div>

            {/* SHOW TIME */}
            <div className="mb-3 grid grid-cols-2 items-center gap-x-8 gap-y-2 md:grid-cols-4">
              {SHOWTIME_LIST.map((el, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <input
                      className="hidden"
                      type="checkbox"
                      id={el.id}
                      name="cinema"
                      value={el.id}
                      checked={selectedShowTimes.includes(el.id)}
                      onChange={() => toggleShowTime(el.id)}
                    />
                    <label
                      htmlFor={el.id}
                      className={`flex h-10 cursor-pointer items-center justify-center rounded-lg p-1 hover:shadow-md ${
                        selectedShowTimes.includes(el.id)
                          ? "border-2 border-[#1D4ED8] bg-blue-50"
                          : "border-[1px] border-[#DEDEDE] bg-white"
                      }`}
                    >
                      {/* <img src={el.src} alt={`Logo ${el.name}`} /> */}
                      <span>{el.start_at}</span>
                    </label>
                  </React.Fragment>
                );
              })}
            </div>

            {/* ADD SHOW TIME */}
            {/* <div className="flex items-center gap-5">
            <button className="flex h-7 items-center rounded border-[1px] border-[#1D4ED8] px-4 text-3xl font-light text-[#1D4ED8]">
              +
            </button>
            <input
              className="h-7 font-medium"
              type="text"
              name=""
              id=""
              placeholder="add custom time"
            />
          </div> */}
          </div>

          {/* Submit Button */}
          <button className="h-11 rounded-md bg-[#1D4ED8] text-white">
            Save Movie
          </button>
        </form>
      )}
    </div>
  );
};
