import React from 'react'
import { useState } from 'react'

const Fileupload = () => {
    const [file, setFile] = useState();
    const [choosefile,setChoosefile]=useState(false);
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
        setChoosefile(!choosefile);
    }
  
    return (
          <>
            {!choosefile?
                (
            <input type="file" onChange={handleChange} />):(
            <img src={file} />
            )
           
            }
            </>
  
       
  
    );
}

export default Fileupload