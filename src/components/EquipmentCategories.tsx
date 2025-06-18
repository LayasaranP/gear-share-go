
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  {
    name: 'Construction Tools',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop',
    itemCount: '2,400+ items',
    description: 'Drills, saws, excavators, and more'
  },
  {
    name: 'Farming Equipment',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop',
    itemCount: '1,800+ items',
    description: 'Tractors, tillers, harvesting tools'
  },
  {
    name: 'Automotive Tools',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop',
    itemCount: '3,200+ items',
    description: 'Lifts, diagnostic tools, specialty wrenches'
  },
  {
    name: 'Landscaping',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
    itemCount: '1,500+ items',
    description: 'Mowers, trimmers, leaf blowers'
  },
  {
    name: 'Power Tools',
    image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop',
    itemCount: '4,100+ items',
    description: 'Grinders, sanders, welders'
  },
  {
    name: 'Heavy Machinery',
    image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400&h=300&fit=crop',
    itemCount: '900+ items',
    description: 'Forklifts, bulldozers, cranes'
  }
];

const EquipmentCategories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-xl text-gray-600">
            Find the right equipment for your project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="group cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm font-medium">
                    {category.itemCount}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600">
                    {category.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EquipmentCategories;
