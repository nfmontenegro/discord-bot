import fetch from 'node-fetch'

export async function methodFetch(url) {
  try {
    const response = await fetch(url)
    return response.json()
  } catch (err) {
    return err
  }
}
