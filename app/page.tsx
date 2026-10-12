
"use client";

import { useEffect, useState } from "react";

type Game = {
  id: string;
  title: string;
  platform: string;
  executablePath: string;
  launchArgs: string[];
  category: string;
  description: string;
  color?: string;
  icon?: string;
};


const categories = [
  "Semua Game",
  "Action",
  "Racing",
  "Adventure",
  "RPG",
  "Sandbox",
];

export default function Home() {
  
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua Game");
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [launching, setLaunching] = useState("");
  const [launchMessage, setLaunchMessage] = useState("");

  useEffect(() => {
    async function loadGames() {
      try {
        const response = await fetch("/api/games", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil daftar game.");
        }

        const data: { games: Game[] } = await response.json();
        setGames(data.games);
        setError("");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat mengambil game."
        );
      } finally {
        setLoading(false);
      }
    }

    loadGames();
  }, []);

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(search.toLowerCase()) ||
      game.category.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "Semua Game" ||
      game.category.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });


  return (
    <main className="min-h-screen bg-[#08090d] text-white">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-white/[0.07] bg-[#0b0c12] px-6 py-8 lg:flex lg:flex-col">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-xl shadow-lg shadow-violet-600/25">
            🎮
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wide">
              CLOUD<span className="text-violet-400">GAME</span>
            </h1>
            <p className="text-[10px] tracking-[0.25em] text-zinc-500">
              YOUR PRIVATE ARCADE
            </p>
          </div>
        </a>

        <div className="mt-12">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600">
            Menu
          </p>
          <div className="flex items-center gap-3 rounded-xl bg-violet-500/10 px-4 py-3 text-sm font-semibold text-violet-300">
            <span>▦</span> Library Game
          </div>
          <div className="mt-2 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-zinc-500">
            <span>◷</span> Terakhir Dimainkan
          </div>
        </div>

        <div className="mt-auto rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold">Cloud PC</span>
          </div>
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Hubungkan ke PC gaming pribadimu untuk mulai bermain.
          </p>
          <div className="mt-4 rounded-lg bg-white/[0.05] px-3 py-2 text-center text-xs text-zinc-400">
            Sunshine + Moonlight
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-white/[0.07] bg-[#08090d]/90 px-5 py-4 backdrop-blur-xl sm:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <div className="lg:hidden">
              <h1 className="text-lg font-black">
                CLOUD<span className="text-violet-400">GAME</span>
              </h1>
            </div>

            <div className="hidden text-sm text-zinc-500 sm:block">
              Beranda <span className="mx-2 text-zinc-700">/</span>
              <span className="text-white">Library Game</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden text-xs text-zinc-500 sm:block">
                PRIVATE CLOUD GAMING
              </span>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <span>👤</span>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-10">
          <section className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950 via-[#19132d] to-[#10111a] p-6 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-20 h-32 w-48 rounded-full bg-blue-500/10 blur-3xl" />

            <div className="relative max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                PRIVATE GAMING LIBRARY
              </div>

              <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                Game favoritmu,
                <br />
                <span className="text-violet-300">di mana saja.</span>
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-6 text-zinc-300 sm:text-base">
                Satu tempat untuk mengakses koleksi game di PC milikmu.
                Buka library, pilih game, lalu mainkan melalui cloud gaming.
              </p>

              <button
                onClick={() =>
                  document
                    .getElementById("library")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-7 rounded-xl bg-violet-500 px-6 py-3 text-sm font-bold shadow-lg shadow-violet-600/20 transition hover:bg-violet-400"
              >
                Lihat Koleksi Game ↘
              </button>
            </div>

            <div className="pointer-events-none absolute bottom-5 right-8 hidden text-[120px] opacity-20 xl:block">
              🎮
            </div>
          </section>

          <section id="library" className="scroll-mt-24 pt-10">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-400">
                  YOUR COLLECTION
                </p>
                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Library Game
                </h2>
                <p className="mt-2 text-sm text-zinc-500">
                  Temukan game yang ingin kamu mainkan.
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-400">
                <span className="text-violet-400">▦</span>
                {filteredGames.length} game ditampilkan
              </div>
            </div>

            <div className="mt-7">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                  ⌕
                </span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cari nama game..."
                  className="w-full rounded-xl border border-white/10 bg-[#11121a] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-zinc-600 focus:border-violet-500/60 sm:max-w-md"
                />
              </div>

              <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
                      category === item
                        ? "bg-violet-500 text-white"
                        : "border border-white/10 bg-white/[0.03] text-zinc-400 hover:bg-white/[0.08]"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="mt-10 py-12 text-center text-sm text-zinc-400">
                Memuat daftar game...
              </div>
            ) : error ? (
              <div className="mt-10 rounded-xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-300">
                {error}
              </div>
            ) : filteredGames.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredGames.map((game) => (
                  <article
                    key={game.id}
                    className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#101118] transition duration-300 hover:-translate-y-1 hover:border-violet-400/40"
                  >
                    <div
                      className={`relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br ${game.color ?? "from-violet-950 via-slate-900 to-zinc-950"}`}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_65%)]" />
                      <span className="relative text-7xl transition duration-300 group-hover:scale-110">
                        {game.icon ?? "🎮"}
                      </span>
                      <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-200 backdrop-blur">
                        {game.category}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold tracking-wide">{game.title}</h3>
                      <p className="mt-2 min-h-10 text-xs leading-5 text-zinc-500">
                        {game.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4">
                        <span className="text-[10px] text-zinc-500">
                          {game.platform}
                        </span>                
                        <button
                          onClick={async () => {
                            setLaunching(game.id);
                            setLaunchMessage("");

                            try {
                              const response = await fetch("/api/launch", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ id: game.id }),
                              });

                              const data = await response.json();

                              if (!response.ok) {
                                throw new Error(data.error ?? "Gagal membuka game.");
                              }

                              setLaunchMessage(
                                "HoYoPlay sudah diminta untuk dibuka. Jika launchernya muncul, tekan Play untuk menjalankan ZZZ."
                              );
                            } catch (error) {
                              setLaunchMessage(
                                error instanceof Error
                                  ? error.message
                                  : "Terjadi kesalahan."
                              );
                            } finally {
                              setLaunching("");
                            }
                          }}
                          disabled={launching === game.id}
                          className="rounded-lg bg-violet-500/10 px-4 py-2 text-xs font-bold text-violet-300 transition hover:bg-violet-500 hover:text-white disabled:opacity-50"
                        >
                          {launching === game.id ? "Membuka..." : "Mainkan ↗"}
                        </button>

                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-white/10 py-16 text-center">
                <p className="text-3xl">🔎</p>
                <p className="mt-3 font-semibold">Game tidak ditemukan</p>
                <p className="mt-1 text-sm text-zinc-500">
                  Coba kata kunci atau kategori lain.
                </p>
              </div>
            )}

            {launchMessage && (
              <p className="mt-5 rounded-xl border border-violet-400/20 bg-violet-500/10 p-4 text-sm text-violet-200">
                {launchMessage}
              </p>
            )}
          </section>

          <footer className="mt-14 border-t border-white/[0.07] py-7 text-center text-xs text-zinc-600">
            CLOUDGAME · PRIVATE CLOUD GAMING · YOUR GAMES, YOUR PC
          </footer>
        </div>
      </div>
    </main>
  );
}
