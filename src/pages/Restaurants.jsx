import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getAllRes, deleteRes } from '@/http/api';
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import myStore from '@/store';
import { CirclePlus, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Restaurants = () => {
  const { setToken } = myStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const { data, isError, isLoading } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => getAllRes(setToken),
    staleTime: 10000,
  });

  const handleDelete = async (id) => {
    await deleteRes(id);
    queryClient.invalidateQueries('restaurants');
  };

  const handelUpdate = async(data)=>{
    console.log(data,"data");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  if (!data || data.data.data.length === 0) {
    return <div>No data available.</div>;
  }

  return (
    <>
      <div className='flex justify-between'>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Restaurants</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Link to="/dashboard/create/restaurant">
          <Button>
            <CirclePlus />
            <span>Add Restaurant</span>
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Restaurants</CardTitle>
          <CardDescription>Manage Your Restaurants</CardDescription>
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
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden md:table-cell">Total Sales</TableHead>
                <TableHead className="hidden md:table-cell">Created at</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.data.map((elem) => (
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
                  <TableCell className="font-medium">{elem.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{elem.address}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{elem.price}</TableCell>
                  <TableCell className="hidden md:table-cell">25</TableCell>
                  <TableCell className="hidden md:table-cell">2023-07-12 10:42 AM</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="outline">
                          <Pencil />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={()=>handelUpdate(elem)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(elem._id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default Restaurants;
