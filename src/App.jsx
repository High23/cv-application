import { useState } from 'react'
import './App.css'
import { format } from "date-fns";

function App() {
  /* Use state here to update cv preview with the inputted info from inputs 
    pass setState through inputs for the state to update on next render
  */

  const [personalInformation, setpersonalInformation] =  useState({
    fullName: '', email: '', phoneNumber: '', 
    companyName: '', positionTitle: '', startDate: '', endDate: '', 
    description: ''
  })

  const [studyInfo, setStudyInfo] = useState({id: 0, schoolName: '', studyTitle: '', studyStartDate: '', studyEndDate: '' })
  const [education, setEducation] = useState('')
  const [toggleEducationInputs, setToggleEducationInputs] = useState(false)
  // const [workExperience, setWorkExperience] = useState([])

  const EducationInputs = <>
    <Input labelDesc={'title of study'} type={'text'} onChange={(element) => { updateEducationObj('studyTitle', element, studyInfo, setStudyInfo  )}} ></Input>
    <Input labelDesc={'school name'} type={'text'} onChange={(element) => { updateEducationObj('schoolName', element, studyInfo, setStudyInfo )}} ></Input>
    <Input labelDesc={'study start date'} type={'date'} onChange={(element) => { updateEducationObj('studyStartDate', element, studyInfo, setStudyInfo  )}} ></Input>
    <Input labelDesc={'study end date'} type={'date'} onChange={(element) => { updateEducationObj('studyEndDate', element, studyInfo, setStudyInfo  )}} ></Input>
    <button type='button' onClick={() => { handleEductionSubmit(studyInfo, setStudyInfo, education, setEducation, setToggleEducationInputs) }}>Submit</button>
  </>


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
          {( Array.isArray(education) && education.length > 0  ) && <Degrees education={education}></Degrees>}
          {toggleEducationInputs ? <button type='button' onClick={() => {setToggleEducationInputs(false)}}>Add education study</button> : EducationInputs}
        </section>
        <section id='practical-experience'>
          <h2>Work Experience</h2>
          <Input labelDesc={'company name'} type={'text'} onChange={(element) => { updateStateObj('companyName', element, personalInformation, setpersonalInformation  )}} ></Input>
          <Input labelDesc={'position title'} type={'text'} onChange={(element) => { updateStateObj('positionTitle', element, personalInformation, setpersonalInformation  )}} ></Input>
          <Input labelDesc={'start date'} type={'date'} onChange={(element) => { updateStateObj('startDate', element, personalInformation, setpersonalInformation  )}} ></Input>
          <Input labelDesc={'end date'} type={'date'} onChange={(element) => { updateStateObj('endDate', element, personalInformation, setpersonalInformation  )}} ></Input>
          <TextArea labelDesc={'job description'} onChange={(element) => { updateStateObj('description', element, personalInformation, setpersonalInformation  )}} ></TextArea>
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
            <ul className='study'>
              <li className='study-time'>{studyInfo.studyStartDate + ' ' +  '-' + ' ' + studyInfo.studyEndDate}</li>
              <li className='title'>{studyInfo.studyTitle}</li>
              <li className='school'><i>{studyInfo.schoolName}</i></li>
            </ul>
          </div>
          <div className='cv-footer'>
            <h2>Work Experience</h2>
            <ul className='job'>
              <li className='job-tenure'>{personalInformation.startDate + ' ' +  '-' + ' ' + personalInformation.endDate}</li>
              <li className='position'><b>{personalInformation.positionTitle}</b></li>
              <li className='company'><i>{personalInformation.companyName}</i></li>
              <li className='description'><div>{personalInformation.description}</div></li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

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

function Degrees(education) {
  let degrees = education.education
  return (
    <>
      {degrees.map((degree) => {
        return (
        <div key={degree.id}>
          {degree.studyTitle}
          <button type='button'>edit</button>
          <button type='button'>delete</button>
        </div>
        )
      })}
    </>
  )
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

function updateEducationObj(property, element, studyInfo, setStudyInfo) {
  if (property.endsWith('Date')) {
    let date = formatDate(element.target.value)
    setStudyInfo({...studyInfo, [[property]]: date })
  } else {
    setStudyInfo({...studyInfo, [[property]]: element.target.value})
  }
  // console.log(studyInfo)
}

function handleEductionSubmit(studyInfo, setStudyInfo, education, setEducation, setToggleEducationInputs) {
  if (Object.values(studyInfo).includes('')) return
  if (Array.isArray(education)) {
    setEducation([...education, studyInfo])
  } else {
    setEducation([studyInfo])
  }
  setToggleEducationInputs(true)
  let newId = studyInfo.id + 1
  setStudyInfo({id: newId, schoolName: '', studyTitle: '', studyStartDate: '', studyEndDate: '' })
  // console.log(education)
}




export default App
