export async function login(data: FormData) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(data)),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return await response.text();
}
