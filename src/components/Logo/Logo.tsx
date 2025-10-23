import Image from 'next/image'

export default function Logo() {
    return (
        <div className="w-36">
            <div className="text-[#ba1a1a]">
                <Image
                    src="/mi_nombre.svg"
                    alt="Logo"
                    width={160}
                    height={36}
                    priority
                />
            </div>
        </div>
    )
}
