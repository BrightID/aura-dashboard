import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs"
import { BarChart3, Zap, CreditCard, Settings, Activity } from "lucide-react"
import type { Project } from "~/components/projects-table"
import OverviewSection from "./overview"
import ProjectUsage from "./usage"
import ProjectBilling from "./billing"
import { SettingsTab } from "./settings"
import ProjectActivity from "./activity"

export function ProjectTabs({ project }: { project: Project }) {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="bg-muted/50">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" /> Overview
        </TabsTrigger>
        <TabsTrigger value="usage" className="flex items-center gap-2">
          <Zap className="h-4 w-4" /> Usage
        </TabsTrigger>
        <TabsTrigger value="billing" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" /> Billing
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex items-center gap-2">
          <Settings className="h-4 w-4" /> Settings
        </TabsTrigger>
        <TabsTrigger value="activity" className="flex items-center gap-2">
          <Activity className="h-4 w-4" /> Activity
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <OverviewSection project={project} />
      </TabsContent>
      <TabsContent value="usage">
        <ProjectUsage project={project} />
      </TabsContent>
      <TabsContent value="billing">
        <ProjectBilling project={project} />
      </TabsContent>
      <TabsContent value="settings">
        <SettingsTab project={project} />
      </TabsContent>
      <TabsContent value="activity">
        <ProjectActivity project={project} />
      </TabsContent>
    </Tabs>
  )
}
