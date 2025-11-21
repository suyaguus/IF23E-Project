"use client";

import {
  IconTrendingDown,
  IconTrendingUp,
  IconUser,
  IconDoor,
  IconArmchair,
  IconSparkles,
} from "@tabler/icons-react";
import useSWR, { mutate } from "swr";
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
import axios from "axios";

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
    mutate: userMutate,
  } = useSWR("http://localhost:3001/api/user", fetcher);

  const {
    data: kamarData,
    error: kamarError,
    isLoading: kamarLoading,
    mutate: kamarMutate,
  } = useSWR("http://localhost:3001/api/kamar", fetcher);

  const {
    data: fasilitasData,
    error: fasilitasError,
    isLoading: fasilitasLoading,
    mutate: fasilitasMutate,
  } = useSWR("http://localhost:3001/api/fasilitas", fetcher);

  const {
    data: perabotanData,
    error: perabotanError,
    isLoading: perabotanLoading,
    mutate: perabotanMutate,
  } = useSWR("http://localhost:3001/api/perabotan", fetcher);

  const deleteUser = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/user/${id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        userMutate();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Gagal menghapus data user");
      console.error(error);
    }
  };

  const deleteKamar = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/kamar/${id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        kamarMutate();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Gagal menghapus data kamar");
      console.error(error);
    }
  };

  const deleteFasilitas = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/fasilitas/${id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fasilitasMutate();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Gagal menghapus data fasilitas");
      console.error(error);
    }
  };

  const deletePerabotan = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/api/perabotan/${id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        perabotanMutate();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Gagal menghapus data perabotan");
      console.error(error);
    }
  };

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
    <div className="space-y-8 p-4">
      {/* TABLE USER */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Data User</h2>
          <Link
            href="/user/tambah"
            className="bg-sky-700 text-white py-2.5 px-5 rounded-full hover:bg-sky-800 transition-colors"
          >
            Tambah User
          </Link>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            {userError ? (
              <div className="text-center text-red-500 p-4">
                Gagal Mengambil Data: {userError.message}
              </div>
            ) : (
              <Table>
                <TableHeader className="sticky top-0 bg-gray-50 z-10">
                  <TableRow>
                    <TableHead className="text-center w-[15%]">Aksi</TableHead>
                    <TableHead className="text-center w-[15%]">
                      Username
                    </TableHead>
                    <TableHead className="text-center w-[20%]">Email</TableHead>
                    <TableHead className="text-center w-[15%]">Role</TableHead>
                    <TableHead className="text-center w-[15%]">
                      Orders
                    </TableHead>
                    <TableHead className="text-center w-[20%]">
                      Riwayat Pembayaran
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Mohon Tunggu...
                      </TableCell>
                    </TableRow>
                  ) : userData && userData.user && userData.user.length > 0 ? (
                    userData.user.map((item: ModelUser) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-center">
                          <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded mr-2">
                            <Pencil size={15} />
                          </button>
                          <AlertDialog>
                            <AlertDialogTrigger className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                              <Trash size={15} color="white" />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Apakah anda yakin ingin menghapus data ini?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Username: {item.username} ingin dihapus?
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Tidak</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteUser(item.id)}
                                >
                                  Ya
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                        <TableCell className="text-center">
                          {item.username}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.email}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.role}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.orders}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.riwayat_pembayaran}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Tidak ada data
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </section>

      {/* TABLE KAMAR */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Data Kamar</h2>
          <Link
            href="/kamar/tambah"
            className="bg-green-700 text-white py-2.5 px-5 rounded-full hover:bg-green-800 transition-colors"
          >
            Tambah Kamar
          </Link>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            {kamarError ? (
              <div className="text-center text-red-500 p-4">
                Gagal Mengambil Data: {kamarError.message}
              </div>
            ) : (
              <Table>
                <TableHeader className="sticky top-0 bg-gray-50 z-10">
                  <TableRow>
                    <TableHead className="text-center">Aksi</TableHead>
                    <TableHead className="text-center">ID</TableHead>
                    {kamarData?.kamar?.[0] &&
                      Object.keys(kamarData.kamar[0])
                        .filter((key) => key !== "id")
                        .map((key) => (
                          <TableHead
                            key={key}
                            className="text-center capitalize"
                          >
                            {key.replace(/_/g, " ")}
                          </TableHead>
                        ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kamarLoading ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center">
                        Mohon Tunggu...
                      </TableCell>
                    </TableRow>
                  ) : kamarData &&
                    kamarData.kamar &&
                    kamarData.kamar.length > 0 ? (
                    kamarData.kamar.map((item: ModelKamar) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-center">
                          <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded mr-2">
                            <Pencil size={15} />
                          </button>
                          <AlertDialog>
                            <AlertDialogTrigger className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                              <Trash size={15} color="white" />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Apakah anda yakin ingin menghapus data ini?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Data kamar ID: {item.id} akan dihapus
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Tidak</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteKamar(item.id)}
                                >
                                  Ya
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                        <TableCell className="text-center">{item.id}</TableCell>
                        {Object.entries(item)
                          .filter(([key]) => key !== "id")
                          .map(([key, value]) => (
                            <TableCell key={key} className="text-center">
                              {String(value)}
                            </TableCell>
                          ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center">
                        Tidak ada data
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </section>

      {/* TABLE FASILITAS */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Data Fasilitas</h2>
          <Link
            href="/fasilitas/tambah"
            className="bg-purple-700 text-white py-2.5 px-5 rounded-full hover:bg-purple-800 transition-colors"
          >
            Tambah Fasilitas
          </Link>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            {fasilitasError ? (
              <div className="text-center text-red-500 p-4">
                Gagal Mengambil Data: {fasilitasError.message}
              </div>
            ) : (
              <Table>
                <TableHeader className="sticky top-0 bg-gray-50 z-10">
                  <TableRow>
                    <TableHead className="text-center">Aksi</TableHead>
                    <TableHead className="text-center">ID</TableHead>
                    {fasilitasData?.fasilitas?.[0] &&
                      Object.keys(fasilitasData.fasilitas[0])
                        .filter((key) => key !== "id")
                        .map((key) => (
                          <TableHead
                            key={key}
                            className="text-center capitalize"
                          >
                            {key.replace(/_/g, " ")}
                          </TableHead>
                        ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fasilitasLoading ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center">
                        Mohon Tunggu...
                      </TableCell>
                    </TableRow>
                  ) : fasilitasData &&
                    fasilitasData.fasilitas &&
                    fasilitasData.fasilitas.length > 0 ? (
                    fasilitasData.fasilitas.map((item: ModelFasilitas) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-center">
                          <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded mr-2">
                            <Pencil size={15} />
                          </button>
                          <AlertDialog>
                            <AlertDialogTrigger className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                              <Trash size={15} color="white" />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Apakah anda yakin ingin menghapus data ini?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Data fasilitas ID: {item.id} akan dihapus
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Tidak</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteFasilitas(item.id)}
                                >
                                  Ya
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                        <TableCell className="text-center">{item.id}</TableCell>
                        {Object.entries(item)
                          .filter(([key]) => key !== "id")
                          .map(([key, value]) => (
                            <TableCell key={key} className="text-center">
                              {String(value)}
                            </TableCell>
                          ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center">
                        Tidak ada data
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </section>

      {/* TABLE PERABOTAN */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Data Perabotan</h2>
          <Link
            href="/perabotan/tambah"
            className="bg-orange-700 text-white py-2.5 px-5 rounded-full hover:bg-orange-800 transition-colors"
          >
            Tambah Perabotan
          </Link>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            {perabotanError ? (
              <div className="text-center text-red-500 p-4">
                Gagal Mengambil Data: {perabotanError.message}
              </div>
            ) : (
              <Table>
                <TableHeader className="sticky top-0 bg-gray-50 z-10">
                  <TableRow>
                    <TableHead className="text-center">Aksi</TableHead>
                    <TableHead className="text-center">ID</TableHead>
                    {perabotanData?.perabotan?.[0] &&
                      Object.keys(perabotanData.perabotan[0])
                        .filter((key) => key !== "id")
                        .map((key) => (
                          <TableHead
                            key={key}
                            className="text-center capitalize"
                          >
                            {key.replace(/_/g, " ")}
                          </TableHead>
                        ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {perabotanLoading ? (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center">
                        Mohon Tunggu...
                      </TableCell>
                    </TableRow>
                  ) : perabotanData &&
                    perabotanData.perabotan &&
                    perabotanData.perabotan.length > 0 ? (
                    perabotanData.perabotan.map((item: ModelPerabotan) => (
                      <TableRow key={item.id}>
                        <TableCell className="text-center">
                          <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded mr-2">
                            <Pencil size={15} />
                          </button>
                          <AlertDialog>
                            <AlertDialogTrigger className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                              <Trash size={15} color="white" />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Apakah anda yakin ingin menghapus data ini?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  Data perabotan ID: {item.id} akan dihapus
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Tidak</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deletePerabotan(item.id)}
                                >
                                  Ya
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                        <TableCell className="text-center">{item.id}</TableCell>
                        {Object.entries(item)
                          .filter(([key]) => key !== "id")
                          .map(([key, value]) => (
                            <TableCell key={key} className="text-center">
                              {String(value)}
                            </TableCell>
                          ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center">
                        Tidak ada data
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
