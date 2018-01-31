1. bindActionCreators(actionCreators, dispatch)
  > 一般情况下可以直接在Store实例上调用dispatch.
  如果在react中使用redux，react-redux会提供dispatch
  唯一使用bindActionCreators的场景是当你需要把action creator往下传到一个组件上，却不想让这个组件察觉到Redux的存在，
  而且不希望Redux store 或dispatch传给它
