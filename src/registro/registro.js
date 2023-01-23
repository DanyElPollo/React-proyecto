import React, { Component } from "react";

class registro extends Component{
    render(){
        return (
            <div form="GET">
                <label for="nombre">Nombre*</label><br/>
                <input type="text" name="nombre"></input><br/>
                <button>Registrar</button>
            </div>
        );
    }
    
}
export  default registro;
