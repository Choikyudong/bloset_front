export interface Post {
  postId: string;
  userId: string;
  title: string;
  contentSum: string;
  thumbnailImg: string;
  regDt: string;
}

export interface LoginProps {
  isLogin : boolean;
}

export interface ChangeMyInfo {
  nickName : string;
  password : string;
}