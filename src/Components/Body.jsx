import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import BookInner from "./BookInner";
import AppContext from "../Context/Context";
import useRating from "./useRating";


function Body() {
  const [books, setBooks] = React.useState([]);
  // const [bookRating, setBookRating] = useState('not rated yet');

  const [modalTitle , setModalTitle] =useState()
  const [modalCategory, setModalCategory] = useState()
  const [modalAuthors, setModalAuthors] = useState()
  const [modalThumbnail, setModalThumbnail] = useState()
  const [modalPublishYear, setModalPublishYear] = useState()
  const [modalPageCount, setModalPageCount] = useState()
  const [modalBookID, setModalBookID] = useState(null)
  const [sendThisRating, setSendThisRating] = useState()
  const [buttonDisable, setButtonDisable] = useState()
  const [sendFeedback, setSendFeedback] = useState()
  const [feedbackEmpty, setFeedbackEmpty] = useState()



  const {genre , userRatingObject, feedback, setFeedback} = useContext(AppContext)

  const url = `https://www.googleapis.com/books/v1/volumes?q=${genre}&filter=free-ebooks&key=AIzaSyBK49hUvDc1O36c9hCmLK_cdd6wf0baniE`;

  


  async function getBooks() {
    const response = await axios.get(url);
    setBooks(response.data.items);
  }
  
  //for initial render
  useEffect(() => {

    getBooks();
  }, []);


  // for conditional render 
  useEffect(()=>{ getBooks()},[genre])
  useEffect(()=>{},[userRatingObject])



  // for providing selected modal data
  function infoFunction(thisTitle, thisCategory, thisAuthors, publishedDate, pageCount, thumbnail ,bookID, disableState , empty) {
    setModalTitle(thisTitle);
    setModalCategory(thisCategory);
    setModalAuthors(thisAuthors);
    setModalThumbnail(thumbnail);
    setModalPublishYear(publishedDate);
    setModalPageCount(pageCount);
    setModalBookID(bookID)
    setButtonDisable(disableState)
    setFeedbackEmpty(empty)

    

   let thisRatingObject = JSON.parse(localStorage.getItem("userRatingObjectLocalList"));
   if(thisRatingObject){
    if(thisRatingObject.hasOwnProperty(bookID)){
      let sumRating = thisRatingObject[bookID].reduce((acc, itr) => { 
        return acc + itr;})
      let avgRating = (sumRating /thisRatingObject[bookID].length).toFixed(2);
      setSendThisRating(avgRating);
      }
    else setSendThisRating('not yet rated');
   }

   let thisFeedback = JSON.parse(localStorage.getItem("feedbackSavedList"));
   if(thisFeedback){
    if(thisFeedback.hasOwnProperty(bookID)){
      setSendFeedback(thisFeedback[bookID]);

      }
    else setSendFeedback('no feedback till now');
   }




  }


  return (
    <>
  

      <div id='body' className="body">
        <div className="container">
          <div className="row">
            {books &&
              books.map((book) => {
                const thisCategory = book.volumeInfo.categories;
                const thisAuthors = book.volumeInfo.authors;
                const thisTitle = book.volumeInfo.title;
                const publishedDate = book.volumeInfo.publishedDate;
                const pageCount = book.volumeInfo.pageCount;
                const thumbnail = book.volumeInfo.imageLinks.thumbnail;
                const bookID = book.id;
                // const thisAvgRating ='not yet rated'
                const disableState = false
                const empty = ''

                return (
                  <div className="col-md-4 my-2 " key={book.id}>
                    <BookInner
                      thumbnail={thumbnail}
                      title={thisTitle}
                      categories={thisCategory}
                      authors={thisAuthors}
                      infoClick={() => infoFunction(thisTitle, thisCategory, thisAuthors, publishedDate, pageCount,thumbnail, bookID, disableState ,empty )}
                      publishedDate={publishedDate}
                      pageCount={pageCount}

                      modalTitle={modalTitle}
                      modalCategory={modalCategory}
                      modalAuthors={modalAuthors}
                      modalThumbnail={modalThumbnail}
                      modalPublishYear={modalPublishYear}
                      modalPageCount={modalPageCount}
                      modalBookID={modalBookID}
                      // modalBookRating ={bookRating}
                      incomingRating ={sendThisRating}
                      buttonDisable={buttonDisable}
                      incomingFeedback = {sendFeedback}
                      setFeedbackEmpty = {setFeedbackEmpty}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Body;
