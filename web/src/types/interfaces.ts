export enum Role {
  Admin = 'Admin',
  User = 'User',
}

export enum StatusKamar {
  Tersedia = 'TERSEDIA',
  Tersewa = 'TERSEWA',
  TidakTersedia = 'TIDAK_TERSEDIA',
}

export enum StatusPembayaran {
  Lunas = 'Lunas',
  Pending = 'Pending',
  Expired = 'Expired',
  Dibatalkan = 'Dibatalkan',
}

export enum MetodePembayaran {
  Transfer = 'Transfer',
  Tunai = 'Tunai',
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
  password?: string; 
  notelp: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  // relations
  orders?: Order[];
  riwayatPembayaran?: RiwayatPembayaran[];
}

export interface Kamar {
  id: number;
  nomorKamar: string;
  hargaSewa: number;
  statusKamar: StatusKamar;
  deskripsi: string;
  // relations
  orders?: Order[];
  fasilitas?: KamarFasilitas[];
  perabotan?: KamarPerabotan[];
  riwayatPembayaran?: RiwayatPembayaran[];
}

export interface Fasilitas {
  id: number;
  namaFasilitas: string;
  kodeFasilitas: string;
  deskripsi: string;
  // relations
  kamar?: KamarFasilitas[];
}

export interface Perabotan {
  id: number;
  namaPerabotan: string;
  kodePerabotan: string;
  deskripsi: string;
  // relations
  kamar?: KamarPerabotan[];
}

export interface KamarFasilitas {
  id: number;
  kamarId: number;
  fasilitasId: number;
  // relations
  kamar?: Kamar;
  fasilitas?: Fasilitas;
}

export interface KamarPerabotan {
  id: number;
  kamarId: number;
  perabotanId: number;
  jumlah: number;
  // relations
  kamar?: Kamar;
  perabotan?: Perabotan;
}

export interface Order {
  id: number;
  kodeOrder: string;
  userId: number;
  kamarId: number;
  tanggalPesanan: Date;
  tanggalCheckin: Date;
  tanggalCheckout: Date;
  statusPembayaran: StatusPembayaran;
  totalHarga: number;
  metodePembayaran: MetodePembayaran;
  buktiPembayaran: string | null; 
  catatanUser: string | null;     
  catatanAdmin: string | null;    
  createdAt: string | Date;
  updatedAt: string | Date;
  // relations
  user?: User;
  kamar?: Kamar;
  riwayatPembayaran?: RiwayatPembayaran[];
}

export interface RiwayatPembayaran {
  id: number;
  kodeRiwayat: string;
  orderId: number;
  userId: number;
  kamarId: number;
  statusPembayaranLama: StatusPembayaran | null; 
  statusPembayaranBaru: StatusPembayaran;
  totalHarga: number;
  metodePembayaran: MetodePembayaran;
  buktiPembayaran: string | null; 
  keterangan: string | null;      
  diubahOleh: string | null;      
  createdAt: string | Date;
  // relations
  order?: Order;
  user?: User;
  kamar?: Kamar;
}

export interface Otp {
  id: number;
  email: string;
  otp: string;
  expiresAt: string | Date;
  createdAt: string | Date;
}