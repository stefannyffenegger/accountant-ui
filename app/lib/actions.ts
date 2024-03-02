"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getAccessTokenFromSession } from "./data";

const FormSchema = z.object({
  accountName: z.string({
    invalid_type_error: "Please enter an Account name.",
  }),
  currency: z.string({
    invalid_type_error: "Please enter a currency.",
  }),
});
const CreateAccount = FormSchema.omit({});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    formData.append("redirect", "true");
    formData.append("redirectTo", "/");
    //console.log("FORM DATA:",formData);
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function createAccount(
  prevState: string | undefined,
  formData: FormData
) {
  // Validate form fields using Zod
  const validatedFields = CreateAccount.safeParse({
    accountName: formData.get("accountName"),
    currency: formData.get("currency"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Account.",
    };
  }

  // Prepare data for insertion into the database
  const { accountName, currency } = validatedFields.data;
  try {
    let jwt = await getAccessTokenFromSession();
    if (!jwt) {
      return null;
    }
    const data = await fetch(process.env.BACKEND_URL + "/api/accounts/", {
      method: "POST",
      body: JSON.stringify({
        name: accountName,
        currency: currency,
      }),
      headers: {
        Authorization: "Bearer " + jwt,
        "Content-Type": "application/json",
      },
    });

    if (!data.ok) {
      return "Account creation failed, status not ok";
    }
    //revalidatePath('/accounts');
  } catch (error) {
    return "Failed to create Account";
  }
}
