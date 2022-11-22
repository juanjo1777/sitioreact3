import { collection, getDocs, query, doc, deleteDoc, where, } from "firebase/firestore";
//import {getDoc, addDoc, updateDoc, setDoc, increment } from "firebase/firestore";
import React, { useEffect,useState } from 'react';
import firebase, { db } from './componente/firebase';
import AppForm from './componente/AppForm';

function App() {
  ///////////////////////////////////////////////////////////////
  ////////////////////READ - fnRead - Lectura a BD///////////////
  ///////////////////////////////////////////////////////////////
  const [idActual, setIdActual] = useState("");    //Crear Update  //usf
  const [docsBD, setDocsBD] = useState([]);        //Lectura a BD
  const [orden,setOrden] = useState(0);            //Para número - falla
  const i = 1;                                     //Para número - falla

  const fnRead = async () =>{

  }

  useEffect( () => {
    
  }, [idActual])

  ///////////////////////////////////////////////////////////////
  ////////////////////DELETE - fnDelete - Eliminar///////////////
  ///////////////////////////////////////////////////////////////
  const fnDelete = async (xId) => {

  }

  return (
    <div style={{width:"350px", background:"greenyellow", padding:"10px"}} >
      <h1>READ / DELETE</h1>
      <h1>sitiocopia1 (App.Js)</h1>
      <AppForm {...{idActual, setIdActual, fnRead}} />
      {
      /*  docsBD.map( (p) => 
        )*/
      }
    </div>
  );
}

export default App;