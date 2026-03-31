import { NextResponse } from "next/server";
import { prisma } from "../../../libs/prisma";
import { getUser } from "../../../libs/auth";

export async function GET() {
    const reviews = await prisma.review.findMany({});
    return NextResponse.json(reviews);
}

export async function POST(request: Request) {
    const user = await getUser();
    if (!user) {
        return NextResponse.json({ status: 500 });
    } else {
        const { book_title, rating, review, mood } = await request.json();
        if (!book_title || !rating || !review || !mood) {
            console.log("llenar espacios");
            return NextResponse.json(
                { message: "Incomplete fields" },
                { status: 400 },
            );
        }
        const newReview = await prisma.review.create({
            data: {
                userId: user.id,
                bookTitle: book_title,
                rating,
                review,
                mood,
            },
        });
        return NextResponse.json(newReview);
    }
}
