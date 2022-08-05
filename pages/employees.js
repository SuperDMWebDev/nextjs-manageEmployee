import EmployeeList from '../components/EmployeeList';
export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_URL_LINK}employee`);
  const data = await res.json();
  return {
    props: { data },
  };
}
// nhan data tu getSeverSideProps
function employees({ data }) {
  return (
    <div>
      <EmployeeList employeeData={data} />
    </div>
  );
}

export default employees;
