import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const planStore = defineStore("planStore", () => {
    const selectedPlaces = ref([]);
  
    // 선택된 여행지 관리
    const addSelectedPlace = (place) => {
      // 현재 날짜의 배열이 없으면 새로운 배열을 생성
      if (!selectedPlaces.value.length || selectedPlaces.value[selectedPlaces.value.length - 1].length >= 5) {
        selectedPlaces.value.push([place]);
      } else {
        // 현재 날짜의 배열이 있고 최대 5개 미만이면 해당 배열에 추가
        selectedPlaces.value[selectedPlaces.value.length - 1].push(place);
      }
      console.log("pinia에서 selectedPlaces : ",selectedPlaces.value);
    };

    /**
     * 새로운 plan 저장
     */
    const savePlan = async(location,title,description,tags) => {
        const url = "http://localhost:8080/plan";
        const transformedPlan = transformToPlanFormat(selectedPlaces.value);
        console.log(transformedPlan);
        const data = {
            "location" : location.value,
            "title" : title.value,
            "description" : description.value,
            "tags" : tags.value,
            "plan" : transformedPlan,
        };
        const resp = await axios.post(url,data);
        
        console.log(resp.data);

        //저장완료시 비우기
        //selectedPlaces.value = [];
    }
        
        
    const transformToPlanFormat = (selectedPlacesValue) => {
        const plan = selectedPlacesValue.map((day, index) => {
            const dayNumber = index + 1;
            const dayData = day.map((place) => {
            // 여기서 필요한 위치 데이터를 추출 또는 가공하여 반환
            return {
                id : place.id,
                name: place.name, //시설물명칭
                frontLat : place.frontLat, //시설물입구 위도
                frontLon : place.frontLon, //시설물입구 경도
                lat : place.lat,
                lon : place.lon,
                address : place.address,
                bldAddr : place.bldAddr,
                bldNo1 : place.bldNo1, //건물번호1
                bldNo2 : place.bldNo2 //건물번호2
            };
            });
        
            // dayNumber를 key로 하는 객체를 생성
            const dayObject = {};
            dayObject[dayNumber.toString()] = dayData;
        
            return dayObject;
        });
    
        return plan;
    };



    return { selectedPlaces, addSelectedPlace, savePlan };
  })