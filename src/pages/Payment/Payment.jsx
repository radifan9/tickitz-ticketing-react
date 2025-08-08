import { useState, Fragment } from "react";
import { Link } from "react-router";

const paymentInfo = [
  { title: "DATE & TIME", text: "Tuesday, 07 July 2020 at 02:00pm" },
  { title: "MOVIE TITLE", text: "Spider-Man: Homecoming" },
  { title: "CINEMA NAME", text: "Cineone21 Cinema" },
  { title: "NUMBER OF TICKETS", text: "3 Pieces" },
  { title: "TOTAL PAYMENT", text: "$30.00" },
];

function Payment() {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isMaskVisible, setIsMaskVisible] = useState(false);
  const [errorInput, setErrorInput] = useState({
    fullNameInputted: false,
    correctEmailUsed: false,
    phoneNumberStartWithCodeArea: false,
  });

  const paymentMethods = [
    { id: "gpay", name: "GPay", image: "/gpay.png" },
    { id: "visa", name: "Visa", image: "/logos_visa.png" },
    { id: "gopay", name: "Gopay", image: "/gopay.png" },
    { id: "paypal", name: "Paypal", image: "/paypal.png" },
    { id: "dana", name: "Dana", image: "/dana.png" },
    { id: "bca", name: "BCA", image: "/bca.png" },
    { id: "bri", name: "BRI", image: "/bri.png" },
    { id: "ovo", name: "OVO", image: "/ovo.png" },
  ];

  const handlePaymentChange = (paymentId) => {
    setSelectedPayment(paymentId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked Submit");

    // Check if personal information is inputted
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const phoneNumber = e.target.phoneNumber.value;

    // Validation
    if (fullName !== "") {
      // If there's a character inputted
      setErrorInput((now) => {
        return Object.assign(now, {
          fullNameInputted: true,
        });
      });
    } else {
      // If no character is inputted
      setErrorInput((now) => {
        return Object.assign(now, {
          fullNameInputted: false,
        });
      });
    }

    if (selectedPayment) {
      setShowModal(true);
      setIsMaskVisible(true);
      // document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    }

    console.log(errorInput);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsMaskVisible(false);
    document.body.style.overflow = "unset";
  };

  const handlePayLater = (e) => {
    e.preventDefault();
    closeModal();
    // Add any additional pay later logic here
  };

  const formatFutureDate = () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1); // 1 day from now
    return futureDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="mb-12 flex w-[732px] flex-col gap-[18px] rounded-[6px] bg-white px-8 py-[38px]"
      >
        <div className="flex flex-col items-center rounded-xl">
          <h2 className="mb-6 self-start text-2xl font-semibold">
            Payment Info
          </h2>

          {paymentInfo.map((el, index) => (
            <Fragment key={index}>
              <div className="mb-4 flex w-full flex-col gap-2">
                <div className="text-sm font-normal text-[#8692A6]">
                  {el.title}
                </div>
                <div className="text-base font-normal">
                  {el.title === "TOTAL PAYMENT" ? (
                    <span className="font-bold text-[#1D4ED8]">{el.text}</span>
                  ) : (
                    el.text
                  )}
                </div>
              </div>
              {index < paymentInfo.length - 1 && (
                <div className="my-2 w-full border-b border-[#DEDEDE]"></div>
              )}
            </Fragment>
          ))}
        </div>

        {/* Personal Info */}
        <div className="mb-6 flex flex-col gap-[18px]">
          <h2 className="text-xl font-semibold">Personal Information</h2>

          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-normal">Full Name</label>
            <input
              className="mt-2 h-16 w-full rounded-md border border-[#DEDEDE] px-6 text-lg text-[#4E4B66]"
              type="text"
              placeholder="Jonas El Rodriguez"
              name="fullName"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-normal">Email</label>
            <input
              className="mt-2 h-16 w-full rounded-md border border-[#DEDEDE] px-6 text-lg text-[#4E4B66]"
              type="email"
              placeholder="jonasrodri123@gmail.com"
              name="email"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-normal">Phone Number</label>
            <input
              className="mt-2 h-16 w-full rounded-md border border-[#DEDEDE] px-6 text-lg text-[#4E4B66]"
              type="tel"
              placeholder="+62 | 81445687121"
              name="phoneNumber"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h2 className="mb-[18px] text-xl font-semibold">Payment Method</h2>
          <div className="grid grid-cols-4 gap-[14px]">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 p-4 transition-all ${
                  selectedPayment === method.id
                    ? "border-blue-600 bg-blue-50"
                    : "border-[#DEDEDE] bg-white hover:shadow-md"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedPayment === method.id}
                  onChange={() => handlePaymentChange(method.id)}
                  className="hidden"
                />
                <img
                  src={method.image}
                  alt={method.name}
                  className="h-auto w-full"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Payment Button */}
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-[#1D4ED8] py-[18px] font-bold text-[#F7F7FC] transition-all hover:bg-[#1d4fd8e3] hover:shadow-md"
          disabled={!selectedPayment}
        >
          Pay your order
        </button>
      </form>

      {/* Modal Mask */}
      {isMaskVisible && (
        <div
          className="fixed inset-0 z-10 bg-black/50"
          onClick={closeModal}
        ></div>
      )}

      {/* Payment Modal */}
      <div
        className={`absolute top-1/2 left-1/2 z-20 w-[573px] -translate-x-1/2 -translate-y-1/2 transform rounded-2xl bg-white p-6 shadow-xl ${showModal ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <h2 className="mb-6 text-center text-2xl font-bold">Payment Info</h2>
        <div className="mb-6 flex items-center">
          <span className="text-sm text-[#8692A6]">No. Rekening Virtual :</span>
          <span className="ml-auto font-bold">12321328913829724</span>
          <button className="ml-2 rounded border border-[#1D4ED8] px-3 py-1 text-sm text-[#1D4ED8]">
            Copy
          </button>
        </div>
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm text-[#8692A6]">Total Payment :</span>
          <span className="text-lg font-bold text-[#1D4ED8]">$30.00</span>
        </div>
        <p className="mb-6 text-sm text-[#A0A3BD]">
          Pay this payment bill before it is due,
          <b className="text-[#D00707]"> on {formatFutureDate()}</b>. If the
          bill has not been paid by the specified time, it will be forfeited
        </p>
        <div className="flex flex-col gap-4">
          <Link
            to="/result"
            className="rounded-md bg-[#1D4ED8] py-3 text-center font-bold text-white shadow-md hover:bg-[#1d4fd8e3]"
          >
            Check Payment
          </Link>
          <button
            onClick={handlePayLater}
            className="font-bold text-[#1D4ED8] hover:underline"
          >
            Pay Later
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
