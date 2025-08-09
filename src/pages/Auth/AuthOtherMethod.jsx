import React from "react";

export const AuthOtherMethod = () => {
  return (
    <div className="mb-4 flex justify-center gap-12">
      <a
        href="#"
        className="flex items-center gap-5 rounded px-8 py-4 text-[#a0a3bd] shadow-md hover:font-bold"
      >
        <img
          width="24"
          height="24"
          src="https://img.icons8.com/color/48/google-logo.png"
          alt="google-logo"
          className="h-6 w-6"
        />
        <span className="hidden md:inline">Google</span>
      </a>

      <a
        href="#"
        className="flex items-center gap-5 rounded px-8 py-4 text-[#a0a3bd] shadow-md hover:font-bold"
      >
        <img
          width="24"
          height="24"
          src="/facebook-circled.png"
          alt="facebook-circled"
          className="h-6 w-6"
        />
        <span className="hidden md:inline">Facebook</span>
      </a>
    </div>
  );
};
