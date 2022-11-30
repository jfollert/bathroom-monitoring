import React from "react";
import axios from "axios";
import { Table, Button, Container, ModalFooter, Modal, ModalHeader, ModalBody, FormGroup } from "reactstrap";

import { useNavigate } from "react-router-dom";

function Home() {
    return (

            
      <>
        <br />
        <br />
        <div className="mb-4 align-middle" style={{ display: 'flex', justifyContent: 'center' }}>
          <Button color="primary">Crear baño</ Button>{" "}
        </div>

        <Container>
          <div className="mb-4 align-middle" style={{ display: 'flex', flexDirection: 'row'}}>
            <select  className="searchtoolx">
              <option value="none"></option>
              <option value="nombre">Nombre</option>
              <option value="lugar">Lugar</option>
              <option value="fecha">Fecha</option>
              <option value="impacto">Impacto</option>
            </select>
            <input type="text" placeholder="Search..." className="search" size="35"  />
          </div>
          <Table>
            <thead>
              <tr>
                <th>Estado</th>
                <th>Edificio</th>
                <th>id</th>
                <th>Fecha</th>
                <th>Impacto</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              
                <tr >
                  <td>"🟢"</td>
                  <td>edificio</td>
                  <td>id</td>
                  <td>fecha</td>
                  <td>dato</td>
                  <td>
                    <Button
                      color="primary"
                    >
                      Ver
                    </ Button>{" "}
                  </td>
                </tr>

            </tbody>
          </Table> 
        </Container>
      </>

    );
}
export default Home;


// const url = "https://dataup-api.herokuapp.com/events"

// const withRouter = (Component) => {
//   const Wrapper = (props) => {
//     const navigate = useNavigate();

//     return (
//       <Component
//         navigate={navigate}
//         {...props}
//       />
//     );
//   };

//   return Wrapper;
// };

// class Event extends React.Component {

//   state = {
//     input: [],
//     rialdata: [],
//     data: [],
//     modalActualizar: false,
//     modalInsertar: false,
//     form: {
//       //id: "",
//       Concierto: "",
//       Lugar: "",
//       Fecha: "",
//       Impacto: "",
//       filter_data: "",
//     },
//   };

//   peticioneGet = () => {
//     axios.get(url).then(response => {
//       response.data = response.data.map((obj) => {
//         obj.fecha = new Date(obj.fecha);
//         obj.fecha = obj.fecha.toLocaleDateString();
//         return obj;
//       });
//       this.setState({ data: response.data });
//       this.setState({ rialdata: response.data });
//     })
//   };

//   componentDidMount = () => {
//     this.peticioneGet();
//   };

//   /*
//   insertar= ()=>{
//     var lista= this.state.data;
//     var lista2 = lista.filter((item)=>keys.some((key)=> item[key].toLowerCase().includes()))
//     lista.reverse();
//     this.setState({ modalInsertar: false, data: lista });
//   };
//   */

//   mostrarModalInsertar = () => {
//     this.setState({
//       modalInsertar: true,
//     });
//   };

//   cerrarModalInsertar = () => {
//     this.setState({ modalInsertar: false });
//   };

//   insertar = () => {
//     var valorNuevo = { ...this.state.form };
//     if (valorNuevo.Concierto === "" || valorNuevo.Fecha === "" || valorNuevo.Lugar === "") {
//       alert("Debe rellenar todos los campos")
//       console.log("Valor Vacio");
//       return 0;
//     }

//     console.log(valorNuevo)
//     var data = {
//       nombre: valorNuevo.Concierto,
//       fecha: valorNuevo.Fecha,
//       lugar: valorNuevo.Lugar
//     }
//     fetch("https://dataup-api.herokuapp.com/events", {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }).then(res => res.json())
//       .catch(error => console.error('Error:', error))
//       .then(response => console.log('Success:', response));
//     this.setState({ modalInsertar: false });
//   }

//   handleChange = (e) => {
//     this.setState({
//       form: {
//         ...this.state.form,
//         [e.target.name]: e.target.value,
//       },
//     });
//   };

//   getValueInput = (evt) => {
//     const inputValue = evt.target.value;
//     let lista = this.state.rialdata;
//     if (this.state.input === "nombre") {
//       let lista2 = lista.filter(x =>
//         x.nombre.toLowerCase().includes(inputValue.toLowerCase())
//       );
//       this.setState({ modalInsertar: false, data: lista2 });
//     } else if (this.state.input === "lugar") {
//       let lista2 = lista.filter(x =>
//         x.lugar.toLowerCase().includes(inputValue.toLowerCase())
//       );
//       this.setState({ modalInsertar: false, data: lista2 });
//     } else if (this.state.input === "fecha") {
//       let lista2 = lista.filter(x =>
//         x.fecha.toLowerCase().includes(inputValue.toLowerCase())
//       );
//       this.setState({ modalInsertar: false, data: lista2 });
//     } else if (this.state.input === "impacto") {
//       let lista2 = lista.filter(x => {
//         if (x.footprint !== null) {
//           return x.footprint.toString().includes(inputValue)
//         }
//         return false;
//       }
//       );
//       this.setState({ modalInsertar: false, data: lista2 });
//     }
//   };