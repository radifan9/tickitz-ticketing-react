import React, { useState } from "react";
import { ProfileHeader } from "../../components/ProfileHeader";
import { UserProfile } from "../../components/UserProfile";

export default function Profile() {
  // Password control
  const [passwordEye, setPasswordEye] = useState("closed");
  const [passwordEyeConfirm, setPasswordEyeConfirm] = useState("closed");

  // Click handler
  const handleEye = () => {
    setPasswordEye((now) => {
      if (now === "closed") {
        return "opened";
      }
      return "closed";
    });
  };

  const handleEyeConfirm = () => {
    setPasswordEyeConfirm((now) => {
      if (now === "closed") {
        return "opened";
      }
      return "closed";
    });
  };

  return (
    <>
      <div className="md:grid-cols-[1fr 3fr] container mx-auto grid gap-y-8 md:grid md:py-8">
        <ProfileHeader loc={"acc"} />

        {/* User Profile */}
        <UserProfile />

        {/* <!-- Account Setting --> */}
        <div
          className={`mb-10 rounded-2xl bg-white p-10  md:mx-0`}
        >
          <h2 className="mb-8 text-2xl font-medium">Account Settings</h2>

          {/* <!-- Details Information --> */}
          <div className="mb-8 flex flex-col gap-3">
            <h3 className="">Details Information</h3>

            {/* <!-- Horizontal Line --> */}
            <hr className="mt-2 mb-4" />

            {/* <!-- Full Name --> */}
            <div className="flex flex-col gap-3">
              <label className="text-base text-gray-600" htmlFor="full-name">
                Full Name
              </label>
              <input
                className="rounded-xl border border-neutral-200 px-8 py-3"
                type="text"
                name="full-name"
                id="full-name"
                placeholder="Jonas El Rodriguez"
              />
            </div>

            {/* <!-- E-mail --> */}
            <div className="flex flex-col gap-3">
              <label className="text-base text-gray-600" htmlFor="email">
                E-mail
              </label>
              <input
                className="rounded-xl border border-neutral-200 px-8 py-3"
                type="text"
                name="email"
                id="email"
                placeholder="jonasrodrigu123@gmail.com"
              />
            </div>

            {/* <!-- Phone Number --> */}
            <div className="flex flex-col gap-3">
              <label className="text-base text-gray-600" htmlFor="phone-number">
                Phone Number
              </label>
              <div className="flex rounded-xl border border-neutral-200">
                <input
                  className="w-1/5 rounded-xl border border-transparent py-3 pl-8 focus:outline-none"
                  type="text"
                  name="country-code"
                  placeholder="Code"
                />
                <input
                  className="w-full rounded-xl border border-transparent px-8 py-3 focus:outline-none"
                  type="text"
                  name="phone-number"
                  placeholder="Your phone number"
                />
              </div>
            </div>
          </div>

          {/* <!-- Account and Privacy --> */}
          <div className="mb-8 flex flex-col gap-3">
            <h3 className="">Account and Privacy</h3>

            {/* <!-- Horizontal Line --> */}
            <hr className="mt-2 mb-4" />

            {/* <!-- New Password --> */}
            <div className="flex flex-col gap-3">
              <label className="text-base text-gray-600" htmlFor="new-password">
                New Password
              </label>
              <div className="pwd-input-new flex items-center rounded-xl border border-neutral-200">
                <input
                  className="w-full border-0 px-8 py-3 focus:outline-none"
                  name="new-password"
                  id="new-password"
                  placeholder="Input new password"
                  type={passwordEye === "closed" ? "password" : "text"}
                />

                {/* <!-- Eye opened --> */}
                {/* <!-- Here we have both opened and closed eye --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`opened mr-5 size-6 cursor-pointer ${passwordEye === "closed" ? "hidden" : "inline"}`}
                  onClick={handleEye}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                {/* <!-- Eye closed --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`closed mr-5 size-6 cursor-pointer ${passwordEye === "closed" ? "inline" : "hidden"}`}
                  onClick={handleEye}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </div>
            </div>

            {/* <!-- Confirm Password --> */}
            <div className="flex flex-col gap-3">
              <label className="text-base text-gray-600" htmlFor="new-password">
                Confirm
              </label>
              <div className="pwd-input-new flex items-center rounded-xl border border-neutral-200">
                <input
                  className="w-full border-0 px-8 py-3 focus:outline-none"
                  name="new-password"
                  id="new-password"
                  placeholder="Confirm new password"
                  type={passwordEyeConfirm === "closed" ? "password" : "text"}
                />

                {/* <!-- Eye opened --> */}
                {/* <!-- Here we have both opened and closed eye --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`opened mr-5 size-6 cursor-pointer ${passwordEyeConfirm === "closed" ? "hidden" : "inline"}`}
                  onClick={handleEyeConfirm}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                {/* <!-- Eye closed --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`closed mr-5 size-6 cursor-pointer ${passwordEyeConfirm === "closed" ? "inline" : "hidden"}`}
                  onClick={handleEyeConfirm}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </div>
            </div>
          </div>

          <button className="w-full rounded-lg bg-blue-700 py-2 text-sm font-semibold text-white">
            Update changes
          </button>
        </div>
      </div>
    </>
  );
}
