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
    const ip = ref('');
    const pingResult = ref(null);

    const sendPing = async () => {
      if (!ip.value) {
        alert('Please enter a valid IP address.');
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/ping?ip=${ip.value}`);
        const data = await response.json();
        pingResult.value = data.message;
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