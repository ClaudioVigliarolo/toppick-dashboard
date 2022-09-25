import { auth } from "@/services/firebase";

export async function getAuthToken(): Promise<string> {
  let token = "";
  const user = auth.currentUser;
  if (user) {
    token = await user.getIdToken();
  }
  return token;
}
