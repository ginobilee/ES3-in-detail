```mermaid
sequenceDiagram
    participant A as ReactDom.render
    participant B as legacyCreateRootFromDOMContainer
    participant C as (ReactRoot)root.render
    participant D as DOMRenderer

    A->>B: 
    NOTE over B: new ReactRoot(container, isConcurrent, shouldHydrate)

    B->>A: return root
    A->>C: 
    C->>D: 
    NOTE over D: updateContainer
    
    A->>D: 
    NOTE over D: getPublicRootInstance
```

```mermaid
sequenceDiagram
    participant A as updateContainer
    participant B as scheduleRootUpdate

    A->>B:  A
    
```

```javascript
updateContainer
export function DOMRender.getPublicRootInstance = function(
  container: OpaqueRoot,
): React$Component<any, any> | PublicInstance | null {
  const containerFiber = container.current;
  if (!containerFiber.child) {
    return null;
  }
  switch (containerFiber.child.tag) {
    case HostComponent:
      return getPublicInstance(containerFiber.child.stateNode);
    default:
      return containerFiber.child.stateNode;
  }
}
```

    alt 普通商户
      B->>C: generateTradeAppPayReqArgs
      activate C
      NOTE right of C: 微信侧下单
      C->>A: 返回客户端请求参数
      deactivate C
    else 特约商户
      B->>C: generateProviderAppPayReqArgs
      activate C
      NOTE right of C: 微信侧下单
      C->>A: 返回客户端请求参数
      deactivate C
    end