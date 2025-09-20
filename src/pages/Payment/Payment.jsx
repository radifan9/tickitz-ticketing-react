import { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { convertDate } from "../../utils/convertDate";

// External Libraries
import { toast } from "sonner";
import { addHistory } from "../../redux/slice/historySlice";
import apiFetchJSON from "../../utils/apiFetchJSON";
import apiFetch from "../../utils/apiFetch";

// Constants
const PAYMENT_METHODS = [
  { id: 1, name: "Google Pay", image: "google_pay.png" },
  { id: 3, name: "Gopay", image: "gopay.png" },
  { id: 4, name: "Paypal", image: "paypal.png" },
  { id: 5, name: "Dana", image: "dana.png" },
  { id: 6, name: "BCA", image: "bca.png" },
  { id: 7, name: "BRI", image: "bri.png" },
  { id: 8, name: "OVO", image: "ovo.png" },
  { id: 2, name: "Visa", image: "visa.png" },
];

// Validation regex patterns
// source of regex : https://medium.com/@lelianto.eko/indonesian-usefull-regex-formatter-function-41e3c541fcb3
const VALIDATION_PATTERNS = {
  name: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
  email: /^[^@]+@[^@]+\.[^@]+$/,
  phone: /^(?:\+62|62|0)[2-9]\d{7,11}$/,
};

// Collect error messages and show them sequentially
let messages = [];

// MAIN COMPONENT
function Payment() {
  // Redux state
  const movieState = useSelector((state) => state.movie);
  const orderState = useSelector((state) => state.order);
  const historyState = useSelector((state) => state.history);
  const loggedInState = useSelector((state) => state.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Component State
  const [transactionID, setTransactionID] = useState("");

  // Payment information display data
  const [paymentInfo, _] = useState([
    {
      title: "DATE & TIME",
      text: `${convertDate(orderState.order.date)} at ${orderState.order.time.slice(0, 5)}`,
    },
    { title: "MOVIE TITLE", text: `${movieState.movie.title}` },
    { title: "CINEMA NAME", text: `${orderState.order.cinema}` },
    {
      title: "NUMBER OF TICKETS",
      text: `${orderState.order.seats.length} Pieces`,
    },
    { title: "TOTAL PAYMENT", text: `$${orderState.order.totalPayment}.00` },
  ]);

  // Selected payment method
  const [selectedPayment, setSelectedPayment] = useState("");

  // User personal information form data
  const [personalInfo, setPersonalInfo] = useState({
    fullName: loggedInState.first_name + " " + loggedInState.last_name || "",
    email: loggedInState.email || "",
    phoneNumber: loggedInState.phoneNumber || "",
  });

  // Modal visibility states
  const [showModal, setShowModal] = useState(false);
  const [isMaskVisible, setIsMaskVisible] = useState(false);

  // Form validation error states
  // Initialize with error assumption (true), validate to false
  const [errorInput, setErrorInput] = useState({
    incorrectFullName: true,
    incorrectEmail: true,
    incorrectPhoneNum: true,
  });

  // Event Handlers
  /**
   * Handles payment method selection
   * @param {string} paymentId - The ID of the selected payment method
   */
  const handlePaymentChange = (paymentId) => {
    setSelectedPayment(paymentId);
  };

  /**
   * Validates and updates email field
   * @param {string} value - Email input value
   */
  function handleCheckEmail(value) {
    setPersonalInfo((now) => ({ ...now, email: value }));
    setErrorInput((prev) => ({
      ...prev,
      incorrectEmail: !VALIDATION_PATTERNS.email.test(value),
    }));
  }

  // Add this import at the top of your file with other imports:
  // import apiFetchJSON from "../../utils/apiFetchJSON";

  /**
   * Handles form submission with validation
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit Button Clicked!");

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

    // If there's no error
    if (
      !errorInput.incorrectFullName &&
      !errorInput.incorrectEmail &&
      !errorInput.incorrectPhoneNum
    ) {
      console.log("Validasi betul semua");

      // Create transaction in database
      try {
        // Prepare the request body according to your specification
        const requestBody = {
          payment_id: selectedPayment,
          total_payment: orderState.order.totalPayment,
          full_name: personalInfo.fullName,
          email: personalInfo.email,
          phone_number: personalInfo.phoneNumber,
          schedule_id: orderState.order.scheduleId || 1, // You might need to add this to orderState
          seats: orderState.order.seats,
        };

        // Get token from loggedInState
        const token = loggedInState.token || "";

        // Make the API call
        const data = await apiFetchJSON(
          `/api/v1/orders`,
          "POST",
          token,
          requestBody,
        );
        setTransactionID(data.id);

        // Show success message
        toast.success("Order created successfully!", { duration: 2000 });

        // Show modal if payment method is selected
        if (selectedPayment) {
          setShowModal(true);
          setIsMaskVisible(true);
        }
      } catch (error) {
        console.log(`error : ${error}`);

        // Handle different error scenarios
        if (error.status === 401) {
          toast.error("Session expired. Please login again.", {
            duration: 3000,
          });
          navigate("/signin");
        } else if (error.status === 400) {
          toast.error("Invalid request. Please check your information.", {
            duration: 3000,
          });
        } else if (error.status === 500) {
          toast.error("Server error. Please try again later.", {
            duration: 3000,
          });
        } else {
          toast.error("An error occurred while processing your order.", {
            duration: 3000,
          });
        }
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setIsMaskVisible(false);
    document.body.style.overflow = "unset";
  };

  /**
   * Processes payment confirmation and adds to history
   */
  async function handleCheckPayment() {
    const { movieId, originalTitle, cat = "PG-13" } = movieState.movie;
    const { date, time, cinema, seats, totalPayment } = orderState.order;

    // Find largest ID in the history, then +1 from that ID for the next ID
    let largestId = 0;
    historyState.forEach((el) => {
      if (el.orderId > largestId) {
        largestId = el.orderId;
      }
    });

    const obj = {};
    Object.assign(obj, {
      payment_id: selectedPayment,
      totalPayment,
      full_name: personalInfo.fullName,
      email: personalInfo.email,
      phone_number: personalInfo.phoneNumber,
      originalTitle,
      cat,
      date,
      time,
      cinema,
      seats,
      ticketStatus: {
        isActive: true,
        isPaid: true,
      },
      movieId,
    });

    // Add to history
    dispatch(addHistory(obj));

    const token = loggedInState.token || "";

    // PATCH transaction

    try {
      await apiFetch(
        `/api/v1/orders/transactions/${transactionID}`,
        "PATCH",
        token,
      );

      toast.success("Transaksi berhasil di bayar!", { duration: 2000 });
    } catch (error) {
      console.log(`error : ${error}`);
    }

    navigate("/result");
  }

  /**
   * Handles pay later functionality
   * Similar to handle check but, make the isPaid to false
   */
  const handlePayLater = () => {
    const { movieId, title, cat = "PG-13" } = movieState.movie;
    const { date, time, cityLocation, cinema, seats, totalPayment } =
      orderState.order;

    // Find largest ID in the history, then +1 from that ID for the next ID
    let largestId = 0;
    historyState.forEach((el) => {
      if (el.orderId > largestId) {
        largestId = el.orderId;
      }
    });

    const obj = {};
    Object.assign(obj, {
      // orderId: Math.floor(Math.random() * 1000) + 1,
      email: personalInfo.email,
      orderId: largestId + 1,
      movieId,
      title,
      cat,
      date,
      time,
      seats,
      totalPayment,
      ticketStatus: {
        isActive: true,
        isPaid: false,
      },
    });

    // Add to history and navigate to results
    dispatch(addHistory(obj));
    navigate("/");
  };

  // Utility functions

  /**
   * Formats a future date (1 day from now) for payment deadline
   * @returns (string) Formatted date string
   */
  const formatFutureDate = () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1); // 1 day from now
    return futureDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Effects

  // Initialize validation on component mount
  useEffect(() => {
    // Validate for email
    setErrorInput((prev) => ({
      ...prev,
      incorrectEmail: !VALIDATION_PATTERNS.email.test(personalInfo.email),
    }));

    // Check if first_name, last_name, email, and phoneNumber
    if (
      loggedInState.first_name == null ||
      loggedInState.last_name == null ||
      loggedInState.phoneNumber == null
    ) {
      toast.warning("You need to fill all your information first!");
      navigate("/profile");
    }
  }, []);

  useEffect(() => {
    setErrorInput({
      incorrectFullName: !VALIDATION_PATTERNS.name.test(personalInfo.fullName),
      incorrectEmail: !VALIDATION_PATTERNS.email.test(personalInfo.email),
      incorrectPhoneNum: !VALIDATION_PATTERNS.phone.test(
        personalInfo.phoneNumber,
      ),
    });
  }, [personalInfo.fullName, personalInfo.email, personalInfo.phoneNumber]);

  return (
    <div className="relative md:mx-auto">
      <form
        onSubmit={handleSubmit}
        className="mb-12 flex w-full flex-col gap-[18px] rounded-[6px] bg-white px-8 py-[38px] md:w-[900px]"
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
              {index < paymentInfo.length && (
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
              disabled={!!personalInfo.fullName}
              onChange={(e) => {
                const value = e.target.value;
                setPersonalInfo((now) => ({ ...now, fullName: value }));

                setErrorInput((prev) => ({
                  ...prev,
                  incorrectFullName: !VALIDATION_PATTERNS.name.test(value),
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
              disabled={!!personalInfo.email}
              onChange={(e) => {
                handleCheckEmail(e.target.value);
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
              disabled={!!personalInfo.phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                setPersonalInfo((now) => ({ ...now, phoneNumber: value }));

                setErrorInput((prev) => ({
                  ...prev,
                  incorrectPhoneNum: !VALIDATION_PATTERNS.phone.test(value),
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
            {"8277" + personalInfo.phoneNumber}
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
