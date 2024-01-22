import { Route, Routes } from "react-router-dom";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import { createContext, useContext } from "react";
import { useEffect, useState } from "react";

import AddItem from "./AddItem.js";
import SwitchComponent from "./SwtichComponent.js";
import TableComponent from "./TableComponent.js";
import { initializeApp } from "firebase/app";

export const ThemeContext = createContext(null);

const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "xxx",
  projectId: "xxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxx",
};

const app = initializeApp(firebaseConfig); //app seria

const db = getFirestore(app);
function App() {
  const [datos, setDatos] = useState([]);
  const [theme, setTheme] = useState("dark");

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
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        style={
          theme === "dark"
            ? { backgroundColor: "black", height: "1000px" }
            : { backgroundColor: "white", height: "1000px" }
        }
      >
        <SwitchComponent></SwitchComponent>
        <Routes>
          <Route path="/" element={<TableComponent datos={datos} db={db} />} />
          <Route path="/AddItem" element={<AddItem db={db} />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
