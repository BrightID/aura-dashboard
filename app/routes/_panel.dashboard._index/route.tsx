import { useQuery } from "@tanstack/react-query"
import type { User } from "firebase/auth"
import { query } from "firebase/database"
import { collection, getDocs, where } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"
import { ChartAreaInteractive } from "~/components/chart-area-interactive"
import { ProjectsTable, type Project } from "~/components/projects-table"
import { auth, db } from "~/lib/firebase"

export async function getUserProjects(user: User): Promise<Project[]> {
  if (!user) return []

  const q = query(collection(db, "projects"), where("userId", "==", user.uid))

  const snapshot = await getDocs(q)

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as object),
  })) as Project[]
}

export default function PanelDashboard() {
  const [user] = useAuthState(auth)
  const { data, error, isLoading, status } = useQuery({
    queryFn: () => getUserProjects(user!),
    queryKey: ["user-projects", auth.currentUser],
    enabled: () => !!user,
  })

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <div className="px-4 lg:px-6">
        <h3 className="text-xl font-bold mb-5">Projects List</h3>
        <ProjectsTable data={data ?? []} />
      </div>
      <div className="px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </div>
  )
}
