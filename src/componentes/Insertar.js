import React, { Component } from 'react'


class Insertar extends Component {
    state = {
        datos: {
            nombre: "",
            apellido: "",
            correo: "",
            cont: "",
            tipoDoc: "...",
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
            if (datos[key] === "" || datos[key] === "...") {
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
                console.log('Success:', JSON.stringify(response));
                alert("Creado con exito");
                this.resetear();
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    }

    resetear() {
        this.setState({
            datos: {
                nombre: "",
                apellido: "",
                correo: "",
                cont: "",
                tipoDoc: "...",
                numDoc: "",
                ciudad: "",
                edad: ""
            }
        })
    }

    render() {
        return (
            <div className='insert formularios' >
                <form id='registro' onSubmit={this.enviar}>
                    <label htmlFor="nombre">Nombre*
                        <input type="text" name="nombre" onChange={this.inputs} value={this.state.datos.nombre} />
                    </label>
                    <label htmlFor="apellido">Apellido*
                        <input type="text" name="apellido" onChange={this.inputs} value={this.state.datos.apellido} />
                    </label>
                    <label htmlFor="correo">Correo*
                        <input type="email" name="correo" onChange={this.inputs} value={this.state.datos.correo} />
                    </label>
                    <label htmlFor="pass">Contraseña*
                        <input type="text" name="cont" onChange={this.inputs} value={this.state.datos.cont} />
                    </label>
                    <label>Tipo de documento:
                        <select name='tipoDoc' onChange={this.inputs} value={this.state.datos.tipoDoc}>
                            <option value='...' >...</option>
                            <option value='Cedula de ciudadania' >Cedula de ciudadania</option>
                            <option value='Tarjeta de identidad' >Tarjeta de identidad</option>
                            <option value='Otro' >Otro</option>
                        </select>
                    </label>
                    <label>Número de documento:
                        <input type="text" name="numDoc" onChange={this.inputs} value={this.state.datos.numDoc} />
                    </label>
                    <label>Ciudad:
                        <input type="text" name="ciudad" onChange={this.inputs} value={this.state.datos.ciudad} />
                    </label>
                    <label>Edad:
                        <input type="text" name="edad" onChange={this.inputs} value={this.state.datos.edad} />
                    </label>
                    <input type="submit" value="Registrar" />
                </form>
            </div>
        );
    }
}

export default Insertar
