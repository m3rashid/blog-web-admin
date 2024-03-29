import { useState } from 'react'

import { INotifState, useNotification } from 'hooks/useNotification'
import { instance } from 'helpers/instance'

interface IProps {
  body: any
  endpoint: string
  errorMsg?: INotifState
  successMsg?: INotifState
}

const useHttp = (id: string) => {
  const [loading, setLoading] = useState(false)
  const { loadingNotif, updateFailureNotif, updateSuccessNotif } =
    useNotification({ id })

  const request = async ({ body, endpoint, successMsg, errorMsg }: IProps) => {
    try {
      setLoading(true)
      loadingNotif()
      const token = window.localStorage.getItem('cubicle-token') || ''
      const res = await instance.post(endpoint, body, {
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: token } : {}),
        },
      })
      if (!res) {
        throw new Error('No response from the server')
      }
      setLoading(false)
      if (successMsg) updateSuccessNotif({ successMsg })
      else updateSuccessNotif({})
      return { data: res.data }
    } catch (err: any) {
      // console.log(err)
      setLoading(false)

      if (errorMsg) updateFailureNotif({ errorMsg })
      else updateFailureNotif({})

      return { data: null }
    }
  }

  return {
    loading,
    setLoading,
    request,
  }
}

export default useHttp
