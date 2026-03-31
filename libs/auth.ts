import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function getUser() {
    const gettoken = await cookies();
    const tokenValue = gettoken.get("token")?.value;
    if (!tokenValue) {
        return null;
    } else {
        try {
            return jwt.verify(tokenValue, process.env.JWT_SECRET!) as {
                id: number;
                email: string;
            };
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
