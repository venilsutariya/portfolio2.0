import React, { useEffect, useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { motion } from 'framer-motion-3d';
import { animate, useMotionValue, useTransform } from 'framer-motion';
import { vertex, fragment } from './Shader';
import { useAspect } from '@react-three/drei';
import useMouse from './useMouse';
import useDimension from './useDimension';
import { projects } from './data';

export default function Model({ activeMenu }) {
  const plane = useRef();
  const { viewport } = useThree();
  const dimension = useDimension();
  const mouse = useMouse();
  const opacity = useMotionValue(0);

  // Precompute textures outside the map function for better performance
  const textures = useMemo(() => projects.map(project => project.src), [projects]);

  // Get width and height from the first texture, with error handling
  const firstTexture = textures[0]?.image || { width: 0, height: 0 };
  const { width, height } = firstTexture;

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  // Ensure scale calculation does not use invalid dimensions
  const scale = useAspect(
    width + 900,
    height,
    0.225
  );

  const smoothMouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  useEffect(() => {
    if (activeMenu != null && textures[activeMenu]) {
      const texture = new THREE.TextureLoader().load(textures[activeMenu]);
      texture.needsUpdate = true; // Ensure the texture is updated on load
      plane.current.material.uniforms.uTexture.value = texture;
      animate(opacity, 1, { duration: 0.2, onUpdate: latest => plane.current.material.uniforms.uAlpha.value = latest });
    } else {
      plane.current.material.uniforms.uTexture.value = null;
      animate(opacity, 0, { duration: 0.2, onUpdate: latest => plane.current.material.uniforms.uAlpha.value = latest });
    }
  }, [activeMenu, opacity, textures]);

  const uniforms = useRef({
    uDelta: { value: { x: 0, y: 0 } },
    uAmplitude: { value: 0.0005 },
    uTexture: { value: textures[0] }, // Use pre-computed textures here
    uAlpha: { value: 0 }
  });

  useFrame(() => {
    const { x, y } = mouse;
    const smoothX = smoothMouse.x.get();
    const smoothY = smoothMouse.y.get();

    if (Math.abs(x - smoothX) > 1) {
      smoothMouse.x.set(lerp(smoothX, x, 0.1));
      smoothMouse.y.set(lerp(smoothY, y, 0.1));
      plane.current.material.uniforms.uDelta.value = {
        x: x - smoothX,
        y: -1 * (y - smoothY)
      };
    }
  });

  const x = useTransform(smoothMouse.x, [0, dimension.width], [-1 * viewport.width / 2, viewport.width / 2]);
  const y = useTransform(smoothMouse.y, [0, dimension.height], [viewport.height / 2, -1 * viewport.height / 2]);

  return (
    <motion.mesh position-x={x} position-y={y} ref={plane} scale={scale}>
      <planeGeometry args={[1, 1, 15, 15]} />
      <meshBasicMaterial wireframe={true} color="red" />
      <shaderMaterial
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms.current}
        transparent={true}
      />
    </motion.mesh>
  );
}