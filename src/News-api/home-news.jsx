import { useEffect } from "react";
import { FilterNews } from "./api";
import axios from 'axios'
import { useState } from "react";
export default function Home(){
    const [news,setNews] = useState([])
    useEffect(()=>{
        axios.get(FilterNews.US).then((response)=>{
            setNews(response.data)
        })

    },[])
    return <div>Home</div>
    
}