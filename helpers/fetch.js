import fetch from 'node-fetch'

export async function requestData(url) {
  try {
    const response = await fetch(url)
    return response.json()
  } catch (err) {
    return err
  }
}
