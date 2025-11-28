import { Shield } from "lucide-react"
import type { Project } from "~/components/projects-table"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card"
import { Progress } from "~/components/ui/progress"
import { Separator } from "~/components/ui/separator"

export default function ProjectUsage({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Token Usage</CardTitle>
          <CardDescription>
            Monitor your token consumption and remaining allocation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Remaining Tokens
              </span>
              <span className="text-sm font-medium">
                {project.remainingtokens.toLocaleString()} / 10,000
              </span>
            </div>
            <Progress
              value={Math.min((project.remainingtokens / 10000) * 100, 100)}
              className="h-3"
            />
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-semibold">
                {project.remainingtokens.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Remaining</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-semibold">
                {(10000 - project.remainingtokens).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Used</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-3xl font-semibold">
                {((project.remainingtokens / 10000) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground mt-1">Available</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Requirement Level</CardTitle>
          <CardDescription>
            Current verification requirement for your project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold">
                {project.requirementLevel !== null
                  ? `Level ${project.requirementLevel}`
                  : "Not configured"}
              </p>
              <p className="text-sm text-muted-foreground">
                Verification requirement threshold
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
