/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/fetchWithCache.ts

type CachedData = {
    data: any;
    expiry: number;
};

const cache = new Map<string, CachedData>();

export async function fetchEventSummary(leagueSlug: string, eventId: string): Promise<any> {    

    const cacheKey = `event-${leagueSlug}-${eventId}`;
    const cached = cache.get(cacheKey);

    const now = Date.now();
    const cacheDuration = 2 * 60 * 1000; // 2 minutes

    if (cached && cached.expiry > now) {
        return cached.data;
    }

    const url = `http://site.api.espn.com/apis/site/v2/sports/soccer/${leagueSlug}/summary?event=${eventId}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Failed to fetch event summary: ${res.statusText}`);
    }

    const data = await res.json();

    cache.set(cacheKey, {
        data,
        expiry: now + cacheDuration,
    });

    return data;
}
