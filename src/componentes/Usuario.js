import React, {Component} from 'react'

class Usuario extends Component {

    state = {
        cantidad: 0
    }

    /*::::: Funciones :::::*/
    mostrarUsuarios = () => {
        this.setState({
            cantidad: this.state.cantidad + 1
        })
    }

    agregar =()=> {
        this.setState({
            cantidad: this.state.cantidad + 1
        })
    }

    eliminar=()=> {
        this.setState({
            cantidad: this.state.cantidad !== 0 ? this.state.cantidad - 1 : 0
        })
    }

    limpiar=()=> {
        this.setState({
            cantidad: 0
        })
    }

    render() {
        return (
            <div>
                <h1>C.R.U.D</h1>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.state.cantidad}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <button onClick={this.agregar}>+</button>
                    <button onClick={this.eliminar}>-</button>
                    <button onClick={this.limpiar}>Limpiar</button>
                </div>
            </div>
        )
    }
}

export default Usuario