import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { XCircle, Clock, Eye, AlertTriangle } from "lucide-react"

const problems = [
  {
    icon: XCircle,
    title: "Frustrating User Experience",
    description:
      "Users abandon 12% of checkouts due to captcha failures. Every puzzle is friction that drives customers away.",
  },
  {
    icon: Clock,
    title: "Wasted Time",
    description:
      "Humans spend 500 years per day solving captchas globally. That's time your users could spend with your product.",
  },
  {
    icon: Eye,
    title: "Privacy Invasion",
    description:
      "Traditional verification collects personal data you don't need. ID scans, phone numbers, and biometrics create liability.",
  },
  {
    icon: AlertTriangle,
    title: "Bots Still Get Through",
    description:
      "AI can now solve most captchas faster than humans. Your verification is stopping real users, not bots.",
  },
]

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { threshold: 0.2 })

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-destructive/5 to-background" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <span className="text-destructive font-medium text-sm uppercase tracking-wider">
            The Problem
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            Captchas Are Broken
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Traditional verification methods create friction, invade privacy,
            and fail to stop sophisticated attacks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <div
              key={problem.title}
              className={`group p-8 rounded-2xl bg-card border border-border hover:border-destructive/50 transition-all duration-500 ${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-destructive/10 text-destructive group-hover:scale-110 transition-transform">
                  <problem.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visual comparison */}
        <div
          className={`mt-16 p-8 rounded-3xl bg-card border border-border transition-all duration-700 delay-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                The Old Way
              </h3>
              <div className="space-y-3">
                {[
                  "Click all the traffic lights...",
                  "Type the distorted text...",
                  "Upload your government ID...",
                  "Wait 24-48 hours for approval...",
                ].map((step, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <span className="line-through">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl bg-secondary/50 border border-border flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="grid grid-cols-3 gap-2 mb-4 opacity-50">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded bg-muted-foreground/20"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Select all squares with traffic lights
                  </p>
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                    <XCircle className="w-16 h-16 text-destructive" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
