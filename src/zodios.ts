import {
  Zodios,
  ZodiosEndpointDefinitions,
  ZodiosPathsByMethod,
  ZodiosBodyByPath,
  ZodiosRequestOptions,
  ZodiosRequestOptionsByPath,
  ZodiosResponseByPath,
  Method,
} from '@zodios/core'
import { ReadonlyDeep, UndefinedIfNever, RequiredKeys } from '@zodios/core/lib/utils.types'

// @ts-ignore
export class KyZodiosClass<Api extends ZodiosEndpointDefinitions> extends Zodios<Api> {
  request<M extends Method, Path extends string> (
    config: Path extends ZodiosPathsByMethod<Api, M>
      ? ReadonlyDeep<ZodiosRequestOptions<Api, M, Path>>
      : ReadonlyDeep<ZodiosRequestOptions<Api, M, ZodiosPathsByMethod<Api, M>>>
  ): Promise<
    ZodiosResponseByPath<
      Api,
      M,
      Path extends ZodiosPathsByMethod<Api, M> ? Path : never
    >
  > {
    const promise = super.request(config)
    return new KyPromise(resolve => resolve(promise))
  }

  get<
    Path extends ZodiosPathsByMethod<Api, 'get'>,
    TConfig extends ZodiosRequestOptionsByPath<Api, 'get', Path>
  > (
    path: Path,
    ...[config]: RequiredKeys<TConfig> extends never
      ? [config?: ReadonlyDeep<TConfig>]
      : [config: ReadonlyDeep<TConfig>]
  ): Promise<ZodiosResponseByPath<Api, 'get', Path>> {
    const promise = super.get(path, config)
    return new KyPromise(resolve => resolve(promise))
  }

  post<
    Path extends ZodiosPathsByMethod<Api, 'post'>,
    TBody extends ReadonlyDeep<
      UndefinedIfNever<ZodiosBodyByPath<Api, 'post', Path>>
    >,
    TConfig extends ZodiosRequestOptionsByPath<Api, 'post', Path>
  > (
    path: Path,
    data: TBody,
    ...[config]: RequiredKeys<TConfig> extends never
      ? [config?: ReadonlyDeep<TConfig>]
      : [config: ReadonlyDeep<TConfig>]
  ): Promise<ZodiosResponseByPath<Api, 'post', Path>> {
    const promise = super.post(path, data, config)
    return new KyPromise(resolve => resolve(promise))
  }

  put<
    Path extends ZodiosPathsByMethod<Api, 'put'>,
    TBody extends ReadonlyDeep<
      UndefinedIfNever<ZodiosBodyByPath<Api, 'put', Path>>
    >,
    TConfig extends ZodiosRequestOptionsByPath<Api, 'put', Path>
  > (
    path: Path,
    data: TBody,
    ...[config]: RequiredKeys<TConfig> extends never
      ? [config?: ReadonlyDeep<TConfig>]
      : [config: ReadonlyDeep<TConfig>]
  ): Promise<ZodiosResponseByPath<Api, 'put', Path>> {
    const promise = super.put(path, data, config)
    return new KyPromise(resolve => resolve(promise))
  }

  patch<
    Path extends ZodiosPathsByMethod<Api, 'patch'>,
    TBody extends ReadonlyDeep<
      UndefinedIfNever<ZodiosBodyByPath<Api, 'patch', Path>>
    >,
    TConfig extends ZodiosRequestOptionsByPath<Api, 'patch', Path>
  > (
    path: Path,
    data: TBody,
    ...[config]: RequiredKeys<TConfig> extends never
      ? [config?: ReadonlyDeep<TConfig>]
      : [config: ReadonlyDeep<TConfig>]
  ): Promise<ZodiosResponseByPath<Api, 'patch', Path>> {
    const promise = super.patch(path, data, config)
    return new KyPromise(resolve => resolve(promise))
  }

  delete<
    Path extends ZodiosPathsByMethod<Api, 'delete'>,
    TBody extends ReadonlyDeep<
      UndefinedIfNever<ZodiosBodyByPath<Api, 'delete', Path>>
    >,
    TConfig extends ZodiosRequestOptionsByPath<Api, 'delete', Path>
  > (
    path: Path,
    data: TBody,
    ...[config]: RequiredKeys<TConfig> extends never
      ? [config?: ReadonlyDeep<TConfig>]
      : [config: ReadonlyDeep<TConfig>]
  ): Promise<ZodiosResponseByPath<Api, 'delete', Path>> {
    const promise = super.delete(path, data, config)
    return new KyPromise(resolve => resolve(promise))
  }
}

export const KyZodios = KyZodiosClass

class KyPromise<T> extends Promise<T> {
  arrayBuffer (): Promise<ArrayBuffer> {
    return this.then((request: any) => Promise.resolve(request.arrayBuffer()))
  }

  blob (): Promise<Blob> {
    return this.then((request: any) => Promise.resolve(request.blob()))
  }

  formData (): Promise<FormData> {
    return this.then((request: any) => Promise.resolve(request.formData()))
  }

  json (): Promise<unknown> {
    return this.then((request: any) => Promise.resolve(request.json()))
  }

  text (): Promise<string> {
    return this.then((request: any) => Promise.resolve(request.text()))
  }
}
