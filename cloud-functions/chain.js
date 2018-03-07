const http = require('http')
/**
 * Responds to any HTTP request that can provide a "message" field in the body.
 *
 * @param {!Object} req Cloud Function request context.
 * @param {!Object} res Cloud Function response context.
 */
exports.getChain = function(req, res) {
  const myReq = http.request(
    {
      hostname: '130.211.7.182',
      path: '/blocks'
    },
    function(myRes) {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Content-Type', 'application/json')
      myRes.setEncoding('utf8')
      myRes.on('data', chunk => {
        res.write(chunk)
      })
      myRes.on('end', () => {
        res.status(200).end()
      })
    }
  )
  myReq.end()
}
