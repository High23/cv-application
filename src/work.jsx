import { useState } from 'react'
import './App.css'
import { formatDate } from './App'

export {Jobs, CvPreviewJobList, handleJobSubmit, updateJobInfoObject, updateWorkExperience, handleJobUpdate}

function Jobs(props) {
    const [currentJobBeingEdited, setCurrentJobBeingEdited] = useState(new Set())
    let jobs = props.workExperience
    let jobBeingEdited = [...currentJobBeingEdited][0]  
        
    return (
        props.toggleJobList ?
        <ul className='job-list'>
        {jobs.map((job) => {
            return ( 
            <li className='job-list-item' key={ job.id }>
                <span>{job.positionTitle}</span>
                <button type='button' onClick={() => {
                    setCurrentJobBeingEdited(new Set([job]));
                    props.setToggleJobList(false)
                }}>edit</button>
                <button type='button' onClick={() => {
                    props.setWorkExperience(jobs.filter((value) => value !== job))
                }
                }>delete</button>
            </li> 
            )
        })}
        </ul> :
        <>
        {props.click('editing', jobBeingEdited.id)}
        <button type='button' onClick={() => {
            setCurrentJobBeingEdited(new Set())
            props.setToggleJobList(true)
        }}>Cancel</button>
        </>
    )
}
  
function CvPreviewJobList(props) {
    let jobs = props.workExperience
    return (
        <>
        {jobs.map((job) => {
            return ( 
            <ul className='job' key={ job.id }>
                <li className='job-tenure'>{job.startDate + ' ' +  '-' + ' ' + job.endDate}</li>
                <li className='position'><b>{job.positionTitle}</b></li>
                <li className='company'><i>{job.companyName}</i></li>
                <li className='description'><div>{job.description}</div></li>
            </ul> 
            )
        })}
        </> 
    )
}

function handleJobSubmit(jobInfo, setJobInfo, workExperience, setWorkExperience, setToggleEducationInputs) {
    if (Object.values(jobInfo).includes('')) return
    if (Array.isArray(workExperience)) {
        setWorkExperience([...workExperience, jobInfo])
    } else {
        setWorkExperience([jobInfo])
    }
    setToggleEducationInputs(true)
    let newId = jobInfo.id + 1
    setJobInfo({id: newId, companyName: '', positionTitle: '', startDate: '', endDate: '', description: '' })
}

function updateJobInfoObject(property, element, jobInfo, setJobInfo) {
    if (property.endsWith('Date')) {
        let date = formatDate(element.target.value)
        setJobInfo({...jobInfo, [[property]]: date })
    } else {
        setJobInfo({...jobInfo, [[property]]: element.target.value})
    }
}

function updateWorkExperience(property, element, updatedJobInfo, setUpdatedJobInfo, id) {
    if (property.endsWith('Date')) {
        let date = formatDate(element.target.value)
        setUpdatedJobInfo({...updatedJobInfo, id: id, [[property]]: date })
    } else {
        setUpdatedJobInfo({...updatedJobInfo, id: id, [[property]]: element.target.value})
    }
}

function handleJobUpdate(updatedJobInfo, setUpdatedJobInfo, workExperience, setWorkExperience, id, setToggleJobList) {
    if (Object.values(updatedJobInfo).includes('')) return
    let workExperienceCopy = workExperience
    let job = null
    workExperienceCopy.forEach((jobObj) => {
        if (jobObj.id === id) {
            job = jobObj
        }
    })
    let index = workExperienceCopy.indexOf(job)
    workExperienceCopy.splice(index, 1, updatedJobInfo)
    setWorkExperience([...workExperienceCopy])
    setUpdatedJobInfo({id: id, companyName: '', positionTitle: '', startDate: '', endDate: '', description: '' })
    setToggleJobList(true)
}