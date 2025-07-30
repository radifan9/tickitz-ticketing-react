import ListItem from "./ListItem";

function Navbar() {
  const navBtn = [
    { text: "Home", route: "/" },
    { text: "Movies", route: "/" },
    { text: "Buy Ticket", route: "/" },
  ];

  return (
    <header className="flex px-8 items-center  py-5 md:px-16">
      <img className="" src="/tickitz-blue.png" alt="" />

      <nav className="ml-auto">
        <ul className="hidden gap-16 text-sm md:flex">
          {navBtn.map((nav, idx) => {
            return <ListItem key={idx} to={nav.route} listText={nav.text} />;
          })}
        </ul>
      </nav>

      <div className="hidden">
        <button className="py-4 border-[1px] border-solid rounded-md ">
          Sign In
        </button>
        <button>Sign Up</button>
      </div>

      <div className="ml-auto hidden items-center gap-4 text-base md:flex">
        <div>Location</div>
        <img src="/arrow-down.png" alt="Arrow Down Button" />
        <img src="/search.png" alt="Seach Button" />
        <img src="/profile-pic-small.png" alt="Small Profile Picture" />
      </div>

      <img
        className="md:hidden"
        src="/hamburger-menu.png"
        alt="Hamburger Menu"
      />
    </header>
  );
}

export default Navbar;
