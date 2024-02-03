# gamearoo.dev

## Installing

The website requires [Node.js](https://nodejs.org/) v 18.x.x and NPM v 10.x.x to run.

You must clone the repository first:

```sh
git clone https://github.com/Gamearoo-s-Development/gamearoo.dev.git
```

Then, install the dependencies:

```sh
npm install
```

## Running

Firstly, you must configure it properly: rename the `config.example.ts` file to `config.ts` and fill in the required fields.
Then, create a `logs` folder in the root directory.

As the website is made in TypeScript, you must compile the code first. So I added a start script which compiles and runs.

```sh
npm run start
```