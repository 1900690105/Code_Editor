export async function POST(req) {
  const { token } = await req.json();

  try {
    const res = await fetch(
      `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );

    const data = await res.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Result fetch failed" }), {
      status: 500,
    });
  }
}
