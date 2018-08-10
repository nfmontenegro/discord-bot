import {toDay} from '../utils/util'

export async function kiosko(news) {
  const date = toDay()
  let url
  switch (news) {
    case 'lun':
      url = `http://img.kiosko.net/${date}/cl/cl_ultimas_noticias.750.jpg`
      break
    case 'lacuarta':
      url = `http://img.kiosko.net/${date}/cl/cl_cuarta.750.jpg`
      break
    case 'times':
      url = `http://img.kiosko.net/${date}/uk/the_times.750.jpg`
      break
    case 'elpais':
      url = `http://img.kiosko.net/${date}/es/elpais.750.jpg`
      break
    case 'nytimes':
      url = `http://img.kiosko.net/${date}/us/newyork_times.750.jpg`
      break
    case 'mercurio':
      url = `http://img.kiosko.net/${date}/cl/cl_mercurio.750.jpg`
      break
    case 'clarin':
      url = `http://img.kiosko.net/${date}/ar/ar_clarin.750.jpg`
      break
    default:
      url = `No se encuentra disponible 📄`
      break
  }
  return url
}
