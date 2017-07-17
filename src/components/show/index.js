import React, { Component } from 'react'
import Tree from '../tree'
import {
  Link
} from 'react-router-dom'
import * as urls from '../../constants/urls'
import Table from '../EditableTable'
import style from './style.css'
import Fetch from '../utils/fetch'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      // treeDate / data 数据从接口获取
      treeDate: [
        {
          'product_category_id': 1,
          'product_category_name': '安可唯',
          'next_product_categories': [
            {
              'product_category_id': 3,
              'product_category_name': 'PDX'
            },
            {
              'product_category_id': 4,
              'product_category_name': 'MINI-PDX'
            },
            {
              'product_category_id': 5,
              'product_category_name': 'TCA'
            },
            {
              'product_category_id': 8,
              'product_category_name': '分子检测',
              'next_product_categories': [
                {
                  'product_category_id': 9,
                  'product_category_name': '结直肠癌'
                },
                {
                  'product_category_id': 10,
                  'product_category_name': '肺癌',
                  'next_product_categories': [
                    {
                      'product_category_id': 65,
                      'product_category_name': '肺癌化疗药物',
                      'next_product_categories': []
                    }
                  ]
                },
                {
                  'product_category_id': 11,
                  'product_category_name': '乳腺癌'
                },
                {
                  'product_category_id': 12,
                  'product_category_name': '胃癌'
                },
                {
                  'product_category_id': 13,
                  'product_category_name': '妇科'
                },
                {
                  'product_category_id': 14,
                  'product_category_name': '心血管',
                  'next_product_categories': []
                }
              ]
            },
            {
              'product_category_id': 66,
              'product_category_name': '测试',
              'next_product_categories': [
                {
                  'product_category_id': 67,
                  'product_category_name': '测试2',
                  'next_product_categories': []
                }
              ]
            }
          ]
        },
        {
          'product_category_id': 2,
          'product_category_name': '安可巡',
          'next_product_categories': [
            {
              'product_category_id': 6,
              'product_category_name': 'CTC'
            },
            {
              'product_category_id': 51,
              'product_category_name': '基因检测',
              'next_product_categories': []
            }
          ]
        }
      ],
      data: [{
        key: '0',
        name: {
          editable: false,
          value: 'Edward King 0',
        },
        drug: {
          editable: false,
          value: '32',
        },
        price: {
          editable: false,
          value: 'London, Park Lane no. 0',
        },
      }],
    }
    this.fetchData = this.fetchData.bind(this)
    this.getId = this.getId.bind(this)
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData() {
    console.log('这里从接口获取表格数据')
    Fetch('url', {
      id: ''
    })
    .then(res => {
      if (res.code === '0') {
        console.log('这里将拿到的数据放到data')
        console.log(res.data)
      }
    })
  }
  getId(id) {
    this.setState({
      id: id
    })
  }
  render() {
    console.log(this.state.id)
    return (
      <div>
        <div className={style.header}>
          <div className={style.left}><span className={style.span}>产品分类</span></div>
          <div className={style.right}>
            <span className={style.spanLeft}>{this.state.id}</span>
            <Link
                to = {`${urls.ADD}`}
              >
              <button className={style.button}>+新增产品</button>
            </Link>
          </div>
        </div>
        <div className={style.side}>
          <div className={style.tree}>
            <Tree getId = {this.getId} treeDate = {this.state.treeDate} ></Tree>
          </div>
        </div>
        <div className={style.rightSide}>
          <Table data = {this.state.data} />
        </div>
      </div>
    )
  }
}

export default App
