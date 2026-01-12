
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, TrendingUp, Users, DollarSign } from "lucide-react";

// Super Reusable Card Component
export interface Props {
  title?: string;
  value?: string | number;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  children?: React.ReactNode;
  iconColor?: string;
  iconBgColor?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function StatisticCard({ 
  title, 
  value, 
  icon: Icon, 
  className = "", 
  children,
  iconColor = "text-blue-600",
  iconBgColor = "bg-blue-50",
  trend
}: Props) {
  return (
    <Card className={`w-full h-28 overflow-hidden transition-all duration-300 hover:border-gray-300 ${className}`}>
      <CardContent className="p-6 h-full flex items-center">
        <div className="flex items-start justify-between w-full">
          <div className="flex-1">
            {title && (
              <CardTitle className="text-sm font-semibold text-valck mb-3">
                {title}
              </CardTitle>
            )}
            
            {value !== undefined ? (
              <div className="space-y-2">
                <p className="text-base font-bold text-gray-900 tracking-tight">
                  {value.toString().toUpperCase()}
                </p>
                {trend && (
                  <div className={`flex items-center gap-1 text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    <TrendingUp className={`w-4 h-4 ${!trend.isPositive && 'rotate-180'}`} />
                    <span>{trend.value}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-1">{children}</div>
            )}
          </div>
          
          {Icon && (
            <div className={`p-3 rounded-xl ${iconBgColor} flex items-center justify-center shrink-0`}>
              <Icon className={`w-6 h-6 ${iconColor}`} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}