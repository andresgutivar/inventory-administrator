import { deleteDoc, doc, updateDoc } from "firebase/firestore";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom"; //libreria para redirejir a otra web *1
import { useState } from "react";

function TableComponent({ datos, db }) {
  const [nombreItem, setNombreItem] = useState("");
  const [precioItem, setPrecioItem] = useState("");
  const [cantidadItem, setCantidadItem] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);

  const navigate = useNavigate(); //*1 necesario para usar la libreria que te redirije
  function agregarItem() {
    navigate("/AddItem"); //*1 aca se redirije
  }

  function eliminarItem(item) {
    deleteDoc(doc(db, "descriptions", item.id)); //
  }
  function guardar(item) {
    if (nombreItem.trim() === "") {
      alert("Debe ingresar un texto");
      return; // corta la funcion agregarItem
    }
    updateDoc(doc(db, "descriptions", item.id), {
      id: item.id,
      Nombre: nombreItem,
      Precio: precioItem,
      Cantidad: cantidadItem,
    });
    setModoEdicion(false);
  }

  return (
    <>
      <Button variant="outline-primary" onClick={() => agregarItem()}>
        Agregar Item
      </Button>
      <br />
      <Table responsive>
        <thead>
          <tr>
            <th>Codigo de barras</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Valor sumarizado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datos &&
            datos.map((item) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>
                    {modoEdicion === false ? (
                      item.Nombre
                    ) : (
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          value={nombreItem}
                          type="text"
                          onChange={(val) => setNombreItem(val.target.value)}
                          placeholder="Enter product's name"
                          required
                        />
                      </Form.Group>
                    )}
                  </td>
                  <td>
                    {modoEdicion === false ? (
                      item.Precio
                    ) : (
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          value={precioItem}
                          type="text"
                          onChange={(val) => setPrecioItem(val.target.value)}
                          placeholder="ingrese precio"
                          required
                        />
                      </Form.Group>
                    )}
                  </td>
                  <td>
                    {modoEdicion === false ? (
                      item.Cantidad
                    ) : (
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          value={cantidadItem}
                          type="text"
                          onChange={(val) => setCantidadItem(val.target.value)}
                          placeholder="ingrese cantidad"
                          required
                        />
                      </Form.Group>
                    )}
                  </td>
                  <td>{item.Precio * item.Cantidad}</td>
                  <td>
                    {modoEdicion === false ? (
                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          setModoEdicion(true);
                          setNombreItem(item.Nombre);
                          setCantidadItem(item.Cantidad);
                          setPrecioItem(item.Precio);
                        }}
                      >
                        Editar Item
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        type="submit"
                        onClick={() => guardar(item)}
                      >
                        Guardar
                      </Button>
                    )}

                    {modoEdicion === false ? (
                      <Button
                        variant="outline-primary"
                        onClick={() => eliminarItem(item)}
                      >
                        Eliminar Item
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        onClick={() => {
                          setModoEdicion(false);
                          setNombreItem(item.Nombre);
                          setCantidadItem(item.Cantidad);
                          setPrecioItem(item.Precio);
                        }}
                      >
                        Cancelar
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
}
export default TableComponent;
