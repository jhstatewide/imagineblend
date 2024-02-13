export enum WordOperator {
    ADD = "add",
    SUBTRACT = "subtract",
}

export class ImagineBlendAPIClient {

    private servedFromHTTP(): boolean {
        return window.location.protocol === 'http:';
    }

    private buildURL(word1: string, word2: string, operator: WordOperator): string {
        // if the ENV has a custom API URL, use it
        let apiHost = API_HOST;
        if (apiHost !== undefined && apiHost !== "DEFAULT_ORIGIN") {
            if (this.servedFromHTTP()) {
                return `http://${apiHost}/words/${operator}/${word1}/${word2}`;
            } else {
                return `https://${apiHost}/words/${operator}/${word1}/${word2}`;
            }
        }
        const origin = window.location.origin;
        return `${origin}/words/${operator}/${word1}/${word2}`;
    }

    public async addWords(word1: string, word2: string): Promise<string> {
        const url = this.buildURL(word1, word2, WordOperator.ADD);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    }

    public async subtractWords(word1: string, word2: string): Promise<string> {
        const url = this.buildURL(word1, word2, WordOperator.SUBTRACT);

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.text();
    }
}