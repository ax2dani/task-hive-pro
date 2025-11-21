import { AppShell } from '@/components/layout/AppShell';
import TasksClient from './components/TasksClient';

export default function TasksPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Create and manage your tasks.
          </p>
        </div>
        <TasksClient />
      </div>
    </AppShell>
  );
}
