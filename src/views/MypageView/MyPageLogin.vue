<script setup>
/*

로그인 파트 나중에 JWT 토큰 방식으로 변경할 예정

임시 로그인 방식 그냥 POST 요청하고 mypage.js 스토어에 저장하는 방식으로 구현


*/

import { ref } from "vue";
import { useMyPageStore } from "../../stores/mypage.js";
import { RouterLink, useRouter } from "vue-router";
import { onMounted } from "vue";
import $ from 'jquery';

const email = ref("ssafytest@gmail.com");
const password = ref("p12345678");
const myPageStore = useMyPageStore();
const router = useRouter();

const localEmail = ref("");
const localPassword = ref("");
const localPassword2 = ref("");
const localNickname = ref("");
const localProfile = ref("기본 프로필 설명");

const isPasswordForget = ref(false);


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

const register = async () => {
  if (localPassword.value != localPassword2.value) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  const params = {
    email: localEmail.value,
    password: localPassword.value,
    nickname: localNickname.value,
    profile: localProfile.value,
  };
  const result = await myPageStore.requestSignUp(params);

  if (result == true) {
    alert("회원가입 성공");
    router.push({ name: "myPage" });
  } else {
    alert("회원가입 실패");
  }
};


const passwordForgetButtonClick = ()=>{
  alert("임시 비밀번호를 이메일로 전송했습니다.");
  if(isPasswordForget.value == false){
    isPasswordForget.value = true;
    return;
  }else{
    isPasswordForget.value = false;
  }
}


const signUpButtonClick = () => {
  router.push({ name: "myPageSignUp" });
};

const findPassword = (email) => {
  const result = myPageStore.requestPassword(email);
  console.log("result : ", result);
};
//findPassword('ssafytest@gmail.com');

// const container-fluid = document.getElementById('container-fluid')

// container-fluid.classList.toggle('sign-in')
// container-fluid.classList.toggle('sign-up')

// //toggle();
// setTimeout(() => {
//   container-fluid.classList.add('sign-in')
// }, 200);

//const container-fluid = document.getElementById("container-fluid");
//$("#container-fluid").addClass("sign-in");

onMounted(() => {
  
  setTimeout(() => {
  $("#container-fluid").addClass("sign-in");
  }, 200);
});


const toggle = () => {
  console.log("toggle 실행",$("#container-fluid"));
  $("#container-fluid").toggleClass("sign-in");
  $("#container-fluid").toggleClass("sign-up");
};

</script>

<template>
  <div class = "root">
  <div id="container-fluid" class="container-fluid">
    <!-- FORM SECTION -->
    <div class="row">
      <!-- SIGN UP -->
      <div class="col align-items-center flex-col sign-up">
        <div class="form-wrapper align-items-center">
          <div class="form sign-up">
            <div class="input-group">
              <i class='bx bx-mail-send'></i>
              <input type="email" placeholder="Email" v-model="localEmail">
            </div>
            <div class="input-group">
              <i class='bx bxs-user'></i>
              <input type="text" placeholder="NickName" v-model="localNickname">
            </div>
            <div class="input-group">
              <i class='bx bxs-lock-alt'></i>
              <input type="password" placeholder="Password" v-model="localPassword">
            </div>
            <div class="input-group">
              <i class='bx bxs-lock-alt'></i>
              <input type="password" placeholder="Confirm password" v-model="localPassword2">
            </div>
            <button @click="register">
              가입하기
            </button>
            <p>
              <span>
                이미 아이디를 가지고 계신가요?
              </span>
              <b @click="toggle" class="pointer">
                여기서 로그인 하세요!
              </b>
            </p>
          </div>
        </div>
      </div>
      <!-- END SIGN UP -->
      <!-- SIGN IN -->
      <div class="col align-items-center flex-col sign-in">
        <div class="form-wrapper align-items-center">
          <div class="form sign-in">
            <div class="input-group">
              <i class='bx bxs-user'></i>
              <input type="text" placeholder="Email" v-model="email">
            </div>
            <div class="input-group">
              <i class='bx bxs-lock-alt'></i>
              <input type="password" placeholder="Password" v-model = "password">
            </div>
            <button @click="login">
              로그인
            </button>
            <p>
              <span>
                패스워드를 잊어버리셨나요?
              </span>
              <b @click="passwordForgetButtonClick" class="pointer">
                패스워드 찾기
              </b>
            </p>
            <p>
              <span>
                아직 원더웨이 회원이 아니신가요?
              </span>
              <b @click="toggle" class="pointer">
                여기서 가입하세요!
              </b>
            </p>
          </div>
        </div>
        <div class="form-wrapper">
    
        </div>
      </div>
      <!-- END SIGN IN -->
    </div>
    <!-- END FORM SECTION -->
    <!-- CONTENT SECTION -->
    <div class="row content-row">
      <!-- SIGN IN CONTENT -->
      <div class="col align-items-center flex-col">
        <div class="text sign-in">
          <h2>
            로그인
            <!-- Welcome <br>WanderWay -->
          </h2>
  
        </div>
        <div class="img sign-in">
    
        </div>
      </div>
      <!-- END SIGN IN CONTENT -->
      <!-- SIGN UP CONTENT -->
      <div class="col align-items-center flex-col">
        <div class="img sign-up">
        
        </div>
        <div class="text sign-up">
          <h2>
            Join with us
          </h2>
  
        </div>
      </div>
      <!-- END SIGN UP CONTENT -->
    </div>
    <!-- END CONTENT SECTION -->
  </div>

  <!-- <div class="login-container-fluid">
    <h1>Login</h1>
    <form>
      <input type="text" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
    </form>
    <button type="submit" @click="login">Login</button>
  </div> -->
<!-- 
  <div class="wrapper">
    <div class="container-fluid">
      <div class="sign-up-container-fluid">
        <form>
          <h1>Create Account</h1>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button class="form_btn">Sign Up</button>
        </form>
      </div>
      <div class="sign-in-container-fluid">
        <form @submit.prevent="login">
          <h1>로그인</h1>
          <br />
          <span>Use your email account</span>
          <input type="email" v-model="email" placeholder="Email" />
          <input type="password" v-model="password" placeholder="Password" />
          <button class="submit">Sign In</button>
        </form>
      </div>
      <div class="overlay-container-fluid">
        <div class="overlay-left">
          <h1>Welcome Back</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button id="signIn" class="overlay_btn">Sign In</button>
        </div>
        <div class="overlay-right">
          <p>Enter your personal details and start journey with us</p>
          <button id="signUp" class="overlay_btn" @click="signUpButtonClick">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div> -->
  </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600&display=swap');
.root {
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
    box-sizing: border-box;
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
    width: 50%;
}

.align-items-center {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.form-wrapper {
    width: 100%;
    max-width: 28rem;
}

.form {
    padding: 1rem;
    background-color: var(--white);
    border-radius: 1.5rem;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transform: scale(0);
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

.social-list {
    margin: 2rem 0;
    padding: 1rem;
    border-radius: 1.5rem;
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    transform: scale(0);
    transition: .5s ease-in-out;
    transition-delay: 1.2s;
}

.social-list>div {
    color: var(--white);
    margin: 0 .5rem;
    padding: .7rem;
    cursor: pointer;
    border-radius: .5rem;
    cursor: pointer;
    transform: scale(0);
    transition: .5s ease-in-out;
}

.social-list>div:nth-child(1) {
    transition-delay: 1.4s;
}

.social-list>div:nth-child(2) {
    transition-delay: 1.6s;
}

.social-list>div:nth-child(3) {
    transition-delay: 1.8s;
}

.social-list>div:nth-child(4) {
    transition-delay: 2s;
}

.social-list>div>i {
    font-size: 1.5rem;
    transition: .4s ease-in-out;
}

.social-list>div:hover i {
    transform: scale(1.5);
}

.facebook-bg {
    background-color: var(--facebook-color);
}

.google-bg {
    background-color: var(--google-color);
}

.twitter-bg {
    background-color: var(--twitter-color);
}

.insta-bg {
    background-color: var(--insta-color);
}

.pointer {
    cursor: pointer;
}

.container-fluid.sign-in .form.sign-in,
.container-fluid.sign-in .social-list.sign-in,
.container-fluid.sign-in .social-list.sign-in>div,
.container-fluid.sign-up .form.sign-up,
.container-fluid.sign-up .social-list.sign-up,
.container-fluid.sign-up .social-list.sign-up>div {
    transform: scale(1);
}

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

.text.sign-up h2,
.text.sign-up p,
.img.sign-up img {
    transform: translateX(250%);
}

.container-fluid.sign-in .text.sign-in h2,
.container-fluid.sign-in .text.sign-in p,
.container-fluid.sign-in .img.sign-in img,
.container-fluid.sign-up .text.sign-up h2,
.container-fluid.sign-up .text.sign-up p,
.container-fluid.sign-up .img.sign-up img {
    transform: translateX(0);
}

/* BACKGROUND */

.container-fluid::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 100vh;
    width: 300vw;
    transform: translate(35%, 0);
    background-image: linear-gradient(-45deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    transition: 1s ease-in-out;
    z-index: 6;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-bottom-right-radius: max(50vw, 50vh);
    border-top-left-radius: max(50vw, 50vh);
}

.container-fluid.sign-in::before {
    transform: translate(0, 0);
    right: 50%;
}

.container-fluid.sign-up::before {
    transform: translate(100%, 0);
    right: 50%;
}

/* RESPONSIVE */

@media only screen and (max-width: 425px) {

    .container-fluid::before,
    .container-fluid.sign-in::before,
    .container-fluid.sign-up::before {
        height: 100vh;
        border-bottom-right-radius: 0;
        border-top-left-radius: 0;
        z-index: 0;
        transform: none;
        right: 0;
    }

    /* .container-fluid.sign-in .col.sign-up {
        transform: translateY(100%);
    } */

    .container-fluid.sign-in .col.sign-in,
    .container-fluid.sign-up .col.sign-up {
        transform: translateY(0);
    }

    .content-row {
        align-items: flex-start !important;
    }

    .content-row .col {
        transform: translateY(0);
        background-color: unset;
    }

    .col {
        width: 100%;
        position: absolute;
        padding: 2rem;
        background-color: var(--white);
        border-top-left-radius: 2rem;
        border-top-right-radius: 2rem;
        transform: translateY(100%);
        transition: 1s ease-in-out;
    }

    .row {
        align-items: flex-end;
        justify-content: flex-end;
    }

    .form,
    .social-list {
        box-shadow: none;
        margin: 0;
        padding: 0;
    }

    .text {
        margin: 0;
    }

    .text p {
        display: none;
    }

    .text h2 {
        margin: .5rem;
        font-size: 2rem;
    }
}
</style>

<!-- <style scoped>
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
.container-fluid {
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
.sign-in-container-fluid {
  position: absolute;
  left: 0;
  width: 50%;
  height: 100%;
  transition: all 0.5s;
}
.sign-up-container-fluid {
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
.container-fluid.right-panel-active .sign-in-container-fluid {
  transform: translateX(100%);
  opacity: 0;
}
.container-fluid.right-panel-active .sign-up-container-fluid {
  transform: translateX(100%);
  opacity: 1;
  z-index: 2;
}
.container-fluid.right-panel-active .overlay-right {
  transform: translateX(-100%);
  opacity: 0;
}
.container-fluid.right-panel-active .overlay-left {
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
</style> -->
<!-- <style>
.login-container-fluid {
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
