"use client";
import { addSessionAtom, sessionListAtom } from "@/lib/simulation/atoms";
import { runSimulation } from "@/lib/simulation/calculations";
import { SimulationConfig } from "@/lib/simulation/types";
import {
  Accordion,
  AccordionControlProps,
  AccordionItem,
  ActionIcon,
  AppShell,
  Button,
  Center,
  Divider,
  Group,
  HoverCard,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSessionStorage } from "@mantine/hooks";
import {
  IconPlayerPlay,
  IconQuestionMark,
  IconRestore,
} from "@tabler/icons-react";
import { useAtom } from "jotai";
import { v4 } from "uuid";
import EnvironmentConfigurator from "./EnvironmentConfigurator";
import FluidConfigurator from "./FluidConfigurator";
import SolarPanelConfigurator from "./SolarPanelConfigurator";
import StorageTankConfigurator from "./StorageTankConfigurator";
import { TimeStepConfigurator } from "./TimeStepConfigurator";

const SOLAR_SIM_CONFIG_KEY = "solar_simulation_config";

const initialConfig: SimulationConfig = {
  timeStep: 3600,
  environment: {
    ambientTemperatureConfig: {
      maxTemp: 30,
      maxTempTime: 12,
      minTemp: 20,
      minTempTime: 1,
    },
    solarIrradianceConfig: {
      maxIrradiance: 1000,
      sunrise: 6,
      sunset: 18,
    },
  },
  solarPanel: {
    area: 2,
    efficiency: 60,
  },
  storageTank: {
    heatLossCoefficient: 0.1,
    maxAllowedTemperature: 70,
    volume: 0.15,
    surfaceArea: parseFloat((0.15 * 2 * Math.PI * 0.1).toFixed(2)),
    initialTemperature: 26,
  },
  fluid: {
    density: 1000,
    specificHeat: 4186,
  },
};

export default function Navbar() {
  const localConfig = sessionStorage
    ? sessionStorage.getItem(SOLAR_SIM_CONFIG_KEY)
    : undefined;

  const [sessionList] = useAtom(sessionListAtom);
  const [_, addSession] = useAtom(addSessionAtom);

  const [openAccordion, setOpenAccordion] = useSessionStorage<string[]>({
    key: "solar_simulation_open_accordion",
    defaultValue: ["env", "sp", "st", "fl"],
  });

  const form = useForm<SimulationConfig>({
    mode: "uncontrolled",
    initialValues: localConfig ? JSON.parse(localConfig) : initialConfig,
    onValuesChange: (values) => {
      sessionStorage.setItem(SOLAR_SIM_CONFIG_KEY, JSON.stringify(values));
    },
    validateInputOnBlur: true,
    validateInputOnChange: true,
    clearInputErrorOnChange: true,
    validate: {
      timeStep(value) {
        if (value < 60) {
          return "Time step must be greater than 60 seconds";
        }
        return null;
      },
      environment: {
        solarIrradianceConfig: {
          sunrise(value) {
            if (value < 0 || value > 24) {
              return "Sunrise must be between 0 and 24";
            }
            return null;
          },
          sunset(value, values) {
            if (value < 0 || value > 24) {
              return "Sunset must be between 0 and 24";
            }
            if (value < values.environment.solarIrradianceConfig.sunrise) {
              return "Sunset must be after sunrise";
            }
            return null;
          },
        },
      },
    },
  });

  return (
    <>
      <Stack gap="0">
        <Group p="sm" justify="center">
          <Tooltip
            label="Run simulation for 24 hours starting at midnight. Maximum of 10 sessions allowed."
            openDelay={300}
          >
            <Button
              disabled={Object.keys(sessionList).length >= 10}
              size="xs"
              onClick={() => {
                const config = form.getValues();

                const id = v4();

                const runs = runSimulation(
                  id,
                  config,
                  form.getValues().timeStep
                );

                addSession(id, config, runs);
              }}
              leftSection={<IconPlayerPlay size="1.2rem" />}
            >
              Run
            </Button>
          </Tooltip>

          <Tooltip
            label="Reset all configuration to default values."
            openDelay={300}
          >
            <Button
              size="xs"
              onClick={() => {
                form.setValues(initialConfig);
              }}
              leftSection={<IconRestore size="1.2rem" />}
            >
              Reset
            </Button>
          </Tooltip>
        </Group>
        <TimeStepConfigurator form={form} key={form.getValues().timeStep} />
      </Stack>
      <Divider />
      <AppShell.Section
        grow
        component={ScrollArea}
        type="auto"
        offsetScrollbars
      >
        <Accordion
          multiple={true}
          value={openAccordion}
          onChange={setOpenAccordion}
          chevronPosition="left"
        >
          <AccordionItem value="env">
            <Accordion.Control
              icon={
                <HoverCard
                  position="right"
                  withArrow
                  shadow="xs"
                  closeDelay={500}
                >
                  <HoverCard.Target>
                    <ThemeIcon
                      radius="xl"
                      size="sm"
                      color="gray"
                      variant="light"
                    >
                      <IconQuestionMark size="1rem" fontWeight="bold" />
                    </ThemeIcon>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text size="sm">Test</Text>
                  </HoverCard.Dropdown>
                </HoverCard>
              }
            >
              Environment
            </Accordion.Control>
            <Accordion.Panel>
              <EnvironmentConfigurator form={form} />
            </Accordion.Panel>
          </AccordionItem>
          <AccordionItem value="sp">
            <Accordion.Control
              icon={
                <HoverCard
                  position="right"
                  withArrow
                  shadow="xs"
                  closeDelay={500}
                >
                  <HoverCard.Target>
                    <ThemeIcon
                      radius="xl"
                      size="sm"
                      color="gray"
                      variant="light"
                    >
                      <IconQuestionMark size="1rem" fontWeight="bold" />
                    </ThemeIcon>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text size="sm">Test</Text>
                  </HoverCard.Dropdown>
                </HoverCard>
              }
            >
              Solar Panel
            </Accordion.Control>
            <Accordion.Panel>
              <SolarPanelConfigurator
                form={form}
                key={JSON.stringify(form.getValues().solarPanel)}
              />
            </Accordion.Panel>
          </AccordionItem>
          <AccordionItem value="st">
            <Accordion.Control
              icon={
                <HoverCard
                  position="right"
                  withArrow
                  shadow="xs"
                  closeDelay={500}
                >
                  <HoverCard.Target>
                    <ThemeIcon
                      radius="xl"
                      size="sm"
                      color="gray"
                      variant="light"
                    >
                      <IconQuestionMark size="1rem" fontWeight="bold" />
                    </ThemeIcon>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text size="sm">Test</Text>
                  </HoverCard.Dropdown>
                </HoverCard>
              }
            >
              Storage Tank
            </Accordion.Control>
            <Accordion.Panel>
              <StorageTankConfigurator
                form={form}
                key={JSON.stringify(form.getValues().storageTank)}
              />
            </Accordion.Panel>
          </AccordionItem>
          <AccordionItem value="fl">
            <Accordion.Control
              icon={
                <HoverCard
                  position="right"
                  withArrow
                  shadow="xs"
                  closeDelay={500}
                >
                  <HoverCard.Target>
                    <ThemeIcon
                      radius="xl"
                      size="sm"
                      color="gray"
                      variant="light"
                    >
                      <IconQuestionMark size="1rem" fontWeight="bold" />
                    </ThemeIcon>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text size="sm">Test</Text>
                  </HoverCard.Dropdown>
                </HoverCard>
              }
            >
              Fluid
            </Accordion.Control>
            <Accordion.Panel>
              <FluidConfigurator
                form={form}
                key={JSON.stringify(form.getValues().fluid)}
              />
            </Accordion.Panel>
          </AccordionItem>
        </Accordion>
      </AppShell.Section>
    </>
  );
}

function AccordionControl(props: AccordionControlProps) {
  return (
    <Center mr="xs">
      <AccordionControl {...props} />
      <ActionIcon size="sm" color="gray" radius="xl">
        <IconQuestionMark size="1rem" />
      </ActionIcon>
    </Center>
  );
}
