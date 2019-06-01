# Technical Test - Driver state

**Please read those instructions carefully**, it contains useful information to help you complete the
test successfully.

> Expected completion time: a few hours <br/>
> Preferred languages are [Node.js](https://nodejs.org/en/) and [ReactJS](https://github.com/facebook/react)

## Purpose

This test will ask you to build an application allowing anyone to view on a map 
the real-time state and position of our drivers in a geographical zone.

To facilitate the evaluation, we advise you to use :
- Node >= 10.15
- RabbitMQ >= 3.4.1
- React >= 16.2 (if need be)

### Back-end

The states are read from the RabbitMQ exchange `drivers` with the routing key `drivers.update`. 
Their anatomy is:

```json
{
  "id": "{string} [DRIVER_ID]",
  "state": "(available|ride|...)",
  "position": [ "{number} latitude", "{number} longitude" ]
}
```

The RabbitMQ connection string is: [amqp://guest:guest@localhost:5672](amqp://guest:guest@localhost:5672).

*The rest is up to you :)*

### Front-end

The front application must display in **real-time** on a **map** the **states** and the **positions** of 
all the drivers in the current **geographical zone**. The zoom and the pan must be available. The total 
number of drivers in the zone must be displayed.

If the page is refreshed, it should instantly display the most up-to-date position of the drivers 
even if the application does not receive any new messages.

#### Optional Goal
If the age of a driver's position is greater than a certain value - that you will have to determine - 
an indication of the fact that this position is outdated should be given. The way to display this information 
is totally up to you.

### Before starting

Read the following section to start the drivers' states emission worker. This will initialize the RabbitMQ 
server as well as the states producer you will consume for your application.

[Starting the states' producer](./producer/README.md)
