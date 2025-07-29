import React from "react";

function Navbar() {
  return (
    <header class="flex items-center justify-between bg-white px-8 py-5 md:px-16">
      <img src="/tickitz-blue.png" alt="" />

      <nav class="ml-auto">
        <ul class="hidden gap-12 text-sm md:flex">
          <li class="">
            <a href="#">Home</a>
          </li>
          <li class="">
            <a href="#">Movie</a>
          </li>
          <li class="">
            <a href="#">Buy Ticket</a>
          </li>
        </ul>
      </nav>
      <div class="ml-auto hidden items-center gap-4 text-base md:flex">
        <div>Location</div>
        <img src="/arrow-down.png" alt="" />
        <img src="/search.png" alt="" />
        <img src="/profile-pic-small.png" alt="" />
      </div>

      <img class="md:hidden" src="../assets/icons/hamburger-menu.png" alt="" />
    </header>
  );
}

export default Navbar;
