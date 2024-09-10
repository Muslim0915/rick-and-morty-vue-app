import { defineStore, StoreDefinition } from 'pinia';
import { reactive } from 'vue';
import { repositories } from "@/services/repositories";
import { useToast } from "vue-toastification";

const toast = useToast();

interface IAPIState {
    results: any[];
    info: {
        next?: string;
        prev?: string;
    };
}

interface State {
    API: string;
    character: IAPIState;
    location: IAPIState;
    episode: IAPIState;
    isLoading: boolean;
}

export const useRickAndMortyStore: StoreDefinition = defineStore('store', () =>  {
    const state: State = reactive({
        API: 'https://rickandmortyapi.com/api/',
        character: {
            results: [],
            info: {}
        },
        location: {
            results: [],
            info: {}
        },
        episode: {
            results: [],
            info: {}
        },
        isLoading: false,
    });

    const saveStateToLocalStorage = () => {
        localStorage.setItem('characterState', JSON.stringify(state.character));
        localStorage.setItem('locationState', JSON.stringify(state.location));
        localStorage.setItem('episodeState', JSON.stringify(state.episode));
    };


    const getApi = async (): Promise<void> => {
        state.isLoading = true;

        try {
            const storedCharacterState = localStorage.getItem('characterState');
            const storedLocationState = localStorage.getItem('locationState');
            const storedEpisodeState = localStorage.getItem('episodeState');

            if (storedCharacterState && storedLocationState && storedEpisodeState) {
                state.character = JSON.parse(storedCharacterState);
                state.location = JSON.parse(storedLocationState);
                state.episode = JSON.parse(storedEpisodeState);
            } else {
                const [characterData, locationData, episodeData] = await Promise.all([
                    repositories.fetchAPI(`${state.API}/character`),
                    repositories.fetchAPI(`${state.API}/location`),
                    repositories.fetchAPI(`${state.API}/episode`)
                ]);

                state.character = characterData;
                state.location = locationData;
                state.episode = episodeData;

                saveStateToLocalStorage();
            }
        } catch (error) {
            toast.error('Error loading data from API or localStorage');
        } finally {
            state.isLoading = false;
        }
    };
    const loadNextData = async <T extends keyof State>(data: T, info: State[T] extends {
        info: { next?: string }
    } ? State[T]['info'] : never): Promise<void> => {
        if (!info.next) {
            toast.error('No more data');
            return;
        }
        state.isLoading = true;
        try {
            const newData = await repositories.fetchAPI(info.next);
            if ('results' in newData && 'info' in newData) {
                state[data] = newData;
                saveStateToLocalStorage();
            } else {
                toast.error('Invalid data received from API');
            }
        } catch (error) {
            toast.error('Error loading data');
        } finally {
            state.isLoading = false;
        }
    }

    const loadPreviousData = async <T extends keyof State>(data: T, info: State[T] extends {
        info: { prev?: string }
    } ? State[T]['info'] : never): Promise<void> => {
        if (!info.prev) {
            toast.error('No more data');
            return;
        }
        state.isLoading = true;
        try {
            const newData = await repositories.fetchAPI(info.prev);
            if ('results' in newData && 'info' in newData) {
                state[data] = newData;
                saveStateToLocalStorage();
            } else {
                toast.error('Invalid data received from API');
            }
        } catch (error) {
            toast.error('Error loading data');
        } finally {
            state.isLoading = false;
        }
    };

    const fetchAdditionalData = async (data: any, value: any): Promise<any> => {
        if (data && value) {
            state.isLoading = true;
            try {
                const dataPromises = value.map((url: string) => repositories.fetchAPI(url));
                return await Promise.all(dataPromises);
            } catch (error) {
                const errorMessage = 'Ошибка загрузки эпизодов';
                console.error(errorMessage, error);
            } finally {
                state.isLoading = false;
            }
        }
    }
    const fetchApiData = async <T extends keyof State>(type: T, id: number) => {
        try {
            const response = await fetch(`${state.API}/${type}/${id}`);
            const data = await response.json();
            if (response.ok) {
                (state[type] as IAPIState).results.push(data);
                saveStateToLocalStorage();
            }
        } catch (error) {
            console.error(`Error fetching ${type} data:`, error);
        }
    };


    return {
        state,
        getApi,
        loadNextData,
        loadPreviousData,
        fetchAdditionalData,
        fetchApiData,
    };
});
