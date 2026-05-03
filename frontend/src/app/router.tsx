import * as React from 'react';
import { UsersPage } from '../features/users/components/users_page';
import { HelloContentPage } from '../features/hello_content/components/hello_content_page';
import { HomePage } from '../features/home/components/home_page';

export type RouteMetadata = {
  Component: React.ComponentType<{ group: string; title: string }>;
  group: string;
  title: string;
};

export const routes: Record<string, RouteMetadata> = {
  'home': {
    Component: HomePage as any,
    group: 'Workspace',
    title: 'Home'
  },
  'users': {
    Component: UsersPage as any,
    group: 'Management',
    title: 'Users'
  },
  'hello-content': {
    Component: HelloContentPage as any,
    group: 'Workspace',
    title: 'Hello Content'
  },
} as const;

export type RoutePath = keyof typeof routes;
