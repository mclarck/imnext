import React, { useEffect, useRef } from 'react'
import { BiCheck, BiCheckDouble } from 'react-icons/bi'
import Avatar from '../avatar/Avatar'
import style from './style.module.scss'
export type BubbleType = {
  isSender?: boolean
  id?: string
  sender?: {
    img?: string
    username?: string
    phone?: string
    email?: string
    uuid?: string
    room?: string
  }
  status?: any
  created?: string
  locale?: string
  content?: any
  onRead?: (msg: { id?: string; sender?: any; status?: string }) => void
}
const Bubble = (props: BubbleType) => {
  const ref = useRef<HTMLElement | any>()
  useEffect(() => {
    ref.current.scrollIntoView(false)
    props.onRead && props.onRead(props)
  }, [props.content])
  return (
    <div
      ref={ref}
      className={`${style.bubble} ${props.isSender ? style.right : ''}`}
    >
      <div className={style.header}>
        {props.sender?.img && <Avatar img={props.sender?.img} />}
        {props.sender?.username && (
          <div className={style.name}>
            {props.sender?.username ||
              props.sender?.phone ||
              props.sender?.email ||
              props.sender?.uuid}
          </div>
        )}
      </div>
      <div className={style.body}>
        <div className={style.content}>{props.content}</div>
      </div>
      <div className={style.footer}>
        <div className={style.left}>
          <div className={style.date}>{props.created}</div>
          <div className={style.status}>
            {props.status === 'read' ? <BiCheckDouble /> : <BiCheck />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Bubble
