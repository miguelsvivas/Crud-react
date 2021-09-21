import React from 'react';

import {Link} from 'react-router-dom';

import Api from "../servicios/api";

class Editar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            datosCargados:false,
            empleado:[]
         }



    }

    cambioValor = (e) =>{
        const state=this.state.empleado;

        state[e.target.name]=e.target.value;
        this.setState({ empleado:state});

    }

    enviarDatos = (e) =>{

        e.preventDefault();
        console.log("Formulario enviado...");
        const{id,nombre,correo}=this.state.empleado;
        console.log(id);
        console.log(nombre);
        console.log(correo);

        var datosEnviar={id:id,nombre:nombre,correo:correo};

        fetch(Api+"?actualizar=1",{

            method:"POST",
            body:JSON.stringify(datosEnviar)

        })
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            
            console.log(datosRespuesta);
            this.props.history.push("/");
            })
        .catch(console.log)


    }

    
    componentDidMount(){

        console.log(this.props.match.params.id);

        fetch(Api+"?consultar="+this.props.match.params.id)
        .then(respuesta=>respuesta.json())
        .then((datosRespuesta)=>{
            
            console.log("=>"+datosRespuesta);
            this.setState({ datosCargados:true,
                empleado:datosRespuesta[0]
            })

            })
        .catch(console.log)

    }

    render() { 

        const{datosCargados, empleado}=this.state

        if(!datosCargados){ return(<div>Cargando...</div>);}
        else{


        return ( 
            <div class="card">
                <div class="card-header">
                    Editar empleados
                </div>
                <div class="card-body">
                   
            

                    <form onSubmit={this.enviarDatos}>
                   

                    <div class="form-group">
                      <label htmlFor="">Clave</label>
                      <input type="text" readOnly class="form-control" onChange={this.cambioValor}  value={empleado.id} name="" id="" aria-describedby="helpId" placeholder=""/>
                      <small id="helpId" class="form-text text-muted">Clave</small>
                    </div>



    <div class="form-group">
  <label htmlFor="">Nombre</label>
  <input required type="text" name="nombre" onChange={this.cambioValor} id="nombre" value={empleado.nombre} class="form-control" placeholder="" aria-describedby="helpId"/>
  <small id="helpId" class="text-muted">Escribe el nombre del empleado</small>

    </div>

    <div class="form-group">
  <label htmlFor="">Correo:</label>
  <input required type="text" name="correo" onChange={this.cambioValor}  id="correo" value={empleado.correo}   class="form-control" placeholder="" aria-describedby="helpId"/>
  <small id="helpId" class="text-muted">Escribe el correo del empleado</small>

    </div>

    <br></br>

    <div class="btn-group" role="group" aria-label="">
    <button type="submit" class="btn btn-success">Actualizar datos de  empleado</button>
    <Link to={"/"} type="button" class="btn btn-primary">Cancelar</Link>

    </div>


    </form>

                </div>
                <div class="card-footer text-muted">
                 
                </div>
            </div>
         );
        }
    }
}
 
export default Editar;