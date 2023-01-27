import React, { Component } from "react";

class Mostrar extends Component {

    state = {
        datos: {
            nombre: "",
            apellido: "",
            correo: "",
            tipoDoc: "",
            numDoc: "",
            ciudad: "",
            edad: ""
        }
    }

    recibir = (e) => {
        try {
            e.preventDefault();
            const { datos } = this.state;
            fetch('http://localhost/Proyecto/api/index.php', {
                body: JSON.stringify(datos),
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(response => {
                    console.log(response.data[0]);
                    console.log('Mostrar: ', JSON.stringify(response.data[0].nombre));
                    this.setState({
                        datos: response
                    });
                }).catch(error => {
                    console.log(error);
                })
        } catch (e) {
            console.log(e);
        }
    }



    render() {
        const indices = Object.keys(this.state.datos);
        const datos = Object.values(this.state.datos);
        if (!datos) {
            return <div>Loading...</div>
        }
        return (
            <div >
                <input type="submit" onChange={this.recibir} value="Generar"></input>
                <table className="tablas">
                    <thead>
                        <tr>
                            {indices.map((dato) => <td key={dato}>{dato}</td>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {datos.map((dato, index) => <td key={index}>{dato}</td>)}
                            <td><input type="Submit" defaultValue="Eliminar"></input></td>
                        </tr>
                    </tbody>
                </table>
            </div >
        );
    }


}
export default Mostrar