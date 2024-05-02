import { sessionAtom } from "@/app/page";
import { runSimulation } from "@/lib/simulation/calculations";
import { SimulationConfig } from "@/lib/simulation/types";
import {
  Accordion,
  AccordionItem,
  AppShell,
  Button,
  Divider,
  Group,
  ScrollArea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSessionStorage } from "@mantine/hooks";
import { useAtom } from "jotai";
import { v4 } from "uuid";
import EnvironmentConfigurator from "./EnvironmentConfigurator";
import FluidConfigurator from "./FluidConfigurator";
import SolarPanelConfigurator from "./SolarPanelConfigurator";
import StorageTankConfigurator from "./StorageTankConfigurator";

const SOLAR_SIM_CONFIG_KEY = "solar_simulation_config";

const initialConfig: SimulationConfig = {
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
  },
  fluid: {
    density: 1000,
    specificHeat: 4186,
  },
};

export default function Navbar() {
  const localConfig = sessionStorage.getItem(SOLAR_SIM_CONFIG_KEY);

  const [_, setSession] = useAtom(sessionAtom);

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
      <AppShell.Section grow component={ScrollArea}>
        <Group p="sm" justify="space-between">
          <Button
            size="sm"
            onClick={() => {
              const config = form.getValues();
              console.log(JSON.stringify(config, null, 2));

              setSession({
                id: v4(),
                config,
                runs: runSimulation(config, 3600),
              });
            }}
          >
            Run
          </Button>

          <Button
            size="sm"
            onClick={() => {
              form.setValues(initialConfig);
            }}
          >
            Reset
          </Button>
        </Group>
        <Divider />
        <Accordion
          multiple={true}
          value={openAccordion}
          onChange={setOpenAccordion}
          chevronPosition="left"
        >
          <AccordionItem value="env">
            <Accordion.Control>Environment</Accordion.Control>
            <Accordion.Panel>
              <EnvironmentConfigurator form={form} />
            </Accordion.Panel>
          </AccordionItem>
          <AccordionItem value="sp">
            <Accordion.Control>Solar Panel</Accordion.Control>
            <Accordion.Panel>
              <SolarPanelConfigurator
                form={form}
                key={JSON.stringify(form.getValues().solarPanel)}
              />
            </Accordion.Panel>
          </AccordionItem>
          <AccordionItem value="st">
            <Accordion.Control>Storage Tank</Accordion.Control>
            <Accordion.Panel>
              <StorageTankConfigurator
                form={form}
                key={JSON.stringify(form.getValues().storageTank)}
              />
            </Accordion.Panel>
          </AccordionItem>
          <AccordionItem value="fl">
            <Accordion.Control>Fluid</Accordion.Control>
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
