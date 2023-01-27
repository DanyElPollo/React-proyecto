import React, { Component } from "react";

class Mostrar extends Component {

    recibir = (e) => {

    }

    state = {
        datos: {
            nombre: "",
            apellido: "",
            correo: "",
            tipoDoc: "...",
            numDoc: "",
            ciudad: "",
            edad: ""
        }
    }

    render() {
        const indices = Object.keys(this.state.datos);
        const datos = Object.values(this.state.datos);
        return (
            < div >
                <table className="tablas">
                    <thead>
                        <tr>
                            {indices.map((indice) => <th key={indice}>{indice}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {datos.map((dato) => <td key={dato}>{dato}</td>)}
                            <td><input type="Submit" value="Eliminar"></input></td>
                        </tr>
                    </tbody>
                </table>
            </div >
        );
    }


}
export default Mostrar