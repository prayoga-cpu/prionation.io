"use client";

import { useEffect } from "react";

// The real Discord invite. Swap this anytime without touching your ads.
const DISCORD_INVITE = "https://discord.gg/FYB5HmYtg9";

export default function DiscordRedirect() {
  useEffect(() => {
    // 1. Fire the Pixel so this click becomes a retargetable event.
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "Lead", {
        content_name: "Discord Join",
        content_category: "community_launch",
      });
    }

    // 2. Redirect after a short beat so the Pixel beacon has time to send.
    const t = setTimeout(() => {
      window.location.replace(DISCORD_INVITE);
    }, 600);

    return () => clearTimeout(t);
  }, []);

  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        background: "#000000",
        color: "#FFFFFF",
        fontFamily: "Rubik, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          fontSize: 13,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#73767D",
        }}
      >
        PRIONATION.io
      </div>
      <div style={{ fontSize: 22, fontWeight: 700 }}>
        Taking you to Discord…
      </div>
      <a
        href={DISCORD_INVITE}
        style={{ color: "#5865F2", fontSize: 14, textDecoration: "underline" }}
      >
        Click here if you&apos;re not redirected
      </a>
    </main>
  );
}
