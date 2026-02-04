import { DashboardStats } from "@/components/dashboardcomponents/CardStatus";
import { TodoProgress } from "@/components/dashboardcomponents/TodoProgress";
import { TodoStatusChart } from "@/components/dashboardcomponents/TodoCharts";

export default function DashboardPage() {
    return (
        <div className="space-y-8 p-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">
                    Dashboard
                </h1>
                <p className="text-muted-foreground">
                    Overview of your work
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-1">
                <DashboardStats />
                <TodoProgress />
                <TodoStatusChart />
            </div>
        </div>
    );
}
