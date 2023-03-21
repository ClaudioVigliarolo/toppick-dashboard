import { auth } from "@/services/firebase";

let lastCheck = new Date().getTime();

//firebase auth bug, returns invalid token after around 30-60 minutes.
const REFRESH_INTERVAL_IN_MINUTES = 15;
function shouldTokenRefresh(): boolean {
  const now = new Date().getTime();
  const diffMs = now - lastCheck;
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
  if (diffMins >= REFRESH_INTERVAL_IN_MINUTES) {
    lastCheck = new Date().getTime();
    return true;
  }
  return false;
}
export async function getAuthToken(): Promise<string> {
  let token = "";
  const user = auth.currentUser;
  if (user) {
    token = await user.getIdToken(shouldTokenRefresh());
  }
  return token;
}
