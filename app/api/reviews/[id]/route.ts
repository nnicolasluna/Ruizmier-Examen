import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/prisma";
import { getUser } from "../../../../libs/auth";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
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
                message: "Review not found",
            }, { status: 404 });
        }
        if (ownerReview.userId !== userLogged.id) {
            return NextResponse.json(
                { message: "You are not the owner of this review" },
                { status: 403 },
            );
        }
        await prisma.review.delete({
            where: { id: reviewerId },
        });
        return NextResponse.json(
            { message: "Review deleted successfully" },
            { status: 200 },
        );
    }
}
