import { Route, Routes } from "react-router-dom";
import BoardBody from "../../layout/board/BoardBody";
import BoardFooter from "../../layout/board/BoardFooter";
import BoardHeader from "../../layout/board/BoardHeader";
import Setting from "../../pages/board/Setting";
import { Box } from "@mui/material";

const Board = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
      <BoardHeader />
      <BoardBody />
      {/* <BoardFooter /> */}
      </Box>
    </>
  );
}
  
export default Board;