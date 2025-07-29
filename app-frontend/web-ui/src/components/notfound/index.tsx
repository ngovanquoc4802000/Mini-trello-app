import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center bg-white p-8 md:p-12 rounded-lg shadow-xl max-w-lg w-full">
        <h1 className="text-9xl font-extrabold text-blue-600 mb-4 animate-bounce">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Trang không tìm thấy
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại. Có thể bạn đã gõ sai
          địa chỉ hoặc trang đã bị di chuyển.
        </p>
       <Link to="/boards" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
         Quay về trang chủ
       </Link>
      </div>
    </div>
  );
}

export default NotFound;
