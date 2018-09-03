import {requestData} from '../helpers/fetch'

export async function bip(code) {
  try {
    const url = `http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=${code}`
    const {saldoTarjeta, fechaSaldo} = await requestData(url)
    return `💳 El saldo de tu tarjeta es ${saldoTarjeta}, con fecha de última carga ${fechaSaldo}`
  } catch (err) {
    return `💳 El id de tu tarjeta ${code} no existe`
  }
}
