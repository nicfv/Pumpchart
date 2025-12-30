# Pumpchart %VERSION%

## *Determine pump relationship between flow rate and pressure at different operating conditions*

[![Bundle Stats](https://github.com/nicfv/Pumpchart/actions/workflows/bundle-stats.yml/badge.svg)](https://github.com/nicfv/Pumpchart/actions/workflows/bundle-stats.yml)
[![CI](https://github.com/nicfv/Pumpchart/actions/workflows/ci.yml/badge.svg)](https://github.com/nicfv/Pumpchart/actions/workflows/ci.yml)
[![Latest Grafana API compatibility check](https://github.com/nicfv/Pumpchart/actions/workflows/is-compatible.yml/badge.svg)](https://github.com/nicfv/Pumpchart/actions/workflows/is-compatible.yml)
[![Release](https://github.com/nicfv/Pumpchart/actions/workflows/release.yml/badge.svg)](https://github.com/nicfv/Pumpchart/actions/workflows/release.yml)

## What is a pump chart?

Pump charts illustrate the relationship between fluid flow rate and head pressure for centrifugal pumps. Pump charts are often used in pump sizing selections and help engineers understand the pump's performance and effiency under various conditions.

Similar to the psychrometric chart described above, a pump chart is a graphical representation of various *states* of a hydraulic system. A *state* consists of a **flow rate** (e.g. gpm or m^3/h) and a **head pressure** (e.g. psi or bar.) The head pressure can also be represented in terms of the height of a fluid column, so it may be represented in units such as feet or meters, but it represents the same property regardless if it is a measurement of pressure or length. Other properties can be present such as pump speed, input power, and efficiency, but only **flow rate** and **head pressure** are needed to fix the state.

It's these two properties (flow and head) that are represented on the axes of the pump chart. Flow rate is represented on the x-axis and head pressure is represented on the y-axis.

> One way to visualize **head** if given in terms of length, is that it would be the maximum possible height that a pump could move the fluid for that flow rate.

## Pump and System Curves

In addition to the axes and plotted data points, Pumpchart renders two additional curves. These are called the **pump performance curve** and the **system curve**. The pump performance curve(s) show the relationship between the pump's flow rate and the pressure added to the fluid. There may be concentric pump performance curves that show this relationship for different operating speeds.

The system curve represents the characteristics of the system, independent from the pump curve. It illustrates the relationship between flow rate and head loss for the entire hydraulic system. Head loss can be due to sharp pipe bends, friction, throttling, or any other restrictions in the system.

For a closed system, the system curve should theoretically pass through the origin, indicating no head loss for no flow. For an open system, the system curve will pass through a point along the y-axis, indicating that there is a head loss even for no flow. This head loss is the elevation difference between the system inlet and outlet, which the pump needs to overcome in order to produce any flow at all.

## Operation Point

Pumps will *always* operate somewhere along the system curve in steady-state operation. Where the pump curve (for the current pump speed) and the system curve meet is called the **operation point**. The operation point can be adjusted by one of two ways:

1. **Adjusting the pump speed** which adjusts the active pump curve. If this is possible (e.g. the pump has multiple speed settings or is powered by a variable frequency drive) then this maintains the efficiency of the pump.
1. **Throttle the system** which adjusts the system curve. This decreases pump efficiency because the same amount of power is inputted into the pump motor but it is outputting a lower flow rate.

## Grafana Options

1. Set the measured units; flow, head, power, and speed. Every value of those properties will be assumed to be that unit.
1. Set the specific gravity of the process fluid. This is used to convert from pressure to head (in length.)
1. Set the pump parameters. These are used to build the pump curve. Also, by adding numerical "speed steps", this will render concentric pump curves at each constant speed.
1. Set the system parameters. These are used to build the system curve.
1. Select your data sources. These must be time-dependent numeric data series.
1. Set some display options, for example changing the gradient or point radius. Here you can also decide whether to colorize by time or efficiency. In order to colorize by efficiency, a data series for power *must* be set.

## Troubleshooting

**A solution cannot be found.** A common cause of this issue is improperly setting the pump curve and system curve parameters. These values must be set in order for the pump curve and system curves to cross at a single point of operation.

Another possible cause for this is that the target speed is too low to overcome the static head loss of the system. To find out if this is the case, temporarily set the system parameter for static head loss to zero.

**My speed steps are not showing up.** This may be because they are set too low or too high. Be sure to set your speed steps to numerical values in between zero and the maximum pump speed.

**I don't see any data.** First, make sure that the point radius isn't set too small. If that's not it, know that the graph bounds for Pumpchart are determined by the pump parameters. It's possible that some data is being rendered out of bounds, so by increasing the pump parameters, the data may become visible on the graph. If this is the case, you likely have selected the wrong units.

**My data is all red.** This occurs when you are trying to colorize by efficiency but Pumpchart does not have a valid data series for pump input power.

## Metadata

| Plugin ID | Version | Date |
| --------- | ------- | ---- |
| `%PLUGIN_ID%` | `%VERSION%` | `%TODAY%` |
