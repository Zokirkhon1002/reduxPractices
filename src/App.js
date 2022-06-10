import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Counter from './features/counter/Counter';
import Posts from './features/posts/Posts';
import Home from './features/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/counter' element={<Counter/>}/>
        <Route path='/posts' element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
