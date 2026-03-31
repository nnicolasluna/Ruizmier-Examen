import { NextResponse } from "next/server";
import { prisma } from "../../../../libs/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 },
            );
        }
        const UserExist = await prisma.user.findUnique({
            where: { email },
        });
        if (UserExist) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 },
            );
        } else {
            const PasswordHashed = await bcrypt.hash(password, 10);
            const NewUser = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: PasswordHashed,
                },
            });
            return NextResponse.json({ status: 200 });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: error || "Internal Server Error" },
            { status: 500 },
        );
    }
}
