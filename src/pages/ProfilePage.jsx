import "/public/assets/pages/ProfilePage.scss";

import { FaRegEdit } from "react-icons/fa";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function ProfilePage() {
  return (
    <div className="container">
      <Header />
      <main>
        <div className="banner">
          {/* <img src="/public/assets/banner.jpeg" alt="Cover" /> */}

          <button>
            <FaRegEdit />
          </button>
        </div>
        <div className="profile-details">
          <div className="profile-picture">
            <img src="/public/assets/profile.webp" alt="Profile" />
          </div>
          <div className="user-information">
            <div className="user-details">
              <h2>Amanda Christine</h2>
              <p>South Jakarta, DKI Jakarta, Indonesia</p>
              <button>Button</button>
            </div>
            <div className="user-actions">
              <button>Button</button>
              <button>Button</button>
              <button>Button</button>
            </div>
          </div>
        </div>
        <div className="profile-activities">
          <div className="profile-user">
            <div className="profile-status">
              <div className="menu">
                <h3>Profile Status</h3>
                <div className="menu-btn"></div>
              </div>
              <p>Intermediate</p>
              <p>Complete 2 steps to achieve Expert!</p>
              <div className="progress-bar">70%</div>
              <div className="question-box">
                <h4>Which industry do you work in ?</h4>
                <p>Members who add an industry receive up to 2.5 times as many as profile views.</p>
                <button>Button</button>
              </div>
              <div className="question-box">
                <h4>Which university do you go to ?</h4>
                <p>Members who add an university receive up to 2.5 times as many as profile views.</p>
                <button>Button</button>
              </div>
            </div>
            <div className="profile-about">
              <div className="menu">
                <h3>About</h3>
                <FaRegEdit />
              </div>
            </div>
            <div className="profile-properties"></div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
