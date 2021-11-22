import * as THREE from 'three'
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber/native'
import './NoiseMaterial'

function NoisyPlane(props) {
  const ref = useRef()
  useFrame((state) => (ref.current.material.time = Math.sin((2 * Math.PI * state.clock.elapsedTime) / 10)))
  return (
    <mesh ref={ref} {...props}>
      <planeGeometry args={[12, 12]} />
      <noiseMaterial />
    </mesh>
  )
}

function Button() {
  const ref = useRef()
  const [pressed, press] = useState(false)
  useFrame(() => (ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, pressed ? 0.1 : 1, 0.1)))
  return (
    <group ref={ref} onPointerDown={() => press(true)} onPointerUp={() => press(false)}>
      <NoisyPlane rotation={[-Math.PI / 2, 0, 0]} position={[0, 2.5, 0]} />
      <NoisyPlane rotation={[-Math.PI / 2, 0, 0]} position={[0, 1.25, 0]} />
      <NoisyPlane rotation={[-Math.PI / 2, 0, 0]} />
    </group>
  )
}

export default function App() {
  return (
    <Canvas style={{ backgroundColor: '#06092c' }} camera={{ position: [-20, 20, 20] }}>
      <Button />
    </Canvas>
  )
}
