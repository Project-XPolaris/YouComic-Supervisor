import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {connect, Dispatch} from 'dva';
import styles from './style.less'
interface BookDetailCoverPagePropsType {
    dispatch: Dispatch,
}

function BookDetailCoverPage({dispatch}: BookDetailCoverPagePropsType) {
    return (
        <div >

        </div>
    );
}

export default connect(({}) => ({}))(BookDetailCoverPage);
