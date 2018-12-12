import React, {Component, PureComponent} from 'react';
import _ from 'lodash';

import {
  Button, Modal, Form, Input, Select,
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
import {connect} from 'dva';
import update from 'immutability-helper';

class LeaseForm extends PureComponent {
  constructor(props) {
    super(props);
    this.leaseNetwork = this.leaseNetwork.bind(this);
    this.close = this.close.bind(this);
    this.state = this.initState();
  }

  initState = () => ({
      size: 24,
      poolId: 1,
      description: 'First network',
      network: null
    }
  );

  render() {
    const visible = this.props.leaseNetwork.visible;
    const leasedNetwork = this.props.leaseNetwork.network;
    const pools=_.values(this.props.poolList.pools);
    const defaultPool=pools.length>0?pools[0].id:null;
    return (
      <Modal visible={visible} title='Lease Network' okText='Lease' onOk={this.leaseNetwork} onCancel={this.close}>
        <Form layout='vertical'>
          <FormItem label='Выберите тип сети'>
            {/*<Input onChange={this.changePool} value={this.state.poolId}/>*/}
            <Select onChange={this.changePool} defaultValue={defaultPool}>
              {pools.map(p=><Option key={p.id} value={p.id}>{p.description?p.description:p.name}</Option>)}
            </Select>
          </FormItem>
          <FormItem label='Network size'><Input onChange={this.changeSize} value={this.state.size}/></FormItem>
          <FormItem label='Description'><Input onChange={this.changeDescription}
                                               value={this.state.description}/></FormItem>
          <FormItem label='Leased network'><Input readOnly
                                                  value={leasedNetwork ? `${leasedNetwork.address}/${leasedNetwork.size}` : 'XXX'}/></FormItem>
        </Form>
      </Modal>);
  }

  leaseNetwork() {
    const dispatch = this.props.dispatch;
    dispatch({
      type: 'networkList/lease',
      payload: {size: this.state.size, poolId: this.state.poolId, description: this.state.description}
    });
  }

  close() {
    this.props.dispatch({type: 'forms/close', payload: {form: 'leaseNetwork'}});
    this.props.dispatch({type: 'forms/clearLeasedNetwork'});
    this.setState(this.initState());
  }

  updateValue(key, value) {
    this.setState(update(this.state, {[key]: {$set: value}}));
  }

  changePool = (e) => {
    this.updateValue('poolId', e);
  }
  changeSize = (e) => this.updateValue('size', e.target.value);
  changeDescription = (e) => this.updateValue('description', e.target.value);

}

export default connect(({forms: {leaseNetwork},poolList}) => ({leaseNetwork,poolList}))(LeaseForm);
