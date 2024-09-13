"use client";

import { useState } from "react";
import {
  FullscreenControl,
  GeolocateControl,
  Map,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import DioramaGallery from "./diorama-gallery";
import { Canvas } from "react-three-map";
import { CopanSimp } from "./Copan_simp";
import { BanespaSimp } from "./Banespa-simp";
import { SescPaulistaSimp } from "./Sesc_paulista";
import { PavilhaoJaponesSimp } from "./Pavilhao_japones";
import Title from "./title";

const dioramas = [
  {
    name: "Ed. Copan",
    location: { lat: -23.546492191359455, lng: -46.64447371764165 },
    modelComp: (
      <CopanSimp
        scale={0.34}
        position={[0, -1240 * 0.34, 0]}
        opacity={0.1}
      ></CopanSimp>
    ),
    model: "CopanSimp",
  },
  {
    name: "Ed. Banespa",
    location: { lat: -23.545564167314836, lng: -46.63357596242248 },
    modelComp: (
      <BanespaSimp
        scale={0.34}
        position={[0, -1240 * 0.34, 0]}
        opacity={0.1}
      ></BanespaSimp>
    ),
    model: "BanespaSimp",
  },
  {
    name: "Sesc Paulista",
    location: { lat: -23.570365239269936, lng: -46.64536051214361 },
    modelComp: (
      <SescPaulistaSimp
        scale={0.34}
        position={[0, -1240 * 0.34, 0]}
        opacity={0.1}
      ></SescPaulistaSimp>
    ),
    model: "BanespaSimp",
  },
  {
    name: "Pavilhão Japonês",
    location: { lat: -23.585841070524463, lng: -46.66139844585649 },
    modelComp: (
      <PavilhaoJaponesSimp
        scale={0.34}
        position={[0, -1240 * 0.34, 0]}
        opacity={0.1}
      ></PavilhaoJaponesSimp>
    ),
    model: "BanespaSimp",
  },
];

export default function ClientMap() {
  const [viewState, setViewState] = useState({
    latitude: dioramas[0].location.lat,
    longitude: dioramas[0].location.lng,
    zoom: 15,
    pitch: 0,
  });

  const [showGallery, setShowGallery] = useState(false);

  const [current, setCurrent] = useState(0);

  function handleChange(index: number) {
    setCurrent(index);
    console.log(index);
  }

  function handleStart() {
    setShowGallery(true);
  }

  return (
    <div style={{ height: "100svh", width: "100svw" }}>
      <Map
        initialViewState={{
          latitude: dioramas[0].location.lat,
          longitude: dioramas[0].location.lng,
          zoom: 15,
          pitch: 0,
        }}
        reuseMaps
        antialias
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
      >
        <FullscreenControl containerId="total-container"></FullscreenControl>
        <NavigationControl showZoom></NavigationControl>
        <GeolocateControl></GeolocateControl>
        <ScaleControl></ScaleControl>

        <div>
          <Title showGallery={showGallery} handleStart={handleStart}></Title>
          <AnimatePresence>
            {showGallery && (
              <motion.div
                className="absolute top-[10%] left-1/2 p-2 mr-auto ml-auto z-10 isolate -translate-x-1/2 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <DioramaGallery
                  handleChange={handleChange}
                  dioramas={dioramas}
                ></DioramaGallery>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {dioramas.map((item, index) => {
          return (
            <Marker
              key={index}
              longitude={item.location.lng}
              latitude={item.location.lat}
            ></Marker>
          );
        })}

        <Canvas
          latitude={dioramas[current].location.lat}
          longitude={dioramas[current].location.lng}
        >
          <hemisphereLight
            args={["#ffffff", "#60666C"]}
            position={[1, 4.5, 3]}
            intensity={Math.PI}
          />
          <ambientLight intensity={3} />
          {dioramas[current].modelComp && dioramas[current].modelComp}
        </Canvas>
      </Map>
    </div>
  );
}
