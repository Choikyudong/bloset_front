import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigatorContext } from "../common/NavigatorProvider";
import { actionlogOut } from "../../service/account/accountService";
import { LoginProps } from "../../domains/board/mainPost";

const BoardHeader: React.FC<LoginProps> = ({ isLogin }) => {
  const navigator = useNavigatorContext();
  const [loginStatus, setLoginStatus] = useState<boolean>(isLogin);

  useEffect(() => {
    setLoginStatus(isLogin);
  }, [isLogin]);

  const doLogOut = async () => {
    const logOut = window.confirm("로그아웃 할꺼임?");
    if (logOut) {
      const result = await actionlogOut();
      if (result) {
        alert('로그아웃~~');
        localStorage.removeItem('user');
        navigator('/account/signIn');
      } else {
        alert('실패');
      }
    }
  }

  const doMyInfo = async () => {
    navigator('/board/changeMyInfo');
  }

  return (
    <header>
      <h1>헤더</h1>
      {
        loginStatus ?
        <>
          <button onClick={doLogOut}>로그아웃</button>
          <button onClick={doMyInfo}>개인정보수정</button>
        </>
        : <button><Link to={'/account'}>로그인</Link></button>
      }
    </header>
  );
}

export default BoardHeader;
