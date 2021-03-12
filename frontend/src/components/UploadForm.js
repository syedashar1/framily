// import React, { Component } from 'react'
// import useStorage from '../hooks/useStorage'
// import ProgressBar from './ProgressBar';
// // import ProgressBar from './ProgressBar';


// export default class UploadForm extends Component {

//   constructor(){
//     super();
//     this.state = {
//       file : null ,
//       error : null
//     }
//   }

//   handleChange = (e) => {
//     const types = ['image/png', 'image/jpeg' , 'image/jpg'];

//     let selected = e.target.files[0];

//     if (selected && types.includes(selected.type)) {
//       this.setState({file : selected })
//       this.setState({error : '' })
//     } else {
//       this.setState({file : null })
//       this.setState({error : 'Please select an image file (png or jpg)' })

//     }
//   };

//   render() {

//   const {error , file } = this.state


//     return (
//       <div>

// <form>
//       <label>
//         <input type="file" onChange={this.handleChange} />
//         <span>+</span>
//       </label>
//       <div className="output">
//         { error && <div className="error">{ error }</div>}
//         { file && <div>{ file.name }</div> }
//         { file && <ProgressBar file={file}  /> }
//       </div>
//     </form>
        
//       </div>
//     )
//   }
// }





import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import CameraAltIcon from '@material-ui/icons/CameraAlt';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const types = ['image/png', 'image/jpeg'];

  const handleChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }
  };

  return (
    <form className='imgUpload' >
      <label className='imgUploadLabel' >
        <input type="file" className="filee" onChange={handleChange} ></input>
        <CameraAltIcon style={{fontSize:'50px'}}></CameraAltIcon>
      </label>
      <div className="output">
        { error && <div className="error">{ error }</div>}
        { file && <div>{ file.name }</div> }
        { file && <ProgressBar file={file} setFile={setFile} /> }
      </div>
    </form>
  );
}

export default UploadForm;