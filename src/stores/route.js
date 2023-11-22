import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const routeStore = defineStore("routeStore", () => {

    //최신 3개 데이터 가져오기
    const getRecentRoute = async () => {
        const url = "http://localhost:8080/route";
        const resp = await axios.get(url);
        console.log("getRecentRoute 결과 : ", resp.data);

        return resp.data;
      };

    //상세조회
    const getRouteDetail = async (id) => {
        const url = `http://localhost:8080/route/${id}`;
        const resp = await axios.get(url);
        console.log("getRouteDetail 결과 : ", resp.data);

        return resp.data;
      };

    //좋아요
    const like = async(id) => {
        const url = `http://localhost:8080/route/${id}/like`;
        const resp = await axios.post(url);
        console.log("like 결과 : ", resp.data);
        return resp.data;
    }

    const disLike = async(id) => {
        const url = `http://localhost:8080/route/${id}/like`;
        const resp = await axios.delete(url);
        console.log("disLike 결과 : ", resp.data);
        return resp.data;
    }

    const searchRoute = async(allKeywords, page) => {
        const url = `http://localhost:8080/route`;
        const data = {
            "page" : page,
            "tags":[],
            "periods":[]
        }
          // allKeywords 배열을 돌면서 태그와 기간을 분류
        allKeywords.forEach(keyword => {
            if (keyword.type === 'tag') {
            data.tags.push(keyword.text);
            } else if (keyword.type === 'period') {
            data.periods.push(keyword.text);
            }
        });
        console.log("전송 body : ",data);

        const resp = await axios.post(url,data);
        console.log("searchRoute 결과 : ", resp.data);
        return resp.data;
    }

      
  return { getRecentRoute, getRouteDetail, like, disLike, searchRoute };
});
