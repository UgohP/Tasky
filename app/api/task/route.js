import { ConnectDB } from "@/lib/config/db";
import Tasks from "@/lib/models/Task";
import { NextResponse } from "next/server";

await ConnectDB();

export async function GET(request) {
  try {
    return NextResponse.json({ msg: "API is working" });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title } = body;

    if (!title || title.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 406 }
      );
    }

    const newTask = await Tasks.create({ title: title.trim() });

    return NextResponse.json(
      { success: true, msg: "Task Added", data: newTask },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
