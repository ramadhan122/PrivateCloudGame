
"use client";

import { useState } from "react";

export default function PlayPage() {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <main className="min-h-screen bg-[#08090d] p-4 text-white">
      <div className="mb-3 flex items-center justify-between">
        <a href="/" className="text-sm text-violet-300">
          ← Kembali ke Library
        </a>

        <button
          onClick={async () => {
            const element = document.getElementById("moonlight-player");

            if (!document.fullscreenElement) {
              await element?.requestFullscreen();
              setFullscreen(true);
            } else {
              await document.exitFullscreen();
              setFullscreen(false);
            }
          }}
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold"
        >
          {fullscreen ? "Keluar Fullscreen" : "Fullscreen"}
        </button>
      </div>

      <div
        id="moonlight-player"
        className="overflow-hidden rounded-xl border border-white/10 bg-black"
      >
        <iframe
          src="http://100.123.127.19:8080"
          title="Moonlight Web"
          allow="autoplay; fullscreen; gamepad"
          allowFullScreen
          className="h-[75vh] w-full border-0"
        />
      </div>
    </main>
  );
}
