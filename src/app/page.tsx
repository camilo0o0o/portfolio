import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center relative">
      <div className="absolute top-8 left-8">
        <Image 
          src="/mi_nombre.svg" 
          alt="Camilo Giraldo" 
          width={200}
          height={28}
          className="max-h-[28px] w-auto"
          priority
        />
      </div>
      <Image 
        src="/images/projects/selfie.jpeg" 
        alt="Selfie" 
        width={800}
        height={600}
        className="max-w-[250px] max-h-full object-contain border-2 border-dark-grey"
        priority
      />
    </main>
  );
}
