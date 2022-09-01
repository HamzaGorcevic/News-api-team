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
    const[show,setShow] = useState(false)
    const {register,handleSubmit,trigger} = useForm()
    
   
    const key = 'be78ec06cbf7435697d774d947488f4b'
    

    const Headlines =  `https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`
    
    const [appear,setAppear] = useState(Headlines)
    
    

    useEffect(()=>{
        const options=`https://newsapi.org/v2/everything?q=${name}&${filter?`sortBy=${filter}&`:''}${fromDate ? `from=${fromDate}&to=${toDate}&`:''}apiKey=${key}`
            setAppear(options)
            console.log(options);
            axios.get(appear).then((response)=>{
    
                setNews(response.data.articles)
                
    
            })
        

    },[name,appear,filter,fromDate,toDate])
    
    function selectChange(elm){
        if(name !== ''){
            setFilter(elm.target.value)
        }
    }

    
    const getDates = (data)=>{
            setFormDate(data.from);
            setToDate(data.to)
        
    }
    
    return <div className={`${style.newsContainer}`}>
        <div className="bg-danger w-100 d-flex align-items-center justify-content-center flex-column" style={{position:'relative'}}>
            
        <div>
            <h1 className={style.newsTitle}><i class="bi bi-camera2"></i> Global news </h1>
           {name !=='' ?<div> <select name="" id="" onChange={selectChange}>
                <option  defaultValue={''} >Chose filter</option>
                <option value={'popularity'} >popularity</option>
                <option value="publishedAt">publishedAt</option>
                <option value="relevancy">relevancy</option>
                <option value={''}>Default option</option>
           </select>
           <form action="" className={style.formDates} onSubmit={handleSubmit(getDates)}>
            
            <button onClick={()=>{setShow(!show)}}>show advanced</button>
            <input className={`${style.datum} ${show ?'':'d-none'}`}  type="date" name="from" {...register('from')}  />
            <input className={`${style.datum} ${show ?'':'d-none'}`} type="date" name="to"{...register('to')} />
            <button className={style.searchBtn} onClick={()=>{
                trigger(['from','to']);
                
            }}>Search by date</button>
        </form>
           </div>
           :''}
           

        
        </div>
                
        <div class="input-group my-5 w-50">
        <input onChange={(e)=>{setInputValue(e.target.value)}} type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
        <div class="input-group-append">
            <button class="btn btn-outline-warning" onClick={()=>{setName(inputValue)}} type="button">Search</button>
        </div>
        </div>
            
        </div>
        
        <div className={style.newsPage}>
           
            {news.map((el,index)=>{
                
                return <div key={index} className={style.card}>
                    
                    <img onClick={()=>{window.open(el.url)}} src={el.urlToImage ? el.urlToImage : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/400px-Question_mark_%28black%29.svg.png'} className={style.cardImg} />
                    <h5 >{el.title}</h5>
                    <p>{el.description?.slice(0,100)} ..</p>
                    <Link style={{position:'absolute',right:'2%'}}  to={'/article'}  className="btn btn-primary w-25" onClick={()=>{contextUse.setSentNews(el)}}>Read </Link     >
                </div>
            })}
        </div>
        <button onClick={()=>{}} className="btn btn-outline-danger my-5">Load more</button>
    </div>
}