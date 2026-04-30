export function getImageUrl(imageUrl: string | undefined | null): string {
    if (!imageUrl) return "";
    if (imageUrl.startsWith("http")) return imageUrl;
    const base = process.env.NEXT_PUBLIC_API_URL ?? "";
    return `${base}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
}
