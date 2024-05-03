# Solar Panel Heat Transfer Simulation

The goal of [this web app](https://kirangadhave.github.io/solar_panel_sim/) is to simulate heat transfer from a solar panel to fluid in a storage tank. The application simulatges 24 hours of the system starting at midnight.

## Simulation
The simulation done by the app is very basic and makes a lot of assumptions. It does not take into account the flow of the water, and ignores all the losses (except to environment). The project attempts to demonstrate a UI for configuring a physics simulation and visualize the results different runs in a user-friendly manner. The prototype can be improved by replacing the simulation logic with a more accuracte version and adding more charts.

### User Interface
The user interface has three parts: the configuration sidebar on the left, the history sidebar on the right and the main view in the center.

The left side bar allows customization of various elements in the system (see `models` section below).

On the right, there is list of all previously run simulations. The number of runs are limited to $10$, due to limits on size of `localStorage` in the browser. The application uses `localStorage` to persist the simulations across browser refresh. You can show or hide a simulation result from the main view. Simulations can also be renamed for easier identification.

The main view in the center shows the selected simulations in a dashboard of line-charts or a paginated data table.



### Models
The simulation considers four elements of the system: the environment, the solar panel, the storage tank, and the fluid.

#### Environment
You can configure the time for sunrise and sunset along with the peak irradiance value. The simulation models the irradiance as a sine curve peaking at solar noon, simulating change in solar energy received by the solar panel through the day.

The ambient temperature is modelled with a parabolic function with peak during afternoon and dip in morning and evening. The max/min temperatures and times can be specified.

#### Solar Panel
Surface area and efficiency can be specified, and the heat energy is calculated using the irradiance ($I$) at a given time, the area ($A$) and efficiency ($\eta$) as follows:

$$Q = \eta \times A \times I$$

#### Storage Tank
The storage tank models the volume of the fluid, and the initial temperature of the fluid at the start of the simulation.

The simulation assumes the only losses are caused by temperature difference between the fluid temperature and ambient temperature and the surface area of the tank.

Max safe temperature for the fluid can be specified. The simulation assumes that any excess energy that results in rise in temperature is dumped using some heat dumping mechanism.

#### Fluid
The density and specific heat capacity of the fluid determine change in fluid's temperature.

## Technologies
- The application is written in TypeScript using the [React](https://react.dev/), [Next.js](https://nextjs.org/), and the [mantine](https://mantine.dev/) component library.
- The application uses the [Jotai](https://jotai.org/) for light state management. The visualizations are crafted using custom VegaLite specification and the [react-vega](https://github.com/vega/react-vega) package.
- The data table is rendered using the [Mantine React Table](https://v2.mantine-react-table.com/) library.

## Development

The web app is a Next.js app and automatically deploys to github pages on pushing to main branch.

To setup a local instance for development:

1. Clone the Github repository.
```bash copy
git clone https://github.com/kirangadhave/solar_panel_sim
```

2. `cd` into the directory and install the dependencies.
```bash copy
cd solar_panel_sim
npm install
```

3. Start the local development server.
```bash copy
npm run dev
```

4. Ensure the app builds before pushing for deployment.
```bash copy
npm run build
```