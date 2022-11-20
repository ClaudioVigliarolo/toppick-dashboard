import { auth } from "@/services/firebase";

let lastCheck = new Date().getTime();

//firebase auth bug, returns invalid token after around 30-60 minutes.
const REFRESH_INTERVAL_IN_MINUTES = 15;
function shouldTokenRefresh(): boolean {
  const now = new Date().getTime();
  var diffMs = now - lastCheck;
  var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
  //console.log("diffmins", diffMins);
  if (diffMins >= REFRESH_INTERVAL_IN_MINUTES) {
    lastCheck = new Date().getTime();
    //console.log("return true");
    return true;
  }
  return false;
}
export async function getAuthToken(): Promise<string> {
  let token = "";
  //var start = new Date().getTime();
  const user = auth.currentUser;
  if (user) {
    token = await user.getIdToken(shouldTokenRefresh());
  }
  //var end = new Date().getTime();
  //var time = end - start;
  //console.log("Execution time: " + time);
  return token;
}
