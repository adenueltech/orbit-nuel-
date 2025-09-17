import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { KanbanBoard } from "@/components/projects/kanban-board"

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <KanbanBoard projectId={params.id} />
    </DashboardLayout>
  )
}
