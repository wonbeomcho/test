import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function DiaryDetail() {
  const { userId, id } = useParams();
  const [diary, setDiary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const response = await axios.get(`https://crud.tlol.me/${userId}/diaries/${id}`);
        setDiary(response.data);
      } catch (error) {
        console.error('Error fetching diary:', error);
      }
    };

    fetchDiary();
  }, [userId, id]);

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        await axios.delete(`https://crud.tlol.me/${userId}/diaries/${id}`);
        navigate(`/${userId}/list`);
      } catch (error) {
        console.error('Error deleting diary:', error);
      }
    }
  };

  if (!diary) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <h1>{diary.title}</h1>
      <p>{diary.content}</p>
      <Link to={`/${userId}/edit/${id}`}>수정</Link>
      <button onClick={handleDelete}>삭제</button>
      <Link to={`/${userId}/list`}>목록으로</Link>
    </div>
  );
}

export default DiaryDetail;
