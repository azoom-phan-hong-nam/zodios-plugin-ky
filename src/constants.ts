// Reference: https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#instance_properties
// Not contain experimental properties
const FETCH_REQUEST_INIT_OPTIONS = [
  'cache',
  'credentials',
  'headers',
  'integrity',
  'keepalive',
  'method',
  'mode',
  'priority',
  'redirect',
  'referrer',
  'referrerPolicy',
  'signal',
]

// Reference: https://github.com/sindresorhus/ky#options
const KY_REQUEST_OPTIONS = [
  'method',
  'json',
  'searchParams',
  'prefixUrl',
  'retry',
  'timeout',
  'hooks',
  'throwHttpErrors',
  'onDownloadProgress',
  'parseJson',
  'stringifyJson',
  'fetch'
]

export const KY_REQUEST_EXTEND_OPTIONS = Array.from(new Set(FETCH_REQUEST_INIT_OPTIONS.concat(KY_REQUEST_OPTIONS)))
