export const dynamic = "force-static";
export function GET() {
  return new Response("Not available in static export", { status: 404 });
}
