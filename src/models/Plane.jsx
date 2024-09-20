import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import planeScene from "../assets/3d/plane.glb";

const Plane = ({ isRotating, ...props }) => {
  const ref = useRef();
  const { scene, animations } = useGLTF(planeScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    const action = actions['Take 001'];
    if (isRotating) {
      action.play();
    } else {
      action.play();
    }
  }, [actions, isRotating]);

  // useFrame(() => {
  //   if (isRotating && ref.current) {
  //     ref.current.rotation.y += 0.01; // Adjust the rotation speed as needed
  //   }
  // });

  return (
    <mesh {...props} ref={ref}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Plane;
