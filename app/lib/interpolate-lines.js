import * as THREE from 'three'
import lineFromPoints from './line-from-points'

const INTERPOLATIONS = 50

function interpolate(a, b, c) {
  const k = easeInOutQuad(c)
  return a * (1 - k) + b * k
}
function linear(t) {
  return t
}
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function getInterpolated(pointsA, pointsB, c) {
  const points = []
  for (let i = 0; i < pointsA.length; i++) {
    points.push(interpolate(pointsA[i], pointsB[i], c))
  }
  return points
}

export default function(data, x0, dx, dz) {
  // interpolate points between the two lines
  const allPoints = [data[0]]
  for (let i = 1; i < data.length; i++) {
    const points0 = data[i - 1]
    const pointsI = data[i]
    for (let j = 1; j < INTERPOLATIONS - 1; j++) {
      const pointsInter = getInterpolated(points0, pointsI, j / INTERPOLATIONS)
      allPoints.push(pointsInter)
    }
    allPoints.push(pointsI)
  }

  // create lines for each point array
  return allPoints.map((points, i) =>
    lineFromPoints(
      points,
      x0,
      dx,
      dz / INTERPOLATIONS,
      i,
      i % (INTERPOLATIONS - 1) !== 0
    )
  )
}
