import Image from "next/image"

type KamarCardProps = {
  image: string
  title: string
  category: string
  status: "Tersedia" | "Penuh"
  price: string
  size: string
}

