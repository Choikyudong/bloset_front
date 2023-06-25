import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import AccountHeader from "./AccountHeader";
import AccountFooter from "./AccountFooter";
import SignIn from "../../pages/account/SignIn";
import SignUp from "../../pages/account/SignUp";

const Account = () => {
  React.useEffect(() => {
    const hasToken = localStorage.getItem('test');
    if (hasToken === null) {
      console.log('로그인이 안되있다고 가정');
    } else {
      console.log('로그인이 되어있다고 가정');
      window.location.href = 'http://localhost:3000/';
    }
  }, []);

  return (
    <>
      <AccountHeader />
      <Routes>
        <Route path="/" element={<Navigate to="/account/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <AccountFooter />
    </>
  );
}
  
export default Account;
