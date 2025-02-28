import { useState } from "react";
import "/public/assets/pages/HomePage.scss";
import { FaRegBookmark } from "react-icons/fa6";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function HomePage() {
  const [formData, setFormData] = useState({
    status: "",
    location: [],
    type: [],
    minPrice: "",
    maxPrice: "",
  });
  const [sortOption, setSortOption] = useState("relevance");

  const city = ["bekasi", "jakarta", "bandung", "bogor"];
  const type = ["rumah", "apartemen", "ruko", "hotel"];
  const dummy = [
    {
      type: "rumah",
      status: "second",
      name: "Rumah Minimalis Dekat dengan Tol Bekasi Timur",
      description:
        "Disewakan Rumah Minimalis Dekat dengan Tol Bekasi Timur, 3 Kamar Tidur, 1 Kamar Mandi, Luas Tanah 6x12, Ruang Tamu, Ruang Makan, Dapur, Garasi.",
      address: "Perum Nusa INdah Jl. Mawar 189 RT 02/07, Tambun Utara",
      price: "15000000.00",
      building_area: 60,
      land_area: 72,
      image: "image/p21zRkrMIbBu718udeAjUMO84L0cVLhiFrlYZQp0.jpg",
      updated_at: "2025-02-28T08:42:45.000000Z",
      created_at: "2025-02-28T08:42:45.000000Z",
      id: 3,
      image_url:
        "https://testcandidate.linkedinindonesia.com/storage/image/p21zRkrMIbBu718udeAjUMO84L0cVLhiFrlYZQp0.jpg",
    },
  ];

  const handleStatusChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      status: e.target.id,
    }));
  };

  const handleLocationChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      location: checked
        ? [...prevData.location, id]
        : prevData.location.filter((item) => item !== id),
    }));
  };

  const handleTypeChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      type: checked
        ? [...prevData.type, id]
        : prevData.type.filter((item) => item !== id),
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Filters Applied :", formData);
  };

  const handleReset = (e) => {
    setFormData({
      status: "",
      location: [],
      type: [],
      minPrice: "",
      maxPrice: "",
    });
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortOption(selectedSort);
  };

  const calculateTime = (createdAtUTC) => {
    const now = new Date();
    const createdAt = new Date(createdAtUTC);
    const diffInSeconds = Math.floor((now - createdAt) / 1000);

    if (diffInSeconds < 3600) {
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      return `${diffInMinutes}m`;
    } else if (diffInSeconds < 86400) {
      const diffInHours = Math.floor(diffInSeconds / 3600);
      return `${diffInHours}h`;
    } else if (diffInSeconds < 2592000) {
      const diffInDays = Math.floor(diffInSeconds / 86400);
      return `${diffInDays}d`;
    } else if (diffInSeconds < 31536000) {
      const diffInMonths = Math.floor(diffInSeconds / 2592000);
      return `${diffInMonths}mo`;
    } else {
      const diffInYears = Math.floor(diffInSeconds / 31536000);
      return `${diffInYears}y`;
    }
  };

  return (
    <div className="main-container">
      <Header />
      <main>
        <form onSubmit={handleSubmit}>
          <div className="filter-container">
            <h2>Filter By</h2>
            <hr />

            <div className="status-container">
              <h4>Status</h4>
              <ul>
                <li key="new">
                  <input
                    type="radio"
                    id="new"
                    name="status"
                    className="custom-radio"
                    checked={formData.status === "new"}
                    onChange={handleStatusChange}
                  />
                  <label htmlFor="new">New</label>
                </li>
                <li key="second">
                  <input
                    type="radio"
                    id="second"
                    name="status"
                    className="custom-radio"
                    checked={formData.status === "second"}
                    onChange={handleStatusChange}
                  />
                  <label htmlFor="second">Second</label>
                </li>
              </ul>
            </div>

            <div className="location-container">
              <h4>Location</h4>
              <ul>
                {city.map((loc) => (
                  <li key={loc}>
                    <input
                      type="checkbox"
                      id={loc}
                      checked={formData.location.includes(loc)}
                      onChange={handleLocationChange}
                    />
                    <label htmlFor={loc}>
                      {loc.charAt(0).toUpperCase() + loc.slice(1)}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="type-container">
              <h4>Type</h4>
              <ul>
                {type.map((variant) => (
                  <li key={variant}>
                    <input
                      type="checkbox"
                      id={variant}
                      checked={formData.type.includes(variant)}
                      onChange={handleTypeChange}
                    />
                    <label htmlFor={variant}>
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="price-container">
              <h4>Price Range</h4>
              <div className="price-input">
                <input
                  type="text"
                  name="min"
                  id="min"
                  placeholder="Min"
                  value={formData.minPrice}
                  onChange={handlePriceChange}
                />
                <hr />
                <input
                  type="text"
                  name="max"
                  id="max"
                  placeholder="Max"
                  value={formData.maxPrice}
                  onChange={handlePriceChange}
                />
              </div>
            </div>

            <button type="submit">Apply</button>
            <button type="button" onClick={handleReset}>
              Reset Filter
            </button>
          </div>
        </form>

        <div className="property-container">
          <div className="sort-bar">
            <label htmlFor="sort">Sort By : </label>
            <select
              name="sort"
              id="sort"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="relevance">Most Relevant</option>
              <option value="to-highest">Price : Low to High</option>
              <option value="to-lowest">Price : High to Low</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <div className="card-container">
            {dummy.map((item) => (
              <div className="card-item" key={item}>
                <div className="card-profile">
                  <img className="card-image" src={item.image_url} />
                  <div className="card-title">
                    <h4>{item.name.slice(0, 20) + "..."}</h4>
                    <p>Bekasi</p>
                  </div>
                  <div className="card-bookmark">
                    <FaRegBookmark />
                  </div>
                </div>
                <div className="card-tags">
                  <p>{item.type}</p>
                  <p>{item.status}</p>
                  <p>IDR {item.price / 1000000}M</p>
                </div>
                <div className="card-specs">
                  <p>
                    LT {item.land_area} m<sup>2</sup>{" "}
                  </p>
                  <p>
                    LB {item.building_area} m<sup>2</sup>{" "}
                  </p>
                  <p>{calculateTime(item.created_at)}</p>
                </div>
                <button>Book</button>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
