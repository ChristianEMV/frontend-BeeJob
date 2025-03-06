import React, { useState } from 'react';
import swal from 'sweetalert';
import './Profile.css';
import { Icon } from "@iconify/react";
import { Tooltip } from "@mui/material";
import { MarginRounded } from '@mui/icons-material';
import Modal from '../Modal/Modal';
import { text } from 'stream/consumers';



const Profile:React.FC = () => {
  //Modal New Education
  const[isModalOpen_NewE, setIsModalOpen_NewE]=useState(false)
  const openModal_NewE =() => setIsModalOpen_NewE(true)
  const closeModal_NewE =() => setIsModalOpen_NewE(false)
  //Modal New Job
  const[isModalOpen_NewJ, setIsModalOpen_NewJ]=useState(false)
  const openModal_NewJ =() => setIsModalOpen_NewJ(true)
  const closeModal_NewJ =() => setIsModalOpen_NewJ(false)
  //Modal Edit Education
  const[isModalOpen_EditE, setIsModalOpen_EditE]=useState(false)
  const openModal_EditE =() => setIsModalOpen_EditE(true)
  const closeModal_EditE =() => setIsModalOpen_EditE(false)
  //Modal Edit Job
  const[isModalOpen_EditJ, setIsModalOpen_EditJ]=useState(false)
  const openModal_EditJ =() => setIsModalOpen_EditJ(true)
  const closeModal_EditJ =() => setIsModalOpen_EditJ(false)

  const [selectedSection, setSelectedSection] = useState('personal');
  //general Editing
  const [isEditing, setIsEditing] = useState(false);
  //perfil info
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  //profesional info
  const [isEditingPI, setIsEditingPI] = useState(false);
  const [isSavingPI, setIsSavingPI] = useState(false);
 
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
    degree: "Engenier",
    Institution_Name: 'XYZ University',
    Major:"Bachelor's in Computer Science",
    From: '22-04-2018',
    To: '22-04-2025',
    Description:"Diseño, desarrollo, integración y optimización de sistemas complejos, combinando hardware, software, redes y procesos",
    Location:"Avenida Lazaro Cardenas Bario 23, lomas de Santo Tomas"
  });

  const [workExperiences, setWorkExperiences] = useState([
    { company: 'TechCorp', position: 'Software Engineer', years: '2018-2021' },
    { company: 'InnovateX', position: 'Frontend Developer', years: '2021-Present' },
  ]);

  const handleEdit = (section: string) => {
    setIsEditing(!isEditing);
    if (isEditing) {
      if (section === 'personal') {
        if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email || !personalInfo.phoneNumber || !personalInfo.addressState || !personalInfo.addressCountry) {
          swal("Error", "All personal information fields must be filled out", "error");
          return;
        }
      } else if (section === 'professional') {
        if (!professionalInfo.cvLink || !professionalInfo.hardSkills || !professionalInfo.softSkills || !professionalInfo.languages || !professionalInfo.socialMedia) {
          swal("Error", "All professional information fields must be filled out", "error");
          return;
        }
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
               {isSavingProfile? <button title='Save' onClick={() =>  {swal("Saved", "Professional Information", "success"); setIsEditingProfile(false); setIsSavingProfile(false)  } }> Save</button>:<button title='Editar' onClick={() => { setIsEditingProfile(true) ; setIsSavingProfile(true) }}> <Icon icon="cil:pencil" /> Editar</button> }
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
                { isEditingPI? <input type="text" value={professionalInfo.hardSkills} onChange={(e) => setProfessionalInfo({ ...professionalInfo, hardSkills: e.target.value })} readOnly  />:<span>{professionalInfo.hardSkills}</span> }
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
                { isEditingPI? <input type="text" value={professionalInfo.socialMedia} onChange={(e) => setProfessionalInfo({ ...professionalInfo, socialMedia: e.target.value })} readOnly  />:<span>{professionalInfo.socialMedia.split(', ').map((link, index) => (
                  <a key={index} href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                ))}</span>  }
              </div>
              <section>
               {isSavingPI? <button title='Save' onClick={() =>  {swal("Saved", "Profrssional Information :)", "success"); setIsEditingPI(false); setIsSavingPI(false)  } }> Save</button>:<button title='Editar' onClick={() => { setIsEditingPI(true) ; setIsSavingPI(true) }}> <Icon icon="cil:pencil" /> Editar</button> }
              </section>
            </div>
          </div>
        )}
                
        {selectedSection === 'academy' && (
          <div>
            <h1 className="profile-title">Academy and Work Information</h1>

            <div className="sub-section">
            <h2>Educational Information
            <button onClick={openModal_NewE} className='buttonNewInfo' title='Add new Educational Info' > <Icon icon="gg:add" /></button> 
            </h2> 
          
            <section style={{width: '50%', height: '60%'}}>
              
            <Modal isOpen={isModalOpen_NewE}  onClose={closeModal_NewE} X={40} Y={60} >
                <h2>Add Educational information</h2>
                <form action="">
                  <label className="GModalInput" >
                    Institution Name
                    <input className="ModalInput" type="text" name="name" />
                  </label>
                  <label className="GModalInput" >
                    Major
                    <input className="ModalInput" type="text" name="name" />
                  </label>
                  <label className="GModalInput" >
                    Degree
                    <input className="ModalInput" type="text" name="name" />
                  </label>
                  <label className="GModalInput" >
                    Address Location
                    <input className="ModalInput" type="text" name="name" />
                  </label>
                  
                  <label className="GModalInput"  >
                  Description: 
                  <br />
                  <textarea
                  id="description"
                  placeholder="Escribe una descripción..."
                  rows={5}
                  cols={40}
                  />
                  </label>
                  
                  <div  style={{  display:'flex',float: 'right',  gap: '10px'}}>
                    <div style={{  flex:'1', padding: '10px', alignContent:'center'}}>
                      <label className="GModalInput"  >
                            From:<input  type="date"   name="initialDate" style={{padding: '10px'  }} className="ModalInput"  />
                      </label>
                    </div>
                    <div style={{ padding: '10px', alignItems:'center' }}>
                      <label className="GModalInput"  >
                          To:<input   type="date"  name="finalDate" style={{padding: '10px'}} className="ModalInput" />
                      </label>
                    </div>
                  </div >
                  
                    <div style={{ position: 'absolute',bottom: '0',right: '0px',padding: '10px',}}>
                  <button onClick={()=>{setIsModalOpen_NewE(false)}} className='buttonModal' title='Cancel'>Close</button>
                  <button onClick={()=>{swal("Saved", "Educational Information :)", "success")}} className='buttonModal' title='Save'>Save</button>
                  </div>
                  </form>
            </Modal>
            <Modal isOpen={isModalOpen_EditE}  onClose={closeModal_NewE} X={40} Y={60} >
                <h2>Add Educational information</h2>
                <form action="">
                  <label className="GModalInput" >
                    Institution Name
                    <input className="ModalInput" value={academyInfo.Institution_Name} type="text" name="name" />
                  </label>
                  <label className="GModalInput" >
                    Major
                    <input className="ModalInput" value={academyInfo.Major }  type="text" name="name" />
                  </label>
                  <label className="GModalInput" >
                    Degree
                    <input className="ModalInput" value={academyInfo.degree}  type="text" name="name" />
                  </label>
                  <label className="GModalInput" >
                    Address Location
                    <input className="ModalInput" value={academyInfo.Location }  type="text" name="name" />
                  </label>
                  
                  <label className="GModalInput"  >
                  Description: 
                  <br />
                  <textarea
                  id="description"
                  value={academyInfo.Description} 
                  rows={5}
                  cols={40}
                  />
                  </label>
                  
                  <div  style={{  display:'flex',float: 'right',  gap: '10px'}}>
                    <div style={{  flex:'1', padding: '10px', alignContent:'center'}}>
                      <label className="GModalInput"  >
                            From:<input  type="date"   name="initialDate" style={{padding: '10px'  }} className="ModalInput"  />
                      </label>
                    </div>
                    <div style={{ padding: '10px', alignItems:'center' }}>
                      <label className="GModalInput"  >
                          To:<input   type="date"  name="finalDate" style={{padding: '10px'}} className="ModalInput" />
                      </label>
                    </div>
                  </div >
                  
                    <div style={{ position: 'absolute',bottom: '0',right: '0px',padding: '10px',}}>
                  <button onClick={()=>{setIsModalOpen_NewE(false)}} className='buttonModal' title='Cancel'>Close</button>
                  <button onClick={()=>{swal("Saved", "Educational Information :)", "success")}} className='buttonModal' title='Save'>Save</button>
                  </div>
                  </form>
            </Modal>
              </section>

            
            

              <section className="work-entry">
                <div className="profile-field">
                <label>Degree:</label>
                <span>{academyInfo.degree}</span>
                </div>
                <div className="profile-field">
                  <label>University:</label>
                  <span>{academyInfo.Institution_Name}</span>
                </div>
                <button onClick={openModal_EditE} className='buttonNewInfo' title='Edit Educational Info.' > <Icon icon="cil:pencil" />  Editar</button> 
             </section>

            </div>

            {/* Work */}
            <div className="sub-section">
              <h2>Work Experiences
              <button onClick={openModal_NewJ} className='buttonNewInfo' title='Add new Work Experience' > <Icon icon="gg:add" /></button> 
            </h2> 

              <section className='ModalSize'>
              <Modal isOpen={isModalOpen_NewJ}  onClose={closeModal_NewJ } X={30} Y={40} >
                <h2>Add Job Experience</h2>
                <form action="">
                  <label className="GModalInput"   >
                    Title
                    <input className="ModalInput" type="text" name="name" />
                  </label >
                  <label className="GModalInput">
                    Company
                    <input className="ModalInput" type="text" name="name" />
                  </label>
                    <label className="GModalInput">
                  Description: 
                  <br />
                  <textarea className="ModalInput"
                  id="description"
                  placeholder="Escribe una descripción..."
                  rows={5}
                  cols={40}
                  />
                  </label >
                  
                  <div  style={{  display:'flex',float: 'right',  gap: '10px'}}>
                    <div style={{  flex:'1', padding: '10px', alignContent:'center'}}>
                      <label className="GModalInput"  >
                            From:<input  type="date"   name="initialDate" style={{padding: '10px'  }} className="ModalInput"  />
                      </label>
                    </div>
                    <div style={{ padding: '10px', alignItems:'center' }}>
                      <label className="GModalInput"  >
                          To:<input   type="date"  name="finalDate" style={{padding: '10px'}} className="ModalInput" />
                      </label>
                    </div>
                  </div >

                    <div style={{ position: 'absolute',bottom: '0',right: '0px',padding: '10px',}}>
                  <button onClick={()=>{setIsModalOpen_NewJ(false)}} className='buttonModal' title='Cancel'>Close</button>
                  <button onClick={()=>{swal("Saved", "Educational Information :)", "success")}} className='buttonModal' title='Save'>Save</button>
                  </div>
                  
                </form>
              </Modal>
              <Modal  isOpen={isModalOpen_EditJ}  onClose={closeModal_EditJ} X={40} Y={40} >
                  <h2>Edit Experience</h2>
                  <form action="">
                  
                      <label className="GModalInput"  >
                          Title
                          <input className="ModalInput"  type="text" name="name" value={"cx"} />
                        </label>
                        <label className="GModalInput" >
                          Company
                          <input className="ModalInput"  type="text" name="name" value={"cx"} />
                        </label >
                        <label className="GModalInput"  >
                        Description: 
                        <br />
                        <textarea className="ModalInput"  id="description" value={"cx"} rows={5} cols={40}/>
                        </label>
                        <div  style={{  display:'flex',float: 'right',  gap: '10px'}}>
                          <div style={{  flex:'1', padding: '10px', alignContent:'center'}}>
                          <label className="GModalInput"  >
                            From:<input  type="date"   name="initialDate" style={{padding: '10px'  }} className="ModalInput"  />
                          </label>
                          </div>
                          <div style={{ padding: '10px', alignItems:'center' }}>
                          <label className="GModalInput"  >
                            To:<input   type="date"  name="finalDate" style={{padding: '10px'}} className="ModalInput" />
                          </label>
                          </div>
                          
                        </div >
                      
                  
                  
                <div style={{ position: 'absolute',bottom: '0',right: '0px',padding: '10px',}}>
                  <button onClick={()=>{setIsModalOpen_EditJ(false)}} className='buttonModal' title='Cancel'>Close</button>
                  <button onClick={()=>{swal("Actualizado", "Educational Information:)", "success")}} className='buttonModal' title='Save'>Save</button>
                </div>
              </form>
              </Modal>
              
              </section>

              {workExperiences.map((work, index) => (
                <div key={index} className="work-entry">
                  <strong>{work.company}</strong> - {work.position} ({work.years})
                  <button onClick={openModal_EditJ } className='buttonNewInfo' title='Edit my Woerk Experience' > <Icon icon="cil:pencil" />  Edit</button> 
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


