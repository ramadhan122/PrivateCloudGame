
import { NextResponse } from "next/server";
import { spawn } from "node:child_process";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body?.id !== "zzz") {
      return NextResponse.json(
        { error: "Game tidak terdaftar atau tidak diizinkan." },
        { status: 400 }
      );
    }

    const launcher = spawn(
      "D:\\program\\ZZZ\\HoYoPlay\\launcher.exe",
      [],
      {
        cwd: "D:\\program\\ZZZ\\HoYoPlay",
        detached: true,
        stdio: "ignore",
      }
    );

    launcher.on("error", (error) => {
      console.error("Gagal menjalankan HoYoPlay:", error);
    });

    launcher.unref();

    return NextResponse.json({
      success: true,
      message: "HoYoPlay berhasil dipanggil.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Gagal menjalankan HoYoPlay." },
      { status: 500 }
    );
  }
}
