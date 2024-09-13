import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useMap } from "react-map-gl";

type TitleProps = {
  showGallery: boolean;
  handleStart: () => void;
};

export default function Title({ showGallery, handleStart }: TitleProps) {
  const mapRef = useMap();
  function handleClick() {
    handleStart();
    if (mapRef.current) {
      mapRef.current.flyTo({ zoom: 17, duration: 2000, pitch: 60 });
    }
  }
  return (
    <AnimatePresence>
      {showGallery === false && (
        <motion.div
          className="absolute top-[10%] left-1/2 p-2 mr-auto ml-auto z-10 isolate -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <h1
            className="scroll-m-20 text-6xl font-extrabold tracking-tight lg:text-8xl text-zinc-600"
            style={{ textShadow: "0px 0px 5px white" }}
          >
            <p>São Paulo</p>
            <p>em Miniatura</p>
          </h1>
          <div>
            <Button
              onClick={handleClick}
              className="align-center mt-4 bg-purple-600 hover:bg-purple-400 hover:scale-110"
            >
              Iniciar
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
