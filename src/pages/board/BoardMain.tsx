import { useEffect, useState } from 'react';
import { Post } from '../../domains/board/mainPost';
import { selectPostList } from '../../service/board/boardService';
import { useNavigatorContext } from '../../layout/common/NavigatorProvider';

const BoardMain = () => {
  const navigator = useNavigatorContext();
  const [posts, setPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    selectPostList()
    .then((data) => {
      setPosts(data);
    })
    .catch((error) => {
      alert("에러 ㅜ");
      console.log(error);
    });
  }, []);

  function renderList() {
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
      <button onClick={() => moveToPage("/board/write")}>글작성</button>
      {renderList()}
    </>
  );
}

export default BoardMain;
  