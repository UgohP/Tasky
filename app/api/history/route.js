import TaskModel from "@/lib/models/Task";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const tasks = await TaskModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: tasks }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
