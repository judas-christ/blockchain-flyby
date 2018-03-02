import * as THREE from 'three'

const MAIN_MATERIAL = new THREE.LineBasicMaterial({
  color: 0x000000
})
const INTERPOLATED_MATERIAL = new THREE.LineBasicMaterial({
  color: 0xff88cc
})

export default function(points, x0, dx, dz, i, isInterpolated) {
  const curve = new THREE.CatmullRomCurve3(
    points.map((p, pi) => new THREE.Vector3(x0 + pi * dx, p, -dz * i))
  )

  const cpoints = curve.getPoints(400)
  const geometry = new THREE.BufferGeometry().setFromPoints(cpoints)

  const material = new THREE.LineBasicMaterial(
    isInterpolated ? INTERPOLATED_MATERIAL : MAIN_MATERIAL
  )

  // Create the final object to add to the scene
  const curveObject = new THREE.Line(geometry, material)
  return curveObject
}
