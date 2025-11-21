import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deleteTask } from '@/lib/actions';
import type { Task } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export function DeleteDialog({ isOpen, onClose, task }: DeleteDialogProps) {
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!task) return;

    const result = await deleteTask(task.id);

    if (result.success) {
      toast({
        title: 'Success',
        description: result.message,
      });
      onClose();
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.message || 'Failed to delete task.',
      });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the task
            <span className="font-bold"> "{task?.title}"</span>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
