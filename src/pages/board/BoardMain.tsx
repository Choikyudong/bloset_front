import { useEffect, useState } from 'react';
import { LoginProps, Post } from '../../domains/board/mainPost';
import { selectPostList } from '../../service/board/boardService';
import { useNavigatorContext } from '../../layout/common/NavigatorProvider';

const BoardMain: React.FC<LoginProps> = ({ isLogin }) => {
  const navigator = useNavigatorContext();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loginStatus, setLoginStatus] = useState<boolean>(isLogin);
  
  useEffect(() => {
    selectPostList()
    .then((data) => {
      setPosts(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  function renderList() {
    if (posts === undefined || posts === null) {
      navigator('/error');
      return;
    }
    if (posts.length === 0) {
      return (
        <>
          <h1>게시글이 없어요~~</h1>
        </>
      );
    }
    return posts.map((item, index) => (
      <div key={index}>
        <h2>{item.title}</h2>
        <p>작성일: {item.regDt}</p>
        <p>작성자: {item.userId}</p>
      </div>
    ));
  }

  function moveToPage(url:string) {
    if (url === null || url === undefined) {
      alert('에러');
    } else {
      navigator(url);
    }
  }

  return (
    <>
      <h1>메인페이지</h1>
      {
        isLogin ? <button onClick={() => moveToPage("/board/write")}>글작성</button>
        : <></>
      }
      {renderList()}
    </>
  );
}

export default BoardMain;
  