import { InjectionKey, Ref } from 'vue';

export const azimuthKey = Symbol('azimuth') as InjectionKey<Ref<number>>;
