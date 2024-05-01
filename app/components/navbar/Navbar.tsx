import { AppShell, Divider } from "@mantine/core";
import EnvironmentConfigurator from "./EnvironmentConfigurator";
import SolarPanelConfigurator from "./SolarPanelConfigurator";
import StorageTankConfigurator from "./StorageTankConfigurator";

export default function Navbar() {
  return (
    <AppShell.Section>
      <EnvironmentConfigurator />
      <Divider />
      <SolarPanelConfigurator />
      <Divider />
      <StorageTankConfigurator />
    </AppShell.Section>
  );
}
