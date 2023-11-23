<script setup>
import { ref, onMounted } from "vue";
import { useMyPageStore } from "../../stores/mypage.js";
import { RouterLink, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const myPageStore = useMyPageStore();
const router = useRouter();
const myPageMyInfoLocal = ref({
  email: "",
  password: "",
  nickname: "",
  profile: "",
});

const localEmail = ref("");
const localPassword = ref("");
const localNickname = ref("");
const localProfile = ref("");

const isEditingEmail = ref(false);
const isEditingNickname = ref(false);
const isEditingProfile = ref(false);
const isEditingPassword = ref(false);

const editEmailButtonClick = () => {
  if (isEditingEmail.value == false) {
    isEditingEmail.value = true;
    return;
  } else {
    myPageStore.requestModifyMyInfo({
      email: localEmail.value,
      password: localPassword.value,
      nickname: localNickname.value,
      profile: localProfile.value,
    });
    isEditingEmail.value = false;
    alert("이메일 변경 완료");
  }
};
const editNicknameButtonClick = () => {
  if (isEditingNickname.value == false) {
    isEditingNickname.value = true;
    return;
  } else {
    myPageStore.requestModifyMyInfo({
      email: localEmail.value,
      password: localPassword.value,
      nickname: localNickname.value,
      profile: localProfile.value,
    });
    isEditingNickname.value = false;
    alert("닉네임 변경 완료");
  }
};

const editProfileButtonClick = () => {
  if (isEditingProfile.value == false) {
    isEditingProfile.value = true;
    return;
  } else {
    myPageStore.requestModifyMyInfo({
      email: localEmail.value,
      password: localPassword.value,
      nickname: localNickname.value,
      profile: localProfile.value,
    });
    isEditingProfile.value = false;
    alert("프로필 변경 완료");
  }
};

const editPasswordButtonClick = () => {
  if (isEditingPassword.value == false) {
    isEditingPassword.value = true;
    return;
  } else {
    myPageStore.requestModifyMyInfo({
      email: localEmail.value,
      password: localPassword.value,
      nickname: localNickname.value,
      profile: localProfile.value,
    });
    isEditingPassword.value = false;
    alert("비밀번호 변경 완료");
  }
};

const requestMypage = async () => {
  await myPageStore.requestMypage();
  const { myPageMyInfo } = storeToRefs(myPageStore);
  myPageMyInfoLocal.value = myPageMyInfo.value;
  localEmail.value = myPageMyInfoLocal.value.email;
  localPassword.value = myPageMyInfoLocal.value.password;
  localNickname.value = myPageMyInfoLocal.value.nickname;
  localProfile.value = myPageMyInfoLocal.value.profile;
};

onMounted(requestMypage);
</script>

<template>
  <div>
    <body class="bg-gray-50">
      <div class="min-h-screen flex items-start justify-center">
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div class="flex flex-col items-center mb-4">
            <img
              class="w-24 h-24 rounded-full"
              src="https://cataas.com/cat?size:640"
              alt="Profile Picture"
            />
            <h2 class="mt-3 text-xl font-semibold text-gray-800">
              {{ localNickname }}
            </h2>
            <p class="text-gray-600">{{ localEmail }}</p>
          </div>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-gray-700">이메일</span>
              <span v-if="!isEditingEmail" class="text-gray-700">
                <span class="text-gray-700">{{ localEmail }}</span>
              </span>
              <input
                v-else
                v-model="localEmail"
                type="text"
                style="border: 2px solid black"
              />
              <button id="btn_select" @click="editEmailButtonClick">
                edit
              </button>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-700">닉네임</span>
              <span v-if="!isEditingNickname" class="text-gray-700">
                <span class="text-gray-700">{{ localNickname }}</span>
              </span>
              <input
                v-else
                v-model="localNickname"
                type="text"
                style="border: 2px solid black"
              />
              <button id="btn_select" @click="editNicknameButtonClick">
                edit
              </button>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-700">프로필</span>
              <span v-if="!isEditingProfile" class="text-gray-700">
                <span class="text-gray-700">{{ localProfile }}</span>
              </span>
              <input
                v-else
                v-model="localProfile"
                type="text"
                style="border: 2px solid black"
              />
              <button id="btn_select" @click="editProfileButtonClick">
                edit
              </button>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-gray-700">비밀번호</span>
              <span v-if="!isEditingPassword" class="text-gray-700">
                <span class="text-gray-700">{{ localPassword }}</span>
              </span>
              <input
                v-else
                v-model="localPassword"
                type="password"
                style="border: 2px solid black"
              />
              <button id="btn_select" @click="editPasswordButtonClick">
                edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </body>

    <!--<h1>내 프로필 화면</h1>
            <p>Email: {{ localEmail }}</p>
            <p>Password: {{ localPassword }}</p>
            <p>Nickname: {{ localNickname }}</p>
            <p>Profile: {{ localProfile }}</p>-->
  </div>
</template>

<style scoped>
#btn_select {
  width: 15%;
  padding: 10px 10px 10px 10px;
  background-color: #6f74b4;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-family: "Abhaya Libre", serif;
  transition: background-color 0.3s ease;
}

#btn_select:hover {
  background-color: #b5afff;
}
</style>
