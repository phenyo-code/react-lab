/* eslint-disable @typescript-eslint/no-explicit-any */
/* src/app/components/animations/Robot.tsx */
"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { Star } from "lucide-react";
import { useSpring, animated } from "@react-spring/three";

interface RobotProps {
  className?: string;
}

const RobotStructure: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const chestRef = useRef<THREE.Mesh>(null);
  const leftAntennaRef = useRef<THREE.Mesh>(null);
  const rightAntennaRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { raycaster, camera, gl, mouse } = useThree();

  // Fixed animation parameters
  const glowColor = "#ff6ac1";
  const animationSpeed = 0.5;
  const pulseSpeed = 0.9;

  // Spring for click pulse
  const { emissiveIntensity } = useSpring({
    emissiveIntensity: clicked ? 2 : 0.5,
    config: { duration: 300 },
    onRest: () => setClicked(false),
  });

  // Spring for hover wave
  const { rightArmRotation } = useSpring({
    rightArmRotation: hovered ? [0, 0, -Math.PI / 3] : [0, 0, 0],
    config: { tension: 170, friction: 26 },
  });

  // Background parallax plane
  const bgPlaneRef = useRef<THREE.Mesh>(null);

  // Custom geometries
  // Head: LatheGeometry for smooth, helmet-like shape
  const headPoints = [];
  for (let i = 0; i <= 20; i++) {
    const t = i / 20;
    const x = 0.6 * Math.sin(Math.PI * t) * (1 - t * 0.3);
    const y = 0.8 * Math.cos(Math.PI * t);
    headPoints.push(new THREE.Vector2(x, y));
  }
  const headGeometry = new THREE.LatheGeometry(headPoints, 32);

  // Visor: ExtrudeGeometry for curved screen
  const visorShape = new THREE.Shape();
  visorShape.moveTo(-0.4, -0.2);
  visorShape.quadraticCurveTo(0, -0.3, 0.4, -0.2);
  visorShape.quadraticCurveTo(0.4, 0.2, 0, 0.3);
  visorShape.quadraticCurveTo(-0.4, 0.2, -0.4, -0.2);
  const visorExtrudeSettings = { depth: 0.05, bevelEnabled: false };
  const visorGeometry = new THREE.ExtrudeGeometry(visorShape, visorExtrudeSettings);

  // Body: BufferGeometry with organic tapering
  const bodyGeometry = new THREE.BufferGeometry();
  const bodyVertices = [];
  const bodyIndices = [];
  const segments = 16;
  const heightSegments = 8;
  for (let i = 0; i <= heightSegments; i++) {
    const y = i / heightSegments * 2 - 1;
    const radius = 0.6 * (1 - Math.abs(y) * 0.3);
    for (let j = 0; j < segments; j++) {
      const theta = (j / segments) * Math.PI * 2;
      bodyVertices.push(
        radius * Math.cos(theta),
        y,
        radius * Math.sin(theta)
      );
    }
  }
  for (let i = 0; i < heightSegments; i++) {
    for (let j = 0; j < segments; j++) {
      const a = i * segments + j;
      const b = i * segments + (j + 1) % segments;
      const c = (i + 1) * segments + (j + 1) % segments;
      const d = (i + 1) * segments + j;
      bodyIndices.push(a, b, d);
      bodyIndices.push(b, c, d);
    }
  }
  bodyGeometry.setAttribute('position', new THREE.Float32BufferAttribute(bodyVertices, 3));
  bodyGeometry.setIndex(bodyIndices);
  bodyGeometry.computeVertexNormals();

  // Chest: ExtrudeGeometry for holographic panel
  const chestShape = new THREE.Shape();
  chestShape.moveTo(-0.3, -0.3);
  chestShape.lineTo(0.3, -0.3);
  chestShape.quadraticCurveTo(0.2, 0.3, -0.3, 0.3);
  const chestExtrudeSettings = { depth: 0.01, bevelEnabled: false };
  const chestGeometry = new THREE.ExtrudeGeometry(chestShape, chestExtrudeSettings);

  // Arm: ExtrudeGeometry for curved segments
  const armShape = new THREE.Shape();
  armShape.moveTo(-0.15, -0.5);
  armShape.quadraticCurveTo(0, -0.6, 0.15, -0.5);
  armShape.lineTo(0.15, 0.5);
  armShape.quadraticCurveTo(0, 0.6, -0.15, 0.5);
  const armExtrudeSettings = { depth: 0.2, bevelEnabled: false };
  const armGeometry = new THREE.ExtrudeGeometry(armShape, armExtrudeSettings);
  // Joint: LatheGeometry for connector
  const jointPoints = [];
  for (let i = 0; i <= 10; i++) {
    const t = i / 10;
    jointPoints.push(new THREE.Vector2(0.1 * Math.sin(Math.PI * t), t * 0.2));
  }
  const jointGeometry = new THREE.LatheGeometry(jointPoints, 16);

  // Leg: BufferGeometry for reverse-jointed limb
  const legGeometry = new THREE.BufferGeometry();
  const legVertices = [];
  const legIndices = [];
  for (let i = 0; i <= heightSegments; i++) {
    const y = i / heightSegments * 1.5 - 1.5;
    const radius = 0.2 * (1 - Math.abs(y / 1.5) * 0.4);
    for (let j = 0; j < segments; j++) {
      const theta = (j / segments) * Math.PI * 2;
      legVertices.push(
        radius * Math.cos(theta),
        y + (y < 0 ? y * 0.3 : 0), // Reverse joint bend
        radius * Math.sin(theta)
      );
    }
  }
  for (let i = 0; i < heightSegments; i++) {
    for (let j = 0; j < segments; j++) {
      const a = i * segments + j;
      const b = i * segments + (j + 1) % segments;
      const c = (i + 1) * segments + (j + 1) % segments;
      const d = (i + 1) * segments + j;
      legIndices.push(a, b, d);
      legIndices.push(b, c, d);
    }
  }
  legGeometry.setAttribute('position', new THREE.Float32BufferAttribute(legVertices, 3));
  legGeometry.setIndex(legIndices);
  legGeometry.computeVertexNormals();

  // Foot: ExtrudeGeometry for clawed base
  const footShape = new THREE.Shape();
  footShape.moveTo(-0.2, -0.1);
  footShape.lineTo(0.2, -0.1);
  footShape.quadraticCurveTo(0.3, 0.2, 0, 0.3);
  footShape.quadraticCurveTo(-0.3, 0.2, -0.2, -0.1);
  const footExtrudeSettings = { depth: 0.15, bevelEnabled: false };
  const footGeometry = new THREE.ExtrudeGeometry(footShape, footExtrudeSettings);

  // Antenna: TubeGeometry for curved spine
  const antennaPath = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.1, 0.3, 0),
    new THREE.Vector3(0, 0.6, 0.1),
  ]);
  const antennaGeometry = new THREE.TubeGeometry(antennaPath, 20, 0.03, 8, false);

  // Eye shader for glowing dots
  const eyeMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      glowColor: { value: new THREE.Color(glowColor) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 glowColor;
      varying vec2 vUv;
      void main() {
        vec2 center1 = vec2(0.35, 0.6);
        vec2 center2 = vec2(0.65, 0.6);
        float dist1 = distance(vUv, center1);
        float dist2 = distance(vUv, center2);
        float glow = 0.15 / (dist1 * 10.0) + 0.15 / (dist2 * 10.0);
        glow *= 0.8 + 0.2 * sin(time * ${pulseSpeed});
        gl_FragColor = vec4(glowColor * glow, glow);
      }
    `,
    transparent: true,
  });

  // Animation
  useFrame((state) => {
    const time = state.clock.elapsedTime * animationSpeed;
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = Math.sin(time) * 0.15;
    }
    if (headRef.current) {
      // Head rotation
      headRef.current.rotation.y = Math.sin(time) * 0.2;
    }
    if (leftArmRef.current) {
      // Left arm breathing
      leftArmRef.current.rotation.z = Math.sin(time + 1) * 0.15;
    }
    if (leftAntennaRef.current && rightAntennaRef.current) {
      // Antennae wobble
      leftAntennaRef.current.rotation.x = Math.sin(time) * 0.1;
      rightAntennaRef.current.rotation.x = Math.sin(time + 0.5) * 0.1;
    }
    if (bgPlaneRef.current) {
      // Parallax background
      bgPlaneRef.current.position.x = mouse.x * 2;
      bgPlaneRef.current.position.y = mouse.y * 2;
    }
    // Update eye shader
    eyeMaterial.uniforms.time.value = time;
  });

  // Interactivity
  const handlePointerMove = useCallback((event: MouseEvent) => {
    const mouseVec = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(mouseVec, camera);
    const intersects = raycaster.intersectObjects([groupRef.current!], true);
    setHovered(intersects.length > 0);
  }, [raycaster, camera]);

  const handleClick = useCallback((event: MouseEvent) => {
    const mouseVec = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(mouseVec, camera);
    const intersects = raycaster.intersectObjects([groupRef.current!], true);
    if (intersects.length > 0) {
      setClicked(true);
    }
  }, [raycaster, camera]);

  useEffect(() => {
    gl.domElement.addEventListener("mousemove", handlePointerMove);
    gl.domElement.addEventListener("click", handleClick);
    return () => {
      gl.domElement.removeEventListener("mousemove", handlePointerMove);
      gl.domElement.removeEventListener("click", handleClick);
    };
  }, [gl, handlePointerMove, handleClick]);

  return (
    <>
      {/* Background parallax plane */}
      <mesh ref={bgPlaneRef} position={[0, 0, -20]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="#1A1A1A" transparent opacity={0.5} />
      </mesh>
      {/* Robot */}
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Head */}
        <mesh ref={headRef} position={[0, 2, 0]}>
          <bufferGeometry {...headGeometry} />
          <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.7} />
          {/* Visor */}
          <mesh position={[0, 0, 0.55]} rotation={[0, 0, 0]}>
            <bufferGeometry {...visorGeometry} />
            <shaderMaterial attach="material" {...eyeMaterial} />
          </mesh>
          {/* Antennae */}
          <mesh ref={leftAntennaRef} position={[0.4, 0.6, 0]} rotation={[0, 0, 0.2]}>
            <bufferGeometry {...antennaGeometry} />
            <meshStandardMaterial color="#ff6ac1" emissive="#ff6ac1" emissiveIntensity={0.5} />
          </mesh>
          <mesh ref={rightAntennaRef} position={[-0.4, 0.6, 0]} rotation={[0, 0, -0.2]}>
            <bufferGeometry {...antennaGeometry} />
            <meshStandardMaterial color="#ff6ac1" emissive="#ff6ac1" emissiveIntensity={0.5} />
          </mesh>
        </mesh>
        {/* Body */}
        <mesh position={[0, 0.5, 0]}>
          <bufferGeometry {...bodyGeometry} />
          <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.7} />
          {/* Holographic chest */}
          <animated.mesh ref={chestRef} position={[0, 0, 0.31]} rotation={[0, 0, 0]}>
            <bufferGeometry {...chestGeometry} />
            <animated.meshStandardMaterial
              color="#ff6ac1"
              transparent
              opacity={0.3}
              emissive="#ff6ac1"
              emissiveIntensity={emissiveIntensity}
            />
          </animated.mesh>
        </mesh>
        {/* Left Arm */}
        <group ref={leftArmRef} position={[0.7, 1.5, 0]}>
          <mesh position={[0, -0.5, 0]}>
            <bufferGeometry {...armGeometry} />
            <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.7} />
            {/* Glowing seam */}
            <mesh position={[0, 0, 0.11]}>
              <planeGeometry args={[0.3, 1]} />
              <meshStandardMaterial color="#ff6ac1" emissive="#ff6ac1" emissiveIntensity={0.5} transparent opacity={0.5} />
            </mesh>
          </mesh>
          <mesh position={[0, -1, 0]}>
            <bufferGeometry {...jointGeometry} />
            <meshStandardMaterial color="#ff6ac1" emissive="#ff6ac1" emissiveIntensity={0.5} />
          </mesh>
        </group>
        {/* Right Arm */}
        <animated.group
          ref={rightArmRef}
          position={[-0.7, 1.5, 0]}
          rotation={rightArmRotation as any} // TypeScript workaround
        >
          <mesh position={[0, -0.5, 0]}>
            <bufferGeometry {...armGeometry} />
            <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.7} />
            {/* Glowing seam */}
            <mesh position={[0, 0, 0.11]}>
              <planeGeometry args={[0.3, 1]} />
              <meshStandardMaterial color="#ff6ac1" emissive="#ff6ac1" emissiveIntensity={0.5} transparent opacity={0.5} />
            </mesh>
          </mesh>
          <mesh position={[0, -1, 0]}>
            <bufferGeometry {...jointGeometry} />
            <meshStandardMaterial color="#ff6ac1" emissive="#ff6ac1" emissiveIntensity={0.5} />
          </mesh>
        </animated.group>
        {/* Legs */}
        <mesh position={[0.3, -0.75, 0]}>
          <bufferGeometry {...legGeometry} />
          <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.7} />
          <mesh position={[0, -1.2, 0]}>
            <bufferGeometry {...footGeometry} />
            <meshStandardMaterial color="#ff6ac1" emissive="#ff6ac1" emissiveIntensity={0.5} />
          </mesh>
        </mesh>
        <mesh position={[-0.3, -0.75, 0]}>
          <bufferGeometry {...legGeometry} />
          <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.7} />
          <mesh position={[0, -1.2, 0]}>
            <bufferGeometry {...footGeometry} />
            <meshStandardMaterial color="#ff6ac1" emissive="#ff6ac1" emissiveIntensity={0.5} />
          </mesh>
        </mesh>
      </group>
      {/* Particles for mist */}
      <Points>
        <PointMaterial size={0.05} color="#ff6ac1" transparent opacity={0.1} />
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(Array.from({ length: 500 }, () => (Math.random() - 0.5) * 50)), 3]}
          />
        </bufferGeometry>
      </Points>
    </>
  );
};

const Robot: React.FC<RobotProps> = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }} gl={{ alpha: true }}>
        <fog attach="fog" args={["#1A1A1A", 5, 20]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RobotStructure />
        <OrbitControls enablePan={true} enableZoom={true} minDistance={3} maxDistance={10} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={1.5} />
        </EffectComposer>
      </Canvas>
      <div className="absolute top-4 right-4">
        <Star className="w-6 h-6 text-pink-500" />
      </div>
    </div>
  );
};

export default Robot;