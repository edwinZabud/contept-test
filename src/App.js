import "./App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import {
  contarElementosUnicosEntreLlaves,
  reemplazarValoresEntreLlaves,
} from "./utils/wordReplacer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function App() {
  const [message, setMessage] = useState("");
  const [messageOutput, setMessageOutput] = useState("");
  const [formInputs, setFormInputs] = useState([]);
  const [age, setAge] = useState("");
  const [arregloObjetos, setArregloObjetos] = useState([]);

  const handleMessage = (event) => {
    console.log(
      "Value to update ",
      arregloObjetos?.map((item) => item.value)
    );
    const resultado = reemplazarValoresEntreLlaves(
      event.target.value,
      arregloObjetos
    );

    const counterResult = contarElementosUnicosEntreLlaves(event.target.value);

    console.log(resultado);
    setMessage(event.target.value);
    setMessageOutput(resultado);
    setFormInputs(counterResult.elementos);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const actualizarObjetoPorId = (id, nuevoValor) => {
    // Crea una copia del arreglo original
    const copiaArreglo = [...arregloObjetos];

    console.log("value " + id, nuevoValor);
    // Busca el objeto con el ID proporcionado
    const objetoActualizado = copiaArreglo.find((obj) => obj.id === id);

    // Si se encuentra el objeto, actualiza su valor
    if (objetoActualizado) {
      objetoActualizado.value = nuevoValor;

      // Actualiza el estado con la copia del arreglo que contiene el objeto actualizado
      setArregloObjetos([...copiaArreglo]);
      // console.log("arreglo encontrado", copiaArreglo);
    }
    // console.log("arreglo ", copiaArreglo);
    handleMessage({ target: { value: message } });
  };

  useEffect(() => {
    console.log("Previo ", arregloObjetos);
    setArregloObjetos(
      formInputs?.map((item, index) => {
        if (!arregloObjetos.some((obj) => obj.id === item)) {
          return { id: item, value: item?.value };
        }

        return arregloObjetos[index];
      }) || []
    );

    console.log("arreglo estado ", formInputs);
  }, [formInputs]);

  return (
    <Stack className="form-wrapper" direction="row" spacing={2}>
      <Stack direction="column" spacing={2} sx={{width: '100%'}}>
        <TextField
          id="outlined-multiline-static"
          label="Input"
          multiline
          rows={4}
          value={message}
          onChange={handleMessage}
          fullWidth
        />

        <hr />

        {arregloObjetos?.map((item) => (
          <FormControl fullWidth key={item.id}>
            <InputLabel id="demo-simple-select-label">
              [<strong>{item.id}</strong>]
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={item.value}
              label="Age"
              onChange={(event) =>
                actualizarObjetoPorId(item.id, event.target.value)
              }
            >
              <MenuItem value={""}>Select</MenuItem>
              <MenuItem value={"Edwin"}>Edwin</MenuItem>
              <MenuItem value={"Camilo"}>Camilo</MenuItem>
              <MenuItem value={"Julio"}>Julio</MenuItem>
            </Select>
          </FormControl>

          // <div key={item.id}>
          //   <label id="demo-simple-select-label">Value <strong>{item.id}</strong> </label>
          //   <select
          //     id="demo-simple-select"
          //     value={item.value}
          //     label="Age"
          //     onChange={(event) =>
          //       actualizarObjetoPorId(
          //         item.id,
          //         event.target.value
          //       )
          //     }
          //   >
          //     <option value={""}>Select</option>
          //     <option value={"Edwin"}>Edwinsky</option>
          //     <option value={"Camilosky"}>Camilosky</option>
          //     <option value={"Juliosky"}>Juliosky</option>
          //   </select>
          // </div>
        ))}
      </Stack>
      <hr />
      <div style={{width: '100%'}}>
        <TextField
          id="outlined-multiline-static"
          label="Output"
          multiline
          rows={4}
          value={messageOutput}
          aria-readonly
          fullWidth
        />
      </div>
    </Stack>
  );
}

export default App;
