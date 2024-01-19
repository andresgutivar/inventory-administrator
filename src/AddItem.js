import { doc, setDoc } from "firebase/firestore";

import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function AddItem({ db }) {
  const [nombreItem, setNombreItem] = useState("");
  const [precioItem, setPrecioItem] = useState("");
  const [cantidadItem, setCantidadItem] = useState("");
  const navigate = useNavigate();

  function cancelar() {
    navigate("/");
  }

  function guardar() {
    if (nombreItem.trim() === "") {
      alert("Debe ingresar un texto");
      return; // corta la funcion agregarItem
    }

    if (precioItem.trim() === "") {
      alert("Debe ingresar un numero");
      return; // corta la funcion agregarItem
    }
    if (cantidadItem.trim() === "") {
      alert("Debe ingresar un numero");
      return; // corta la funcion agregarItem
    }
    const uuid = uuidv4();
    setDoc(doc(db, "descriptions", uuid), {
      id: uuid,
      Nombre: nombreItem,
      Precio: precioItem,
      Cantidad: cantidadItem,
    });
    navigate("/");
  }
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="text"
          placeholder="Enter product's name"
          value={nombreItem}
          onChange={(val) => setNombreItem(val.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="number"
          placeholder="Precio"
          value={precioItem}
          onChange={(val) => setPrecioItem(val.target.value)}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="number"
          placeholder="Cantidad"
          value={cantidadItem}
          onChange={(val) => setCantidadItem(val.target.value)}
          required
        />
      </Form.Group>

      <Button variant="success" type="submit" onClick={() => guardar()}>
        Guardar
      </Button>
      <Button variant="danger" onClick={() => cancelar()}>
        Cancelar
      </Button>
    </Form>
  );
}
export default AddItem;
