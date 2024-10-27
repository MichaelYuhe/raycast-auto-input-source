import { Application, getApplications, List } from "@raycast/api";
import { useEffect, useState } from "react";

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
        <List.Item key={app.name} title={app.name} />
      ))}
    </List>
  );
}
