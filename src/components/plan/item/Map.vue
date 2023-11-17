<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
const searchKeyword = ref("대전 갈마동 카페");
const map = ref(null);
const marker = ref(null);
const markerArr = ref([]);
const labelArr = ref([]);
const resultpoisData = ref([]);
const detailInfo = ref([]);
onMounted(() => {
  initTmap();
});

// 1. 지도 띄우기
const initTmap = () => {
  map.value = new Tmapv2.Map("map_div", {
    center: new Tmapv2.LatLng(37.5652045, 126.98702028),
    width: "75%",
    height: "400px",
    zoom: 17,
    zoomControl: true,
    scrollwheel: true,
  });
};

//검색하기 : 2. POI 통합 검색 API 요청
const getMapResult = async () => {
  const url =
    "https://apis.openapi.sk.com/tmap/pois?version=1&format=json&callback=result";
  const resp = await axios.get(url, {
    headers: {
      appKey: import.meta.env.VITE_T_MAP_SERVICE_KEY,
    },
    params: {
      // 요청 데이터 정보
      searchKeyword: searchKeyword.value, // 검색 키워드
      resCoordType: "EPSG3857", // 요청 좌표계
      reqCoordType: "WGS84GEO", // 응답 좌표계
      count: 10, // 가져올 갯수
    },
  });
  console.log("받아온 정보 : ", resp.data);
  resultpoisData.value = resp.data.searchPoiInfo.pois.poi;
  // 2. 기존 마커, 팝업 제거
  if (markerArr.value.length > 0) {
    for (var i in markerArr.value) {
      markerArr.value[i].setMap(null);
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
  for (const key in resultpoisData.value) {
    const data = resultpoisData.value[key];
    console.log(data.id);

    let url =
      "https://apis.openapi.sk.com/tmap/pois/" +
      data.id + // 상세보기를 누른 아이템의 POI ID
      "?version=1&resCoordType=EPSG3857&format=json&callback=result";
    const resp = await axios.get(url, {
      headers: { appKey: import.meta.env.VITE_T_MAP_SERVICE_KEY },
    });
    console.log("받아온 상세정보 : ", typeof resp.data.poiDetailInfo);
    detailInfo.value.push(resp.data.poiDetailInfo);
  }

  // 응답받은 POI 정보 저장
  console.log("정답 !!", detailInfo.value);
  console.log("아니여야돼", resultpoisData);
};
</script>

<template>
  <!-- <div ref="tmap"></div> -->
  <div>
    <div class="search-container">
      <input type="text" class="text_custom" v-model="searchKeyword" />
      <button id="btn_select" @click="getMapResult">적용하기</button>
    </div>
    <div>
      <!--검색결과 영역 시작-->
      <div class="map-container">
        <!-- 맵 여깄어용-->
        <div id="map_div" class="map_wrap"></div>
        <!-- 상세정보 여깄어용-->

        <div class="cards-container">
          <div v-for="place in detailInfo" class="card">
            <div class="card-content">
              <div>name : {{ place.name }}</div>
              <div>Addr : {{ place.bldAddr }}</div>
              <div>tel : {{ place.tel }}</div>
              <div>info : {{ place.desc }}</div>
            </div>
          </div>
        </div>
      </div>
      <!--검색결과 영역 끝-->
    </div>
  </div>
</template>

<style scoped>
.map-container {
  display: flex;
  position: relative;
}
.map_wrap {
  flex: 1;
  width: 100%; /* 혹시 모를 경우 100%로 설정 */
  height: 400px; /* 맵의 높이 설정 */
  /* 추가적인 스타일링이 필요한 경우 여기에 추가하세요. */
}

.card {
  flex: 0 0 auto;
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 10px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  transition: transform 0.2s;
  width: 30%;
}

.card:hover {
  transform: translateY(-5px);
}

.card-content {
  /* 추가적인 스타일링이 필요한 경우 여기에 추가하세요. */
}
.cards-container {
  display: flex;
  overflow-x: auto; /* 카드가 넘칠 경우 스크롤 표시 */
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px; /* 여백 설정 */
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
