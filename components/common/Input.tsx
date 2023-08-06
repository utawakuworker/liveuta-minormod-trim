'use client';

import { InputHTMLAttributes } from 'react';
import input from '@/components/common/Input.module.scss';
import { GrFormClose } from 'react-icons/gr';
import useInput from '@/hooks/useInput';
import { IoMdMusicalNote } from 'react-icons/io';
import { combineClassName } from '@/utils/combineClassName';

type OriginalInputProps = InputHTMLAttributes<HTMLInputElement>;

interface InputProps extends Omit<OriginalInputProps, 'onSubmit'> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>, inputValue: string) => void;
}

const Input = ({ className = '', onSubmit, type = 'text', value, onChange, ...props }: InputProps) => {
  const { inputValue, resetValue, onChangeValue } = useInput('');

  const handleSubit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e, inputValue);
  };

  return (
    <form onSubmit={handleSubit} className={combineClassName(input['form'], className)}>
      <div>
        <input {...props} type={type} className={input['input']} value={inputValue} onChange={onChangeValue} />
        {inputValue ? (
          <button type="button" onClick={resetValue}>
            <GrFormClose color="inherit" size="1rem" />
          </button>
        ) : null}
        <button type="submit">
          <IoMdMusicalNote color="inherit" size="1.5rem" />
        </button>
      </div>
    </form>
  );
};

export default Input;