import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [selectedSection, setSelectedSection] = useState('personal');

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Profile 👨🏽‍💻</h2>
        <ul>
          <li className={selectedSection === 'personal' ? 'active' : ''} onClick={() => setSelectedSection('personal')}>Personal Information</li>
          <li className={selectedSection === 'professional' ? 'active' : ''} onClick={() => setSelectedSection('professional')}>Professional Information</li>
          <li className={selectedSection === 'academy' ? 'active' : ''} onClick={() => setSelectedSection('academy')}>Academy and Work</li>
        </ul>
      </aside>
      <div className="content-container">
        {selectedSection === 'personal' && (
          <div>
            <h1 className="profile-title">
              <img src="path/to/profile-icon.png" alt="Photo" className="profile-icon" />
              Personal Information
            </h1>
            <div className="profile-info">
              <div className="profile-field"><label>First Name:</label><span>John</span></div>
              <div className="profile-field"><label>Last Name:</label><span>Doe</span></div>
              <div className="profile-field"><label>Email:</label><span>john.doe@example.com</span></div>
              <div className="profile-field"><label>Phone Number:</label><span>+1234567890</span></div>
              <div className="profile-field"><label>Address State:</label><span>California</span></div>
              <div className="profile-field"><label>Address Country:</label><span>USA</span></div>
            </div>
          </div>
        )}
        {selectedSection === 'professional' && (
          <div className="profile-container">
            <h1 className="profile-title">Professional Information</h1>
            <div className="profile-info">
              <div className="profile-field">
                <label>CV-PDF:</label>
                <span><a href="path/to/cv.pdf" target="_blank">View CV</a></span>
              </div>
              <div className="profile-field"><label>Hard Skills:</label><span>JavaScript, React, Node.js</span></div>
              <div className="profile-field"><label>Soft Skills:</label><span>Communication, Teamwork, Problem-solving</span></div>
              <div className="profile-field"><label>Languages:</label><span>English, Spanish</span></div>
              <div className="profile-field"><label>Social Media Profiles:</label><span><a href="https://linkedin.com/in/johndoe" target="_blank">LinkedIn</a>, <a href="https://github.com/johndoe" target="_blank">GitHub</a></span></div>
            </div>
          </div>
        )}
        {selectedSection === 'academy' && (
          <div className="profile-container">
            <h1 className="profile-title">Academy and Work</h1>
            <div className="profile-info">
              <div className="profile-field"><label>Degree:</label><span>Bachelor's in Computer Science</span></div>
              <div className="profile-field"><label>University:</label><span>XYZ University</span></div>
              <div className="profile-field"><label>Graduation Year:</label><span>2018</span></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;