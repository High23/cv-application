import { useState } from 'react'
import './App.css'
import { format, set } from "date-fns";
import {Jobs, CvPreviewJobList, handleJobSubmit, 
  updateJobInfoObject, updateWorkExperience, handleJobUpdate} from './work'

export {formatDate}

function App() {

  const [personalInformation, setpersonalInformation] =  useState({fullName: '', email: '', phoneNumber: ''})

  const [degreeInfo, setDegreeInfo] = useState({id: 0, schoolName: '', studyTitle: '', studyStartDate: '', studyEndDate: '' })
  const [updatedDegreeInfo, setUpdatedDegreeInfo] = useState({schoolName: '', studyTitle: '', studyStartDate: '', studyEndDate: '' })
  const [education, setEducation] = useState('')
  const [toggleEducationInputs, setToggleEducationInputs] = useState(true)
  const [toggleDegreeList, setToggleDegreeList] = useState(true)

  const [jobInfo, setJobInfo] = useState({id: 0, companyName: '', positionTitle: '', startDate: '', endDate: '', description: ''})
  const [updatedJobInfo, setUpdatedJobInfo] = useState({companyName: '', positionTitle: '', startDate: '', endDate: '', description: '' })
  const [workExperience, setWorkExperience] = useState('')
  const [toggleWorkExperienceInputs, setToggleWorkExperienceInputs] = useState(true)
  const [toggleJobList, setToggleJobList] = useState(true)

  function educationInputs(inputsFor, id) {
    let returnedEducationInputsHTML = ''
    if (inputsFor === 'submitting') {
      returnedEducationInputsHTML = <>
        <Input labelDesc={'title of study'} type={'text'} onChange={(element) => { updateDegreeInfoObject('studyTitle', element, degreeInfo, setDegreeInfo  )}} ></Input>
        <Input labelDesc={'school name'} type={'text'} onChange={(element) => { updateDegreeInfoObject('schoolName', element, degreeInfo, setDegreeInfo )}} ></Input>
        <Input labelDesc={'study start date'} type={'date'} onChange={(element) => { updateDegreeInfoObject('studyStartDate', element, degreeInfo, setDegreeInfo  )}} ></Input>
        <Input labelDesc={'study end date'} type={'date'} onChange={(element) => { updateDegreeInfoObject('studyEndDate', element, degreeInfo, setDegreeInfo  )}} ></Input>
        <div className='inputs-buttons'>
          <button type='button' onClick={() => { 
            setToggleEducationInputs(true); 
            setToggleDegreeList(true); 
            setDegreeInfo({...degreeInfo, schoolName: '', studyTitle: '', studyStartDate: '', studyEndDate: '' }) 
            }
          }>Cancel</button>
          <button type='button' onClick={() => { handleDegreeSubmit(degreeInfo, setDegreeInfo, education, setEducation, setToggleEducationInputs) }}>Submit</button>
        </div>
      </>
    } else if (inputsFor === 'editing') {
      returnedEducationInputsHTML = <>
        <Input labelDesc={'title of study'} type={'text'} onChange={(element) => { updateEducation('studyTitle', element, updatedDegreeInfo, setUpdatedDegreeInfo, id )}} ></Input>
        <Input labelDesc={'school name'} type={'text'} onChange={(element) => { updateEducation('schoolName', element, updatedDegreeInfo, setUpdatedDegreeInfo, id )}} ></Input>
        <Input labelDesc={'study start date'} type={'date'} onChange={(element) => { updateEducation('studyStartDate', element, updatedDegreeInfo, setUpdatedDegreeInfo, id )}} ></Input>
        <Input labelDesc={'study end date'} type={'date'} onChange={(element) => { updateEducation('studyEndDate', element, updatedDegreeInfo, setUpdatedDegreeInfo, id )}} ></Input>
        <button type='button' onClick={() => { handleEducationUpdate(updatedDegreeInfo, setUpdatedDegreeInfo, education, setEducation, id, setToggleDegreeList )}}>Save</button>
      </>
    }
    return (
      returnedEducationInputsHTML
    )
  }

  function workInputs(inputsFor, id) {
    let returnedWorkInputsHTML = ''
    if (inputsFor === 'submitting') {
      returnedWorkInputsHTML = <>
        <Input labelDesc={'company name'} type={'text'} onChange={(element) => { updateJobInfoObject('companyName', element, jobInfo, setJobInfo )}} ></Input>
        <Input labelDesc={'position title'} type={'text'} onChange={(element) => { updateJobInfoObject('positionTitle', element, jobInfo, setJobInfo )}} ></Input>
        <Input labelDesc={'start date'} type={'date'} onChange={(element) => { updateJobInfoObject('startDate', element, jobInfo, setJobInfo  )}} ></Input>
        <Input labelDesc={'end date'} type={'date'} onChange={(element) => { updateJobInfoObject('endDate', element, jobInfo, setJobInfo )}} ></Input>
        <TextArea labelDesc={'job description'} onChange={(element) => { updateJobInfoObject('description', element, jobInfo, setJobInfo )}} ></TextArea>
        <div className='inputs-buttons'>
          <button type='button' onClick={() => { 
            setToggleWorkExperienceInputs(true); 
            setToggleJobList(true); 
            setJobInfo({...degreeInfo, schoolName: '', studyTitle: '', studyStartDate: '', studyEndDate: '' }) 
            }
          }>Cancel</button>
          <button type='button' onClick={() => { handleJobSubmit(jobInfo, setJobInfo, workExperience, setWorkExperience, setToggleWorkExperienceInputs) }}>Submit</button>
        </div>
      </>
    } else if (inputsFor === 'editing') {
      returnedWorkInputsHTML = <>
        <Input labelDesc={'company name'} type={'text'} onChange={(element) => { updateWorkExperience('companyName', element, updatedJobInfo, setUpdatedJobInfo, id )}} ></Input>
        <Input labelDesc={'position title'} type={'text'} onChange={(element) => { updateWorkExperience('positionTitle', element, updatedJobInfo, setUpdatedJobInfo, id )}} ></Input>
        <Input labelDesc={'start date'} type={'date'} onChange={(element) => { updateWorkExperience('startDate', element, updatedJobInfo, setUpdatedJobInfo, id  )}} ></Input>
        <Input labelDesc={'end date'} type={'date'} onChange={(element) => { updateWorkExperience('endDate', element, updatedJobInfo, setUpdatedJobInfo, id )}} ></Input>
        <TextArea labelDesc={'job description'} onChange={(element) => { updateWorkExperience('description', element, updatedJobInfo, setUpdatedJobInfo, id )}} ></TextArea>
        <button type='button' onClick={() => { handleJobUpdate(updatedJobInfo, setUpdatedJobInfo, workExperience, setWorkExperience, id, setToggleJobList )}}>Save</button>
      </>
    }
    return (
      returnedWorkInputsHTML
    )
  }


  return (
    <main>
      <form action="/">
        <section id='general-information'>
          <h2>Personal Information</h2>
          <Input labelDesc={'full name'} type={'text'} onChange={(element) => { updateStateObj('fullName', element, personalInformation, setpersonalInformation )}} ></Input>
          <Input labelDesc={'email'} type={'email'} onChange={(element) => { updateStateObj('email', element, personalInformation, setpersonalInformation )}} ></Input>
          <Input labelDesc={'phone number'} type={'tel'} onChange={(element) => { updateStateObj('phoneNumber', element, personalInformation, setpersonalInformation )}} ></Input>
        </section>
        <section id='educational-experience'>
          <h2>Education</h2>

          {( Array.isArray(education) && education.length > 0  ) && 
          <Degrees education={education} setEducation={setEducation} click={educationInputs} toggleEducationInputs={setToggleEducationInputs} 
          toggleDegreeList={toggleDegreeList} setToggleDegreeList={setToggleDegreeList}></Degrees>}

          {(toggleEducationInputs && toggleDegreeList) && 
          <button type='button' onClick={() => setToggleEducationInputs(false)}>Add education study</button>}
          
          {!toggleEducationInputs && educationInputs('submitting')}
        </section>
        <section id='practical-experience'>
          <h2>Work Experience</h2>

          {( Array.isArray(workExperience) && workExperience.length > 0  ) && 
          <Jobs workExperience={workExperience} setWorkExperience={setWorkExperience} click={workInputs} toggleWorkExperienceInputs={setToggleWorkExperienceInputs} 
          toggleJobList={toggleJobList} setToggleJobList={setToggleJobList}></Jobs>}

          {(toggleWorkExperienceInputs && toggleJobList) && 
          <button type='button' onClick={() => setToggleWorkExperienceInputs(false)}>Add a Job</button>}
          
          {!toggleWorkExperienceInputs && workInputs('submitting')}
        </section>
      </form>
      <section id='cv-preview'>
        <div>
          <div className='cv-header'>
            <span>{personalInformation.fullName}</span>
            <span>{personalInformation.email}</span>
            <span>{personalInformation.phoneNumber}</span>
            <img src="src/assets/account-circle.png" alt="" />
          </div>
          <div className='cv-body'>
            <h2>Education</h2>
            {education !== '' && <CvPreviewDegreeList education={education}></CvPreviewDegreeList>}
          </div>
          <div className='cv-footer'>
            <h2>Work Experience</h2>
            {workExperience !== '' && <CvPreviewJobList workExperience={workExperience}></CvPreviewJobList>}
          </div>
        </div>
      </section>
    </main>
  )
}

/* */

function Input({labelDesc, type, onChange}) {
  let desc = labelDesc.split(' ').join('-')
  labelDesc = capitalize(labelDesc)

  return (
    <>
      <label htmlFor={desc}>{labelDesc} </label>
      <input type={type} name={desc} id={desc} onChange={onChange}/>
    </>
  )
}

function TextArea({labelDesc, onChange}) {
  let desc = labelDesc.split(' ').join('-')
  labelDesc = capitalize(labelDesc)

  return (
    <>
      <label htmlFor={desc}>{labelDesc} </label>
      <textarea id={desc} cols='30' rows='10' onChange={onChange}></textarea>
    </>
  )
}

function Degrees(props) {
  const [currentDegreeBeingEdited, setCurrentDegreeBeingEdited] = useState(new Set())
  let degrees = props.education
  let degreeBeingEdited = [...currentDegreeBeingEdited][0]  
   
  return (
    props.toggleDegreeList ?
    <ul className='degree-list'>
      {degrees.map((degree) => {
        return ( 
          <li className='degree-list-item' key={ degree.id }>
            <span>{degree.studyTitle}</span>
            <button type='button' onClick={() => {
                  setCurrentDegreeBeingEdited(new Set([degree]));
                  props.setToggleDegreeList(false)
              }}>edit</button>
            <button type='button' onClick={() => {
                props.setEducation(degrees.filter((value) => value !== degree))
              }
            }>delete</button>
          </li> 
        )
      })}
    </ul> :
    <>
      {props.click('editing', degreeBeingEdited.id)}
      <button type='button' onClick={() => {
        setCurrentDegreeBeingEdited(new Set())
        props.setToggleDegreeList(true)
      }}>Cancel</button>
    </>
  )
}

function CvPreviewDegreeList(props) {
  let degrees = props.education
  return (
    <>
      {degrees.map((degree) => {
        return ( 
          <ul className='cv-preview-degree' key={ degree.id }>
              <li className='cv-preview-study-time'>{degree.studyStartDate} <div>{'-' + ' ' + degree.studyEndDate}</div></li>
              <li className='cv-preview-title'>{degree.studyTitle}</li>
              <li className='cv-preview-school'><i>{degree.schoolName}</i></li>
          </ul> 
        )
      })}
    </> 
  )
}

function handleDegreeSubmit(degreeInfo, setDegreeInfo, education, setEducation, setToggleEducationInputs) {
  if (Object.values(degreeInfo).includes('')) return
  if (Array.isArray(education)) {
    setEducation([...education, degreeInfo])
  } else {
    setEducation([degreeInfo])
  }
  setToggleEducationInputs(true)
  let newId = degreeInfo.id + 1
  setDegreeInfo({id: newId, schoolName: '', studyTitle: '', studyStartDate: '', studyEndDate: '' })
}

function capitalize(labelDesc) {
  let firstLetter = labelDesc.charAt(0).toUpperCase()
  const capitalizedWord = firstLetter + labelDesc.slice(1)
  return capitalizedWord
}

function formatDate(dateString) {
  dateString = format(new Date(dateString), 'MM/yyyy')
  return dateString
}

function updateStateObj(property, element, personalInformation, setpersonalInformation) {
  if (property.endsWith('Date')) {
    let date = formatDate(element.target.value)
    setpersonalInformation({...personalInformation, [[property]]: date })
  } else {
    setpersonalInformation({...personalInformation, [[property]]: element.target.value})
  }
}

function updateDegreeInfoObject(property, element, degreeInfo, setDegreeInfo) {
  if (property.endsWith('Date')) {
    let date = formatDate(element.target.value)
    setDegreeInfo({...degreeInfo, [[property]]: date })
  } else {
    setDegreeInfo({...degreeInfo, [[property]]: element.target.value})
  }
}

function updateEducation(property, element, updatedDegreeInfo, setUpdatedDegreeInfo, id) {
  if (property.endsWith('Date')) {
    let date = formatDate(element.target.value)
    setUpdatedDegreeInfo({...updatedDegreeInfo, id: id, [[property]]: date })
  } else {
    setUpdatedDegreeInfo({...updatedDegreeInfo, id: id, [[property]]: element.target.value})
  }
}

function handleEducationUpdate(updatedDegreeInfo, setUpdatedDegreeInfo, education, setEducation, id, setToggleDegreeList) {
  if (Object.values(updatedDegreeInfo).includes('')) return
  let educationCopy = education
  let degree = null
  educationCopy.forEach((educationObj) => {
    if (educationObj.id === id) {
      degree = educationObj
    }
  })
  let index = educationCopy.indexOf(degree)
  educationCopy.splice(index, 1, updatedDegreeInfo)
  setEducation([...educationCopy])
  setUpdatedDegreeInfo({id: id, schoolName: '', studyTitle: '', studyStartDate: '', studyEndDate: '' })
  setToggleDegreeList(true)
}


export default App
