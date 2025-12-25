import Image from "next/image"

type KamarCardProps = {
  image: string
  title: string
  category: string
  status: "Tersedia" | "Penuh"
  price: string
  size: string
}

export function KamarCard({
  image,
  title,
  category,
  status,
  price,
  size,
}: KamarCardProps) {
  return (
    <article  className="overflow-hidden rounded-lg border bg-background">
      <figure className="group relative">
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"/>
      </figure>
    </article>
  )
}



