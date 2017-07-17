import React from 'react'
import { Table, Input, Popconfirm, message } from 'antd'
message.config({
  top: 100,
  duration: 2,
})
import Fetch from '../utils/fetch'
const success = (content) => {
  message.success(content)
}
// const error = (content) => {
//   message.error(content)
// }
// const warning = (content) => {
//   message.warning(content)
// }
class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable })
      if (nextProps.editable) {
        this.cacheValue = this.state.value
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value)
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue })
        this.props.onChange(this.cacheValue)
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.state.editable ||
           nextState.value !== this.state.value
  }
  handleChange(e) {
    const value = e.target.value
    this.setState({ value })
  }
  render() {
    const { value, editable } = this.state
    return (
      <div>
        {
          editable ? <div>
              <Input
                value={value}
                onChange={e => this.handleChange(e)}
              />
            </div> : <div className='editable-row-text'>
              {value.toString() || ' '}
            </div>
        }
      </div>
    )
  }
}
class EditableTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
    }
    this.columns = [{
      title: '产品名称',
      dataIndex: 'name',
      width: '25%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'name', text),
    }, {
      title: '药品',
      dataIndex: 'drug',
      width: '15%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'drug', text),
    }, {
      title: '价格',
      dataIndex: 'price',
      width: '40%',
      render: (text, record, index) => this.renderColumns(this.state.data, index, 'price', text),
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        const { editable } = this.state.data[index].name
        return (
          <div className='editable-row-operations'>
            {
              editable ? <span>
                  <a onClick={() => this.editDone(index, 'save')}>Save</a>
                  <Popconfirm title='Sure to cancel?' onConfirm={() => this.editDone(index, 'cancel')}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span> : <span>
                  <a onClick={() => this.edit(index)}>编辑</a>
                </span>
            }
            <span className='ant-divider' />
            <Popconfirm title='Sure to delete?' onConfirm={() => this.onDelete(index)}>
              <a href='#'>删除</a>
            </Popconfirm>
          </div>
        )
      },
    }]
  }
  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key]
    if (typeof editable === 'undefined') {
      return text
    }
    return (<EditableCell
      editable={editable}
      value={text}
      onChange={value => this.handleChange(key, index, value)}
      status={status}
    />)
  }
  onDelete = (index) => {
    const data = [...this.state.data]
    data.splice(index, 1)
    this.setState({ data })
  }
  handleChange(key, index, value) {
    const { data } = this.state
    data[index][key].value = value
    this.setState({ data })
  }
  edit(index) {
    const { data } = this.state
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = true
      }
    })
    this.setState({ data })
  }
  editDone(index, type) {
    const { data } = this.state
    Object.keys(data[index]).forEach((item) => {
      if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        data[index][item].editable = false
        data[index][item].status = type
      }
    })
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach((item) => {
        if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
          delete data[index][item].status
        }
      })
    })
    Fetch('url', {
      id: ''
    })
    .then(res => {
      if (res.code === '0') {
        console.log('将表单数据更新传入后端')
        console.log(res.data)
      }
    })
    success('保存成功!')
  }
  render() {
    const { data } = this.state
    const dataSource = data.map((item) => {
      const obj = {}
      Object.keys(item).forEach((key) => {
        obj[key] = key === 'key' ? item[key] : item[key].value
      })
      return obj
    })
    const columns = this.columns
    return <Table pagination={false} bordered dataSource={dataSource} columns={columns} />
  }
}
export default EditableTable
