import {validate, clean} from 'rut.js'
import fetch from 'node-fetch'

export async function rut(digits) {
  try {
    if (validate(digits)) {
      const cleanedRut = clean(digits)
      const url = `https://api.rutify.cl/rut/${cleanedRut}`
      const response = await fetch(url)

      let {
        servel: {region, comuna, provincia, circunscripcion, mesa, pais},
        nombre,
        rut,
        sexo
      } = await response.json()

      sexo = sexo === 1 ? 'Masculino' : 'Femenino'

      const message = `Rut: ${rut} \n\nNombre: ${nombre} \n\nSexo: ${sexo} \n\nRegión: ${region} \n\nComuna: ${comuna} \n\nProvincia: ${provincia}  \n\nCircunscripción: ${circunscripcion} \n\nMesa: ${mesa} \n\nPaís: ${pais}`

      return message.toUpperCase()
    } else {
      return 'El rut no existe 👎'
    }
  } catch (err) {
    console.log('Err:', err)
  }
}
