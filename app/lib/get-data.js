import getJson from './get-json'

export default function() {
  return getJson(
    'https://us-central1-hackday-blockchain.cloudfunctions.net/chain'
  ).catch(() => getJson('/fake-data.json'))
}
