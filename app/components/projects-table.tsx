import { useCallback, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, EditIcon, PlusCircleIcon } from "lucide-react"
import _ from "lodash"
import { ProjectModal } from "./project-modal"

export type Project = {
  id: string
  name: string
  description: string
  requirementLevel: number
  deadline: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  image?: string
}

const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "requirementLevel",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Requirement Level
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Deadline
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (row.original.isActive ? "Active" : "Inactive"),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button
        variant="ghost"
        size="sm"
        // onClick={() => row.original.onEdit(row.original)}
      >
        <EditIcon className="h-4 w-4" />
      </Button>
    ),
  },
]

export function ProjectsTable({ data }: { data: Project[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [filter, setFilter] = useState("")
  const [columnVisibility, setColumnVisibility] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const debouncedSetFilter = useCallback(
    (value: string) => setFilter(value),
    []
  )

  const filteredData = useMemo(
    () =>
      data.filter((project) =>
        project.name.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, data]
  )

  const handleSave = (project: Project) => {
    if (project.id) {
    } else {
    }
  }

  const handleEdit = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Filter by name..."
          value={filter}
          onChange={(e) => debouncedSetFilter(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => {
              setSelectedProject(null)
              setIsModalOpen(true)
            }}
          >
            <PlusCircleIcon />
            Create Project
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        project={selectedProject}
      />
    </div>
  )
}
