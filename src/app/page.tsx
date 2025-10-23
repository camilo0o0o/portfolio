import Logo from '@/components/Logo/Logo'
import HalftoneImage from '@/components/HalftoneImage/HalftoneImage'
import LayoutContainer from '@/components/LayoutContainer/LayoutContainer'
import Timezone from '@/components/Timezone/Timezone'
import ChatButton from '@/components/ChatButton/ChatButton'

export default function Home() {
  const mainImage = {
    src: "/images/projects/selfie.jpeg",
    alt: "Selfie"
  }

  return (
    <main className="min-h-screen">
      <LayoutContainer>
        {/* Main halftone image in the center */}
        <HalftoneImage
          src={mainImage.src}
          alt={mainImage.alt}
          width={250}
        />
      </LayoutContainer>

      {/* Border elements positioned absolutely */}
      {/* Logo in top border */}
      <div className="fixed top-4 left-10 z-[100]">
        <Logo />
      </div>

      {/* Timezone in right border */}
      <div className="fixed top-[85%] right-[-64px] z-[100] -rotate-90 origin-center">
        <Timezone />
      </div>

      {/* Chat button in bottom border */}
      <div className="fixed bottom-4 left-[3%] z-[100]">
        <ChatButton />
      </div>
    </main>
  );
}
