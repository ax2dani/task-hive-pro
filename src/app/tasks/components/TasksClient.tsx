'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle } from 'lucide-react';
import type { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { TaskForm } from './TaskForm';
import { DeleteDialog } from './DeleteDialog';
import { Pagination } from '@/components/ui/pagination';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const TASKS_PER_PAGE = 5;

const authHeader = 'Basic ' + btoa('admin:password123');

export default function TasksClient() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTasks, setTotalTasks] = useState(0);

  const fetchTasks = useCallback(async (page: number, filter: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/tasks?page=${page}&limit=${TASKS_PER_PAGE}&filter=${filter}`, {
        headers: {
          Authorization: authHeader,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      const data = await response.json();
      setTasks(data.data);
      setTotalTasks(data.total);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      setTasks([]);
      setTotalTasks(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks(currentPage, searchTerm);
  }, [currentPage, searchTerm, fetchTasks]);

  const totalPages = Math.ceil(totalTasks / TASKS_PER_PAGE);

  const handleCreate = () => {
    setSelectedTask(null);
    setFormOpen(true);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setFormOpen(true);
  };

  const handleDelete = (task: Task) => {
    setSelectedTask(task);
    setDeleteDialogOpen(true);
  };

  const handleFormClose = () => {
    setFormOpen(false);
    setSelectedTask(null);
    fetchTasks(currentPage, searchTerm);
  };
  
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedTask(null);
    fetchTasks(currentPage, searchTerm);
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Filter tasks by title or description..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
        <Button onClick={handleCreate}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="hidden md:table-cell">Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
               Array.from({ length: TASKS_PER_PAGE }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-64" /></TableCell>
                  <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                </TableRow>
               ))
            ) : tasks && tasks.length > 0 ? (
              tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                     <Badge variant="outline">{task.id.substring(0, 8)}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell className="hidden md:table-cell max-w-sm truncate">{task.description}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(task.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(task)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(task)}
                          className="text-red-600 focus:text-red-600 focus:bg-red-50"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        task={selectedTask}
      />
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        task={selectedTask}
      />
    </>
  );
}
