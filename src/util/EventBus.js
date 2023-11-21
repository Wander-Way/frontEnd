import mitt from "mitt";

// Mitt 인스턴스 생성
const emitter = mitt();

// 이벤트 버스 객체 내보내기
export default emitter;
