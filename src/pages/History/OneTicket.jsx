export const OneTicket = ({ isActive, isPaid }) => {
  return (
    <div
      className={`flex flex-col gap-3 rounded-2xl bg-white pt-8 pb-4 md:col-start-2 md:mx-0`}
    >
      {/* Title */}
      <div className="flex flex-col items-start gap-3 pl-10">
        <img src="/CineOne21-fitted.png" alt="CineOne21" />
        <div className="flex flex-col gap-1">
          <div className="text-sm font-normal text-[#AAAAAA]">
            Tuesday, 07 July 2020 - 04:30pm
          </div>
          <div className="text-2xl font-medium">Spider-Man: Homecoming</div>
        </div>
      </div>

      {/* Horizontal */}
      <hr className="text-[#DEDEDE]" />

      {/* Ticket Status*/}
      <div className="flex flex-col items-center gap-3">
        <div
          className={`flex h-10 w-3/4 items-center justify-center rounded-lg text-center font-semibold ${
            isActive
              ? "bg-[#00BA8833] text-[#00BA88]"
              : "bg-[#6E719133] text-[#6E7191]"
          }`}
        >
          {isActive ? "Ticket in active" : "Ticket used"}
        </div>

        <div
          className={`flex h-10 w-3/4 items-center justify-center rounded-lg text-center font-semibold ${
            isPaid
              ? "bg-[#1D4ED833] text-[#1D4ED8]"
              : "bg-[#E82C2C33] text-[#E82C2C]"
          }`}
        >
          {isPaid ? "Paid" : "Not Paid"}
        </div>
        <button className="flex items-center gap-3 text-lg font-normal text-[#AAAAAA]">
          Show Details <img src="/arrow-down.png" alt="arrow down" />
        </button>
      </div>
    </div>
  );
};
