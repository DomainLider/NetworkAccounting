import React, {Component, PureComponent} from 'react';

import {
  Button, Modal, Form, Input, Select,
} from 'antd';

const FormItem = Form.Item;
import {connect} from 'dva';
import update from 'immutability-helper';

class CrudPoolForm extends PureComponent {
  constructor(props) {
    super(props);
    this.addPool = this.addPool.bind(this);
    this.close = this.close.bind(this);
    this.state = this.initState();
  }

  initState = () => ({
      name: 'NEW_POOL',
      description: 'Новый пул',
    }
  );

  render() {
    const visible = this.props.crudPool.visible;
    return (
      <Modal visible={visible} title='Добавить пул' okText='Создать пул' onOk={this.addPool}
             cancelText='Закрыть' onCancel={this.close}>
        <Form layout='vertical'>
          <FormItem label='Введите имя пула' required>
            <Input onChange={this.changeName}
                   value={this.state.name}/></FormItem>
          <FormItem label='Описание'>
            <Input onChange={this.changeDescription}
                   value={this.state.description}/></FormItem>
        </Form>
      </Modal>);
  }

  addPool() {
    const dispatch = this.props.dispatch;
    dispatch({
      type:'poolList/addPool',
      payload:{
        name:this.state.name,
        description:this.state.description
      }
    });
  }

  close() {
    this.props.dispatch({type: 'forms/close', payload: {form: 'crudPool'}});
    this.setState(this.initState());
  }

  updateValue(key, value) {
    this.setState(update(this.state, {[key]: {$set: value}}));
  }

  changeName = (e) => this.updateValue('name', e.target.value);
  changeDescription = (e) => this.updateValue('description', e.target.value);

}

export default connect(({forms: {crudPool}, poolList}) => ({crudPool, poolList}))(CrudPoolForm);
