import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DiaryEditor() {
  const { userId, id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const isEditMode = !!id;

  useEffect(() => {
    if (isEditMode) {
      const fetchDiary = async () => {
        try {
          const response = await axios.get(`https://crud.tlol.me/${userId}/diaries/${id}`);
          setTitle(response.data.title);
          setContent(response.data.content);
        } catch (error) {
          console.error('Error fetching diary:', error);
        }
      };
      fetchDiary();
    }
  }, [userId, id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const diaryData = { title, content };

    try {
      if (isEditMode) {
        await axios.put(`https://crud.tlol.me/${userId}/diaries/${id}`, diaryData);
      } else {
        await axios.post(`https://crud.tlol.me/${userId}/diaries`, diaryData);
      }
      navigate(`/${userId}/list`);
    } catch (error) {
      console.error('Error saving diary:', error);
    }
  };

  return (
    <div>
      <h1>{isEditMode ? '일기 수정' : '새 일기 작성'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">{isEditMode ? '수정' : '저장'}</button>
      </form>
    </div>
  );
}

export default DiaryEditor;
