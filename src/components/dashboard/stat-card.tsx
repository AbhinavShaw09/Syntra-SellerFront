"use client";

import {
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: string;
  icon?: React.ReactNode;
  delta?: string;
  trending?: "up" | "down";
  footer?: string;
  mutedText?: string;
};

export default function StatCard({
  title,
  value,
  icon,
  delta,
  trending,
  footer,
  mutedText,
}: StatCardProps) {
  const TrendIcon = trending === "up" ? IconTrendingUp : IconTrendingDown;

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription className="flex items-center gap-2">
          {icon}
          {title}
        </CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        {delta && trending && (
          <CardAction>
            <Badge variant="outline">
              <TrendIcon className="mr-1 size-4" />
              {delta}
            </Badge>
          </CardAction>
        )}
      </CardHeader>
      {(footer || mutedText) && (
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {footer && (
            <div className="line-clamp-1 flex gap-2 font-medium">
              {footer} {trending && <TrendIcon className="size-4" />}
            </div>
          )}
          {mutedText && (
            <div className="text-muted-foreground">{mutedText}</div>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
