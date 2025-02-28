import { useState } from "react";
import "../assets/pages/HomePage.scss";
import {
  FaMagnifyingGlass,
  FaBell,
  FaRegBookmark,
  FaFacebookF,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa6";

export default function HomePage() {
  const [searchInput, setSearchInput] = useState("");
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
      <header>
        <div className="logo-container">
          <div>LOGO</div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search Property"
              className="search-input"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <hr />
            <FaMagnifyingGlass />
          </div>
        </div>
        <div className="profile-container">
          <ul>
            <li>
              <a href="#">Profile</a>
            </li>
            <li>
              <FaBell />
            </li>
            <li className="profile-picture"></li>
          </ul>
        </div>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <div className="filter-container">
            <h2>Filter By</h2>
            <hr />

            <div className="status-container">
              <h4>Status</h4>
              <ul>
                <li>
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
                <li>
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

                <li>
                  <input type="checkbox" id="rumah" />
                  <label htmlFor="rumah">Rumah</label>
                </li>
                <li>
                  <input type="checkbox" id="apartemen" />
                  <label htmlFor="apartemen">Apartemen</label>
                </li>
                <li>
                  <input type="checkbox" id="ruko" />
                  <label htmlFor="ruko">Ruko</label>
                </li>
                <li>
                  <input type="checkbox" id="hotel" />
                  <label htmlFor="hotel">Hotel</label>
                </li>
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
              <div className="card-item">
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
      <footer>
        <div className="footer-details">
          <div className="company-details">
            <h1>LOGO</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In non
              lectus eget massa dictum ornare in sed libero. Sed id varius quam.
              Cras iaculis ac massa et vulputate. Ut varius.
            </p>
          </div>
          <div className="menu-details">
            <div className="menu-details-property">
              <ul>
                <li>
                  <a href="#">Property Category</a>
                </li>
                <li>
                  <a href="#">Testimony</a>
                </li>
                <li>
                  <a href="#">Download App</a>
                </li>
              </ul>
            </div>
            <div className="menu-details-about">
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">News and Events</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
              </ul>
            </div>
            <div className="menu-details-contacts">
              <ul>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">FAQ</a>
                </li>
                <li>
                  <a href="#">Send Feedback</a>
                </li>
                <li>
                  <div className="socials">
                    <p>Socials</p>
                    <div className="socials-icons">
                      <FaFacebookF />
                      <FaLinkedin />
                      <FaTwitter />
                      <FaInstagram />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-icons"></div>
        &copy LOGO 2022
      </footer>
    </div>
  );
}
