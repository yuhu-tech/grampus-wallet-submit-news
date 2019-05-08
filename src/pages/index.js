import React, { Component } from 'react';
import { Button, Input } from 'antd';

class SubmitNew extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     listNewData: listNewData
  //   };
  // }

  render() {
    return (
      <div className="submit-new">
        <div style={{ marginBottom: 16 }}>
          <Input addonBefore="文章标题" defaultValue="" size="large" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Input addonBefore="文章来源" defaultValue="" size="large" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Input addonBefore="发布时间" defaultValue="" size="large" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <Input addonBefore="文章链接" defaultValue="" size="large" />
        </div>
        <Button
          size="large"
          type="primary"
          onClick={() => {
            alert(1)
          }}
        >提交</Button>
      </div>
    );
  }
}

export default SubmitNew;
