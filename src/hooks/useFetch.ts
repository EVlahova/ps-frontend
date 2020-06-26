import { useCallback, useState, useEffect } from "react"
import axiosInstance from "../helpers/axios"

const useFetch = (url: string, params = {}, refetchDeps = []) => {
  const [data, setData] = useState<any>(null)

  const fetch = useCallback(async () => {
    if (url) {
      const res = await axiosInstance.get(url, {
        params,
      })

      setData(res)
    }
  }, [params, url])

  // fetch data when URL is updated
  useEffect(() => {
    fetch()
  }, [url, ...refetchDeps])

  return {
    data,
    refetch: fetch,
  }
}

export default useFetch
