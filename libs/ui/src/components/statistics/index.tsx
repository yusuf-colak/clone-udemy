import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/libs/ui/components/ui/card";
import { GanttChartSquare, Minus, Plus, Users } from "lucide-react";
import { cn } from "@/libs/ui/utils"

interface StatisticsProps {
    className?: string;
}
const Statistics = ({className}: StatisticsProps) => {
  const cardArray = [
    {
      cardLogo: <Users />,
      cardTitle: "Total customers",
      cardCount: "2420",
      cardPercentage: "20",
    },
    {
      cardLogo: <GanttChartSquare />,
      cardTitle: "Members",
      cardCount: "1210",
      cardPercentage: "15",
    },
    {
      cardLogo: <Users />,
      cardTitle: "Total customers",
      cardCount: "2420",
      cardPercentage: "20",
    },
    {
      cardLogo: <GanttChartSquare />,
      cardTitle: "Members",
      cardCount: "1210",
      cardPercentage: "15",
    },
  ];
  return (
    <div className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-4",
        className
    )}>
      {cardArray.map((card, index) => (
        <Card
          key={index}
          className={cn(
            "bg-primary text-primary-foreground"
          )}
        >
          <CardHeader>
            <CardTitle>{card.cardLogo}</CardTitle>
            <CardDescription className="text-primary-foreground">
              {card.cardTitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between">
            <p className="text-4xl">{card.cardCount}</p>
            <p className="flex items-center">
              {Number(card.cardPercentage) > 0 ? <Plus /> : <Minus />}
              <span className="text-lg">{card.cardPercentage}%</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Statistics;
