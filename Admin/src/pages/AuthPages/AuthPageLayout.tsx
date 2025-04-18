import React, { useEffect, useRef, useState } from "react";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.jpg";
import img5 from "../../assets/img5.jpg";
import img6 from "../../assets/img6.jpg";

const images = [img1, img2, img3, img4, img5, img6];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const slide = sliderRef.current?.children[0] as HTMLElement;
    if (slide && sliderRef.current) {
      const slideWidth = slide.clientWidth;
      sliderRef.current.style.transform = `translateX(-${
        currentSlide * slideWidth
      }px)`;
    }
  }, [currentSlide]);

  return (
    <div className="relative p-10 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-50 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1 ">
            <div className="flex flex-col items-center p-5">
              <div className="w-full h-[95vh] max-w-3xl overflow-hidden relative rounded-xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  ref={sliderRef}
                >
                  {images.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      className="w-full object-cover flex-shrink-0"
                      alt={`Slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-7 right-10 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
