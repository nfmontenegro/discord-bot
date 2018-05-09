import fetch from 'node-fetch'

export const bip = async code => {
  const url = `http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=${code}`
  return fetch(url)
    .then(res => res.json())
    .then(({ saldoTarjeta }) => {
      const message = !saldoTarjeta
        ? 'El código de la tarjeta no existe'
        : `El saldo 💵  de tu tarjeta es ${saldoTarjeta}`

      return message
    })
    .catch(err => err)
}
