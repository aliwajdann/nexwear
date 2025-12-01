'use client'
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPause, FiPlay, FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import Image from 'next/image';
// import image1 from "@/Internet_20250730_210957_1.jpeg"
// import image2 from "@/Internet_20250730_210957_2.jpeg"
// import image3 from "@/Internet_20250730_210957_4.jpeg"

// Import styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<any>(null);

  const mediaItems = [
    // {
    //   type: 'image',
    //   // desktopsrc: "https://images.unsplash.com/photo-1754753674476-6eda28010f02?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
    //   desktopsrc: "https://cdn.velanoshop.store/banners/desktop-banner-one.jpg",
    //   // mobilesrc: "https://plus.unsplash.com/premium_photo-1755612015739-942bd6de858c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    //   mobilesrc: "https://cdn.velanoshop.store/banners/mobile-banner-one.jpg",
    //   alt: 'Nike Campaign',
    //   title: 'NEW COLLECTION',
    //   subtitle: 'Step into the future',
    //   description: 'Discover the latest Nike innovations designed for peak performance',
    //   buttonText: 'EXPLORE NOW'
    // },
    {
      type: 'image',
       desktopsrc: "https://plus.unsplash.com/premium_photo-1755534058913-29a8feca890f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D",
      mobilesrc: "https://images.unsplash.com/photo-1755569309049-98410b94f66d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8",
      alt: 'Nike Air Max',
      title: 'AIR MAX SERIES',
      subtitle: 'Maximum comfort, maximum style',
      description: 'Experience legendary Air Max cushioning in bold new colorways',
      buttonText: 'SHOP AIR MAX'
    },
    {
      type: 'image',
       desktopsrc: "https://plus.unsplash.com/premium_photo-1755241424289-119335c3b372?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D",
      mobilesrc: "https://images.unsplash.com/photo-1755804127231-c493579c8ce5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMnx8fGVufDB8fHx8fA%3D%3D",
      alt: 'Nike Performance',
      title: 'PERFORMANCE GEAR',
      subtitle: 'Unleash your potential',
      description: 'Professional-grade athletic wear for champions and dreamers alike',
      buttonText: 'GEAR UP'
    }
  ];

  // const togglePlayPause = () => {
  //   if (swiperRef.current?.swiper.autoplay.running) {
  //     swiperRef.current.swiper.autoplay.stop();
  //     setIsPlaying(false);
  //   } else {
  //     swiperRef.current?.swiper.autoplay.start();
  //     setIsPlaying(true);
  //   }
  // };

  const handleSlideChange = (swiper:any) => {
    setCurrentSlide(swiper.realIndex);
  };

  const contentVariants = {
    hidden: {
      y: 60,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      y: 25,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section className="md:pb-[16px] md:px-[16px]  mb-[32px] md:mb-[40px] h-lvh  relative  w-full overflow-hidden flex justify-center items-center">
      <Swiper
        ref={swiperRef}
        loop={true}
        modules={[Autoplay, Navigation, Pagination]}
        autoplay={{ 
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          waitForTransition: true
        }}
        speed={800}
        pagination={{ 
          clickable: true,
          el: '.custom-pagination',
          bulletClass: 'w-2 h-2 mx-1 rounded-full bg-white opacity-50 inline-block cursor-pointer transition-opacity',
          bulletActiveClass: '!opacity-100'
        }}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev'
        }}
        onSlideChange={handleSlideChange}
        onAutoplayTimeLeft={(_blank, _, percentage) => {
          setProgress(1 - percentage);
        }}
        className="h-full w-full"
      >
        {mediaItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full bg-black">
              {item.type === 'image' ? (
  <>
    {/* Desktop */}
    <img
      src={item.desktopsrc}
      alt={item.alt}
      className="hidden md:block w-full h-full object-cover"
      loading="eager"
      key={index}
    />
    {/* Mobile */}
    <img
  
      src={item.mobilesrc}
      alt={item.alt}
      className="block md:hidden w-full h-full object-cover"
      loading="eager"
      key={44}
    />
  </>
) : (
  <>
    {/* Desktop Video */}
    <video
      preload="auto"
      autoPlay
      muted
      loop
      playsInline
      className="hidden md:block w-full h-full object-cover"
      key={22}
    >
      {/* <source src={item.desktopVideo} type="video/mp4" /> */}
    </video>
    {/* Mobile Video */}
    <video
      preload="auto"
      autoPlay
      muted
      loop
      playsInline
      className="block md:hidden w-full h-full object-cover"
      key={33}
    >
      {/* <source src={item.src} type="video/mp4" /> */}
    </video>
  </>
)}

              
              {/* Overlay */}
              {/* <div className="absolute w-full h-full inset-0 bg-black/10" /> */}
              
              {/* Content */}
              <div className="absolute bottom-1 left-1 inset-0 flex items-center">
                <div className="container mx-auto px-4 absolute bottom-[15%] left-0.5 md:px-8 lg:px-12">
                  <AnimatePresence mode="wait">
                    {currentSlide === index && (
                      <motion.div
                        key={`content-${index}`}
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="max-w-2xl text-white"
                      >
                        <motion.h1 
                          variants={itemVariants}
                          className="text-[24px] md:text-[38px] font-bold leading-tight mb-5"
                        >
                          {item.subtitle}
                        </motion.h1>
                        
                        <motion.p 
                          variants={itemVariants}
                          className="text-[14px] md:text-[16px] text-gray-200 mb-6 max-w-lg leading-relaxed"
                        >
                          {item.description}
                        </motion.p>
                        
                        <button
                          // variants={itemVariants}
                          // whileHover={{ scale: 1.02 }}
                          // whileTap={{ scale: 0.98 }}
                          className="bg-white text-black px-5 py-2 font-medium text-[12px] tracking-wide  rounded-none border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 backdrop-blur-sm"
                        >
                          {item.buttonText}
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="custom-pagination flex justify-center"></div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-7 right-10 z-10 flex items-center space-x-4">
        {/* Previous Arrow */}
        <button className="hidden md:block custom-prev text-white p-2 rounded-full hover:bg-white/10 transition-colors">
          <FiChevronLeft size={24} />
        </button>

        {/* Play/Pause with Circular Progress */}
        <div className="relative hidden md:block">
          <svg className="w-10 h-10 transform -rotate-90">
            <circle
              cx="20"
              cy="20"
              r="9"
              fill="transparent"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
            />
            <motion.circle
              cx="20"
              cy="20"
              r="9"
              fill="transparent"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 56.5487 }}
              animate={{ strokeDashoffset: 56.5487 * (1 - progress) }}
              transition={{ duration: 0.1 }}
              strokeDasharray="56.5487"
            />
          </svg>
          <button 
            // onClick={togglePlayPause}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white hover:scale-110 transition-transform"
          >
            {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} className="ml-0.5" />}
          </button>
        </div>

        {/* Next Arrow */}
        <button className="custom-next text-white p-2 rounded-full hover:bg-white/10 transition-colors">
          <FiChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;