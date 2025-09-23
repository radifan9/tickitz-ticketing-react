function NotFound() {
  return (
    <main className="mt-12 flex flex-col items-center gap-14">
      {/* Hero Section */}
      <section className="flex flex-col gap-8 md:w-full md:flex-row md:justify-center md:px-[var(--medium-pad)]">
        <div className="mb-24 flex flex-col items-center justify-center gap-16 md:items-start">
          <div className="text-center text-2xl font-semibold text-[#1D4ED8] md:text-3xl">
            MOVIE TICKET PURCHASES #1 IN INDONESIA
          </div>
          <div className="text-center text-2xl font-normal md:text-left md:text-5xl">
            The page you're looking for doesn't exist or has been moved.
          </div>
          <div className="w-120">
            <img src="/tape.jpg" alt="404 Not Found Image" />
          </div>
        </div>
      </section>
    </main>
  );
}

export default NotFound;
