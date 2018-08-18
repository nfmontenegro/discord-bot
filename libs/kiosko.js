import {toDay} from '../utils/util'

export async function kiosko(news) {
  let url
  switch (news) {
    case 'lun':
      url = `http://img.kiosko.net/${toDay()}/cl/cl_ultimas_noticias.750.jpg`
      break
    case 'lacuarta':
      url = `http://img.kiosko.net/${toDay()}/cl/cl_cuarta.750.jpg`
      break
    case 'times':
      url = `http://img.kiosko.net/${toDay()}/uk/the_times.750.jpg`
      break
    case 'elpais':
      url = `http://img.kiosko.net/${toDay()}/es/elpais.750.jpg`
      break
    case 'nytimes':
      url = `http://img.kiosko.net/${toDay()}/us/newyork_times.750.jpg`
      break
    case 'mercurio':
      url = `http://img.kiosko.net/${toDay()}/cl/cl_mercurio.750.jpg`
      break
    case 'clarin':
      url = `http://img.kiosko.net/${toDay()}/ar/ar_clarin.750.jpg`
      break
    default:
      url = `No se encuentra disponible 📄`
      break
  }
  return url
}
