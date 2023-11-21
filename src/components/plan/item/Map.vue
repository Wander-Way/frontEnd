<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { planStore } from "@/stores/plan";
import EventBus from "@/util/EventBus";

const searchKeyword = ref("");
const map = ref(null);
const marker = ref(null);
const markerArr = ref([]);
const labelArr = ref([]);
const resultpoisData = ref([]);
const detailInfo = ref([]);

//pinia로관리
const store = planStore();

//클릭이벤트
const addSelectedPlace = (place) => {
  store.addSelectedPlace(place);
};

onMounted(() => {
  initTmap();
});

// 1. 지도 띄우기
const initTmap = () => {
  map.value = new Tmapv2.Map("map_div", {
    center: new Tmapv2.LatLng(37.5652045, 126.98702028),
    width: "100%",
    height: "400px",
    zoom: 17,
    zoomControl: true,
    scrollwheel: true,
  });
};

//맵 화면에 마커 띄우기만 하기!
const markToMap = (plans) => {
  console.log("다음 루트의 마커를 띄워보겠습니다 : ", plans);

  // 2. 기존 마커, 팝업 제거
  if (markerArr.value.length > 0) {
    for (let marker of markerArr.value) {
      marker.setMap(null);
    }
    markerArr.value = [];
  }
  if (labelArr.value.length > 0) {
    for (var i in labelArr.value) {
      labelArr.value[i].setMap(null);
    }
    labelArr.value = [];
  }

  const positionBounds = new Tmapv2.LatLngBounds();
  // 3. POI 마커 표시
  for (let plan of plans) {
    // POI 마커 정보 저장
    const noorLat = Number(plan.noorlat);
    const noorLon = Number(plan.noorlon);
    const name = plan.name;

    // 좌표 객체 생성
    const pointCng = new Tmapv2.Point(noorlon, noorlat);

    // EPSG3857좌표계를 WGS84GEO좌표계로 변환
    const projectionCng = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
      pointCng
    );

    const lat = projectionCng._lat;
    const lon = projectionCng._lng;

    // 좌표 설정
    const markerPosition = new Tmapv2.LatLng(lat, lon);

    // Marker 설정
    marker.value = new Tmapv2.Marker({
      position: markerPosition, // 마커가 표시될 좌표
      //icon : "/upload/tmap/marker/pin_b_m_a.png",
      icon: "/img/marker.png", // 아이콘 등록
      iconSize: new Tmapv2.Size(24, 24), // 아이콘 크기 설정
      title: name, // 마커 타이틀
      map: map.value, // 마커가 등록될 지도 객체
    });

    // 마커들을 담을 배열에 마커 저장
    markerArr.value.push(marker.value);
    positionBounds.extend(markerPosition); // LatLngBounds의 객체 확장
  }
  map.value.panToBounds(positionBounds); // 확장된 bounds의 중심으로 이동시키기
  map.value.zoomOut();
};

//검색하기 : 2. POI 통합 검색 API 요청
const getMapResult = async (cnt, keywords) => {
  const url =
    "https://apis.openapi.sk.com/tmap/pois?version=1&format=json&callback=result";

  if (typeof keywords === "string") {
    const resp = await axios.get(url, {
      headers: {
        appKey: import.meta.env.VITE_T_MAP_SERVICE_KEY,
      },
      params: {
        // 요청 데이터 정보
        searchKeyword: keywords, // 검색 키워드
        resCoordType: "EPSG3857", // 요청 좌표계
        reqCoordType: "WGS84GEO", // 응답 좌표계
        count: cnt, // 가져올 갯수
      },
    });
    resultpoisData.value = resp.data.searchPoiInfo.pois.poi;
  } else {
    console.log("GPT로 검색하기");
    resultpoisData.value = [];
    for (let keyword of keywords) {
      //동기 방식
      const resp = await axios.get(url, {
        headers: {
          appKey: import.meta.env.VITE_T_MAP_SERVICE_KEY,
        },
        params: {
          // 요청 데이터 정보
          searchKeyword: keyword, // 검색 키워드
          resCoordType: "EPSG3857", // 요청 좌표계
          reqCoordType: "WGS84GEO", // 응답 좌표계
          count: cnt, // 가져올 갯수
        },
      });
      console.log(resp.data, resp.data == null, resp.data == "");
      if (resp.data == null || resp.data == "") continue;
      resultpoisData.value.push(resp.data.searchPoiInfo.pois.poi[0]);
    }
  }
  // 2. 기존 마커, 팝업 제거
  if (markerArr.value.length > 0) {
    for (let marker of markerArr.value) {
      marker.setMap(null);
    }
    markerArr.value = [];
  }
  if (labelArr.value.length > 0) {
    for (var i in labelArr.value) {
      labelArr.value[i].setMap(null);
    }
    labelArr.value = [];
  }

  const positionBounds = new Tmapv2.LatLngBounds();
  // 3. POI 마커 표시
  for (let k in resultpoisData.value) {
    // POI 마커 정보 저장
    const noorLat = Number(resultpoisData.value[k].noorLat);
    const noorLon = Number(resultpoisData.value[k].noorLon);
    const name = resultpoisData.value[k].name;

    // 좌표 객체 생성
    const pointCng = new Tmapv2.Point(noorLon, noorLat);

    // EPSG3857좌표계를 WGS84GEO좌표계로 변환
    const projectionCng = new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(
      pointCng
    );

    const lat = projectionCng._lat;
    const lon = projectionCng._lng;

    // 좌표 설정
    const markerPosition = new Tmapv2.LatLng(lat, lon);

    // Marker 설정
    marker.value = new Tmapv2.Marker({
      position: markerPosition, // 마커가 표시될 좌표
      //icon : "/upload/tmap/marker/pin_b_m_a.png",
      icon: "/img/marker.png", // 아이콘 등록
      iconSize: new Tmapv2.Size(24, 24), // 아이콘 크기 설정
      title: name, // 마커 타이틀
      map: map.value, // 마커가 등록될 지도 객체
    });

    // 마커들을 담을 배열에 마커 저장
    markerArr.value.push(marker.value);
    positionBounds.extend(markerPosition); // LatLngBounds의 객체 확장
  }
  map.value.panToBounds(positionBounds); // 확장된 bounds의 중심으로 이동시키기
  map.value.zoomOut();

  getInfoPlace();
};

//상세보기 : 4. POI 상세 정보 API
const getInfoPlace = async () => {
  detailInfo.value = []; //초기화
  for (const pois of resultpoisData.value) {
    let url =
      "https://apis.openapi.sk.com/tmap/pois/" +
      pois.id + // 상세보기를 누른 아이템의 POI ID
      "?version=1&resCoordType=EPSG3857&format=json&callback=result";
    const { data } = await axios.get(url, {
      headers: { appKey: import.meta.env.VITE_T_MAP_SERVICE_KEY },
    });
    detailInfo.value.push(data.poiDetailInfo);
  }
};

EventBus.on("setMap", (locations) => {
  console.log("setMap 이벤트 수신 : ", locations);

  getMapResult(1, locations);
});

EventBus.on("setMapByAnotherRoute", (plans) => {
  console.log("setMapByAnotherRoute 이벤트 수신, plans : ", plans);
  markToMap(plans);
});
</script>

<template>
  <section class="main-container">
    <!-- 왼쪽섹션 : 검색창, 지도, 검색결과-->
    <div class="left-section">
      <div class="map-container">
        <div class="search-container">
          <input type="text" class="text_custom" v-model="searchKeyword" />
          <button id="btn_select" @click="getMapResult(10, searchKeyword)">
            적용하기
          </button>
        </div>

        <!-- 맵 -->
        <div id="map_div" class="map_wrap"></div>

        <!-- 카드 그룹 -->
        <div class="cards-container">
          <div v-for="place in detailInfo" class="card">
            <div class="card-content">
              <div>name: {{ place.name }}</div>
              <div>Addr: {{ place.bldAddr }}</div>
              <div>tel: {{ place.tel }}</div>
              <button @click="addSelectedPlace(place)">[+]</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.main-container {
  display: flex;
  justify-content: space-between;
}
.left-section {
  width: 100%; /* 왼쪽 섹션의 너비를 조절 */
}

.right-section {
  width: 30%; /* 오른쪽 섹션의 너비를 조절 */
}
.map-container {
  display: flex;
  flex-direction: column;
}

.map_wrap {
  height: 400px; /* 맵의 높이 설정 */
}

.cards-container {
  display: flex;
  width: 100%;
  overflow-x: auto; /* 카드가 넘칠 경우 스크롤 표시 */
  white-space: nowrap; /* 가로 스크롤을 위한 줄 바꿈 방지 */
}

.card {
  margin-right: 10px; /* 카드 간 간격 설정 */
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.2s;
  max-width: 300px;
}

.card:last-child {
  margin-right: 0; /* 마지막 카드는 간격을 없애기 위해 설정 */
}

.card:hover {
  transform: translateY(-5px);
}

.card-content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-container {
  display: flex;
  margin-bottom: 20px;
}

.text_custom {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
}

#btn_select {
  padding: 10px;
  background-color: #6f74b4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#btn_select:hover {
  background-color: #45a049;
}
</style>
