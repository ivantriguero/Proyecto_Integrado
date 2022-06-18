import { useState } from "react";
import axios from "axios";

const test =() => {
    
    const [foto, setFoto]=useState(null)
    
    const [pathImage, setPathImage]=useState(null)

    const subirFoto=e=>{
      setFoto(e.target.files[0])

    }

    const insertarFoto=async()=>{
      const reader = new FileReader()
      reader.readAsDataURL(foto)
      reader.onload = function load() {
        setPathImage(reader.result)
      }
      
      const f = new FormData()
      f.append("file",foto)
      await axios.post("http://localhost:3000/api/upload", f, {headers: {'Content-Type': 'multipart/form-data'}})
      .then(response =>{
        console.log(response)
      }).catch(error=>{
        console.log(error)
      })
    }

    return (
      <div className="App px-5 py-5 border-2 border-gray-300 shadow-xl rounded-lg">
        <input type="file" name="foto" onChange={subirFoto} />
        <br />
        <button className="px-5 mt-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg" onClick={insertarFoto}>Upload</button>
        <img src={pathImage} width='500'/>

        <form method="post" action="http://localhost:3000/api/upload">
        <input type="file" name="foto"/>
        <br />
        <button className="px-5 mt-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">Upload</button>
        
        </form>
      </div>
    );
}

export default test