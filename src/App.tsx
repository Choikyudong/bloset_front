import { Routes, Route, useNavigate } from 'react-router-dom';

import NotFound from './pages/error/NotFound';
import Account from './layout/account/Account';
import Board from './layout/board/Board';
import { NavigatorProvider } from './layout/common/NavigatorProvider';

const App = () => {
  const navigator = useNavigate();

  return (
    <NavigatorProvider navigator={navigator}>
      <Routes>
        <Route path='/*' element={<Board />} />
        <Route path='/account/*' element={<Account />} />
        <Route path='/error/*' element={<NotFound />} />
      </Routes>
    </NavigatorProvider>
  );
}

export default App;
