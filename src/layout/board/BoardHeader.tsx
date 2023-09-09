import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigatorContext } from "../common/NavigatorProvider";
import { actionlogOut } from "../../service/account/accountService";

const BoardHeader = () => {
  const navigator = useNavigatorContext();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const doLogOut = async () => {
    const logOut = window.confirm("로그아웃 할꺼임?");
    if (logOut) {
      const result = await actionlogOut();
      if (result) {
        alert('로그아웃~~');
        localStorage.removeItem('user');
        navigator('/account/signIn')
      } else {
        alert('실패');
      }
    }
  }

  return (
    <header>
      <h1>헤더</h1>
      {
        isLogin ?
        <button onClick={doLogOut}>로그아웃</button>
        : <button><Link to={'/account'}>로그인</Link></button>
      }
    </header>
  );
}

export default BoardHeader;
