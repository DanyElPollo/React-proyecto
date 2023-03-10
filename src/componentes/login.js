import React, { Component } from 'react'
import Mostrar from './Mostrar.js';


class Login extends Component {
    state = {
        datos: {
            correo: "",
            cont: "",
        },
        login: false
    };

    inputs = (e) => {
        const { name, value } = e.target
        if (name === "login") {
            this.setState({
                ...this.state.login,
                [name]: false
            });
        } else {
            this.setState({
                datos: {
                    ...this.state.datos,
                    [name]: value
                }
            });
        }
    }

    enviar = (e) => {
        e.preventDefault();
        const { datos } = this.state;
        for (const key in datos) {
            if (datos[key] === "") {
                return alert("Debes rellenar todos los campos");
            }
        }
        fetch('http://localhost/Proyecto/api/index.php?login=true', {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(response => {
                if (response.status === "permitido") {
                    //console.log('Success:', JSON.stringify(response.data[0].nombre));
                    this.setState({
                        login: true
                    })
                    alert("Bienvenido " + response.data[0].nombre);
                } else {
                    console.log('Error:', JSON.stringify(response));
                    alert("Datos Incorrectos");
                }
                this.resetear();
            })
            .catch(error => {
                console.log("Prueba: ", error);
            });
    }

    resetear() {
        this.setState({
            datos: {
                correo: "",
                cont: ""
            }
        })
    }

    render() {
        return (
            <div >
                {!this.state.login &&
                    // ? <input type="submit" name="login" onChange={this.inputs} value={this.state.login} /> :
                    <form className='ingresar formularios' onSubmit={this.enviar}>
                        <label htmlFor="correo">Correo*
                            <input type="email" name="correo" onChange={this.inputs} value={this.state.datos.correo} />
                        </label>
                        <label htmlFor="pass">Contrase??a*
                            <input type="password" name="cont" onChange={this.inputs} value={this.state.datos.cont} />
                        </label>
                        <input type="submit" value="Ingresar" />
                    </form>
                }{this.state.login && <Mostrar />}
            </div>
        );
    }
}

export default Login
