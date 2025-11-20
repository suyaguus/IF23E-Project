"use client";

import {
  IconTrendingDown,
  IconTrendingUp,
  IconUser,
  IconDoor,
  IconArmchair,
  IconSparkles,
} from "@tabler/icons-react";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash } from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import Link from "next/link";

interface ModelUser {
  id: number;
  username: string;
  email: string;
  role: string;
  orders: number;
  riwayat_pembayaran: string;
}

interface ModelKamar {
  id: number;
  nomorKamar: string;
  hargaSewa: number;
  statusKamar: string;
  deskripsi: string;
}

interface ModelFasilitas {
  id: number;
  namaFasilitas: string;
  kodeFasilitas: string;
  deskripsi: string;
  kamar: number;
}

interface ModelPerabotan {
  id: number;
  namaPerabotan: string;
  kodePerabotan: string;
  deskripsi: string;
  kamar: number;

}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function SectionCards() {
  // Fetch semua data dari API
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useSWR("http://localhost:3001/api/user", fetcher);

  const {
    data: kamarData,
    error: kamarError,
    isLoading: kamarLoading,
  } = useSWR("http://localhost:3001/api/kamar", fetcher);

  const {
    data: fasilitasData,
    error: fasilitasError,
    isLoading: fasilitasLoading,
  } = useSWR("http://localhost:3001/api/fasilitas", fetcher);

  const {
    data: perabotanData,
    error: perabotanError,
    isLoading: perabotanLoading,
  } = useSWR("http://localhost:3001/api/perabotan", fetcher);

  // Hitung statistik
  const totalUsers = userData?.user?.length || 0;
  const totalKamar = kamarData?.kamar?.length || 0;
  const totalFasilitas = fasilitasData?.fasilitas?.length || 0;
  const totalPerabotan = perabotanData?.perabotan?.length || 0;

  // Helper function untuk menampilkan nilai card
  const getCardValue = (isLoading: boolean, error: unknown, value: number) => {
    if (isLoading) return "...";
    if (error) return "Error";
    return value;
  };

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Card Users */}
      {/* <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Users</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {getCardValue(userLoading, userError, totalUsers)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Growing user base <IconUser className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total registered users
          </div>
        </CardFooter>
      </Card> */}

      {/* Card Kamar */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Kamar</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {getCardValue(kamarLoading, kamarError, totalKamar)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +8.3%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Available rooms <IconDoor className="size-4" />
          </div>
          <div className="text-muted-foreground">Total room inventory</div>
        </CardFooter>
      </Card>

      {/* Card Fasilitas */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Fasilitas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {getCardValue(fasilitasLoading, fasilitasError, totalFasilitas)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +15%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Enhanced amenities <IconSparkles className="size-4" />
          </div>
          <div className="text-muted-foreground">Available facilities</div>
        </CardFooter>
      </Card>

      {/* Card Perabotan */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Perabotan</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {getCardValue(perabotanLoading, perabotanError, totalPerabotan)}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +10%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Well-equipped inventory <IconArmchair className="size-4" />
          </div>
          <div className="text-muted-foreground">Furniture catalog items</div>
        </CardFooter>
      </Card>
    </div>
  );
}
