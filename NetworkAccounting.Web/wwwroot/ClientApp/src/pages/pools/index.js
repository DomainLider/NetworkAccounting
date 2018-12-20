import PoolList from "./components/PoolList";
import CrudPoolForm from "./components/CrudPoolForm";

const PoolPage = (props)=>{
  return (
    <div>
      <PoolList/>
      <CrudPoolForm/>
    </div>
  );
}

export default PoolPage;
