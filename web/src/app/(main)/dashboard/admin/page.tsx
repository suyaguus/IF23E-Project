import { AppSidebar } from "@/components/app-sidebar";
import Cards from "@/components/card";

export default function DashboardAdminPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <AppSidebar />
      <Cards />
    </div>
  );
}
