import Image from "next/image";

export function Logo() {
    return (
        <Image
            src="/brand/logo-main.png"
            alt="Room Matcher"
            width={160}
            height={80}
            style={{ objectFit: "contain" }}
        />
    );
}
