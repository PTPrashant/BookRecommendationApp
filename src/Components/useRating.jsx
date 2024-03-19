import { useContext } from "react";
import AppContext from "../Context/Context";


export default function useRating(inputID, inputValue){
    const {userRatingObject} = useContext(AppContext)
    console.log(inputID + ": " + inputValue)

    if(inputValue == null) return 0
    else if(userRatingObject){

            
            let sumRating = userRatingObject[inputID].reduce((acc, itr)=> {
                return acc + itr
            })
            
            let calculatedRating =( sumRating/ userRatingObject[inputID].length ).toFixed(2)
            
            
            
            
            return (calculatedRating)
        }
        else return 0
    
}

