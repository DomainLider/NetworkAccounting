import lodash from 'lodash';
import {connect} from 'dva';
import {Table} from 'antd';

const columns=[
  {title:'NetworkId',dataIndex:'networkAddress'},
  {title:'Address',dataIndex:'address'},
  {title:'Size',dataIndex:'size'},
  {title:'Description',dataIndex:'description'},
  {title:'Rezerved',dataIndex:'isBusy'},
  {title:'Pool',dataIndex:'pool'},
];

const NetworkTable=({networkList,poolList})=>{
  const data=lodash.values(networkList.networks);
  data.forEach(d=>d.pool=poolList.pools[d.poolId]?poolList.pools[d.poolId].description:'');
  return (<Table dataSource={data} columns={columns} size='small'/>);
}

export default connect(({networkList,poolList})=>({networkList,poolList}))(NetworkTable);
