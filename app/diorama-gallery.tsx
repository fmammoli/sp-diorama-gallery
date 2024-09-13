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
  }, [api, mapRef, handleChange, dioramas]);

  useEffect(() => {
    handleChange(current);
  }, [current, handleChange]);

  return (
    <Carousel className="w-full max-w-xs" setApi={setApi} opts={{ loop: true }}>
      <CarouselContent>
        {dioramas.map((item, index) => {
          return (
            <CarouselItem key={index}>
              <h1
                className="scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-7xl text-gray-700"
                style={{ textShadow: "0px 0px 5px white" }}
              >
                <p>{item.name}</p>
              </h1>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
