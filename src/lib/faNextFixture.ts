import { format, parse, isFuture } from "date-fns";

// BTFC fixtures/results widget lrcode (src/components/sections/FAFullTimeWidget)
const FA_LR_CODE = "621339226";

export interface FANextFixture {
  opponent: string;
  isHome: boolean;
  date: string;
  venue?: string;
}

// ponytail: scrapes FA Full-Time's undocumented widget HTML — only used as a
// fallback when no Sanity match is scheduled. If FA changes their markup this
// silently returns null and the homepage falls back to "Season Complete".
export async function getFANextFixture(): Promise<FANextFixture | null> {
  try {
    const stamp = format(new Date(), "yyyyMMddHHmm");
    const res = await fetch(
      `https://fulltime.thefa.com/js/cs1.html?cs=${FA_LR_CODE}&random=${stamp}`,
      { headers: { "User-Agent": "Mozilla/5.0" } }
    );
    if (!res.ok) {
      console.warn(`[faNextFixture] FA request failed: ${res.status}`);
      return null;
    }

    const raw = await res.text();
    const innerHtmlMatch = raw.match(/innerHTML\s*=\s*'([\s\S]*)';\s*$/);
    if (!innerHtmlMatch) {
      console.warn("[faNextFixture] Could not parse FA response", raw.slice(0, 300));
      return null;
    }
    const html = innerHtmlMatch[1];

    const tokenRe =
      /background-color: #E6FAFF;[^>]*>\s*([^<]+?)\s*<\/td>|<tr style="background-color: #b3f0ff; color: #333;  height:15px;">([\s\S]*?)<\/tr>/g;

    let lastDate: string | null = null;
    let t: RegExpExecArray | null;
    while ((t = tokenRe.exec(html))) {
      if (t[1]) {
        lastDate = t[1].trim();
        continue;
      }
      if (!t[2] || !lastDate) continue;

      const anchors = [...t[2].matchAll(/<a [^>]*>([\s\S]*?)<\/a>/g)].map((a) =>
        a[1].replace(/\s+/g, " ").trim()
      );
      if (anchors.length < 7) continue;

      const [, home, homeScore, , awayScore, away, venue] = anchors;
      if (homeScore || awayScore) continue; // played or postponed

      const fixtureDate = parse(lastDate, "EEE dd MMM yyyy HH:mm", new Date());
      if (!isFuture(fixtureDate)) continue;

      const isHome = home === "Bollington Town";
      return {
        opponent: isHome ? away : home,
        isHome,
        date: fixtureDate.toISOString(),
        venue: venue || undefined,
      };
    }
    return null;
  } catch (err) {
    console.warn("[faNextFixture] fetch/parse threw", err);
    return null;
  }
}
