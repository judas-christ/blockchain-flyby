export default function(url) {
  return new Promise(resolve => {
    function reqListener() {
      const text = this.responseText
      const obj = JSON.parse(text)
      resolve(obj)
    }
    var oReq = new XMLHttpRequest()
    oReq.onload = reqListener
    oReq.open('GET', url)
    oReq.send()
  })
}
