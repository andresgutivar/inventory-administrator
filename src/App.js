import { Route, Routes } from "react-router-dom";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import AddItem from "./AddItem.js";
import TableComponent from "./TableComponent.js";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDbuMXrmRBrh6QwbFM0IFONMNByaTcHFGI",
  authDomain: "administration-inventory.firebaseapp.com",
  projectId: "administration-inventory",
  storageBucket: "administration-inventory.appspot.com",
  messagingSenderId: "532056393200",
  appId: "1:532056393200:web:c3ddf6d5ea92b098624935",
};

const app = initializeApp(firebaseConfig); //app seria

const db = getFirestore(app);
function App() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "descriptions")),
      (data) => {
        //coneccion a la base de datos
        let auxTempDatos = [];
        for (let i = 0; i < data.docs.length; i++) {
          auxTempDatos.push(data.docs[i].data());
        }
        setDatos(auxTempDatos);
      }
    );

    return unsubscribe;
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<TableComponent datos={datos} db={db} />} />
        <Route path="/AddItem" element={<AddItem db={db} />} />
      </Routes>
    </div>
  );
}

export default App;
