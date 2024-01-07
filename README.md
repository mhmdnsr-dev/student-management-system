# Code Challenge

Student Management System web application using Angular.

## Taple of contents

- [Code Challenge](#code-challenge)
  - [Taple of contents](#taple-of-contents)
  - [Overview](#overview)
  - [Code and Project structure](#code-and-project-structure)
    - [Installation](#installation)
    - [Links](#links)
  - [Author](#author)

## Overview

This assignment revolves around creating a Student CRUD application and implementing user authentication features

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

### Installation

```shell
# Example commands
git clone https://github.com/mhmdnsr-dev/student-management-system
cd student-management-system
npm install
npm run start
```

### Links

- [GitHub URL](https://github.com/mhmdnsr-dev/student-management-system)
- [Live URL](https://student-management-system-blush.vercel.app/login)

## Author

- [Mohamed Nasr](https://www.linkedin.com/in/mhmdnsr-dev)
