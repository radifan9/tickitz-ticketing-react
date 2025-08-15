import React, { useState } from "react";
import { ProfileHeader } from "../../components/ProfileHeader";
import { UserProfile } from "../../components/UserProfile";
import { OneTicket } from "./OneTicket";

export default function History() {
  // Password control
  const [passwordEye, setPasswordEye] = useState("closed");
  const [passwordEyeConfirm, setPasswordEyeConfirm] = useState("closed");

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
      <div className="md:grid-cols-[1fr_3fr] container mx-auto grid gap-y-4 pb-4 md:grid md:items-start md:py-8">
        {/* Profile Header */}
        <ProfileHeader loc={"history"} />

        {/* User Profile */}
        <UserProfile />

        {/* <!-- One ticket --> */}
        <OneTicket isActive={true}  />
        <OneTicket isPaid={true} />
      </div>
    </>
  );
}
