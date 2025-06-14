import React from 'react'

type Props = {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function InputArea({ text, onChange, onClick }: Props) {
  return (
    <>
      <input
          type="text"
          className="border"
          onChange={onChange}
          value={text}
        />
        <button onClick={onClick}>送信</button>
    </>
  )
}

export default InputArea