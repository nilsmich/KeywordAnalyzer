import {ChangeEvent, FC, useEffect, useState} from 'react'
import style from './textarea.module.scss'

interface ITextarea {
  value: string
}


export const Textarea: FC<ITextarea> = ({value}) => {
  const [text, setText] = useState(value)

  useEffect(() => {
    setText(value)
  }, [value])

  // todo: better useMomo

  const onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void = (event) => {
    setText(event.target.value)
  }

  return (
    <form>
      <textarea value={text} onChange={onChange} className={style.textarea} />
    </form>
  )
}
