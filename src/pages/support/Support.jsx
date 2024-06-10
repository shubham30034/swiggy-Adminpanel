import React from 'react';
import { Button } from '@/components/ui/button';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Support = () => {
  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Support</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-center">
        <Card className="max-w-4xl shadow-lg my-8">
          <CardHeader className="bg-gray-100 p-4 flex justify-between items-center">
            <div className="flex flex-col justify-center">
              <CardTitle className="text-lg font-semibold">Support</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Contact Information</h2>
              <p>Email: support@shadcn.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">Operating Hours</h2>
              <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p>Saturday - Sunday: Closed</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold mb-2">FAQs</h2>
              <ul>
                <li>How do I reset my password?</li>
                <li>How do I update my account information?</li>
                <li>What payment methods do you accept?</li>
              </ul>
            </div>
            <div className="flex justify-center">
              <Button variant="outline">Contact Us</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Support;
