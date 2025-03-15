import { splineSansMono } from '@/app/fonts'
import { ArrowUpRight } from 'lucide-react'

type FooterContentProps = {
    label: string;
    url: string;
}

function FooterContent({ label, url }: FooterContentProps) {
    return (
        <a href={url} target="_blank" rel="noopener noreferrer" className={`${splineSansMono.className} text-xs font-light text-default-grey hover:opacity-80 transition-opacity`}>
            <div className="flex flex-row items-start justify-center">
                {label}
                <ArrowUpRight className="w-3 h-3" color="var(--color-default-grey)" />
            </div>
        </a>
    )
}

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 py-6 bg-[var(--background)]">
            <div className="flex flex-row items-center justify-center gap-4">
                {/* <FooterContent label="CAMILOGIRALDO31@GMAIL.COM" url="/" /> */}
                <FooterContent label="CAMILO.WIP" url="https://www.instagram.com/camilo.wip/" />
                <FooterContent label="MESA.DE.TRABAJO" url="https://www.instagram.com/mesa.de.trabajo/" />
            </div>
        </footer>
    )
}


