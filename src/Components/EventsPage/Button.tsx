import React from 'react';
import Button from '@mui/material/Button';
interface MyButtonProps {
  value: string;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const MyButton: (props: MyButtonProps) => JSX.Element = (props: MyButtonProps) => {
  const onClickHandler: () => void = () => {
    props.setSelectedFilter(props.value);
  };

  return (
    <div style={{ color: props.selectedFilter === props.value ? '#252525' : '#AAADB2' }}>
      <Button
        onClick={(): void => onClickHandler()}
        color="inherit"
        style={{
          textTransform: 'none',
          marginRight: 20,
          fontSize: 18,
          fontWeight: props.selectedFilter === props.value ? 'bold' : 'normal',
        }}
      >
        {props.value === 'business'
          ? props.value.replace('business', 'Бизнес')
          : props.value === 'development'
          ? props.value.replace('development', 'Разработка')
          : props.value === 'design'
          ? props.value.replace('design', 'Дизайн')
          : props.value === 'management'
          ? props.value.replace('management', 'Управление')
          : props.value === 'analytic'
          ? props.value.replace('analytic', 'Аналитика')
          : props.value}
      </Button>
    </div>
  );
};

export default MyButton;
