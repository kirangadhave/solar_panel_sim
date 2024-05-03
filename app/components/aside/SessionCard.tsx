import { useSession } from "@/lib/simulation/atoms";
import {
  ActionIcon,
  Box,
  Divider,
  Group,
  Menu,
  NumberFormatter,
  Paper,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from "@mantine/core";
import {
  IconCheck,
  IconDotsVertical,
  IconEye,
  IconEyeOff,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useRef, useState } from "react";

export function SessionCard({ id }: { id: string }) {
  const [editName, setEditName] = useState(false);
  const textBoxRef = useRef<HTMLInputElement>(null);
  const {
    session,
    setSessionName,
    isVisible,
    toggleVisibility,
    deleteSession,
  } = useSession(id);

  return (
    <Paper key={session.id} shadow="sm" p="sm" withBorder>
      <Stack justify="flex-start" align="stretch" gap="xs">
        <Group justify="space-between" align="start">
          <Box>
            {editName ? (
              <TextInput
                ref={textBoxRef}
                defaultValue={session.name}
                size="xs"
                variant="unstyled"
                style={{
                  borderBottom: "1px solid var(--mantine-color-gray-5)",
                }}
                onBlur={(event) => {
                  const newName = event.target.value.trim();
                  if (newName.length > 0) {
                    setSessionName(newName);
                  }
                  setEditName(false);
                }}
                mb="xs"
                rightSectionWidth="auto"
                rightSection={
                  <Group gap="xs">
                    <ActionIcon
                      size="xs"
                      variant="transparent"
                      c="green"
                      onClick={(event) => {
                        const txtBox = textBoxRef.current;

                        if (!txtBox) return;
                        const newName = txtBox.value.trim();

                        if (newName.length > 0) {
                          setSessionName(newName);
                        }
                        setEditName(false);
                      }}
                    >
                      <IconCheck />
                    </ActionIcon>
                    <ActionIcon
                      size="xs"
                      variant="transparent"
                      c="red"
                      onClick={() => {
                        setEditName(false);
                      }}
                    >
                      <IconX />
                    </ActionIcon>
                  </Group>
                }
              />
            ) : (
              <Text
                fw={500}
                onDoubleClick={() => {
                  setEditName(true);
                }}
              >
                {session.name}
              </Text>
            )}
            <Text c="gray" size="xs">
              {new Date(session.createdOn).toLocaleString()}
            </Text>
          </Box>
          <Box>
            <Group gap="0">
              {isVisible ? (
                <ActionIcon
                  size="sm"
                  variant="white"
                  onClick={toggleVisibility}
                >
                  <IconEye />
                </ActionIcon>
              ) : (
                <ActionIcon
                  size="sm"
                  variant="white"
                  onClick={toggleVisibility}
                  c="gray"
                >
                  <IconEyeOff />
                </ActionIcon>
              )}
              <Menu>
                <Menu.Target>
                  <ActionIcon size="sm" variant="white" c="gray">
                    <IconDotsVertical />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => deleteSession(id)}
                    leftSection={
                      <ThemeIcon c="red" size="xs" variant="transparent">
                        <IconTrash />
                      </ThemeIcon>
                    }
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Box>
        </Group>
        <Divider />
        <Stack gap="0" justify="flex-start">
          {/* ---- */}
          <Box>
            <Text size="xs" span fw="500">
              Initial Fluid Temp:{" "}
            </Text>
            <Text size="xs" span fw="500">
              <NumberFormatter
                suffix=" °C"
                decimalScale={2}
                value={session.config.storageTank.initialTemperature}
              />
            </Text>
          </Box>
          {/* ---- */}
          <Box>
            <Text size="xs" span fw="500">
              Final Fluid Temp:{" "}
            </Text>
            <Text size="xs" span fw="500">
              <NumberFormatter
                suffix=" °C"
                decimalScale={2}
                value={session.runs[session.runs.length - 1].finalTemperature}
              />
            </Text>
          </Box>
          {/* ---- */}
          <Box>
            <Text size="xs" span fw="500">
              Total Heat Transferred:{" "}
            </Text>
            <Text size="xs" span fw="500">
              {session.runs[
                session.runs.length - 1
              ].cummulativeHeatAdded.toExponential(2)}{" "}
              J
            </Text>
          </Box>
          {/* ---- */}
          <Box>
            <Text size="xs" span fw="500">
              Total Heat Loss:{" "}
            </Text>
            <Text size="xs" span fw="500">
              {session.runs[
                session.runs.length - 1
              ].cummulativeHeatLossAmbient.toExponential(2)}{" "}
              J
            </Text>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
}
