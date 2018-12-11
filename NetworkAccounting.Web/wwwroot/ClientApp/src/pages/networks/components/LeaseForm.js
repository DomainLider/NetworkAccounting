import React, {Component,PureComponent} from 'react';

import {
  Button, Modal, Form, Input, Radio,
} from 'antd';

const FormItem=Form.Item;
import {connect} from 'dva';
import update from 'immutability-helper';

class LeaseForm extends PureComponent {
  constructor(props) {
    super(props);
    this.leaseNetwork=this.leaseNetwork.bind(this);
    this.close=this.close.bind(this);
    this.state={
      visible:false,
      size:24,
      poolId:1,
      description:'First network'
    };
  }

  render() {
    const visible=this.props.leaseNetwork;
    return (<Modal visible={visible} title='Lease Network' okText='Lease' onOk={this.leaseNetwork} onCancel={this.close}>
      <Form layout='vertical'>
        <FormItem label='Pool Id'><Input onChange={this.changePool} value={this.state.poolId}/></FormItem>
        <FormItem label='Network size'><Input onChange={this.changeSize} value={this.state.size}/></FormItem>
        <FormItem label='Description'><Input onChange={this.changeDescription} value={this.state.description}/></FormItem>
      </Form>
    </Modal>);
  }

  leaseNetwork(){
    const dispatch=this.props.dispatch;
    dispatch({type:'networkList/lease',payload:{size:this.state.size,poolId:this.state.poolId,description:this.state.description}});
    this.close();
  }

  close(){
    this.props.dispatch({type:'forms/close',payload:{form:'leaseNetwork'}});
  }

  updateValue(key,value){
      this.setState(update(this.state, {[key]: {$set: value}}));
  }

  changePool=(e)=>this.updateValue('poolId',e.target.value);
  changeSize=(e)=>this.updateValue('size',e.target.value);
  changeDescription=(e)=>this.updateValue('description',e.target.value);

}

export default connect(({forms:{leaseNetwork}}) => ({leaseNetwork}))(LeaseForm);
