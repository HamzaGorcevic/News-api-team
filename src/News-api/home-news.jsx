import { useEffect } from "react";
import { FilterNews } from "./api";
import axios from 'axios'
import { useState } from "react";
import style from './news.module.css'
export default function Home(){
    const [news,setNews] = useState([])
    useEffect(()=>{
        axios.get(FilterNews.US).then((response)=>{
            setNews(response.data.articles)
        })

    },[])
    console.log(news);
    return <div className={style.newsContainer}>
        <div className={style.newsPage}>
            {news.map((el)=>{
                console.log(el);
                return <div className={style.card}>
                    <img src={el.urlToImage} className={style.cardImg} />
                    <h2 >{el.title}</h2>
                    <p>{el.description}</p>
                    <button className="btn btn-primary w-50">Read full article</button>
                </div>
            })}
        </div>
    </div>
    
}