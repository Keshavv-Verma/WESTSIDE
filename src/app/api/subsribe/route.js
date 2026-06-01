export async function POST(req, res) {
  try {
    await req.json();
    return Response.json({ "success": true }, { status: 200 })
  } catch (error) {
    return Response.json({ "success": false, error: error.message }, { status: 404 })
  }
}
