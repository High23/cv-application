import { useState } from 'react'
import './App.css'

function App() {
  /* Use state here to update cv preview with the inputted info from inputs 
    pass setState through inputs for the state to update on next render
  */

  const [personalInformation, setpersonalInformation] =  useState({
    fullName: '', email: '', phoneNumber: '', 
    schoolName: '', studyTitle: '', completionDate: '', 
    companyName: '', positionTitle: '', startDate: '', endDate: '', 
    description: ''
  })

  function updateStateObj(property, element) {
    setpersonalInformation({...personalInformation, [[property]]: element.target.value})
  }


  return (
    <main>
      <form action="/">
        <section id='general-information'>
          <h2>Personal Information</h2>
          <Input labelDesc={'full name'} type={'text'} onChange={(element) => { updateStateObj('fullName', element )}} ></Input>
          <Input labelDesc={'email'} type={'email'} onChange={(element) => { updateStateObj('email', element )}} ></Input>
          <Input labelDesc={'phone number'} type={'tel'} onChange={(element) => { updateStateObj('phoneNumber', element )}} ></Input>
        </section>
        <section id='educational-experience'>
          <h2>Education</h2>
          <Input labelDesc={'school name'} type={'text'} onChange={(element) => { updateStateObj('schoolName', element )}} ></Input>
          <Input labelDesc={'title of study'} type={'text'} onChange={(element) => { updateStateObj('studyTitle', element )}} ></Input>
          <Input labelDesc={'study completion date'} type={'datetime-local'} onChange={(element) => { updateStateObj('completionDate', element )}} ></Input>
        </section>
        <section id='practical-experience'>
          <h2>Work Experience</h2>
          <Input labelDesc={'company name'} type={'text'} onChange={(element) => { updateStateObj('companyName', element )}} ></Input>
          <Input labelDesc={'position title'} type={'text'} onChange={(element) => { updateStateObj('positionTitle', element )}} ></Input>
          <Input labelDesc={'start date'} type={'text'} onChange={(element) => { updateStateObj('startDate', element )}} ></Input>
          <Input labelDesc={'end date'} type={'text'} onChange={(element) => { updateStateObj('endDate', element )}} ></Input>
          <TextArea labelDesc={'job description'} onChange={(element) => { updateStateObj('description', element )}} ></TextArea>
        </section>
      </form>
      <section id='cv-preview'>
        <div className='cv-header'>
          <span>{personalInformation.fullName}</span>          
          <span>{personalInformation.email}</span>
          <span>{personalInformation.phoneNumber}</span>
          <img src="src/assets/account-circle.png" alt="" />
        </div>
        <div className='cv-body'>
          <h2>Education</h2>
          <span>{personalInformation.schoolName}</span>
          <span>{personalInformation.studyTitle}</span>
          <span>{personalInformation.completionDate}</span>
        </div>
        <div className='cv-footer'>
          <h2>Work Experience</h2>          
          <span>{personalInformation.companyName}</span>          
          <span>{personalInformation.positionTitle}</span>
          <span>{personalInformation.startDate +  '-' + personalInformation.endDate}</span>
          <span>{personalInformation.description}</span>
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
  return (
    <>
      <label htmlFor={labelDesc}>{labelDesc} </label>
      <textarea id={labelDesc} cols='30' rows='10' onChange={onChange}></textarea>
    </>
  )
}

function capitalize(labelDesc) {
  let firstLetter = labelDesc.charAt(0).toUpperCase()
  const capitalizedWord = firstLetter + labelDesc.slice(1)
  return capitalizedWord
}

export default App
