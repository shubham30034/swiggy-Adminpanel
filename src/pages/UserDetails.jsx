import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from 'react-query';
import myStore from '@/store';
import { userDetails } from '@/http/api';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaEdit } from "react-icons/fa";

const UserDetails = () => {
  const { setToken } = myStore();

  const { data, isError, isLoading, isPending } = useQuery({
    queryKey: ['userDetails'],
    queryFn: () => userDetails(setToken),
    staleTime: 10000,
    onSuccess: () => {
      console.log(data, "data fetched successfully");
    }
  });

  if (isLoading || isPending) {
    return <div className="flex justify-center my-20">Loading...</div>;
  }

  if (isError) {
    return <div className="flex justify-center my-20">Error loading user details.</div>;
  }

  const { name, email, number, role } = data.data.details[0];

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-3xl shadow-lg my-8">
        <CardHeader className="bg-gray-100 p-4 flex justify-between items-center">
          <div className="flex flex-col justify-center">
            <CardTitle className="text-lg font-semibold">User Details</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {role}
            </CardDescription>
          </div>
          <Avatar className="w-24 h-24">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Name:</p>
                <p className="text-gray-800">{name}</p>
              </div>
              <Sheet>
                <SheetTrigger>
                  <FaEdit className="cursor-pointer" />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit Name</SheetTitle>
                    <SheetDescription>
                      Update the user's name.
                    </SheetDescription>
                    <input
                      type="text"
                      defaultValue={name}
                      className="mt-4 p-2 border border-gray-300 rounded"
                    />
                    <Button className="mt-4">Save</Button>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Email:</p>
                <p className="text-gray-800">{email}</p>
              </div>
              <Sheet>
                <SheetTrigger>
                  <FaEdit className="cursor-pointer" />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit Email</SheetTitle>
                    <SheetDescription>
                      Update the user's email.
                    </SheetDescription>
                    <input
                      type="email"
                      defaultValue={email}
                      className="mt-4 p-2 border border-gray-300 rounded"
                    />
                    <Button className="mt-4">Save</Button>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Phone Number:</p>
                <p className="text-gray-800">{number}</p>
              </div>
              <Sheet>
                <SheetTrigger>
                  <FaEdit className="cursor-pointer" />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Edit Phone Number</SheetTitle>
                    <SheetDescription>
                      Update the user's phone number.
                    </SheetDescription>
                    <input
                      type="tel"
                      defaultValue={number}
                      className="mt-4 p-2 border border-gray-300 rounded"
                    />
                    <Button className="mt-4">Save</Button>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-100 p-4 flex justify-end">
          <Button variant="outline">Contact Us</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserDetails;
