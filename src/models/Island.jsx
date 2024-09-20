import React, { useEffect, useRef, useCallback } from 'react';
import { useGLTF } from '@react-three/drei';
import { a } from '@react-spring/three';
import islandScene from "../assets/3d/island.glb";
import { useFrame, useThree } from '@react-three/fiber';

const Island = ({ isRotating, setIsRotating, setCurrentStage, currentFocusPoint, ...props }) => {
  const islandRef = useRef();
  const { nodes, materials } = useGLTF(islandScene);
  const { gl, viewport } = useThree();
  const lastX = useRef(0);
  const rotationSpeed = useRef(.01);
  const dampingFactor = 0.95;

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  }, [setIsRotating]);

  const handlePointerUp = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  }, [setIsRotating]);

  const handlePointerMove = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
      lastX.current = clientX;

      if (islandRef.current) {
        islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      }
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  }, [isRotating, viewport.width]);

  const handleKeydown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      setIsRotating(true);
      if (islandRef.current) {
        islandRef.current.rotation.y += 0.01 * Math.PI;
        rotationSpeed.current = 0.0125 * Math.PI;
      }
    } else if (e.key === 'ArrowRight') {
      setIsRotating(true);
      if (islandRef.current) {
        islandRef.current.rotation.y -= 0.01 * Math.PI;
        rotationSpeed.current = -0.0125 * Math.PI;
      }
    }
  }, [setIsRotating]);

  const handleKeyUp = useCallback((e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      setIsRotating(false);
    }
  }, [setIsRotating]);

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerMove, handlePointerUp, handleKeydown, handleKeyUp]);

  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.0002) {
        rotationSpeed.current = .0002;
      }
    }
  
    if (islandRef.current) {
      islandRef.current.rotation.y += rotationSpeed.current;
  
      const rotation = islandRef.current.rotation.y;
      const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
    }
  });
  

  return (
    <a.group ref={islandRef} {...props} dispose={null}>
      <mesh
        geometry={nodes.polySurface944_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface945_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface946_tree2_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface947_tree1_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface948_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.polySurface949_tree_body_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        geometry={nodes.pCube11_rocks1_0.geometry}
        material={materials.PaletteMaterial001}
      />
    </a.group>
  );
};

useGLTF.preload(islandScene);

export default Island;
