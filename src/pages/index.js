import React, { Component } from 'react'
import { Button, Input, Layout, Menu, List, message } from 'antd'
import { gql } from '../common/request'
import logo from '../image/logo.png'

const { Header, Content, Sider } = Layout;

class SubmitNew extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      source: "",
      articleURL: "",
      imgURL: "",
      sourceAt: "",
      isManage: true,
      articles: [],
      loading: false
    };
  }

  componentDidMount() {
    this._getArticles()
  }

  _submitNew = async () => {
    const param = `
      mutation addArticle(
        $title: String!
        $source: String!
        $sourceAt: String!
        $articleURL: String!
        $imgURL: String!
      ){
        addArticle(
          title: $title
          source: $source
          sourceAt: $sourceAt
          articleURL: $articleURL
          imgURL: $imgURL
        ){
          id
          title
          source
          articleURL
          imgURL
          sourceAt
        }
      }
    `
    const variables = {
      title: this.state.title,
      source: this.state.source,
      sourceAt: this.state.sourceAt,
      articleURL: this.state.articleURL,
      imgURL: this.state.imgURL
    }
    let res = await gql(param, variables)
    console.log(res)
    if (res) {
      message.success("创建成功")
      this.setState({
        title: "",
        source: "",
        articleURL: "",
        imgURL: "",
        sourceAt: ""
      })
    } else {
      message.error("创建失败")
    }
  }

  _getArticles = async () => {
    const param = `
      query{
        articles{
          id
          title
          source
          articleURL
          imgURL
          sourceAt
        }
      }
    `
    const variables = null
    let res = await gql(param, variables)
    if (res) {
      this.setState({
        articles: res.articles
      })
    }
  }

  _delArticle = async (id) => {
    const param = `
      mutation delArticle(
        $id: String!
      ){
        deleteArticle(
          id: $id
        ){
          id
        }
      }
    `
    const variables = {
      id: id
    }
    let res = await gql(param, variables)
    if (res) {
      this._getArticles()
      this.setState({
        loading: false
      })
    }
  }

  _articleItemDom = (item) => (
    <div
      className="art-item"
    >
      <div>{item.title}</div>
      <Button
        loading={this.state.loading}
        type="danger"
        onClick={() => {
          this.setState({
            loading: true
          })
          this._delArticle(item.id)
        }}
      >删除</Button>
    </div>
  )

  _submitDom = () => (
    <div className="submit-new">
      <div style={{ marginBottom: 16 }}>
        <Input
          addonBefore="文章标题"
          defaultValue=""
          size="large"
          value={this.state.title}
          onChange={(e) => {
            this.setState({
              title: e.target.value
            })
          }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input
          addonBefore="发布时间"
          defaultValue=""
          size="large"
          value={this.state.sourceAt}
          onChange={(e) => {
            this.setState({
              sourceAt: e.target.value
            })
          }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input
          addonBefore="文章来源"
          defaultValue=""
          size="large"
          value={this.state.source}
          onChange={(e) => {
            this.setState({
              source: e.target.value
            })
          }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input
          addonBefore="列表图片"
          defaultValue=""
          size="large"
          value={this.state.imgURL}
          onChange={(e) => {
            this.setState({
              imgURL: e.target.value
            })
          }}
        />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input
          addonBefore="文章链接"
          defaultValue=""
          size="large"
          value={this.state.articleURL}
          onChange={(e) => {
            this.setState({
              articleURL: e.target.value
            })
          }}
        />
      </div>
      <Button
        size="large"
        type="primary"
        onClick={() => {
          this._submitNew()
        }}
      >提交</Button>
    </div>
  )

  _manageDom = () => (
    <List
      bordered
      dataSource={this.state.articles}
      renderItem={item => (
        <List.Item>
          {this._articleItemDom(item)}
        </List.Item>
      )}
    />
  )

  _layoutDom = () => (
    <Layout>
      <Header className="header">
        <div className="logo-wrp">
          <img className='logo' src={logo} alt='' />
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item
              key="1"
              onClick={() => {
                this._getArticles()
                this.setState({
                  isManage: true
                })
              }}
            >管理</Menu.Item>
            <Menu.Item
              key="2"
              onClick={() => {
                this.setState({
                  isManage: false
                })
              }}
            >添加</Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {
              this.state.isManage
                ?
                this._manageDom()
                :
                this._submitDom()
            }
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )

  render() {
    return (
      <div className="wrp">
        {this._layoutDom()}
      </div>
    );
  }
}

export default SubmitNew;
