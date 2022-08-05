import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from './Header';
import styles from '../styles/AddEmployee.module.css';
function AddEmployee() {
  const router = useRouter();
  const [addEmployee, setEmployee] = useState({
    emp_name: '',
    emp_email: '',
    emp_address: '',
    emp_phone: '',
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('add employee', `${process.env.NEXT_URL_LINK}saveEmployee`);
    let data = await axios.post(
      `http://localhost:3000/api/employee`,
      addEmployee,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF_8',
        },
      }
    );
    console.log('data create', data);

    setEmployee({
      emp_name: '',
      emp_email: '',
      emp_address: '',
      emp_phone: '',
    });
    router.push('/employees');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmployee({ ...addEmployee, [e.target.name]: value });
  };
  return (
    <>
      <Header />
      <div className={styles.addform}>
        <h1>ADD EMPLOYEE</h1>
        <form onSubmit={onSubmit}>
          <div>
            <input
              type="text"
              className={styles.input}
              name="emp_name"
              placeholder="Enter Name"
              onChange={handleChange}
              value={addEmployee.emp_name}
            />
          </div>
          <div>
            <input
              type="email"
              className={styles.input}
              name="emp_email"
              placeholder="Enter Email"
              onChange={handleChange}
              value={addEmployee.emp_email}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="emp_address"
              placeholder="Enter Address"
              onChange={handleChange}
              value={addEmployee.emp_address}
            />
          </div>
          <div>
            <input
              type="text"
              className={styles.input}
              name="emp_phone"
              placeholder="Enter Phone"
              onChange={handleChange}
              value={addEmployee.emp_phone}
            />
          </div>
          <div>
            <button type="submit"> Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddEmployee;
