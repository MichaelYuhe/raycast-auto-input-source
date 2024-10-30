import { Action, ActionPanel, Application, getApplications, List, LocalStorage } from "@raycast/api";
import { useEffect, useState } from "react";

const INPUT_METHODS = {
  英文: "com.apple.keylayout.ABC",
  中文: "com.apple.inputmethod.SCIM.ITABC",
};

export default function Command() {
  const [installedApplications, setInstalledApplications] = useState<Application[]>([]);

  useEffect(() => {
    (async () => {
      const installedApplications = await getApplications();
      setInstalledApplications(installedApplications);
    })();
  }, []);

  return (
    <List>
      {installedApplications.map((app) => (
        <Item app={app} key={app.bundleId} />
      ))}
    </List>
  );
}

function Item({ app }: { app: Application }) {
  const [inputMethod, setInputMethod] = useState("");

  const changeInputMethod = (bundleId: string | undefined, inputMethod: string) => {
    if (!bundleId) return;
    LocalStorage.setItem(bundleId, inputMethod);
    getInputMethod(bundleId);
  };

  const getInputMethod = async (bundleId: string | undefined) => {
    if (!bundleId) return "";
    const inputMethod = await LocalStorage.getItem(bundleId);
    setInputMethod(inputMethod as string);
    return inputMethod || "";
  };

  useEffect(() => {
    getInputMethod(app.bundleId);
  }, [app.bundleId]);

  return (
    <List.Item
      key={app.bundleId}
      title={app.name}
      subtitle={inputMethod || ""}
      actions={
        <ActionPanel>
          {Object.entries(INPUT_METHODS).map(([key, value]) => (
            <Action key={key} title={key} onAction={() => changeInputMethod(app.bundleId, value)} />
          ))}
        </ActionPanel>
      }
    />
  );
}
