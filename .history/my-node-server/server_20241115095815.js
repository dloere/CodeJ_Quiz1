const express = require('express');
const ping = require('ping');
const cors = require('cors');

const app = express();

// CORS 설정 (모든 출처에서의 요청을 허용)
app.use(cors());

// 기본 포트 설정
const port = 3000;

// ping 엔드포인트 정의
app.get('/ping', async (req, res) => {
    const ip = req.query.ip;  // 쿼리 파라미터로 IP를 받음

    if (!ip) {
        return res.status(400).json({ message: 'IP address is required.' });
    }

    try {
        // ICMP ping을 보내고 응답을 받음
        const result = await ping.promise.probe(ip);
        if (result.alive) {
            res.json({ message: `Ping to ${ip} is successful.` });
        } else {
            res.json({ message: `Ping to ${ip} failed.` });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error pinging the IP address.' });
    }
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});