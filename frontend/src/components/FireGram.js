import React, { Component, useState } from 'react'
import { useSelector } from 'react-redux';
import ImageGrid from './ImageGrid';
import Modal from './Modal';
import UploadForm from './UploadForm';
import './ImageUpload.css'


function App() {
        const [selectedImg, setSelectedImg] = useState(null);


        const LimitCheck = useSelector((state) => state.LimitCheck);
        const { limit } = LimitCheck;

        

      
        return (
          <div className="App">
            {!limit ? <UploadForm /> : 
            <div style={{height:"80px"}} ></div>
                
            }
            <ImageGrid setSelectedImg={setSelectedImg} />
            { selectedImg && (
              <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
            )}
          </div>
        );
}
      
      export default App;
