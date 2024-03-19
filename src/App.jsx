// import { useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar'
// import Body from './Components/Body'
import ContextProvider from './Context/ContextProvider'
import RecommendForm from './Components/RecommendForm'
import React from 'react'
import FilterBar from './Components/FilterBar'
import { BrowserRouter } from 'react-router-dom'
// import ErrorBoundary from './Component/ErrorBoundary'
import ErrorBoundaries from './Components/ErrorBoundaries'

const LazyBodyLoading = React.lazy(()=> import('./Components/Body'))

function App() {

  // <div ><h1>Books</h1></div>
  // <Body/>
  return (
    // <ErrorBoundaries>
    // </ErrorBoundaries>

    <>
    
    <BrowserRouter>
    <ContextProvider>
    <Navbar/>
    <FilterBar/>
    <React.Suspense fallback={<div>
      <h2>Loading Please Wait...</h2></div>}>
      <LazyBodyLoading/>
      </React.Suspense>
      <RecommendForm/>
      </ContextProvider>
      </BrowserRouter>
      </>
      
      )
}

export default App
