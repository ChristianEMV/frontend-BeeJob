import React, { useState } from 'react';
import swal from 'sweetalert';
import './Profile.css';

const Profile = () => {
  const [selectedSection, setSelectedSection] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    addressState: 'California',
    addressCountry: 'USA',
  });
  const [professionalInfo, setProfessionalInfo] = useState({
    cvLink: 'path/to/cv.pdf',
    hardSkills: 'JavaScript, React, Node.js',
    softSkills: 'Communication, Teamwork, Problem-solving',
    languages: 'English, Spanish',
    socialMedia: 'https://linkedin.com/in/johndoe, https://github.com/johndoe',
  });
  const [academyInfo, setAcademyInfo] = useState({
    degree: "Bachelor's in Computer Science",
    university: 'XYZ University',
    graduationYear: '2018',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Add validation logic here
    if (selectedSection === 'personal') {
      if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email || !personalInfo.phoneNumber || !personalInfo.addressState || !personalInfo.addressCountry) {
        swal('Error', 'All fields are required.', 'error');
        return;
      }
      // Add more specific validation if needed
    } else if (selectedSection === 'professional') {
      if (!professionalInfo.cvLink || !professionalInfo.hardSkills || !professionalInfo.softSkills || !professionalInfo.languages || !professionalInfo.socialMedia) {
        swal('Error', 'All fields are required.', 'error');
        return;
      }
      // Add more specific validation if needed
    } else if (selectedSection === 'academy') {
      if (!academyInfo.degree || !academyInfo.university || !academyInfo.graduationYear) {
        swal('Error', 'All fields are required.', 'error');
        return;
      }
      // Add more specific validation if needed
    }
    setIsEditing(false);
    swal('Success', 'Information saved successfully.', 'success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (selectedSection === 'personal') {
      setPersonalInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    } else if (selectedSection === 'professional') {
      setProfessionalInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    } else if (selectedSection === 'academy') {
      setAcademyInfo((prevInfo) => ({
        ...prevInfo,
        [name]: value,
      }));
    }
  };

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
              <div className="profile-field">
                <label>First Name:</label>
                {isEditing ? (
                  <input type="text" name="firstName" value={personalInfo.firstName} onChange={handleChange} />
                ) : (
                  <span>{personalInfo.firstName}</span>
                )}
              </div>
              <div className="profile-field">
                <label>Last Name:</label>
                {isEditing ? (
                  <input type="text" name="lastName" value={personalInfo.lastName} onChange={handleChange} />
                ) : (
                  <span>{personalInfo.lastName}</span>
                )}
              </div>
              <div className="profile-field">
                <label>Email:</label>
                {isEditing ? (
                  <input type="email" name="email" value={personalInfo.email} onChange={handleChange} />
                ) : (
                  <span>{personalInfo.email}</span>
                )}
              </div>
              <div className="profile-field">
                <label>Phone Number:</label>
                {isEditing ? (
                  <input type="tel" name="phoneNumber" value={personalInfo.phoneNumber} onChange={handleChange} />
                ) : (
                  <span>{personalInfo.phoneNumber}</span>
                )}
              </div>
              <div className="profile-field">
                <label>Address State:</label>
                {isEditing ? (
                  <input type="text" name="addressState" value={personalInfo.addressState} onChange={handleChange} />
                ) : (
                  <span>{personalInfo.addressState}</span>
                )}
              </div>
              <div className="profile-field">
                <label>Address Country:</label>
                {isEditing ? (
                  <input type="text" name="addressCountry" value={personalInfo.addressCountry} onChange={handleChange} />
                ) : (
                  <span>{personalInfo.addressCountry}</span>
                )}
              </div>
            </div>
            {isEditing ? (
              <button onClick={handleSaveClick}>Save</button>
            ) : (
              <button onClick={handleEditClick}>Edit fields</button>
            )}
          </div>
        )}
        {selectedSection === 'professional' && (
          <div>
            <h1 className="profile-title">Professional Information</h1>
            <div className="profile-info">
              <div className="profile-field">
                <label>CV-PDF:</label>
                {isEditing ? (
                  <input type="text" name="cvLink" value={professionalInfo.cvLink} onChange={handleChange} />
                ) : (
                  <span><a href={professionalInfo.cvLink} target="_blank" rel="noopener noreferrer">View CV</a></span>
                )}
              </div>
              <div className="profile-field">
                <label>Hard Skills:</label>
                {isEditing ? (
                  <input type="text" name="hardSkills" value={professionalInfo.hardSkills} onChange={handleChange} />
                ) : (
                  <span>{professionalInfo.hardSkills}</span>
                )}
              </div>
              <div className="profile-field">
                <label>Soft Skills:</label>
                {isEditing ? (
                  <input type="text" name="softSkills" value={professionalInfo.softSkills} onChange={handleChange} />
                ) : (
                  <span>{professionalInfo.softSkills}</span>
                )}
              </div>
              <div className="profile-field">
                <label>Languages:</label>
                {isEditing ? (
                  <input type="text" name="languages" value={professionalInfo.languages} onChange={handleChange} />
                ) : (
                  <span>{professionalInfo.languages}</span>
                )}
              </div>
              <div className="profile-field">
                <label>Social Media Profiles:</label>
                {isEditing ? (
                  <input type="text" name="socialMedia" value={professionalInfo.socialMedia} onChange={handleChange} />
                ) : (
                  <span>{professionalInfo.socialMedia.split(', ').map((link, index) => (
                    <a key={index} href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                  ))}</span>
                )}
              </div>
            </div>
            {isEditing ? (
              <button onClick={handleSaveClick}>Save</button>
            ) : (
              <button onClick={handleEditClick}>Edit fields</button>
            )}
          </div>
        )}
        {selectedSection === 'academy' && (
          <div>
            <h1 className="profile-title">Academy and Work</h1>
            <div className="profile-info">
              <div className="profile-field">
                <label>Degree:</label>
                {isEditing ? (
                  <input type="text" name="degree" value={academyInfo.degree} onChange={handleChange} />
                ) : (
                  <span>{academyInfo.degree}</span>
                )}
              </div>
              <div className="profile-field">
                <label>University:</label>
                {isEditing ? (
                  <input type="text" name="university" value={academyInfo.university} onChange={handleChange} />
                ) : (
                  <span>{academyInfo.university}</span>
                )}
              </div>
              <div className="profile-field">
                <label>Graduation Year:</label>
                {isEditing ? (
                  <input type="text" name="graduationYear" value={academyInfo.graduationYear} onChange={handleChange} />
                ) : (
                  <span>{academyInfo.graduationYear}</span>
                )}
              </div>
            </div>
            {isEditing ? (
              <button onClick={handleSaveClick}>Save</button>
            ) : (
              <button onClick={handleEditClick}>Edit fields</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;