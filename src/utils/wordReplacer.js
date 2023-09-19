export function reemplazarValoresEntreLlaves(cadena, valores) {
  // Usamos una expresión regular para encontrar todas las coincidencias entre llaves.
  const regex = /{(\d+)}/g;

  // Usamos una función de reemplazo para reemplazar cada coincidencia con el valor correspondiente.
  const resultado = cadena.replace(regex, function (match, indice) {
    // El argumento `match` contiene la cadena coincidente completa, por ejemplo, "{0}".
    // El argumento `indice` contiene el índice del valor en el arreglo `valores` que debe usarse.

    const valorEncontrado = valores.find((valor, index) => valor.id === indice);

    // debugger;

    // Verificamos si el índice es válido y existe en el arreglo de valores.
    if (valorEncontrado !== undefined) {                
      return valorEncontrado.value || match;
    } else {
      // Si el índice no es válido, simplemente retornamos la coincidencia original.
      return match;
    }    
  });

  return resultado;
}

export function contarElementosUnicosEntreLlaves(cadena) {
  // Usamos una expresión regular para encontrar todas las coincidencias entre llaves.
  const regex = /{(\d+)}/g;

  // Creamos un objeto Set para almacenar elementos únicos.
  const elementosUnicos = new Set();

  // Usamos un bucle para buscar y agregar elementos entre llaves al conjunto.
  let match;
  while ((match = regex.exec(cadena)) !== null) {
    const elemento = match[1]; // El elemento encontrado entre llaves.
    elementosUnicos.add(elemento);
  }

  // Convertimos el conjunto Set en un arreglo para contar elementos únicos.
  const elementosUnicosArray = Array.from(elementosUnicos);

  // Devolvemos la cantidad de elementos únicos y la lista de elementos.
  return {
    cantidad: elementosUnicosArray.length,
    elementos: elementosUnicosArray,
  };
}
