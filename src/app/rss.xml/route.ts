import { getContentList } from "@/lib/data/queries";

export async function GET() {
  const content = await getContentList({ status: "published" });
  const siteUrl = "https://kernelspace.media";

  const itemsXml = content
    .map(
      (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${siteUrl}/content/${item.slug}</link>
      <guid>${siteUrl}/content/${item.slug}</guid>
      <pubDate>${new Date(item.publication_date).toUTCString()}</pubDate>
      <description><![CDATA[${item.description}]]></description>
    </item>`
    )
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Kernel Space — Think Deeper. Explore Further.</title>
    <link>${siteUrl}</link>
    <description>An independent multi-format media and knowledge platform exploring ideas, technology, psychology, and design.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
