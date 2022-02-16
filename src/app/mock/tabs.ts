import { IIdName } from '../model/id-name.inferface';

export let tabs: IIdName[] = [
  { id: 0, name: 'Btc' },
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Sol' },
  { id: 3, name: 'Eth' },
  { id: 4, name: 'One' },
];

export function addTab(newTab: IIdName) {
  tabs = [...tabs, { id: tabs.length, name: newTab.name }];
}

export function deleteTab(selectedTabName: string) {
  console.log('selectedTabName', selectedTabName)
  tabs = tabs.filter(value => value.name !== selectedTabName);
}
