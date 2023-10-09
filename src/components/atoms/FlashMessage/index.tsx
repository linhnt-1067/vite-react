import { useEffect } from 'react';
import { App } from 'antd';

import { useAppDispatch, useAppSelector } from '@/hooks/customReduxHooks';
import { flashMessageSelector } from '@/stores/app/selectors';
import { MessageStatus } from '@/enums/common';
import { resetFlashMessage } from '@/stores/app/appSlice';

const FlashMessage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { message, status } = useAppSelector(flashMessageSelector);
  const { message: antdMessage } = App.useApp();

  useEffect(() => {
    if (message) {
      antdMessage[status ?? MessageStatus.SUCCESS]?.({
        content: message,
        onClose: () => dispatch(resetFlashMessage()),
      });
    }
  }, [antdMessage, dispatch, message, status]);

  return null;
};

export default FlashMessage;
