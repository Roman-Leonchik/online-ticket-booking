import type { Route } from 'next';

export interface NavItem {
  label: string;
  href: Route;
}

export interface TimeItem {
  time: string;
  href: Route;
}

export interface ViewItem {
  text?: string;
  href: Route;
}
