import React from 'react';
import Header from './Header';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/EmployeeList.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
let sortCol, sortAsc;

const EmployeeList = (props) => {
  const { employeeData } = props;
  const [dataTable, setDataTable] = useState(employeeData);
  const router = useRouter();
  const pageSize = 3;
  const [numberClick, setNumberClick] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const deleteEmployee = async (id) => {
    let data = await axios.delete(`http://localhost:3000/api/employee/${id}`);
    router.push('/employees');
  };
  const previousPage = () => {
    console.log('currPage now', currPage);
    if (currPage > 1) {
      setCurrPage((currPage) => currPage - 1);
    }
  };

  const nextPage = () => {
    if (currPage * pageSize < dataTable.length) {
      setCurrPage((currPage) => currPage + 1);
    }
  };
  function sort(e) {
    let thisSort = e.target.dataset.sort;
    if (sortCol === thisSort) sortAsc = !sortAsc;

    sortCol = thisSort;

    const newList = dataTable.sort((a, b) => {
      if (a[sortCol] < b[sortCol]) return sortAsc ? 1 : -1;
      if (a[sortCol] > b[sortCol]) return sortAsc ? -1 : 1;
      return 0;
    });
    console.log('new list', newList);
    setDataTable(newList);
    setNumberClick((numberClick) => numberClick + 1);
  }
  // const renderEmployee = useCallback(() => {});
  useEffect(() => {
    document.querySelectorAll('th').forEach((t) => {
      t.addEventListener('click', sort);
    });
  }, []);
  const findEmpName = (e) => {
    if (e.keyCode == 13) {
      const name = e.target.value;
      if (name === '') {
        setDataTable(employeeData);
        return;
      }
      console.log('emp name', name);
      const newList = employeeData.filter((value, index) => {
        console.log('value', value);
        return value.emp_name === name;
      });
      setDataTable(newList);
    }
  };
  return (
    <div key={props.length}>
      <Header />
      <input
        type="text"
        onKeyDown={(e) => findEmpName(e)}
        className={styles.search}
      />
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th data-sort="emp_id" className={styles.th}>
              EmployeeId
            </th>
            <th data-sort="emp_name" className={styles.th}>
              EmployeeName
            </th>
            <th data-sort="emp_email" className={styles.th}>
              EmployeeEmail
            </th>
            <th data-sort="emp_address" className={styles.th}>
              EmployeeAddress
            </th>
            <th data-sort="emp_phone" className={styles.th}>
              EmployeePhone
            </th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {dataTable.map((empData, index) => {
            if (
              index >= (currPage - 1) * pageSize &&
              index < currPage * pageSize
            ) {
              return (
                <tr key={index}>
                  <th className={styles.th}>{index + 1}</th>
                  <td className={styles.th}>{empData.emp_name}</td>
                  <td className={styles.th}>{empData.emp_email}</td>
                  <td className={styles.th}>{empData.emp_address}</td>
                  <td className={styles.th}>{empData.emp_phone}</td>
                  <td>
                    <button
                      className={styles.delete}
                      onClick={() => deleteEmployee(empData.emp_id)}
                    >
                      Delete
                    </button>
                    <button className={styles.update}>
                      <Link href={`/employee/${empData.emp_id}`}>Update</Link>
                    </button>
                  </td>
                </tr>
              );
            } else {
              return;
            }
          })}
        </tbody>
      </table>
      <button id="prevButton" onClick={previousPage}>
        Previous
      </button>
      <button id="nextButton" onClick={nextPage}>
        Next
      </button>
      <div className={styles.addEmployeeCenter}>
        <button className={styles.addEmployee}>
          <Link href={`/addEmployee`}>AddEmployee</Link>
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
