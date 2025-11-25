import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Briefcase, Calendar, TrendingUp } from "lucide-react";

interface AttractionCardProps {
  title: string;
  image: string;
  location: string;
  company?: string;
  duration?: string;
  achievements?: string[];
  onClick?: () => void;
}

export default function AttractionCard({ 
  title, 
  image, 
  location, 
  company,
  duration,
  achievements,
  onClick 
}: AttractionCardProps) {
  return (
    <Card 
      onClick={onClick} 
      className="cursor-pointer overflow-hidden rounded-2xl shadow-md transition-all duration-200 hover:scale-[1.01] hover:shadow-xl border-l-4 border-l-blue-500"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-110" 
        />
        {duration && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-sm">
            <Calendar className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-gray-700">{duration}</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        {company && (
          <div className="mb-1 flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-sm font-bold text-blue-600">{company}</span>
          </div>
        )}
        <h3 className="mb-2 text-base font-semibold text-gray-900 leading-tight">{title}</h3>
        <div className="flex items-center text-xs text-gray-600 mb-3">
          <MapPin className="mr-1 h-3.5 w-3.5 text-gray-400" />
          <span>{location}</span>
        </div>
        
        {achievements && achievements.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1 mb-2">
              <TrendingUp className="h-3.5 w-3.5 text-green-600" />
              <span className="text-xs font-semibold text-gray-700">Key Achievements</span>
            </div>
            <ul className="space-y-1">
              {achievements.slice(0, 2).map((achievement, idx) => (
                <li key={idx} className="text-xs text-gray-600 flex items-start">
                  <span className="text-green-600 mr-1.5 mt-0.5">•</span>
                  <span className="flex-1">{achievement}</span>
                </li>
              ))}
              {achievements.length > 2 && (
                <li className="text-xs text-blue-600 font-medium">
                  +{achievements.length - 2} more...
                </li>
              )}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
