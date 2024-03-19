// import React from "react";

import { useContext, useEffect, useState } from "react";
import useRating from './useRating'
import AppContext from "../Context/Context";
import './CSS.css'

function BookInner(props) {
  const { thumbnail, title, categories, authors, infoClick } = props;
  const { modalTitle, modalCategory, modalAuthors, modalThumbnail, modalPublishYear, modalPageCount, modalBookID, incomingRating, buttonDisable, incomingFeedback, setFeedbackEmpty} = props;
  const [ thisBookRating, setThisBookRating] = useState(null)
  const [ ratingToSend, setRatingToSend] = useState('not yet rated')
  const [ buttonDisableState, setButtonDisableState] = useState()
  const [ getFeedback, setGetFeedback] = useState('')  
  const {userRatingObject, setUserRatingObject , feedback, setFeedback, favoriteList, setFavoriteList} = useContext(AppContext)



  function favButtonHandler(){
    let tempFavoriteList = JSON.parse(JSON.stringify(favoriteList))


  }

  useEffect(()=>{

  },[])


  let displayTitle=null
    if(title.length > 35) {displayTitle = title.slice(0,35) +'..'}
    else {displayTitle = title}

    

  function submitReviewHandler(){
  let tempRatingObject = JSON.parse(JSON.stringify(userRatingObject))
  if(thisBookRating){
    if(tempRatingObject.hasOwnProperty(modalBookID)) tempRatingObject[modalBookID].push(thisBookRating)
    else tempRatingObject[modalBookID] = [thisBookRating]
   localStorage.setItem("userRatingObjectLocalList",JSON.stringify(tempRatingObject))
  }
  setUserRatingObject(tempRatingObject)


   let tempFeedbackList = JSON.parse(JSON.stringify(feedback))
   if(getFeedback){
      if(tempFeedbackList.hasOwnProperty(modalBookID)) tempFeedbackList[modalBookID]= getFeedback
      else tempFeedbackList[modalBookID] = getFeedback
     localStorage.setItem("feedbackSavedList",JSON.stringify(tempFeedbackList))
    }
    setFeedback(tempFeedbackList)


   setButtonDisableState(true)
  //  alert('rating Submitted') 
   setThisBookRating(null)
  // setGetFeedback(setFeedbackEmpty)

  }

  useEffect(()=>{
  },[ratingToSend, getFeedback])


  let thisRatingObject = JSON.parse(localStorage.getItem("userRatingObjectLocalList"));

  useEffect(()=>{},[userRatingObject])

  

  useEffect(() => {
    if(thisRatingObject){
    if(thisRatingObject.hasOwnProperty(modalBookID)){
      let sumRating = thisRatingObject[modalBookID].reduce((acc, itr) => { 
            return acc + itr;})
    
          let avgRating = (sumRating /thisRatingObject[modalBookID].length).toFixed(2);
          setRatingToSend(avgRating)
    }
    // else{
    //   console.log('no exist')
    // }
  }

  },[])
  
  // <div className="card-text"> <span style={{ fontWeight: "bold" }}>Avg Rating:</span>{ratingToSend}</div>



function closeClick(){
    setButtonDisableState(false)
  setGetFeedback('')

  }

function viewMoreClicked(){
  infoClick()
  // setGetFeedback('')
}

  return (
    <div id="card-inner">
      <div className="card " style={{ width: "24rem", height: "29rem" }}>
        <img className="card-img-top" style={{ height: "17rem" }} src={thumbnail} alt="Card image cap" />
        
        <div className="card-body card-inner">
          <h5 className="card-title">{displayTitle}</h5>
          <div className="card-text"> <span style={{ fontWeight: "bold" }}>Category:</span>{categories}</div>
          <div className="card-text">
            <span style={{ fontWeight: "bold" }}>Author:</span> {authors}
          </div>
          


          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            // onClick={infoClick}
            onClick={viewMoreClicked}
          >
            View More
          </button>

          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
          
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >

          
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                 
                  <img className="card-img-top" style={{ height: "17rem" }} src={modalThumbnail} alt="Card image cap" />
                </div>
                 <div className="modal-body" ><h5>{modalTitle}</h5></div>
                 <div className="card-text"> <span style={{ fontWeight: "bold", marginLeft:'1em' }}> Category : </span>{modalCategory}</div>
                 <div className="card-text"> <span style={{ fontWeight: "bold", marginLeft:'1em' }}> Author : </span>{modalAuthors}</div>
                 <div className="card-text"> <span style={{ fontWeight: "bold", marginLeft:'1em' }}> Published Year : </span>{modalPublishYear}</div>
                 <div className="card-text"> <span style={{ fontWeight: "bold", marginLeft:'1em' }}> Page Count : </span>{modalPageCount}</div>
                 <div className="card-text"> <span style={{ fontWeight: "bold", marginLeft:'1em' }}> Average Rating : </span>{incomingRating}</div>.
                 <div className="card-text"> <span style={{ fontWeight: "bold", marginLeft:'1em' }}> Feedback : </span>{incomingFeedback}</div>.                 
                 <div className="card-text"> <span style={{ fontWeight: "bold", marginLeft:'1em'  }}>Rate this book:</span>
                   <input style={{marginLeft:'1em'}} name="thisBookRating"  value={1} onChange={()=>setThisBookRating(1)} type='radio' />1
                   <input style={{marginLeft:'1em'}} name="thisBookRating" value={2} onChange={()=>setThisBookRating(2)} type='radio' />2
                   <input style={{marginLeft:'1em'}} name="thisBookRating" value={3} onChange={()=>setThisBookRating(3)} type='radio' />3
                   <input style={{marginLeft:'1em'}} name="thisBookRating" value={4} onChange={()=>setThisBookRating(4)} type='radio' />4
                   <input style={{marginLeft:'1em'}} name="thisBookRating" value={5} onChange={()=>setThisBookRating(5)} type='radio' />5
                   </div>
                 <div className="card-text"> <label htmlFor="feedback"> <span style={{ fontWeight: "bold", marginLeft:'1em'  }}>Give Feedback:</span></label>
                 <input placeholder="Enter your feedback" id='feedback' type="text" value={getFeedback} onChange={e=> setGetFeedback(e.target.value)} />
                 </div>
                <div className="modal-footer">
                
                
                <br/>

                <button className="btn" onClick={favButtonHandler}>Add To Fav</button>

                <button onClick={submitReviewHandler} disabled={buttonDisableState} type="button" className="btn btn-danger">Submit review</button>
                  <button onClick={closeClick} type="button" className="btn btn-secondary" data-bs-dismiss="modal" >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookInner;

// <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
// <h5 className="modal-title" id="staticBackdropLabel">
// {modalTitle}
// </h5>
