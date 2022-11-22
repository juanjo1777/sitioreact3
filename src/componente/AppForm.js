import {collection, doc, getDoc, addDoc, updateDoc} from "firebase/firestore";
//import {getDocs, query, setDoc, where, deleteDoc} from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import firebase, { db } from './firebase';
import { async } from '@firebase/util';

const AppForm = (props) => {
    ///////////////////////////////////////////////////////////////
    ////////////////////CREAR - fnCrear - Guardar//////////////////
    ///////////////////////////////////////////////////////////////
    const camposRegistro = {nombre:"", edad:"", genero:""};   //estructura tbL
    const [objeto, setObjeto] = useState(camposRegistro);     //Tabla u objeto

    const hanleStatuschange = (e) => {                        //Manejo cambios en input...
        const {name, value} = e.target;                       //Capta lo que se escribe
        setObjeto({...objeto, [name]:value });                //Asigna al objeto name y value
        //console.log(objeto);                                //Ver en tiempo real
    }

    const handleSubmit = async (e) => {                       //Manejo submit (emvio)
        e.preventDefault();                                   //evitar por defecto (false)
        //////////REGISTRAR////////////////////////////////////////
        if(props.idActual === ""){
            //console.log(props.idActual);                    //Verificar idActual
            if(validarForm()){                                //Verificar
                addDoc(collection(db, 'persona'), objeto);    //CREAR
                console.log('Se guardo...');                  //Msj
                props.fnRead();                               //Actualizar LECTURA BD
            }else{
                console.log('No se guardo...');
            }
        }else{

        }
        setObjeto(camposRegistro);                             //Limpiar objeto
    }
    /////////////////////////////VALIDACIÓN////////////////////////
    const validarForm = () => {
        if(objeto.nombre===""|| /^\s+$/.test(objeto.nombre)){
            alert("Escriba nombres...");
            return false;                                     //Si no tiene texto
        }
        return true;                                          //Si tiene texto
    };
    ///////////////////////////////////////////////////////////////
    ////////////////////UPDATE - fnUpdate - Actualizar/////////////
    ///////////////////////////////////////////////////////////////
    //console.log("props.idActual", props.idActual);
    useEffect(() => {

    },[props.idActual]);

    const obtenerDastosPorId = async (xId) =>{
        
    }
    //console.log(objeto);

    return (
        <div style={{background:"orange", padding:"10px", textAlign:"center"}}>
        <h1>AppForm.js</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" name="nombre" placeholder="Nombres..."
            onChange={hanleStatuschange} value={objeto.nombre} /> <br/>

            <input type="text" name="edad" placeholder="Edad..."
            onChange={hanleStatuschange} value={objeto.edad} /> <br/>

            <input type="text" name="genero" placeholder="Género..."
            onChange={hanleStatuschange} value={objeto.genero} /> <br/>

            <button>
                {props.idActual === ""? "Guardar" : "Actualizar"}
            </button>
        </form>
        </div>
    )
}

export default AppForm;