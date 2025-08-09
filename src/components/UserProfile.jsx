import React from "react";

export const UserProfile = () => {
  return (
    <div className="rounded-2xl bg-white p-10 md:col-start-1 md:row-span-3 md:row-start-1 md:mx-6 md:h-fit">
      {/* <!-- Info text and setting button --> */}
      <div className="flex items-center justify-between">
        <span className="text-gray-600">INFO</span>
        <img
          className="hidden md:block"
          src="../assets/icons/setting.png"
          alt=""
        />
      </div>

      {/* <!-- Profile Pic and Data --> */}
      <div className="flex flex-col items-center">
        <img src="/profile-pic.png" alt="" />
        <div className="text-2xl">Jonas El Rodriguez</div>
        <div className="text-gray-600">Moviegoers</div>
      </div>

      {/* <!-- Horizontal Line --> */}
      <hr className="mt-2 mb-4" />

      {/* <!-- Loyalty Card --> */}
      <div className="mb-5 flex flex-col items-center gap-3">
        <div className="self-start">Loyalty Points</div>
        <div className="relative flex h-40 w-full flex-col justify-between overflow-hidden rounded-xl bg-blue-700 p-9 text-stone-50 shadow-[0px_12px_0px_-5px_#1d4ed880] before:absolute before:-top-10 before:-right-16 before:h-34 before:w-34 before:rounded-full before:bg-white/30 after:absolute after:-top-17 after:-right-10 after:h-34 after:w-34 after:rounded-full after:bg-white/30">
          <span className="text-lg font-bold">Moviegoers</span>
          <img
            className="absolute top-0 right-0"
            src="/public/star.png"
            alt=""
          />
          <div className="gap flex items-end gap-1">
            <span className="text-2xl">320</span>
            <span className="text-xs">points</span>
          </div>
        </div>

        <div className="text-base text-gray-600">
          180 points become a master
        </div>
        <div className="relative h-4 w-full rounded-lg bg-slate-300 shadow-[inset_0_0_4px_1px_#a8a29e] after:absolute after:h-4 after:w-[50%] after:rounded-lg after:bg-blue-500 after:content-['']"></div>
      </div>
    </div>
  );
};
