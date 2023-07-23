import React, { ChangeEvent, FC, ReactNode, useEffect, useState } from "react";
import styled from "styled-components";

type PropsType = {
  onChange(value: string): void;
  styles: { [key: string]: string };
  placeholder: string;
  children?: ReactNode;
};

export const SearchInput: FC<PropsType> = ({ onChange, styles, placeholder, children }) => {
  const [value, setValue] = useState<string>("");
  const [timerId, setTimerId] = useState<number | null>(null);

  const onSetValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId);
    }
    setTimerId(
      +setTimeout(() => {
        onChange(value);
      }, 1000),
    );
  }, [value]);

  return (
    <>
      <Input style={styles} type="text" value={value} onChange={onSetValue} placeholder={placeholder} />
      {children}
    </>
  );
};

const Input = styled.input`
  &::placeholder {
    font-size: 14px;
    font-weight: var(--font-weight-regular);
    color: #b2b7bf;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;
