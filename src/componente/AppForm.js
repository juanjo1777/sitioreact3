import {collection, doc, getDoc, addDoc, updateDoc} from "firebase/firestore";
//import {getDocs, query, setDoc, where, deleteDoc} from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import firebase, { db } from './firebase';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { async } from '@firebase/util';

const AppForm = (props) => {
    ///////////////////////////////////////////////////////////////
    ////////////////////CREAR - fnCrear - Guardar//////////////////
    ///////////////////////////////////////////////////////////////
    const camposRegistro = {url:"", nombre:"", descripcion:"",};   //estructura tbL
    const [objeto, setObjeto] = useState(camposRegistro);     //Tabla u objeto

    const handleStatusChange = (e) => {                        //Manejo cambios en input...
        const {name, value} = e.target;                       //Capta lo que se escribe
        setObjeto({...objeto, [name]:value });                //Asigna al objeto name y value
        //console.log(objeto);                                //Ver en tiempo real
    }

    const handleSubmit = async (e) => {  
        try{                     //Manejo submit (emvio)
        e.preventDefault();                                   //evitar por defecto (false)
        ////////// REGISTRAR O ACTUALIZAR ////////////////////
        if(props.idActual === ""){
            //console.log(props.idActual);                    //Verificar idActual
            if(validarForm()){                                //Verificar
                addDoc(collection(db, 'favoritos'), objeto);    //CREAR
                console.log('Se guardo...');                  //Msj
                props.fnRead();                               //Actualizar LECTURA BD
            }else{
                console.log('No se guardo...');
            }
        }else{
            ////////////////ACTUALIZAR/////////////////////////
            //console.log(objeto);
            //console.log('ACTUALIZAR REGISTRO...'+props.idActual);
            await updateDoc(doc(collection(db, "favoritos"), props.idActual), objeto);
            //console.log("Se actualizó...");
            toast("Se ACTUALIZO con exito...", {
                type:'info',
                autoClose: 2000
            })
            //props.fnRead();
            props.setIdActual('');
        }
        setObjeto(camposRegistro);                             //Limpiar objeto
        } catch (error) {
            console.log("Error en CREAR O UPDATE: ", error);
        }
    }
    /////////////////////////////VALIDACIÓN////////////////////////
    const validarForm = () => {
        if(objeto.url===""|| /^\s+$/.test(objeto.url)){
            alert("Escriba url...");
            return false;                                     //Si no tiene texto
        }
        return true;                                          //Si tiene texto
    };
    ///////////////////////////////////////////////////////////////
    ////////////////////UPDATE - fnUpdate - Actualizar/////////////
    ///////////////////////////////////////////////////////////////
    //console.log("props.idActual", props.idActual);
    useEffect(() => {
        if( props.idActual ===""){
            setObjeto({...camposRegistro});
        }else{
            obtenerDastosPorId(props.idActual);
        }
    }, [props.idActual]);

    const obtenerDastosPorId = async (xId) =>{
        //console.log("xId ", xId);
        const objPorId = doc(db, "favoritos", xId);
        const docPorId = await getDoc(objPorId);
        if (docPorId.exists()) {
            //console.log("Datos de doc... ", docPorId.data());
            setObjeto(docPorId.data());
        }else {
            console.log("No hay doc... ");
        }
    }
    //console.log(objeto);

    return (
        <div>
        <form className="card card-body" onSubmit={handleSubmit}>
            <button className="btn btn-primary btn-block"> 
                Formulario (AppForm.js)
            </button>
            <div className="form-group input-group">
                <div className="input-group-text bd-light">
                    <i className="material-icons">insert_link</i>
                    
                </div>
                <input type="text" className="form-control" name="url" placeholder="URL..."
                    onChange={handleStatusChange} value={objeto.url} />
            </div>
            <div className="form-group input-group clearfix">
                <div className="input-group-text bd-light ">
                    <i className="material-icons">group_add</i>
                    
                </div>
                <input type="text" className="form-control float-start" name="nombre" placeholder="Nombre..."
                    onChange={handleStatusChange} value={objeto.nombre} />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bd-light">
                    <i className="material-icons">star_half</i>
                    
                </div>
                <input type="text" className="form-control" name="descripcion" placeholder="Descripción..."
                    onChange={handleStatusChange} value={objeto.descripcion} />
            </div>
            <button className="btn btn-primary btn-block"> 
                {props.idActual === ""? "Guardar" : "Actualizar"} 
            </button>
        </form>
        </div>
    )
}

export default AppForm;