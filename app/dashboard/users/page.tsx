"use client";

import { useUsers } from "@/features/users/hooks/useUsers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserPlus, Users, Loader2, AlertCircle } from "lucide-react";

export default function UsersPage() {
  const { data: users = [], isLoading, isError } = useUsers();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="mt-3 text-gray-500 dark:text-gray-400">Loading users...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500" />
        <p className="mt-3 text-red-500">Failed to load users</p>
        <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Users className="h-7 w-7 text-blue-600" />
            Users
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage all users in the system
          </p>
        </div>
        <Link href="/dashboard/users/create">
          <Button className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-lg shadow-blue-600/20 transition-all duration-200 flex items-center gap-2">
            <UserPlus size={18} />
            Add User
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{users.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Admins</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {users.filter((u: any) => u.role === "admin").length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-gray-500 dark:text-gray-400">Regular Users</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {users.filter((u: any) => u.role === "user").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm overflow-hidden">
        {users.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No users yet
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Create your first user to get started
            </p>
            <Link href="/dashboard/users/create">
              <Button className="mt-4">Add User</Button>
            </Link>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-900/50">
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Role
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300">
                  Created
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: any) => (
                <TableRow
                  key={user._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                >
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                      }`}
                    >
                      {user.role === "admin" ? "👑" : "👤"} {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}