import React from 'react'
import { Tree } from 'antd'
const TreeNode = Tree.TreeNode
class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      treeDate: this.props.treeDate
    }
  }
  ComponentDidMount() {
    // this.
  }
  onSelect = (selectedKeys, event) => {
    console.log('selected', selectedKeys, event)
    this.props.getId(selectedKeys)
  }
  render() {
    return (
      <Tree
        showLine
        defaultExpandAll={true}
        onSelect={this.onSelect}
      >
      {
        this.state.treeDate.map(item => (
            <TreeNode title = {item.product_category_name} key = {item.product_category_id}>
              {
                item.next_product_categories ? item.next_product_categories.map(p => (
                  <TreeNode title = {p.product_category_name} key = {p.product_category_id}>
                    {
                      p.next_product_categories ? p.next_product_categories.map(y => (
                          <TreeNode title = {y.product_category_name} key = {y.product_category_id}>
                          </TreeNode>
                        )) : ''
                    }
                  </TreeNode>
                )) : ''
              }
            </TreeNode>
          ))
      }
      </Tree>
    )
  }
}
export default Demo
