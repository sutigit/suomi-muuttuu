import { StatData } from "./definitions";

export async function getStat(url: string, body: object): Promise<StatData | null> {
    try {
        const response = await fetch(url, {
            cache: 'no-cache',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }  
}