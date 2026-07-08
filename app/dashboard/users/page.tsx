"use client";

import { useUsers } from "@/features/users/hooks/useUsers";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function UsersPage() {
    const {
        data: users = [],
        isLoading,
        isError,
    } = useUsers();

    if (isLoading) {
        return <div>Loading users...</div>;
    }

    if (isError) {
        return <div>Failed to load users</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Users
            </h1>

            <div className="rounded-xl border bg-white">
                <Table>
                    <TableHeader>
                        <TableRow >
                            <TableHead className="font-bold">Name</TableHead>
                            <TableHead className="font-bold">Email</TableHead>
                            <TableHead className="font-bold">Role</TableHead>
                            <TableHead className="font-bold">Created</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {users.map((user: any) => (
                            <TableRow key={user._id}>
                                <TableCell>
                                    {user.name}
                                </TableCell>

                                <TableCell>
                                    {user.email}
                                </TableCell>

                                <TableCell>
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                                        {user.role}
                                    </span>
                                </TableCell>

                                <TableCell>
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}