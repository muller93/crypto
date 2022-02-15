import { IIdName } from '../model/id-name.inferface';

export let tabs: IIdName[] = [
  { id: 0, name: 'Btc' },
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Sol' },
  { id: 3, name: 'Eth' },
  { id: 4, name: 'One' },
];

export function setTabs(newTab: IIdName) {
  console.log('this.tabs', tabs)

  tabs = [...tabs, newTab];
}
