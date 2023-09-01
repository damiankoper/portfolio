import { Ref, InjectionKey } from 'vue';

export const azimuthKey = Symbol('azimuth') as InjectionKey<Ref<number>>;
