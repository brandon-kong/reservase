import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import instance from "@/lib/axios";

export async function POST ( req: NextRequest) {
    const body = await req.json();
    const { email, password, first_name, last_name } = body as any;

    // TODO: Validate email, password, first_name, last_name

    try {
        const { data, status } = await instance.post("register", {
            email,
            password1: password,
            password2: password,
            first_name,
            last_name,
        });

        if (!(status === 201)) {
            console.log(data);
        }
        return NextResponse.redirect("/login");
    }

    catch (error: any) {
        return NextResponse.json({
            error: error.response.data,
        }, {
            status: error.response.status,
        })
    }
}