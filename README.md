# graphql-front-boilerplate

graphql-front-boilerplate is a React project created by Wozzo [![Wozzo](https://www.wozzo.es/favicon.ico 'Wozzo')](https://www.wozzo.es) using React and GraphQL. This project works with [graphql-back-boilerplate](https://github.com/wozzocomp/graphql-back-boilerplate)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development.

### Clone the project with ssh

⚠️ If you have not ssh configured on you github look at [this](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

Open your terminal, go to the folder where you want to clone the project and use the following code

```
git clone git@github.com:wozzocomp/graphql-front-boilerplate.git
```

### Prerequisites

1. Install Homebrew

   Open terminal and paste this command

   ```
   /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
   ```

2. Install Node and NPM

   First Install XCode development software.

   Open Terminal and run this command:

   ```
   brew install node
   ```

   Check is Node is installed with this command

   ```
   node -v
   ```

   Check is NPM is installed with this command

   ```
   npm -v
   ```

3. Create the .env files

   You need to create the **.env.development** file in the root of the project

   ```
   /graphql-front-boilerplate/.env.development
   ```

   and now add this lines to the file:

   ```
    REACT_APP_PROXY=http://{YOUR_IP}:5000/
    REACT_WS_PROXY=ws://{YOUR_IP}:5000/
    NODE_PATH=./src
   ```

   ⚠️ Contact with a project admin to know the correct credentials.

### Installing

Open your terminal, go to te project folder and install de packages running the following command

```
npm install
```

## Built With

- [React](https://es.reactjs.org/docs/getting-started.html) - The framework used

## Contributing

Please read [CONTRIBUTING.md](https://github.com/wozzocomp/graphql-front-boilerplate/blob/development/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/wozzocomp/graphql-front-boilerplate/tags).

## Authors

- **Bernat Cañellas** - _Initial work_ - [BernatWozzo](https://github.com/BernatWozzo)

See also the list of [contributors](https://github.com/wozzocomp/graphql-front-boilerplate/contributors) who participated in this project.

## License

This project is a private software created by [Wozzo](https://github.com/wozzocomp)
