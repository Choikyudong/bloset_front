import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";
import AccountHeader from "./AccountHeader";
import AccountFooter from "./AccountFooter";
import SignIn from "../../pages/account/SignIn";
import SignUp from "../../pages/account/SignUp";
import { useNavigatorContext } from "../common/NavigatorProvider";

const Account = () => {
  const navigator = useNavigatorContext();

  React.useEffect(() => {
    const hasToken = sessionStorage.getItem('user');
    if (hasToken !== null) {
      alert('잘못된 접근!');
      navigator('/board/');
    }
  }, []);

  return (
    <>
      <AccountHeader />
      <Routes>
        <Route path="/" element={<Navigate to="/account/signIn" replace />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
      <AccountFooter />
    </>
  );
}
  
export default Account;
