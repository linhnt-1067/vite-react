import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AuthStorage from '@/utils/authStorage';
import { AuthenStorageKeys } from '@/enums/common';
import { ROUTES } from '@/utils/constants/routes';

export const useCheckAuthorization = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		if (!AuthStorage.accessToken) {
			navigate(ROUTES.LOGIN);
		} else {
			navigate(ROUTES.HOME);
		}
	}, [navigate, pathname]);

	useEffect(() => {
		const redirect = (e: StorageEvent) => {
			if (e.key === AuthenStorageKeys.AUTH_STATE_ID && !document.hasFocus()) {
				if (AuthStorage.accessToken) {
					navigate(ROUTES.HOME);
				} else {
					navigate(ROUTES.LOGIN);
				}
			}
		};

		window.addEventListener('storage', redirect);

		return () => {
			window.removeEventListener('storage', redirect);
		};
	}, [navigate]);
};
