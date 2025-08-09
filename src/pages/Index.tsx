import { useState } from "react"
import { PersonCard } from "@/components/ui/person-card"
import { Leaderboard } from "@/components/ui/leaderboard"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Import images
import person1 from "@/assets/person1.jpg"
import person2 from "@/assets/person2.jpg"
import person3 from "@/assets/person3.jpg"

interface Person {
  id: string
  name: string
  photo_url: string
}

interface Rating {
  humour: number
  appearance: number
  intelligence: number
}

interface LeaderboardEntry {
  id: string
  name: string
  photo_url: string
  totalScore: number
  humourScore: number
  appearanceScore: number
  intelligenceScore: number
  ratingsCount: number
}

const mockPeople: Person[] = [
  { id: "1", name: "Alex Johnson", photo_url: person1 },
  { id: "2", name: "Sam Wilson", photo_url: person2 },
  { id: "3", name: "Riley Chen", photo_url: person3 },
]

const Index = () => {
  const [currentView, setCurrentView] = useState<"rating" | "leaderboard">("rating")
  const [currentPersonIndex, setCurrentPersonIndex] = useState(0)
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([
    {
      id: "1",
      name: "Alex Johnson",
      photo_url: person1,
      totalScore: 7.5,
      humourScore: 8.2,
      appearanceScore: 7.1,
      intelligenceScore: 7.3,
      ratingsCount: 15
    },
    {
      id: "2", 
      name: "Sam Wilson",
      photo_url: person2,
      totalScore: 8.1,
      humourScore: 7.8,
      appearanceScore: 8.5,
      intelligenceScore: 7.9,
      ratingsCount: 12
    },
    {
      id: "3",
      name: "Riley Chen", 
      photo_url: person3,
      totalScore: 7.9,
      humourScore: 8.8,
      appearanceScore: 7.2,
      intelligenceScore: 7.7,
      ratingsCount: 18
    }
  ])

  const { toast } = useToast()

  const handleRatingSubmit = (personId: string, ratings: Rating) => {
    // Update leaderboard data
    setLeaderboardData(prev => prev.map(entry => {
      if (entry.id === personId) {
        const newRatingsCount = entry.ratingsCount + 1
        const newHumourScore = ((entry.humourScore * entry.ratingsCount) + ratings.humour) / newRatingsCount
        const newAppearanceScore = ((entry.appearanceScore * entry.ratingsCount) + ratings.appearance) / newRatingsCount
        const newIntelligenceScore = ((entry.intelligenceScore * entry.ratingsCount) + ratings.intelligence) / newRatingsCount
        const newTotalScore = (newHumourScore + newAppearanceScore + newIntelligenceScore) / 3

        return {
          ...entry,
          totalScore: newTotalScore,
          humourScore: newHumourScore,
          appearanceScore: newAppearanceScore,
          intelligenceScore: newIntelligenceScore,
          ratingsCount: newRatingsCount
        }
      }
      return entry
    }))

    toast({
      title: "Rating submitted! ⭐",
      description: `Thanks for rating ${mockPeople.find(p => p.id === personId)?.name}!`,
    })

    // Move to next person
    setTimeout(() => {
      setCurrentPersonIndex((prev) => (prev + 1) % mockPeople.length)
    }, 1500)
  }

  if (currentView === "leaderboard") {
    return (
      <div className="min-h-screen p-4 pt-8">
        <Leaderboard 
          entries={leaderboardData}
          onBackToRating={() => setCurrentView("rating")}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 pt-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="gradient-primary bg-clip-text text-transparent">RankEm</span>
        </h1>
        <p className="text-lg text-muted-foreground mb-6">
          Rate people across different categories and see who tops the leaderboard!
        </p>
        
        <Button 
          onClick={() => setCurrentView("leaderboard")}
          variant="outline"
          className="glass-card border-primary/20 hover:gradient-secondary transition-bounce px-6 py-3"
        >
          <Trophy className="w-5 h-5 mr-2" />
          View Leaderboard
        </Button>
      </div>

      {/* Current Person Card */}
      <PersonCard 
        person={mockPeople[currentPersonIndex]}
        onRatingSubmit={handleRatingSubmit}
      />

      {/* Person Counter */}
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Person {currentPersonIndex + 1} of {mockPeople.length}
        </p>
        <div className="flex justify-center gap-2 mt-2">
          {mockPeople.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-smooth ${
                index === currentPersonIndex ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Index