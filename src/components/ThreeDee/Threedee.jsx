
import { useRef, Suspense } from "react"
import { Canvas, useLoader, useFrame } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const GltfModel = ({ modelPath, scale = 40, position = [0, 0, 0] }) => {
  const ref = useRef()
  const gltf = useLoader(GLTFLoader, modelPath)

  useFrame((state, delta) => {
    ref.current.rotation.y += 0.005;
    ref.current.rotation.x = 0.4-Math.sin(ref.current.rotation.y);
  })

  return (
    <primitive
        ref={ref}
        object={gltf.scene}
        position={position}
        scale={scale}
    />
  )
}

const ModelViewer = ({ modelPath, scale = 40, position = [0, 0, 0] }) => {
  return (
    <Canvas>
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-100, -40, -500]} />
      <Suspense fallback={null}>
        <GltfModel modelPath={modelPath} scale={scale} position={position} />
        <OrbitControls />
      </Suspense>
    </Canvas>
  )
}

export default ModelViewer