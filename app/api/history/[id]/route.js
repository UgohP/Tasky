import TaskModel from "@/lib/models/Task";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await TaskModel.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Task Deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Error deleting task" });
  }
}
