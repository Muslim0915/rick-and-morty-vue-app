export interface ICharacterCard {
    id: number,
    name: string,
    status: string,
    species: string,
    created: string,
    gender: string,
    origin: {
        name: string,
        url: string
    },
    location: {
        name: string,
        url: string
    },
    image: string,
    episode: string[],
}