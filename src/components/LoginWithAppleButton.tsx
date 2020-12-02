import * as React from 'react';
import co from 'co';
import MusicProvider from '../utils/MusicProvider';

type LoginWithAppleButtonProps = {
  styles?: StyleSheet;
  children?: React.ReactNode;
  config: {
    developerToken: string;
    appName: string;
    build?: string;
  };
  setAuthState: (st: boolean) => void;
};

const LoginWithAppleButton = ({
  children,
  config: { developerToken, appName, build },
  setAuthState,
}: LoginWithAppleButtonProps) => {
  const musicProvider = new MusicProvider();
  musicProvider.configure(developerToken, appName, build);
  const musicInstance = musicProvider.getMusicInstance();
  (window as any).musicKitInstance = musicInstance;

  if (musicInstance.isAuthorized) {
    setAuthState(true);
  }

  const handleLoginClick = () => {
    co(function* () {
      let key = yield musicInstance.authorize();
      console.log(key);
      if (key) {
        setAuthState(true);
      }
    });
  };

  if (children) {
    return <span onClick={handleLoginClick}>{children}</span>;
  }

  return <button onClick={handleLoginClick}>Login with Apple</button>;
};

export default LoginWithAppleButton;
