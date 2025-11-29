import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import lab1 from "../assets/lab-04.webp";
import lab2 from "../assets/lab2.webp";
import lab3 from "../assets/lab3.webp";
import lab4 from "../assets/lab4.webp";
import lab5 from "../assets/lab5.webp";
interface CarouselImage {
  id: string;
  url: string;
  alt: string;
}

interface ImageCarouselProps {
  images?: CarouselImage[];
  autoPlay?: boolean;
  interval?: number;
}

const ImageCarousel = ({
  images = [
    {
      id: "1",
      url: lab1,
      alt: "imagen1",
    },
    {
      id: "2",
      url: lab2,
      alt: "Imagen 2",
    },
    {
      id: "3",
      url: lab3,
      alt: "Imagen 3",
    },
    {
      id: "4",
      url: lab4,
      alt: "Imagen 4",
    },
    {
      id: "5",
      url: lab5,
      alt: "Imagen 5",
    },
  ],
  autoPlay = true,
  interval = 5000,
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    // setIsTransitioning(true);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    // setIsTransitioning(true);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    // setIsTransitioning(true);
  };

  return (
    <div
      className="w-full h-full relative rounded-2xl overflow-hidden shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
          </div>
        ))}

        <button
          onClick={goToPrevious}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-[#a00000] text-white p-3 rounded-full hover:bg-[#8a0000] transition-all duration-300 hover:scale-110 shadow-lg ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-[#a00000] text-white p-3 rounded-full hover:bg-[#8a0000] transition-all duration-300 hover:scale-110 shadow-lg ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "bg-white w-8 h-3"
                  : "bg-white/50 w-3 h-3 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
