import * as THREE from 'three'
// import lineFromPoints from './lib/line-from-points'
import interpolateLines from './lib/interpolate-lines'
import getJson from './lib/get-json'
import getData from './lib/get-data'

const FAKE_HASH =
  '816534932c2b7154836da6afc367695e6337db8a921823784c14378abed4f7d7'
const HASH_LENGTH = FAKE_HASH.length
const FLAT_LINE = FAKE_HASH.split('').map(() => 0)
const CAMERA_CLIP_Z = 1000
const CAMERA_SPEED = 1
const CAMERA_Z = 300
const devicePixelRatio = window.devicePixelRatio || 1
const WIDTH = window.innerWidth * devicePixelRatio
const HEIGHT = window.innerHeight * devicePixelRatio
const x0 = -WIDTH / 2
const dx = WIDTH / HASH_LENGTH
const dz = CAMERA_CLIP_Z / 2

const scene = new THREE.Scene()
scene.background = new THREE.Color(255, 255, 255)
scene.fog = new THREE.Fog(0xffffff, 10, 1000)
const camera = new THREE.PerspectiveCamera(
  75,
  WIDTH / HEIGHT,
  0.1,
  CAMERA_CLIP_Z
)

const renderer = new THREE.WebGLRenderer()

renderer.setSize(WIDTH, HEIGHT)
// we set this in css instead
renderer.domElement.style.width = ''
renderer.domElement.style.height = ''
document.body.appendChild(renderer.domElement)

// fontLoader.load('helvetiker_regular.typeface.json', function(font) {
//   var geometry = new THREE.TextGeometry('Hello three.js!', {
//     font: font,
//     size: 80,
//     height: 5,
//     curveSegments: 12,
//     bevelEnabled: true,
//     bevelThickness: 10,
//     bevelSize: 8,
//     bevelSegments: 5
//   })
// })

// var geometry = new THREE.BoxGeometry(1, 1, 1)
// var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// var cube = new THREE.Mesh(geometry, material)
// scene.add(cube)

camera.position.y = 250
camera.position.z = CAMERA_Z
camera.lookAt(new THREE.Vector3(0, 0, -100))

renderer.render(scene, camera)
let t0 = 0
const metaZElement = document.querySelector('.js-meta-z')
const metaIdElement = document.querySelector('.js-meta-id')
const metaHashElement = document.querySelector('.js-meta-hash')
const metaTimeElement = document.querySelector('.js-meta-time')
const metaDataElement = document.querySelector('.js-meta-data')
function animate(t) {
  requestAnimationFrame(animate)
  // camera.position.setZ(CAMERA_Z - CAMERA_SPEED * (t - t0))
  const z = camera.position.z
  touchVel *= touchFriction
  const newZ = touchVel * CAMERA_SPEED + z
  camera.position.setZ(newZ)
  renderer.render(scene, camera)
  metaZElement.textContent = -newZ
  // change block data
  if ((newZ + 400) % 500 > -100) {
    // get block index
    const index = -Math.ceil((newZ + 400) / 500)
    setBlock(index)
  }
}

let originalBlocks = void 0
function setBlock(index) {
  if (index in originalBlocks) {
    const block = originalBlocks[index]
    metaIdElement.textContent = block.index
    metaHashElement.textContent = block.hash
    metaTimeElement.textContent = block.timestamp
    metaDataElement.textContent = JSON.stringify(block.data)
  } else {
    metaIdElement.textContent = ''
    metaHashElement.textContent = ''
    metaTimeElement.textContent = ''
    metaDataElement.textContent = ''
  }
}

function yFromChar(char) {
  return parseInt(char, 16) * 6
}

getData()
  .then(blocks => (originalBlocks = blocks))
  .then(blocks => blocks.map(b => b.hash))
  .then(hashes => hashes.map(hash => hash.split('').map(yFromChar)))
  .then(data => [FLAT_LINE, FLAT_LINE, ...data, FLAT_LINE, FLAT_LINE])
  .then(data => interpolateLines(data, x0, dx, dz))
  .then(lines => {
    lines.forEach(line => scene.add(line))
  })
  // .then(objs =>
  //   objs.map((points, i) => ({
  //     points,
  //     z: i * 300 + 600
  //   }))
  // )
  // .then(objs => objs.map((o, i) => lineFromPoints(o.points, x0, dx, 400, i)))
  // .then(splines =>
  //   splines.forEach(curve => {
  //     scene.add(curve)
  //   })
  // )
  .then(() => {
    t0 = performance.now()
    animate()
  })

let lastTouchY = void 0
let touchVel = 0
const touchFriction = 0.9
window.addEventListener('wheel', onWheel)
document.addEventListener('touchstart', onTouchDown)
window.addEventListener('touchmove', onTouchMove)

function onWheel(e) {
  const z = camera.position.z
  camera.position.setZ(e.deltaY * CAMERA_SPEED + z)
}
function onTouchDown(e) {
  console.log(e)
  lastTouchY = e.touches[0].screenY
}
function onTouchMove(e) {
  const touchY = e.touches[e.touches.length - 1].screenY
  if (typeof lastTouchY === 'number') {
    const dY = lastTouchY - touchY
    touchVel += dY / 2
  }
  lastTouchY = touchY
  e.preventDefault()
  e.stopPropagation()
  return false
}
