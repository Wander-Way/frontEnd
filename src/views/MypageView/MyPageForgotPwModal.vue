<script setup>

import { useMyPageStore } from "../../stores/mypage.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";



const email = ref("");
const password = ref("p12345678");
const myPageStore = useMyPageStore();

const findPassword = async () => {
  console.log("findPassword 실행", email.value);
  password.value = await myPageStore.requestPassword({
      email: email.value,
      password: ""});
      alert(`비밀번호는 ${password.value} 입니다.`);
};

</script>

<template>
  
  <div class="modal align-items-center" >
    <div class="modal-content align-items-center">
        <div id="container-fluid" class="container-fluid align-items-center" >
            <div class="col align-items-center flex-col sign-in">
              <div class="form-wrapper align-items-center">
                <div class="form sign-in">
                  <div class="input-group">
                    <i class='bx bxs-user'></i>
                    <input type="text" placeholder="Email" v-model="email">
                  </div>
                  <button @click="findPassword">
                    비밀번호 찾기
                  </button>
                </div>
              </div>
            </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.modal {
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; 
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .modal-content {
  z-index: 10001;
  width: 800px;
  max-height: 500px;
  overflow: auto;
  background-color: #fff;
  padding: 60px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
} */


.modal-content {
  display: flex;
  align-items: center;
  width: 500px;
    --primary-color:#6f74b4; 
    /*#4EA685;*/
    --secondary-color: #abb0f5;
    /*#57B894;*/
    --black: #000000;
    --white: #ffffff;
    --gray: #efefef;
    --gray-2: #757575;

    --facebook-color: #4267B2;
    --google-color: #DB4437;
    --twitter-color: #1DA1F2;
    --insta-color: #E1306C;
}

* {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    /*box-sizing: border-box;*/
}

html,
body {
    height: 100vh;
    overflow: hidden;
}

.container-fluid {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
}

.row {
    display: flex;
    flex-wrap: wrap;
    height: 100vh;
}

.col {
    width: 100%;
}

.align-items-center {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.form-wrapper {
    width: 100%;
    /*max-width: 28rem;*/
}

.form {
    padding: 1rem;
    background-color: var(--white);
    border-radius: 1.5rem;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transform: scale(1);
    transition: .5s ease-in-out;
    transition-delay: 1s;
}

.input-group {
    position: relative;
    width: 100%;
    margin: 1rem 0;
}

.input-group i {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    font-size: 1.4rem;
    color: var(--gray-2);
}

.input-group input {
    width: 100%;
    padding: 1rem 3rem;
    font-size: 1rem;
    background-color: var(--gray);
    border-radius: .5rem;
    border: 0.125rem solid var(--white);
    outline: none;
}

.input-group input:focus {
    border: 0.125rem solid var(--primary-color);
}

.form button {
    cursor: pointer;
    width: 100%;
    padding: .6rem 0;
    border-radius: .5rem;
    border: none;
    background-color: var(--primary-color);
    color: var(--white);
    font-size: 1.2rem;
    outline: none;
}

.form p {
    margin: 1rem 0;
    font-size: .7rem;
}

.flex-col {
    flex-direction: column;
}

.pointer {
    cursor: pointer;
}

.container-fluid.sign-in .form.sign-in,
.container-fluid.sign-in .social-list.sign-in,
.container-fluid.sign-in .social-list.sign-in>div,

.content-row {
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 6;
    width: 100%;
}

.text {
    margin: 4rem;
    color: var(--white);
}

.text h2 {
    font-size: 3.5rem;
    font-weight: 800;
    margin: 2rem 0;
    transition: 1s ease-in-out;
}

.text p {
    font-weight: 600;
    transition: 1s ease-in-out;
    transition-delay: .2s;
}

.img img {
    width: 30vw;
    transition: 1s ease-in-out;
    transition-delay: .4s;
}

.text.sign-in h2,
.text.sign-in p,
.img.sign-in img {
    transform: translateX(-250%);
}



</style>
