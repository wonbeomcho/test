import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
	const [userId, setUserId] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (userId.trim()) {
			navigate(`/${userId}/list`);
		}
	};

	return (
		<div>
			<h1>일기 서비스</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
					placeholder="사용자 ID를 입력하세요"
				/>
				<button type="submit">일기장으로 이동 </button>
			</form>
		</div>
	);
}

export default Home;
