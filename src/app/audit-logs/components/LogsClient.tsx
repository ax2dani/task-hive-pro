'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import type { AuditLog, AuditLogAction } from '@/lib/types';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const LOGS_PER_PAGE = 10;
const authHeader = 'Basic ' + btoa('admin:password123');

const DetailsDisplay = ({ details }: { details: Record<string, any> | null }) => {
    if (!details || Object.keys(details).length === 0) {
      return <span className="text-muted-foreground">-</span>;
    }
  
    return (
      <div className="flex flex-col gap-1 text-xs">
        {Object.entries(details).map(([key, value]) => (
          <div key={key} className="flex gap-2">
            <span className="font-semibold capitalize">{key}:</span>
            <span className="text-muted-foreground truncate">{JSON.stringify(value)}</span>
          </div>
        ))}
      </div>
    );
  };

export default function LogsClient() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/logs?page=${currentPage}&limit=${LOGS_PER_PAGE}`, {
        headers: {
          Authorization: authHeader,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }
      const data = await response.json();
      setLogs(data.data);
      setTotalLogs(data.total);
    } catch (error) {
      console.error("Failed to fetch logs:", error);
      setLogs([]);
      setTotalLogs(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const totalPages = Math.ceil(totalLogs / LOGS_PER_PAGE);

  const getActionBadge = (action: AuditLogAction) => {
    const colorClass = {
      CREATE: 'bg-action-create hover:bg-action-create/80',
      UPDATE: 'bg-action-update hover:bg-action-update/80',
      DELETE: 'bg-destructive hover:bg-destructive/80',
    }[action];

    return (
      <Badge className={cn('text-action-foreground', colorClass)}>{action}</Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Entries</CardTitle>
        <CardDescription>All user actions are recorded here for auditing purposes.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Timestamp</TableHead>
                <TableHead className="w-[120px]">Action</TableHead>
                <TableHead className="w-[120px]">Task ID</TableHead>
                <TableHead>Updated Content</TableHead>
                <TableHead className="hidden md:table-cell">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: LOGS_PER_PAGE }).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                    <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                    <TableCell className="hidden md:table-cell"><Skeleton className="h-4 w-24" /></TableCell>
                  </TableRow>
                ))
              ) : logs && logs.length > 0 ? (
                logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{getActionBadge(log.action)}</TableCell>
                    <TableCell><Badge variant="secondary">{log.taskId.substring(0, 8)}</Badge></TableCell>
                    <TableCell>
                      <DetailsDisplay details={log.details} />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-muted-foreground">{log.notes || '-'}</span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No logs found.
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
      </CardContent>
    </Card>
  );
}
