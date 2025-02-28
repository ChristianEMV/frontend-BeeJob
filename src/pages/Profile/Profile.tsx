import React, { useState } from 'react';
import swal from 'sweetalert';
import './Profile.css';
//Run-> npm install --save-dev @iconify/react
import { Icon } from "@iconify/react"

const Profile = () => {
  const [selectedSection, setSelectedSection] = useState('personal');

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  //perfil info
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  //profesional info
  const [isEditingPI, setIsEditingPI] = useState(false);
  const [isSavingPI, setIsSavingPI] = useState(false);
  //Education and Job Information -> EJI
  const [isEditingEJI, setIsEditingEJI] = useState(false);
  const [isSavingEJI, setIsSavingEJT] = useState(false);
  //job ex

  const [personalInfo, setPersonalInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1234567890',
    addressState: 'California',
    addressCountry: 'USA',
    profilePicture: 'path/to/profile-picture.jpg'
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

  const [workExperiences, setWorkExperiences] = useState([
    { company: 'TechCorp', position: 'Software Engineer', years: '2018-2021' },
    { company: 'InnovateX', position: 'Frontend Developer', years: '2021-Present' },
  ]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Validate fields
      if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email || !personalInfo.phoneNumber || !personalInfo.addressState || !personalInfo.addressCountry) {
        swal("Error", "All personal information fields must be filled out", "error");
        return;
      }
      if (!professionalInfo.cvLink || !professionalInfo.hardSkills || !professionalInfo.softSkills || !professionalInfo.languages || !professionalInfo.socialMedia) {
        swal("Error", "All professional information fields must be filled out", "error");
        return;
      }
      swal("Success", "Information updated successfully", "success");
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
          <h1 className="profile-title">Personal Information</h1>
          <div className="profile-info">
            <div className="profile-field profile-picture">
              <img src={personalInfo.profilePicture} alt="Profile" className="profile-icon" />
            </div>
            <div className="profile-field">
              <label>First Name:</label>
              {isEditingProfile ? <input type="text" value={personalInfo.firstName} onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })} readOnly  /> : <span>{personalInfo.firstName}</span>}
            </div>
            <div className="profile-field">
              <label>Last Name:</label>
              {isEditingProfile ? <input type="text" value={personalInfo.lastName} onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })} /> : <span>{personalInfo.lastName}</span>}
            </div>
            <div className="profile-field">
              <label>Email:</label>
              {isEditingProfile ? <input type="email" value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} /> : <span>{personalInfo.email}</span>}
            </div>
            <div className="profile-field">
              <label>Phone Number:</label>
              {isEditingProfile ? <input type="tel" value={personalInfo.phoneNumber} onChange={(e) => setPersonalInfo({ ...personalInfo, phoneNumber: e.target.value })} /> : <span>{personalInfo.phoneNumber}</span>}
              </div>
              <div className="profile-field">
                <label>Address State:</label>
                {isEditingProfile ? <input type="text" value={personalInfo.addressState} onChange={(e) => setPersonalInfo({ ...personalInfo, addressState: e.target.value })} /> : <span>{personalInfo.addressState}</span>}
              </div>
              <div className="profile-field">
                <label>Address Country:</label>
                {isEditingProfile ? <input type="text" value={personalInfo.addressCountry} onChange={(e) => setPersonalInfo({ ...personalInfo, addressCountry: e.target.value })} /> : <span>{personalInfo.addressCountry}</span>}
              </div>
              <section>
               {isSavingProfile? <button title='Guardar' aria-label="notification" onClick={() =>  {alert("Toi guardanding"); setIsEditingProfile(false); setIsSavingProfile(false)  } }> <Icon icon="bi:save" /> Guardar</button>:<button title='Editar'  aria-label="notification" onClick={() => { setIsEditingProfile(true) ; setIsSavingProfile(true) }}> <Icon icon="cil:pencil" /> Editar</button> }
               </section>
            </div>
          </div>
        )}

{selectedSection === 'professional' && (
          <div>
            <h1 className="profile-title">Professional Information</h1>
            <div className="profile-info">
              <div className="profile-field">
                <label>CV-PDF:</label>
                { isEditingPI? <input type="text" value={professionalInfo.cvLink} onChange={(e) => setProfessionalInfo({ ...professionalInfo, cvLink: e.target.value })} readOnly  />: <span><a href={professionalInfo.cvLink} target="_blank">View CV</a></span> }
              </div>
              <div className="profile-field">
                <label>Hard Skills:</label>
                { isEditingPI? <input type="text" value={professionalInfo.hardSkills} onChange={(e) => setProfessionalInfo({ ...professionalInfo, hardSkills: e.target.value })} readOnly  /> :<span>{professionalInfo.hardSkills}</span> }
              </div>
              <div className="profile-field">
                <label>Soft Skills:</label>
                { isEditingPI? <input type="text" value={professionalInfo.softSkills} onChange={(e) => setProfessionalInfo({ ...professionalInfo, softSkills: e.target.value })} readOnly  />:<span>{professionalInfo.softSkills}</span> }
              </div>
              <div className="profile-field">
                <label>Languages:</label>
                { isEditingPI? <input type="text" value={professionalInfo.languages} onChange={(e) => setProfessionalInfo({ ...professionalInfo, languages: e.target.value })} readOnly  />:<span>{professionalInfo.languages}</span> }
              </div>
              <div className="profile-field">
                <label>Social Media Profiles:</label>
                { isEditingPI? 
                <input type="text" value={professionalInfo.socialMedia} onChange={(e) => setProfessionalInfo({ ...professionalInfo, socialMedia: e.target.value })} readOnly  />:

                <span>{professionalInfo.socialMedia.split(', ').map((link, index) => (
                  <a key={index} href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                ))}</span>  }



              </div>
              <section>
               {isSavingPI? <button title='Save' aria-label="notification" onClick={() =>  {alert("Toi guardanding PI Personal_Information"); setIsEditingPI(false); setIsSavingPI(false)  } }> <Icon icon="bi:save" /> Guardar </button>:<button title='Editar' aria-label="notification" onClick={() => { setIsEditingPI(true) ; setIsSavingPI(true) }}> <Icon icon="cil:pencil" /> Editar</button> }
              </section>
            </div>
          </div>
        )}
        
        {selectedSection === 'academy' && (
          <div>
            <h1 className="profile-title">Academy and Work Information</h1>
             
            <div className="sub-section">
              <h2>Educational Information <button title='Add' onClick={() => {  }}> <Icon icon="gg:add" /> Add new </button>  </h2>
              
              <div className="profile-field">
                <label>Degree:</label>
                <span>{academyInfo.degree}</span>
              </div>
              <div className="profile-field">
                <label>University:</label>
                <span>{academyInfo.university}</span>
              </div>
              <section>
              <button title='Editar' onClick={() => { }}> <Icon icon="cil:pencil" /> Editar</button>
              </section>
            </div>

            <div className="sub-section">
              <h2>Work Experiences</h2>
              {workExperiences.map((work, index) => (
                <div key={index} className="work-entry">
                  <strong>{work.company}</strong> - {work.position} ({work.years})
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
