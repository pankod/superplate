---
id: auth0
title: Auth0
sidebar_label: Auth0
description: How to use Auth0 in Next.js for Authentication?
---

Auth0 is a flexible, drop-in solution to add authentication and authorization services to your applications. Your team and organization can avoid the cost, time, and risk that come with building your own solution to authenticate and authorize users.

[Refer to official documentation for detailed usage.](https://github.com/auth0/nextjs-auth0#getting-started)

### Setup

Create a Regular Web Application in the [Auth0 Dashboard](https://manage.auth0.com/#/applications).

Take note of the Client ID, Client Secret, and Domain values under the "Basic Information" section, then add them to the `.env.local` file at the root level.

You will then be able to use to the following pages:

 - /api/auth/login
 - /api/auth/callback
 - /api/auth/logout
 - /api/auth/me

On your pages, you can access the `user` object by importing the `useUser()` hook.

```javascript
// pages/index.js
import { useUser } from '@auth0/nextjs-auth0';

export default function Index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <div>
        Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
      </div>
    );
  }

  return <a href="/api/auth/login">Login</a>;
}
```