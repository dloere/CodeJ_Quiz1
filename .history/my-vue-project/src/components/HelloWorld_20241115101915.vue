<template>
  <div>
    <h3>Ping Service</h3>
    
    <!-- IP 입력창 -->
    <input v-model="ip" placeholder="Enter IP Address" />
    <input v-model="port" placeholder="Enter Port (Optional)" type="number" />
    <button @click="sendPing" :disabled="loading">Ping</button>
    
    <!-- 로딩 표시 -->
    <div v-if="loading">Loading...</div>

    <!-- 결과 표시 -->
    <div v-if="pingResult">
      <p>{{ pingResult }}</p>
    </div>

    <!-- 검색 이력 -->
    <div v-if="history.length">
      <h4>Search History</h4>
      <ul>
        <li v-for="(item, index) in history" :key="index" @click="repeatPing(item)">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ip: "",  // 현재 입력한 IP 주소
      port: "",  // 포트 입력값
      pingResult: null,  // ping 결과
      loading: false,  // 로딩 상태
      history: []  // 검색 이력
    };
  },
  methods: {
    // ping 요청 함수
    async sendPing() {
      if (!this.ip) {
        alert("Please enter a valid IP address.");
        return;
      }

      this.loading = true;  // 로딩 시작
      this.pingResult = null;  // 이전 결과 초기화

      try {
        // 포트가 입력되었을 경우 URL에 포함
        const url = this.port
          ? `http://localhost:3000/ping?ip=${this.ip}&port=${this.port}`
          : `http://localhost:3000/ping?ip=${this.ip}`;
        
        const response = await fetch(url);
        const data = await response.json();
        this.pingResult = data.message + (data.portStatus || '');  // 결과 메시지 표시
        this.addToHistory(this.ip);  // 이력에 추가
      } catch (error) {
        this.pingResult = "Error: Unable to ping the IP.";
        console.error(error);
      } finally {
        this.loading = false;  // 로딩 종료
      }
    },

    // 이력에 IP를 추가하는 함수
    addToHistory(ip) {
      if (!this.history.includes(ip)) {
        this.history.push(ip);
      }
    },

    // 검색 이력 클릭 시 해당 IP로 ping을 다시 보내는 함수
    repeatPing(ip) {
      this.ip = ip;  // IP를 입력창에 채우고
      this.sendPing();  // ping을 다시 보냄
    }
  }
};
</script>

<style scoped>
input {
  padding: 8px;
  margin-right: 10px;
}
button {
  padding: 8px 12px;
  cursor: pointer;
}
button:disabled {
  cursor: not-allowed;
  background-color: #ccc;
}
div {
  margin-top: 20px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  cursor: pointer;
  margin: 5px 0;
  background-color: #f1f1f1;
  padding: 5px;
  border-radius: 5px;
}
li:hover {
  background-color: #e0e0e0;
}
</style>