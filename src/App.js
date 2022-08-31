import './App.css';
import Article from './News-api/article-news';
import Home from './News-api/home-news';
import { Routes,Route } from 'react-router-dom';
import ContextProvide from './News-api/context';

function App() {
  return <ContextProvide>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='article' element={<Article/>}/>
  </Routes>
  </ContextProvide>
}

export default App;
