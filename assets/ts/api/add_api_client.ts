export class AddAPIClient {
    public async addWords(word1: string, word2: string): Promise<string> {
        const url = `http://localhost:7002/words/add/${word1}/${word2}`;

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