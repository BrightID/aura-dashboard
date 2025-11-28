"use client"

import { formatDistanceToNow, format } from "date-fns"
import {
  Globe,
  Calendar,
  Zap,
  ExternalLink,
  Settings,
  X,
  Activity,
  Clock,
  Hash,
  ArrowLeft,
  BarChart3,
  CreditCard,
  ImageIcon,
  FileText,
  Shield,
} from "lucide-react"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { Progress } from "~/components/ui/progress"
import type { Project } from "~/components/projects-table"
import { Skeleton } from "~/components/ui/skeleton"
import { useNavigate } from "react-router"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

interface ProjectDetailPanelProps {
  project: Project
  onClose: () => void
}

export function ProjectDetailPanel({
  project,
  onClose,
}: ProjectDetailPanelProps) {
  const navigate = useNavigate()

  return (
    <div className="">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 -ml-2"
            onClick={() => navigate("/dashboard/projects")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {project.logoUrl ? (
                <img
                  src={project.logoUrl || "/placeholder.svg"}
                  alt={project.name}
                  className="h-16 w-16 rounded-xl object-cover border"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-foreground/10 to-foreground/5 border">
                  <span className="text-2xl font-semibold text-foreground/70">
                    {project.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    {project.name}
                  </h1>
                  <Badge variant={project.isActive ? "default" : "secondary"}>
                    {project.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-1">
                  {project.description || "No description"}
                </p>
                {project.websiteUrl && (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1 mt-1"
                  >
                    <Globe className="h-3 w-3" />
                    {project.websiteUrl}
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {project.websiteUrl && (
                <Button variant="outline" asChild>
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Site
                  </a>
                </Button>
              )}
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Content */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="usage" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Usage
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${project.isActive ? "bg-green-500" : "bg-muted-foreground"}`}
                    />
                    <span className="text-2xl font-semibold">
                      {project.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Remaining Tokens
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-2xl font-semibold">
                    {project.remainingtokens.toLocaleString()}
                  </span>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Requirement Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <span className="text-2xl font-semibold">
                    {project.requirementLevel !== null
                      ? `Level ${project.requirementLevel}`
                      : "Not set"}
                  </span>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
                <CardDescription>
                  Basic information about your project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      BrightID App ID
                    </p>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {project.brightIdAppId}
                    </code>
                  </div>

                  {project.websiteUrl && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <ImageIcon className="h-4 w-4" />
                        Website URL
                      </p>
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline"
                      >
                        {project.websiteUrl}
                      </a>
                    </div>
                  )}

                  {project.deadline && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Deadline
                      </p>
                      <p className="text-sm">
                        {format(new Date(project.deadline), "MMMM d, yyyy")}
                      </p>
                    </div>
                  )}

                  {project.selectedPlanId && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Plan ID
                      </p>
                      <p className="text-sm">Plan #{project.selectedPlanId}</p>
                    </div>
                  )}
                </div>

                {project.landingMarkdown && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Landing Page Content
                      </p>
                      <div className="text-sm bg-muted/50 p-4 rounded-lg max-h-48 overflow-auto">
                        <pre className="whitespace-pre-wrap">
                          {project.landingMarkdown}
                        </pre>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Usage Tab */}
          <TabsContent value="usage" className="space-y-6">
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
                    value={Math.min(
                      (project.remainingtokens / 10000) * 100,
                      100
                    )}
                    className="h-3"
                  />
                </div>

                <Separator />

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-3xl font-semibold">
                      {project.remainingtokens.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Remaining
                    </p>
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
                    <p className="text-sm text-muted-foreground mt-1">
                      Available
                    </p>
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
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>
                  Your subscription and billing details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {project.selectedPlanId
                          ? `Plan #${project.selectedPlanId}`
                          : "No Plan Selected"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {project.selectedPlanId
                          ? "Active subscription"
                          : "Select a plan to get started"}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">
                    {project.selectedPlanId ? "Change Plan" : "Select Plan"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Token Allocation</CardTitle>
                <CardDescription>
                  Token balance and usage for billing period
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Remaining Tokens
                    </p>
                    <p className="text-2xl font-semibold mt-1">
                      {project.remainingtokens.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Billing Cycle End
                    </p>
                    <p className="text-2xl font-semibold mt-1">
                      {project.deadline
                        ? format(new Date(project.deadline), "MMM d, yyyy")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure your project settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Project Name</p>
                      <p className="text-sm text-muted-foreground">
                        {project.name}
                      </p>
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
                <CardDescription>
                  Customize your project appearance
                </CardDescription>
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
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
                <CardDescription>
                  Project activity and important dates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Project Created</p>
                      <p className="text-sm text-muted-foreground">
                        {format(
                          new Date(project.createdAt),
                          "MMMM d, yyyy 'at' h:mm a"
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDistanceToNow(new Date(project.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>

                  {project.updatedAt && (
                    <>
                      <Separator />
                      <div className="flex items-start gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted mt-0.5">
                          <Activity className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Last Updated</p>
                          <p className="text-sm text-muted-foreground">
                            {format(
                              new Date(project.updatedAt),
                              "MMMM d, yyyy 'at' h:mm a"
                            )}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDistanceToNow(new Date(project.updatedAt), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                    </>
                  )}

                  {project.deadline && (
                    <>
                      <Separator />
                      <div className="flex items-start gap-4">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10 mt-0.5">
                          <Calendar className="h-4 w-4 text-orange-500" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">Deadline</p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(project.deadline), "MMMM d, yyyy")}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDistanceToNow(new Date(project.deadline), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export function ProjectDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Skeleton className="h-8 w-32 mb-4" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-6 py-6">
        <Skeleton className="h-10 w-96 mb-6" />
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    </div>
  )
}
