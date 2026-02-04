import { Card, CardContent } from "@workspace/ui/components/card"
import { cn } from "@workspace/ui/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  variant: "today" | "pending" | "completed";
}

const variantStyles = {
  today: "text-foreground",
  pending: "text-muted-foreground",
  completed: "text-green-600",
};

export  default function StatCard({ label, value, variant }: StatCardProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="flex flex-col gap-2 p-6">
        <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>

        <span
          className={cn(
            "text-4xl font-bold tracking-tight",
            variantStyles[variant]
          )}
        >
          {value}
        </span>
      </CardContent>
    </Card>
  );
}
