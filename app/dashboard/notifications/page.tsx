"use client";
import { useNotifications, useMarkAsRead } from "@/features/notifications/hooks/useNotifications";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
export default function NotificationsPage() {
    const {
        data: notifications = [],
        isLoading,
    } = useNotifications();
    const markAsRead = useMarkAsRead();
    // console.log(
    //     "FRONTEND NOTIFICATIONS:",
    //     notifications
    // );
    if (isLoading) {
        return <div>Loading notifications...</div>;
    }
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">
                Notifications
            </h1>
            <div className="rounded-xl border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Message
                            </TableHead>
                            <TableHead>
                                Type
                            </TableHead>
                            <TableHead>
                                Status
                            </TableHead>
                            <TableHead>
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            notifications.map((notification: any) => (
                                <TableRow key={notification._id}>
                                    <TableCell>
                                        {notification.message}
                                    </TableCell>
                                    <TableCell>
                                        {notification.type}
                                    </TableCell>
                                    <TableCell>
                                        {
                                            notification.read
                                                ? "Read"
                                                : "Unread"
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            !notification.read && (
                                                <Button
                                                    onClick={() =>
                                                        markAsRead.mutate(notification._id)
                                                    }
                                                >
                                                    Mark Read
                                                </Button>
                                            )
                                        }
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}