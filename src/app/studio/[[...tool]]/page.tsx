import dynamic from "next/dynamic";

const Studio = dynamic(() => import("./Studio"), { ssr: false });

export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  return <Studio />;
}
