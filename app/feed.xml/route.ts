import { getContentAdapter } from "@/lib/adapters";
import { getAllEpisodes } from "@/lib/adapters/pagination";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://unshakablebase.com";
const PODCAST_TITLE = "The Unshakable Base";
const PODCAST_DESCRIPTION =
  "Weekly conversations with leaders, entrepreneurs, and thinkers who've built something that lasts. Hosted by industry experts sharing insights on resilience, leadership, and sustainable success.";

export async function GET() {
  const adapter = getContentAdapter();
  const episodes = await getAllEpisodes(adapter.episodes);

  const rssItems = episodes
    .map(
      (episode) => `
    <item>
      <title><![CDATA[${episode.title}]]></title>
      <link>${BASE_URL}/episodes/${episode.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/episodes/${episode.slug}</guid>
      <pubDate>${new Date(episode.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${toCData(episode.description)}]]></description>
      ${episode.audioUrl ? `<enclosure url="${episode.audioUrl}" type="audio/mpeg" length="0" />` : ""}
      <itunes:duration>${formatDuration(episode.duration)}</itunes:duration>
      <itunes:episode>${episode.episodeNumber}</itunes:episode>
      ${episode.hosts.length > 0 ? `<itunes:author><![CDATA[${toCData(episode.hosts.map((host) => host.name).join(', '))}]]></itunes:author>` : ""}
      <itunes:summary><![CDATA[${toCData(episode.description)}]]></itunes:summary>
    </item>
  `
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${PODCAST_TITLE}</title>
    <link>${BASE_URL}</link>
    <description><![CDATA[${PODCAST_DESCRIPTION}]]></description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <itunes:author>${PODCAST_TITLE}</itunes:author>
    <itunes:summary><![CDATA[${PODCAST_DESCRIPTION}]]></itunes:summary>
    <itunes:type>episodic</itunes:type>
    <itunes:explicit>false</itunes:explicit>
    <itunes:category text="Business">
      <itunes:category text="Entrepreneurship"/>
    </itunes:category>
    <itunes:category text="Education">
      <itunes:category text="Self-Improvement"/>
    </itunes:category>
    <itunes:image href="${BASE_URL}/images/podcast-cover.jpg"/>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

function toCData(value: string): string {
  return value.replaceAll(']]>', ']]]]><![CDATA[>');
}
