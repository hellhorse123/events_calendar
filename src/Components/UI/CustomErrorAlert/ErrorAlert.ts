import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const ErrorAlert: () => void = () => {
  confirmAlert({
    title: 'Пустые поля',
    message: 'Проверьте ваши поля на заполненность',
    buttons: [
      {
        label: 'Закрыть',
        onClick: (): void => console.log('Click'),
      },
    ],
  });
};
