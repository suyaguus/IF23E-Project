import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const activities = [
  { date: "23 Des 2025", task: "Pembayaran terverifikasi", status: "Selesai" },
  { date: "20 Des 2025", task: "Laporan AC bocor", status: "Diproses" },
  { date: "15 Des 2025", task: "Pembaruan aturan kos", status: "Info" },
];

export function RecentActivity() {
  return (
    <Card className="shadow-none border-border/60">
      <CardHeader>
        <CardTitle className="text-lg">Aktivitas Terakhir</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((act, i) => (
          <div key={i} className="flex items-center justify-between border-b border-border/40 pb-3 last:border-0 last:pb-0">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{act.task}</p>
              <p className="text-xs text-muted-foreground">{act.date}</p>
            </div>
            <Badge variant="outline" className="text-[10px]">{act.status}</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}