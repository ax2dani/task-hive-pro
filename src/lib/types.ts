export type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
};

export type AuditLogAction = 'CREATE' | 'UPDATE' | 'DELETE';

export type AuditLog = {
  id: string;
  timestamp: string;
  action: AuditLogAction;
  taskId: string;
  details: Record<string, any> | null;
  notes?: string;
};
