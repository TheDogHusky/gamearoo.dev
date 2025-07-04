# gamearoo.dev

## Installing

The website requires [Node.js](https://nodejs.org/) v 22.x.x, NPM v 10.x.x to run and yarn v1.22.22.

You must clone the repository first:

```sh
git clone https://github.com/Gamearoo-s-Development/gamearoo.dev.git
```

Then, install the dependencies:

```sh
yarn install
```

## Running

Firstly, you must configure it properly: rename the `.env.example` file to `.env` and fill in the required fields.
Then, create a `logs` folder in the root directory.

After, you can use Docker to run the website:

```sh
sudo docker-compose up -d
```