# react-server

## Introduction
1. The back-end server provides an interface for the front-end react-client and returns data
2. Use Express.Js as web framework
3. Use MongoDB for data storage, connection with MongoDb Cloud-Native Database Atlas
> * Due to safety concerns, login infos is hidden, please create a "config.json" under the same directory, in format like:
>    ``` json
>   {
>        "username": "YOUR USERNAME",
>        "password": "YOUR PASSWORD"
>    }
>   ```
> * Make sure there is a database name "ReactDemo", as well as two collections "todoList" and "applications" in this database
4. Use Cross-origin resource sharing (CORS) mechanism to solve cross domain issue

## Install node dependency library
Using npm:

``` bash
$ npm install
```
