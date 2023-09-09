import { Post } from "../../domains/board/mainPost";
import { PostReq } from "../../domains/board/postReq";
import { axiosApi } from "../../utils/axios/axiosApi";
import { AxiosOption, HttpMethod } from "../../utils/axios/axiosOption";

export const savePost = (post : PostReq): Promise<boolean> => {
  return new Promise<boolean> ((resolve) => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData === null) {
      alert('다시 로그인 해주세요');
      return;
    } else {
      const userInfo = JSON.parse(storedUserData);
      const option: AxiosOption = {
        method: HttpMethod.PUT,
        url: `post/savePost`,
        data: {
          userId: userInfo.email,
          postTitle: post.title,
          postType: "N",
          content: post.content,
          contentSum: "1234....",
          regDt: "2018-12-15T10:00:00",
          zoneId: "KOR"
        }
      }
      axiosApi(option)
      .then((response) => {
        if (response?.status === 200) {
          alert("글쓰기 성공!");
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch((error) => {
        alert("에러 ㅜ 로그 확인 ㄱ")
      })
    }
  });
};

export const selectPostList = (): Promise<Post[]> => {
  return new Promise<Post[]>((resolve) => {
    const option: AxiosOption = {
      method: HttpMethod.GET,
      url: `mainPost/findTopPostThumbnailList`
    }
    axiosApi(option)
    .then((response) => {
      const post: Post[] = response?.data as Post[]
      resolve(post);
    })
    .catch((error) => {
      throw error;
    })
  });
};