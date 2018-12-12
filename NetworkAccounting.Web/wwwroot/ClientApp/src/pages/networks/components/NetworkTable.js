import lodash from 'lodash';
import {connect} from 'dva';
import {Table,Button} from 'antd';

const columns=[
  {title:'Id',dataIndex:'networkAddress'},
  {title:'Адрес',dataIndex:'address'},
  {title:'Размер',dataIndex:'size'},
  {title:'Описание',dataIndex:'description'},
  {title:'Занята',dataIndex:'isBusyStr'},
  {title:'Пул',dataIndex:'pool'},
];


const NetworkTable=({networkList,poolList,dispatch})=>{
  const data=lodash.values(networkList.networks);
  data.forEach(d=>{
    d.pool=poolList.pools[d.poolId]?poolList.pools[d.poolId].description:'';
    d.isBusyStr=(d.isBusy===true)?'Y':'N';
  });
  return ([
    <Table dataSource={data} columns={columns} size='small'/>,
    <Button onClick={()=>dispatch({type:'forms/open',payload:{form:'leaseNetwork'}})}>Получить сеть</Button>
  ]);
}

export default connect(({networkList,poolList})=>({networkList,poolList}))(NetworkTable);
