import { NextRequest, NextResponse } from "next/server";
import { v4 } from 'uuid';

export async function GET(req : NextRequest) {
    const uuid = v4();

    return NextResponse.json(
        {
            'uuid' : uuid
        },
        {
            status : 200
        }
    );
}