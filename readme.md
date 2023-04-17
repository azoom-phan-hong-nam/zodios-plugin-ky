# Ky plugin for Zodios

This is a simple plugin for [Zodios](https://github.com/ecyrbe/zodios) that allows you to use [Ky](https://github.com/sindresorhus/ky) as a HTTP client.

## How to use
    
    ```js
    import ky from 'ky-universal'
    import { KyZodios, KyPlugin } from '@phongnd39/zodios-plugin-ky'
    
    const apiClient = new KyZodios('apiUrl', 'zodiosApiDefinition', { ...zodiosOptions })
    apiClient.use(KyPlugin({ kyInstance: ky.create({ ...kyOption }) }))
    apiClient.get('endpoint', { ...params }).json() // or other ky methods
    ```

## Options

### kyInstance
The Ky instance to use. If not provided, the default Ky instance will be used.
