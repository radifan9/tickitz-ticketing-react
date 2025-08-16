import React, { useState } from "react";
import { ProfileHeader } from "../../components/ProfileHeader";
import { UserProfile } from "../../components/UserProfile";
import { OneTicket } from "./OneTicket";
import { useSelector } from "react-redux";

export default function History() {
  // Password control
  const [passwordEye, setPasswordEye] = useState("closed");
  const [passwordEyeConfirm, setPasswordEyeConfirm] = useState("closed");

  const loggedInState = useSelector((state) => state.loggedIn);
  const historyState = useSelector((state) => state.history);
  const ticketHistory = historyState.filter(
    (el) => el.email == loggedInState.email,
  );
  console.log(ticketHistory);

  // Click handler
  const handleEye = () => {
    setPasswordEye((now) => {
      if (now === "closed") {
        return "opened";
      }
      return "closed";
    });
  };

  const handleEyeConfirm = () => {
    setPasswordEyeConfirm((now) => {
      if (now === "closed") {
        return "opened";
      }
      return "closed";
    });
  };

  return (
    <>
      <div className="container mx-auto grid gap-y-4 pb-4 md:grid md:grid-cols-[1fr_3fr] md:items-start md:py-8">
        {/* Profile Header */}
        <ProfileHeader loc={"history"} />

        {/* User Profile */}
        <UserProfile />

        {ticketHistory.map((ticket, idx) => {
          return <OneTicket ticket={ticket} key={idx} />;
        })}
      </div>
    </>
  );
}
