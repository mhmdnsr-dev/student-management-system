# Code Challenge

Student Management System web application using Angular.

## Taple of contents

- [Code Challenge](#code-challenge)
  - [Taple of contents](#taple-of-contents)
  - [Overview](#overview)
  - [Code and Project structure](#code-and-project-structure)
  - [Installation and run locally](#installation-and-run-locally)
  - [Build with](#build-with)
  - [Links](#links)
  - [Author](#author)

## Overview

This project is a web application developed using Angular, designed to serve as a comprehensive Student Management System. The primary objectives of this project include creating a robust CRUD (Create, Read, Update, Delete) functionality for managing student records and implementing essential user authentication features.

## Code and Project structure

- **/app**

  - `/components`
    - `/form`: Reusable form component.
    - `/navbar`: Houses the application footer component.
    - `/footer`: Houses the application navbar component.
    - `/not-found`: Houses the application not-found component.
    - `/student-card`: Reusable Card component.
  - `/pages`
    - `/student-home`: Home page.
    - `/student-edit`: Edit student page.
    - `/student-search`: search page.
  - `/services`
    - `/http.service.ts`: Handles communication with the backend API.
    - `/students.service.ts`: Handles state managenment for entire app.
    - `/auth.service.ts`: Handles authentication state for user.
  - `/auth`
    - `/login`: Contains the login-related components and logic.
    - `/register`: Houses the registration-related components and logic.
    - `/auth-guard`: Features authentication guard functionality.

- **/utils**
  - `/form-controls`: Reusable utilitys of form control data.
  - `/patterns`: Reusable Regex patterns.
  - `/patterns`: Form control validators
  - `/patterns`: Complex search and filtration function
  -

## Installation and run locally

```shell
# Example commands
git clone https://github.com/mhmdnsr-dev/student-management-system
cd student-management-system
npm install
npm run start
```

## Build with

- Angular framework
- Bootstrap framework

## Links

- [GitHub URL](https://github.com/mhmdnsr-dev/student-management-system)
- [Live URL](https://student-management-system-blush.vercel.app/login)

## Author

- [Mohamed Nasr](https://www.linkedin.com/in/mhmdnsr-dev)
