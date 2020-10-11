import React, { useState } from 'react';
import { StateType } from '@/models/login';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import { connect } from '@@/plugin-dva/exports';
import { Dispatch } from '@@/plugin-dva/connect';
import LoginFrom from './components/Login';
import styles from './style.less';
import { useIntl } from '@@/plugin-locale/localeExports';
import ApplicationConfig from '@/config';

const { Tab, UserName, Password, Submit, Address } = LoginFrom;

interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
}

const Login: React.FC<LoginProps> = props => {
  const { submitting } = props;
  const [type, setType] = useState<string>('account');
  const { formatMessage } = useIntl();
  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values },
    });
  };
  return (
    <div className={styles.main}>
      <LoginFrom activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <Tab key="account" tab={formatMessage({ id: 'login.form.login.account' })}>
          <Address
            name="address"
            placeholder={'服务地址'}
            defaultValue={localStorage.getItem(ApplicationConfig.storeKey.apiurl) ?? ''}
            rules={[
              {
                required: true,
                message: '请输入服务地址',
              },
            ]}
          />
          <UserName
            name="username"
            placeholder={formatMessage({ id: 'login.form.username.hint' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'login.form.username.validate.required' }),
              },
            ]}
          />
          <Password
            name="password"
            placeholder={formatMessage({ id: 'login.form.password.hint' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'login.form.password.validate.required' }),
              },
            ]}
          />
        </Tab>
        <Submit loading={submitting}>{formatMessage({ id: 'login.form.login.btn' })}</Submit>
      </LoginFrom>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
