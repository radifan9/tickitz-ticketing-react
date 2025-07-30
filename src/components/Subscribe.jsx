function Subscribe() {
  return (
    <section className="relative w-full px-8 pt-24 pb-32 bg-[#1D4ED8] rounded-2xl flex  flex-col items-center gap-8 after:absolute  after:border-8 after:w-48 after:h-48 after:rounded-full after:border-white after:right-0 after:bottom-0 after:translate-1/2">
      <h2 className="text-white text-3xl">Subscribe to our newsletter</h2>
      <div className="text-white flex flex-col w-full gap-3 md:flex-row">
        <input
          className="px-5 py-4 w-full border-[1px] rounded-md bg-[#2563EB]"
          type="text"
          placeholder="First Name"
        />
        <input
          className="px-5 py-4 w-full border-[1px] rounded-md bg-[#2563EB]"
          type="email"
          placeholder="Email address"
        />
        <button className="px-5 py-4 w-full border-[1px] rounded-md bg-white text-[#1D4ED8] text-xl font-semibold">
          Subscribe Now
        </button>
      </div>
    </section>
  );
}

export default Subscribe;
