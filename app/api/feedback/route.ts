import { sql } from "@/lib/db";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";

export async function POST(req: Request) {
    try {
        const { type, message, email, device_info, honeypot } = await req.json();

        if (honeypot) {
            return NextResponse.json(
                { message: "Response submitted" },
                { status: 200 }
            );
        }

        if (!type || !message) {
            return NextResponse.json(
                { error: "Type and message are required" },
                { status: 400 }
            );
        }

        const trimmedMessage = message.trim();
        if (trimmedMessage.length < 5) {
            return NextResponse.json(
                { error: "Message is too short (minimum 5 characters)" },
                { status: 400 }
            );
        }

        if (trimmedMessage.length > 3000) {
            return NextResponse.json(
                { error: "Message is too long (maximum 3000 characters)" },
                { status: 400 }
            );
        }

        const sanitizedEmail = email && typeof email === "string" ? email.trim() : null;
        const sanitizedDevice = device_info && typeof device_info === "string" ? device_info.trim() : null;

        await sql`
            INSERT INTO feedback (type, message, email, device_info)
            VALUES (
                ${type.trim()},
                ${trimmedMessage},
                ${sanitizedEmail},
                ${sanitizedDevice}
            )
        `;

        return NextResponse.json(
            { message: "Response submitted" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Feedback route error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function GET(req: Request) {
    try {
        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("admin_session")?.value;
        const isCookieValid = verifySessionToken(sessionToken);
        const adminKey = req.headers.get("x-admin-key");
        const isKeyValid = process.env.ADMIN_KEY && adminKey === process.env.ADMIN_KEY;
        if (!isCookieValid && !isKeyValid) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        const fetchAllFeedback = await sql`
        SELECT id, type, message, email, device_info, created_at FROM feedback ORDER BY created_at DESC
        `;
        return NextResponse.json({
            message: "Fetch ALL Feedbacks",
            feedbacks: fetchAllFeedback,
        }, { status: 200 })
    } catch (error) {
        console.error("GET feedback error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
