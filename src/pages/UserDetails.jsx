import React, { useRef, useState } from 'react';
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
import { useQuery, useMutation, useQueryClient } from 'react-query';
import myStore from '@/store';
import { userDetails, updateUser } from '@/http/api';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Breadcrumb,BreadcrumbList,BreadcrumbItem,BreadcrumbLink,BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { FaEdit } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";

const UserDetails = () => {
  const { setToken } = myStore();
  const queryClient = useQueryClient();
  const [updateError, setUpdateError] = useState();
  const { toast } = useToast();

  const updateName = useRef();
  const updateEmail = useRef();
  const updateNumber = useRef();

  const { data, isError, isLoading, isPending } = useQuery({
    queryKey: ['userDetails'],
    queryFn: () => userDetails(setToken),
    staleTime: 10000,
    onSuccess: () => {
      console.log(data, "data fetched successfully");
    }
  });

  const mutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries('userDetails');
      toast({
        title: "Success",
        description: "User details updated successfully!",
        status: "success",
        duration: 1000,
      });
    },
    onError: (error) => {
      setUpdateError(error?.response?.data?.message);
      console.log(updateError);
      toast({
        variant:"destructive",
        title: "Error",
        description: `Error updating user details: ${updateError}`,
        status: "error",
        duration: 1000,
      });
    }
  });

  if (isLoading || isPending) {
    return <div className="flex justify-center my-20">Loading...</div>;
  }

  if (isError) {
    return <div className="flex justify-center my-20">Error loading user details.</div>;
  }

  const user = data.data.details[0];

  const handleUpdate = (field) => {
    const updatedDetails = {};
    if (field === 'name') {
      updatedDetails.name = updateName.current.value;
    } else if (field === 'email') {
      updatedDetails.email = updateEmail.current.value;
    } else if (field === 'number') {
      updatedDetails.number = updateNumber.current.value;
    }
    mutation.mutate({ data: updatedDetails, token: setToken });
  };

  return (
    <>
      <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">user </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
    <div className="flex justify-center">
      
      <Card className="w-full max-w-3xl shadow-lg my-8">
        <CardHeader className="bg-gray-100 p-4 flex justify-between items-center">
          <div className="flex flex-col justify-center">
            <CardTitle className="text-lg font-semibold">User Details</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              {user.role}
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
                <p className="text-gray-800">{user.name}</p>
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
                      defaultValue={user.name}
                      className="mt-4 p-2 border border-gray-300 rounded"
                      ref={updateName}
                    />
                    <Button className="mt-4" disabled={mutation.isError} onClick={() => handleUpdate('name')}>Save</Button>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Email:</p>
                <p className="text-gray-800">{user.email}</p>
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
                      defaultValue={user.email}
                      className="mt-4 p-2 border border-gray-300 rounded"
                      ref={updateEmail}
                    />
                    <Button className="mt-4" onClick={() => handleUpdate('email')}>Save</Button>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Phone Number:</p>
                <p className="text-gray-800">{user.number}</p>
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
                      defaultValue={user.number}
                      className="mt-4 p-2 border border-gray-300 rounded"
                      ref={updateNumber}
                    />
                    <Button className="mt-4" onClick={() => handleUpdate('number')}>Save</Button>
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
    </>
  );
};

export default UserDetails;