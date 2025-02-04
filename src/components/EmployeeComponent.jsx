import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployeeById, updateEmployee } from '../services/EmployeeService'
import { useNavigate,useParams } from 'react-router-dom'

const EmployeeComponent = () => {
    const[firstName,setFirstName] =useState('')
    const[lastName,setLastName] =useState('')
    const[email,setEmailId] =useState('')
    const {id}=useParams()

    const [error,setError]=useState(
      {
        firstName:'',
        lastName:'',
        email:''
      }
    )

const navigate=useNavigate()
    
    function saveOrUpdateEmployee(e)
    {
      e.preventDefault();
      if(validationForm())
      {

        const employee={firstName,lastName,email}
        console.log(employee)
        if(id){
          updateEmployee(id,employee).then((response)=>{
            console.log(response.data);
            navigate("/employees");
          }).catch(
            (error)=>{
              console.error(error);
            }
          )
        }else{
          createEmployee(employee).then((response)=>{
            
            console.log(response.data)
            navigate("/employees")
          }).catch((error)=>
            {console.error(error);
            }
          )
        }
  
        
      }
      
     
    }

    //e is Event object

    function validationForm()
    {
      let valid=true;
      const errorCopy={...error};
      if(firstName.trim())
      {
          errorCopy.firstName='';
      }
      else{
        errorCopy.firstName='First Name is Required';
        valid=false;
      }
      if(lastName.trim())
        {
            errorCopy.lastName='';
        }
        else{
          errorCopy.lastName='Last Name is Required';
          valid=false;
        }

        if(email.trim())
          {
              errorCopy.email='';
          }
          else{
            errorCopy.email='Email Name is Required';
            valid=false;
          }

          setError(errorCopy);
          return valid;
    }

function pageTitle()
{
    if(id)
    {
      return <h2 className='text-center'>Update Employee</h2>
    }
    else{
      <h2 className='text-center'>Add Employee</h2>
    }

  }

  useEffect(
    ()=>{
         if(id){
          getEmployeeById(id).then((response)=>
          {
          setFirstName(response.data.firstName)
          setLastName(response.data.lastName)
          setEmailId(response.data.email)
        }
          )
         }
    },[id]
  )

  return (
    <div className='container'>
      <br /><br />
       <div className='row'>
       
           <div className='card col-md-6 offset-md-3'>
            
          {
             pageTitle()
          }
              <div className='card-body'>
                <form>
                    <div className='form-group mb-2'>
                       <label className='form-label'>FirstName</label>
                       <input type="text" 
                              placeholder='Enter Employee First Name'
                              value={firstName}
                              name='firstName'
                              className={`form-control ${error.firstName ?'is-invalid':''}`}
                              onChange={e=>setFirstName(e.target.value)}
                       />
                        {error.firstName && <div className="invalid-feedback">{error.firstName}</div>}
                    </div>
                    <div className='form-group mb-2'>
                       <label className='form-label'>LastName</label>
                       <input type="text" 
                              placeholder='Enter Employee Last Name'
                              value={lastName}
                              name='lastName'
                              className={`form-control ${error.lastName ?'is-invalid':''}`}
                              onChange={e=>setLastName(e.target.value)}
                       />
                       {error.lastName && <div className="invalid-feedback">{error.lastName}</div>}
                    </div>
                    <div className='form-group mb-2'>
                       <label className='form-label'>Email Id</label>
                       <input type="email" 
                              placeholder='Enter Employee Email Id Name'
                              value={email}
                              name='email'
                              className={`form-control ${error.email ?'is-invalid':''}`}
                              onChange={e=>setEmailId(e.target.value)}
                       />
                       {error.email && <div className="invalid-feedback">{error.email}</div>}
                    </div>
                    <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                </form>
              </div>
           </div>
       </div>
    </div>
  )
}

export default EmployeeComponent