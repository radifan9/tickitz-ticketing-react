import React from "react";
import { Link } from "react-router";

export const ProfileHeader = ({ loc }) => {
  return (
    <header className="flex justify-evenly rounded-2xl bg-white px-12 py-6 md:col-start-2 md:rounded-2xl">
      <span
        className={`${loc === "acc" ? "after:trans relative after:absolute after:w-full after:-translate-x-32 after:translate-y-12 after:border-b-2 after:border-blue-700" : ""}`}
      >
        <Link to="/profile" className="cursor-pointer">
          Account Settings
        </Link>
      </span>

      <span>
        <Link to="/history" className="cursor-pointer">
          Order History
        </Link>
      </span>
    </header>
  );
};
