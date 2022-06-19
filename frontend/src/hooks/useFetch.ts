import accessTokenStore from '../stores/accessTokenStore';

export default function useFetch(): {
    fetchAsUser: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
    fetchJsonAsUser: <T>(input: RequestInfo, init?: RequestInit) => Promise<T>;
    fetchJson: <T>(input: RequestInfo, init?: RequestInit) => Promise<T>;
} {
    const { accessToken, setAccessToken } = accessTokenStore();

    const fetchAsUser = async (
        input: RequestInfo,
        init?: RequestInit
    ): Promise<Response> => {
        const res = await fetch(input, {
            ...init,
            headers: {
                ...init?.headers,
                Authorization: `Bearer ${accessToken}`
            }
        });
        const data = await res.json();
        if (data && data.access_token) setAccessToken(data.access_token);
        return res;
    };

    const fetchJsonAsUser = async <T>(
        input: RequestInfo,
        init?: RequestInit
    ): Promise<T> => {
        const res = await fetch(input, {
            ...init,
            headers: {
                ...init?.headers,
                Authorization: `Bearer ${accessToken}`
            }
        });
        const data = await res.json();
        let ans = data;
        const token = data.access_token;
        if (token) {
            setAccessToken(token);
            delete ans['access_token'];
        }
        return ans as T;
    };

    const fetchJson = async <T>(
        input: RequestInfo,
        init?: RequestInit
    ): Promise<T> => {
        const res = await fetch(input, init);
        const data = await res.json();
        return data as T;
    };

    return {
        fetchAsUser /* : user ? fetchAsUser : fetch */,
        fetchJsonAsUser /* : user ? fetchJsonAsUser : fetchJson */,
        fetchJson
    };
}
