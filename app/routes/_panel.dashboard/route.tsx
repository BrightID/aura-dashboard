import { ChartAreaInteractive } from "~/components/chart-area-interactive"
import { ProjectsTable, type Project } from "~/components/projects-table"

const sampleProjects: Project[] = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Revamp company website with modern UI",
    requirementLevel: 3,
    deadline: "2025-12-01T00:00:00Z",
    createdAt: "2025-09-01T00:00:00Z",
    updatedAt: "2025-09-10T00:00:00Z",
    isActive: true,
    image: "https://example.com/website.jpg",
  },
  {
    id: 2,
    name: "Mobile App",
    description: "Develop iOS and Android app",
    requirementLevel: 5,
    deadline: "2026-03-15T00:00:00Z",
    createdAt: "2025-08-15T00:00:00Z",
    updatedAt: "2025-09-05T00:00:00Z",
    isActive: true,
  },
  {
    id: 3,
    name: "Database Migration",
    description: "Migrate legacy database to cloud",
    requirementLevel: 4,
    deadline: "2025-11-30T00:00:00Z",
    createdAt: "2025-07-20T00:00:00Z",
    updatedAt: "2025-08-25T00:00:00Z",
    isActive: false,
  },
]

export default function PanelDashboard() {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <h3 className="text-xl font-bold mb-5">Projects List</h3>
        <ProjectsTable data={sampleProjects} />
      </div>
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </div>
  )
}
