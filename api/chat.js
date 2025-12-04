export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Server configuration error: API key missing' });
    }

    try {
        const { messages } = req.body;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": req.headers.referer || "https://aryanshandilya.com", // Fallback or dynamic
                "X-Title": "Aryan Shandilya Portfolio"
            },
            body: JSON.stringify({
                "model": "openai/gpt-oss-20b:free", // Or use a better model if you have credits
                "messages": messages
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || 'Failed to fetch from OpenRouter');
        }

        return res.status(200).json(data);

    } catch (error) {
        console.error("API Proxy Error:", error);
        return res.status(500).json({ error: 'Failed to process request' });
    }
}
