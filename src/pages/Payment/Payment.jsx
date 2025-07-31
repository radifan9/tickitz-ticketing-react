import React from "react";

function Payment() {
  return (
    <form>
      <div className="container-payment">
        <h2>Payment Info</h2>

        {/* <!-- Date --> */}
        <div className="payment-info">
          <div className="payment-label">DATE & TIME</div>
          <div className="payment-content">
            Tuesday, 07 July 2020 at 02:00pm
          </div>
        </div>
        <div className="full-hr-line"></div>

        {/* <!-- Title --> */}
        <div className="payment-info">
          <div className="payment-label">MOVIE TITLE</div>
          <div className="payment-content">Spider-Man: Homecoming</div>
        </div>
        <div className="full-hr-line"></div>

        {/* <!-- Cinema --> */}
        <div className="payment-info">
          <div className="payment-label">CINEMA NAME</div>
          <div className="payment-content">CineOne21 Cinema</div>
        </div>
        <div className="full-hr-line"></div>

        {/* <!-- Tickets --> */}
        <div className="payment-info">
          <div className="payment-label">NUMBER OF TICKETS</div>
          <div className="payment-content">3 pieces</div>
        </div>
        <div className="full-hr-line"></div>

        {/* <!-- Total Payment --> */}
        <div className="payment-info">
          <div className="payment-label">TOTAL PAYMENT</div>
          <div className="payment-content total-payment">$30,00</div>
        </div>
        <div className="full-hr-line"></div>
      </div>

      {/* <!-- Personal Info --> */}
      <div className="container-personal">
        <h2>Personal Information</h2>

        {/* <!-- Full Name --> */}
        <div className="payment-info">
          <label className="payment-label personal-label">Full Name</label>
          <input
            className="personal-content"
            type="text"
            placeholder="Jonas El Rodriguez"
          />
        </div>

        {/* <!-- Email --> */}
        <div className="payment-info">
          <label className="payment-label personal-label">Email</label>
          <input
            className="personal-content"
            type="text"
            placeholder="jonasrodri123@gmail.com"
          />
        </div>

        {/* <!-- Phone Number --> */}
        <div className="payment-info">
          <label className="payment-label personal-label">Phone Number</label>
          <span></span>
          <input
            className="personal-content"
            type="text"
            placeholder="+62 | 81445687121"
          />
        </div>
      </div>

      {/* <!-- Payment Method --> */}
      <div className="container-method">
        <h2>Payment Method</h2>
        <div>
          <button className="btn-method">
            <img src="../assets/images/gpay.png" alt="GPay" />
          </button>

          <button className="btn-method">
            <img src="../assets/images/logos_visa.png" alt="Visa" />
          </button>

          <button className="btn-method">
            <img src="../assets/images/gopay.png" alt="Gopay" />
          </button>

          <button className="btn-method">
            <img src="../assets/images/paypal.png" alt="Paypal" />
          </button>

          <button className="btn-method">
            <img src="../assets/images/dana.png" alt="Dana" />
          </button>

          <button className="btn-method">
            <img src="../assets/images/bca.png" alt="BCA" />
          </button>

          <button className="btn-method">
            <img src="../assets/images/bri.png" alt="BRI" />
          </button>

          <button className="btn-method">
            <img src="../assets/images/ovo.png" alt="OVO" />
          </button>
        </div>
      </div>

      {/* <!-- Payment Button --> */}
      <button className="btn-pay">Pay your order</button>
    </form>
  );
}

export default Payment;
