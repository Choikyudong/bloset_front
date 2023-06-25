import React from "react";

const AccountBody = () => {
  React.useEffect(() => {
    const hasToken = localStorage.getItem('test');
    if (hasToken === null) {
      console.log('로그인됨');
    } else {
      console.log('ㄱㅊ');
    }
  }, []);

  return (
    <>
      <body>바디</body>
    </>
  );
}
  
export default AccountBody;

