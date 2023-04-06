export const rootAgent = {
    get: async (url: string) => {
        const res = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
                "content-type": "application/json",
            }
            
        })
        return res;
    }
}