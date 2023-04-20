import { sleep } from 'k6'
import http from 'k6/http'

export const options = {
  vus: 1500,
  duration: '30s',
}

export default function () {
  http.get('http://localhost/feature')
  sleep(1)
}
