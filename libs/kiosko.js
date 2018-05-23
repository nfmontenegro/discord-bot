import { toDay } from '../utils/util'

export const kiosko = async news => {
  const date = toDay()
  let url
  switch (news) {
    case 'lun':
      url = `http://img.kiosko.net/${date}/cl/cl_ultimas_noticias.750.jpg`
      break
    case 'lacuarta':
      url = `http://img.kiosko.net/${date}/cl/cl_cuarta.750.jpg`
      break
  }
  return url
}
