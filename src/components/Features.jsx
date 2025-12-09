import React from "react";
import { Truck, Lock, RotateCcw, Clock } from "lucide-react";

const features = [
  {
    icon: Truck,
    text: "Lightning Delivery",
    subtext: "Get it in hours, not days",
  },
  {
    icon: Lock,
    text: "Secure Checkout",
    subtext: "Fast and protected payments",
  },
  {
    icon: RotateCcw,
    text: "Hassle-Free Returns",
    subtext: "Easy returns in 30 days",
  },
  {
    icon: Clock,
    text: "24/7 Live Support",
    subtext: "Instant help whenever you need",
  },
];

const Features = () => {
  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon
                className="h-9 w-9 text-gray-600 mb-2 sm:mb-0 sm:mr-4"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {feature.text}
                </p>
                <p className="mt-1 text-xs text-gray-500">{feature.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
