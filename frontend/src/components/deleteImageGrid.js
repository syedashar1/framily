import React, { useEffect } from 'react';
import useFirestore from '../hooks/useFirestore';
import { motion } from 'framer-motion';
import Axios from 'axios';
import {MAX_LIMIT_NOT_REACHED, MAX_LIMIT_REACHED} from '../types/familyTypes'
import { useDispatch } from 'react-redux';
import { projectFirestore } from '../firebase/config';



const DeleteImage = ( ) => {



        const userInfo = localStorage.getItem('userInfo') ? 
        JSON.parse(localStorage.getItem('userInfo'))
        : null 

        const dispatch = useDispatch();


        const { docs } = useFirestore(`${userInfo._id}`);
        




        useEffect(() => {
                if( docs.length >= 6 ){
                        dispatch({ type: MAX_LIMIT_REACHED });
                }
                if( docs.length < 6 ){
                        dispatch({ type: MAX_LIMIT_NOT_REACHED });
                }
                if ( docs && docs.length !== 0){
                        Axios.put(`/api/users/addimages/${userInfo._id}`, {docs} );
                }
              }, [dispatch , docs ]);

        


        const deleteImageHandler = (x) => {

                
                const userInfo = localStorage.getItem('userInfo') ? 
                JSON.parse(localStorage.getItem('userInfo'))
                : null 

                if (window.confirm('Are you sure?')) {
                        const db = projectFirestore.collection(`${userInfo._id}`);
                        db.doc(x.id).delete();
                        Axios.put(`/api/users/imgdelete/${userInfo._id}` , {x} );

             
                }



        }

        


        

  return (
    <div className="img-grid">
      {docs && docs.map(doc => (
        <motion.div className="img-wrap" key={doc.id} 
          layout
          whileHover={{ opacity: 1 }}s
          onClick={() => deleteImageHandler(doc) }
        >
          <motion.img src={doc.url} alt="uploaded pic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
        </motion.div>
      ))}
    </div>
  )
}

export default DeleteImage;