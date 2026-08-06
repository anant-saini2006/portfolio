// This route is no longer used. Profile photos are stored as base64 data URLs.
// This file can be safely deleted.
export async function GET() {
  return new Response("Not used", { status: 404 });
}
