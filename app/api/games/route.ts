
import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Game = {
  id: string;
  title: string;
  platform: string;
  executablePath: string;
  launchArgs: string[];
  category: string;
  description: string;
};

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      "data",
      "games.json"
    );

    const contents = await readFile(filePath, "utf8");
    const games = JSON.parse(contents) as Game[];

    return NextResponse.json({ games });
  } catch (error) {
    console.error("Gagal membaca daftar game:", error);

    return NextResponse.json(
      { error: "Daftar game gagal dibaca." },
      { status: 500 }
    );
  }
}
