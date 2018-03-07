export default function(url) {
  return new Promise((resolve, reject) => {
    function reqListener() {
      const text = this.responseText
      const obj = JSON.parse(text)
      resolve(obj)
    }
    var oReq = new XMLHttpRequest()
    oReq.onload = reqListener
    oReq.onerror = reject
    oReq.open('GET', url)
    oReq.send()
  })
}
