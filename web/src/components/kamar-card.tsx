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
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <figcaption className="absolute inset-x-0 bottom-0 space-y-1 bg-black/50 px-4 py-3 text-white">
          <strong className="block text-sm">{title}</strong>
          <small className="block text-xs opacity-80">{category}</small>
          <mark
            className={`inline-block rounded-full px-3 py-0.5 text-xs text-white ${
              status === "Tersedia" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {status}
          </mark>
        </figcaption>
      </figure>
      
      <section className="space-y-1 p-4">
        <small className="text-muted-foreground">Harga / bulan</small>
        <strong className="block text-base">{price}</strong>
        <small className="text-muted-foreground">{size}</small>
      </section>
    </article>
  )
}



