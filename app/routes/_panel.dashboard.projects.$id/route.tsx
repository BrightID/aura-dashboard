import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useParams } from "react-router"
import { getUserProjects } from "~/utils/apis"
import { ProjectDetailPanel } from "./components/project-details"

export default function ProjectDetail() {
  const {
    data: projects,
    error,
    isLoading,
  } = useQuery({
    queryFn: getUserProjects,
    queryKey: ["user-projects"],
  })

  const params = useParams()

  const focusedProject = useMemo(
    () => projects?.find((item) => item.id == params["id"]),
    [projects, params]
  )

  if (!focusedProject) return null

  return (
    <div>
      <ProjectDetailPanel onClose={() => {}} project={focusedProject} />
    </div>
  )
}
