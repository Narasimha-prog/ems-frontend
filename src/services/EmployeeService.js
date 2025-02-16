import axios from "axios";
const REST_API_BASE_URL="http://ec2-13-60-16-159.eu-north-1.compute.amazonaws.com:8080/api/employee"
export const listEmployees =()=> axios.get(REST_API_BASE_URL);

export const createEmployee=(employee)=> axios.post(REST_API_BASE_URL,employee)

export const getEmployeeById=(employeeId)=> axios.get(REST_API_BASE_URL+'/'+employeeId)

export const updateEmployee=(employeeId,employee)=>axios.put(REST_API_BASE_URL+'/'+employeeId,employee)

export const deleteEmployee=(employeeId)=>axios.delete(REST_API_BASE_URL+'/'+employeeId)
