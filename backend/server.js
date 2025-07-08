const express = require("express");
const cors = require("cors");

const app = express(); // ✅ Correct lowercase 'app'

// ✅ CORS fix (round brackets lagao)
app.use(cors({ origin: "http://localhost:3000" }));

const generateStockData = () => {
    const randomChange = (Math.random() * 2 - 1).toFixed(2);
    const open = (150 + Math.random() * 10).toFixed(2);
    const close = (parseFloat(open) + parseFloat(randomChange)).toFixed(2);

    return {
        symbol: "JPM",
        name: "JPMorgan Chase & Co.",
        exchange: "NYSE",
        currency: "USD",
        datetime: new Date().toISOString(),
        open: open,
        high: (parseFloat(open) + Math.random()).toFixed(2),
        low: (parseFloat(open) - Math.random()).toFixed(2),
        close: close,
        volume: (Math.floor(Math.random() * 100000000) + 1000000).toString(),
        previous_close: (parseFloat(close) - (Math.random() * 2)).toFixed(2),
        change: randomChange,
        average_volume: "18,613,062",
    };
};

app.get("/stock-data", (req, res) => {
    // ✅ CORS header for Server-Sent Events
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const sendStockData = () => {
        const data = generateStockData();
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    const intervalId = setInterval(sendStockData, 2000);

    req.on("close", () => {
        clearInterval(intervalId);
        res.end();
    });
});

const PORT = 5001;
app.listen(PORT, () => console.log(`✅ Server listening on port ${PORT}`));
