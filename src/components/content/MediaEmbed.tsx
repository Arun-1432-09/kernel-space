"use client";

import React from "react";
import { getYouTubeVideoId, getSpotifyEmbedInfo } from "@/lib/utils";

interface MediaEmbedProps {
  mediaUrl?: string | null;
  title: string;
  className?: string;
}

export function MediaEmbed({ mediaUrl, title, className = "" }: MediaEmbedProps) {
  if (!mediaUrl) return null;

  const youtubeId = getYouTubeVideoId(mediaUrl);
  if (youtubeId) {
    return (
      <div className={`relative w-full aspect-video rounded-xl overflow-hidden shadow-card border border-kernel-border bg-black ${className}`}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>
    );
  }

  const spotifyInfo = getSpotifyEmbedInfo(mediaUrl);
  if (spotifyInfo) {
    return (
      <div className={`w-full rounded-xl overflow-hidden shadow-card border border-kernel-border bg-kernel-charcoal ${className}`}>
        <iframe
          src={`https://open.spotify.com/embed/${spotifyInfo.type}/${spotifyInfo.id}?utm_source=generator&theme=0`}
          title={title}
          width="100%"
          height={spotifyInfo.type === "episode" ? "232" : "152"}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="border-0 rounded-xl"
        />
      </div>
    );
  }

  // Not a valid YouTube or Spotify embed URL
  return null;
}
