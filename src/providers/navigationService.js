import * as React from 'react';
import {
  StackActions,
  NavigationContainerRef, NavigationAction
} from '@react-navigation/native';

export const navigationRef:
  React.RefObject<NavigationContainerRef> = React.createRef();
export const isReadyRef:
  React.RefObject<NavigationContainerRef> = React.createRef();
// export const navigation = navigationRef.current
export function navigate(name: string, params?: object): void {
  navigationRef.current ?.navigate(name, params);
}
export function dispatch(action: NavigationAction): void {
  navigationRef.current ?.dispatch(action);
}
export function replace(name: string, params?: object): void {
  navigationRef.current ?.dispatch(StackActions.replace(name, params));
}
export function push(name: string, params?: object): void {
  navigationRef.current ?.dispatch(StackActions.push(name, params));
}
export function goBack(): void {
  navigationRef.current ?.goBack();
}
export function pop(name?: String): void {
  console.log("navigationRef.current", navigationRef.current.getParent())
  // name?navigate(name):goBack();
}
export const navigation = {
  navigate,
  dispatch,
  replace,
  push,
  goBack,
  pop
}