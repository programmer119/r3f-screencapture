import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import * as THREE from 'three'

import { PerspectiveCamera } from '@react-three/drei'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  const cam = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  const { gl } = useThree()

  const scene = new THREE.Scene()

  useFrame((state) => {
    console.log(!!props.getImg)

    // state.gl.render(scene, cam.current) //cam
  })

  useEffect(() => {
    if (!!props.getImg) {
      return
    } else {
      console.log('done send')
      return props.setImg(gl.domElement.toDataURL())
    }
  }, [])
  return (
    <>
      <PerspectiveCamera ref={cam} position={[0, 0, 30]} />
      <mesh
        {...props}
        ref={mesh}
        scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={(e) => {
          props.setImg(gl.domElement.toDataURL())
          // setActive(!active)
        }}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}>
        <planeBufferGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={props.red ? (setActive ? 'pink' : 'blue') : 'orange'} />
      </mesh>
    </>
  )
}

export default function App() {
  const xx = document.getElementById('canvas')
  const [getImg, setImg] = useState(null)
  const manager = new THREE.LoadingManager()

  // useFrame(() => {
  //   console.log('hello')
  //   // mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  // })
  return (
    <>
      <button
        onClick={(_) => {
          console.log('nc')
        }}>
        Hello
      </button>
      <Canvas
        gl={{
          preserveDrawingBuffer: true
        }}
        onCreated={({ gl, events }) => {
          gl.setClearColor('#f5f5f5')
          // setImg(gl.domElement.toDataURL())
        }}
        id="canvas">
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Box {...{ red: true, setImg, getImg }} position={[-1.2, 0, 0]} />
        <Box setImg={setImg} getImg={getImg} position={[1.2, 0, 0]} />
      </Canvas>
      {getImg && (
        <img
          src={getImg}
          alt=""
          style={{
            width: 200,
            height: 200,
            objectFit: 'contain'
          }}
        />
      )}
    </>
  )
}
