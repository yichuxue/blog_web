import React, { Component, Suspense } from 'react';
import { connect } from 'dva';
import { Card, List, Icon, Tag } from 'antd';
import moment from 'moment';

import ArticleListContent from '@/components/ArticleListContent';
import styles from './Home.less';

@connect(({ home, loading }) => ({
  home,
  loading: loading.models.home,
}))
class Home extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetch',
      payload: {
        current: 1
      }
    });
  }

  paginationOnChange = (nowPage) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/fetch',
      payload: {
        current: nowPage
      }
    });
  }

  render() {

    const {
      home: { list, pagination },
      loading,
    } = this.props;
    // console.log(this.props)
    const paginationProps = {
      showQuickJumper: true,
      ...pagination,
      onChange: this.paginationOnChange
    }



    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    return (
      <div>
        <div className={styles.headerTop}>

        </div>
        <Card
          className={styles.cardList}
          bordered={false}
          bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
          <List
            size="large"
            loading={list.length === 0 ? loading : false}
            rowKey="id"
            itemLayout="vertical"
            dataSource={list}
            pagination={paginationProps}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <IconText type="eye" text={item.look_count} />, // 查看人数
                  <IconText type="like-o" text={item.fab} />, // 点赞
                  <IconText type="message" text={item.comment_count} />, // 评论
                  <IconText type="clock-circle-o" text={moment(Number(item.push_time)).format('YYYY-MM-DD HH:mm')} />, // 时间
                ]}
                extra={<div className={styles.listItemExtra} />}
              >
                <List.Item.Meta
                  title={
                    <a className={styles.listItemMetaTitle} href={item.href}>
                      {item.title}
                    </a>
                  }
                  description={
                    <span>
                      <Icon type="tags" style={{marginRight: '8px'}}/>
                      <Tag>{item.tag}</Tag>
                    </span>
                  }
                />
                <ArticleListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </div>
    )
  }
}

export default Home
