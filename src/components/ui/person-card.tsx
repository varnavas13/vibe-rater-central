import { Button } from "@/components/ui/button"
import { RatingSlider } from "@/components/ui/rating-slider"
import { PhotoCarousel } from "@/components/ui/photo-carousel"
import { useState } from "react"
import { Laugh, Eye, Brain, Heart, X } from "lucide-react"

interface PersonCardProps {
  person: {
    id: string
    name: string
    photos: string[]
  }
  onRatingSubmit: (personId: string, ratings: {
    humour: number
    appearance: number
    intelligence: number
    girlfriendMaterial: number
  }) => void
  onSkip: () => void
}

export function PersonCard({ person, onRatingSubmit, onSkip }: PersonCardProps) {
  const [humourRating, setHumourRating] = useState([5])
  const [appearanceRating, setAppearanceRating] = useState([5])
  const [intelligenceRating, setIntelligenceRating] = useState([5])
  const [girlfriendMaterialRating, setGirlfriendMaterialRating] = useState([5])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    onRatingSubmit(person.id, {
      humour: humourRating[0],
      appearance: appearanceRating[0],
      intelligence: intelligenceRating[0],
      girlfriendMaterial: girlfriendMaterialRating[0]
    })
    setIsSubmitted(true)
    
    // Reset after 2 seconds for demo purposes
    setTimeout(() => {
      setIsSubmitted(false)
      setHumourRating([5])
      setAppearanceRating([5])
      setIntelligenceRating([5])
      setGirlfriendMaterialRating([5])
    }, 2000)
  }

  const handleSkip = () => {
    onSkip()
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Person Photo & Info */}
      <div className="glass-card p-6 rounded-3xl mb-6 text-center shadow-glow relative">
        {/* Skip button */}
        <Button
          onClick={handleSkip}
          variant="outline"
          size="sm"
          className="absolute top-4 right-4 w-10 h-10 p-0 glass-card border-muted/20 hover:bg-destructive/20 hover:border-destructive/40"
        >
          <X className="w-4 h-4" />
        </Button>
        
        <div className="relative inline-block mb-4">
          <PhotoCarousel photos={person.photos} personName={person.name} />
          <div className="absolute -bottom-2 -right-2 w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
            ⭐
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">{person.name}</h2>
        <p className="text-muted-foreground">Rate this person across categories</p>
      </div>

      {/* Rating Sliders */}
      <div className="space-y-4 mb-6">
        <RatingSlider 
          category="Humor"
          icon={<Laugh className="text-primary" />}
          value={humourRating}
          onValueChange={setHumourRating}
        />
        
        <RatingSlider 
          category="Appearance"
          icon={<Eye className="text-primary" />}
          value={appearanceRating}
          onValueChange={setAppearanceRating}
        />
        
        <RatingSlider 
          category="Intelligence"
          icon={<Brain className="text-primary" />}
          value={intelligenceRating}
          onValueChange={setIntelligenceRating}
        />
        
        <RatingSlider 
          category="Girlfriend Material"
          icon={<Heart className="text-primary" />}
          value={girlfriendMaterialRating}
          onValueChange={setGirlfriendMaterialRating}
        />
      </div>

      {/* Submit Button */}
      <div className="flex gap-3">
        <Button 
          onClick={handleSkip}
          variant="outline"
          className="flex-1 py-6 text-lg font-semibold glass-card border-muted/20 hover:bg-destructive/20 hover:border-destructive/40 transition-bounce"
        >
          <X className="w-5 h-5 mr-2" />
          Skip
        </Button>
        
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitted}
          className="flex-1 py-6 text-lg font-semibold gradient-primary border-0 hover:scale-105 transition-bounce shadow-primary disabled:opacity-70"
        >
          {isSubmitted ? "✨ Rated!" : "Submit Rating"}
        </Button>
      </div>
    </div>
  )
}