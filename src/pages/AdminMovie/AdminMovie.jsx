import React, { useEffect, useState } from "react";
import { TableRow } from "./TableRow";
import { useNavigate } from "react-router";
import apiFetch from "../../utils/apiFetch";
import { useSelector } from "react-redux";

export const AdminMovie = () => {
  const [movies, setMovies] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null); // { id, name }

  const navigate = useNavigate();
  const authState = useSelector((state) => state.loggedIn);
  const { token } = authState;

  // Fetch movies
  const adminGetAllMovies = async () => {
    try {
      const data = await apiFetch("/api/v1/admin/movies", "GET", token);
      setMovies(data);
    } catch (error) {
      console.log(`error : ${error}`);
      if (error == "Error: 401") {
        navigate("/signin");
      }
    }
  };

  useEffect(() => {
    adminGetAllMovies();
  }, []);

  // Delete movie
  const deleteMovie = async (movieID) => {
    try {
      await apiFetch(
        `/api/v1/admin/movies/${movieID}/archive`,
        "DELETE",
        token,
      );
      setMovies((prev) => prev.filter((m) => m.id !== movieID)); // remove from UI
      setShowConfirm(false);
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  // Open modal
  const handleDeleteRequest = (movieID, movieName) => {
    setSelectedMovie({ id: movieID, name: movieName });
    setShowConfirm(true);
  };

  return (
    <div className="mt-8 mb-12 flex w-fit flex-col items-center justify-center rounded-3xl bg-white pt-6 pr-14 pb-6 pl-14">
      {/* Header */}
      <div className="grid w-full grid-cols-2 items-center md:flex md:gap-3">
        <h1 className="text-2xl font-medium text-[#14142B]">List Movie</h1>
        <span className="col-span-2 row-start-2 flex h-14 w-fit items-center justify-center gap-2 rounded-lg bg-[#EFF0F6] px-6 md:ml-auto">
          <img src="/calender.png" alt="" />
          <select>
            <option>Juni 2025</option>
            <option>Juli 2025</option>
            <option>Agustus 2025</option>
          </select>
        </span>
        <button
          className="h-14 w-fit cursor-pointer justify-self-end rounded-md bg-[#1D4ED8] px-8 text-base text-white"
          onClick={() => navigate("/admin/add")}
        >
          + Add
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-scroll">
        <table className="w-min-[56rem] table-fixed">
          <thead>
            <tr>
              <th className="px-5 py-2 text-center text-sm font-medium text-[#1F4173]">
                No
              </th>
              <th className="px-5 py-2 text-center text-sm font-medium text-[#1F4173]">
                Thumbnail
              </th>
              <th className="px-5 py-2 text-center text-sm font-medium text-[#1F4173]">
                Movie Name
              </th>
              <th className="px-5 py-2 text-center text-sm font-medium text-[#1F4173]">
                Category
              </th>
              <th className="px-5 py-2 text-center text-sm font-medium text-[#1F4173]">
                Released Date
              </th>
              <th className="px-5 py-2 text-center text-sm font-medium text-[#1F4173]">
                Duration
              </th>
              <th className="px-5 py-2 text-center text-sm font-medium text-[#1F4173]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, idx) => (
              <TableRow
                key={movie.id}
                idx={idx}
                movieID={movie.id}
                thumbnail={movie.poster_img}
                movieName={movie.title}
                cat={movie.genres}
                releasedDate={movie.release_date}
                duration={movie.duration_minutes}
                onDeleteRequest={handleDeleteRequest} // pass handler
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal (rendered outside table) */}
      {showConfirm && selectedMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-80 rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Delete Confirmation
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              Are you sure you want to delete <b>{selectedMovie.name}</b>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="rounded-lg bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                onClick={() => deleteMovie(selectedMovie.id)}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
