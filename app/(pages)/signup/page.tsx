"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    async function signup(params: { name: string; email: string; password: string }) {
        const BackEndResponse = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(params),
        });
        return BackEndResponse.json();
    }
    const signupButtonAction = async () => {
        const response = await signup({ name, email, password });
        console.log(response);
        if (response.ok) {
            router.push("/login");
        }else{
            alert("Error to sign up");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <h2 className="text-center text-2xl font-bold mb-6">Sign Up</h2>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full rounded-md border border-gray-400 pl-3"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                    <button
                        className="w-full rounded-md border bg-blue-700 font-semibold text-white py-2"
                        onClick={signupButtonAction}
                    >
                        Sign In
                    </button>
                </div>
                <p className="mt-4 text-center text-sm text-gray-500">
                    Do you already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
}
