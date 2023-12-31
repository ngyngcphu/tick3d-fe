type RouteItem = {
  name: string;
  type: 'item';
  path: string;
  pathReplace?: string;
  element: React.ReactElement;
  elementReplace?: React.ReactElement;
};

type LogoutBtn = {
  name: string;
  type: 'logout-btn';
  onClick: () => void;
};

type RouteSkeleton = {
  name: string;
  type: 'skeleton';
  path: string;
  pathReplace?: string;
  element: React.ReactElement;
  elementReplace?: React.ReactElement;
};

type RouteMenuItem = RouteItem | RouteSkeleton | LogoutBtn | 'divider';

type RouteMenu = RouteMenuItem[];

type RouteChildItem = {
  path: string;
  element: React.ReactElement;
};

type RouteChild = RouteChildItem[];
