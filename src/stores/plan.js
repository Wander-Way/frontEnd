import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const planStore = defineStore("planStore", () => {
  const selectedPlaces = ref([]);

  // 선택된 여행지 관리
  const addSelectedPlace = (place) => {
    // 현재 날짜의 배열이 없으면 새로운 배열을 생성
    if (
      !selectedPlaces.value.length ||
      selectedPlaces.value[selectedPlaces.value.length - 1].length >= 5
    ) {
      selectedPlaces.value.push([place]);
    } else {
      // 현재 날짜의 배열이 있고 최대 5개 미만이면 해당 배열에 추가
      selectedPlaces.value[selectedPlaces.value.length - 1].push(place);
    }
    console.log("pinia에서 selectedPlaces : ", selectedPlaces.value);
  };

  /**
   * 새로운 plan 저장
   */
  const savePlan = async (location, title, description, tags) => {
    const url = "http://localhost:8080/plan";
    const transformedPlan = transformToPlanFormat(selectedPlaces.value);
    const data = {
      location: {
        name: location.value,
      },
      title: title.value,
      description: description.value,
      tags: tags.value,
      plan: transformedPlan,
    };
    console.log("보내는 데이터 : ", data);
    const resp = await axios.post(url, data);
    console.log(resp.data);

    //저장완료시 비우기
    selectedPlaces.value = [];
  };

  /**
   * 다른사람의 plan데이터 검색
   */
  const findPlan = async (keyword, page) => {
    const url = "http://localhost:8080/find-plan";
    const data = {
      keyword: keyword,
      page: page,
    };
    console.log(data);

    const resp = await axios.post(url, data);
    console.log("findPlan 결과 : ", resp.data);

    return resp.data;
  };

  // 루트배열은 {데이:위치배열} => 위치배열은 [{name,city..},{}]
  // selectedPlacesValue = [{1:[{},{}]},{}]
  const transformToPlanFormat = (selectedPlacesValue) => {
    console.log("selectedPlacesValue", selectedPlacesValue);
    const plan = {};

    selectedPlacesValue.forEach((placesPerDay, index) => {
      const day = index + 1;
      const places = Object.values(placesPerDay);

      const dayData = places.map((place) => {
        return {
          tmapId: place.id,
          name: place.name,
          city: place.lcdName,
          district: place.mcdName,
          town: place.scdName,
          detailAddress: place.bldAddr,
          latitude: place.lat,
          longitude: place.lon,
          noorlat: place.frontLat,
          noorlon: place.frontLon,
        };
      });

      // day를 객체의 키로 사용하여 반환
      plan[day] = dayData;
    });

    return plan;
  };

  return { selectedPlaces, addSelectedPlace, savePlan, findPlan };
});
