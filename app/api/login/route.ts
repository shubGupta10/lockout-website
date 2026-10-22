import { createSessionToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const expectedEmail = process.env.ADMIN_EMAIL;
        const expectedPassword = process.env.ADMIN_PASSWORD;

        if (!expectedEmail || !expectedPassword) {
            return NextResponse.json({
                error: "Server auth configuration missing"
            }, { status: 500 })
        }

        if (email?.trim() !== expectedEmail || password !== expectedPassword) {
            return NextResponse.json({
                error: "Invalid email or password"
            }, {
                status: 401
            })
        }

        const token = createSessionToken(expectedEmail);

        const response = NextResponse.json(
            { success: true, message: "LoggedIn Successfully" },
            { status: 200 }
        )

        response.cookies.set("admin_session", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60,
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}