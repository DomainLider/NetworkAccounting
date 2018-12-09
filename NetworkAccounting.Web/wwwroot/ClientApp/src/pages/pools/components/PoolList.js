import lodash from 'lodash';
import {connect} from 'dva';
import {Table} from 'antd';

const columns=[
  {title:'PoolId',dataIndex:'id'},
  {title:'Name',dataIndex:'name'},
  {title:'Description',dataIndex:'description'},
];

const PoolList=({poolList})=>{
  return (<Table dataSource={lodash.values(poolList.pools)} columns={columns} size='small'/>);
}

export default connect(({poolList})=>({poolList}))(PoolList);
