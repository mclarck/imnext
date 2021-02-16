import React from 'react'
import style from './style.module.css'

export type AvatarProps = {
  img?: string
  onClick?: () => void
  size?: string
}

const Avatar = (props: AvatarProps) => {
  return (
    <button
      type='button'
      className={`${style.avatar} ${style[props.size] || ''}`}
      onClick={props.onClick}
    >
      <img src={props.img || 'https://picsum.photos/50/50'} alt='avatar' />
    </button>
  )
}

export default Avatar
