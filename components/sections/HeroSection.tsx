import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative w-full h-[220px] sm:h-[300px] lg:h-[380px]">
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
