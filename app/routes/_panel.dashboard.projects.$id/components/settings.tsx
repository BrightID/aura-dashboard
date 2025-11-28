import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { ImageIcon } from "lucide-react"
import type { Project } from "~/components/projects-table"

export function SettingsTab({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure your project settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Project Name</p>
                <p className="text-sm text-muted-foreground">{project.name}</p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Description</p>
                <p className="text-sm text-muted-foreground">
                  {project.description || "No description"}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Website URL</p>
                <p className="text-sm text-muted-foreground">
                  {project.websiteUrl || "Not set"}
                </p>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Project Status</p>
                <p className="text-sm text-muted-foreground">
                  {project.isActive ? "Active" : "Inactive"}
                </p>
              </div>
              <Button variant="outline" size="sm">
                {project.isActive ? "Deactivate" : "Activate"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Branding</CardTitle>
          <CardDescription>Customize your project appearance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Logo</p>
                <p className="text-sm text-muted-foreground">
                  {project.logoUrl
                    ? "Custom logo uploaded"
                    : "No logo uploaded"}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Upload
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium">Project Image</p>
                <p className="text-sm text-muted-foreground">
                  {project.image ? "Image uploaded" : "No image uploaded"}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Upload
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integration</CardTitle>
          <CardDescription>BrightID integration settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">BrightID App ID</p>
              <code className="text-sm bg-muted px-2 py-1 rounded mt-1 inline-block">
                {project.brightIdAppId}
              </code>
            </div>
            <Button variant="outline" size="sm">
              Copy
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
