import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import BoardFooter from "../../layout/board/BoardFooter";
import BoardHeader from "../../layout/board/BoardHeader";
import BoardWrite from "../../pages/board/BoardWrite";
import BoardMain from "../../pages/board/BoardMain";
import BoardMyInfo from "../../pages/board/BoardMyInfo";

const Board = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    if (localStorage.getItem('user') !== null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <>
      <BoardHeader isLogin={isLogin} />
      <hr />
      <Routes>
        <Route path="/" element={<Navigate to="/board" />} />
        <Route path="/board" element={<BoardMain isLogin={isLogin} />} />
        <Route path="/board/write" element={<BoardWrite />} />
        <Route path="/board/changeMyInfo" element={<BoardMyInfo isLogin={isLogin} />} />
      </Routes>
      <hr />
      <BoardFooter />
    </>
  );
}
  
export default Board;