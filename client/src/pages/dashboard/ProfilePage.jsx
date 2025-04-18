"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, ShoppingBag, Truck, BarChart3, Settings } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock user data
  const userData = {
    name: "Jane Smith",
    email: "jane@example.com",
    joined: "March 2023",
    totalOrders: 12,
    totalCarbonSaved: 87.5,
    totalWaterSaved: 875,
    totalWasteDiverted: 43.75,
    monthlyGoal: 10,
    currentMonthSaved: 7.5,
    recentOrders: [
      { id: "ORD-123", date: "2023-06-15", total: 78.99, carbonSaved: 5.2 },
      { id: "ORD-122", date: "2023-05-28", total: 45.5, carbonSaved: 3.8 },
      { id: "ORD-121", date: "2023-05-10", total: 124.75, carbonSaved: 8.9 },
    ],
    badges: [
      {
        name: "Early Adopter",
        description: "One of our first 1000 customers",
        icon: Leaf,
      },
      {
        name: "Carbon Saver",
        description: "Saved over 50kg of CO₂",
        icon: Leaf,
      },
      {
        name: "Frequent Shopper",
        description: "Placed more than 10 orders",
        icon: ShoppingBag,
      },
    ],
  };

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 mt-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Your Impact Dashboard</h1>
          <p className="text-muted-foreground">
            Track your environmental impact and shopping history
          </p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          Account Settings
        </Button>
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-8"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-5 md:w-[600px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total CO₂ Saved
                </CardTitle>
                <Leaf className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userData.totalCarbonSaved} kg
                </div>
                <p className="text-xs text-muted-foreground">
                  Equivalent to {(userData.totalCarbonSaved * 30).toFixed(0)}{" "}
                  smartphone charges
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Water Saved
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-blue-600"
                >
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userData.totalWaterSaved} L
                </div>
                <p className="text-xs text-muted-foreground">
                  Equivalent to {Math.round(userData.totalWaterSaved / 150)}{" "}
                  showers
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Waste Diverted
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-600"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {userData.totalWasteDiverted} kg
                </div>
                <p className="text-xs text-muted-foreground">
                  From landfills and oceans
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Orders
                </CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userData.totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  Since {userData.joined}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Monthly Impact</CardTitle>
                <CardDescription>
                  Your environmental savings over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[200px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-16 w-16 mx-auto mb-2 opacity-50" />
                  <p>Impact chart visualization would go here</p>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Monthly Goal</CardTitle>
                <CardDescription>
                  {userData.currentMonthSaved} of {userData.monthlyGoal} kg CO₂
                  saved this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress
                    value={
                      (userData.currentMonthSaved / userData.monthlyGoal) * 100
                    }
                    className="h-2 bg-muted"
                  />

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-green-600">
                        {Math.round(
                          (userData.currentMonthSaved / userData.monthlyGoal) *
                            100
                        )}
                        %
                      </div>
                      <div className="text-xs text-muted-foreground">
                        of goal
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-3xl font-bold">
                        {userData.currentMonthSaved}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        kg saved
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-muted-foreground">
                        {(
                          userData.monthlyGoal - userData.currentMonthSaved
                        ).toFixed(1)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        kg to go
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Your latest eco-friendly purchases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{order.id}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Truck className="h-3 w-3 mr-1" />
                        <span>Delivered</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-medium">${order.total}</div>
                      <div className="text-xs flex items-center justify-end text-green-600">
                        <Leaf className="h-3 w-3 mr-1" />
                        {order.carbonSaved} kg CO₂ saved
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Impact</CardTitle>
              <CardDescription>
                Detailed breakdown of your positive impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="font-medium">Carbon Footprint Reduction</h3>
                  <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span>Total CO₂ Saved</span>
                      <span className="font-bold">
                        {userData.totalCarbonSaved} kg
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Equivalent to:</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-green-800 p-3 rounded-md text-center">
                          <div className="font-bold text-lg">
                            {(userData.totalCarbonSaved * 4).toFixed(1)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            km not driven by car
                          </div>
                        </div>
                        <div className="bg-white dark:bg-green-800 p-3 rounded-md text-center">
                          <div className="font-bold text-lg">
                            {(userData.totalCarbonSaved * 30).toFixed(0)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            smartphone charges
                          </div>
                        </div>
                        <div className="bg-white dark:bg-green-800 p-3 rounded-md text-center">
                          <div className="font-bold text-lg">
                            {(userData.totalCarbonSaved / 22).toFixed(1)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            trees planted for a year
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Water Conservation</h3>
                  <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span>Total Water Saved</span>
                      <span className="font-bold">
                        {userData.totalWaterSaved} liters
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Equivalent to:</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-blue-800 p-3 rounded-md text-center">
                          <div className="font-bold text-lg">
                            {Math.round(userData.totalWaterSaved / 150)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            showers
                          </div>
                        </div>
                        <div className="bg-white dark:bg-blue-800 p-3 rounded-md text-center">
                          <div className="font-bold text-lg">
                            {Math.round(userData.totalWaterSaved / 10)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            toilet flushes
                          </div>
                        </div>
                        <div className="bg-white dark:bg-blue-800 p-3 rounded-md text-center">
                          <div className="font-bold text-lg">
                            {Math.round(userData.totalWaterSaved / 2)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            drinking water bottles
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Waste Reduction</h3>
                  <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span>Total Waste Diverted</span>
                      <span className="font-bold">
                        {userData.totalWasteDiverted} kg
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Equivalent to:</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-amber-800 p-3 rounded-md text-center">
                          <div className="font-bold text-lg">
                            {Math.round(userData.totalWasteDiverted * 50)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            plastic bottles
                          </div>
                        </div>
                        <div className="bg-white dark:bg-amber-800 p-3 rounded-md text-center">
                          <div className="font-bold text-lg">
                            {Math.round(userData.totalWasteDiverted / 0.5)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            shopping bags
                          </div>
                        </div>
                        <div className="bg-white dark:bg-amber-800 p-3 rounded-md text-center">
                          <div className="font-bold text-lg">
                            {Math.round(userData.totalWasteDiverted / 5)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            garbage bags
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>All your eco-friendly purchases</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{order.id}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Truck className="h-3 w-3 mr-1" />
                        <span>Delivered</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-medium">${order.total}</div>
                      <div className="text-xs flex items-center justify-end text-green-600">
                        <Leaf className="h-3 w-3 mr-1" />
                        {order.carbonSaved} kg CO₂ saved
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Eco Badges</CardTitle>
              <CardDescription>
                Achievements for your sustainable shopping
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {userData.badges.map((badge, index) => (
                  <div
                    key={index}
                    className="bg-muted/50 p-4 rounded-lg text-center"
                  >
                    <badge.icon className="h-12 w-12 mx-auto mb-2 text-green-600" />
                    <h3 className="font-medium">{badge.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {badge.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Profile Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Name: {userData.name}
                    <br />
                    Email: {userData.email}
                    <br />
                    Member since: {userData.joined}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Notification Preferences</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage how and when you receive notifications about your
                    orders and environmental impact.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Privacy Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Control how your data is used and shared on our platform.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
