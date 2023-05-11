import { useState } from 'react'
import moment from 'moment/moment'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    day: '',
    month: '',
    year: ''
  })
  const [result, setResult] = useState({
    years: '--', 
    months: '--', 
    days: '--'
  })
  const [errors, setErrors] = useState({
    day: null,
    month: null,
    year: null
  })

  function handleChange(e){
    setErrors(prevErrors => ({...prevErrors, [e.target.name]: null}))
    setFormData(oldData => ({...oldData, [e.target.name] : e.target.value}))
  }
  
  function handleSubmit(e){
    e.preventDefault()
    setErrors({day: null, month: null, year: null})

    let isValid = true;

    if(formData.day == ''){
      setErrors(prevErrors => ({...prevErrors, day: "The field is required"}))
      isValid=false
    }

    if(formData.month == ''){
      setErrors(prevErrors => ({...prevErrors, month: "The field is required"}))
      isValid=false
    }

    if(formData.year == ''){
      setErrors(prevErrors => ({...prevErrors, year: "The field is required"}))
      isValid=false
    }

    if(!isValid){
      setResult({years: '--', months: '--', days: '--'})
      return
    }

    if(formData.day > 31 || formData.day < 1 ){
      setErrors(prevErrors => ({...prevErrors, day: "Invalid day"}))
      isValid=false
    }

    if(formData.month > 12 || formData.month < 1 ){
      setErrors(prevErrors => ({...prevErrors, month: "Invalid month"}))
      isValid=false
    }

    if(formData.year > new Date().getUTCFullYear()){
      setErrors(prevErrors => ({...prevErrors, year: "Year cannot be in the future"}))
      isValid=false
    }

    let parsedFormDate = Date.parse(new Date(`${formData.year}-${formData.month}-${formData.day}`))
    let parsedNowDate = Date.parse(new Date())

    if(parsedFormDate <=0 || parsedFormDate > parsedNowDate){
      setErrors({day: 'Invalid date', month: 'Invalid date', year: 'Invalid date'})
      isValid=false
    }

    if(moment([formData.year,formData.month-1,formData.day]).format() == 'Invalid date'){
      setErrors({day: 'Invalid date', month: 'Invalid date', year: 'Invalid date'})
      isValid=false
    }

    if(!isValid){
      setResult({years: '--', months: '--', days: '--'})
      return
    }

    var birthdayDate = new Date(formData.year, formData.month-1, formData.day);
    var now = new Date();
    var diff = new Date(now.getTime() - birthdayDate.getTime());
    var diffYears = diff.getUTCFullYear() - 1970
    var diffMonths = diff.getUTCMonth()
    var diffDays = diff.getUTCDate() - 1
    
    setResult({years: diffYears, months: diffMonths, days: diffDays})
  }

  const inputErrorStyle={
    border: "solid 1px red"
  }
  const labelErrorStyle={
    color: "red"
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className='inputs'>
          <div className='input-container'>
            <label htmlFor='day' style={errors.day ? labelErrorStyle : {}}>Day</label>
            <input type='text' name='day' value={formData.day} onChange={handleChange} placeholder='DD' style={errors.day ? inputErrorStyle : {}}></input>
            {errors.day && <p className='error'>{errors.day}</p>}
          </div>
          <div className='input-container'>
            <label htmlFor='day' style={errors.month ? labelErrorStyle : {}}>Month</label>
            <input type='text' name='month' value={formData.month}  onChange={handleChange} placeholder='MM' style={errors.month ? inputErrorStyle : {}}></input>
            {errors.month && <p className='error'>{errors.month}</p>}
          </div>
          <div className='input-container'>
            <label htmlFor='day' style={errors.year ? labelErrorStyle : {}}>Year</label>
            <input type='text' name='year' value={formData.year}  onChange={handleChange} placeholder='YYYY'style={errors.year ? inputErrorStyle : {}}></input>
            {errors.year && <p className='error'>{errors.year}</p>}
          </div>
        </div>
        <div className='btn-conntainer'>
          <div className='divider'></div>
          <button className='btn'><img src='/assets/images/icon-arrow.svg'></img></button>
        </div>
      </form>
      <section className='results-container'>
        <h1><span>{result.years}</span> year{result.years != 1 ? "s" : ""}</h1>
        <h1><span>{result.months}</span> month{result.months != 1 ? "s" : ""}</h1>
        <h1><span>{result.days}</span> day{result.days != 1 ? "s" : ""}</h1>
      </section>
    </main>
  )
}

export default App
