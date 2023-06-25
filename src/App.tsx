import {
  BrowserRouter as Router
  , Routes
  , Route
  , Navigate
} from 'react-router-dom';


import NotFound from './pages/error/NotFound';
import Account from './layout/account/Account';
import Board from './layout/board/Board';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='' element={<Board />} />
          <Route path='/account/*' element={<Account />} />
          <Route path='/error/*' element={<NotFound />} />
          {/* <Route path="/*" element={ <Navigate to="/error/notFound" replace /> } /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
