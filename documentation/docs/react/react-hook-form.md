---
id: react-hook-form
title: React Hook Form
sidebar_label: React Hook Form
description: How to use react-hook-form in React?
---

### Overview

Performant, flexible and extensible forms with easy-to-use validation.

React-hook-form is a library that helps you validate forms in React. React-hook-form is a minimal library without any other dependencies. It is performant and straightforward to use, requiring developers to write fewer lines of code than other form libraries.

[Refer to official documentation for detailed usage. &#8594](https://react-hook-form.com/)

### Usage

```jsx title="src/App.tsx"
import { useForm, SubmitHandler } from 'react-hook-form'

interface Input {
    name: string,
    email: string
}

export default function App() {
    const { register , handleSubmit, formState: { errors }} = useForm<Input>();
    const onSubmit: SubmitHandler<Input> = () => {
        // What you want to do when submit is set here
    }

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <input type="text" defaultValue="testUserName" {...register("name")} />

            <input
                {...register("email", {
                    required: "Email address cannot be empty",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email adress",
                    },
                })}
            />

            {/* We can also handling error when validation failed */}
            {errors.email?.type === "required" && <span>{errors.email.message}</span>}
            {errors.email?.type === "pattern" && <span>{errors.email.message}</span>}

            <input type="submit" />
        </form>
    );
}
```

List of validation rules supported:

- required
- min
- max
- minLength
- maxLength
- pattern
- validate

[Check out the validation rules and more examples. &#8594](https://react-hook-form.com/get-started)

### Adding react-hook-form to your project later

If you didn't choose the plugin during project creation phase, you can follow the instructions below to add it.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
 <TabItem value="npm">

```bash
npm install react-hook-form
```
 </TabItem>

 <TabItem value="yarn">

```bash
yarn add react-hook-form
```
 </TabItem>
</Tabs>
