import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import styled from "styled-components";

type PropsType = {
    onChange(value: string): void
    styles: { [key: string]: string }
    placeholder: string
}

export const SearchInput: FC<PropsType> = ({onChange, styles, placeholder}) => {
    const [value, setValue] = useState<string>('')
    const [timerId, setTimerId] = useState<number | null>(null)

    const onSetValue = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
    }


    useEffect(() => {
        if (timerId) {
            clearTimeout(timerId);
        }
        setTimerId(+setTimeout(() => {
            onChange(value);
        }, 1000))
    }, [value])

    return (
        <Input style={styles} type="text" value={value} onChange={onSetValue} placeholder={placeholder}/>
    );
};

const Input = styled.input`
  &::placeholder {
    font-size: 14px;
    font-weight: 400;
    color: #B2B7BF;
  }
  &:focus::placeholder {
    color: transparent;
  }
`