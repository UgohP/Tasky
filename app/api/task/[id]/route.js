import TaskModel from "@/lib/models/Task";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { completed } = await request.json();

    if (typeof completed !== "boolean") {
      return NextResponse.json(
        { error: "'completed' field must be a boolean" },
        { status: 400 }
      );
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { completed },
      {
        new: true,
      }
    );

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedTask });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await TaskModel.findByIdAndDelete(id);
    return NextResponse.json({ msg: "Task Deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}
