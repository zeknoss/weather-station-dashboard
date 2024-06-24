# Weather Station Dashboard

## Abstract

This is a simple project I've created in single day for my Bresser WiFi ClearView 7-in-1 weather station.

It kinda mimicks the interface of the station screen to show real time data from the station.

## How does it work?

The project uses the intercepted AWEKAS post data from the weather station and shows the relevant
data in the related placement.

The project has 2 parts.
1. Backend: It's a simple API that collects the AWEKAS compliant data posted from the device and stores it in a JSON file (will add a simple database storage in future to show trends in the UI in the future)
2. Frontend: This is a simple Vue.js 3 SPA application that resides in the same project. It mimicks the Bresser's panel UI with some additions (dynamic backgrounds depending time of day and the local weather conditions)

## How to setup

You can run the project with a simple LAMP or LEMP server or you can use Docker (recommended) to run it in containerized environment.
You can point your domain or subdomain to the server IP and can access your dashboard from anywhere with internet.

As an example, I simply setup it on my Raspberry Pi OpenMediaVault Compose module. Defined the env vars,
built the image and put it online with Nginx Proxy Manager. Then setup my station's AWEKAS endpoint to my own domain. (subdomain.mydomain.ext)

1. Clone the project
2. Use docker-compose or Docker, or a simple apache/nginx server setup to serve the directory
3. Define the env vars for docker-compose (optional for docker users): `PATH_TO_REPOSITORY_DIR` and `EXPOSE_PORT`
4. Clone the `.env.example` file and rename it `.env`
5. Enter the desired values to the .env vars
6. Set the security parameters (username and pass) to protect your API from unwanted access
7. Go online
8. Open the configuration interface of your weather station
9. Change the AWEKAS domain name / IP to your where you are hosting your project and enter the username and password too
10. The device will start sending the data and you will be able to see it on your dashboard with a slight delay

Let me know if you have any problems, suggestions, requests or need help.

## Contributions

If you wish to support the project, just open a feature request issue or create a pull request.

If any weather station manifacturer wishes to implement this dashboard into their device, I'd be more than happy to help. I'm not asking for money or looking for recognition, I just think this kind of UI is a must have for these devices.

In example, the Bresser can show a simple web interface for config purposes. It's really easy to show the frontend UI as a static page and provide a simple URL that the frontend can fetch the latest data from and et voila! Now the owners of the device can access the UI from the local device IP and can even serve it on the web.