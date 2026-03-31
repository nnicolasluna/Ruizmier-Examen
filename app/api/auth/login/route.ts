import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 401 },
            );
        }
        const ValidPassword = await bcrypt.compare(password, user.password);
        console.log(ValidPassword);
        if (!ValidPassword) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 },
            );
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "1h" },
        );
        const response = NextResponse.json({ status: 200 });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
            path: "/",
        });
        return response;
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Error en el login" },
            { status: 500 },
        );
    }
}
