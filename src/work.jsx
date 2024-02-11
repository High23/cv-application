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
                <div className="edit-and-delete-buttons">
                    <button aria-label='edit degree' className='edit' type='button' onClick={() => {
                        setCurrentJobBeingEdited(new Set([job]));
                        props.setToggleJobList(false)
                    }}></button>
                    <button aria-label='delete degree' className='delete' type='button' onClick={() => {
                        props.setWorkExperience(jobs.filter((value) => value !== job))
                    }
                    }></button>
                </div>
            </li> 
            )
        })}
        </ul> :
        <>
        {props.click('editing', jobBeingEdited.id, setCurrentJobBeingEdited)}
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
                <li className='job-tenure'>{job.startDate} <div>{'-'  + job.endDate}</div></li>
                <li className='position'><b>{job.positionTitle}</b></li>
                <li className='company'><i>{job.companyName}</i></li>
                {job.description !== '' && <li className='description'><div>{job.description}</div></li>}
            </ul> 
            )
        })}
        </> 
    )
}

function handleJobSubmit(jobInfo, setJobInfo, workExperience, setWorkExperience, setToggleEducationInputs) {
    let requiredFields = Object.keys(jobInfo).filter((property) => property !== 'description')
    for (let i = 0; i < requiredFields.length; i++) {
        let prop = requiredFields[i]
        if (jobInfo[[prop]] !== '') {
            continue;
        } else {
            return
        }
    }
    if (requiredFields.includes('')) requiredFields
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

function updateWorkExperience(property, element, updatedJobInfo, setUpdatedJobInfo) {
    if (property.endsWith('Date')) {
        let date = formatDate(element.target.value)
        setUpdatedJobInfo({...updatedJobInfo, [[property]]: date })
    } else {
        setUpdatedJobInfo({...updatedJobInfo, [[property]]: element.target.value})
    }
}

function handleJobUpdate(updatedJobInfo, setUpdatedJobInfo, workExperience, setWorkExperience, id, setToggleJobList) {
    let propertiesWithValues = Object.keys(updatedJobInfo).filter((value) => updatedJobInfo[[value]] !== '' )
    if (propertiesWithValues.length === 0) return
    let workExperienceCopy = workExperience
    let job = null
    workExperienceCopy.forEach((jobObj) => {
        if (jobObj.id === id) {
            job = jobObj
        }
    })
    let index = workExperienceCopy.indexOf(job)
    propertiesWithValues.forEach((property) => {
        job = {...job, [[property]]: updatedJobInfo[[property]]}
    })
    workExperienceCopy.splice(index, 1, job)
    setWorkExperience([...workExperienceCopy])
    setUpdatedJobInfo({companyName: '', positionTitle: '', startDate: '', endDate: '', description: '' })
    setToggleJobList(true)
}