import { useEffect } from "react";
import axios from 'axios'
import { useState } from "react";
import style from './news.module.css';
import { useContext } from "react";
import { myContext } from "./context";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Home(){
    const contextUse = useContext(myContext)
    const [name,setName] = useState('')
    const [news,setNews] = useState([])
    const [inputValue,setInputValue] = useState([])
    const [filter,setFilter] = useState('')
    const[fromDate,setFormDate] = useState('')
    const[toDate,setToDate] = useState('')
   
    const[page,setPage] = useState(20)
    const {register,handleSubmit} = useForm()
    
   
    const key = 'c9ba4a8cb8c144cca633450a23b9c55b'
    

    const Headlines =  `https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`
    
    const [appear,setAppear] = useState(Headlines)
    
    

    useEffect(()=>{
        const options=`https://newsapi.org/v2/everything?q=${name}&${filter?`sortBy=${filter}&`:''}${fromDate ? `from=${fromDate}&to=${toDate}&`:''}${page?`pageSize=${page}&`:''}apiKey=${key}`
            setAppear(options)

            axios.get(appear).then((response)=>{
                
                if(response.data.articles.length > 20){
                    
                    setNews(response.data.articles)
                   
                }else{
                    setNews(response.data.articles)
                }

                
    
            })
        

    },[name,appear,filter,fromDate,toDate,page])
    


    function selectChange(elm){
        if(name !== ''){
            setFilter(elm.target.innerText)
        }
    }

    
    const getDates = (data)=>{
            setFormDate(data.from);
            setToDate(data.to)
        
    }

   
    
    return <div className={`${style.newsContainer}`}>
        <div className="bg-danger w-100 d-flex align-items-center justify-content-center " style={{position:'relative'}}>
            
        <div>
            <h1 className={style.newsTitle}><i class="bi bi-camera2"></i> Global news </h1>
           {name !=='' ?<div> 

            
            <div class="dropleft">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Show filter
                </button>
                
                <div className={`dropdown-menu bg-dark p-2 rounded`}aria-labelledby="dropdownMenuButton">
                <h4 className={style.filterItem} onClick={selectChange} for='popularity'>Popularity</h4>
                <h4 className={style.filterItem} onClick={selectChange} htmlFor="publishedAt">PublishedAt</h4>
                <h4 className={style.filterItem} onClick={selectChange} htmlFor="relevancy">Relevancy</h4>
                

            <form  action="" className={style.formDates} onSubmit={handleSubmit(getDates)}>
                <input className={`${style.datum}`}  type="date" name="from" {...register('from')}  />
                <input className={`${style.datum}`} type="date" name="to"{...register('to')} />
                <input type="submit" className="btn btn-danger" />
        
            </form>
                </div>
                </div>

                
                
                

           

           </div>
           :''}
           

        
        </div>
                
        <div class="input-group my-5 w-50">
        <input onChange={(e)=>{setInputValue(e.target.value)}} type="text" className={`form-control ${style.searchBar}`} placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
        <div class="input-group-append">
            <button class="btn btn-primary" onClick={()=>{setName(inputValue)}} type="button"><i class="bi bi-search"></i> Search</button>
        </div>
        </div>
            
        </div>
        
        <div className={style.newsPage}>
           
            {news.map((el,index)=>{
                
                return <div key={index} className={style.card}>
                    
                    <img onClick={()=>{window.open(el.url)}} src={el.urlToImage ? el.urlToImage : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/400px-Question_mark_%28black%29.svg.png'} className={style.cardImg} />
                    <h5 >{el.title.slice(0,60)}...</h5>
                    <p>{el.description?.slice(0,100)} ...</p>
                    <Link style={{position:'absolute',right:'2%'}}  to={'/article'}  className="btn btn-primary w-25" onClick={()=>{contextUse.setSentNews(el)}}>Read </Link     >
                </div>
            })}
        </div>
        <button className="btn btn-primary w-50 my-5" onClick={()=>{setPage(page+20)}}>Load more</button>
    </div>
}