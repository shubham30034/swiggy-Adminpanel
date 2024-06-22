import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CirclePlus, CircleMinus } from 'lucide-react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from 'react-query';
import { createRestaurant } from '@/http/api';
import myStore from '@/store';
import { useNavigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';

const formSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long' }).max(50),
    price: z.string()
        .refine((val) => !isNaN(parseFloat(val)), { message: 'Price must be a number' })
        .transform((val) => parseFloat(val)),
    address: z.string().min(2, { message: 'Address must be at least 2 characters long' }).max(200, { message: 'Address must be 200 characters or less' }),
    imageFile: z.instanceof(FileList).refine((file) => file.length === 1, { message: 'Image is required' }).refine((file) => file.item(0)?.type.startsWith('image/'), { message: 'File must be an image' })
});

const CreateRestaurants = () => {
    const { setToken, addToken } = myStore();
    const navigate = useNavigate()

   

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            price: '',
            address: '',
        }
    });

    const imageFileRef = form.register('imageFile');
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: createRestaurant,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['restaurants']})
           console.log("restaurant created successfuly");
           navigate("/dashboard/restaurants");
        },
    });
    




    const onSubmit = (values) => {
      
    console.log(values);
    const jsonData = {
        name: values.name,
        price: values.price,
        address: values.address,
         imageFile : values.imageFile[0]
    };

    console.log(jsonData, "JSON Data");
     console.log(setToken,"ahjahiufbauigfukajv dcbxdfn");
     mutation.mutate({ data: jsonData, token: setToken });
   

    }

    return (
        <section>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex justify-between'>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="/dashboard/restaurants">Restaurants</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Create</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className='flex items-center gap-5'>
                            <Link to={"/dashboard/restaurants"}>
                            <Button variant={"outline"} as={Link} to="/dashboard/restaurants">
                                <CircleMinus />
                                <span>Cancel</span>
                            </Button>
                            </Link>
                            <Button type="submit" disable={mutation.isLoading}>
                          {mutation.isLoading &&  <LoaderCircle className='animate-spin'/> }
                                <CirclePlus />
                                <span>Submit</span>
                            </Button>
                        </div>
                    </div>

                    <div>
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle>Create Restaurant</CardTitle>
                                <CardDescription>Restaurant Description</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6">
                                    <FormField control={form.control} name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        className="w-full"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField control={form.control} name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="text"
                                                        className="w-full"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField control={form.control} name="address"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Address</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        className="w-full"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField control={form.control} name="imageFile"
                                        render={({ }) => (
                                            <FormItem>
                                                <FormLabel>Image</FormLabel>
                                                <FormControl>
                                                    <Input type="file" {...imageFileRef} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </form>
            </Form>
        </section>
    );
}

export default CreateRestaurants;
