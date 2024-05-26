import React from 'react';
import { useQuery } from 'react-query';
import { getAllRes } from '@/http/api';
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { Button } from "@/components/ui/button"
  
  

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {Card} from "@/components/ui/card"; // Assuming Card component is in a file named Card.js
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"; // Assuming these components are exported from Card.js
import myStore from '@/store';
import { CirclePlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react';

const Restaurants = () => {
  const { setToken } = myStore();
  

  const { data, isError, isLoading } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => getAllRes(setToken),
    staleTime:10000
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  console.log(data,"DATA");

  return (
    <>
    <div className=' flex justify-between'>
    <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href="/components">restaurants</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
    </BreadcrumbList>
  </Breadcrumb>
  
    <Link to={"/dashboard/create/restaurant"}> 
    <Button>
  <CirclePlus />
  <span>Add Restaurants</span>
  </Button>
  </Link>
  
  
</div>


<Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Restaurants</CardTitle>
                  <CardDescription>
                    Manage Your Restaurants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Image</span>
                        </TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Price 
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Total Sales
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Created at
                        </TableHead>
                        <TableHead className="">
                          <span className="">Action</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {  data?.data?.data.map((elem)=>(
                            <TableRow key={elem._id}>
                            <TableCell className="hidden sm:table-cell">
                              <img
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={elem.imageUrl}
                                width="64"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                               {elem.name}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{elem.address}</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {elem.price}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              25
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              2023-07-12 10:42 AM
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="outline" 
                                  >
                                   
                                    <span className=""><Pencil /></span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                    ))
                     
                      }
                    
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                    products
                  </div>
                </CardFooter>
              </Card>
              </>
  )
}

export default Restaurants