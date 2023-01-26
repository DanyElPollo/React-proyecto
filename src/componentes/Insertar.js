import React, { Component } from 'react'

class Insertar extends Component {
    state = {
        datos: {
            nombre: "",
            apellido: "",
            correo: "",
            cont: "",
            tipoDoc: "",
            numDoc: "",
            ciudad: "",
            edad: ""
        }
    };

    inputs = (e) => {
        const { name, value } = e.target
        this.setState({
            datos: {
                ...this.state.datos,
                [name]: value
            }
        });
    }

    enviar = (e) => {
        e.preventDefault();
        const { datos } = this.state;
        for (const key in datos) {
            if (datos[key] === "") {;
                return alert("Debes rellenar todos los campos");
            }
        }
        fetch('http://localhost/Proyecto/api/index.php', {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(response => {
                console.log('Success:', JSON.stringify(response))
                console.log("datos: ", JSON.stringify(datos));
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    }




    render() {
        return (
            <div>
                <form onSubmit={this.enviar}>
                    <label htmlFor="nombre">Nombre*
                        <input type="text" name="nombre" onChange={this.inputs} />
                    </label><br />
                    <label htmlFor="apellido">Apellido*
                        <input type="text" name="apellido" onChange={this.inputs} />
                    </label><br />
                    <label htmlFor="correo">Correo*
                        <input type="email" name="correo" onChange={this.inputs} />
                    </label><br />
                    <label htmlFor="pass">Contraseña*
                        <input type="text" name="cont" onChange={this.inputs} />
                    </label><br />
                    <label>Tipo de documento:
                        <select name='tipoDoc' onChange={this.inputs} value={this.state.datos.tipodoc}>
                            <option value='Cedula de ciudadania' >Cedula de ciudadania</option>
                            <option value='Tarjeta de identidad' >Tarjeta de identidad</option>
                            <option value='Otro' >Otro</option>
                            <option value='...' >...</option>
                        </select>
                    </label><br />
                    <label>Número de documento:
                        <input type="text" name="numDoc" onChange={this.inputs} />
                    </label><br />
                    <label>Ciudad:
                        <input type="text" name="ciudad" onChange={this.inputs} />
                    </label><br />
                    <label>Edad:
                        <input type="text" name="edad" onChange={this.inputs} />
                    </label><br />
                    <input type="submit" value="Enviar" />
                </form>
            </div>
        );
    }
}

export default Insertar
