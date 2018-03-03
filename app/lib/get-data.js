import getJson from './get-json'

export default function() {
  return getJson('http://130.211.7.182/blocks').catch(() =>
    getJson('/fake-data.json')
  )
}
