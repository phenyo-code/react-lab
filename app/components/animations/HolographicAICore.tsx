/* src/app/components/animations/HolographicAICore.tsx */
"use client";

import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { Star } from "lucide-react";
import { useSpring, animated } from "@react-spring/three";

interface HolographicAICoreProps {
  className?: string;
}

const AICoreScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const streamsRef = useRef<THREE.Line[]>([]);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const { raycaster, camera, gl, mouse } = useThree();

  // Fixed parameters
  const glowColor = "#ff6ac1";
  const animationSpeed = 0.5;
  const pulseSpeed = 0.9;

  // Springs for interactivity
  const { coreEmissiveIntensity, orbPulseSpeed } = useSpring({
    coreEmissiveIntensity: hovered ? 1.5 : 0.5,
    orbPulseSpeed: hovered ? pulseSpeed * 1.5 : pulseSpeed,
    config: { tension: 170, friction: 26 },
  });

  const { ringScale } = useSpring({
    ringScale: clicked ? 1.5 : 1,
    config: { duration: 400 },
    onRest: () => setClicked(false),
  });

  // Background parallax plane
  const bgPlaneRef = useRef<THREE.Mesh>(null);

  // Orb shader (pulsating energy)
  const orbMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      baseColor: { value: new THREE.Color(glowColor) },
      pulseSpeed: { value: pulseSpeed },
    },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 baseColor;
      uniform float pulseSpeed;
      varying vec3 vNormal;
      void main() {
        float intensity = 0.5 + 0.5 * sin(time * pulseSpeed);
        vec3 color = baseColor * intensity;
        float glow = 0.3 + 0.2 * abs(dot(vNormal, vec3(0, 0, 1)));
        gl_FragColor = vec4(color * glow, 0.7 * intensity);
      }
    `,
    transparent: true,
  });

  // Ring shader (color-shifting neon)
  const ringMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color("#00f7ff") }, // Cyan
      color2: { value: new THREE.Color("#ff6ac1") }, // Magenta
      color3: { value: new THREE.Color("#0059ff") }, // Blue
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
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      varying vec2 vUv;
      void main() {
        float t = sin(time * 0.5) * 0.5 + 0.5;
        vec3 color = mix(mix(color1, color2, t), color3, t * 0.5);
        float glow = 0.8 + 0.2 * sin(time * 2.0 + vUv.x * 3.14159);
        gl_FragColor = vec4(color * glow, 0.9);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide,
  });

  // Data streams (neon lines)
  const streamCount = 6;
  const streamGeometries = Array(streamCount).fill(null).map(() => new THREE.BufferGeometry());
  const streamPositions = streamGeometries.map(() => {
    const positions = [];
    for (let i = 0; i < 2; i++) {
      positions.push(0, i * 4 - 2, 0);
    }
    return new THREE.Float32BufferAttribute(positions, 3);
  });
  streamGeometries.forEach((geom, i) => geom.setAttribute('position', streamPositions[i]));
  const streamMaterial = useMemo(
    () => new THREE.LineBasicMaterial({ color: glowColor, transparent: true, opacity: 0.6 }),
    [glowColor]
  );

  // Initialize streams
  useEffect(() => {
    streamsRef.current = streamGeometries.map((geom, i) => {
      const line = new THREE.Line(geom, streamMaterial);
      line.position.set(
        Math.cos((i / streamCount) * Math.PI * 2) * 2,
        0,
        Math.sin((i / streamCount) * Math.PI * 2) * 2
      );
      line.rotation.y = (i / streamCount) * Math.PI * 2;
      return line;
    });
  }, [streamGeometries, streamMaterial]);

  // Particle system (orbiting)
  const particleCount = 300;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleVelocities = new Float32Array(particleCount * 3);
  const particlePhases = new Float32Array(particleCount);
  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const radius = 1.5 + Math.random() * 0.5;
    particlePositions[i * 3] = radius * Math.cos(theta);
    particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    particlePositions[i * 3 + 2] = radius * Math.sin(theta);
    particleVelocities[i * 3] = 0.02 * (Math.random() - 0.5);
    particleVelocities[i * 3 + 1] = 0;
    particleVelocities[i * 3 + 2] = 0.01 * (Math.random() - 0.5);
    particlePhases[i] = Math.random() * Math.PI * 2;
  }
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color1: { value: new THREE.Color("#00f7ff") },
      color2: { value: new THREE.Color("#ff6ac1") },
      color3: { value: new THREE.Color("#0059ff") },
    },
    vertexShader: `
      attribute float phase;
      varying float vPhase;
      void main() {
        vPhase = phase;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = 3.0;
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      varying float vPhase;
      void main() {
        float t = sin(time * 0.5 + vPhase) * 0.5 + 0.5;
        vec3 color = mix(mix(color1, color2, t), color3, t * 0.5);
        float intensity = 0.5 + 0.5 * sin(time * 2.0 + vPhase);
        gl_FragColor = vec4(color, intensity * 0.8);
      }
    `,
    transparent: true,
  });

  // Animation
  useFrame((state) => {
    const time = state.clock.elapsedTime * animationSpeed;
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01 * animationSpeed;
    }
    if (orbRef.current) {
      orbRef.current.scale.setScalar(0.3 + 0.1 * Math.sin(time * orbPulseSpeed.get()));
    }
    if (ring1Ref.current && ring2Ref.current && ring3Ref.current) {
      ring1Ref.current.rotation.x += 0.02 * animationSpeed;
      ring1Ref.current.rotation.y += 0.015 * animationSpeed;
      ring2Ref.current.rotation.y += 0.018 * animationSpeed;
      ring2Ref.current.rotation.z += 0.01 * animationSpeed;
      ring3Ref.current.rotation.x += 0.01 * animationSpeed;
      ring3Ref.current.rotation.z += 0.015 * animationSpeed;
      ring1Ref.current.position.y = Math.sin(time) * 0.1;
      ring2Ref.current.position.y = Math.sin(time + 1) * 0.1;
      ring3Ref.current.position.y = Math.sin(time + 2) * 0.1;
    }
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const x = positions[i * 3];
        const z = positions[i * 3 + 2];
        const theta = Math.atan2(z, x) + particleVelocities[i * 3];
        const radius = Math.sqrt(x * x + z * z);
        positions[i * 3] = radius * Math.cos(theta);
        positions[i * 3 + 2] = radius * Math.sin(theta) * 0.7; // Elliptical
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
    streamsRef.current.forEach((stream, i) => {
      stream.position.y = (Math.sin(time + i) * 2) % 4 - 2;
      (stream.material as THREE.LineBasicMaterial).opacity = 0.4 + 0.2 * Math.sin(time + i);
    });
    orbMaterial.uniforms.time.value = time;
    ringMaterial.uniforms.time.value = time;
    particleMaterial.uniforms.time.value = time;
  });

  // Interactivity
  const handlePointerMove = useCallback((event: MouseEvent) => {
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([coreRef.current!], true);
    setHovered(intersects.length > 0);
  }, [raycaster, camera]);

  const handleClick = useCallback((event: MouseEvent) => {
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([coreRef.current!], true);
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

  // Parallax camera
  useFrame(() => {
    camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouse.y * 0.5 + 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Background parallax plane */}
      <mesh ref={bgPlaneRef} position={[0, 0, -20]}>
        <planeGeometry args={[50, 50]} />
        <meshBasicMaterial color="#1A1A1A" transparent opacity={0.5} />
      </mesh>
      {/* AI Core */}
      <group ref={groupRef}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1, 2]} />
          <meshPhysicalMaterial
            color="#1A1A1A"
            transparent
            opacity={0.4}
            roughness={0.2}
            metalness={0.8}
            emissive="#ff6ac1"
            emissiveIntensity={coreEmissiveIntensity.get()}
          />
          <animated.mesh ref={orbRef}>
            <sphereGeometry args={[0.3, 32, 32]} />
            <shaderMaterial attach="material" {...orbMaterial} />
          </animated.mesh>
        </mesh>
        {/* Energy Rings */}
        <animated.mesh ref={ring1Ref} scale={ringScale}>
          <torusGeometry args={[1.2, 0.05, 16, 64]} />
          <shaderMaterial attach="material" {...ringMaterial} />
        </animated.mesh>
        <animated.mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0]} scale={ringScale}>
          <torusGeometry args={[1.3, 0.05, 16, 64]} />
          <shaderMaterial attach="material" {...ringMaterial} />
        </animated.mesh>
        <animated.mesh ref={ring3Ref} rotation={[0, Math.PI / 4, 0]} scale={ringScale}>
          <torusGeometry args={[1.4, 0.05, 16, 64]} />
          <shaderMaterial attach="material" {...ringMaterial} />
        </animated.mesh>
        {/* Particles */}
        <points ref={particlesRef} geometry={particleGeometry} material={particleMaterial} />
        {/* Data Streams */}
        {streamsRef.current.map((stream, i) => (
          <primitive key={`stream-${i}`} object={stream} />
        ))}
      </group>
      {/* Background Particles */}
      <Points>
        <PointMaterial size={0.05} color="#ff6ac1" transparent opacity={0.1} />
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(Array.from({ length: 300 }, () => (Math.random() - 0.5) * 50)), 3]}
          />
        </bufferGeometry>
      </Points>
    </>
  );
};

const HolographicAICore: React.FC<HolographicAICoreProps> = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }} gl={{ alpha: true }}>
        <fog attach="fog" args={["#1A1A1A", 5, 20]} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <AICoreScene />
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

export default HolographicAICore;