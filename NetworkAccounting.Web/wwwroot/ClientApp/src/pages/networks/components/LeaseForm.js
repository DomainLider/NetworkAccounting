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
      fromId:null,
      description: 'Новая подсеть',
      network: null
    }
  );

  render() {
    const visible = this.props.leaseNetwork.visible;
    const leasedNetwork = this.props.leaseNetwork.network;
    const pools=_.values(this.props.poolList.pools);
    const defaultPool=pools.length>0?pools[0].id:null;
    const froms=_.values(this.props.networkList.networks).filter(n=>n.poolId===this.state.poolId&&(n.status===0)&&(n.size<=this.state.size));
    return (
      <Modal visible={visible} title='Получить новую сеть' okText='Новая сеть' onOk={this.leaseNetwork} cancelText='Закрыть' onCancel={this.close}>
        <Form layout='vertical'>
          <FormItem label='Выберите тип сети' required>
            <Select onChange={this.changePool} defaultValue={defaultPool}>
              {pools.map(p=><Option key={p.id} value={p.id}>{p.description?p.description:p.name}</Option>)}
            </Select>
          </FormItem>
          <FormItem label='Размер сети' required><Input onChange={this.changeSize} value={this.state.size}/></FormItem>
          <FormItem label='Сеть-родитель'>
            <Select onChange={this.changeFromId}>
              {froms.map(p=><Option key={p.id} value={p.id}>{p.address}/{p.size}</Option>)}
            </Select>
          </FormItem>
          <FormItem label='Описание'><Input onChange={this.changeDescription}
                                               value={this.state.description}/></FormItem>
          <FormItem label='Полученная сеть'><Input readOnly disabled
                                                  value={leasedNetwork ? `${leasedNetwork.address}/${leasedNetwork.size}` : '-'}/></FormItem>
        </Form>
      </Modal>);
  }

  leaseNetwork() {
    const dispatch = this.props.dispatch;
    dispatch({
      type: 'networkList/lease',
      payload: {size: this.state.size, poolId: this.state.poolId, description: this.state.description,fromId:this.state.fromId}
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
    this.changeFromId(null);
  }
  changeFromId = (e) => {
    this.updateValue('fromId', e);
  }
  changeSize = (e) => this.updateValue('size', e.target.value);
  changeDescription = (e) => this.updateValue('description', e.target.value);

}

export default connect(({forms: {leaseNetwork},poolList,networkList}) => ({leaseNetwork,poolList,networkList}))(LeaseForm);
