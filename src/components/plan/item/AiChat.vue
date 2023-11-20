<script setup>
import axios from 'axios';
import { ref } from 'vue';

const chatMessages = ref([]);
const userInput = ref("대전 여행지 추천해줘!");
const loading = ref(false); // 추가: 로딩 상태를 나타내는 변수
const locations = ref([]);

const sendMessage = async () => {
  loading.value = true; // API 요청 전에 로딩 상태를 활성화

  const userMessage = userInput.value;
  chatMessages.value.push({ role: 'user', text: userMessage});
  userInput.value = "";
  const chatGPTResponse = await callChatGPT(userMessage);
  chatMessages.value.push({ role: 'chatgpt', text: chatGPTResponse});

  //위치정보 추출 - 추출된 결과를 배열에 저장
  const pattern = /\d+\.\s*([^:]+):/g;
  const matches = Array.from(chatGPTResponse.matchAll(pattern), match => match[1].trim());
  locations.value = matches.map(match => match);
  console.log(locations);

  //추출된 위치정보 기반으로 검색결과를 맵에 렌더링


};

const callChatGPT = async (message) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const data = JSON.stringify({
    "messages": chatMessages.value.map(msg => ({ role: msg.role, content: message+"\n 각 여행지에 대한 설명은 한줄만 작성해주고 형식은 1.여행지1 : 설명 @@@2.여행지2 : 설명 이런식으로 부탁해."  })),
    "max_tokens": 400,
    "model": "gpt-3.5-turbo",
  });

  try {
    const response = await axios.post(
      apiUrl, data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling ChatGPT:', error.response.data);
    throw error;
  } finally {
    loading.value = false; // API 요청이 완료되면 로딩 상태를 비활성화
  }
};

</script>

<template>
  <h1>AI채팅방</h1>
  <div>
    <div v-for="(message, index) in chatMessages" :key="index">
      <div v-if="message.role === 'user'">User: {{ message.text }}</div>
      <div v-else>ChatGPT: {{ message.text }}</div>
    </div>

    <div>
      <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Type your message..." />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
  <div v-if="loading">로딩 중...</div> <!-- 로딩 중일 때만 표시 -->
</template>

<style scoped></style>
