import './styles/app.scss';
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';
import Toolbar from './components/Toolbar';
import Settingbar from './components/Settingbar';
import Canvas from './components/Canvas';

function App() {
  return (
    <BrowserRouter>
    <div className="app">
      <Routes>
        <Route path='/:id' element={
          <>
          <Toolbar />
          <Settingbar />
          <Canvas />
          </>
        } />
        <Route path='*' element={<Navigate to={`f${(+new Date).toString(16)}`} replace={true} />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
