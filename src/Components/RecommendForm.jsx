// import React from 'react'

import { useContext, useEffect, useState } from "react"
import AppContext from "../Context/Context"

function RecommendForm() {

  const {savedList, setSavedList} = useContext(AppContext)


    const initialState= {
        title:'',
        author:'',
        text:''
    }

const [recommend,setRecommend] = useState(initialState)

function onChangeHandle(e){
    setRecommend((prev)=> {
        return { ...prev,[e.target.name]: e.target.value}})
  }

function submitAction(e){
    e.preventDefault()

    if( recommend.title =='' || recommend.author =='' || recommend.text == '') alert('All fields are required')
    else {
      setSavedList([...savedList,recommend ])
      setRecommend(initialState)
    }       
}

useEffect(()=>{
// console.log(savedList)
localStorage.setItem('savedList', JSON.stringify(savedList) )
}, [ savedList])

function clearAll(){
  localStorage.clear('savedList')
  setSavedList([])

}

  return (
    <div className="body" id='recommend'>
    <div className="container">
    <h3>Recommend your favorite Books to everyone</h3>
    <label htmlFor="title">Book Title : </label>
    <input value={recommend.title}  name='title' onChange={onChangeHandle} id="title" type="text" placeholder="Recommend a book" />
    <br/>
    <br/>

    <label htmlFor="author" >Author : </label>
    <input value={recommend.author} name='author' onChange={onChangeHandle} required id="author" type="text" placeholder="Recommend an author" />
    <br/>
    <br/>

    <label htmlFor="recommendation">Category : </label>
    <input  value={recommend.text} name='text' onChange={onChangeHandle} id="recommendation" type="text" placeholder="Recommend category" />
    <br/>
    <br/>
    <button className="btn btn-success" onClick={submitAction}>Submit</button>

    </div>
    <hr/>
    <h3>Recommended Books:</h3>
    {
      savedList && savedList.map((item, index)=>{
            return <div className="col-md-5" style={{display:'flex'}} key={index}>
            <p className="mx-4" > <span style={{fontWeight:'bold'}} > Book:</span> {item.title} </p> 
            
            <p className="mx-4"><span style={{fontWeight:'bold'}} > Author: </span> {item.author} </p>
            <p className="mx-4"><span style={{fontWeight:'bold'}} > Category: </span>  {item.text} </p>
            </div>

        })

    }
    <button className="btn btn-danger" onClick={clearAll} >Clear All</button>
    <hr/>

      
    </div>
  )
}

export default RecommendForm
