"use client"

import { useState } from "react"
import { Package } from "lucide-react"

interface ProductImageProps {
  src?: string | null
  alt: string
  className?: string
  fallbackClassName?: string
  iconSize?: "sm" | "md" | "lg"
}

export function ProductImage({ 
  src, 
  alt, 
  className = "", 
  fallbackClassName = "",
  iconSize = "md" 
}: ProductImageProps) {
  const [imageError, setImageError] = useState(false)

  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-16 h-16", 
    lg: "w-24 h-24"
  }

  const handleImageError = () => {
    setImageError(true)
  }

  if (!src || imageError) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/20 flex items-center justify-center ${fallbackClassName}`}>
        <Package className={`${iconSizes[iconSize]} text-muted-foreground/50`} />
      </div>
    )
  }

  return (
    <img 
      src={src} 
      alt={alt}
      className={className}
      onError={handleImageError}
    />
  )
}
