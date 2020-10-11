# Petful Client

## Authors:

Jim Smith and Michael Oldacre

## Live Demo

https://client-eta-cyan.vercel.app/

## Description

The Petful app mimics an animal shelter where cats and dogs are up for adoption, with the unique twist that customers may only adopt the chosen type of animal that has been at the shelter the longest. Customers can see the curren animals up for adoption as well as the current line of customers and as a customer adopts a pet, that customer and the pet(s) are removed from the appropiate list.
A user may submit their info to add themselves to the line to adopt, and when they are next in line, they will see the "adopt" buttons available under the pet details.
For this demo to simulate other users, the customer line is pre-populated with 3 users and each user in line will adopt a pet every 5 seconds and the next users move up a spot in line. When the live user is the current user in line to adopt, additional customers will get in line until their are five users.

##Tech Stack

### Web Client

- HTML
- CSS
- JavaScript
- React

### API Server

- Node
- Express
