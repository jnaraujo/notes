import { FormValues } from ".";

export async function signup(data: FormValues) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }
  const token = await response.text();
  return token;
}

export function errorToMessage(error: any) {
  switch (error.code) {
    case "INVALID_EMAIL":
      return {
        field: "email",
        message: "Esse email é inválido.",
      };
    case "INVALID_USERNAME":
      return {
        field: "username",
        message: "Esse nome de usuário é inválido.",
      };
    case "INVALID_PASSWORD":
      return {
        field: "password",
        message: "Essa senha é inválida.",
      };
    case "EMAIL_ALREADY_EXISTS":
      return {
        field: "email",
        message: "Esse email já está em uso.",
      };
    case "USERNAME_ALREADY_EXISTS":
      return {
        field: "username",
        message: "Esse nome de usuário já está em uso.",
      };
    default:
      return {
        message: "Ocorreu um erro ao criar sua conta.",
      };
  }
}
