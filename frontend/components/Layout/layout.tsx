import {FC} from 'react'
import style from './layout.module.scss'


export const Layout: FC<{}> = ({children}) => {
  return (
    <div className={style.layout}>
      {children}
    </div>)
}
