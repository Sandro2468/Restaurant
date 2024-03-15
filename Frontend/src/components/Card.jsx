import { Link, useNavigate } from "react-router-dom";

export default function Card({ menu }) {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    navigate(`/payment/${menu.id}`);
  };

  return (
    <div className="max-w-xs overflow-hidden rounded-lg shadow-lg bg-white">
      <img
        className="w-full h-48 object-cover object-center"
        src={menu.itemImage}
        alt={menu.name}
        onClick={handleMenuClick}
      />
      <div className="px-4 py-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {menu.name}
        </h2>
        <p className="text-gray-600 mb-2">{menu.description}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            {menu.category}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            {menu.availability}
          </span>
          <Link to={`detail/${menu.id}`} className="inline-block">
            <span className="inline-block bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 text-sm font-semibold shadow-md transition-colors duration-300">
              Detail
            </span>
          </Link>
        </div>
        <div className="mt-2">
          <span className="inline-block bg-blue-400 text-white rounded-full px-3 py-1 text-sm font-semibold">
            {menu.price.toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
