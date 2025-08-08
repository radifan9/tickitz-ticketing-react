import React from "react";

function Genres({ genres }) {
  return genres.map((genre, idx) => {
    return (
      <li
        key={idx}
        className="inline rounded-2xl bg-[#A0A3BD1A] px-6 py-0.5 text-[#A0A3BD]"
      >
        {genre}
      </li>
    );
  });
}

export default Genres;
