import { Trophy, Medal, Award, Laugh, Eye, Brain, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

interface LeaderboardProps {
  entries: LeaderboardEntry[]
  onBackToRating: () => void
}

export function Leaderboard({ entries, onBackToRating }: LeaderboardProps) {
  const getRankIcon = (position: number) => {
    switch(position) {
      case 1: return <Trophy className="text-rank-gold" size={24} />
      case 2: return <Medal className="text-rank-silver" size={24} />
      case 3: return <Award className="text-rank-bronze" size={24} />
      default: return <span className="text-2xl font-bold text-muted-foreground">#{position}</span>
    }
  }

  const getRankBadge = (position: number) => {
    if (position === 1) return "bg-rank-gold text-black"
    if (position === 2) return "bg-rank-silver text-black"
    if (position === 3) return "bg-rank-bronze text-black"
    return "bg-secondary text-foreground"
  }

  const sortedByTotal = [...entries].sort((a, b) => b.totalScore - a.totalScore)
  const sortedByHumour = [...entries].sort((a, b) => b.humourScore - a.humourScore)
  const sortedByAppearance = [...entries].sort((a, b) => b.appearanceScore - a.appearanceScore)
  const sortedByIntelligence = [...entries].sort((a, b) => b.intelligenceScore - a.intelligenceScore)
  const sortedByGirlfriendMaterial = [...entries].sort((a, b) => b.girlfriendMaterialScore - a.girlfriendMaterialScore)

  const LeaderboardList = ({ data, scoreKey }: { data: LeaderboardEntry[], scoreKey: keyof LeaderboardEntry }) => (
    <div className="space-y-3">
      {data.slice(0, 10).map((entry, index) => (
        <div key={entry.id} className="glass-card p-4 rounded-2xl transition-smooth hover:shadow-glow">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadge(index + 1)}`}>
              {getRankIcon(index + 1)}
            </div>
            
            <img 
              src={entry.photos[0]} 
              alt={entry.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
            />
            
            <div className="flex-1">
              <h3 className="font-semibold">{entry.name}</h3>
              <p className="text-sm text-muted-foreground">
                {entry.ratingsCount} rating{entry.ratingsCount !== 1 ? 's' : ''}
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {typeof entry[scoreKey] === 'number' ? (entry[scoreKey] as number).toFixed(1) : '0.0'}
              </div>
              <div className="text-xs text-muted-foreground">
                /10.0
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="glass-card p-6 rounded-3xl mb-6 text-center shadow-glow">
        <div className="text-4xl mb-2">🏆</div>
        <h1 className="text-3xl font-bold mb-2 gradient-primary bg-clip-text text-transparent">
          Leaderboard
        </h1>
        <p className="text-muted-foreground">Top rated people across all categories</p>
      </div>

      {/* Tabs for different categories */}
      <Tabs defaultValue="overall" className="mb-6">
        <TabsList className="grid w-full grid-cols-5 glass-card">
          <TabsTrigger value="overall" className="data-[state=active]:gradient-primary text-xs">
            Overall
          </TabsTrigger>
          <TabsTrigger value="humour" className="data-[state=active]:gradient-primary">
            <Laugh className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:gradient-primary">
            <Eye className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="intelligence" className="data-[state=active]:gradient-primary">
            <Brain className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger value="girlfriend" className="data-[state=active]:gradient-primary">
            <Heart className="w-4 h-4" />
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overall" className="mt-6">
          <LeaderboardList data={sortedByTotal} scoreKey="totalScore" />
        </TabsContent>
        
        <TabsContent value="humour" className="mt-6">
          <LeaderboardList data={sortedByHumour} scoreKey="humourScore" />
        </TabsContent>
        
        <TabsContent value="appearance" className="mt-6">
          <LeaderboardList data={sortedByAppearance} scoreKey="appearanceScore" />
        </TabsContent>
        
        <TabsContent value="intelligence" className="mt-6">
          <LeaderboardList data={sortedByIntelligence} scoreKey="intelligenceScore" />
        </TabsContent>
        
        <TabsContent value="girlfriend" className="mt-6">
          <LeaderboardList data={sortedByGirlfriendMaterial} scoreKey="girlfriendMaterialScore" />
        </TabsContent>
      </Tabs>

      {/* Back Button */}
      <Button 
        onClick={onBackToRating}
        variant="outline"
        className="w-full py-6 text-lg font-semibold glass-card border-primary/20 hover:gradient-secondary transition-bounce"
      >
        ← Back to Rating
      </Button>
    </div>
  )
}