import {ChangeEvent, FC, useEffect, useState} from 'react'
import style from './textarea.module.scss'

interface ITextarea {
  value: string
  onChange: (text: string) => void
}


export const Textarea: FC<ITextarea> = ({value, onChange}) => {
  const [text, setText] = useState(value)

  useEffect(() => {
    setText(value)
  }, [value])

  // todo: better useMomo

  const updateText: (event: ChangeEvent<HTMLTextAreaElement>) => void = (event) => {
    setText(event.target.value)
    onChange(event.target.value)
  }

  return (
    <form>
      <textarea value={text} onChange={updateText} className={style.textarea} />
    </form>
  )
}
