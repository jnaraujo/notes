import { FormValues } from ".";

export async function signup(data : FormValues){
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json);
  }

  return json;
}