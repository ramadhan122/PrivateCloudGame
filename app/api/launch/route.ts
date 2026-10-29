
import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const execFileAsync = promisify(execFile);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body?.id !== "zzz") {
      return NextResponse.json(
        { error: "Game tidak terdaftar atau tidak diizinkan." },
        { status: 400 }
      );
    }

    await execFileAsync("schtasks.exe", [
      "/run",
      "/tn",
      "CloudGame HoYoPlay",
    ]);

    return NextResponse.json({
      success: true,
      message: "Perintah menjalankan HoYoPlay berhasil dikirim.",
    });
  } catch (error) {
    console.error("Gagal menjalankan tugas HoYoPlay:", error);

    return NextResponse.json(
      {
        error:
          "Gagal menjalankan HoYoPlay. Periksa tugas CloudGame HoYoPlay di Task Scheduler.",
      },
      { status: 500 }
    );
  }
}
