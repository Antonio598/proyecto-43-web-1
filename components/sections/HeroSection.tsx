import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="w-full">
      <Image
        src="/images/banner.jpg"
        alt="Tenerife Dreams Excursion"
        width={1920}
        height={640}
        priority
        className="w-full h-auto block"
        sizes="100vw"
      />
    </section>
  )
}
