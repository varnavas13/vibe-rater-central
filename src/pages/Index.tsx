import { useState } from "react"
import { PersonCard } from "@/components/ui/person-card"
import { Leaderboard } from "@/components/ui/leaderboard"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Import images
import person1 from "@/assets/person1.jpg"
import person1Alt from "@/assets/person1-alt.jpg"
import person2 from "@/assets/person2.jpg"
import person2Alt from "@/assets/person2-alt.jpg"
import person3 from "@/assets/person3.jpg"

interface Person {
  id: string
  name: string
  photos: string[]
}

interface Rating {
  humour: number
  appearance: number
  intelligence: number
  girlfriendMaterial: number
}

interface LeaderboardEntry {
  id: string
  name: string
  photos: string[]
  totalScore: number
  humourScore: number
  appearanceScore: number
  intelligenceScore: number
  girlfriendMaterialScore: number
  ratingsCount: number
}

const mockPeople: Person[] = [
  { id: "1", name: "Alex Johnson", photos: [person1, person1Alt] },
  { id: "2", name: "Sam Wilson", photos: [person2, person2Alt] },
  { id: "3", name: "Riley Chen", photos: [person3] },
]

const Index = () => {
  const [currentView, setCurrentView] = useState<"rating" | "leaderboard">("rating")
  const [ratedPeople, setRatedPeople] = useState<Set<string>>(new Set())
  const [availablePeople, setAvailablePeople] = useState<Person[]>(mockPeople)
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([
    {
      id: "1",
      name: "Alex Johnson",
      photos: [person1, person1Alt],
      totalScore: 7.5,
      humourScore: 8.2,
      appearanceScore: 7.1,
      intelligenceScore: 7.3,
      girlfriendMaterialScore: 7.4,
      ratingsCount: 15
    },
    {
      id: "2", 
      name: "Sam Wilson",
      photos: [person2, person2Alt],
      totalScore: 8.1,
      humourScore: 7.8,
      appearanceScore: 8.5,
      intelligenceScore: 7.9,
      girlfriendMaterialScore: 8.2,
      ratingsCount: 12
    },
    {
      id: "3",
      name: "Riley Chen", 
      photos: [person3],
      totalScore: 7.9,
      humourScore: 8.8,
      appearanceScore: 7.2,
      intelligenceScore: 7.7,
      girlfriendMaterialScore: 7.5,
      ratingsCount: 18
    }
  ])

  const { toast } = useToast()

  const getNextPerson = () => {
    const unratedPeople = availablePeople.filter(person => !ratedPeople.has(person.id))
    if (unratedPeople.length === 0) {
      // Reset if everyone has been rated
      setRatedPeople(new Set())
      return availablePeople[0]
    }
    return unratedPeople[0]
  }

  const handleRatingSubmit = (personId: string, ratings: Rating) => {
    // Add to rated people
    setRatedPeople(prev => new Set([...prev, personId]))
    
    // Update leaderboard data
    setLeaderboardData(prev => prev.map(entry => {
      if (entry.id === personId) {
        const newRatingsCount = entry.ratingsCount + 1
        const newHumourScore = ((entry.humourScore * entry.ratingsCount) + ratings.humour) / newRatingsCount
        const newAppearanceScore = ((entry.appearanceScore * entry.ratingsCount) + ratings.appearance) / newRatingsCount
        const newIntelligenceScore = ((entry.intelligenceScore * entry.ratingsCount) + ratings.intelligence) / newRatingsCount
        const newGirlfriendMaterialScore = ((entry.girlfriendMaterialScore * entry.ratingsCount) + ratings.girlfriendMaterial) / newRatingsCount
        const newTotalScore = (newHumourScore + newAppearanceScore + newIntelligenceScore + newGirlfriendMaterialScore) / 4

        return {
          ...entry,
          totalScore: newTotalScore,
          humourScore: newHumourScore,
          appearanceScore: newAppearanceScore,
          intelligenceScore: newIntelligenceScore,
          girlfriendMaterialScore: newGirlfriendMaterialScore,
          ratingsCount: newRatingsCount
        }
      }
      return entry
    }))

    toast({
      title: "Rating submitted! ⭐",
      description: `Thanks for rating ${availablePeople.find(p => p.id === personId)?.name}!`,
    })
  }

  const handleSkip = () => {
    const currentPerson = getNextPerson()
    setRatedPeople(prev => new Set([...prev, currentPerson.id]))
    
    toast({
      title: "Skipped! ⏭️",
      description: `Moving to the next person...`,
    })
  }

  const currentPerson = getNextPerson()

  if (!currentPerson) {
    return (
      <div className="min-h-screen p-4 pt-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">You've rated everyone! 🎉</h2>
          <Button onClick={() => setRatedPeople(new Set())} className="gradient-primary">
            Start Over
          </Button>
        </div>
      </div>
    )
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
        person={currentPerson}
        onRatingSubmit={handleRatingSubmit}
        onSkip={handleSkip}
      />
    </div>
  )
}

export default Index