import lodash from 'lodash';
import {connect} from 'dva';
import {Table,Button} from 'antd';




const NetworkTable=({networkList,poolList,dispatch})=>{
  const data=lodash.values(networkList.networks);
  const pools=lodash.values(poolList.pools);
  const columns=[
    {title:'Id',dataIndex:'id'},
    {title:'Адрес',dataIndex:'address'},
    {title:'Размер',dataIndex:'size'},
    {title:'Описание',dataIndex:'description'},
    {title:'Статус',dataIndex:'status',filters:[
        {text:'Свободная сеть',value:0},
        {text:'Занятая сеть',value:1},
        {text:'Сеть-родитель',value:2}
      ],
      onFilter:(value,record)=> record.status === +value
    },
    {title:'Пул',dataIndex:'pool',
      filters:pools.map(p=>{
        const v=p.description?p.description:p.name;
        return {text:v,value:v};
      }),
      onFilter:(value,record)=>record.pool===value
    },
  ];

  data.forEach(d=>{
    d.pool=poolList.pools[d.poolId]?poolList.pools[d.poolId].description:'';
  });
  return ([
    <Table dataSource={data} columns={columns} size='small' />,
    <Button onClick={()=>dispatch({type:'forms/open',payload:{form:'leaseNetwork'}})}>Получить сеть</Button>
  ]);
}

export default connect(({networkList,poolList})=>({networkList,poolList}))(NetworkTable);
