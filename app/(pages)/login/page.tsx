"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function login(params: { email: string; password: string }) {
        const BackEndResponse = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(params),
        });
        return BackEndResponse.json();
    }
    const loginButtonAction = async () => {
        const response = await login({ email, password });
        console.log(response);
        if (response.status === 200) {
            router.push("/reviews");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="email@example.bo"
                            className="w-full rounded-md border border-gray-400 pl-3"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="**********"
                            className="w-full rounded-md border border-gray-400 pl-3"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="w-full rounded-md border bg-blue-700 font-semibold text-white py-2">
                        Sign In
                    </button>
                </div>
                <p className="mt-4 text-center text-sm text-gray-500">
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
}
