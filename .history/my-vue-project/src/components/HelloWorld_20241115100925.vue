<template>
  <div>
    <h3>Ping Service</h3>
    <div style="text-align: center;">
      <div style="display: flex">
        <div style="width: 100px; line-height: 35px;">IP :</div> <input v-model="ip" placeholder="Enter IP Address" />
      </div>
      <div style="display: flex">
        <div style="width: 100px; line-height: 35px;">PORT :</div> <input v-model="port" placeholder="Enter Port (optional)" />
      </div>
    </div>
    
    
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
    const ip = ref('');
    const port = ref('');
    const pingResult = ref(null);

    const sendPing = async () => {
      if (!ip.value) {
        alert('Please enter a valid IP address.');
        return;
      }

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