'use client';

import React, {useRef, useState} from "react";
import { Suspense } from "react";
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from "three";

function SmokeParticle({size=300, speed=0.03, colour}) {
    const [x] = useState(() => (Math.random() - 0.5) * 1000)
    const [y] = useState(() => (Math.random() - 0.5) * 1000)
    const [z] = useState(() => (Math.random() - 0.5) * 300)
    const [rotationOffset] = useState(() => Math.random() * 360)
    const meshRef = useRef();
    const texture = useLoader(TextureLoader, "./Smoke3.png");
    
    useFrame((state, delta) => (meshRef.current.rotation.z += delta * speed))

        return (
            <mesh ref={meshRef} position={[x,y,z]} rotation={[0, 0, rotationOffset]}>
                <meshLambertMaterial alphaMap={texture} color={colour} transparent={true} opacity={0.25}/>
                <planeGeometry args={[size,size]} />
            </mesh>
        )
}

export default function Smoke({foregroundColour="#ffc400", backgroundColour="#313042"}) {

  return (
    <div className="smoke-container">
      <Canvas style={{background: backgroundColour}} camera={{ position: [0, 0, 100], fov: 75, near: 1, far: 10000 }}>
        <Suspense fallback={null}>
            {[...Array(75)].map((_, index) => (
                <SmokeParticle key={index} size={300} speed={0.06} colour={foregroundColour}/>
            ))}
            <perspectiveCamera 
                fov={75} 
                aspect={1} 
                near={1} 
                far={10000} 
                position={[0, 0, 1000]} 
            />
            <directionalLight color="#ffffff" intensity={1} position={[-1, 0, 1]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
