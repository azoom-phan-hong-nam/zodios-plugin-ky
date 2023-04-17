import { AxiosInstance } from 'axios'
import ky from 'ky-universal'
import { AnyZodiosRequestOptions, PluginId, ZodiosEndpointDefinitions, ZodiosPlugin } from '@zodios/core'
import { Aliases, ZodiosAliases } from '@zodios/core/lib/zodios.types'
import { Merge, Narrow, PickRequired, ReadonlyDeep, RequiredKeys, UndefinedIfNever } from '@zodios/core/lib/utils.types'

declare class KyZodiosClass<Api extends ZodiosEndpointDefinitions> {
  private axiosInstance
  readonly options: PickRequired<ZodiosOptions, 'validate' | 'transform' | 'sendDefaults'>
  readonly api: Api
  private endpointPlugins
  constructor(api: Narrow<Api>, options?: ZodiosOptions);
  constructor(baseUrl: string, api: Narrow<Api>, options?: ZodiosOptions);
  private initPlugins
  private getAnyEndpointPlugins
  private findAliasEndpointPlugins
  private findEnpointPlugins
  /**
   * get the base url of the api
   */
  get baseURL(): string | undefined;
  /**
   * get the underlying axios instance
   */
  get axios(): AxiosInstance;
  /**
   * register a plugin to intercept the requests or responses
   * @param plugin - the plugin to use
   * @returns an id to allow you to unregister the plugin
   */
  use(plugin: ZodiosPlugin): PluginId;
  use<Alias extends Aliases<Api>>(alias: Alias, plugin: ZodiosPlugin): PluginId;
  use<M extends Method, Path extends ZodiosPathsByMethod<Api, M>>(method: M, path: Path, plugin: ZodiosPlugin): PluginId;
  /**
   * unregister a plugin
   * if the plugin name is provided instead of the registration plugin id,
   * it will unregister the plugin with that name only for non endpoint plugins
   * @param plugin - id of the plugin to remove
   */
  eject(plugin: PluginId | string): void;
  private injectAliasEndpoints
  /**
   * make a request to the api
   * @param config - the config to setup zodios options and parameters
   * @returns response validated with zod schema provided in the api description
   */
  request<M extends Method, Path extends string>(config: Path extends ZodiosPathsByMethod<Api, M> ? ReadonlyDeep<ZodiosRequestOptions<Api, M, Path>> : ReadonlyDeep<ZodiosRequestOptions<Api, M, ZodiosPathsByMethod<Api, M>>>): Promise<ZodiosResponseByPath<Api, M, Path extends ZodiosPathsByMethod<Api, M> ? Path : never>>;
  /**
   * make a get request to the api
   * @param path - the path to api endpoint
   * @param config - the config to setup axios options and parameters
   * @returns response validated with zod schema provided in the api description
   */
  get<Path extends ZodiosPathsByMethod<Api, 'get'>, TConfig extends ZodiosRequestOptionsByPath<Api, 'get', Path>>(path: Path, ...[config]: RequiredKeys<TConfig> extends never ? [config?: ReadonlyDeep<TConfig>] : [config: ReadonlyDeep<TConfig>]): Promise<ZodiosResponseByPath<Api, 'get', Path>>;
  /**
   * make a post request to the api
   * @param path - the path to api endpoint
   * @param data - the data to send
   * @param config - the config to setup axios options and parameters
   * @returns response validated with zod schema provided in the api description
   */
  post<Path extends ZodiosPathsByMethod<Api, 'post'>, TBody extends ReadonlyDeep<UndefinedIfNever<ZodiosBodyByPath<Api, 'post', Path>>>, TConfig extends ZodiosRequestOptionsByPath<Api, 'post', Path>>(path: Path, data: TBody, ...[config]: RequiredKeys<TConfig> extends never ? [config?: ReadonlyDeep<TConfig>] : [config: ReadonlyDeep<TConfig>]): Promise<ZodiosResponseByPath<Api, 'post', Path>>;
  /**
   * make a put request to the api
   * @param path - the path to api endpoint
   * @param data - the data to send
   * @param config - the config to setup axios options and parameters
   * @returns response validated with zod schema provided in the api description
   */
  put<Path extends ZodiosPathsByMethod<Api, 'put'>, TBody extends ReadonlyDeep<UndefinedIfNever<ZodiosBodyByPath<Api, 'put', Path>>>, TConfig extends ZodiosRequestOptionsByPath<Api, 'put', Path>>(path: Path, data: TBody, ...[config]: RequiredKeys<TConfig> extends never ? [config?: ReadonlyDeep<TConfig>] : [config: ReadonlyDeep<TConfig>]): Promise<ZodiosResponseByPath<Api, 'put', Path>>;
  /**
   * make a patch request to the api
   * @param path - the path to api endpoint
   * @param data - the data to send
   * @param config - the config to setup axios options and parameters
   * @returns response validated with zod schema provided in the api description
   */
  patch<Path extends ZodiosPathsByMethod<Api, 'patch'>, TBody extends ReadonlyDeep<UndefinedIfNever<ZodiosBodyByPath<Api, 'patch', Path>>>, TConfig extends ZodiosRequestOptionsByPath<Api, 'patch', Path>>(path: Path, data: TBody, ...[config]: RequiredKeys<TConfig> extends never ? [config?: ReadonlyDeep<TConfig>] : [config: ReadonlyDeep<TConfig>]): Promise<ZodiosResponseByPath<Api, 'patch', Path>>;
  /**
   * make a delete request to the api
   * @param path - the path to api endpoint
   * @param config - the config to setup axios options and parameters
   * @returns response validated with zod schema provided in the api description
   */
  delete<Path extends ZodiosPathsByMethod<Api, 'delete'>, TBody extends ReadonlyDeep<UndefinedIfNever<ZodiosBodyByPath<Api, 'delete', Path>>>, TConfig extends ZodiosRequestOptionsByPath<Api, 'delete', Path>>(path: Path, data: TBody, ...[config]: RequiredKeys<TConfig> extends never ? [config?: ReadonlyDeep<TConfig>] : [config: ReadonlyDeep<TConfig>]): Promise<ZodiosResponseByPath<Api, 'delete', Path>>;
}
type KyZodiosInstance<Api extends ZodiosEndpointDefinitions> = KyZodiosClass<Api> & ZodiosAliases<Api>;
type KyZodiosConstructor = {
  new <Api extends ZodiosEndpointDefinitions>(api: Narrow<Api>, options?: ZodiosOptions): KyZodiosInstance<Api>;
  new <Api extends ZodiosEndpointDefinitions>(baseUrl: string, api: Narrow<Api>, options?: ZodiosOptions): KyZodiosInstance<Api>;
};
declare const KyZodios: KyZodiosConstructor

type KyPluginOptions = {
  kyInstance?: typeof ky;
}
type KyAnyZodiosRequestOptions = Merge<{
  endpoint?: ZodiosEndpoint;
}, KyPluginOptions, AnyZodiosRequestOptions>;

interface KyZodiosPlugin extends ZodiosPlugin {
  request?: (api: ZodiosEndpointDefinitions, config: ReadonlyDeep<AnyZodiosRequestOptions>) => Promise<ReadonlyDeep<KyAnyZodiosRequestOptions>>;
}

declare function KyPlugin(option: KyPluginOptions): KyZodiosPlugin;
