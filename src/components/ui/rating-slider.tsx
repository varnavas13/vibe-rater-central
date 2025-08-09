import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

interface RatingSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  category: string
  icon: React.ReactNode
  value: number[]
  onValueChange: (value: number[]) => void
}

const RatingSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  RatingSliderProps
>(({ className, category, icon, value, onValueChange, ...props }, ref) => {
  const getRatingColor = (rating: number) => {
    if (rating <= 3) return "bg-rating-low"
    if (rating <= 7) return "bg-rating-medium"
    return "bg-rating-high"
  }

  const getRatingText = (rating: number) => {
    if (rating <= 2) return "Poor"
    if (rating <= 4) return "Below Average"
    if (rating <= 6) return "Average"
    if (rating <= 8) return "Good"
    return "Excellent"
  }

  return (
    <div className="glass-card p-6 rounded-2xl transition-smooth hover:shadow-glow">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl">{icon}</div>
        <div>
          <h3 className="font-semibold text-lg">{category}</h3>
          <p className="text-sm text-muted-foreground">
            {getRatingText(value[0])} ({value[0]}/10)
          </p>
        </div>
      </div>
      
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        value={value}
        onValueChange={onValueChange}
        max={10}
        min={0}
        step={1}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range 
            className={cn(
              "absolute h-full transition-smooth rounded-full",
              getRatingColor(value[0])
            )}
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-6 w-6 rounded-full border-2 border-primary bg-background ring-offset-background transition-bounce focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-110 shadow-primary" />
      </SliderPrimitive.Root>
      
      <div className="flex justify-between text-xs text-muted-foreground mt-2">
        <span>0</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  )
})
RatingSlider.displayName = "RatingSlider"

export { RatingSlider }