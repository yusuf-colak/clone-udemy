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

const Statistics = () => {
  const cardArray = [
    {
      cardLogo: <Users />,
      cardTitle: "Total customers",
      cardCount: "2420",
      cardPercentage: "20",
      bgColor: "bg-red-200",
    },
    {
      cardLogo: <GanttChartSquare />,
      cardTitle: "Members",
      cardCount: "1210",
      cardPercentage: "15",
      bgColor: "bg-blue-200",
    },
    {
      cardLogo: <Users />,
      cardTitle: "Total customers",
      cardCount: "2420",
      cardPercentage: "20",
      bgColor: "bg-green-200",
    },
    {
      cardLogo: <GanttChartSquare />,
      cardTitle: "Members",
      cardCount: "1210",
      cardPercentage: "15",
      bgColor: "bg-yellow-200",
    },
  ];
  return (
    <div className="flex flex-row flex-wrap justify-around lg:justify-between ">
      {cardArray.map((card, index) => (
        <Card
          key={index}
          className={cn(
            `${card.bgColor}`,
            "md:mx-0 my-2 ml-0  min-w-[250px] md:w-[49%] w-full   "
          )}
        >
          <CardHeader>
            <CardTitle>{card.cardLogo}</CardTitle>
            <CardDescription className="text-black">
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
