import * as React from 'react';
import './App.css'
import NavBar from './component/NavBar'
import ImageUpload from './component/ImageUpload';


function App() {


  return (
    <>

      <div>
        <NavBar />
      </div>
      <br />
       <div>
        <ImageUpload />
      </div>
    </>
  )
}

export default App
