import React, { Component } from "react";

class Mostrar extends Component {

    state = {
        datos: []
    }

    recibir = (e) => {
        try {
            e.preventDefault();
            fetch('http://localhost/Proyecto/api/index.php', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(response => {
                    this.setState({
                        datos: response
                    });
                }).catch(error => {
                    console.log("Super error:  ", error);
                })
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const datos = this.state.datos;
        if (!datos) {
            return <div>No se cargaron los datos...</div>
        }
        return (
            <div >
                <table className="tablas" onClick={this.recibir}>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Tipo Documento</th>
                            <th>Numero Documento</th>
                            <th>Ciudad</th>
                            <th>Edad</th>
                            <th>Id</th>
                            <td><input type="Submit" defaultValue="Cargar"></input></td>
                        </tr>
                    </thead>
                    <tbody>
                        {datos.map((dato, index) =>
                            <tr key={index}>
                                <td>{dato.nombre}</td>
                                <td>{dato.apellido}</td>
                                <td>{dato.correo}</td>
                                <td>{dato.tipodoc}</td>
                                <td>{dato.numdoc}</td>
                                <td>{dato.ciudad}</td>
                                <td>{dato.edad}</td>
                                <td>{dato.id}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div >
        );
    }


}
export default Mostrar