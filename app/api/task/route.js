import { ConnectDB } from "@/lib/config/db";
import TaskModel from "@/lib/models/Task";
import { NextResponse } from "next/server";

await ConnectDB();

//API Endpoint to get all Tasks
export async function GET(request) {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const tasks = await TaskModel.find({
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    }).sort({ createdAt: -1 });

    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

//API Endpoint for Adding Tasks
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

    const newTask = await TaskModel.create({ title: title.trim() });

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
