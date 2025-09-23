import React, { useState, useEffect } from "react";
import { ProfileHeader } from "../../components/ProfileHeader";
import { UserProfile } from "../../components/UserProfile";
import { OneTicket } from "./OneTicket";
import { useSelector, useDispatch } from "react-redux";
import { historyActions } from "../../redux/slice/historySlice";
import Loader from "../../components/Loader.jsx";

export default function History() {
  // Password control
  const [passwordEye, setPasswordEye] = useState("closed");
  const [passwordEyeConfirm, setPasswordEyeConfirm] = useState("closed");

  // Hooks
  const dispatch = useDispatch();

  // Redux state
  const loggedInState = useSelector((state) => state.loggedIn);
  const { token, email } = loggedInState;
  const {
    isLoading,
    isSuccess,
    isFailed,
    history: historyState,
  } = useSelector((state) => state.history);

  // Fetch history data on component mount
  useEffect(() => {
    if (token) {
      dispatch(historyActions.getHistoriesThunk({ token }));
    }
  }, [dispatch, token]);

  // Click handlers for password visibility (if needed elsewhere)
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

  // Show loader while fetching data
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="mx-auto grid gap-y-4 pb-4 md:grid md:grid-cols-[1fr_3fr] md:items-start md:gap-x-8 md:py-8">
        {/* Profile Header */}
        <ProfileHeader loc={"history"} />

        {/* User Profile */}
        <UserProfile />

        {/* Show message if no tickets found */}
        {!historyState || historyState.length === 0 ? (
          <div className="flex justify-center py-8 md:col-start-2">
            <p className="text-gray-500">No ticket history found.</p>
          </div>
        ) : (
          // Render tickets
          historyState.map((ticket, idx) => {
            return <OneTicket ticket={ticket} key={ticket.id || idx} />;
          })
        )}
      </div>
    </>
  );
}
