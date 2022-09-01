import { useState } from "react"
import { createContext } from "react"



const myContext = createContext()
export {myContext}
export default function ContextProvide({children}){
    const[sentNews,setSentNews] = useState([])
    const[arrNes,setArrNews] = useState([])
    const[headlines,setHeadlines] = useState('')
    return <myContext.Provider value={{sentNews,setSentNews,arrNes,setArrNews,headlines,setHeadlines}}>
        {children}
    </myContext.Provider>

    


}