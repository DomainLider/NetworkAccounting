import {Component} from 'react';
import lodash from 'lodash';
import {connect} from 'dva';
import {Button, Table} from 'antd';

const columns=[
  {title:'Id',dataIndex:'id'},
  {title:'Имя',dataIndex:'name'},
  {title:'Описание',dataIndex:'description'},
];

class PoolList extends Component {
  state = {
    selectedRowKeys: []
  };

  constructor(props) {
    super(props);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onRemovePool=this.onRemovePool.bind(this);
  }

  render() {
    const {poolList, dispatch} = this.props;
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange
    };
    return [
      <Button onClick={() => dispatch({type: 'forms/open', payload: {form: 'crudPool'}})}>Новый пул</Button>,
      <Button onClick={this.onRemovePool }>Удалить пул</Button>,
      <Table rowSelection={rowSelection} rowKey={(row)=>row.id} dataSource={lodash.values(poolList.pools)} columns={columns} size='small'/>,

    ];
  }

  onRemovePool = ()=>{
    const {dispatch} = this.props;
    dispatch({type: 'poolList/removePool', payload: {ids: this.state.selectedRowKeys}});
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys: selectedRowKeys
    })
  }
}


export default connect(({poolList})=>({poolList}))(PoolList);
