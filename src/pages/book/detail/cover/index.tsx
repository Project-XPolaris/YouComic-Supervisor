import React from 'react';
import { connect, Dispatch } from 'dva';

interface BookDetailCoverPagePropsType {
  dispatch: Dispatch;
}

function BookDetailCoverPage({ dispatch }: BookDetailCoverPagePropsType) {
  return <div></div>;
}

export default connect(({}) => ({}))(BookDetailCoverPage);
