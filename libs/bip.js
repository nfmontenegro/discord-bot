import fetch from 'node-fetch'

async function getBipData(code) {
  const url = `http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=${code}`
  try {
    const response = await fetch(url)
    console.log(response.json())
    return response.json()
  } catch (err) {
    return err
  }
}

export async function bip(code) {
  try {
    const { saldoTarjeta, fechaSaldo } = await getBipData(code)
    return `💳 El saldo de tu tarjeta es ${saldoTarjeta}, con fecha de última carga ${fechaSaldo}`
  } catch (err) {
    return `💳 El id de tu tarjeta ${code} no existe`
  }
}
