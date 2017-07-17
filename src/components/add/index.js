import { Form, Input, Icon, Button, Select, Radio, message } from 'antd'
import React from 'react'
import style from './style.css'
const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group

let uuid = 0
const success = (content) => {
  message.success(content)
}
// const error = (content) => {
//   message.error(content)
// }
// const warning = (content) => {
//   message.warning(content)
// }
class DynamicFieldSet extends React.Component {
  remove = (k) => {
    const { form } = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    // We need at least one passenger
    if (keys.length === 1) {
      return
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    })
  }

  add = () => {
    uuid++
    const { form } = this.props
    // can use data-binding to get
    const keys = form.getFieldValue('keys')
    const nextKeys = keys.concat(uuid)
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    })
  }
  handleReset = () => {
    this.props.form.resetFields()
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
    success('添加成功!')
    console.log(window.location.href)
    setTimeout(function() {
      window.location.href = 'show'
    }, 1000)
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 6 },
    }
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        span: 10, offset: 6
      },
      labelCol: { span: 12 },
    }
    getFieldDecorator('keys', { initialValue: [] })
    const keys = getFieldValue('keys')
    const formItems = keys.map((k, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '筛选药品' : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: 'Please input passengers name or delete this field.',
            }],
          })(
            <Input placeholder='passenger name' style={{ width: '60%', marginRight: 8 }} />
          )}
          {keys.length > 1 ? (
            <Icon
              className='dynamic-delete-button'
              type='close'
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
      )
    })
    return (
      <Form onSubmit={this.handleSubmit}>
      <h2 className = {style.title}>新增产品</h2>
        <FormItem
          {...formItemLayout}
          label='产品名称'
        >
          {getFieldDecorator('input-name')(
            <Input />
          )}
        </FormItem>
         <FormItem
          {...formItemLayout}
          label='产品编号'
        >
          {getFieldDecorator('input-number')(
            <Input />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='所属分类'
          hasFeedback
        >
          {getFieldDecorator('select', {
            rules: [
              { required: true, message: 'Please select your country!' },
            ],
          })(
            <Select placeholder='Please select a type'>
              <Option value='1'>安可唯</Option>
              <Option value='2'>安可巡</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='产品价格'
        >
          {getFieldDecorator('input-price')(
            <Input />
          )}
          <span className = {style.span} >元</span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='代理低价'
        >
          {getFieldDecorator('input-priceRepalce')(
            <Input />
          )}
          <span className = {style.span} >元</span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='可否复选'
        >
          {getFieldDecorator('radio-group')(
            <RadioGroup>
              <Radio value='1'>仅单选一次</Radio>
              <Radio value='0'>可复选</Radio>
            </RadioGroup>
          )}
        </FormItem>
        {formItems}
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type='dashed' onClick={this.add} className = {style.add} style={{ width: '60%' }}>
            <Icon type='plus-circle-o' />添加药品
          </Button>
        </FormItem>
        <FormItem {...formItemLayoutWithOutLabel}>
          <Button type='primary' htmlType='submit'>保存</Button>
          <Button style={{ marginLeft: 30 }} onClick={this.handleReset}>
              取消
            </Button>
        </FormItem>
      </Form>
    )
  }
}

const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet)
export default WrappedDynamicFieldSet
