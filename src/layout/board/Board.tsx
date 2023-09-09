import { Navigate, Route, Routes } from "react-router-dom";
import BoardFooter from "../../layout/board/BoardFooter";
import BoardHeader from "../../layout/board/BoardHeader";
import BoardWrite from "../../pages/board/BoardWrite";
import BoardMain from "../../pages/board/BoardMain";

const Board = () => {
  return (
    <>
      <BoardHeader />
      <hr />
      <Routes>
        <Route path="/" element={<Navigate to="/board" />} />
        <Route path="/board" element={<BoardMain />} />
        <Route path="/board/write" element={<BoardWrite />} />
      </Routes>
      <hr />
      <BoardFooter />
    </>
  );
}
  
export default Board;