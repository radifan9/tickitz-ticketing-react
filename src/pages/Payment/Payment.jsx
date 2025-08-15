import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { convertDate } from "../../utils/convertDate";

// External Lib
import { toast } from "sonner";
import { addHistory } from "../../redux/slice/historySlice";

// Collect error messages and show them sequentially
let messages = [];

const PAYMENT_METHODS = [
  { id: "gpay", name: "GPay", image: "/gpay.png" },
  { id: "visa", name: "Visa", image: "/logos_visa.png" },
  { id: "gopay", name: "Gopay", image: "/gopay.png" },
  { id: "paypal", name: "Paypal", image: "/paypal.png" },
  { id: "dana", name: "Dana", image: "/dana.png" },
  { id: "bca", name: "BCA", image: "/bca.png" },
  { id: "bri", name: "BRI", image: "/bri.png" },
  { id: "ovo", name: "OVO", image: "/ovo.png" },
];

function Payment() {
  // --- Redux
  const movieState = useSelector((state) => state.movie);
  const orderState = useSelector((state) => state.order);
  const historyState = useSelector((state) => state.history);
  const dispatch = useDispatch();

  // --- State
  const [paymentInfo, setPaymentInfo] = useState([
    {
      title: "DATE & TIME",
      text: `${convertDate(orderState.order.date)} at ${orderState.order.time}`,
    },
    { title: "MOVIE TITLE", text: `${movieState.movie.originalTitle}` },
    { title: "CINEMA NAME", text: `${orderState.order.cinema}` },
    {
      title: "NUMBER OF TICKETS",
      text: `${orderState.order.seats.length} Pieces`,
    },
    { title: "TOTAL PAYMENT", text: `$${orderState.order.totalPayment}.00` },
  ]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [isMaskVisible, setIsMaskVisible] = useState(false);
  const navigate = useNavigate();

  // Regex for validation
  const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
  const phoneRegex = /^(?:\+62|62|0)[2-9]\d{7,11}$/;
  // source of regex : https://medium.com/@lelianto.eko/indonesian-usefull-regex-formatter-function-41e3c541fcb3

  // Assume initialize with error first (true), then set to false if validation is passed
  const [errorInput, setErrorInput] = useState({
    incorrectFullName: true,
    incorrectEmail: true,
    incorrectPhoneNum: true,
  });

  const handlePaymentChange = (paymentId) => {
    setSelectedPayment(paymentId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Clicked Submit");

    if (errorInput.incorrectFullName)
      messages.push("Incorrect  Full Name is Inputted");
    if (errorInput.incorrectEmail)
      messages.push("Incorrect 📧 email is Inputted");
    if (errorInput.incorrectPhoneNum)
      messages.push("Incorrect 📱 phone number is Inputted");

    if (messages.length) {
      for (const msg of messages) {
        toast.error(msg, { duration: 1500 });
        // Wait slightly longer than duration to avoid overlap
        await new Promise((res) => setTimeout(res, 1800));
      }
      // After showing the error message, empty it
      messages = [];
    }

    // If theres no error
    if (
      !errorInput.incorrectFullName &&
      !errorInput.incorrectEmail &&
      !errorInput.incorrectPhoneNum
    ) {
      console.log("Validasi betul semua");
      if (selectedPayment) {
        setShowModal(true);
        setIsMaskVisible(true);
      }
    }

    console.log(personalInfo);
    console.log(errorInput);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsMaskVisible(false);
    document.body.style.overflow = "unset";
  };

  function handleCheckPayment() {
    const { movieId, originalTitle, cat = "PG-13" } = movieState.movie;
    const { date, time, cityLocation, cinema, seats, totalPayment } =
      orderState.order;

    console.log("Movie State Data");
    console.log(movieId, originalTitle, cat);

    let largestId = 0;
    historyState.forEach((el) => {
      if (el.orderId > largestId) {
        largestId = el.orderId;
      }
    });

    console.log(`largest ID : ${largestId}`);

    const obj = {};
    Object.assign(obj, {
      // orderId: Math.floor(Math.random() * 1000) + 1,
      orderId: largestId + 1,
      movieId,
      originalTitle,
      cat,
      date,
      time,
      cityLocation,
      cinema,
      seats,
      totalPayment,
      ticketStatus: {
        isActive: true,
        isPaid: true,
      },
    });

    console.log("New data :");
    console.log(obj);

    dispatch(addHistory(obj));

    console.log(historyState);

    navigate("/result");
  }

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
              <div className="flex w-full flex-col gap-2">
                <div className="mt-3 text-sm font-normal text-[#8692A6]">
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
              placeholder="Enter your name"
              name="fullName"
              value={personalInfo.fullName}
              onChange={(e) => {
                const value = e.target.value;
                setPersonalInfo((now) => ({ ...now, fullName: value }));

                setErrorInput((prev) => ({
                  ...prev,
                  incorrectFullName: !nameRegex.test(value),
                }));
              }}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-normal">Email</label>
            <input
              className="mt-2 h-16 w-full rounded-md border border-[#DEDEDE] px-6 text-lg text-[#4E4B66]"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={personalInfo.email}
              onChange={(e) => {
                const value = e.target.value;
                setPersonalInfo((now) => ({ ...now, email: value }));

                setErrorInput((prev) => ({
                  ...prev,
                  incorrectEmail: !emailRegex.test(value),
                }));
              }}
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-base font-normal">Phone Number</label>
            <input
              className="mt-2 h-16 w-full rounded-md border border-[#DEDEDE] px-6 text-lg text-[#4E4B66]"
              type="tel"
              placeholder="+62 | Enter Your Phone Number"
              name="phoneNumber"
              value={personalInfo.phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                setPersonalInfo((now) => ({ ...now, phoneNumber: value }));

                setErrorInput((prev) => ({
                  ...prev,
                  incorrectPhoneNum: !phoneRegex.test(value),
                }));
              }}
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="mb-6">
          <h2 className="mb-[18px] text-xl font-semibold">Payment Method</h2>
          <div className="grid grid-cols-4 gap-[14px]">
            {PAYMENT_METHODS.map((method) => (
              <label
                key={method.id}
                className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 p-4 transition-all select-none ${
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
                <img src={method.image} alt={method.name} className="" />
              </label>
            ))}
          </div>
        </div>

        {/* Payment Button */}
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-[#1D4ED8] py-[18px] font-bold text-[#F7F7FC] transition-all hover:bg-[#1d4fd8e3] hover:shadow-md"
          onClick={() => {
            if (!selectedPayment) {
              // toast.warning("Please select a payment method");
              messages.push("Please select a 💳 payment method");
            }
          }}
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
          <span className="ml-auto font-bold">
            {parseInt(Math.random() * 100000000000000)}
          </span>
          <button className="ml-2 rounded border border-[#1D4ED8] px-3 py-1 text-sm text-[#1D4ED8]">
            Copy
          </button>
        </div>
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm text-[#8692A6]">Total Payment :</span>
          <span className="text-lg font-bold text-[#1D4ED8]">
            ${orderState.order.totalPayment}
          </span>
        </div>
        <p className="mb-6 text-sm text-[#A0A3BD]">
          Pay this payment bill before it is due,
          <b className="text-[#D00707]"> on {formatFutureDate()}</b>. If the
          bill has not been paid by the specified time, it will be forfeited
        </p>
        <div className="flex flex-col gap-4">
          {/* <Link
            to="/result"
            className="rounded-md bg-[#1D4ED8] py-3 text-center font-bold text-white shadow-md hover:bg-[#1d4fd8e3]"
          >
            Check Payment
          </Link> */}

          <button
            className="rounded-md bg-[#1D4ED8] py-3 text-center font-bold text-white shadow-md hover:bg-[#1d4fd8e3]"
            onClick={handleCheckPayment}
          >
            Check Payment
          </button>
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
