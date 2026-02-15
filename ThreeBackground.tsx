import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles() {
    const ref = useRef<THREE.Points>(null!);

    // Generate particles resembling molecules/nutrients
    const count = 1500;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        const { clock, mouse } = state;
        if (ref.current) {
            // Slow rotation
            ref.current.rotation.x = clock.getElapsedTime() * 0.05;
            ref.current.rotation.y = clock.getElapsedTime() * 0.075;

            // Reactive movement to mouse
            ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.x * 0.5, 0.05);
            ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, mouse.y * 0.5, 0.05);
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#3b82f6"
                    size={0.03}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>

            {/* Add some heavier "molecules" */}
            <Points positions={positions.slice(0, 300)} stride={3}>
                <PointMaterial
                    transparent
                    color="#8b5cf6"
                    size={0.06}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

const ThreeBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-10 bg-[#050505]">
            <div className="absolute inset-0 hero-gradient" />
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <fog attach="fog" args={['#050505', 5, 15]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00f2ff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
                <Particles />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
