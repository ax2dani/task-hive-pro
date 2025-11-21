import 'server-only';
import fs from 'fs/promises';
import path from 'path';
import type { Task, AuditLog } from '@/lib/types';

const dataPath = path.join(process.cwd(), 'data');
const tasksFilePath = path.join(dataPath, 'tasks.json');
const logsFilePath = path.join(dataPath, 'logs.json');

async function ensureDataFilesExist() {
  try {
    await fs.access(dataPath);
  } catch {
    await fs.mkdir(dataPath);
  }

  try {
    await fs.access(tasksFilePath);
  } catch {
    await fs.writeFile(tasksFilePath, '[]', 'utf-8');
  }

  try {
    await fs.access(logsFilePath);
  } catch {
    await fs.writeFile(logsFilePath, '[]', 'utf-8');
  }
}

export async function getTasks(): Promise<Task[]> {
  await ensureDataFilesExist();
  try {
    const data = await fs.readFile(tasksFilePath, 'utf-8');
    const tasks = JSON.parse(data);
    return tasks.sort((a: Task, b: Task) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error('Error reading tasks:', error);
    return [];
  }
}

export async function writeTasks(tasks: Task[]): Promise<void> {
  await ensureDataFilesExist();
  try {
    await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing tasks:', error);
  }
}

export async function getAuditLogs(): Promise<AuditLog[]> {
  await ensureDataFilesExist();
  try {
    const data = await fs.readFile(logsFilePath, 'utf-8');
    const logs = JSON.parse(data);
    return logs.sort((a: AuditLog, b: AuditLog) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (error) {
    console.error('Error reading logs:', error);
    return [];
  }
}

export async function writeAuditLogs(logs: AuditLog[]): Promise<void> {
  await ensureDataFilesExist();
  try {
    await fs.writeFile(logsFilePath, JSON.stringify(logs, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing logs:', error);
  }
}
