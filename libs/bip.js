import fetch from 'node-fetch'

export const bip = async code => {
  console.log('bip code:', code)
  const url = `http://bip-servicio.herokuapp.com/api/v1/solicitudes.json?bip=${code}`
  return fetch(url)
    .then(res => res.json())
    .then(({ saldoTarjeta, fechaSaldo }) => {
      const message =
        saldoTarjeta === '---'
          ? '💳 El código de la tarjeta no existe'
          : `💳 El saldo de tu tarjeta es ${saldoTarjeta}, con fecha de última carga ${fechaSaldo}`

      return message
    })
    .catch(err => err)
}
