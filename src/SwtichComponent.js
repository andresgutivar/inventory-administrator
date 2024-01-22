import Form from "react-bootstrap/Form";
import { ThemeContext } from "./App.js";
import { useContext } from "react";

export default function SwitchComponent() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <>
      <Form.Check
        type="switch"
        id="custom-switch"
        label="Tema oscuro"
        style={theme === "dark" ? { color: "white" } : { color: "black" }}
        checked={theme === "dark" ? true : false}
        onChange={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      />
    </>
  );
}
