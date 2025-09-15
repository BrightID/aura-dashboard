import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import type { Project } from "./projects-table"

export function ProjectModal({
  isOpen,
  onClose,
  onSave,
  project = null,
}: {
  isOpen: boolean
  onClose: () => void
  onSave: (project: Project) => void
  project?: Project | null
}) {
  const [formData, setFormData] = useState<Project>(
    project || {
      id: 0,
      name: "",
      description: "",
      requirementLevel: 1,
      deadline: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true,
    }
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: checked }))
  }

  const handleSubmit = () => {
    onSave({
      ...formData,
      id: project ? project.id : Date.now(),
      requirementLevel: Number(formData.requirementLevel),
      updatedAt: new Date().toISOString(),
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add Project"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="requirementLevel">Requirement Level</Label>
            <Input
              id="requirementLevel"
              name="requirementLevel"
              type="number"
              min="1"
              value={formData.requirementLevel}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="isActive">Active</Label>
            <Switch
              disabled
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={handleSwitchChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
