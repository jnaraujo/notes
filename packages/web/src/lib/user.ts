import Cookies from "js-cookie";

export async function fetchUser(){
  const token = Cookies.get("token");
  if (!token) {
    return null;
  }
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/users/me`, {
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  });

  if(!response.ok){
    return null;
  }

  const user = await response.json();

  return user;
}