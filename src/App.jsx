import { useState } from 'react'
import './App.css'

function App() {
  /* Use state here to update cv preview with the inputted info from inputs 
    pass setState through inputs for the state to update on next render
  */
  return (
    <main>
      <form action="/">
        <section id='general-information'>
          <h2>Personal Information</h2>
          <Input labelDesc={'name'} type={'text'}></Input>
          <Input labelDesc={'email'} type={'email'}></Input>
          <Input labelDesc={'phone number'} type={'tel'}></Input>
        </section>
        <section id='educational-experience'>
          <h2>Education</h2>
          <Input labelDesc={'school name'} type={'text'}></Input>
          <Input labelDesc={'title of study'} type={'text'}></Input>
          <Input labelDesc={'study completion date'} type={'datetime-local'}></Input>
        </section>
        <section id='practical-experience'>
          <h2>Work Experience</h2>
          <Input labelDesc={'company name'} type={'text'}></Input>
          <Input labelDesc={'position title'} type={'text'}></Input>
          <Input labelDesc={'start date'} type={'text'}></Input>
          <Input labelDesc={'end date'} type={'text'}></Input>
          <TextArea labelDesc={'job description'}></TextArea>
        </section>
      </form>
      <section id='cv-preview'>
        <div className='cv-header'>
          <div>
            <span>Name</span>
          </div>
          <div>
            <span>Email</span>
          </div>
          <div>
            <span>Phone Number</span>
          </div>
          <img src="" alt="" />
        </div>
        <div className='cv-body'>
          <h2>Education</h2>
          <div>
            <span>School Name</span>
          </div>
          <div>
            <span>Title of Study</span>
          </div>
          <div>
            <span>Completion Date</span>
          </div>
        </div>
        <div className='cv-footer'>
          <h2>Work Experience</h2>
          <div>
            <span>Company Name</span>
          </div>
          <div>
            <span>Position Title</span>
          </div>
          <div>
            <span>Start date - End date</span>
          </div>
          <div>
            <span>Description</span>
          </div>
        </div>
      </section>
    </main>
  )
}

function Input({labelDesc, type}) {
  let desc = labelDesc.split(' ').join('-')
  labelDesc = capitalize(labelDesc)

  return (
    <>
      <label htmlFor={desc}>{labelDesc + ':'} </label>
      <input type={type} id={desc}/>
    </>
  )
}

function TextArea({labelDesc}) {
  return (
    <>
      <label htmlFor={labelDesc}>{labelDesc} </label>
      <textarea id={labelDesc} cols='30' rows='10' ></textarea>
    </>
  )
}

function capitalize(labelDesc) {
  let firstLetter = labelDesc.charAt(0).toUpperCase()
  const capitalizedWord = firstLetter + labelDesc.slice(1)
  return capitalizedWord
}

export default App
