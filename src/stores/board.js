import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";


export const useBoardStore = defineStore("board", () => {

    const selectedOption = ref("");//메인화면에서 지역 선택한 값

    const setSelectedOption = (option) => {
      selectedOption.value = option;
    };
  
    const articles = ref([]); //목록 데이터
    
    const article = ref({}); //상세 데이터

    /**
     * 게시글 목록 조회
     * @param {*} params 
     */
    const getArticles = async (params) => {
        try {
            params.place = selectedOption.value;
            const response = await axios.get("http://localhost:8080/hotplace/board", {
              params: params,
            });
            articles.value = response.data;
          } catch (error) {
            console.error(error);
          }
    };

    /**
     * 게시글 상세 조회
     * @param {*} id 
     */
    const getArticle = async (id) => {
        const { data } = await axios.get(`http://localhost:8080/hotplace/board/${selectedOption.value}/${id}`);
        console.log(`getArticle(${id}) 요청 응답: `, data);
        article.value = data;
    };

    /**
     *  댓글 생성
     * @param {*} id 글 번호
     */
    const createComment = async (commentRequestData) => {
        console.log('createComment 댓글 입력 요청 데이터: ', commentRequestData);
        return await axios.post(`http://localhost:8080/hotplace/board/${article.value.id}/comment`,commentRequestData);
    };

    return {
        articles,
        article,
        selectedOption,
        setSelectedOption,
        getArticles,
        getArticle,
        createComment,
    }
});
