import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUserMsg } from './../store/actions/tasksActions'

export const UserMsg = () => {
  const { userMsg } = useSelector((state) => state.tasksModule)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userMsg.msg) return
    setTimeout(() => removeUserMsg(), 3000)
  }, [userMsg])

  const removeUserMsg = () => {
    dispatch(setUserMsg('', ''))
  }

  return (
    <>
      {userMsg.msg && (
        <section className={userMsg.type + ' user-msg'}>{userMsg.msg}</section>
      )}
    </>
  )
}
