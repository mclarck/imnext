import React from 'react'
import style from './style.module.css'

const Avatar = (props: any) => {
  return (
    <button className={style.avatar}>
      <img src={props.img || 'https://picsum.photos/100/100'} alt='avatar' />
    </button>
  )
}

export default Avatar
