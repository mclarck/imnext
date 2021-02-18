/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import style from './style.module.css'
import Bubble, { BubbleType } from '../bubble/Bubble'
import { BiSend } from 'react-icons/bi'
import { IoChatbubbleOutline } from 'react-icons/io5'
import { MdClose } from 'react-icons/md'
import { FaKeyboard } from 'react-icons/fa'

const Header = (props: any) => {
  return (
    <div className={style.header}>
      <div className={style.icon}>
        {props.icon ? props.icon : <IoChatbubbleOutline />}
      </div>
      <div className={style.title}>{props.title}</div>
      <div className={style.actions}>
        <button type='button' className={style.action} onClick={props.onClose}>
          <MdClose />
        </button>
      </div>
    </div>
  )
}

const Body = (props: any) => {
  return (
    <div className={style.body}>
      {props.messages?.map((o: BubbleType, idx: number) => (
        <Bubble key={idx} {...o} onRead={props.onRead} />
      ))}
    </div>
  )
}

const Footer = (props: any) => {
  const field = useRef<any>(null)
  const submit = (e: any) => {
    e.preventDefault()
    props.onSend && props.onSend(field?.current?.value)
    field.current.value = null
  }
  return (
    <form className={style.footer} onSubmit={submit}>
      <div className={style.actions}>
        <button type='button' className={`${style.action} ${style.submit}`}>
          <FaKeyboard />
        </button>
      </div>
      <div className={style.control}>
        <input ref={field} name='message' placeholder={props.placeholder} />
      </div>
      <div className={style.actions}>
        <button className={`${style.action} ${style.submit}`}>
          <BiSend />
        </button>
      </div>
    </form>
  )
}

export type ChatBoxType = {
  title?: any
  icon?: any
  placeholder?: string
  messages?: Array<BubbleType>
  onSend?: (msg?: any) => void
  onClose?: () => void
  onRead?: (id?: string) => void
}
const ChatBox = (props: ChatBoxType) => {
  return (
    <div className={style.chatbox}>
      <Header {...props} />
      <Body {...props} />
      <Footer {...props} />
    </div>
  )
}

export default ChatBox
