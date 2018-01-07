import { Store } from 'vuex';

let STORE: Store<any>;

function findGetter(getterName: string) {
  let getter = STORE.getters[getterName];

  if (getter === void 0) {
    throw new Error(`Getter ${getterName} not found!`);
  }

  return getter;
}

function findAction(actionName: string) {
  return async function (payload: any) {
    // 当payload为undefined时可能会导致无法正确dispatch，
    // 故补充默认值
    return await STORE.dispatch(actionName, payload || {});
  };
}

export function open(store: Store<any>): void {
  if (STORE !== void 0) {
    throw new Error('Store has opened.');
  }
  STORE = store;
}

export function mapGetter(getterName: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.get = () => findGetter(getterName);
  };
}

export function mapAction(actionName: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value = async (payload: any) => await findAction(actionName)(payload);
  };
}