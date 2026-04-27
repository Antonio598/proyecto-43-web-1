import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <Image
        src="/images/banner.jpg"
        alt="Tenerife Dreams Excursion"
        width={1920}
        height={640}
        priority
        className="w-full h-auto object-cover"
        sizes="100vw"
      />
    </section>
  )
}
