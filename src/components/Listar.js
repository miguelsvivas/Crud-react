import React from 'react';

import {Link } from "react-router-dom";
import Api from "../servicios/api";

class Listar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { datosCargados:false,
        empleados:[] 
    }
    }

    borrarRegistros = (id)=>{
        console.log(id);


        fetch(Api+"?borrar="+id)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            
            console.log(datosRespuesta);
            this.cargarDatos();
            })
        .catch(console.log)
    }




    cargarDatos(){
        fetch(Api)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            
            console.log(datosRespuesta);
            this.setState({ datosCargados:true,empleados:datosRespuesta})

            })
        .catch(console.log)
    }

    componentDidMount(){

        this.cargarDatos();


    }

    render() { 

        const{datosCargados, empleados}=this.state

        if(!datosCargados){ return(<div>Cargando...</div>);}
        else{

       


        //mostrar contenido
        return (
            
            <div class="card">
                <div class="card-header">
                <Link class="btn btn-primary" to={"/crear"}>Crear nuevo empleado</Link>
                </div>
                <div class="card-body">
                    <h4> Lista de empleados</h4>

                    <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>nombre</th>
                    <th>Correo</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    empleados.map(
                        (empleado)=>(
                            <tr key={empleado.id}>
                            <td >{empleado.id}</td>
                            <td>{empleado.nombre}</td>
                            <td>{empleado.correo}</td>
                            <td>
                                <div class="btn-group" role="group" aria-label="">
                                    <Link class="btn btn-primary" to={"/editar/"+empleado.id}>
                                        Editar</Link>



                                    <button type="button" class="btn btn-danger"
                                    onClick={()=>this.borrarRegistros(empleado.id)}
                                    >Borrar</button>

                                </div>
                            </td>
                        </tr>
                        )
                    )
                }

            </tbody>
        </table>

                    
                </div>
                <div class="card-footer text-muted">
                </div>
            </div>
            
            );
        }
    }
}
 


export default Listar;