import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { useMap } from "react-map-gl";

type DioramaGalleryProps = {
  handleChange: (index: number) => void;
  dioramas: { name: string; location: { lat: number; lng: number } }[];
};

export default function DioramaGallery({
  handleChange,
  dioramas,
}: DioramaGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();

  const [current, setCurrent] = useState(0);

  const mapRef = useMap();
  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      const currentIndex = api.selectedScrollSnap();
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: dioramas[currentIndex].location,
          zoom: 17,
          duration: 2000,
          pitch: 60,
          bearing: mapRef.current.getBearing() + 90,
        });
        setCurrent(currentIndex);
      }
    });
  }, [api, mapRef, dioramas]);

  useEffect(() => {
    handleChange(current);
  }, [current, handleChange]);

  function handleClick() {
    const pitch = mapRef.current?.getPitch();
    if (pitch && pitch > 0) {
      !mapRef.current?.isMoving() &&
        mapRef.current?.flyTo({ pitch: 0, duration: 1200, zoom: 15 });
    } else {
      !mapRef.current?.isMoving() &&
        mapRef.current?.flyTo({ pitch: 60, duration: 1200, zoom: 17 });
    }
  }

  return (
    <Carousel
      className="w-full max-w-[12rem] lg:max-w-sm"
      setApi={setApi}
      opts={{ loop: true }}
    >
      <CarouselContent>
        {dioramas.map((item, index) => {
          return (
            <CarouselItem key={index}>
              <h1
                className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-7xl text-gray-800 text-center"
                style={{ textShadow: "0px 0px 5px white" }}
              >
                <p>{item.name}</p>
              </h1>
              <h2
                className="text-center italic text-gray-700 text-sm font-bold"
                style={{ textShadow: "0px 0px 5px white" }}
              >
                {item.location.lat.toFixed(6)} ; {item.location.lng.toFixed(6)}
              </h2>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="flex justify-center">
        <Button onClick={handleClick}>Pitch</Button>
      </div>

      <CarouselPrevious className="" />
      <CarouselNext className="" />
    </Carousel>
  );
}
