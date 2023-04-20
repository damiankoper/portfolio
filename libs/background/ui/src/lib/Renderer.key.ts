import { RendererPublicInterface } from 'troisjs';
import { InjectionKey, Ref } from 'vue';

export const rendererKey = Symbol('renderer') as InjectionKey<
  Ref<RendererPublicInterface | undefined>
>;
