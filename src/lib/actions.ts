'use server';

import { revalidatePath } from 'next/cache';
import { getTasks, writeTasks, getAuditLogs, writeAuditLogs } from '@/lib/data';
import { taskSchema, type TaskFormValues } from '@/lib/schemas';
import type { Task, AuditLog } from '@/lib/types';
import { z } from 'zod';
import { randomUUID } from 'crypto';

function sanitizeInput(input: string): string {
  return input.replace(/<[^>]*>?/gm, '');
}

export async function createTask(values: TaskFormValues) {
  try {
    const validatedData = taskSchema.parse({
      title: sanitizeInput(values.title),
      description: sanitizeInput(values.description),
    });

    const tasks = await getTasks();
    const newTask: Task = {
      id: randomUUID(),
      ...validatedData,
      createdAt: new Date().toISOString(),
    };
    tasks.unshift(newTask);
    await writeTasks(tasks);

    const logs = await getAuditLogs();
    const newLog: AuditLog = {
      id: randomUUID(),
      timestamp: new Date().toISOString(),
      action: 'CREATE',
      taskId: newTask.id,
      details: {
        title: newTask.title,
        description: newTask.description,
      },
    };
    logs.unshift(newLog);
    await writeAuditLogs(logs);

    revalidatePath('/tasks');
    revalidatePath('/audit-logs');
    revalidatePath('/api/tasks');
    revalidatePath('/api/logs');
    return { success: true, message: 'Task created successfully.' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: 'Validation failed.', errors: error.errors };
    }
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

export async function updateTask(taskId: string, values: TaskFormValues) {
  try {
    const validatedData = taskSchema.parse({
      title: sanitizeInput(values.title),
      description: sanitizeInput(values.description),
    });

    const tasks = await getTasks();
    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      return { success: false, message: 'Task not found.' };
    }

    const oldTask = tasks[taskIndex];
    const updatedTask = { ...oldTask, ...validatedData };

    const changes: Record<string, any> = {};
    if (oldTask.title !== updatedTask.title) {
      changes.title = updatedTask.title;
    }
    if (oldTask.description !== updatedTask.description) {
      changes.description = updatedTask.description;
    }

    if (Object.keys(changes).length > 0) {
      tasks[taskIndex] = updatedTask;
      await writeTasks(tasks);

      const logs = await getAuditLogs();
      const newLog: AuditLog = {
        id: randomUUID(),
        timestamp: new Date().toISOString(),
        action: 'UPDATE',
        taskId: taskId,
        details: changes,
      };
      logs.unshift(newLog);
      await writeAuditLogs(logs);

      revalidatePath('/tasks');
      revalidatePath('/audit-logs');
      revalidatePath('/api/tasks');
      revalidatePath('/api/logs');
      return { success: true, message: 'Task updated successfully.' };
    }

    return { success: true, message: 'No changes were made.' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: 'Validation failed.', errors: error.errors };
    }
    return { success: false, message: 'An unexpected error occurred.' };
  }
}

export async function deleteTask(taskId: string) {
  try {
    const tasks = await getTasks();
    const updatedTasks = tasks.filter((t) => t.id !== taskId);

    if (tasks.length === updatedTasks.length) {
      return { success: false, message: 'Task not found.' };
    }

    await writeTasks(updatedTasks);

    const logs = await getAuditLogs();
    const newLog: AuditLog = {
      id: randomUUID(),
      timestamp: new Date().toISOString(),
      action: 'DELETE',
      taskId: taskId,
      details: null,
    };
    logs.unshift(newLog);
    await writeAuditLogs(logs);

    revalidatePath('/tasks');
    revalidatePath('/audit-logs');
    revalidatePath('/api/tasks');
    revalidatePath('/api/logs');
    return { success: true, message: 'Task deleted successfully.' };
  } catch (error) {
    return { success: false, message: 'An unexpected error occurred.' };
  }
}
