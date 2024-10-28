import { LocalStorage, showHUD } from "@raycast/api";
import { runAppleScript } from "@raycast/utils";
import { GET_ACTIVE_APP_SCRIPT, SWITCH_INPUT_METHOD_SCRIPT } from "../utils/script";

export default async function Command() {
  const appBundleId = await runAppleScript(GET_ACTIVE_APP_SCRIPT);
  if (!appBundleId) {
    showHUD("No active application");
    return;
  }

  LocalStorage.setItem("prevAppBundleId", appBundleId);
  const prevAppBundleId = await LocalStorage.getItem("prevAppBundleId");
  if (prevAppBundleId === appBundleId) {
    return;
  }

  const inputMethod = await LocalStorage.getItem(appBundleId);
  if (!inputMethod) {
    showHUD("No input method applied");
    return;
  }

  const res = await runAppleScript(SWITCH_INPUT_METHOD_SCRIPT, [inputMethod as string]);
  console.log("res", res);
}
