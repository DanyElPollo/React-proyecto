import React from 'react'
import ReactDom from 'react-dom'
import App from './App.js'

// /*::::: Diferencia entre componentes y elementos: :::::*/
// /*
// *
// * Un componente puede ser modificado y adaptado a tus necesidades mientras un elemento no.
// *
// */


// //con las llaves puedo inyectar elementos, example
// const name = 'Daniel Arenas Morales';
// //const App = <h1>Hola desde React... {name}</h1>;
// /*::::: Dentro de las llaves de puede insertar expresiones normales de JS :::::*/

// /*::::: Otros ejemplo de como se realiza el uso de las llave seria el siguiente :::::*/
// /*::::: OBJETO :::::*/
// const persona = {
//     nombre: "Daniel Arenas Morales",
//     edad: 20,
//     nacionalidad: "Colombia"
// }


// //elemento
// const explicacion = <p>Mi nombre es <strong>{persona.nombre}</strong> tengo {persona.edad} años y soy de {persona.nacionalidad}</p>

// //ReactDom.render(App, document.getElementById('root'));
// const MostrarPersonas = (props) => (
//     <div>
//         <p>
//             Él se llama {props.nombre}, tiene {props.edad} vive en {props.naciona}
//         </p>
//     </div>
// )


// /*::::: Un componente se crea de la sgt manera :::::*/
// const MiPrimerComponente = (props) => {//el nombre siempre va a iniciar en mayuscula
//     /*:::::  Solo puede retornar un nodo y este tendra todo lo necesario para trabajar :::::*/
//     return (
//         <div>
//             {explicacion}
//             <p>
//                 me encuentro feliz en la ciudad de {props.ciudad},
//                 departamento de {props.depart}
//             </p>
//         </div>
//     )
//     //cuando se manejan muchos elementos en le return, se suele utilizar () para asi, poder realizar una buena identación
// }

//También se puede usar un componente dentro de otros
//para usarlo, hay que llamarlo como si fuera una etiqueta más 
// const App = () => (
//     <div>
//         {/* <MiPrimerComponente ciudad='Cartagena' depart='Bolivar' />
//         <MostrarPersonas nombre={'Pepé'} edad = {12} naciona = {persona.nacionalidad}/> */}
//         <Usuario name = 'Daniel'/>
//     </div>
// )
//las props son de solo lectura

/*::::: Existen las props y es la forma para volver los componentes dinamicos :::::*/
//para poder Renderizar componentes funcionales hay que llamarlo también como una etiqueta
//a las props cuando son strings se pueden pasar de manera normal, pero cuando son valores numericos o objetos se deben usar {}
ReactDom.render(<App />, document.getElementById('root'));//esto es un elemento