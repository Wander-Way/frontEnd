<script setup>
import axios from "axios";
import { ref } from "vue";
import EventBus from "@/util/EventBus";

const chatMessages = ref([]);
const userInput = ref("");
const loading = ref(false); // 추가: 로딩 상태를 나타내는 변수
const locations = ref([]);

console.log("ai setup 실행, 채팅기록 : ", chatMessages.value);

const sendMessage = async () => {
  loading.value = true; // API 요청 전에 로딩 상태를 활성화

  const userMessage = userInput.value;
  chatMessages.value.push({ role: "user", text: userMessage });
  userInput.value = "";

  const chatGPTResponse = await callChatGPT(userMessage);
  chatMessages.value.push({ role: "chatgpt", text: chatGPTResponse });

  //위치정보 추출 - 추출된 결과를 배열에 저장
  const pattern = /\d+\.\s*([^:]+):/g;
  const matches = Array.from(chatGPTResponse.matchAll(pattern), (match) =>
    match[1].trim()
  );
  locations.value = matches.map((match) => match);
  console.log(locations);

  //추출된 위치정보 기반으로 검색결과를 맵에 렌더링
  EventBus.emit("setMap", locations.value);
};

const callChatGPT = async (message) => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  const data = JSON.stringify({
    messages: [
      {
        role: "user",
        content:
          message +
          "\n 각 여행지에 대한 설명은 한줄만 작성해주고 형식은 1.여행지이름 : 여행지에 대한 설명 @@@2.여행지이름 : 여행지에 대한 설명 이런식으로 부탁해.",
      },
    ],
    max_tokens: 400,
    model: "gpt-3.5-turbo",
  });

  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling ChatGPT:", error.response.data);
    throw error;
  } finally {
    loading.value = false; // API 요청이 완료되면 로딩 상태를 비활성화
  }
};
</script>

<template>
  <!-- <div>
    <div v-for="(message, index) in chatMessages" :key="index">
      <div v-if="message.role === 'user'">User: {{ message.text }}</div>
      <div v-else>ChatGPT: {{ message.text }}</div>
    </div>

    <div>
      <input
        v-model="userInput"
        @keyup.enter="sendMessage"
        placeholder="여기에 메세지를 입력"
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
  <div v-if="loading">로딩 중...</div> -->
  <!-- 로딩 중일 때만 표시 -->

  <div class="container">
    <h1>AI채팅방</h1>
    <div class="chatbox">
      <div class="top-bar">
        <div class="avatar"><p>V</p></div>
        <div class="name">WANDER WAY AI BOT</div>
        <div class="icons">
          <i class="fas fa-phone"></i>
          <i class="fas fa-video"></i>
        </div>
        <div class="menu">
          <div class="dots"></div>
        </div>
      </div>
      <div class="middle">
        <div class="voldemort" ref="chatContainer">
          <div class="incoming">
            <div class="bubble lower">
              안녕하세요! 여행플랜 세우기를 도와드리는 WANDER WAY BOT입니다.
            </div>
          </div>

          <div v-for="(message, index) in chatMessages" :key="index">
            <div v-if="message.role === 'user'">
              <div class="outgoing">
                <div class="bubble">{{ message.text }}</div>
              </div>
            </div>
            <div v-else>
              <div class="incoming">
                <div class="bubble lower">{{ message.text }}</div>
              </div>
            </div>
          </div>

          <div class="typing">
            <div v-if="loading" class="bubble">
              <div class="ellipsis one"></div>
              <div class="ellipsis two"></div>
              <div class="ellipsis three"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-bar">
        <div class="chat">
          <input
            v-model="userInput"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Type a message..."
          />
          <button type="submit" @click="sendMessage">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Lato:400,700");

$font: "Lato", sans-serif;

$primary: #79c7c5;
$secondary: #a1e2d9;
$white: #f9fbff;
$dark: #777777;

.container {
  position: relative;
  // margin: 12% auto;
  width: 100%;
  height: 450px;
  border: 2px dashed rgb(212, 212, 212);
  border-radius: 8px;
}

.chatbox {
  position: absolute;
  // left: 35%;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  // box-shadow: 5px 5px 15px rgba($dark, 0.5);
}

.top-bar {
  width: 100%;
  height: 100%;
  background: $white;
  border-radius: 10px 10px 0 0;
}

.avatar {
  width: 35px;
  height: 35px;
  background: linear-gradient(to bottom left, $primary 20%, $secondary 100%);
  border-radius: 50%;
  position: absolute;
  top: 11px;
  left: 15px;
  p {
    color: $white;
    margin: 7px 12px;
  }
}

.name {
  position: absolute;
  top: 22px;
  text-transform: uppercase;
  color: $dark;
  font-size: 0.8em;
  letter-spacing: 2px;
  font-weight: 500;
  left: 60px;
}

.menu {
  position: absolute;
  right: 10px;
  top: 20px;
  width: 10px;
  height: 20px;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: all 0.3s ease-in;
  }
}

.icons {
  position: absolute;
  color: $secondary;
  padding: 10px;
  top: 5px;
  right: 21px;
  cursor: pointer;
  .fas {
    padding: 5px;
    opacity: 0.8;
    &:hover {
      transform: scale(1.1);
      transition: all 0.3s ease-in;
    }
  }
}

.dots {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: $primary;
  box-shadow: 0px 7px 0px $primary, 0px 14px 0px $primary;
}

.middle {
  position: absolute;
  background: $white;
  width: 100%;
  opacity: 0.85;
  top: 60px;
  height: 80%;
}

.incoming {
  position: absolute;
  width: 50%;
  height: 100%;
  padding: 20px;
  .bubble {
    background: lighten($dark, 23%);
  }
}

.typing {
  position: absolute;
  top: 67%;
  left: 20px;
  .bubble {
    background: lighten($dark, 45%);
    padding: 8px 13px 9px 13px;
  }
}

.ellipsis {
  width: 5px;
  height: 5px;
  display: inline-block;
  background: lighten($dark, 25%);
  border-radius: 50%;
  animation: bounce 1.3s linear infinite;
}

.one {
  animation-delay: 0.6s;
}
.two {
  animation-delay: 0.5s;
}
.three {
  animation-delay: 0.8s;
}

.bubble {
  position: relative;
  display: inline-block;
  margin-bottom: 5px;
  color: $white;
  font-size: 0.7em;
  padding: 10px 10px 10px 12px;
  border-radius: 20px;
}

.outgoing {
  position: absolute;
  padding: 20px;
  right: 0;
  top: 15%;
  width: 50%;
  height: 100%;
  .bubble {
    background: $primary;
    float: right;
  }
}

.bottom-bar {
  position: absolute;
  width: 100%;
  height: 55px;
  bottom: 0;
  background: $white;
  border-radius: 0 0 10px 10px;
}

input {
  padding: 7px;
  width: 74%;
  left: 5%;
  position: absolute;
  border: 0;
  top: 13px;
  background: $white;
  color: $primary;
}

input::placeholder {
  color: $secondary;
}

input:focus {
  color: $dark;
  outline: 0;
}

button {
  position: absolute;
  border: 0;
  font-size: 1em;
  color: $secondary;
  top: 19px;
  opacity: 0.8;
  right: 17px;
  cursor: pointer;
  outline: 0;
  &:hover {
    transform: scale(1.1);
    transition: all 0.3s ease-in-out;
    color: $primary;
  }
}

.voldemort {
  /* 기존 스타일 유지 */
  overflow-y: auto;
  max-height: 100%; /* 최대 높이를 부모 컨테이너에 맞게 설정하거나 원하는 높이로 지정하세요 */
}

@keyframes bounce {
  30% {
    transform: translateY(-2px);
  }
  60% {
    transform: translateY(0px);
  }
  80% {
    transform: translateY(2px);
  }
  100% {
    transform: translateY(0px);
    opacity: 0.5;
  }
}
</style>
