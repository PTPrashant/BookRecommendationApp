import React, { useContext, useState, useEffect } from 'react'
import AppContext from '../Context/Context';

function FilterBar() {
  const [author, setAuthor] = useState('')
  const [book,setBook] =useState('')

  const totalCategories = [
        "war",
        "flower",
        "crime",
        "hate",
        "love",
        "thriller",
        "thrill",
        "sports",
        "cricket",
        "hockey",
        "football",
        "journey",
      ];

  const {genre, setGenre} = useContext(AppContext)
  const [bookCategory, setBookCategory] = useState(genre);


  function searchAuthor(){
    if(author){

      setGenre(author);
      setAuthor('')
    }
    if(book){
      setGenre(book)
      setBook('')
    }
  }

  useEffect(() => {
        setGenre(bookCategory)
   }, [bookCategory]);

  // useEffect(()=>{},[genre])

  return (
    <div className='filter-bar text-light'>

    <div className='dropdown-item' style={{ display: "flex" }} className="container">
    <h5>Choose Category</h5>
    <select onChange={(e) => setBookCategory(e.target.value)}>
      {totalCategories.map((category, index) => (
        <option  key={index} value={category}>
          {category}
        </option>
      ))}
    </select>

    <label className='mx-2' htmlFor='author'>Enter author name:</label>
    <input value={author} placeholder='Enter author name'  onChange={e=> setAuthor(e.target.value)} type='text' id='author' />

    <label className='mx-2' htmlFor='book'>Enter Book name:</label>
    <input value={book} placeholder='Enter book name' onChange={e=> setBook(e.target.value)} type='text' id='book' />
    <button className='btn btn-success' onClick={searchAuthor} >Search</button>
  </div>
    
      
    </div>
  )
}

export default FilterBar
