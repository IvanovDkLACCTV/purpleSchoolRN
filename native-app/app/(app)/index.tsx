import { useAtom } from 'jotai';
import { Text, View } from 'react-native';
import { profileAtom } from '../../entities/user/model/user.state';
import axios from 'axios';
import { API } from '../../entities/auth/api/api';
import log from '../../logger/log';
import { useEffect } from 'react';
import { IAuthResponse } from '../../entities/auth/model/auth.interfaces';
import { authAtom } from '../../entities/auth/model/auth.state';

export default function MyCourses() {
  const [profile] = useAtom(profileAtom);
  const [auth, setAuth] = useAtom(authAtom);

  const login = async () => {
    try {
      const { data } = await axios.post<IAuthResponse>(API.login, {
        email: 'john.doe@example.com',
        password: 'password123',
      });

      setAuth({ ...auth, access_token: data.access_token });
      log('Access Token:', data.access_token);
    } catch (error) {
      log('Login error:', error);
    }
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <View>
      <Text>{profile.profile?.name}</Text>
    </View>
  );
}
