import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

/*
여기 싹다 바꿔야 함 임시
*/

export const useMyPageStore = defineStore("mypage", () => {
  const bIsLogin = ref(false);
  const myLoginInfo = ref({
    id: "",
    password: "", //패스워드를 이렇게 보관한다고?
    email: "",
    nickname: "",
    profile: "",
  });

  const myPageMyInfo = ref({});
  const myLikeListInfo = ref({});
  const myRouteListInfo = ref({});

  const requestLogin = async (loginRequestData) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/user/login",
        loginRequestData
      );
      console.log("requestLogin 응답: ", data);
      myLoginInfo.value = data;
      bIsLogin.value = true;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const requestMypage = async () => {
    const params = {
      email: myLoginInfo.value.email,
      password: myLoginInfo.value.password,
    };

    const { data } = await axios.post(
      "http://localhost:8080/user/mypage",
      params
    );
    console.log("requestMypage 응답: ", data);
    myPageMyInfo.value = data;
    return;
  };

  const logout = () => {
    myLoginInfo.value = {};
    bIsLogin.value = false;
    return true;
  };

  ///mypage/planlist
  const requestMyLikeList = async () => {
    const params = {
      email: myLoginInfo.value.email,
      password: myLoginInfo.value.password,
    };

    const { data } = await axios.post(
      "http://localhost:8080/user/mypage/likelist",
      params
    );
    console.log("requestMyLikeList 응답: ", data);
    myLikeListInfo.value = data;
  };

  const requestMyRouteList = async () => {
    const params = {
      email: myLoginInfo.value.email,
      password: myLoginInfo.value.password,
    };

    const { data } = await axios.post(
      "http://localhost:8080/user/mypage/planlist",
      params
    );
    console.log("requestMyRouteList 응답: ", data);
    myRouteListInfo.value = data;
  };

  return {
    bIsLogin,
    myLoginInfo,
    requestLogin,
    logout,
    requestMypage,
    myPageMyInfo,
    requestMyLikeList,
    myLikeListInfo,
    requestMyRouteList,
    myRouteListInfo,
  };
});
