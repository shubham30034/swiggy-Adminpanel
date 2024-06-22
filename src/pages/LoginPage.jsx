import React, { useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from 'react-router-dom';
import { useMutation } from 'react-query';
import { login } from "../http/api";
import { useNavigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import myStore from '@/store';
import { useState } from 'react';
import { loginValidation } from '@/utils/validation/validation';


  






const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const [error,setError] = useState("")


   

    const { setToken, addToken } = myStore();


    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {

            addToken(data?.data?.token);
            
            navigate("/dashboard/home");
        },
        onError:(error)=>{
            setError(error.response.data.message)
        }
    });

 




    const handelLoginSubmit = () => {
        const email = emailRef?.current?.value;
        const password = passwordRef?.current?.value;

       const result = loginValidation({ email, password });
       if (!result.success) {
           const errorMessages = result?.error?.errors[0]?.message
           setError(errorMessages);
           return;
       }

       setError("")

        mutation.mutateAsync({ email, password });
    }


    return (
        <div className='h-screen justify-center flex items-center'>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                        {mutation.isError && <div className='text-red-400'>{mutation.error.message}</div>}
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required ref={emailRef} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required ref={passwordRef} />
                    </div>
                {  error &&   <h1 className=' text-red-600'>{error}</h1> }
                </CardContent>
               
                <CardFooter>
                    <Button onClick={handelLoginSubmit} className="w-full flex items-center gap-5" disable={mutation.isLoading}>
                        {mutation.isLoading && <LoaderCircle className='animate-spin'/>} 
                        <span>Sign in</span>
                    </Button>
                </CardFooter>
                <CardFooter>
                    <div className="text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to={'/auth/signup'} className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Login;
