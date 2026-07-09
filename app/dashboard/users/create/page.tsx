"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateUser } from "@/features/users/hooks/useUsers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateUserPage() {
    const router = useRouter();
    const createUser = useCreateUser();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const handleSubmit = () => {
        if (!name || !email || !password) {
            return alert("Please fill all fields");
        }
        createUser.mutate({
            name,
            email,
            password,
            role,
        },
            {
                onSuccess: () => {
                    alert("User created successfully");
                    router.push("/dashboard/users");
                },
                onError: (error: any) => {
                    alert(
                        error?.response?.data?.message ||
                        "Failed to create user"
                    );
                },
            }
        );
    };
    return (

        <div className="max-w-xl mx-auto bg-white border rounded-xl p-6">

            <h1 className="text-3xl font-bold mb-6">
                Create User
            </h1>

            <div className="space-y-4">

                <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full border rounded-md p-2"
                >
                    <option value="user">
                        User
                    </option>

                    <option value="admin">
                        Admin
                    </option>

                </select>

                <Button
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={createUser.isPending}
                >
                    {
                        createUser.isPending
                            ? "Creating..."
                            : "Create User"
                    }
                </Button>

            </div>

        </div>

    );

}