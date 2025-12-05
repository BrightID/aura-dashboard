import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs"
import {
  BarChart3,
  Zap,
  CreditCard,
  Settings,
  Activity,
  SunDim,
  SunDimIcon,
  View,
} from "lucide-react"
import OverviewSection from "./overview"
import ProjectUsage from "./usage"
import ProjectBilling from "./billing"
import { SettingsTab } from "./settings"
import { BrightIdSettingsForm } from "./brightid-settings"
import type { Project } from "~/types/projects"

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
        <TabsTrigger value="brightid" className="flex items-center gap-2">
          <SunDimIcon className="h-5 w-5" /> Bright ID
        </TabsTrigger>
        <TabsTrigger value="preview" className="flex items-center gap-2">
          <View className="h-4 w-4" /> Preview
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
      <TabsContent value="brightid">
        <BrightIdSettingsForm initialData={project.brightIdApp as never} />
      </TabsContent>
    </Tabs>
  )
}
