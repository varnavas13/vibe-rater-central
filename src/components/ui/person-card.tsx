import { Button } from "@/components/ui/button"
import { RatingSlider } from "@/components/ui/rating-slider"
import { useState } from "react"
import { Laugh, Eye, Brain } from "lucide-react"

interface PersonCardProps {
  person: {
    id: string
    name: string
    photo_url: string
  }
  onRatingSubmit: (personId: string, ratings: {
    humour: number
    appearance: number
    intelligence: number
  }) => void
}

export function PersonCard({ person, onRatingSubmit }: PersonCardProps) {
  const [humourRating, setHumourRating] = useState([5])
  const [appearanceRating, setAppearanceRating] = useState([5])
  const [intelligenceRating, setIntelligenceRating] = useState([5])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    onRatingSubmit(person.id, {
      humour: humourRating[0],
      appearance: appearanceRating[0],
      intelligence: intelligenceRating[0]
    })
    setIsSubmitted(true)
    
    // Reset after 2 seconds for demo purposes
    setTimeout(() => {
      setIsSubmitted(false)
      setHumourRating([5])
      setAppearanceRating([5])
      setIntelligenceRating([5])
    }, 2000)
  }

  return (
    <div className="max-w-md mx-auto">
      {/* Person Photo & Info */}
      <div className="glass-card p-6 rounded-3xl mb-6 text-center shadow-glow">
        <div className="relative inline-block mb-4">
          <img 
            src={person.photo_url} 
            alt={person.name}
            className="w-32 h-32 rounded-full object-cover mx-auto shadow-primary border-4 border-primary/20"
          />
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
      </div>

      {/* Submit Button */}
      <Button 
        onClick={handleSubmit}
        disabled={isSubmitted}
        className="w-full py-6 text-lg font-semibold gradient-primary border-0 hover:scale-105 transition-bounce shadow-primary disabled:opacity-70"
      >
        {isSubmitted ? "✨ Rating Submitted!" : "Submit Rating"}
      </Button>
    </div>
  )
}