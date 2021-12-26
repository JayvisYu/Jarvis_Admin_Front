const getters = {
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    token: state => state.user.state,
    name: state => state.user.name,
    avatar: state => state.user.avatar,
    email: state => state.user.email,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles,
    errorLogs: state => state.errorLog.logs,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    permission_routes: state => state.permission.routes,
}
export default getters
