<template>
  <div>
    <h3>Ping Service</h3>
    <input v-model="ip" placeholder="Enter IP Address" />
    <button @click="sendPing">Ping</button>
    
    <div v-if="pingResult">
      <p>{{ pingResult }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'HelloWorld',
  setup() {
    const ip = ref('');               // IP 주소를 저장할 변수
    const pingResult = ref(null);      // 핑 결과 저장

    const sendPing = async () => {
      if (!ip.value) {
        alert('Please enter a valid IP address.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:8080/ping?ip=${ip.value}`);
        const data = await response.json();
        pingResult.value = data.message; // 서버로부터 받은 결과 메시지 표시
      } catch (error) {
        pingResult.value = 'Error: Unable to ping the IP.';
        console.error(error);
      }
    };

    return { ip, pingResult, sendPing };
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
