
"use client";

export default function PlayPage() {
  const streamUrl =
    "http://100.123.127.19:8080/stream.html?hostId=1474039562&appId=357741087";

  return (
    <main className="min-h-screen bg-[#08090d] p-4 text-white">
      <div className="mb-4 flex items-center justify-between">
        <a href="/" className="text-sm text-violet-300">
          ← Kembali ke Library
        </a>

        <button
          onClick={() => {
            const iframe = document.getElementById(
              "moonlight-stream"
            ) as HTMLIFrameElement;

            iframe.requestFullscreen?.();
          }}
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold"
        >
          Fullscreen
        </button>
      </div>

      <iframe
        id="moonlight-stream"
        src={streamUrl}
        title="Zenless Zone Zero Streaming"
        allow="autoplay; fullscreen; gamepad; microphone"
        allowFullScreen
        className="h-[85vh] w-full rounded-xl border border-white/10 bg-black"
      />
    </main>
  );
}
