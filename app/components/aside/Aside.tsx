import { AppShell, Divider, ScrollArea, Text, Title } from "@mantine/core";

export default function Aside() {
  return (
    <>
      <Title order={2}>History</Title>
      <Divider mb="xs" />
      <AppShell.Section grow component={ScrollArea}>
        <Text>History 1</Text>
        <Divider />
        <Text>History 1</Text>
        <Divider />
        <Text>History 1</Text>
        <Divider />
        <Text>History 1</Text>
      </AppShell.Section>
    </>
  );
}
