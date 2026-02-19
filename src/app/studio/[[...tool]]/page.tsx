import StudioLoader from "./StudioLoader";

export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  return <StudioLoader />;
}
