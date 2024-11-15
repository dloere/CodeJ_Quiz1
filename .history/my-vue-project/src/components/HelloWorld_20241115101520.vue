<template>
  <div>
    <h3>Ping Service</h3>


    <!-- 입력창 -->
    <div style="display: flex; justify-content: center;">
      <div style="width: 100px; line-height: 35px;">IP :</div> <input v-model="ip" placeholder="Enter IP Address" />
    </div>
    <div style="display: flex; justify-content: center;">
      <div style="width: 100px; line-height: 35px;">PORT :</div> <input v-model="port" placeholder="Enter Port (optional)" />
    </div>

    <!-- 버튼 -->
    <button style="margin-top: 10px" @click="sendPing">Ping</button>

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
import { ref } from 'vue';

export default {
  name: 'HelloWorld',
  data() {
    return {
      ip: "",  // 현재 입력한 IP 주소
      pingResult: null,  // ping 결과
      loading: false,  // 로딩 상태
      history: []  // 검색 이력
    };
  },

  methods: {
sendPing = async () => {
      if (!ip.value) {
        alert('Please enter a valid IP address.');
        return;
      }

      this.loading = true;  // 로딩 시작

      try {
        const url = port.value
          ? `http://localhost:3000/ping?ip=${ip.value}&port=${port.value}`
          : `http://localhost:3000/ping?ip=${ip.value}`;
        const response = await fetch(url);
        const data = await response.json();
        pingResult.value = data.message + (data.portStatus || '');
      } catch (error) {
        pingResult.value = 'Error: Unable to ping the IP.';
        console.error(error);
      } finally {
        this.loading = false;  // 로딩 종료
      }
    };
  },


  setup() {
    const ip = ref('');
    const port = ref('');
    const pingResult = ref(null);

    const sendPing = async () => {
      if (!ip.value) {
        alert('Please enter a valid IP address.');
        return;
      }

      this.loading = true;  // 로딩 시작

      try {
        const url = port.value
          ? `http://localhost:3000/ping?ip=${ip.value}&port=${port.value}`
          : `http://localhost:3000/ping?ip=${ip.value}`;
        const response = await fetch(url);
        const data = await response.json();
        pingResult.value = data.message + (data.portStatus || '');
      } catch (error) {
        pingResult.value = 'Error: Unable to ping the IP.';
        console.error(error);
      } finally {
        this.loading = false;  // 로딩 종료
      }
    };

    return { ip, port, pingResult, sendPing };
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
</style>