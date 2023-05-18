import ky from 'ky-universal'
import { AxiosError } from 'axios'
import { match } from 'path-to-regexp'
import { KyPluginOptions, KyZodiosPlugin} from '../index'

export function KyPlugin (options?: KyPluginOptions): KyZodiosPlugin {
  return {
    name: 'ky',
    request: async (api, config) => {
      const endpoint = api.find(endpoint => {
        const urlMatchFn = match(endpoint.path)
        const checkUrl = `/${config.url.replace(/^\//, '')}`

        return urlMatchFn(checkUrl) && endpoint.method === config.method
      })

      return {
        transformRequest: [(data: any) => data],
        ...config,
        ...options,
        endpoint,
        adapter: kyAdapter
      }
    }
  }
}

export async function kyAdapter (config: any): Promise<any> {
  const { kyInstance, url, kyConfig } = prepareKyRequest(config)
  try {
    const response = await kyInstance(url, kyConfig)
    return formatResponse(config, response)
  } catch (error: any) {
    const headers: { [index: string]: any} = {}
    error.response?.headers.forEach((value:string, name:string) => {
      headers[name.toLowerCase()] = value
    })

    throw new AxiosError(
      error.message,
      AxiosError.ERR_NETWORK,
      config,
      error.request,
      {
        config,
        headers,
        request: error.request,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: await error.response?.json()
      }
    )
  }
}

function prepareKyRequest (config: any) {
  return {
    kyConfig: prepareKyRequestConfig(config),
    kyInstance: config.kyInstance || ky.create({}),
    url: config.url.replace(/^\//, '')
  }
}

function prepareKyRequestConfig (config: any) {
  return {
    method: config.method,
    searchParams: config.searchParams,
    headers: formatRequestHeaders(config),
    ...formatRequestPayload(config)
  }
}

function formatRequestHeaders (config: any) {
  const { endpoint, headers, data } = config
  if (endpoint && endpoint.requestFormat !== 'json') {
    delete headers['Content-Type']
  }

  if (headers['Content-Type']?.includes('application/x-www-form-urlencoded') && endpoint && (!endpoint.requestFormat || endpoint.requestFormat === 'json')) {
    delete headers['Content-Type']
  }

  if (isFormData(data) || isBlob(data) || isFile(data) || isSearchParams(data)) {
    delete headers['Content-Type']
  }

  return headers
}

function formatRequestPayload (config: any) {
  const { data } = config

  if (isFormData(data) || isBlob(data) || isFile(data) || isSearchParams(data)) {
    return { body: data }
  }

  return { json: data }
}

function formatResponse (config: any, response: Response) {
  const headers: { [index: string]: any} = {}
  response.headers.forEach((value:string, name:string) => {
    headers[name.toLowerCase()] = value
  })
  return {
    headers,
    config,
    status: response.status,
    statusText: response.statusText,
    data: response
  }
}

function isFormData (data:any) {
  return isKindOf('FormData')(data)
}

function isBlob (data:any) {
  return isKindOf('Blob')(data)
}

function isFile (data:any) {
  return isKindOf('File')(data)
}

function isSearchParams (data:any) {
  return isKindOf('URLSearchParams')(data)
}

function isKindOf (kind:string) {
  return (data: any): boolean => {
    const pattern = `[object ${kind}]`
    return data && (toString.call(data) === pattern ||
      (typeof data.toString === 'function' && data.toString() === pattern))
  }
}
