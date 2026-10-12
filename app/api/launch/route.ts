
import { NextResponse } from "next/server";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = body?.id;

    if (id !== "zzz") {
      return NextResponse.json(
        { error: "Game tidak terdaftar atau tidak diizinkan." },
        { status: 400 }
      );
    }

    const executablePath =
      "D:\\program\\ZZZ\\HoYoPlay\\launcher.exe";

    if (!existsSync(executablePath)) {
      return NextResponse.json(
        { error: "HoYoPlay launcher tidak ditemukan di laptop." },
        { status: 404 }
      );
    }

    const child = spawn(executablePath, [], {
      cwd: path.dirname(executablePath),
      detached: true,
      stdio: "ignore",
      windowsHide: false,
    });

    child.on("error", (error) => {
      console.error("Gagal membuka HoYoPlay:", error);
    });

    child.unref();

    return NextResponse.json({
      success: true,
      message: "Perintah membuka HoYoPlay telah dikirim.",
    });
  } catch {
    return NextResponse.json(
      { error: "Permintaan peluncuran tidak valid." },
      { status: 400 }
    );
  }
}
