// import logo from './logo.svg';
// import logo from './img/graduate.png';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DefaultLayout from './containers/DefaultLayout';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/*" element={<DefaultLayout/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
