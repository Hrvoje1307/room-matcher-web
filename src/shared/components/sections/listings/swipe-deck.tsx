"use client";

import { useState, useRef } from "react";
import { Box, styled } from "../../../../../styled-system/jsx";
import { X, Heart, MapPin } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllListingsQueryOptions, getMyListingsQueryOptions, type ListingResponse } from "@/entities/listings/queries";
import { addFavoriteMutationOptions } from "@/entities/favorites/mutations";
import { getFavoritesQueryOptions } from "@/entities/favorites/queries";

interface SwipeDeckProps {
    onFavorite?: () => void;
}

export function SwipeDeck({ onFavorite }: SwipeDeckProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [localFavoritesCount, setLocalFavoritesCount] = useState(0);

    const { data: allListings, isLoading, isError } = useQuery(getAllListingsQueryOptions());
    const { data: favorites, isLoading: favLoading } = useQuery(getFavoritesQueryOptions());
    const { data: myListings, isLoading: myLoading } = useQuery(getMyListingsQueryOptions());
    const { mutate: addFavorite } = useMutation(addFavoriteMutationOptions());

    const favoriteIds = new Set(favorites?.map((f) => f.id) ?? []);
    const myListingIds = new Set(myListings?.map((l) => l.id) ?? []);
    const listings = allListings?.filter((l) => !favoriteIds.has(l.id) && !myListingIds.has(l.id));

    if (isLoading || favLoading || myLoading) {
        return (
            <Box css={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
                <styled.p css={{ fontSize: "16px", color: "gray.500" }}>Učitavanje oglasa...</styled.p>
            </Box>
        );
    }

    if (isError || !listings) {
        return (
            <Box css={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", height: "60vh" }}>
                <styled.p css={{ fontSize: "20px", fontWeight: "700", color: "navy.500" }}>Greška pri učitavanju</styled.p>
                <styled.p css={{ fontSize: "14px", color: "gray.500" }}>Pokušajte ponovo</styled.p>
            </Box>
        );
    }

    const isFinished = currentIndex >= listings.length;
    const current = listings[currentIndex];
    const next = listings[currentIndex + 1];

    function handleFavorite() {
        addFavorite(current.id);
        setLocalFavoritesCount((n) => n + 1);
        onFavorite?.();
        setCurrentIndex((i) => i + 1);
    }

    function handleSkip() {
        setCurrentIndex((i) => i + 1);
    }

    if (isFinished) {
        return (
            <Box css={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", height: "60vh" }}>
                <styled.p css={{ fontSize: "48px" }}>🎉</styled.p>
                <styled.p css={{ fontSize: "20px", fontWeight: "700", color: "navy.500" }}>
                    Pregledali ste sve oglase!
                </styled.p>
                <styled.p css={{ fontSize: "14px", color: "gray.500" }}>
                    Dodali ste {localFavoritesCount} {localFavoritesCount === 1 ? "oglas" : "oglasa"} u favorite
                </styled.p>
            </Box>
        );
    }

    return (
        <Box css={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
            <Box css={{ textAlign: "center" }}>
                <styled.h2 css={{ fontSize: "22px", fontWeight: "700", color: "navy.500", marginBottom: "2px" }}>
                    Pronađi svoju sobu
                </styled.h2>
                <styled.p css={{ fontSize: "13px", color: "gray.500" }}>
                    Swipe lijevo za preskoči, desno za favorite
                </styled.p>
            </Box>

            <Box css={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                {next && (
                    <Box
                        style={{ transform: "scale(0.95) translateY(10px)", zIndex: 0, position: "absolute" }}
                        css={{
                            width: { base: "calc(100vw - 48px)", md: "440px" },
                            height: { base: "calc(100dvh - 260px)", md: "640px" },
                            maxHeight: "640px",
                            backgroundColor: "white",
                            borderRadius: "24px",
                            overflow: "hidden",
                            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                        }}
                    >
                        {next.images.length > 0 ? (
                            <Box
                                style={{ backgroundImage: `url(${next.images[0].imageUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
                                css={{ height: "58%", width: "100%" }}
                            />
                        ) : (
                            <Box css={{ height: "58%", width: "100%", backgroundColor: "sand.200", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <styled.p css={{ fontSize: "13px", color: "gray.500" }}>Nema slike nažalost</styled.p>
                            </Box>
                        )}
                    </Box>
                )}

                <Box css={{ position: "relative", zIndex: "1", width: "100%", display: "flex", justifyContent: "center" }}>
                    <SwipeCard
                        key={current.id}
                        listing={current}
                        onFavorite={handleFavorite}
                        onSkip={handleSkip}
                    />
                </Box>
            </Box>
        </Box>
    );
}

interface SwipeCardProps {
    listing: ListingResponse;
    onFavorite: () => void;
    onSkip: () => void;
}

const IMAGE_AREA_RATIO = 0.58;
const SWIPE_THRESHOLD = 100;
const TAP_THRESHOLD = 8;

function SwipeCard({ listing, onFavorite, onSkip }: SwipeCardProps) {
    const [photoIndex, setPhotoIndex] = useState(0);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [swipeDir, setSwipeDir] = useState<"left" | "right" | null>(null);

    const cardRef = useRef<HTMLDivElement>(null);
    const dragStart = useRef({ x: 0, y: 0 });
    const pointerDownClient = useRef({ x: 0, y: 0 });

    const rotation = position.x * 0.06;
    const skipOpacity = Math.min(1, Math.max(0, -position.x / SWIPE_THRESHOLD));
    const favoriteOpacity = Math.min(1, Math.max(0, position.x / SWIPE_THRESHOLD));

    const hasImages = listing.images.length > 0;

    function triggerSwipe(dir: "left" | "right") {
        setSwipeDir(dir);
        setTimeout(() => {
            if (dir === "right") onFavorite();
            else onSkip();
        }, 350);
    }

    function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
        if (swipeDir) return;
        pointerDownClient.current = { x: e.clientX, y: e.clientY };
        dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
        setIsDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
    }

    function handlePointerMove(e: React.PointerEvent) {
        if (!isDragging) return;
        setPosition({ x: e.clientX - dragStart.current.x, y: e.clientY - dragStart.current.y });
    }

    function handlePointerUp(e: React.PointerEvent) {
        if (!isDragging) return;
        setIsDragging(false);

        const dx = e.clientX - pointerDownClient.current.x;
        const dy = e.clientY - pointerDownClient.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < TAP_THRESHOLD && cardRef.current && hasImages) {
            const rect = cardRef.current.getBoundingClientRect();
            const relY = pointerDownClient.current.y - rect.top;

            if (relY < rect.height * IMAGE_AREA_RATIO) {
                const relX = pointerDownClient.current.x - rect.left;
                if (relX < rect.width / 2) {
                    setPhotoIndex((i) => Math.max(0, i - 1));
                } else {
                    setPhotoIndex((i) => Math.min(listing.images.length - 1, i + 1));
                }
                setPosition({ x: 0, y: 0 });
                return;
            }
        }

        if (position.x > SWIPE_THRESHOLD) triggerSwipe("right");
        else if (position.x < -SWIPE_THRESHOLD) triggerSwipe("left");
        else setPosition({ x: 0, y: 0 });
    }

    const cardStyle: React.CSSProperties =
        swipeDir === "left"
            ? { transform: "translateX(-130vw) rotate(-25deg)", transition: "transform 0.35s ease" }
            : swipeDir === "right"
            ? { transform: "translateX(130vw) rotate(25deg)", transition: "transform 0.35s ease" }
            : isDragging
            ? { transform: `translateX(${position.x}px) translateY(${position.y}px) rotate(${rotation}deg)`, cursor: "grabbing" }
            : { transform: `translateX(${position.x}px) translateY(${position.y}px) rotate(${rotation}deg)`, transition: "transform 0.3s ease", cursor: "grab" };

    return (
        <Box css={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", width: "100%" }}>
            <Box
                ref={cardRef}
                style={cardStyle}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                css={{
                    width: { base: "calc(100vw - 48px)", md: "440px" },
                    height: { base: "calc(100dvh - 260px)", md: "640px" },
                    maxHeight: "640px",
                    backgroundColor: "white",
                    borderRadius: "24px",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
                    overflow: "hidden",
                    userSelect: "none",
                    touchAction: "none",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                }}
            >
                {/* PRESKOČI overlay */}
                <Box style={{ opacity: skipOpacity, position: "absolute", top: 24, left: 20, zIndex: 10, border: "3px solid #FF6B4A", borderRadius: 8, padding: "4px 10px", transform: "rotate(-12deg)", pointerEvents: "none" }}>
                    <styled.span css={{ fontSize: "20px", fontWeight: "800", color: "coral.500", letterSpacing: "0.06em" }}>PRESKOČI</styled.span>
                </Box>

                {/* FAVORIT overlay */}
                <Box style={{ opacity: favoriteOpacity, position: "absolute", top: 24, right: 20, zIndex: 10, border: "3px solid #1A1F3C", borderRadius: 8, padding: "4px 10px", transform: "rotate(12deg)", pointerEvents: "none" }}>
                    <styled.span css={{ fontSize: "20px", fontWeight: "800", color: "navy.500", letterSpacing: "0.06em" }}>FAVORIT</styled.span>
                </Box>

                {/* Image area */}
                <Box css={{ flex: "0 0 58%", position: "relative", overflow: "hidden" }}>
                    {hasImages ? (
                        <>
                            <Box
                                style={{ backgroundImage: `url(${listing.images[photoIndex]?.imageUrl})`, backgroundSize: "cover", backgroundPosition: "center", width: "100%", height: "100%", transition: "opacity 0.2s ease" }}
                            />

                            {/* Bottom gradient */}
                            <Box style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(to top, rgba(0,0,0,0.28), transparent)", pointerEvents: "none" }} />

                            {/* Photo progress bars */}
                            {listing.images.length > 1 && (
                                <Box css={{ position: "absolute", top: "12px", left: "12px", right: "12px", display: "flex", gap: "4px", zIndex: "5" }} style={{ pointerEvents: "none" }}>
                                    {listing.images.map((_, i) => (
                                        <Box
                                            key={i}
                                            css={{ flex: "1", height: "3px", borderRadius: "2px" }}
                                            style={{ backgroundColor: i === photoIndex ? "white" : "rgba(255,255,255,0.4)", transition: "background-color 0.2s" }}
                                        />
                                    ))}
                                </Box>
                            )}

                            {/* Price badge */}
                            <Box css={{ position: "absolute", bottom: "14px", left: "14px", backgroundColor: "white", borderRadius: "999px", paddingX: "14px", paddingY: "6px", fontSize: "13px", fontWeight: "700", color: "navy.500", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                                {listing.price}€/mj
                            </Box>
                        </>
                    ) : (
                        <Box css={{ width: "100%", height: "100%", backgroundColor: "sand.200", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                            <styled.span css={{ fontSize: "40px" }}>🏠</styled.span>
                            <styled.p css={{ fontSize: "13px", color: "gray.500" }}>Nema slike nažalost</styled.p>

                            {/* Price badge without image */}
                            <Box css={{ position: "absolute", bottom: "14px", left: "14px", backgroundColor: "white", borderRadius: "999px", paddingX: "14px", paddingY: "6px", fontSize: "13px", fontWeight: "700", color: "navy.500", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                                {listing.price}€/mj
                            </Box>
                        </Box>
                    )}
                </Box>

                {/* Body */}
                <Box css={{ flex: "1", overflowY: "auto", padding: "20px 22px" }}>
                    <styled.h3 css={{ fontSize: "20px", fontWeight: "700", color: "navy.500", marginBottom: "6px" }}>
                        {listing.title}
                    </styled.h3>
                    <Box css={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "8px" }}>
                        <MapPin size={13} color="#c5c1ba" />
                        <styled.span css={{ fontSize: "13px", color: "gray.500" }}>
                            {listing.address}
                        </styled.span>
                    </Box>
                    <Box css={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
                        <Box css={{ border: "1px solid", borderColor: "gray.300", borderRadius: "999px", paddingX: "14px", paddingY: "5px", fontSize: "12px", color: "gray.600" }}>
                            {listing.size} m²
                        </Box>
                        <Box css={{ border: "1px solid", borderColor: "gray.300", borderRadius: "999px", paddingX: "14px", paddingY: "5px", fontSize: "12px", color: "gray.600" }}>
                            Dostupno od {listing.availableFrom}
                        </Box>
                    </Box>
                    <styled.p css={{ fontSize: "14px", color: "gray.600", lineHeight: "1.6" }}>
                        {listing.description}
                    </styled.p>
                </Box>
            </Box>

            {/* Action buttons */}
            <Box css={{ display: "flex", gap: "40px", alignItems: "center" }}>
                <styled.button
                    onClick={() => triggerSwipe("left")}
                    disabled={!!swipeDir}
                    css={{ width: "60px", height: "60px", borderRadius: "999px", border: "2px solid", borderColor: "gray.300", backgroundColor: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", color: "gray.500", transition: "all 0.2s", _hover: { borderColor: "coral.500", color: "coral.500" }, _disabled: { opacity: 0.4, cursor: "not-allowed" } }}
                >
                    <X size={24} />
                </styled.button>

                <styled.button
                    onClick={() => triggerSwipe("right")}
                    disabled={!!swipeDir}
                    css={{ width: "60px", height: "60px", borderRadius: "999px", backgroundColor: "coral.500", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(255,107,74,0.45)", transition: "all 0.2s", _hover: { opacity: "0.9" }, _disabled: { opacity: 0.4, cursor: "not-allowed" } }}
                >
                    <Heart size={24} color="white" fill="white" />
                </styled.button>
            </Box>
        </Box>
    );
}
