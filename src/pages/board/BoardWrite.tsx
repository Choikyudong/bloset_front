import React, { ChangeEvent, useState } from 'react';
// import { savePost } from '../../service/board/boardService';
import { PostReq } from '../../domains/board/postReq';
import { savePost } from '../../service/board/boardService';
import { useNavigatorContext } from '../../layout/common/NavigatorProvider';

const BoardWrite: React.FC = () => {
  const navigator = useNavigatorContext();

  const [post, setPost] = useState<PostReq>({
    title: '',
    content: ''
  });

  const handlePostChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setPost({
      ...post,
      [id]: value
    });
  };

  const savePostClick = async () => {
    const isSuccess = await savePost(post);
    if (isSuccess) {
      alert('작성 성공');
      navigator('/board/');
    }
  };

  return (
    <>
      <h1>글쓰기</h1>
      <div>
        <strong>제목 </strong>
        <input 
          id='title' 
          type='text'
          value={post.title}
          onChange={handlePostChange}
        />
      </div>
      <div>
        <strong>본문</strong>
        <textarea
          id="content"
          value={post.content}
          onChange={handlePostChange}
        ></textarea>
      </div>
      <button onClick={savePostClick}>글작성</button>
    </>
  );
}

export default BoardWrite;
