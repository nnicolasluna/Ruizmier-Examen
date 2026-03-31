"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const getReviews = async () => {
        try {
            const response = await fetch("/api/reviews");
            const getData = await response.json();
            setReviews(getData);
        } catch (error) {
            alert("Error to get reviews");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getReviews();
    }, []);

    const deleteReview = async (id: number) => {
        try {
            if (!confirm("Are you sure you want to delete this review?")) {
                return;
            }
            const response = await fetch(`/api/reviews/${id}`, {
                method: "DELETE",
            });
            const dataResponse = await response.json();
            if (response.ok) {
                setReviews(reviews.filter((r) => r.id !== id));
            } else if (dataResponse.code === "403") {
                alert("You are not authorized to delete this review");
            } else {
                alert("Error to delete review");
            }
        } catch (error) {
            alert("Error to delete review");
            console.log(error);
        }
    };
    const logout = async () => {
        try {
            if (!confirm("Are you sure you want to logout?")) {
                return;
            }
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                router.refresh();
                router.push("/login");
            }
        } catch (error) {
            alert("Error to logout");
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Reviews
                    </h2>
                    <div>
                        <button
                            onClick={logout}
                            className="w-full rounded-md border bg-red-500 font-semibold text-white py-2 hover:opacity-50"
                        >
                            Log out
                        </button>
                        <button
                            onClick={() => router.push("/add-review")}
                            className="w-full rounded-md border bg-green-500 font-semibold text-white py-2 hover:opacity-50"
                        >
                            Add Review
                        </button>
                    </div>
                </div>
                {loading ? (
                    <p className="text-center text-gray-500">
                        Cargando reseñas...
                    </p>
                ) : reviews.length === 0 ? (
                    <div className="rounded-lg bg-white p-10 text-center shadow-md">
                        <p className="text-gray-500">
                            No tienes reseñas aún. ¡Crea la primera!
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {reviews.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            {item.bookTitle}
                                        </h2>
                                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-bold text-blue-600">
                                            {item.rating} / 5
                                        </span>
                                        <span className="text-sm italic text-gray-400">
                                            -{item.mood}
                                        </span>
                                    </div>
                                    <p className="mt-2 text-gray-600 line-clamp-2">
                                        {item.review}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="ml-4 rounded-md border border-red-200 px-3 py-1 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                                >
                                    Borrar
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
