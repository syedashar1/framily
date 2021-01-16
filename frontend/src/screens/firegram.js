import React, { Component, useState } from 'react'
import ImageGrid from '../components/ImageGrid'
import Modal from '../components/Modal';
import UploadForm from '../components/UploadForm'


function App() {
        const [selectedImg, setSelectedImg] = useState(null);
      
        return (
          <div className="App">
            <UploadForm />
            <ImageGrid setSelectedImg={setSelectedImg} />
            { selectedImg && (
              <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
            )}
          </div>
        );
      }
      
      export default App;
