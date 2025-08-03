import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function DiaryList() {
  const { userId } = useParams();
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const response = await axios.get(`https://crud.tlol.me/${userId}/diaries`);
        setDiaries(response.data.data);
      } catch (error) {
        console.error('Error fetching diaries:', error);
      }
    };

    fetchDiaries();
  }, [userId]);

  return (
    <div>
      <h1>{userId}님의 일기 목록</h1>
      <Link to={`/${userId}/new`}>새 일기 작성</Link>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <Link to={`/${userId}/diary/${diary.id}`}>{diary.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiaryList;
