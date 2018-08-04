import { validate, clean } from 'rut.js'
import { methodFetch } from '../helpers/fetch'

export const rut = async digits => {
  try {
    if (validate(digits)) {
      const cleanedRut = clean(digits)
      const url = `https://api.rutify.cl/rut/${cleanedRut}`
      let { servel, nombre, rut, sexo } = await methodFetch(url)

      sexo = sexo === 1 ? 'Masculino' : 'Femenino'

      const { region, comuna, provincia, circunscripcion, mesa, pais } = servel

      const message = `Rut: ${rut} \n\nNombre: ${nombre} \n\nSexo: ${sexo} \n\nRegión: ${region} \n\nComuna: ${comuna} \n\nProvincia: ${provincia}  \n\nCircunscripción: ${circunscripcion} \n\nMesa: ${mesa} \n\nPaís: ${pais}`

      return message.toUpperCase()
    } else {
      return 'El rut no existe 👎'
    }
  } catch (err) {
    console.log('Err:', err)
  }
}
