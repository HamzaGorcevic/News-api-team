import './App.css';
import Article from './News-api/article-news';
import Home from './News-api/home-news';
import { Routes,Route } from 'react-router-dom';


function App() {
  return <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='article' element={<Article/>}/>
  </Routes>
}

export default App;
