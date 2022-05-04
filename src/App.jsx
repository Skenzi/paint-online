import './styles/app.scss';
import Toolbar from './components/Toolbar';
import Settingbar from './components/Settingbar';
import Canvas from './components/Canvas';

function App() {
  return (
    <div className="app">
      <Toolbar />
      <Settingbar />
      <Canvas />
    </div>
  );
}

export default App;
