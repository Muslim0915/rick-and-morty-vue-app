export const fetchAPI = async (url: string): Promise<object> => {
    const response: Response = await fetch(url);
    return await response.json();
}