import React, { Component } from 'react'

class MiApi extends Component {

    state = {
        datos: [],
    };



    Mostrar = () => {
        fetch('http://localhost/Proyecto/api/index.php')
            .then(response => response.json())
            .then(datos => {
                this.setState({ datos });
                console.log(this.state.datos);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    render() {
        const { data } = this.state;
        if (!data) return <p>Loading...</p>
        return (
            <div>
                {this.Mostrar}
                {data.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id}>
                                    <td>{item.nombre}</td>
                                    <td>{item.apellido}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        )
    }
}
export default MiApi