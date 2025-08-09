import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PhotoCarouselProps {
  photos: string[]
  personName: string
}

export function PhotoCarousel({ photos, personName }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

  if (photos.length === 1) {
    return (
      <img 
        src={photos[0]} 
        alt={personName}
        className="w-32 h-32 rounded-full object-cover mx-auto shadow-primary border-4 border-primary/20"
      />
    )
  }

  return (
    <div className="relative">
      <img 
        src={photos[currentIndex]} 
        alt={`${personName} - Photo ${currentIndex + 1}`}
        className="w-32 h-32 rounded-full object-cover mx-auto shadow-primary border-4 border-primary/20 transition-smooth"
      />
      
      {/* Navigation buttons */}
      <Button
        onClick={prevPhoto}
        variant="outline"
        size="sm"
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 p-0 glass-card border-primary/20 hover:bg-primary/20"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      
      <Button
        onClick={nextPhoto}
        variant="outline"
        size="sm"
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 p-0 glass-card border-primary/20 hover:bg-primary/20"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
      
      {/* Photo indicators */}
      <div className="flex justify-center gap-2 mt-3">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-smooth ${
              index === currentIndex ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>
    </div>
  )
}