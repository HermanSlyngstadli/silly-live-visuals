import * as THREE from 'three'
import { Hud, OrthographicCamera } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useState } from 'react'

export function Viewcube({ renderPriority = 1, matrix = new THREE.Matrix4() }) {
    const mesh = useRef(null)
    const { camera, size } = useThree()
    const [hover, set] = useState(null)

    useFrame(() => {
        // Spin mesh to the inverse of the default cameras matrix
        matrix.copy(camera.matrix).invert()
        mesh.current.quaternion.setFromRotationMatrix(matrix)
    })

    return (
        <Hud renderPriority={renderPriority}>
            <OrthographicCamera makeDefault position={[0, 0, 100]} />
            <mesh
                ref={mesh}
                position={[size.width / 2 - 120, size.height / 2 - 120, 0]}
                onPointerOut={(e) => set(null)}
                onPointerMove={(e) => set(e.face.materialIndex)}
            >
                {[...Array(6)].map((_, index) => (
                    <meshLambertMaterial
                        attach={`material-${index}`}
                        key={index}
                        color={hover === index ? 'lightblue' : 'white'}
                    />
                ))}
                <boxGeometry args={[80, 80, 80]} />
            </mesh>
            <ambientLight intensity={1} />
            <pointLight position={[200, 200, 100]} intensity={0.5} />
        </Hud>
    )
}
