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
    const [inputValue,setInputValue] = useState('')
    const [filter,setFilter] = useState('')
    const[fromDate,setFormDate] = useState('')
    const[toDate,setToDate] = useState('')
   
    const[page,setPage] = useState(20)
    const {register,handleSubmit} = useForm()
    
   
    const key = '1a32f1bbd1614e048ae04256b352bb21'
    
    useEffect(()=>{
        if(name){
           axios.get('https://newsapi.org/v2/everything',{
            params:{
                q:name,
                sortBy:filter,
                pageSize:page,
                from:fromDate,
                to:toDate,
                apiKey:key
            }
           }).then((response)=>{
            setNews(response.data.articles)
           })

       }else{
            axios.get('https://newsapi.org/v2/top-headlines',{
                params:{
                    country:'us',
                    pageSize:page,
                    apiKey:'c9ba4a8cb8c144cca633450a23b9c55b'
                }
            }).then((response)=>{
                setNews(response.data.articles)
            })
       }        
         
    },[name,filter,fromDate,toDate,page])
    
    useEffect(()=>{
        setPage(20)
    },[name])

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
            <Link to={'/'}><h1 className={style.newsTitle}><i class="bi bi-camera2"></i> Global news </h1></Link>
           {name !=='' ?<div> 

            
            <div class="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Show filter
                </button>
                
                <div className={`dropdown-menu bg-dark p-2 rounded`} aria-labelledby="dropdownMenuButton">
                    <div>
                    <h4 className={style.filterItem} onClick={selectChange} htmlfor='popularity'>Popularity</h4>
                    <h4 className={style.filterItem} onClick={selectChange} htmlFor="publishedAt">PublishedAt</h4>
                    <h4 className={style.filterItem} onClick={selectChange} htmlFor="relevancy">Relevancy</h4>
                    </div>

                

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
        <input onChange={(e)=>{setInputValue(e.target.value)}} type="text" className={`form-control ${style.searchBar}`}
         placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />

        <div class="input-group-append">
            <button className={`${style.searchBtn} btn btn-primary`} onClick={()=>{if(inputValue !== ''){setName(inputValue);}}} type="button"><i className="text-light bi bi-search"></i> Search</button>
        </div>
        </div>
        </div>



        <div className={style.newsPage}>
           
            {news.map((el,index)=>{
                
                return <div key={index} className={style.card}>
                    
                    <img onClick={()=>{window.open(el.url)}} src={el.urlToImage ? el.urlToImage : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/400px-Question_mark_%28black%29.svg.png'} className={style.cardImg} />
                    <h5 >{el.title.slice(0,60)}...</h5>
                    <p>{ el.description?.slice(0,100)} ...</p>
                    <Link style={{position:'absolute',right:'2%'}}  to={'/article'}  className="btn btn-primary w-25" onClick={()=>{contextUse.setSentNews(el)}}>Read </Link     >
                </div>
            })}
        </div>
        <button className="btn btn-primary w-50 my-5" onClick={()=>{setPage(page+20)}}>Load more</button>
    </div>
}