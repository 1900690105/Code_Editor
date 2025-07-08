export async function POST(req) {
  const { source_code, language_id, stdin } = await req.json();

  try {
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=false",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        body: JSON.stringify({ source_code, language_id, stdin }),
      }
    );

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}

// export async function POST(req) {
//   const { source_code, language_id, stdin } = await req.json();

//   try {
//     const response = await fetch(
//       "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=false",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
//           "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//         },
//         body: JSON.stringify({
//           source_code,
//           language_id,
//           stdin,
//         }),
//       }
//     );

//     const data = await response.json();
//     return new Response(JSON.stringify(data), { status: 200 });
//   } catch (err) {
//     return new Response(JSON.stringify({ error: "Server error" }), {
//       status: 500,
//     });
//   }
// }
