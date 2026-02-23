"use client";

import { useEffect, useRef, useState, useId } from "react";
import { Loader2, ExternalLink, AlertCircle } from "lucide-react";

type WidgetType =
  | "league-table"
  | "league-table-detail"
  | "team-fixtures"
  | "club-fixtures"
  | "club-results";

interface FAFullTimeWidgetProps {
  type: WidgetType;
  lrCode: string;
  /** Title to display. Pass false to hide the header entirely */
  title?: string | false;
  className?: string;
}

const widgetConfig: Record<
  WidgetType,
  { defaultTitle: string; width: string }
> = {
  "league-table": { defaultTitle: "League Table", width: "100%" },
  "league-table-detail": { defaultTitle: "League Table", width: "100%" },
  "team-fixtures": { defaultTitle: "Team Fixtures & Results", width: "100%" },
  "club-fixtures": { defaultTitle: "Club Fixtures", width: "100%" },
  "club-results": { defaultTitle: "Club Results", width: "100%" },
};

// Queue to manage sequential widget loading (FA script uses global variable)
const loadQueue: (() => void)[] = [];
let isLoading = false;

function processQueue() {
  if (isLoading || loadQueue.length === 0) return;
  isLoading = true;
  const next = loadQueue.shift();
  if (next) next();
}

export function FAFullTimeWidget({
  type,
  lrCode,
  title,
  className = "",
}: FAFullTimeWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const uniqueId = useId();
  const containerId = `lrep${lrCode}`;
  const config = widgetConfig[type];

  useEffect(() => {
    if (!containerRef.current) return;

    const loadWidget = () => {
      // Set the global lrcode variable that the FA script expects
      (window as unknown as Record<string, string>).lrcode = lrCode;

      // Create the script element with cache-buster to get fresh instance
      const script = document.createElement("script");
      script.src = `https://fulltime.thefa.com/client/api/cs1.js?_=${Date.now()}-${uniqueId.replace(/:/g, "")}`;
      script.async = false; // Load synchronously to ensure lrcode is read

      const finishLoading = () => {
        setLoading(false);
        isLoading = false;
        // Process next widget in queue
        setTimeout(processQueue, 100);
      };

      script.onload = finishLoading;
      script.onerror = () => {
        setError("Failed to load league data");
        finishLoading();
      };

      // Append script to the container
      containerRef.current?.appendChild(script);
    };

    // Add to queue and process
    loadQueue.push(loadWidget);
    processQueue();

    // Cleanup
    return () => {
      const index = loadQueue.indexOf(loadWidget);
      if (index > -1) loadQueue.splice(index, 1);
    };
  }, [lrCode, uniqueId]);

  // Watch for content to be injected
  useEffect(() => {
    if (!containerRef.current) return;

    const labelUnnamedLinks = (container: HTMLDivElement) => {
      container.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
        // Skip if already has accessible text
        if (a.textContent?.trim() || a.getAttribute("aria-label")) return;
        // Build label from sibling cell text in the same row
        const row = a.closest("tr");
        if (row) {
          const cellText = Array.from(row.querySelectorAll("td"))
            .map((td) => td.textContent?.trim())
            .filter(Boolean)
            .join(" ");
          if (cellText) a.setAttribute("aria-label", cellText);
        }
      });
    };

    const observer = new MutationObserver(() => {
      const container = containerRef.current;
      if (container && container.querySelector("table, .ft-table, div[style]")) {
        setLoading(false);
        labelUnnamedLinks(container);
      }
    });

    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
    });

    // Fallback timeout
    const timeout = setTimeout(() => {
      setLoading(false);
      if (containerRef.current) labelUnnamedLinks(containerRef.current);
    }, 8000);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  const widgetTypeClass = `fa-widget-${type}`;

  return (
    <div className={`fa-fulltime-widget ${widgetTypeClass} ${className}`}>
      {title !== false && (
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-btfc-gold rounded-full" />
            <h3 className="font-display text-2xl text-btfc-navy uppercase tracking-wider">
              {title || config.defaultTitle}
            </h3>
          </div>
          <a
            href="https://fulltime.thefa.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-btfc-gold transition-colors uppercase tracking-wider"
          >
            Powered by FA Full-Time
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      <div className="relative bg-white rounded-2xl border border-neutral-100 overflow-hidden shadow-lg">
        {/* Decorative top bar */}
        <div className="h-1 bg-gradient-to-r from-btfc-navy via-btfc-blue to-btfc-gold" />

        {/* Loading State */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-neutral-200" />
                <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-btfc-gold border-t-transparent animate-spin" />
              </div>
              <span className="text-sm font-medium text-neutral-500">Loading fixtures...</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-neutral-600 mb-4">{error}</p>
            <a
              href="https://fulltime.thefa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-btfc-navy text-white rounded-lg hover:bg-btfc-navy-light transition-colors text-sm font-medium"
            >
              View on FA Full-Time
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Widget Container */}
        <div
          ref={containerRef}
          id={containerId}
          style={{ width: config.width, minHeight: loading ? "250px" : "auto" }}
          className="fa-widget-content"
        >
          <noscript>
            <p className="p-6 text-center text-neutral-500">
              JavaScript is required to view this content.{" "}
              <a href="https://fulltime.thefa.com" className="text-btfc-blue hover:underline">
                View on FA Full-Time
              </a>
            </p>
          </noscript>
        </div>
      </div>
    </div>
  );
}

// Pre-configured widget variants
export function LeagueTable({
  detail = false,
  className,
  title,
}: {
  detail?: boolean;
  className?: string;
  title?: string;
}) {
  const lrCode = detail ? "765215930" : "271392697";
  return (
    <FAFullTimeWidget
      type={detail ? "league-table-detail" : "league-table"}
      lrCode={lrCode}
      title={title}
      className={className}
    />
  );
}

export function TeamFixturesResults({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <FAFullTimeWidget
      type="team-fixtures"
      lrCode="496287738"
      title={title || "Fixtures & Results"}
      className={className}
    />
  );
}

export function ClubFixtures({
  className,
  title,
}: {
  className?: string;
  title?: string | false;
}) {
  return (
    <FAFullTimeWidget
      type="club-fixtures"
      lrCode="782424744"
      title={title === false ? false : (title || "Club Fixtures")}
      className={className}
    />
  );
}

export function ClubResults({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <FAFullTimeWidget
      type="club-results"
      lrCode="460143057"
      title={title || "Club Results"}
      className={className}
    />
  );
}
