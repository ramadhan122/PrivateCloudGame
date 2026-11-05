
"use client";

export default function PlayPage() {
  const streamUrl =
    "http://100.123.127.19:8080/stream.html?hostId=1981874582&appId=357741087";

  return (
    <main className="min-h-screen bg-[#08090d] p-3 text-white sm:p-4">
      <div className="mb-4 flex items-center justify-between">
        <a
          href="/"
          className="text-sm text-violet-300 transition hover:text-violet-200"
        >
          ← Kembali ke Library
        </a>

        <button
          onClick={() => {
            const iframe = document.getElementById(
              "moonlight-stream"
            ) as HTMLIFrameElement | null;

            iframe?.requestFullscreen?.();
          }}
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold transition hover:bg-violet-500"
        >
          Fullscreen
        </button>
      </div>

      <div className="mb-3">
        <h1 className="text-lg font-bold">CloudGame Streaming</h1>
        <p className="text-xs text-zinc-500">
          Zenless Zone Zero · Sunshine + Moonlight
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
        <iframe
          id="moonlight-stream"
          src={streamUrl}
          title="CloudGame Streaming"
          allow="autoplay; fullscreen; gamepad; microphone"
          allowFullScreen
          className="h-[85vh] min-h-[400px] w-full border-0 bg-black"
        />
      </div>
    </main>
  );
}
