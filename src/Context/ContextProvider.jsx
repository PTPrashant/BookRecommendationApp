import AppContext from './Context'
import { useEffect, useState } from 'react';

const ContextProvider = ({children}) => {

  const [savedList, setSavedList] = useState(getSavedList());
  const [userRatingObject, setUserRatingObject] = useState({})
  const [feedback, setFeedback] = useState({})


  const [ favoriteList, setFavoriteList] = useState({})

 const [genre, setGenre] = useState('war');

 function getFavoriteList(){
  let tempFavoriteList = JSON.parse(localStorage.getItem('myFavList'))
  if(tempFavoriteList) setFavoriteList(tempFavoriteList)
 }


  function getSavedList() {
    let listGot = JSON.parse(localStorage.getItem("savedList"));

    if (listGot) return listGot;
    else return [];
  }

  function getUserRatingObject(){
    let userRatingObjectGot = JSON.parse(localStorage.getItem("userRatingObjectLocalList"));
    if (userRatingObjectGot) setUserRatingObject(userRatingObjectGot);
  }

  function gettingFeedback(){
    let feedbackGot = JSON.parse(localStorage.getItem("feedbackSavedList"));
    if (feedbackGot) setFeedback(feedbackGot);
  }
  

  useEffect(() =>{getSavedList(), getUserRatingObject(), gettingFeedback(), getFavoriteList()}, [])

  useEffect(()=>{},[genre])


  return (
    <div>
    <AppContext.Provider value={{savedList, setSavedList ,
       userRatingObject , setUserRatingObject,
       genre, setGenre ,
       feedback, setFeedback,
       favoriteList, setFavoriteList
       }}>
    {children}
    
    </AppContext.Provider>
      
    </div>
  )
}

export default ContextProvider
