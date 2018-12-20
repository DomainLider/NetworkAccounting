import axios from 'axios';


export function ListPools () {
  return axios.get('/api/pool');
}

export function AddPool ({name,description}){
  return axios.post('/api/pool',{name,description});
}
export function RemovePool (id){
  return axios.delete(`/api/pool/${id}`);
}
