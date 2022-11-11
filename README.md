<!-- Please update value in the {}  -->

<h1 align="center">My Unsplash</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://my-unsplash-umber.vercel.app/">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/dvqc/my-unsplash">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/rYyhwJAxMfES5jNQ9YsP">
      Challenge
    </a>
  </h3>
</div>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
- [Built With](#built-with)
- [Features](#features)
- [How to use](#how-to-use)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- OVERVIEW -->

## Overview

![screenshot](https://user-images.githubusercontent.com/16707738/92399059-5716eb00-f132-11ea-8b14-bcacdc8ec97b.png)

Introduce your projects by taking a screenshot or a gif. Try to tell visitors a story about your project by answering:

- Where can I see your demo?
- What was your experience?
- What have you learned/improved?
- Your wisdom? :)

### Built With

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Prisma](https://www.prisma.io/)
- [Postgresql](https://www.postgresql.org/)

## Features

<!-- List the features of your application or follow the template. Don't share the figma file here :) -->

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge. The [challenge](https://devchallenges.io/challenges/rYyhwJAxMfES5jNQ9YsP) was to build an application to complete the given user stories:

- User story: I can see a list of photos in the masonry layout that I have added
- User story: I can add a new photo to the list - the new photo should be on top of the list
- User story: I can search for photos by label
- User story: When I hover a photo, I can see a label and a delete button
- User story: I can delete images

However, more features were added to give the application more functionality such as authentication, a route for a user's photos, the ability to like photos and responsiveness.

## How To Use

<!-- Example: -->

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/dvqc/my-unsplash.git

# Install dependencies
$ npm install

# Run the app
$ npm run start
```

You will also need to set some environment variables:

1. Set up the database connection url

```
# .env

# Specify the url of your database connection that is going to be used by the prisma client.
# If you don't have an existing database you can set one up quickly using docker:
# docker run --name postgresql -e POSTGRES_USER=my_unsplash -e POSTGRES_PASSWORD=my_unsplash -p 5432:5432 -v ~/projects/# my-unsplash/data:/var/lib/postgresql/data -d postgres
DATABASE_URL=postgresql://rftvlgwu:OXghjpuLESIIv_X52phDRF5TFoFsSsbm@lucky.db.elephantsql.com/rftvlgwu
```

## Acknowledgements

<!-- This section should list any articles or add-ons/plugins that helps you to complete the project. This is optional but it will help you in the future. For example: -->

- [Elephantsql for their free database hosting tier](https://www.elephantsql.com/)
- [SWR, a lightweight react hooks for data fetching library](https://swr.vercel.app/)

## Contact

- Website [b-ibrahim](https://b-ibrahim.vercel.app/)
- GitHub [@dvqc](https://github.com/dvqc)
