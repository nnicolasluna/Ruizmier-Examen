import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/prisma";
import { getUser } from "../../../../libs/auth";

export async function DELETE({ params }: { params: { id: string } }) {
    const userLogged = await getUser();
    const { id } = await params;
    const reviewerId = parseInt(id);
    const ownerReview = await prisma.review.findUnique({
        where: { id: reviewerId },
    });
    if (!userLogged) {
        return NextResponse.json({ status: 401, message: "User Unauthorized" });
    } else {
        if (!ownerReview) {
            return NextResponse.json({
                status: 404,
                message: "Review not found",
            });
        } else if (userLogged.id !== ownerReview.userId) {
            return NextResponse.json({
                status: 403,
                message: "You are not the owner of this review",
            });
        } else {
            await prisma.review.delete({
                where: { id: reviewerId },
            });
            return NextResponse.json({
                status: 200,
                message: "Review deleted successfully",
            });
        }
    }
}
