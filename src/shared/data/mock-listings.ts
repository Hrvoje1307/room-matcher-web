export interface MockListing {
    id: number;
    title: string;
    city: string;
    neighborhood: string;
    price: number;
    images: string[];
    description: string;
    tags: string[];
}

export const mockListings: MockListing[] = [
    {
        id: 1,
        title: "Soba u centru Zagreba",
        city: "Zagreb",
        neighborhood: "Centar",
        price: 350,
        images: [
            "https://picsum.photos/seed/room1a/800/600",
            "https://picsum.photos/seed/room1b/800/600",
            "https://picsum.photos/seed/room1c/800/600",
        ],
        description: "Lijepa soba u samom centru grada, blizu tramvajske stanice i svih sadržaja.",
        tags: ["Na postel", "Student", "Wi-Fi"],
    },
    {
        id: 2,
        title: "Moderna soba na Trešnjevci",
        city: "Zagreb",
        neighborhood: "Trešnjevka",
        price: 280,
        images: [
            "https://picsum.photos/seed/room2a/800/600",
            "https://picsum.photos/seed/room2b/800/600",
        ],
        description: "Prostrana soba u novoobnovljenom stanu, mirna ulica, parking dostupan.",
        tags: ["Parket", "Wi-Fi", "Balkon"],
    },
    {
        id: 3,
        title: "Soba blizu Filozofskog",
        city: "Zagreb",
        neighborhood: "Gornji grad",
        price: 320,
        images: [
            "https://picsum.photos/seed/room3a/800/600",
            "https://picsum.photos/seed/room3b/800/600",
            "https://picsum.photos/seed/room3c/800/600",
            "https://picsum.photos/seed/room3d/800/600",
        ],
        description: "Idealno za studente. 5 minuta hoda do Filozofskog i Pravnog fakulteta.",
        tags: ["Student", "Tiho", "Wi-Fi"],
    },
    {
        id: 4,
        title: "Dvokrevetna soba u Splitu",
        city: "Split",
        neighborhood: "Meje",
        price: 300,
        images: [
            "https://picsum.photos/seed/room4a/800/600",
            "https://picsum.photos/seed/room4b/800/600",
        ],
        description: "Udobna soba s pogledom na park, 15 minuta od plaže pješice.",
        tags: ["Klima", "Parking", "Student"],
    },
    {
        id: 5,
        title: "Soba u mirnom kvartu",
        city: "Rijeka",
        neighborhood: "Pećine",
        price: 240,
        images: [
            "https://picsum.photos/seed/room5a/800/600",
            "https://picsum.photos/seed/room5b/800/600",
            "https://picsum.photos/seed/room5c/800/600",
        ],
        description: "Tih kvart, nova kupaonica zajednička s jednom osobom, namješteno.",
        tags: ["Na postel", "Balkon", "Tiho"],
    },
    {
        id: 6,
        title: "Luksuzna soba u novogradnji",
        city: "Zagreb",
        neighborhood: "Savica",
        price: 420,
        images: [
            "https://picsum.photos/seed/room6a/800/600",
            "https://picsum.photos/seed/room6b/800/600",
            "https://picsum.photos/seed/room6c/800/600",
        ],
        description: "Novogradnja 2023., moderan interijer, teretana u zgradi, podzemna garaža.",
        tags: ["Teretana", "Klima", "Wi-Fi", "Parking"],
    },
    {
        id: 7,
        title: "Soba uz more — Zadar",
        city: "Zadar",
        neighborhood: "Brodarica",
        price: 290,
        images: [
            "https://picsum.photos/seed/room7a/800/600",
            "https://picsum.photos/seed/room7b/800/600",
        ],
        description: "10 minuta pješice do mora, kombi bus do centra, lijepa terasa zajednička.",
        tags: ["Terasa", "Klima", "Blizu mora"],
    },
    {
        id: 8,
        title: "Studentska soba — Osijek",
        city: "Osijek",
        neighborhood: "Gornji grad",
        price: 180,
        images: [
            "https://picsum.photos/seed/room8a/800/600",
            "https://picsum.photos/seed/room8b/800/600",
            "https://picsum.photos/seed/room8c/800/600",
        ],
        description: "Jeftina i čista soba blizu Sveučilišta, susjedi studenti, mirna atmosfera.",
        tags: ["Student", "Wi-Fi", "Tiho"],
    },
];
