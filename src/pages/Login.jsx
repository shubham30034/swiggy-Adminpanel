import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from '@/components/ui/button'
  import { Label } from "@/components/ui/label"
  import { Input } from "@/components/ui/input"


const Login = () => {
  return (
     <div className=' h-screen justify-center flex items-center'>
    <Card className="w-full max-w-sm ">
    <CardHeader>
      <CardTitle className="text-2xl">Login</CardTitle>
      <CardDescription>
        Enter your email below to login to your account.
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" required />
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Sign in</Button>
    </CardFooter>
    <CardFooter className="flex gap-5">
        <Button variant={"ghost"}>have not signup yet? signup</Button>
    </CardFooter>
   
  </Card>
  </div>
  )
}

export default Login