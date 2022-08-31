import { useEffect } from "react";
import axios from 'axios'
import { useState } from "react";
import style from './news.module.css';
import { useContext } from "react";
import { myContext } from "./context";
import { Link } from "react-router-dom";

export default function Home(){
    const contextUse = useContext(myContext)
    const [name,setName] = useState('')
    const [news,setNews] = useState([])
    const [inputValue,setInputValue] = useState([])
    const [filter,setFilter] = useState('')
    const[random,setRandom] = useState(0)
    
    
    
    const key = '1a32f1bbd1614e048ae04256b352bb21'
    
    
    const Headlines =  `https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`
    
    const [appear,setAppear] = useState(Headlines)
    
    

    useEffect(()=>{
        const options=`https://newsapi.org/v2/everything?q=${name}&${filter?`sortBy=${filter}&`:''}apiKey=${key}`

        setAppear(options)
        console.log('inside use effeck', appear);
        axios.get(appear).then((response)=>{

            setNews(response.data.articles)
            

        })

    },[name,appear,random])
    
    console.log(appear,'outside useeffeck');
    return <div className={`${style.newsContainer}`}>
        <p style={{display:'none'}}>{random}</p>
        <div>
            <input type="text" onChange={(el)=>{setInputValue(el.target.value)}} />
           <select name="" id="" onChange={(elm)=>{setFilter(elm.target.value)}}>
                 <option selected >Chose filter</option>
                 <option value={'popularity'}  >popularity</option>
                <option value={'nothing'}>nothing</option>
           </select>
            <button className="btn btn-warning" onClick={()=>{setName(inputValue);setRandom(random + 1)}}>Search</button>
        </div>
        
        <div className={style.newsPage}>
           
            {news.map((el,index)=>{
                
                return <div key={index} className={style.card}>
                    <img src={el.urlToImage} className={style.cardImg} />
                    <h2 >{el.title}</h2>
                    <p>{el.description}</p>
                    <Link  to={'/article'}  className="btn btn-primary w-50" onClick={()=>{contextUse.setSentNews(el)}}>Read full article</Link     >
                </div>
            })}
        </div>
        <button onClick={()=>{}} className="btn btn-outline-danger my-5">Load more</button>
    </div>
}