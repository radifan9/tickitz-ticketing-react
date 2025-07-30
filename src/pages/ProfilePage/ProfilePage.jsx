import React from "react";

export default function ProfilePage() {
  return (
    <>
      <div class="md:grid-cols-[1fr 3fr] container mx-auto grid gap-y-8 md:grid md:py-8">
        <header class="flex justify-evenly bg-white px-12 py-6 md:col-start-2 md:rounded-2xl">
          <span class="after:trans relative after:absolute after:w-full after:-translate-x-32 after:translate-y-12 after:border-b-2 after:border-blue-700">
            Account Settings
          </span>
          <span>Order History</span>
        </header>

        <div class="mx-6 rounded-2xl bg-white p-10 md:col-start-1 md:row-span-2 md:row-start-1 md:h-fit">
          {/* <!-- Info text and setting button --> */}
          <div class="flex items-center justify-between">
            <span class="text-gray-600">INFO</span>
            <img
              class="hidden md:block"
              src="../assets/icons/setting.png"
              alt=""
            />
          </div>

          {/* <!-- Profile Pic and Data --> */}
          <div class="flex flex-col items-center">
            <img src="/profile-pic.png" alt="" />
            <div class="text-2xl">Jonas El Rodriguez</div>
            <div class="text-gray-600">Moviegoers</div>
          </div>

          {/* <!-- Horizontal Line --> */}
          <hr class="mb-4 mt-2" />

          {/* <!-- Loyalty Card --> */}
          <div class="mb-5 flex flex-col items-center gap-3">
            <div class="self-start">Loyalty Points</div>
            <div class="after:-top-17 after:h-34 after:w-34 before:h-34 before:w-34 relative flex h-40 w-full flex-col justify-between overflow-hidden rounded-xl bg-blue-700 p-9 text-stone-50 before:absolute before:-right-16 before:-top-10 before:rounded-full before:bg-white/30 after:absolute after:-right-10 after:rounded-full after:bg-white/30 shadow-[0px_12px_0px_-5px_#1d4ed880]">
              <span class="text-lg font-bold">Moviegoers</span>
              <img
                class="absolute right-0 top-0"
                src="../assets/icons/star.png"
                alt=""
              />
              <div class="gap flex items-end gap-1">
                <span class="text-2xl">320</span>
                <span class="text-xs">points</span>
              </div>
            </div>

            <div class="text-base text-gray-600">
              180 points become a master
            </div>
            <div class="relative h-4 w-full rounded-lg shadow-[inset_0_0_4px_1px_#a8a29e] bg-slate-300 after:absolute after:h-4 after:w-[50%] after:rounded-lg after:bg-blue-500 after:content-['']"></div>
          </div>

          {/* <!-- Edit Profile Button --> */}
          <button class="h-14 w-full rounded-2xl border border-blue-700 p-3 text-blue-700 md:hidden">
            Edit Profile
          </button>
        </div>

        {/* <!-- Account Setting --> */}
        <div class="mx-6 mb-10 rounded-2xl bg-white p-10 md:mx-0">
          <h2 class="mb-8 text-2xl font-medium">Account Settings</h2>

          {/* <!-- Details Information --> */}
          <div class="mb-8 flex flex-col gap-3">
            <h3 class="">Details Information</h3>

            {/* <!-- Horizontal Line --> */}
            <hr class="mb-4 mt-2" />

            {/* <!-- Full Name --> */}
            <div class="flex flex-col gap-3">
              <label class="text-base text-gray-600" for="full-name">
                Full Name
              </label>
              <input
                class="rounded-xl border border-neutral-200 px-8 py-3"
                type="text"
                name="full-name"
                id="full-name"
                placeholder="Jonas El Rodriguez"
              />
            </div>

            {/* <!-- E-mail --> */}
            <div class="flex flex-col gap-3">
              <label class="text-base text-gray-600" for="email">
                E-mail
              </label>
              <input
                class="rounded-xl border border-neutral-200 px-8 py-3"
                type="text"
                name="email"
                id="email"
                placeholder="jonasrodrigu123@gmail.com"
              />
            </div>

            {/* <!-- Phone Number --> */}
            <div class="flex flex-col gap-3">
              <label class="text-base text-gray-600" for="phone-number">
                Phone Number
              </label>
              <div class="flex rounded-xl border border-neutral-200">
                <input
                  class="w-1/5 rounded-xl border border-transparent px-8 py-3"
                  type="text"
                  name="country-code"
                  placeholder="+62"
                />
                <input
                  class="w-full rounded-xl border border-transparent px-8 py-3"
                  type="text"
                  name="phone-number"
                  placeholder="81445687121"
                />
              </div>
            </div>
          </div>

          {/* <!-- Account and Privacy --> */}
          <div class="mb-8 flex flex-col gap-3">
            <h3 class="">Account and Privacy</h3>

            {/* <!-- Horizontal Line --> */}
            <hr class="mb-4 mt-2" />

            {/* <!-- New Password --> */}
            <div class="flex flex-col gap-3">
              <label class="text-base text-gray-600" for="new-password">
                New Password
              </label>
              <div class="flex items-center border border-neutral-200 rounded-xl pwd-input-new">
                <input
                  class="border-0 px-8 py-3 w-full focus:outline-none"
                  type="password"
                  name="new-password"
                  id="new-password"
                  placeholder="Input new password"
                />

                {/* <!-- Eye opened --> */}
                {/* <!-- Here we have both opened and closed eye --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 mr-5 opened hidden cursor-pointer"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>

                {/* <!-- Eye closed --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6 mr-5 closed"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </div>
            </div>

            {/* <!-- E-mail --> */}
            <div class="flex flex-col gap-3">
              <label class="text-base text-gray-600" for="confirm-password">
                Confirm
              </label>
              <input
                class="rounded-xl border border-neutral-200 px-8 py-3"
                type="password"
                name="confirm-password"
                id="confirm-password"
                placeholder="Confirm your new password"
              />
            </div>
          </div>

          <button class="w-full rounded-lg bg-blue-700 py-2 text-sm font-semibold text-white">
            Update changes
          </button>
        </div>
      </div>
    </>
  );
}
