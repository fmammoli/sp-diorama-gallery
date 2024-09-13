"use client";
import { useFrame, Vector3 } from "@react-three/fiber";

import "mapbox-gl/dist/mapbox-gl.css";
import { FC, useRef, useState } from "react";
import Map from "react-map-gl";
import { Canvas } from "react-three-map";
import { Mesh } from "three";

export default function Mapbox() {
  return (
    <div style={{ height: "100vh" }}>
      <Map
        antialias
        initialViewState={{
          latitude: 51,
          longitude: 0,
          zoom: 13,
          pitch: 60,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_ACCESS_TOKEN}
        style={{ height: "100svh", width: "100svw" }}
      >
        <Canvas latitude={51} longitude={0}>
          <hemisphereLight
            args={["#ffffff", "#60666C"]}
            position={[1, 4.5, 3]}
            intensity={Math.PI}
          />
          <object3D scale={500}>
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={"orange"} />
            </mesh>
          </object3D>
        </Canvas>
      </Map>
    </div>
  );
}

const Box: FC<{ position: Vector3 }> = (props) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<Mesh>(null);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((_state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta;
    ref.current.rotation.z -= delta;
  });
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
};
