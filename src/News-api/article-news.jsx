import { useContext } from "react"
import { myContext } from "./context";
import style from './article.module.css'



export default function Article(){
    const contextUse = useContext(myContext)
    console.log(contextUse.sentNews,'article');
    
    return <div className={style.articleContainer}>
        <div className={style.article}>
            <img src={contextUse.sentNews.urlToImage} alt="" className={style.imgArticle} onClick={()=>{window.open(contextUse.sentNews.url)}} />
            <h1 className="mt-5">{contextUse.sentNews.title}</h1>
            
            <div className="ml-auto">
                <h2 className="">by author: <span className="text-warning"> {contextUse.sentNews.author} </span></h2>
                <h3>Published at:  {contextUse.sentNews.publishedAt}</h3>
            </div>
            <p>{contextUse.sentNews.content}</p>
            
        </div>
        

    </div>
}