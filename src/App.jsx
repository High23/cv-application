import { useState } from 'react'
import './App.css'

function App() {
  return (
    <main>
      <form action="/">
        <section id='general-information'>
          <Input labelDesc={'name'} type={'text'}></Input>
          <Input labelDesc={'email'} type={'email'}></Input>
          <Input labelDesc={'phone number'} type={'tel'}></Input>
        </section>
        <section id='educational-experience'>
          <Input labelDesc={'school name'} type={'text'}></Input>
          <Input labelDesc={'title of study'} type={'text'}></Input>
          <Input labelDesc={'study completion date'} type={'datetime-local'}></Input>
          </section>
        <section id='practical-experience'>
          <Input labelDesc={'company name'} type={'text'}></Input>
          <Input labelDesc={'position title'} type={'text'}></Input>
          <Input labelDesc={'start date'} type={'text'}></Input>
          <Input labelDesc={'end date'} type={'text'}></Input>
          <TextArea labelDesc={'job description'}></TextArea>
        </section>
      </form>
      <section id='cv-preview'>
        <div className='cv-right'></div>
        <div className='cv-left'></div>
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
