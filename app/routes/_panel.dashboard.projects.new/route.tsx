"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getAuth } from "firebase/auth"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { API_BASE_URL } from "~/constants"
import DatePicker from "~/components/ui/date-picker"

const formSchema = z.object({
  name: z.string().min(1, "Required").max(255),
  description: z.string().min(1, "Required").max(255),
  requirementLevel: z.coerce.number().int().min(1, "Must be positive"),
  image: z.string().url().optional().or(z.literal("")),
  logoUrl: z.string().url().optional().or(z.literal("")),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  remainingtokens: z.coerce.number().int().min(0).optional(),
  brightIdAppId: z.string().max(500).optional(),
  deadline: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export default function CreateProjectPage() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", description: "", requirementLevel: 1 },
  })

  const onSubmit = async (data: FormData) => {
    const token = await getAuth().currentUser?.getIdToken()
    const res = await fetch(`${API_BASE_URL}/api/projects`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    res.ok
      ? (toast.success("Project created"), navigate("/dashboard"))
      : toast.error("Failed")
  }

  return (
    <Card className="mx-auto mt-8 w-2xl max-w-full">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Field data-invalid={!!errors.name}>
            <FieldLabel>Name</FieldLabel>
            <Input {...register("name")} />
            <FieldError
              errors={
                errors.name ? [{ message: errors.name.message }] : undefined
              }
            />
          </Field>

          <Field data-invalid={!!errors.description}>
            <FieldLabel>Description</FieldLabel>
            <Textarea {...register("description")} />
            <FieldError
              errors={
                errors.description
                  ? [{ message: errors.description.message }]
                  : undefined
              }
            />
          </Field>

          <Field data-invalid={!!errors.requirementLevel}>
            <FieldLabel>Requirement Level</FieldLabel>
            <Input type="number" {...register("requirementLevel")} />
            <FieldError
              errors={
                errors.requirementLevel
                  ? [{ message: errors.requirementLevel.message }]
                  : undefined
              }
            />
          </Field>

          <Field>
            <FieldLabel>Image URL (optional)</FieldLabel>
            <Input {...register("image")} />
            <FieldError
              errors={
                errors.image ? [{ message: errors.image.message }] : undefined
              }
            />
          </Field>

          <Field>
            <FieldLabel>Website URL (optional)</FieldLabel>
            <Input {...register("websiteUrl")} />
            <FieldError
              errors={
                errors.websiteUrl
                  ? [{ message: errors.websiteUrl.message }]
                  : undefined
              }
            />
          </Field>

          <Field>
            <FieldLabel>Deadline (optional)</FieldLabel>
            <Controller
              name="deadline"
              control={control}
              render={({ field }) => (
                <DatePicker
                  defaultValue={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />{" "}
          </Field>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
