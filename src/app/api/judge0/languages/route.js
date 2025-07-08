// export async function GET() {
//   try {
//     const response = await fetch("https://judge0-ce.p.rapidapi.com/languages", {
//       headers: {
//         "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
//         "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//       },
//     });

//     const data = await response.json();
//     return new Response(JSON.stringify(data), { status: 200 });
//   } catch (err) {
//     return new Response(
//       JSON.stringify({ error: "Failed to fetch languages" }),
//       { status: 500 }
//     );
//   }
// }

export async function GET() {
  try {
    const response = await fetch("https://judge0-ce.p.rapidapi.com/languages", {
      headers: {
        "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    });
    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch languages" }),
      { status: 500 }
    );
  }
}
