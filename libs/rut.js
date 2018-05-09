import fetch from 'node-fetch'

export const rut = async digits => {
  const url = `https://api.rutify.cl/rut/${digits}`
  return fetch(url)
    .then(response => response.json())
    .then(({ servel, nombre, rut, sexo }) => {
      sexo = sexo === 1 ? 'Masculino' : 'Femenino'

      const { region, comuna, provincia, circunscripcion, mesa, pais } = servel

      const message = `Rut: ${rut} \nNombre: ${nombre} \nSexo: ${sexo} \nRegión: ${region} \nComuna: ${comuna} \nProvincia: ${provincia}  \nCircunscripción: ${circunscripcion} \nMesa: ${mesa} \nPaís: ${pais}`

      return message.toUpperCase()
    })
    .catch(e => console.log(e))
}
