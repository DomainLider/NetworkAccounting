import lodash from 'lodash';
import {connect} from 'dva';
import {Table,Button} from 'antd';

const columns=[
  {title:'NetworkId',dataIndex:'networkAddress'},
  {title:'Address',dataIndex:'address'},
  {title:'Size',dataIndex:'size'},
  {title:'Description',dataIndex:'description'},
  {title:'Rezerved',dataIndex:'isBusyStr'},
  {title:'Pool',dataIndex:'pool'},
];

const LeaseNetwork=(dispatch,size,poolId)=>()=>{
  dispatch({type:'networkList/lease',payload:{size,poolId}});
}

const NetworkTable=({networkList,poolList,dispatch})=>{
  const data=lodash.values(networkList.networks);
  data.forEach(d=>{
    d.pool=poolList.pools[d.poolId]?poolList.pools[d.poolId].description:'';
    d.isBusyStr=(d.isBusy===true)?'Y':'N';
  });
  return ([
    <Table dataSource={data} columns={columns} size='small'/>,
    <Button onClick={LeaseNetwork(dispatch,27,1)}>Lease</Button>
  ]);
}

export default connect(({networkList,poolList})=>({networkList,poolList}))(NetworkTable);
