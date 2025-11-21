import { AppShell } from '@/components/layout/AppShell';
import LogsClient from './components/LogsClient';

export default function AuditLogsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground">
            A log of all actions performed on tasks.
          </p>
        </div>
        <LogsClient />
      </div>
    </AppShell>
  );
}
