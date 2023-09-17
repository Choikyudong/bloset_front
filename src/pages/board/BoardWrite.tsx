import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { PostReq } from '../../domains/board/postReq';
import { savePost } from '../../service/board/boardService';
import { useNavigatorContext } from '../../layout/common/NavigatorProvider';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

const BoardWrite: React.FC = () => {
  const navigator = useNavigatorContext();

  const [post, setPost] = useState<PostReq>({
    title: '',
    content: ''
  });
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handlePostChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    setPost({
      ...post,
      [id]: value
    });
  };

  const handlePostBodyChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    const contenctData = convertToRaw(editorState.getCurrentContent())
    console.log(contenctData);
    setPost({
      ...post,
      content: draftToHtml(contenctData)
    })
  };

  const savePostClick = async () => {
    if (post.title === '') {
      alert('글 제목을 입력해주세요!');
      return;
    }
    debugger;
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
        <h5>아래에 글을 적어보세요~~</h5>
        <Editor
          wrapperClassName="wrapper-class"
          editorClassName="editor"
          toolbarClassName="toolbar-class"
          toolbar={{
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: false },
          }} 
          placeholder="내용을 작성해주세요."
          localization={{
            locale: 'ko',
          }}
          editorState={editorState}
          onEditorStateChange={handlePostBodyChange}
        />
      </div>
      <button onClick={savePostClick}>글작성</button>
    </>
  );
}

export default BoardWrite;
