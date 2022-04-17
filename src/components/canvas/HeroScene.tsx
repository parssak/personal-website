import useScene from "hooks/useScene";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { fresnelMaterial } from "./FresnelMaterial";

type Props = {};

export default function HeroScene({}: Props) {
  const ref = useRef<HTMLDivElement>();

  useScene(ref, (scene, camera, renderer) => {
    const initialPosition = new THREE.Vector3(0, 1, 0);
    const base = new THREE.DodecahedronBufferGeometry(1, 0);
    const lineGeometry = new THREE.WireframeGeometry(new THREE.DodecahedronBufferGeometry(1, 1));
    const initialLineScale = 1.1;
    lineGeometry.scale(initialLineScale, initialLineScale, initialLineScale);

    const linesMesh = new THREE.LineSegments(lineGeometry);
    linesMesh.material.depthTest = true;
    linesMesh.material.opacity = 0.25;
    linesMesh.material.transparent = true;

    const material = fresnelMaterial();
    const mesh = new THREE.Mesh(base, material);

    scene.add(linesMesh);
    scene.add(mesh);

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);

    composer.addPass(renderPass);

    scene.add(mesh);
    camera.position.z = 3.5;

    const speed = 0.001;

    let cursorPosition = new THREE.Vector3();

    let time = 0;

    let boundA = 1.2;
    let boundB = 1.3;

    const animate = () => {
      requestAnimationFrame(animate);

      mesh.rotation.x += speed;
      mesh.rotation.y += speed;

      mesh.position.x = initialPosition.x;
      mesh.position.y = initialPosition.y;
      mesh.position.z = initialPosition.z;

      linesMesh.rotation.x += speed;
      linesMesh.rotation.y += speed;

      // bounce the scale of the linesMesh between 1.1 and 1.3
      const scale = Math.sin(time * 0.5) * (boundB - boundA) + boundA + 0.2;
      linesMesh.scale.set(scale, scale, scale);

      linesMesh.position.x = initialPosition.x;
      linesMesh.position.y = initialPosition.y;
      linesMesh.position.z = initialPosition.z;

      time += 0.01;
      composer.render();
    };

    animate();

    // listen for mouse movement
    const onMouseMove = (event: MouseEvent) => {
      cursorPosition.x = (event.clientX / window.innerWidth) * 2 - 1;
      cursorPosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
      cursorPosition.z = 0.5;
    };

    window.addEventListener("mousemove", onMouseMove);
  });

  return <div tabIndex={-1} ref={ref} className="w-full h-full filter invert dark:invert-0" />;
}
