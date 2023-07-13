import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import GamePage from './pages/GamePage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path = "/" element = { <HomePage/> }></Route>
            <Route path = "/game" element = {<GamePage/>}></Route>
          </Routes>

        </Router>
      </header>
    </div>
  );
}

export default App;
