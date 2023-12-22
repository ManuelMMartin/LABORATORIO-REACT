interface SwitchRoutes {
  root: string
  list: string
  detail: string
  rick: string
}

export const switchRoutes: SwitchRoutes = {
  root: "/",
  list: "/list",
  detail: "/list/detail/:login",
  rick: "/rick",
}