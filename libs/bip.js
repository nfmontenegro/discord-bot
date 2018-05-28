import fetch from 'node-fetch'

export const bip = async code => {
  console.log('bip code:', code)
  const url = `http://bip.franciscocapone.com/api/getSaldo/${code}`
  return fetch(url)
    .then(res => res.json())
    .then(response => {
      const message = !response
        ? 'El código de la tarjeta no existe'
        : `💳 La información de tu tarjeta es ${JSON.stringify(response)}`

      return message
    })
    .catch(err => err)
}
