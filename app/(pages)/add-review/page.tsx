"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewReviewsPage() {
    const [book_title, setBookTitle] = useState("");
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");
    const [mood, setMood] = useState("Happy");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const createReview = async () => {
        try {
            const response = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ book_title, rating, review, mood }),
            });
            if (response.ok) {
                router.push("/reviews");
                router.refresh();
            } else {
                alert("Error to create review");
            }
        } catch (error) {
            console.log(error);
            alert("Error to create review");
        }
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <button 
                        onClick={() => router.back()}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        ← Back to Reviews
                    </button>
                <h2 className="text-center text-2xl font-bold mb-6">Sign Up</h2>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">
                            Book Title
                        </label>
                        <input
                            type="text"
                            placeholder="Don Quijote"
                            className="w-full rounded-md border border-gray-400 pl-3"
                            onChange={(e) => setBookTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">
                            Rating
                        </label>
                        <select
                            className="mt-1 w-full rounded-md border border-gray-300 p-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                        >
                            {[5, 4, 3, 2, 1].map((num) => (
                                <option key={num} value={num}>
                                    {num} {num === 5 ? "⭐ (Excelente)" : "⭐"}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">
                            Mood
                        </label>
                        <input
                            type="text"
                            placeholder="Ej. Inspirado"
                            className="w-full rounded-md border border-gray-400 pl-3"
                            onChange={(e) => setMood(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">
                            Tu Reseña
                        </label>
                        <textarea
                            required
                            rows={4}
                            placeholder="¿Qué te pareció el libro?"
                            className="mt-1 w-full rounded-md border border-gray-300 p-2.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </div>
                    <button
                        className="w-full rounded-md border bg-blue-700 font-semibold text-white py-2 hover:opacity-50"
                        onClick={createReview}
                    >
                        Save Review
                    </button>
                </div>
            </div>
        </div>
    );
}
