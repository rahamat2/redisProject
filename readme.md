# RedisCacheApp

## Description

RedisCacheApp is a full stack application combining with a frontend named client and a backend named apiServer. MongoDb is used for the database and redis is used for the chache server. When a data is searched from the client end, the apiServer checks the Redis cache. If found in cache, then responds with the data. If it did not find in cache, then searches the database and if found responds with it. This time it saves the data in cache.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [Tests](#tests)
- [License](#license)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)

## Installation

To install it, follow these steps:

1. Install node js
2. Run a Redis server at 6375 port. To know more, [Click](https://redis.io/) here.
3. Clone the repository
4. Create a database in MongoDb atlas and copy the connection string. To know more, [Click](https://www.mongodb.com/atlas/database) here.
5. Change the variable DB_URL in .env file, with above connection string. The .env file can be found in 'apiServer' folder.
