import { AuthenStorageKeys } from '@/enums/common';

import { uniqRandomNumber } from './helpers/common';

class AuthStorage {
  private storage: Storage;

  constructor(storage: 'session' | 'local' = 'local') {
    if (storage === 'session') {
      this.storage = sessionStorage;
    } else {
      this.storage = localStorage;
    }
  }

  getStorage() {
    return this.storage;
  }

  setData(
    values: Record<string, number | string | boolean | null | undefined>,
  ) {
    Object.entries(values).forEach(([key, value]) => {
      if (value == null) {
        this.storage.removeItem(key);
      } else {
        this.storage.setItem(key, value.toString());
      }
    });
  }

  set accessToken(value: string) {
    this.storage.setItem(AuthenStorageKeys.ACCESS_TOKEN, value);
  }

  get accessToken(): string {
    return this.storage.getItem(AuthenStorageKeys.ACCESS_TOKEN) ?? '';
  }

  get authStateId(): string {
    return this.storage.getItem(AuthenStorageKeys.AUTH_STATE_ID) ?? '';
  }

  authStateChange() {
    this.storage.setItem(
      AuthenStorageKeys.AUTH_STATE_ID,
      uniqRandomNumber().toString(),
    );
  }

  logout() {
    this.storage.clear();
    this.authStateChange();
  }
}

export default new AuthStorage();
