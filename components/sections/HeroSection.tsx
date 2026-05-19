import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden h-[200px] sm:h-[280px] lg:h-[360px]">
      <Image
        src="/images/banner.jpg"
        alt="Tenerife Dreams Excursion"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
    </section>
  )
}
