import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "/public/assets/pages/HomePage.scss";
import { FaRegBookmark, FaRegClock } from "react-icons/fa6";
import { PiSuitcaseSimpleLight } from "react-icons/pi";
import Footer from "../components/Footer";
import Header from "../components/Header";

import {
  fetchDataStart,
  fetchDataSuccess,
  fetchDataFailure,
} from "../actions/dataActions";

export default function HomePage() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    status: "",
    location: [],
    type: [],
    minPrice: "",
    maxPrice: "",
  });

  const [sortOption, setSortOption] = useState("relevance");
  const { items } = useSelector((state) => state.data);

  const fetchData = async () => {
    dispatch(fetchDataStart());

    try {
      const response = await fetch(
        "https://testcandidate.linkedinindonesia.com/api/properties",
        {
          method: "GET",
          headers: {
            Authorization: "TOKEN_KEY", // required
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log(data);
      dispatch(fetchDataSuccess(data));
    } catch (err) {
      dispatch(fetchDataFailure(err.message));
    }
  };

  const city = ["bekasi", "jakarta", "bandung", "bogor"];
  const type = ["rumah", "apartemen", "ruko", "hotel"];

  useEffect(() => {
    fetchData();
  }, [dispatch]);

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
      <main className="homepage-container">
        <form onSubmit={handleSubmit}>
          <div className="filter-container">
            <h2>Filter By</h2>

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

            <button type="submit" className="submit">
              Apply
            </button>
            <button type="button" className="reset" onClick={handleReset}>
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
            {items.length === 0 ? (
              <div className="not-found-container">
                <PiSuitcaseSimpleLight size={50} />
                <p>Sorry there's no result related to "(keyword)".</p>
                <p>We'll keep updating and take notes of your interest.</p>
                <button>See other properties</button>
              </div>
            ) : (
              items.map((item) => (
                <div className="card-item" key={item}>
                  <div className="card-profile">
                    <img className="card-image" src={item.image_url} />
                    <div className="card-title">
                      <h4>{item.name.slice(0, 15) + "..."}</h4>
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
                    <div className="building-specs">
                      <p>
                        LT {item.land_area} m<sup>2</sup>{" "}
                      </p>
                      <p>
                        LB {item.building_area} m<sup>2</sup>{" "}
                      </p>
                    </div>
                    <p>{calculateTime(item.created_at)}</p>
                    <FaRegClock />
                  </div>
                  <button>Book</button>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
