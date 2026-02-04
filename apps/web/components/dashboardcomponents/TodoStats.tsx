import { Card, CardContent } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import {
    CalendarDays,
    Clock,
    CheckCircle2,
} from "lucide-react";

interface StatCardProps {
    label: string;
    value: number;
    variant: "today" | "pending" | "completed";
}

const variantConfig = {
    today: {
        icon: CalendarDays,
        valueColor: "text-foreground",
        iconColor: "text-foreground",
    },
    pending: {
        icon: Clock,
        valueColor: "text-muted-foreground",
        iconColor: "text-muted-foreground",
    },
    completed: {
        icon: CheckCircle2,
        valueColor: "text-green-600",
        iconColor: "text-green-600",
    },
};

export function StatCard({
    label,
    value,
    variant,
}: StatCardProps) {
    const Icon = variantConfig[variant].icon;

    return (
        <Card className="shadow-sm border">
            <CardContent className="p-6 flex items-center justify-between">
                <div className="flex flex-col">
                    <span className="text-[14px] font-medium uppercase tracking-wide text-muted-foreground">
                        {label}
                    </span>
                    <span className={cn("text-6xl font-extrabold tracking-tight", variantConfig[variant].valueColor)}>
                        {value}
                    </span>
                </div>

                <div className={cn("rounded-full p-4 bg-muted/40", variantConfig[variant].iconColor)}>
                    <Icon className="h-7 w-7" />
                </div>
            </CardContent>
        </Card>
    );
}
