"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useVideoAutoplay } from "@/hooks/useVideoAutoplay"

interface SkillCardProps {
  videoSrc: string
  title: string
  hook: string
  description: string
  index: number
}

export function SkillCard({ videoSrc, title, hook, description, index }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const {
    videoRef,
    containerRef,
    isVisible,
    playVideo
  } = useVideoAutoplay({
    threshold: 0.3,
    rootMargin: "0px 0px 100px 0px",
    resetOnExit: true
  })

  const handleMouseEnter = () => {
    setIsHovered(true)
    playVideo()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleTouchStart = () => {
    playVideo()
  }

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative group overflow-hidden rounded-lg border border-gray-800 bg-black flex flex-col md:flex-row",
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
    >
      <div className="w-full md:w-1/3 aspect-square bg-gray-900 overflow-hidden relative md:rounded-l-lg md:rounded-r-none rounded-t-lg"> 
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          poster="/assets/ui/video-placeholder.svg"
          className="w-full h-full object-cover"
        />
      </div>

      <div className={cn(
          "flex-1 p-6 flex flex-col justify-between",
          videoSrc ? "md:w-2/3" : "w-full"
      )}>
        <div>
          <h3 className="text-2xl font-bold text-gray-200 mb-1">{title}</h3>
          <p className="text-md text-pink-400 mb-3">{hook}</p>
          
          <div className="mb-4">
            <p className={cn(
              "text-gray-400 transition-all duration-300 text-sm"
            )}>
              {description}
            </p>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      />
    </motion.div>
  )
}
