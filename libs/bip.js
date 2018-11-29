import fetch from 'node-fetch'

export async function bip(code) {
  try {
    const url = `http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=${code}`
    const response = await fetch(url)
    const {saldoTarjeta, fechaSaldo} = await response.json()
    return `💳 El saldo de tu tarjeta es ${saldoTarjeta}, con fecha de última carga ${fechaSaldo}`
  } catch (err) {
    return `💳 El id de tu tarjeta ${code} no existe`
  }
}
