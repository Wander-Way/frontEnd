<script setup>
/*

로그인 파트 나중에 JWT 토큰 방식으로 변경할 예정

임시 로그인 방식 그냥 POST 요청하고 mypage.js 스토어에 저장하는 방식으로 구현


*/

import { ref } from "vue";
import { useMyPageStore } from "../../stores/mypage.js";
import { RouterLink, useRouter } from "vue-router";

const email = ref("ssafytest@gmail.com");
const password = ref("p12345678");
const myPageStore = useMyPageStore();
const router = useRouter();

const login = async () => {
  const params = ref({
    email: email.value,
    password: password.value,
  });
  console.log("params : ", params.value);

  const result = await myPageStore.requestLogin(params.value);
  console.log("result : ", result);

  if (result == true) {
    alert("로그인 성공");
    router.push({ name: "myPageHome" });
  } else {
    alert("로그인 실패");
  }
};
</script>

<template>
  <!-- <div class="login-container">
    <h1>Login</h1>
    <form>
      <input type="text" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
    </form>
    <button type="submit" @click="login">Login</button>
  </div> -->

  <div class="wrapper">
    <div class="container">
      <div class="sign-up-container">
        <form>
          <h1>Create Account</h1>
          <!-- <div class="social-links">
            <div>
              <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
            </div>
            <div>
              <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
            </div>
            <div>
              <a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
            </div>
          </div> -->
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button class="form_btn">Sign Up</button>
        </form>
      </div>
      <div class="sign-in-container">
        <form @submit.prevent="login">
          <h1>로그인</h1>
          <br />

          <!-- <div class="social-links">
            <div>
              <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
            </div>
            <div>
              <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
            </div>
            <div>
              <a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
            </div>
          </div> -->
          <span>Use your email account</span>
          <input type="email" v-model="email" placeholder="Email" />
          <input type="password" v-model="password" placeholder="Password" />
          <button class="submit">Sign In</button>
        </form>
      </div>
      <div class="overlay-container">
        <div class="overlay-left">
          <h1>Welcome Back</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button id="signIn" class="overlay_btn">Sign In</button>
        </div>
        <div class="overlay-right">
          <h1>Hello, Friend</h1>
          <p>Enter your personal details and start journey with us</p>
          <button id="signUp" class="overlay_btn">Sign Up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css");

* {
  box-sizing: border-box;
}
body {
  font-family: "Montserrat", sans-serif;
  margin: 0;
  padding: 0;
}
.wrapper {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ebecf0;
  overflow: hidden;
}
.container {
  border-radius: 10px;
  box-shadow: -5px -5px 10px #fff, 5px 5px 10px #babebc;
  position: absolute;
  width: 768px;
  min-height: 480px;
  overflow: hidden;
}
form {
  background: #ebecf0;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
}
form input {
  background: #eee;
  padding: 16px;
  margin: 8px 0;
  width: 85%;
  border: 0;
  outline: none;
  border-radius: 20px;
  box-shadow: inset 7px 2px 10px #babebc, inset -5px -5px 12px #fff;
}
button {
  border-radius: 20px;
  border: none;
  outline: none;
  font-size: 12px;
  font-weight: bold;
  padding: 15px 45px;
  margin: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: transform 80ms ease-in;
}
.form_btn {
  box-shadow: -5px -5px 10px #fff, 5px 5px 8px #babebc;
}
.form_btn:active {
  box-shadow: inset 1px 1px 2px #babebc, inset -1px -1px 2px #fff;
}
.overlay_btn {
  background-color: #b793d8;
  color: #fff;
  box-shadow: -5px -5px 10px #b793d8, 5px 5px 8px #b773d8;
}
.sign-in-container {
  position: absolute;
  left: 0;
  width: 50%;
  height: 100%;
  transition: all 0.5s;
}
.sign-up-container {
  position: absolute;
  left: 0;
  width: 50%;
  height: 100%;
  opacity: 0;
  transition: all 0.5s;
}
.overlay-left {
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  width: 50%;
  height: 100%;
  opacity: 0;
  background-color: #b793d8;
  color: #fff;
  transition: all 0.5s;
}
.overlay-right {
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  width: 50%;
  height: 100%;
  background-color: #b773d8;
  color: #fff;
  transition: all 0.5s;
}
.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
  opacity: 0;
}
.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 2;
}
.container.right-panel-active .overlay-right {
  transform: translateX(-100%);
  opacity: 0;
}
.container.right-panel-active .overlay-left {
  transform: translateX(-100%);
  opacity: 1;
  z-index: 2;
}
.social-links {
  margin: 20px 0;
}
form h1 {
  font-weight: bold;
  margin: 0;
  color: #000;
}

p {
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 0.5px;
  margin: 20px 0 30px;
}
span {
  font-size: 12px;
  color: #000;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}
.social-links div {
  width: 40px;
  height: 40px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  border-radius: 50%;
  box-shadow: -5px -5px 10px #fff, 5px 5px 8px #babebc;
  cursor: pointer;
}
.social-links a {
  color: #000;
}
.social-links div:active {
  box-shadow: inset 1px 1px 2px #babebc, inset -1px -1px 2px #fff;
}
</style>
<!-- <style>
.login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

h1 {
    margin-bottom: 1rem;
}

input {
    margin-bottom: 0.5rem;
    padding: 0.5rem;
}

button {
    padding: 0.5rem 1rem;
}
</style> -->
