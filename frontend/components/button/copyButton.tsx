import {FC} from 'react'
import {copyToClipboard} from '../../helper'
import style from './copyButton.module.scss'

interface ICopyButton {
  textToCopy: string
}


export const CopyButton: FC<ICopyButton> = ({textToCopy}) => {

  return (
    <button className={style.copyButton} onClick={() => {
      console.log('textToCopy', textToCopy)
      copyToClipboard(textToCopy)
    }}>

      <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.2949 15.7893H8.59364C7.36747 15.7893 6.37793 14.7947 6.37793 13.5623V3.22705C6.37793 1.9946 7.36747 1 8.59364 1H16.3164C17.5425 1 18.5321 1.9946 18.5321 3.22705V13.5839C18.5106 14.7947 17.521 15.7893 16.2949 15.7893Z"
          stroke-miterlimit="10"></path>
        <path
          d="M11.1966 20.9997H3.34478C2.05408 20.9997 1 19.9402 1 18.6429V7.35629C1 6.05898 2.05408 4.99951 3.34478 4.99951H11.1966C12.4873 4.99951 13.5414 6.05898 13.5414 7.35629V18.6645C13.5414 19.9402 12.4873 20.9997 11.1966 20.9997Z"
          fill="white" stroke-miterlimit="10"></path>
      </svg>
    </button>
  )
}
