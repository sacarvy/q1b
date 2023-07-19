"use strict";
exports.id = 861;
exports.ids = [861];
exports.modules = {

/***/ 5924:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ useTree)
/* harmony export */ });
/* unused harmony exports A, B, C, G, L, R, a, b, c, d, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w */
/* harmony import */ var _ts_gql_tag_no_transform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(76772);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_677addd9_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9583);
/* harmony import */ var lru_cache__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(48736);
/* harmony import */ var emery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(85916);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(496);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(52072);










const RouterContext = /*#__PURE__*/(/* unused pure expression or super */ null && (createContext(null)));
function RouterProvider(props) {
  return /*#__PURE__*/jsx(RouterContext.Provider, {
    value: props.router,
    children: props.children
  });
}
function useRouter() {
  const router = useContext(RouterContext);
  if (router == null) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return router;
}

const LOADING = Symbol('loading');
function isThenable(value) {
  return value && typeof value.then === 'function';
}
function useData(func) {
  const [state, setState] = useState({
    kind: 'loading'
  });
  let stateToReturn = state;
  const result = useMemo(() => {
    try {
      const result = func();
      return {
        kind: 'result',
        result
      };
    } catch (error) {
      return {
        kind: 'error',
        error: error
      };
    }
  }, [func]);
  const resultState = useMemo(() => {
    if (result.kind === 'error' && (state.kind !== 'error' || state.error !== result.error)) {
      return {
        kind: 'error',
        error: result.error
      };
    }
    if (result.kind === 'result' && !isThenable(result.result) && result.result !== LOADING && (state.kind !== 'loaded' || state.data !== result.result)) {
      return {
        kind: 'loaded',
        data: result.result
      };
    }
  }, [result, state]);
  if (resultState && resultState !== state) {
    stateToReturn = resultState;
    setState(resultState);
  }
  useEffect(() => {
    if (result.kind === 'result' && isThenable(result.result)) {
      setState({
        kind: 'loading'
      });
      let isActive = true;
      result.result.then(result => {
        if (result === LOADING || !isActive) return;
        setState({
          kind: 'loaded',
          data: result
        });
      }, error => {
        if (!isActive) return;
        setState({
          kind: 'error',
          error
        });
      });
      return () => {
        isActive = false;
      };
    }
  }, [result]);
  return stateToReturn;
}
function mergeDataStates(input) {
  const entries = Object.entries(input);
  for (const [, value] of entries) {
    if (value.kind === 'error') {
      return {
        kind: 'error',
        error: value.error
      };
    }
  }
  for (const [, value] of entries) {
    if (value.kind === 'loading') {
      return {
        kind: 'loading'
      };
    }
  }
  return {
    kind: 'loaded',
    data: Object.fromEntries(entries.map(_ref => {
      let [key, val] = _ref;
      return [key, val.data];
    }))
  };
}

const storedTokenSchema = zod__WEBPACK_IMPORTED_MODULE_6__.z.object({
  token: zod__WEBPACK_IMPORTED_MODULE_6__.z.string(),
  validUntil: zod__WEBPACK_IMPORTED_MODULE_6__.z.number().transform(val => new Date(val))
});
function getSyncAuth(config) {
  if (typeof document === 'undefined') {
    return null;
  }
  if (config.storage.kind === 'github') {
    const cookies = parse(document.cookie);
    const accessToken = cookies['keystatic-gh-access-token'];
    if (!accessToken) {
      return null;
    }
    return {
      accessToken
    };
  }
  if (config.storage.kind === 'cloud') {
    const unparsedTokenData = localStorage.getItem('keystatic-cloud-access-token');
    let tokenData;
    try {
      tokenData = storedTokenSchema.parse(JSON.parse(unparsedTokenData));
    } catch (err) {
      return null;
    }
    if (!tokenData || tokenData.validUntil < new Date()) {
      return null;
    }
    return {
      accessToken: tokenData.token
    };
  }
  return null;
}
async function getAuth(config) {
  const token = getSyncAuth(config);
  if (config.storage.kind === 'github' && !token) {
    try {
      const res = await fetch('/api/keystatic/github/refresh-token', {
        method: 'POST'
      });
      if (res.status === 200) {
        const cookies = parse(document.cookie);
        const accessToken = cookies['keystatic-gh-access-token'];
        if (accessToken) {
          return {
            accessToken
          };
        }
      }
    } catch {}
    return null;
  }
  return token;
}

const SidebarFooter_viewer = _ts_gql_tag_no_transform__WEBPACK_IMPORTED_MODULE_0__.gql`
  fragment SidebarFooter_viewer on User {
    id
    name
    login
    avatarUrl
    databaseId
  }
`;
const ViewerContext = /*#__PURE__*/(/* unused pure expression or super */ null && (createContext(undefined)));
function useViewer() {
  return useContext(ViewerContext);
}

function parseRepoConfig(repo) {
  if (typeof repo === 'string') {
    const [owner, name] = repo.split('/');
    return {
      owner,
      name
    };
  }
  return repo;
}
function serializeRepoConfig(repo) {
  if (typeof repo === 'string') {
    return repo;
  }
  return `${repo.owner}/${repo.name}`;
}
function assertValidRepoConfig(repo) {
  if (typeof repo === 'string') {
    if (!repo.includes('/')) {
      throw new Error(`Invalid repo config: ${repo}. It must be in the form owner/name`);
    }
  }
  if (typeof repo === 'object') {
    if (!repo.owner && !repo.name) {
      throw new Error(`Invalid repo config: owner and name are missing`);
    }
    if (!repo.owner) {
      throw new Error(`Invalid repo config: owner is missing`);
    }
    if (!repo.name) {
      throw new Error(`Invalid repo config: name is missing`);
    }
  }
}

function fetchLocalTree(sha) {
  if (treeCache.has(sha)) {
    return treeCache.get(sha);
  }
  const promise = fetch('/api/keystatic/tree', {
    headers: {
      'no-cors': '1'
    }
  }).then(x => x.json()).then(async entries => hydrateTreeCacheWithEntries(entries));
  treeCache.set(sha, promise);
  return promise;
}
function useSetTreeSha() {
  return useContext(SetTreeShaContext);
}
const SetTreeShaContext = /*#__PURE__*/(/* unused pure expression or super */ null && (createContext(() => {
  throw new Error('SetTreeShaContext not set');
})));
function LocalAppShellProvider(props) {
  const [currentTreeSha, setCurrentTreeSha] = useState('initial');
  const tree = useData(useCallback(() => fetchLocalTree(currentTreeSha), [currentTreeSha]));
  const allTreeData = useMemo(() => ({
    default: tree,
    current: tree,
    merged: mergeDataStates({
      default: tree,
      current: tree
    })
  }), [tree]);
  const changedData = useMemo(() => {
    if (allTreeData.merged.kind !== 'loaded') {
      return {
        collections: new Map(),
        singletons: new Set()
      };
    }
    return getChangedData(props.config, allTreeData.merged.data);
  }, [allTreeData, props.config]);
  return /*#__PURE__*/jsx(SetTreeShaContext.Provider, {
    value: setCurrentTreeSha,
    children: /*#__PURE__*/jsx(ChangedContext.Provider, {
      value: changedData,
      children: /*#__PURE__*/jsx(TreeContext.Provider, {
        value: allTreeData,
        children: props.children
      })
    })
  });
}
const GitHubAppShellDataContext = /*#__PURE__*/(/* unused pure expression or super */ null && (createContext(null)));
function GitHubAppShellDataProvider(props) {
  const [state] = useQuery({
    query: props.config.storage.kind === 'github' ? GitHubAppShellQuery : CloudAppShellQuery,
    variables: props.config.storage.kind === 'github' ? parseRepoConfig(props.config.storage.repo) : {
      name: 'repo-name',
      owner: 'repo-owner'
    }
  });
  return /*#__PURE__*/jsx(GitHubAppShellDataContext.Provider, {
    value: state,
    children: /*#__PURE__*/jsx(ViewerContext.Provider, {
      value: state.data && 'viewer' in state.data ? state.data.viewer : undefined,
      children: props.children
    })
  });
}
const writePermissions = new Set(['WRITE', 'ADMIN', 'MAINTAIN']);
function GitHubAppShellProvider(props) {
  var _repo, _repo$refs, _repo$refs$nodes, _repo3, _repo3$refs, _repo3$refs$nodes, _defaultBranchRef$tar, _currentBranchRef$tar, _currentBranchRef$tar2, _currentBranchRef$tar3, _repo5, _repo7, _repo13, _repo13$defaultBranch, _repo14, _repo15, _repo15$refs, _data$repository3, _data$repository4, _repo16;
  const router = useRouter();
  const {
    data,
    error
  } = useContext(GitHubAppShellDataContext);
  let repo = data === null || data === void 0 ? void 0 : data.repository;
  if (repo && 'viewerPermission' in repo && repo.viewerPermission && !writePermissions.has(repo.viewerPermission) && 'forks' in repo) {
    var _repo$forks$nodes$, _repo$forks, _repo$forks$nodes;
    repo = (_repo$forks$nodes$ = (_repo$forks = repo.forks) === null || _repo$forks === void 0 ? void 0 : (_repo$forks$nodes = _repo$forks.nodes) === null || _repo$forks$nodes === void 0 ? void 0 : _repo$forks$nodes[0]) !== null && _repo$forks$nodes$ !== void 0 ? _repo$forks$nodes$ : repo;
  }
  const defaultBranchRef = (_repo = repo) === null || _repo === void 0 ? void 0 : (_repo$refs = _repo.refs) === null || _repo$refs === void 0 ? void 0 : (_repo$refs$nodes = _repo$refs.nodes) === null || _repo$refs$nodes === void 0 ? void 0 : _repo$refs$nodes.find(x => {
    var _repo2, _repo2$defaultBranchR;
    return (x === null || x === void 0 ? void 0 : x.name) === ((_repo2 = repo) === null || _repo2 === void 0 ? void 0 : (_repo2$defaultBranchR = _repo2.defaultBranchRef) === null || _repo2$defaultBranchR === void 0 ? void 0 : _repo2$defaultBranchR.name);
  });
  const currentBranchRef = (_repo3 = repo) === null || _repo3 === void 0 ? void 0 : (_repo3$refs = _repo3.refs) === null || _repo3$refs === void 0 ? void 0 : (_repo3$refs$nodes = _repo3$refs.nodes) === null || _repo3$refs$nodes === void 0 ? void 0 : _repo3$refs$nodes.find(x => (x === null || x === void 0 ? void 0 : x.name) === props.currentBranch);
  const defaultBranchTreeSha = (_defaultBranchRef$tar = defaultBranchRef === null || defaultBranchRef === void 0 ? void 0 : defaultBranchRef.target.tree.oid) !== null && _defaultBranchRef$tar !== void 0 ? _defaultBranchRef$tar : null;
  const currentBranchTreeSha = (_currentBranchRef$tar = currentBranchRef === null || currentBranchRef === void 0 ? void 0 : currentBranchRef.target.tree.oid) !== null && _currentBranchRef$tar !== void 0 ? _currentBranchRef$tar : null;
  const baseCommit = (_currentBranchRef$tar2 = currentBranchRef === null || currentBranchRef === void 0 ? void 0 : (_currentBranchRef$tar3 = currentBranchRef.target) === null || _currentBranchRef$tar3 === void 0 ? void 0 : _currentBranchRef$tar3.oid) !== null && _currentBranchRef$tar2 !== void 0 ? _currentBranchRef$tar2 : null;
  const defaultBranchTree = useGitHubTreeData(defaultBranchTreeSha, props.config);
  const currentBranchTree = useGitHubTreeData(currentBranchTreeSha, props.config);
  const allTreeData = useMemo(() => ({
    default: defaultBranchTree,
    current: currentBranchTree,
    merged: mergeDataStates({
      default: defaultBranchTree,
      current: currentBranchTree
    })
  }), [currentBranchTree, defaultBranchTree]);
  const changedData = useMemo(() => {
    if (allTreeData.merged.kind !== 'loaded') {
      return {
        collections: new Map(),
        singletons: new Set()
      };
    }
    return getChangedData(props.config, allTreeData.merged.data);
  }, [allTreeData, props.config]);
  useEffect(() => {
    var _error$response, _repo4;
    if ((error === null || error === void 0 ? void 0 : (_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) === 401) {
      if (isGitHubConfig(props.config)) {
        window.location.href = `/api/keystatic/github/login?from=${router.params.join('/')}`;
      } else {
        redirectToCloudAuth(router.params.join('/'), props.config);
      }
    }
    if (!((_repo4 = repo) !== null && _repo4 !== void 0 && _repo4.id) && error !== null && error !== void 0 && error.graphQLErrors.some(err => {
      var _err$originalError, _err$originalError2;
      return (err === null || err === void 0 ? void 0 : (_err$originalError = err.originalError) === null || _err$originalError === void 0 ? void 0 : _err$originalError.type) === 'NOT_FOUND' || (err === null || err === void 0 ? void 0 : (_err$originalError2 = err.originalError) === null || _err$originalError2 === void 0 ? void 0 : _err$originalError2.type) === 'FORBIDDEN';
    })) {
      window.location.href = `/api/keystatic/github/repo-not-found?from=${router.params.join('/')}`;
    }
  }, [error, router, (_repo5 = repo) === null || _repo5 === void 0 ? void 0 : _repo5.id, props.config]);
  const baseInfo = useMemo(() => {
    var _repo$id, _repo6;
    return {
      baseCommit: baseCommit || '',
      repositoryId: (_repo$id = (_repo6 = repo) === null || _repo6 === void 0 ? void 0 : _repo6.id) !== null && _repo$id !== void 0 ? _repo$id : ''
    };
  }, [baseCommit, (_repo7 = repo) === null || _repo7 === void 0 ? void 0 : _repo7.id]);
  const branchInfo = useMemo(() => {
    var _repo$defaultBranchRe, _repo8, _repo8$defaultBranchR, _repo$id2, _repo9, _repo$refs$nodes$map$, _repo10, _repo10$refs, _repo10$refs$nodes, _repo11, _repo11$refs, _repo11$refs$nodes, _repo12, _repo12$refs, _repo12$refs$nodes, _data$repository$owne, _data$repository, _data$repository$name, _data$repository2;
    return {
      defaultBranch: (_repo$defaultBranchRe = (_repo8 = repo) === null || _repo8 === void 0 ? void 0 : (_repo8$defaultBranchR = _repo8.defaultBranchRef) === null || _repo8$defaultBranchR === void 0 ? void 0 : _repo8$defaultBranchR.name) !== null && _repo$defaultBranchRe !== void 0 ? _repo$defaultBranchRe : '',
      currentBranch: props.currentBranch,
      baseCommit: baseCommit || '',
      repositoryId: (_repo$id2 = (_repo9 = repo) === null || _repo9 === void 0 ? void 0 : _repo9.id) !== null && _repo$id2 !== void 0 ? _repo$id2 : '',
      allBranches: (_repo$refs$nodes$map$ = (_repo10 = repo) === null || _repo10 === void 0 ? void 0 : (_repo10$refs = _repo10.refs) === null || _repo10$refs === void 0 ? void 0 : (_repo10$refs$nodes = _repo10$refs.nodes) === null || _repo10$refs$nodes === void 0 ? void 0 : _repo10$refs$nodes.map(x => x === null || x === void 0 ? void 0 : x.name).filter(isDefined)) !== null && _repo$refs$nodes$map$ !== void 0 ? _repo$refs$nodes$map$ : [],
      hasPullRequests: !!(currentBranchRef !== null && currentBranchRef !== void 0 && currentBranchRef.associatedPullRequests.totalCount),
      branchNameToId: new Map((_repo11 = repo) === null || _repo11 === void 0 ? void 0 : (_repo11$refs = _repo11.refs) === null || _repo11$refs === void 0 ? void 0 : (_repo11$refs$nodes = _repo11$refs.nodes) === null || _repo11$refs$nodes === void 0 ? void 0 : _repo11$refs$nodes.filter(isDefined).map(x => [x.name, x.id])),
      branchNameToBaseCommit: new Map((_repo12 = repo) === null || _repo12 === void 0 ? void 0 : (_repo12$refs = _repo12.refs) === null || _repo12$refs === void 0 ? void 0 : (_repo12$refs$nodes = _repo12$refs.nodes) === null || _repo12$refs$nodes === void 0 ? void 0 : _repo12$refs$nodes.flatMap(x => x !== null && x !== void 0 && x.target ? [[x.name, x.target.oid]] : [])),
      mainOwner: (_data$repository$owne = data === null || data === void 0 ? void 0 : (_data$repository = data.repository) === null || _data$repository === void 0 ? void 0 : _data$repository.owner.login) !== null && _data$repository$owne !== void 0 ? _data$repository$owne : '',
      mainRepo: (_data$repository$name = data === null || data === void 0 ? void 0 : (_data$repository2 = data.repository) === null || _data$repository2 === void 0 ? void 0 : _data$repository2.name) !== null && _data$repository$name !== void 0 ? _data$repository$name : ''
    };
  }, [(_repo13 = repo) === null || _repo13 === void 0 ? void 0 : (_repo13$defaultBranch = _repo13.defaultBranchRef) === null || _repo13$defaultBranch === void 0 ? void 0 : _repo13$defaultBranch.name, (_repo14 = repo) === null || _repo14 === void 0 ? void 0 : _repo14.id, (_repo15 = repo) === null || _repo15 === void 0 ? void 0 : (_repo15$refs = _repo15.refs) === null || _repo15$refs === void 0 ? void 0 : _repo15$refs.nodes, props.currentBranch, baseCommit, currentBranchRef === null || currentBranchRef === void 0 ? void 0 : currentBranchRef.associatedPullRequests.totalCount, data === null || data === void 0 ? void 0 : (_data$repository3 = data.repository) === null || _data$repository3 === void 0 ? void 0 : _data$repository3.owner.login, data === null || data === void 0 ? void 0 : (_data$repository4 = data.repository) === null || _data$repository4 === void 0 ? void 0 : _data$repository4.name]);
  return /*#__PURE__*/jsx(RepoWithWriteAccessContext.Provider, {
    value: repo && (props.config.storage.kind === 'cloud' || 'viewerPermission' in repo && (_repo16 = repo) !== null && _repo16 !== void 0 && _repo16.viewerPermission && writePermissions.has(repo.viewerPermission)) ? {
      name: repo.name,
      owner: repo.owner.login
    } : null,
    children: /*#__PURE__*/jsx(AppShellErrorContext.Provider, {
      value: error,
      children: /*#__PURE__*/jsx(BranchInfoContext.Provider, {
        value: branchInfo,
        children: /*#__PURE__*/jsx(BaseInfoContext.Provider, {
          value: baseInfo,
          children: /*#__PURE__*/jsx(ChangedContext.Provider, {
            value: changedData,
            children: /*#__PURE__*/jsx(TreeContext.Provider, {
              value: allTreeData,
              children: props.children
            })
          })
        })
      })
    })
  });
}
const AppShellErrorContext = /*#__PURE__*/(/* unused pure expression or super */ null && (createContext(undefined)));
const BaseInfoContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  baseCommit: '',
  repositoryId: ''
});
const ChangedContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  collections: new Map(),
  singletons: new Set()
});
const TreeContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  current: {
    kind: 'loading'
  },
  default: {
    kind: 'loading'
  },
  merged: {
    kind: 'loading'
  }
});
function useTree() {
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(TreeContext);
}
function useChanged() {
  return useContext(ChangedContext);
}
function useBaseCommit() {
  return useContext(BaseInfoContext).baseCommit;
}
function useRepositoryId() {
  return useContext(BaseInfoContext).repositoryId;
}
const Ref_base = _ts_gql_tag_no_transform__WEBPACK_IMPORTED_MODULE_0__.gql`
  fragment Ref_base on Ref {
    id
    name
    target {
      __typename
      id
      oid
      ... on Commit {
        tree {
          id
          oid
        }
      }
    }
    associatedPullRequests(states: [OPEN]) {
      totalCount
    }
  }
`;
const BaseRepo = _ts_gql_tag_no_transform__WEBPACK_IMPORTED_MODULE_0__.gql`
  fragment Repo_base on Repository {
    id
    owner {
      id
      login
    }
    name
    defaultBranchRef {
      id
      name
    }
    refs(refPrefix: "refs/heads/", first: 100) {
      nodes {
        ...Ref_base
      }
    }
  }
  ${Ref_base}
`;
const CloudAppShellQuery = _ts_gql_tag_no_transform__WEBPACK_IMPORTED_MODULE_0__.gql`
  query CloudAppShell($name: String!, $owner: String!) {
    repository(owner: $owner, name: $name) {
      id
      ...Repo_base
    }
  }
  ${BaseRepo}
`;
const Repo_ghDirect = _ts_gql_tag_no_transform__WEBPACK_IMPORTED_MODULE_0__.gql`
  fragment Repo_ghDirect on Repository {
    id
    ...Repo_base
    viewerPermission
  }
  ${BaseRepo}
`;
const Repo_primary = _ts_gql_tag_no_transform__WEBPACK_IMPORTED_MODULE_0__.gql`
  fragment Repo_primary on Repository {
    id
    ...Repo_ghDirect
    forks(affiliations: [OWNER], first: 1) {
      nodes {
        ...Repo_ghDirect
      }
    }
  }
  ${Repo_ghDirect}
`;
const GitHubAppShellQuery = _ts_gql_tag_no_transform__WEBPACK_IMPORTED_MODULE_0__.gql`
  query GitHubAppShell($name: String!, $owner: String!) {
    repository(owner: $owner, name: $name) {
      id
      ...Repo_primary
    }
    viewer {
      ...SidebarFooter_viewer
    }
  }
  ${Repo_primary}
  ${SidebarFooter_viewer}
`;
const treeCache = new lru_cache__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z({
  max: 40
});
async function hydrateTreeCacheWithEntries(entries) {
  const data = {
    entries: new Map(entries.map(entry => [entry.path, entry])),
    tree: treeEntriesToTreeNodes(entries)
  };
  const sha = await treeSha(data.tree);
  treeCache.set(sha, data);
  return data;
}
function fetchGitHubTreeData(sha, config) {
  const cached = treeCache.get(sha);
  if (cached) return cached;
  const promise = getAuth(config).then(auth => {
    if (!auth) throw new Error('Not authorized');
    return fetch(config.storage.kind === 'github' ? `https://api.github.com/repos/${serializeRepoConfig(config.storage.repo)}/git/trees/${sha}?recursive=1` : `${KEYSTATIC_CLOUD_API_URL}/v1/github/trees/${sha}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
        ...(config.storage.kind === 'cloud' ? KEYSTATIC_CLOUD_HEADERS : {})
      }
    }).then(x => x.json());
  }).then(res => hydrateTreeCacheWithEntries(res.tree.map(_ref => {
    let {
      url,
      ...rest
    } = _ref;
    return rest;
  })));
  treeCache.set(sha, promise);
  return promise;
}
function useGitHubTreeData(sha, config) {
  return useData(useCallback(() => sha ? fetchGitHubTreeData(sha, config) : LOADING, [sha, config]));
}
const RepoWithWriteAccessContext = /*#__PURE__*/(/* unused pure expression or super */ null && (createContext(null)));
const BranchInfoContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  currentBranch: '',
  allBranches: [],
  defaultBranch: '',
  hasPullRequests: false,
  branchNameToId: new Map(),
  branchNameToBaseCommit: new Map(),
  mainOwner: '',
  mainRepo: ''
});
function useBranchInfo() {
  return useContext(BranchInfoContext);
}
function getChangedData(config, trees) {
  var _config$collections, _config$singletons;
  return {
    collections: new Map(Object.keys((_config$collections = config.collections) !== null && _config$collections !== void 0 ? _config$collections : {}).map(collection => {
      const currentBranch = new Map(getEntriesInCollectionWithTreeKey(config, collection, trees.current.tree).map(x => [x.slug, x.key]));
      const defaultBranch = new Map(getEntriesInCollectionWithTreeKey(config, collection, trees.default.tree).map(x => [x.slug, x.key]));
      const changed = new Set();
      const added = new Set();
      for (const [key, entry] of currentBranch) {
        const defaultBranchEntry = defaultBranch.get(key);
        if (defaultBranchEntry === undefined) {
          added.add(key);
          continue;
        }
        if (entry !== defaultBranchEntry) {
          changed.add(key);
        }
      }
      const removed = new Set([...defaultBranch.keys()].filter(key => !currentBranch.has(key)));
      return [collection, {
        removed,
        added,
        changed,
        totalCount: currentBranch.size
      }];
    })),
    singletons: new Set(Object.keys((_config$singletons = config.singletons) !== null && _config$singletons !== void 0 ? _config$singletons : {}).filter(singleton => {
      var _getTreeNodeAtPath, _getTreeNodeAtPath2;
      const singletonPath = getSingletonPath(config, singleton);
      return ((_getTreeNodeAtPath = getTreeNodeAtPath(trees.current.tree, singletonPath)) === null || _getTreeNodeAtPath === void 0 ? void 0 : _getTreeNodeAtPath.entry.sha) !== ((_getTreeNodeAtPath2 = getTreeNodeAtPath(trees.default.tree, singletonPath)) === null || _getTreeNodeAtPath2 === void 0 ? void 0 : _getTreeNodeAtPath2.entry.sha);
    }))
  };
}




/***/ }),

/***/ 11005:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ FieldDataError)
/* harmony export */ });
class FieldDataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FieldDataError';
  }
}




/***/ }),

/***/ 71175:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ clientSideValidateProp)
/* harmony export */ });
/* unused harmony exports f, p, t */
/* harmony import */ var _utils_677addd9_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9583);
/* harmony import */ var _error_ca8f88e5_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11005);
/* harmony import */ var emery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85916);
/* harmony import */ var _initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17181);





function validateArrayLength(schema, val, path) {
  var _schema$validation, _schema$validation$le, _schema$validation2, _schema$validation2$l;
  if (((_schema$validation = schema.validation) === null || _schema$validation === void 0 ? void 0 : (_schema$validation$le = _schema$validation.length) === null || _schema$validation$le === void 0 ? void 0 : _schema$validation$le.min) !== undefined && val.length < schema.validation.length.min) {
    return new PropValidationError(new _error_ca8f88e5_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_3__.F(`Must have at least ${schema.validation.length.min} element${schema.validation.length.min === 1 ? '' : 's'}`), path, schema);
  }
  if (((_schema$validation2 = schema.validation) === null || _schema$validation2 === void 0 ? void 0 : (_schema$validation2$l = _schema$validation2.length) === null || _schema$validation2$l === void 0 ? void 0 : _schema$validation2$l.max) !== undefined && val.length > schema.validation.length.max) {
    return new PropValidationError(new _error_ca8f88e5_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_3__.F(`Must have at most ${schema.validation.length.max} element${schema.validation.length.max === 1 ? '' : 's'}}`), path, schema);
  }
}

class PropValidationError extends Error {
  constructor(cause, path, schema) {
    super(`field error at ${path.join('.')}`, {
      cause
    });
    this.path = path;
    this.schema = schema;
    this.cause = cause;
  }
}
function toFormFieldStoredValue(val) {
  if (val === null) {
    return undefined;
  }
  return val;
}
const isArray = Array.isArray;
function parseProps(schema, _value, path, pathWithArrayFieldSlugs, parseFormField, /** This should be true for the reader and false elsewhere */
validateArrayFieldLength) {
  let value = toFormFieldStoredValue(_value);
  if (schema.kind === 'form') {
    try {
      return parseFormField(schema, value, path, pathWithArrayFieldSlugs);
    } catch (err) {
      throw new PropValidationError(err, path, schema);
    }
  }
  if (schema.kind === 'child') {
    return null;
  }
  if (schema.kind === 'conditional') {
    if (value === undefined) {
      return getInitialPropsValue(schema);
    }
    try {
      if (typeof value !== 'object' || value === null || isArray(value)) {
        throw new FieldDataError('Must be an object');
      }
      for (const key of Object.keys(value)) {
        if (key !== 'discriminant' && key !== 'value') {
          throw new FieldDataError(`Must only contain keys "discriminant" and "value", not "${key}"`);
        }
      }
    } catch (err) {
      throw new PropValidationError(err, path, schema);
    }
    const parsedDiscriminant = parseProps(schema.discriminant, value.discriminant, path.concat('discriminant'), pathWithArrayFieldSlugs.concat('discriminant'), parseFormField, validateArrayFieldLength);
    return {
      discriminant: parsedDiscriminant,
      value: parseProps(schema.values[parsedDiscriminant], value.value, path.concat('value'), pathWithArrayFieldSlugs.concat('value'), parseFormField, validateArrayFieldLength)
    };
  }
  if (schema.kind === 'object') {
    if (value === undefined) {
      value = {};
    }
    try {
      if (typeof value !== 'object' || value === null || isArray(value)) {
        throw new FieldDataError('Must be an object');
      }
      const allowedKeysSet = new Set(Object.keys(schema.fields));
      for (const key of Object.keys(value)) {
        if (!allowedKeysSet.has(key)) {
          throw new FieldDataError(`Key on object value "${key}" is not allowed`);
        }
      }
    } catch (err) {
      throw new PropValidationError(err, path, schema);
    }
    const val = {};
    const errors = [];
    for (const key of Object.keys(schema.fields)) {
      let individualVal = value[key];
      try {
        const propVal = parseProps(schema.fields[key], individualVal, path.concat(key), pathWithArrayFieldSlugs.concat(key), parseFormField, validateArrayFieldLength);
        val[key] = propVal;
      } catch (err) {
        errors.push(err);
      }
    }
    if (errors.length) {
      throw new AggregateError(errors);
    }
    return val;
  }
  if (schema.kind === 'array') {
    if (value === undefined) {
      return [];
    }
    try {
      if (!isArray(value)) {
        throw new FieldDataError('Must be an array');
      }
    } catch (err) {
      throw new PropValidationError(err, path, schema);
    }
    const errors = [];
    try {
      if (validateArrayFieldLength) {
        const error = validateArrayLength(schema, value, path);
        if (error !== undefined) {
          errors.push(error);
        }
      }
      return value.map((innerVal, i) => {
        try {
          let slug = i.toString();
          if (schema.slugField && typeof innerVal === 'object' && innerVal !== null && !isArray(innerVal)) {
            if (schema.element.kind !== 'object') {
              throw new Error('slugField on array fields requires the an object field element');
            }
            const slugField = schema.element.fields[schema.slugField];
            if (!slugField) {
              throw new Error(`slugField "${schema.slugField}" does not exist on object field`);
            }
            if (slugField.kind !== 'form') {
              throw new Error(`slugField "${schema.slugField}" is not a form field`);
            }
            if (slugField.formKind !== 'slug') {
              throw new Error(`slugField "${schema.slugField}" is not a slug field`);
            }
            let parsedSlugFieldValue;
            try {
              parsedSlugFieldValue = slugField.parse(toFormFieldStoredValue(innerVal[schema.slugField]), undefined);
            } catch (err) {
              throw new AggregateError([err]);
            }
            slug = slugField.serializeWithSlug(parsedSlugFieldValue).slug;
          }
          return parseProps(schema.element, innerVal, path.concat(i), pathWithArrayFieldSlugs.concat(slug), parseFormField, validateArrayFieldLength);
        } catch (err) {
          errors.push(err);
        }
      });
    } finally {
      if (errors.length) {
        throw new AggregateError(errors);
      }
    }
  }
  assertNever(schema);
}

function flattenErrors(error) {
  if (error instanceof AggregateError) {
    return error.errors.flatMap(flattenErrors);
  }
  return [error];
}
function formatFormDataError(error) {
  const flatErrors = flattenErrors(error);
  return flatErrors.map(error => {
    if (error instanceof PropValidationError) {
      const path = error.path.join('.');
      return `${path}: ${error.cause instanceof _error_ca8f88e5_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_3__.F ? error.cause.message : `Unexpected error: ${error.cause}`}`;
    }
    return `Unexpected error: ${error}`;
  }).join('\n');
}
function toFormattedFormDataError(error) {
  const formatted = formatFormDataError(error);
  return new Error(`Field validation failed:\n` + formatted);
}
function clientSideValidateProp(schema, value, slugField) {
  try {
    validateValueWithSchema(schema, value, slugField);
    return true;
  } catch (error) {
    console.warn(toFormattedFormDataError(error));
    return false;
  }
}
function validateValueWithSchema(schema, value, slugField) {
  let path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  switch (schema.kind) {
    case 'child':
      {
        return;
      }
    case 'form':
      {
        try {
          if (slugField && path[path.length - 1] === (slugField === null || slugField === void 0 ? void 0 : slugField.field)) {
            schema.validate(value, {
              slugField: {
                slugs: slugField.slugs,
                glob: slugField.glob
              }
            });
            return;
          }
          schema.validate(value, undefined);
        } catch (err) {
          throw new PropValidationError(err, path, schema);
        }
        return;
      }
    case 'conditional':
      {
        schema.discriminant.validate(value.discriminant);
        validateValueWithSchema(schema.values[value.discriminant], value.value, undefined, path.concat('value'));
        return;
      }
    case 'object':
      {
        const errors = [];
        for (const [key, childProp] of Object.entries(schema.fields)) {
          try {
            validateValueWithSchema(childProp, value[key], key === (slugField === null || slugField === void 0 ? void 0 : slugField.field) ? slugField : undefined, path.concat(key));
          } catch (err) {
            errors.push(err);
          }
        }
        if (errors.length > 0) {
          throw new AggregateError(errors);
        }
        return;
      }
    case 'array':
      {
        let slugInfo;
        if (schema.slugField !== undefined && schema.element.kind === 'object') {
          const innerSchema = schema.element.fields;
          const {
            slugField
          } = schema;
          slugInfo = {
            slugField,
            slugs: value.map(val => (0,_utils_677addd9_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_0__.m)({
              schema: innerSchema,
              slugField
            }, val))
          };
        }
        const errors = [];
        const val = value;
        const error = validateArrayLength(schema, value, path);
        if (error !== undefined) {
          errors.push(error);
        }
        for (const [idx, innerVal] of val.entries()) {
          try {
            validateValueWithSchema(schema.element, innerVal, slugInfo === undefined ? undefined : {
              field: slugInfo.slugField,
              slugs: new Set(slugInfo.slugs.filter((_, i) => idx !== i)),
              glob: '*'
            }, path.concat(idx));
          } catch (err) {
            errors.push(err);
          }
        }
        if (errors.length > 0) {
          throw new AggregateError(errors);
        }
        return;
      }
  }
}




/***/ }),

/***/ 84044:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ ArrayFieldListView),
/* harmony export */   F: () => (/* binding */ FormValueContentFromPreviewProps),
/* harmony export */   I: () => (/* binding */ InnerFormValueContentFromPreviewProps),
/* harmony export */   a: () => (/* binding */ ArrayFieldValidationMessages),
/* harmony export */   c: () => (/* binding */ createGetPreviewProps),
/* harmony export */   i: () => (/* binding */ isNonChildFieldPreviewProps),
/* harmony export */   p: () => (/* binding */ previewPropsToValue),
/* harmony export */   s: () => (/* binding */ setValueToPreviewProps),
/* harmony export */   v: () => (/* binding */ valueToUpdater)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ui_78a3a4f0_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(62091);
/* harmony import */ var _ui_370f536e_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(86981);
/* harmony import */ var _keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9772);
/* harmony import */ var _keystar_ui_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(84371);
/* harmony import */ var _keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(70156);
/* harmony import */ var _keystar_ui_drag_and_drop__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(63138);
/* harmony import */ var _keystar_ui_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(60137);
/* harmony import */ var _keystar_ui_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(828);
/* harmony import */ var _keystar_ui_icon_icons_trash2Icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(51227);
/* harmony import */ var _keystar_ui_list_view__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6027);
/* harmony import */ var _keystar_ui_slots__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(71819);
/* harmony import */ var _keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(74404);
/* harmony import */ var _keystar_ui_typography__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(79798);
/* harmony import */ var _react_aria_i18n__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(93009);
/* harmony import */ var emery__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(85916);
/* harmony import */ var _initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(17181);
/* harmony import */ var _index_b8966079_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(85955);
/* harmony import */ var _utils_677addd9_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(9583);
/* harmony import */ var _errors_f334cbf7_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(71175);
/* harmony import */ var _ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(54085);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__);























function castToMemoizedInfoForSchema(val) {
  return val;
}
function getOrInsert(map, key, val) {
  if (!map.has(key)) {
    map.set(key, val(key));
  }
  return map.get(key);
}
function createGetPreviewProps(rootSchema, rootOnChange, getChildFieldElement) {
  const memoizedInfoForSchema = castToMemoizedInfoForSchema({
    form(schema, onChange) {
      return newVal => onChange(() => newVal);
    },
    array(schema, onChange) {
      return {
        rawOnChange: onChange,
        inner: new Map(),
        onChange(updater) {
          onChange(value => (0,_initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_15__.u)(schema, value, updater));
        }
      };
    },
    child() {},
    conditional(schema, onChange) {
      return {
        onChange: (discriminant, value) => onChange(val => (0,_initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_15__.u)(schema, val, {
          discriminant,
          value
        })),
        onChangeForValue: cb => onChange(val => ({
          discriminant: val.discriminant,
          value: cb(val.value)
        }))
      };
    },
    object(schema, onChange) {
      return {
        onChange: updater => {
          onChange(value => (0,_initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_15__.u)(schema, value, updater));
        },
        innerOnChanges: Object.fromEntries(Object.keys(schema.fields).map(key => {
          return [key, newVal => {
            onChange(val => ({
              ...val,
              [key]: newVal(val[key])
            }));
          }];
        }))
      };
    }
  });
  const previewPropsFactories = {
    form(schema, value, onChange) {
      return {
        value: value,
        onChange,
        schema: schema
      };
    },
    child(schema, value, onChange, path) {
      return {
        element: getChildFieldElement(path),
        schema: schema
      };
    },
    object(schema, value, memoized, path, getInnerProp) {
      const fields = {};
      for (const key of Object.keys(schema.fields)) {
        fields[key] = getInnerProp(schema.fields[key], value[key], memoized.innerOnChanges[key], key);
      }
      const previewProps = {
        fields,
        onChange: memoized.onChange,
        schema: schema
      };
      return previewProps;
    },
    array(schema, value, memoized, path, getInnerProp) {
      const arrayValue = value;
      const keys = (0,_initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_15__.a)(arrayValue);
      const unusedKeys = new Set((0,_initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_15__.a)(value));
      const props = {
        elements: arrayValue.map((val, i) => {
          const key = keys[i];
          unusedKeys.delete(key);
          const element = getOrInsert(memoized.inner, key, () => {
            const onChange = val => {
              memoized.rawOnChange(prev => {
                const keys = (0,_initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_15__.a)(prev);
                const index = keys.indexOf(key);
                const newValue = [...prev];
                newValue[index] = val(newValue[index]);
                (0,_initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_15__.s)(newValue, keys);
                return newValue;
              });
            };
            const element = getInnerProp(schema.element, val, onChange, key);
            return {
              element,
              elementWithKey: {
                ...element,
                key
              },
              onChange
            };
          });
          const currentInnerProp = getInnerProp(schema.element, val, element.onChange, key);
          if (element.element !== currentInnerProp) {
            element.element = currentInnerProp;
            element.elementWithKey = {
              ...currentInnerProp,
              key
            };
          }
          return element.elementWithKey;
        }),
        schema: schema,
        onChange: memoized.onChange
      };
      for (const key of unusedKeys) {
        memoized.inner.delete(key);
      }
      return props;
    },
    conditional(schema, value, memoized, path, getInnerProp) {
      const props = {
        discriminant: value.discriminant,
        onChange: memoized.onChange,
        value: getInnerProp(schema.values[value.discriminant.toString()], value.value, memoized.onChangeForValue, 'value'),
        schema: schema
      };
      return props;
    }
  };
  function getPreviewPropsForProp(schema, value, memoedThing, path, getInnerProp) {
    return previewPropsFactories[schema.kind](schema, value, memoedThing, path, getInnerProp);
  }
  function getInitialMemoState(schema, value, onChange, path) {
    const innerState = new Map();
    const memoizedInfo = memoizedInfoForSchema[schema.kind](schema, onChange);
    const state = {
      value,
      inner: innerState,
      props: getPreviewPropsForProp(schema, value, memoizedInfo, path, (schema, value, onChange, key) => {
        const state = getInitialMemoState(schema, value, onChange, path.concat(key));
        innerState.set(key, state);
        return state.props;
      }),
      schema: schema,
      cached: memoizedInfo
    };
    return state;
  }
  function getUpToDateProps(schema, value, onChange, memoState, path) {
    if (memoState.schema !== schema) {
      Object.assign(memoState, getInitialMemoState(schema, value, onChange, path));
      return memoState.props;
    }
    if (memoState.value === value) {
      return memoState.props;
    }
    memoState.value = value;
    const unusedKeys = new Set(memoState.inner.keys());
    memoState.props = getPreviewPropsForProp(schema, value, memoState.cached, path, (schema, value, onChange, innerMemoStateKey) => {
      unusedKeys.delete(innerMemoStateKey);
      if (!memoState.inner.has(innerMemoStateKey)) {
        const innerState = getInitialMemoState(schema, value, onChange, path.concat(innerMemoStateKey));
        memoState.inner.set(innerMemoStateKey, innerState);
        return innerState.props;
      }
      return getUpToDateProps(schema, value, onChange, memoState.inner.get(innerMemoStateKey), path.concat(innerMemoStateKey));
    });
    for (const key of unusedKeys) {
      memoState.inner.delete(key);
    }
    return memoState.props;
  }
  let memoState;
  return value => {
    if (memoState === undefined) {
      memoState = getInitialMemoState(rootSchema, value, rootOnChange, []);
      return memoState.props;
    }
    return getUpToDateProps(rootSchema, value, rootOnChange, memoState, []);
  };
}

function ConditionalFieldInput(_ref) {
  let {
    schema,
    autoFocus,
    discriminant,
    onChange,
    value,
    forceValidation
  } = _ref;
  const schemaDiscriminant = schema.discriminant;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
    gap: "xlarge",
    direction: "column",
    children: [(0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_ui_78a3a4f0_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_1__.AddToPathProvider, {
      part: "discriminant",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(schemaDiscriminant.Input, {
        autoFocus: !!autoFocus,
        value: discriminant,
        onChange: onChange,
        forceValidation: forceValidation
      })
    }), [autoFocus, schemaDiscriminant, discriminant, onChange, forceValidation]), isNonChildFieldPreviewProps(value) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_ui_78a3a4f0_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_1__.AddToPathProvider, {
      part: "value",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(InnerFormValueContentFromPreviewProps, {
        forceValidation: forceValidation,
        ...value
      })
    })]
  });
}

const previewPropsToValueConverter = {
  child() {
    return null;
  },
  form(props) {
    return props.value;
  },
  array(props) {
    const values = props.elements.map(x => previewPropsToValue(x));
    (0,_initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_15__.s)(values, props.elements.map(x => x.key));
    return values;
  },
  conditional(props) {
    return {
      discriminant: props.discriminant,
      value: previewPropsToValue(props.value)
    };
  },
  object(props) {
    return Object.fromEntries(Object.entries(props.fields).map(_ref => {
      let [key, val] = _ref;
      return [key, previewPropsToValue(val)];
    }));
  }
};
function previewPropsToValue(props) {
  return previewPropsToValueConverter[props.schema.kind](props);
}
const valueToUpdaters = {
  child() {
    return undefined;
  },
  form(value) {
    return value;
  },
  array(value, schema) {
    const keys = (0,_initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_15__.a)(value);
    return value.map((x, i) => ({
      key: keys[i],
      value: valueToUpdater(x, schema.element)
    }));
  },
  conditional(value, schema) {
    return {
      discriminant: value.discriminant,
      value: valueToUpdater(value.value, schema.values[value.discriminant.toString()])
    };
  },
  object(value, schema) {
    return Object.fromEntries(Object.entries(schema.fields).map(_ref2 => {
      let [key, schema] = _ref2;
      return [key, valueToUpdater(value[key], schema)];
    }));
  }
};
function valueToUpdater(value, schema) {
  return valueToUpdaters[schema.kind](value, schema);
}
function setValueToPreviewProps(value, props) {
  if (isKind(props, 'child')) {
    // child fields can't be updated through preview props, so we don't do anything here
    return;
  }
  if (isKind(props, 'form') || isKind(props, 'object') || isKind(props, 'array')) {
    props.onChange(valueToUpdater(value, props.schema));
    return;
  }
  if (isKind(props, 'conditional')) {
    const updater = valueToUpdater(value, props.schema);
    props.onChange(updater.discriminant, updater.value);
    return;
  }
  (0,emery__WEBPACK_IMPORTED_MODULE_14__.assertNever)(props);
}

// this exists because for props.schema.kind === 'form', ts doesn't narrow props, only props.schema
function isKind(props, kind) {
  return props.schema.kind === kind;
}

function ArrayFieldInput(props) {
  const labelId = (0,react__WEBPACK_IMPORTED_MODULE_0__.useId)();
  const descriptionId = (0,react__WEBPACK_IMPORTED_MODULE_0__.useId)();
  const stringFormatter = (0,_react_aria_i18n__WEBPACK_IMPORTED_MODULE_21__/* .useLocalizedStringFormatter */ .qb)(_index_b8966079_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_16__.l);
  const [modalState, setModalState] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
    state: 'closed'
  });
  const onModalChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(cb => {
    setModalState(state => {
      if (state.state === 'open') {
        return {
          state: 'open',
          forceValidation: state.forceValidation,
          value: cb(state.value),
          index: state.index
        };
      }
      return state;
    });
  }, [setModalState]);
  const formId = (0,react__WEBPACK_IMPORTED_MODULE_0__.useId)();
  const modalStateIndex = modalState.state === 'open' ? modalState.index : undefined;
  const slugInfo = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (props.schema.slugField === undefined || modalState.state !== 'open' || props.schema.element.kind !== 'object') {
      return;
    }
    const val = previewPropsToValue(props);
    const schema = props.schema.element.fields;
    const slugField = props.schema.slugField;
    const slugs = new Set(val.filter((x, i) => i !== modalStateIndex).map(x => (0,_utils_677addd9_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.m)({
      schema,
      slugField
    }, x)));
    return {
      slugs,
      field: slugField,
      glob: '*'
    };
  }, [modalStateIndex, props, modalState.state]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
    elementType: "section",
    gap: "medium",
    role: "group",
    "aria-labelledby": labelId,
    "aria-describedby": props.schema.description ? descriptionId : undefined,
    direction: "column",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_field__WEBPACK_IMPORTED_MODULE_7__/* .FieldLabel */ .Qy, {
      elementType: "h3",
      id: labelId,
      children: props.schema.label
    }), props.schema.description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_13__.Text, {
      id: descriptionId,
      size: "small",
      color: "neutralSecondary",
      children: props.schema.description
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .ActionButton */ .Kk, {
      autoFocus: props.autoFocus,
      onPress: () => {
        setModalState({
          state: 'open',
          value: (0,_initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_15__.g)(props.schema.element),
          forceValidation: false,
          index: undefined
        });
      },
      alignSelf: "start",
      children: stringFormatter.format('add')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ArrayFieldListView, {
      ...props,
      labelId: labelId,
      onOpenItem: idx => {
        setModalState({
          state: 'open',
          value: previewPropsToValue(props.elements[idx]),
          forceValidation: false,
          index: idx
        });
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ArrayFieldValidationMessages, {
      ...props
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_5__/* .DialogContainer */ .TW, {
      onDismiss: () => {
        setModalState({
          state: 'closed'
        });
      },
      children: (() => {
        if (modalState.state !== 'open' || props.schema.element.kind === 'child') {
          return;
        }
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_5__/* .Dialog */ .Vq, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_13__.Heading, {
            children: "Edit item"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_slots__WEBPACK_IMPORTED_MODULE_11__/* .Content */ .VY, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
              id: formId,
              elementType: "form",
              onSubmit: event => {
                if (event.target !== event.currentTarget) return;
                event.preventDefault();
                if (modalState.state !== 'open') return;
                if (!(0,_errors_f334cbf7_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.c)(props.schema.element, modalState.value, undefined)) {
                  setModalState(state => ({
                    ...state,
                    forceValidation: true
                  }));
                  return;
                }
                if (modalState.index === undefined) {
                  props.onChange([...props.elements.map(x => ({
                    key: x.key
                  })), {
                    key: undefined,
                    value: valueToUpdater(modalState.value, props.schema.element)
                  }]);
                } else {
                  setValueToPreviewProps(modalState.value, props.elements[modalState.index]);
                }
                setModalState({
                  state: 'closed'
                });
              },
              direction: "column",
              gap: "xxlarge",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ArrayFieldItemModalContent, {
                onChange: onModalChange,
                schema: props.schema.element,
                value: modalState.value,
                slugField: slugInfo
              })
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .ButtonGroup */ .hE, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .zx, {
              onPress: () => {
                setModalState({
                  state: 'closed'
                });
              },
              children: stringFormatter.format('cancel')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .zx, {
              form: formId,
              prominence: "high",
              type: "submit",
              children: modalState.index === undefined ? stringFormatter.format('add') : 'Done'
            })]
          })]
        });
      })()
    })]
  });
}
function ArrayFieldValidationMessages(props) {
  var _props$schema$validat, _props$schema$validat2, _props$schema$validat3, _props$schema$validat4;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.Fragment, {
    children: props.forceValidation && (((_props$schema$validat = props.schema.validation) === null || _props$schema$validat === void 0 ? void 0 : (_props$schema$validat2 = _props$schema$validat.length) === null || _props$schema$validat2 === void 0 ? void 0 : _props$schema$validat2.min) !== undefined && props.elements.length < props.schema.validation.length.min ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_field__WEBPACK_IMPORTED_MODULE_7__/* .FieldMessage */ .nd, {
      children: ["Must have at least ", props.schema.validation.length.min, " item", props.schema.validation.length.min === 1 ? '' : 's']
    }) : ((_props$schema$validat3 = props.schema.validation) === null || _props$schema$validat3 === void 0 ? void 0 : (_props$schema$validat4 = _props$schema$validat3.length) === null || _props$schema$validat4 === void 0 ? void 0 : _props$schema$validat4.max) !== undefined && props.elements.length > props.schema.validation.length.max ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_field__WEBPACK_IMPORTED_MODULE_7__/* .FieldMessage */ .nd, {
      children: ["Must have at most ", props.schema.validation.length.max, " item", props.schema.validation.length.max === 1 ? '' : 's']
    }) : undefined)
  });
}
function ArrayFieldListView(props) {
  let onMove = (keys, target) => {
    const targetIndex = props.elements.findIndex(x => x.key === target.key);
    if (targetIndex === -1) return;
    const allKeys = props.elements.map(x => ({
      key: x.key
    }));
    const indexToMoveTo = target.dropPosition === 'before' ? targetIndex : targetIndex + 1;
    const indices = keys.map(key => allKeys.findIndex(x => x.key === key));
    props.onChange(move(allKeys, indices, indexToMoveTo));
  };
  const dragType = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => Math.random().toString(36), []);
  let {
    dragAndDropHooks
  } = (0,_keystar_ui_drag_and_drop__WEBPACK_IMPORTED_MODULE_6__/* .useDragAndDrop */ .Y)({
    getItems(keys) {
      // Use a drag type so the items can only be reordered within this list
      // and not dragged elsewhere.
      return [...keys].map(key => {
        key = JSON.stringify(key);
        return {
          [dragType]: key,
          'text/plain': key
        };
      });
    },
    getAllowedDropOperations() {
      return ['move', 'cancel'];
    },
    async onDrop(e) {
      if (e.target.type !== 'root' && e.target.dropPosition !== 'on') {
        let keys = [];
        for (let item of e.items) {
          if (item.kind === 'text') {
            let key;
            if (item.types.has(dragType)) {
              key = JSON.parse(await item.getText(dragType));
              keys.push(key);
            } else if (item.types.has('text/plain')) {
              // Fallback for Chrome Android case: https://bugs.chromium.org/p/chromium/issues/detail?id=1293803
              // Multiple drag items are contained in a single string so we need to split them out
              key = await item.getText('text/plain');
              keys = key.split('\n').map(val => val.replaceAll('"', ''));
            }
          }
        }
        onMove(keys, e.target);
      }
    },
    getDropOperation(target) {
      if (target.type === 'root' || target.dropPosition === 'on') {
        return 'cancel';
      }
      return 'move';
    }
  });
  const onRemoveKey = (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.u)(key => {
    props.onChange(props.elements.map(x => ({
      key: x.key
    })).filter(val => val.key !== key));
  });
  const stringFormatter = (0,_react_aria_i18n__WEBPACK_IMPORTED_MODULE_21__/* .useLocalizedStringFormatter */ .qb)(_index_b8966079_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_16__.l);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_list_view__WEBPACK_IMPORTED_MODULE_10__/* .ListView */ .B, {
    "aria-labelledby": props.labelId,
    items: props.elements,
    dragAndDropHooks: dragAndDropHooks,
    height: props.elements.length ? undefined : 'scale.2000',
    renderEmptyState: () => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
      direction: "column",
      gap: "large",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      padding: "regular",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_13__.Text, {
        elementType: "h3",
        align: "center",
        color: "neutralSecondary",
        size: "large",
        weight: "medium",
        children: "Empty list"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_13__.Text, {
        align: "center",
        color: "neutralTertiary",
        children: "Add the first item to see it here."
      })]
    }),
    onAction: key => {
      const idx = props.elements.findIndex(x => x.key === key);
      if (idx === -1) return;
      props.onOpenItem(idx);
    },
    children: item => {
      var _props$schema$itemLab, _props$schema;
      const label = ((_props$schema$itemLab = (_props$schema = props.schema).itemLabel) === null || _props$schema$itemLab === void 0 ? void 0 : _props$schema$itemLab.call(_props$schema, item)) || `Item ${props.elements.indexOf(item) + 1}`;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_list_view__WEBPACK_IMPORTED_MODULE_10__/* .Item */ .c, {
        textValue: label,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_13__.Text, {
          children: label
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_12__/* .TooltipTrigger */ .a, {
          placement: "start",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_4__/* .ActionButton */ .Kk, {
            onPress: () => {
              onRemoveKey(item.key);
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_8__/* .Icon */ .J, {
              src: _keystar_ui_icon_icons_trash2Icon__WEBPACK_IMPORTED_MODULE_9__/* .trash2Icon */ .S
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_12__/* .Tooltip */ .u, {
            tone: "critical",
            children: stringFormatter.format('delete')
          })]
        })]
      }, item.key);
    }
  });
}

// https://github.com/adobe/react-spectrum/blob/97ff9f95d91befaf87251e52ea484f81daae8f3a/packages/%40react-stately/data/src/useListData.ts#L263
function move(items, indices, toIndex) {
  // Shift the target down by the number of items being moved from before the target
  toIndex -= indices.filter(index => index < toIndex).length;
  let moves = indices.map(from => ({
    from,
    to: toIndex++
  }));

  // Shift later from indices down if they have a larger index
  for (let i = 0; i < moves.length; i++) {
    let a = moves[i].from;
    for (let j = i; j < moves.length; j++) {
      let b = moves[j].from;
      if (b > a) {
        moves[j].from--;
      }
    }
  }

  // Interleave the moves so they can be applied one by one rather than all at once
  for (let i = 0; i < moves.length; i++) {
    let a = moves[i];
    for (let j = moves.length - 1; j > i; j--) {
      let b = moves[j];
      if (b.from < a.to) {
        a.to++;
      } else {
        b.from++;
      }
    }
  }
  let copy = items.slice();
  for (let move of moves) {
    let [item] = copy.splice(move.from, 1);
    copy.splice(move.to, 0, item);
  }
  return copy;
}
function ArrayFieldItemModalContent(props) {
  const previewProps = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => createGetPreviewProps(props.schema, props.onChange, () => undefined), [props.schema, props.onChange])(props.value);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(FormValueContentFromPreviewProps, {
    slugField: props.slugField,
    autoFocus: true,
    ...previewProps
  });
}

function isNonChildFieldPreviewProps(props) {
  return props.schema.kind !== 'child';
}
function getInputComponent(schema) {
  if (schema.kind === 'object') {
    var _schema$Input;
    return (_schema$Input = schema.Input) !== null && _schema$Input !== void 0 ? _schema$Input : _ui_370f536e_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_2__/* .ObjectFieldInput */ .v;
  }
  if (schema.kind === 'conditional') {
    var _schema$Input2;
    return (_schema$Input2 = schema.Input) !== null && _schema$Input2 !== void 0 ? _schema$Input2 : ConditionalFieldInput;
  }
  if (schema.kind === 'array') {
    var _schema$Input3;
    return (_schema$Input3 = schema.Input) !== null && _schema$Input3 !== void 0 ? _schema$Input3 : ArrayFieldInput;
  }
  return schema.Input;
}
const InnerFormValueContentFromPreviewProps = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(function InnerFormValueContentFromPreview(props) {
  let Input = getInputComponent(props.schema);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(Input, {
    ...props,
    autoFocus: !!props.autoFocus,
    forceValidation: !!props.forceValidation
  });
});
const emptyArray = [];
const FormValueContentFromPreviewProps = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(function FormValueContentFromPreview(_ref) {
  let {
    slugField,
    ...props
  } = _ref;
  let Input = getInputComponent(props.schema);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_ui_78a3a4f0_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_1__.PathContextProvider, {
    value: emptyArray,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_ui_78a3a4f0_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_1__.SlugFieldProvider, {
      value: slugField,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(Input, {
        ...props,
        autoFocus: !!props.autoFocus,
        forceValidation: !!props.forceValidation
      })
    })
  });
});




/***/ }),

/***/ 52967:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  _: () => (/* binding */ _createDocumentEditor),
  a: () => (/* binding */ isListNode),
  b: () => (/* binding */ areArraysEqual),
  c: () => (/* binding */ getSelectedTableArea),
  e: () => (/* binding */ getRelativeRowPath),
  f: () => (/* binding */ findChildPropPaths),
  h: () => (/* binding */ cell),
  j: () => (/* binding */ getInlineNodes),
  k: () => (/* binding */ addMarksToChildren),
  l: () => (/* binding */ setLinkForChildren),
  m: () => (/* binding */ forceDisableMarkForChildren),
  n: () => (/* binding */ addMarkToChildren)
});

// UNUSED EXPORTS: d, g, i, s

// EXTERNAL MODULE: ../node_modules/slate/dist/index.js
var dist = __webpack_require__(91526);
// EXTERNAL MODULE: ../node_modules/emery/assertions/dist/emery-assertions.cjs.js
var emery_assertions_cjs = __webpack_require__(86522);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/initial-values-25bf35f4.node.react-server.esm.js
var initial_values_25bf35f4_node_react_server_esm = __webpack_require__(17181);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/utils-677addd9.node.react-server.esm.js
var utils_677addd9_node_react_server_esm = __webpack_require__(9583);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/error-ca8f88e5.node.react-server.esm.js
var error_ca8f88e5_node_react_server_esm = __webpack_require__(11005);
;// CONCATENATED MODULE: ../node_modules/@keystatic/core/dist/utils-ff285f26.node.react-server.esm.js


function utils_ff285f26_node_react_server_esm_assertRequired(value, validation, label) {
  if (value === null && validation !== null && validation !== void 0 && validation.isRequired) {
    throw new FieldDataError(`${label} is required`);
  }
}
function basicFormFieldWithSimpleReaderParse(config) {
  return {
    kind: 'form',
    Input: config.Input,
    defaultValue: config.defaultValue,
    parse: config.parse,
    serialize: config.serialize,
    validate: config.validate,
    reader: {
      parse(value) {
        return config.validate(config.parse(value));
      }
    }
  };
}



// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/ui-32b334fd.node.react-server.esm.js
var ui_32b334fd_node_react_server_esm = __webpack_require__(31764);
// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/index-7a5cd0db.node.react-server.esm.js
var index_7a5cd0db_node_react_server_esm = __webpack_require__(83171);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/ui-1f1aa184.node.react-server.esm.js
var ui_1f1aa184_node_react_server_esm = __webpack_require__(93530);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/utils-2bbfbd32.node.react-server.esm.js
var utils_2bbfbd32_node_react_server_esm = __webpack_require__(82101);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/languages-14058067.node.react-server.esm.js
var languages_14058067_node_react_server_esm = __webpack_require__(10896);
// EXTERNAL MODULE: ../node_modules/emery/dist/emery.cjs.js
var emery_cjs = __webpack_require__(85916);
// EXTERNAL MODULE: ../node_modules/@emotion/weak-memoize/dist/emotion-weak-memoize.esm.js
var emotion_weak_memoize_esm = __webpack_require__(86160);
;// CONCATENATED MODULE: ../node_modules/@keystatic/core/dist/index-36a0dcb1.node.react-server.esm.js
















function getValueAtPropPath(value, inputPath) {
  const path = [...inputPath];
  while (path.length) {
    const key = path.shift();
    value = value[key];
  }
  return value;
}
function traverseProps(schema, value, visitor) {
  let path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  if (schema.kind === 'form' || schema.kind === 'child') {
    visitor(schema, value, path);
    return;
  }
  if (schema.kind === 'object') {
    for (const [key, childProp] of Object.entries(schema.fields)) {
      traverseProps(childProp, value[key], visitor, [...path, key]);
    }
    visitor(schema, value, path);
    return;
  }
  if (schema.kind === 'array') {
    for (const [idx, val] of value.entries()) {
      traverseProps(schema.element, val, visitor, path.concat(idx));
    }
    return visitor(schema, value, path);
  }
  if (schema.kind === 'conditional') {
    const discriminant = value.discriminant;
    visitor(schema, discriminant, path.concat('discriminant'));
    traverseProps(schema.values[discriminant.toString()], value.value, visitor, path.concat('value'));
    visitor(schema, value, path);
    return;
  }
  (0,emery_assertions_cjs.assertNever)(schema);
}
function transformProps(schema, value, visitors) {
  let path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  if (schema.kind === 'form' || schema.kind === 'child') {
    if (visitors[schema.kind]) {
      return visitors[schema.kind](schema, value, path);
    }
    return value;
  }
  if (schema.kind === 'object') {
    const val = Object.fromEntries(Object.entries(schema.fields).map(_ref => {
      let [key, val] = _ref;
      return [key, transformProps(val, value[key], visitors, [...path, key])];
    }));
    if (visitors.object) {
      return visitors[schema.kind](schema, val, path);
    }
    return val;
  }
  if (schema.kind === 'array') {
    const val = value.map((val, idx) => transformProps(schema.element, val, visitors, path.concat(idx)));
    if (visitors.array) {
      return visitors[schema.kind](schema, val, path);
    }
    return val;
  }
  if (schema.kind === 'conditional') {
    const discriminant = transformProps(schema.discriminant, value.discriminant, visitors, path.concat('discriminant'));
    const conditionalVal = transformProps(schema.values[discriminant.toString()], value.value, visitors, path.concat('value'));
    const val = {
      discriminant,
      value: conditionalVal
    };
    if (visitors.conditional) {
      return visitors[schema.kind](schema, val, path);
    }
    return val;
  }
  assertNever(schema);
}
function replaceValueAtPropPath(schema, value, newValue, path) {
  if (path.length === 0) {
    return newValue;
  }
  const [key, ...newPath] = path;
  if (schema.kind === 'object') {
    return {
      ...value,
      [key]: replaceValueAtPropPath(schema.fields[key], value[key], newValue, newPath)
    };
  }
  if (schema.kind === 'conditional') {
    const conditionalValue = value;
    // replaceValueAtPropPath should not be used to only update the discriminant of a conditional field
    // if you want to update the discriminant of a conditional field, replace the value of the whole conditional field
    (0,emery_assertions_cjs.assert)(key === 'value');
    return {
      discriminant: conditionalValue.discriminant,
      value: replaceValueAtPropPath(schema.values[key], conditionalValue.value, newValue, newPath)
    };
  }
  if (schema.kind === 'array') {
    const prevVal = value;
    const newVal = [...prevVal];
    (0,initial_values_25bf35f4_node_react_server_esm.s)(newVal, (0,initial_values_25bf35f4_node_react_server_esm.a)(prevVal));
    newVal[key] = replaceValueAtPropPath(schema.element, newVal[key], newValue, newPath);
    return newVal;
  }

  // we should never reach here since form or child fields don't contain other fields
  // so the only thing that can happen to them is to be replaced which happens at the start of this function when path.length === 0
  (0,emery_assertions_cjs.assert)(schema.kind !== 'form' && schema.kind !== 'child');
  (0,emery_assertions_cjs.assertNever)(schema);
}

// a v important note
// marks in the markdown ast/html are represented quite differently to how they are in slate
// if you had the markdown **something https://keystonejs.com something**
// the bold node is the parent of the link node
// but in slate, marks are only represented on text nodes

const currentlyActiveMarks = new Set();
const currentlyDisabledMarks = new Set();
let currentLink = null;
function addMarkToChildren(mark, cb) {
  const wasPreviouslyActive = currentlyActiveMarks.has(mark);
  currentlyActiveMarks.add(mark);
  try {
    return cb();
  } finally {
    if (!wasPreviouslyActive) {
      currentlyActiveMarks.delete(mark);
    }
  }
}
function setLinkForChildren(href, cb) {
  // we'll only use the outer link
  if (currentLink !== null) {
    return cb();
  }
  currentLink = href;
  try {
    return cb();
  } finally {
    currentLink = null;
  }
}
function addMarksToChildren(marks, cb) {
  const marksToRemove = new Set();
  for (const mark of marks) {
    if (!currentlyActiveMarks.has(mark)) {
      marksToRemove.add(mark);
    }
    currentlyActiveMarks.add(mark);
  }
  try {
    return cb();
  } finally {
    for (const mark of marksToRemove) {
      currentlyActiveMarks.delete(mark);
    }
  }
}
function forceDisableMarkForChildren(mark, cb) {
  const wasPreviouslyDisabled = currentlyDisabledMarks.has(mark);
  currentlyDisabledMarks.add(mark);
  try {
    return cb();
  } finally {
    if (!wasPreviouslyDisabled) {
      currentlyDisabledMarks.delete(mark);
    }
  }
}

/**
 * This type is more strict than `Element & { type: 'link'; }` because `children`
 * is constrained to only contain Text nodes. This can't be assumed generally around the editor
 * (because of potentially future inline components or nested links(which are normalized away but the editor needs to not break if it happens))
 * but where this type is used, we're only going to allow links to contain Text and that's important
 * so that we know a block will never be inside an inline because Slate gets unhappy when that happens
 * (really the link inline should probably be a mark rather than an inline,
 * non-void inlines are probably always bad but that would imply changing the document
 * structure which would be such unnecessary breakage)
 */

function getInlineNodes(text) {
  const node = {
    text
  };
  for (const mark of currentlyActiveMarks) {
    if (!currentlyDisabledMarks.has(mark)) {
      node[mark] = true;
    }
  }
  if (currentLink !== null) {
    return [{
      text: ''
    }, {
      type: 'link',
      href: currentLink,
      children: [node]
    }, {
      text: ''
    }];
  }
  return [node];
}

class VariableChildFields extends (/* unused pure expression or super */ null && (Error)) {
  constructor() {
    super('There are a variable number of child fields');
  }
}
function findSingleChildField(schema) {
  try {
    const result = _findConstantChildFields(schema, [], new Set());
    if (result.length === 1) {
      return result[0];
    }
    return;
  } catch (err) {
    if (err instanceof VariableChildFields) {
      return;
    }
    throw err;
  }
}
function _findConstantChildFields(schema, path, seenSchemas) {
  if (seenSchemas.has(schema)) {
    return [];
  }
  seenSchemas.add(schema);
  switch (schema.kind) {
    case 'form':
      return [];
    case 'child':
      return [{
        relativePath: path,
        options: schema.options,
        kind: 'child'
      }];
    case 'conditional':
      {
        if (couldContainChildField(schema)) {
          throw new VariableChildFields();
        }
        return [];
      }
    case 'array':
      {
        if (schema.asChildTag) {
          const child = _findConstantChildFields(schema.element, [], seenSchemas);
          if (child.length > 1) {
            return [];
          }
          return [{
            kind: 'array',
            asChildTag: schema.asChildTag,
            field: schema,
            relativePath: path,
            child: child[0]
          }];
        }
        if (couldContainChildField(schema)) {
          throw new VariableChildFields();
        }
        return [];
      }
    case 'object':
      {
        const paths = [];
        for (const [key, value] of Object.entries(schema.fields)) {
          paths.push(..._findConstantChildFields(value, path.concat(key), seenSchemas));
        }
        return paths;
      }
  }
}
function couldContainChildField(schema) {
  let seen = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Set();
  if (seen.has(schema)) {
    return false;
  }
  seen.add(schema);
  switch (schema.kind) {
    case 'form':
      return false;
    case 'child':
      return true;
    case 'conditional':
      return Object.values(schema.values).some(value => couldContainChildField(value, seen));
    case 'object':
      return Object.keys(schema.fields).some(key => couldContainChildField(schema.fields[key], seen));
    case 'array':
      return couldContainChildField(schema.element, seen);
  }
}

function inlineNodeFromMarkdoc(node) {
  if (node.type === 'inline') {
    return inlineChildrenFromMarkdoc(node.children);
  }
  if (node.type === 'link') {
    return setLinkForChildren(node.attributes.href, () => inlineChildrenFromMarkdoc(node.children));
  }
  if (node.type === 'text') {
    return getInlineNodes(node.attributes.content);
  }
  if (node.type === 'strong') {
    return addMarkToChildren('bold', () => inlineChildrenFromMarkdoc(node.children));
  }
  if (node.type === 'code') {
    return addMarkToChildren('code', () => [{
      text: node.attributes.content,
      code: true
    }]);
  }
  if (node.type === 'em') {
    return addMarkToChildren('italic', () => inlineChildrenFromMarkdoc(node.children));
  }
  if (node.type === 's') {
    return addMarkToChildren('strikethrough', () => inlineChildrenFromMarkdoc(node.children));
  }
  if (node.type === 'tag') {
    if (node.tag === 'u') {
      return addMarkToChildren('underline', () => inlineChildrenFromMarkdoc(node.children));
    }
    if (node.tag === 'kbd') {
      return addMarkToChildren('keyboard', () => inlineChildrenFromMarkdoc(node.children));
    }
    if (node.tag === 'sub') {
      return addMarkToChildren('subscript', () => inlineChildrenFromMarkdoc(node.children));
    }
    if (node.tag === 'sup') {
      return addMarkToChildren('superscript', () => inlineChildrenFromMarkdoc(node.children));
    }
  }
  if (node.type === 'softbreak') {
    return getInlineNodes(' ');
  }
  if (node.type === 'hardbreak') {
    return getInlineNodes('\n');
  }
  if (node.tag === 'component-inline-prop' && Array.isArray(node.attributes.propPath) && node.attributes.propPath.every(x => typeof x === 'string' || typeof x === 'number')) {
    return {
      type: 'component-inline-prop',
      children: inlineFromMarkdoc(node.children),
      propPath: node.attributes.propPath
    };
  }
  throw new Error(`Unknown inline node type: ${node.type}`);
}
function inlineChildrenFromMarkdoc(nodes) {
  return nodes.flatMap(inlineNodeFromMarkdoc);
}
function inlineFromMarkdoc(nodes) {
  const transformedNodes = nodes.flatMap(inlineNodeFromMarkdoc);
  const nextNodes = [];
  let lastNode;
  for (const [idx, node] of transformedNodes.entries()) {
    var _lastNode;
    if (node.type === undefined && node.text === '' && ((_lastNode = lastNode) === null || _lastNode === void 0 ? void 0 : _lastNode.type) === undefined && idx !== transformedNodes.length - 1) {
      continue;
    }
    nextNodes.push(node);
    lastNode = node;
  }
  if (!nextNodes.length) {
    nextNodes.push({
      text: ''
    });
  }
  return nextNodes;
}
function fromMarkdoc(node, componentBlocks) {
  const nodes = node.children.flatMap(x => fromMarkdocNode(x, componentBlocks));
  if (nodes.length === 0) {
    return [{
      type: 'paragraph',
      children: [{
        text: ''
      }]
    }];
  }
  if (nodes[nodes.length - 1].type !== 'paragraph') {
    nodes.push({
      type: 'paragraph',
      children: [{
        text: ''
      }]
    });
  }
  return nodes;
}
function fromMarkdocNode(node, componentBlocks) {
  if (node.type === 'blockquote') {
    return {
      type: 'blockquote',
      children: node.children.flatMap(x => fromMarkdocNode(x, componentBlocks))
    };
  }
  if (node.type === 'fence') {
    const {
      language,
      content,
      ...rest
    } = node.attributes;
    return {
      type: 'code',
      children: [{
        text: content.replace(/\n$/, '')
      }],
      ...(typeof language === 'string' ? {
        language
      } : {}),
      ...rest
    };
  }
  if (node.type === 'heading') {
    return {
      ...node.attributes,
      level: node.attributes.level,
      type: 'heading',
      children: inlineFromMarkdoc(node.children)
    };
  }
  if (node.type === 'list') {
    return {
      type: node.attributes.ordered ? 'ordered-list' : 'unordered-list',
      children: node.children.flatMap(x => fromMarkdocNode(x, componentBlocks))
    };
  }
  if (node.type === 'item') {
    var _node$children$;
    const children = [{
      type: 'list-item-content',
      children: inlineFromMarkdoc([node.children[0]])
    }];
    if (((_node$children$ = node.children[1]) === null || _node$children$ === void 0 ? void 0 : _node$children$.type) === 'list') {
      const list = node.children[1];
      children.push({
        type: list.attributes.ordered ? 'ordered-list' : 'unordered-list',
        children: list.children.flatMap(x => fromMarkdocNode(x, componentBlocks))
      });
    }
    return {
      type: 'list-item',
      children
    };
  }
  if (node.type === 'paragraph') {
    if (node.children.length === 1 && node.children[0].type === 'inline' && node.children[0].children.length === 1 && node.children[0].children[0].type === 'image') {
      var _image$attributes$tit;
      const image = node.children[0].children[0];
      return {
        type: 'image',
        src: decodeURI(image.attributes.src),
        alt: image.attributes.alt,
        title: (_image$attributes$tit = image.attributes.title) !== null && _image$attributes$tit !== void 0 ? _image$attributes$tit : '',
        children: [{
          text: ''
        }]
      };
    }
    const children = inlineFromMarkdoc(node.children);
    if (children.length === 1 && children[0].type === 'component-inline-prop') {
      return children[0];
    }
    return {
      type: 'paragraph',
      children,
      textAlign: node.attributes.textAlign
    };
  }
  if (node.type === 'hr') {
    return {
      type: 'divider',
      children: [{
        text: ''
      }]
    };
  }
  if (node.type === 'table') {
    return {
      type: 'table',
      children: node.children.flatMap(x => fromMarkdocNode(x, componentBlocks))
    };
  }
  if (node.type === 'tbody') {
    return {
      type: 'table-body',
      children: node.children.flatMap(x => fromMarkdocNode(x, componentBlocks))
    };
  }
  if (node.type === 'thead') {
    if (!node.children.length) return [];
    return {
      type: 'table-head',
      children: node.children.flatMap(x => fromMarkdocNode(x, componentBlocks))
    };
  }
  if (node.type === 'tr') {
    return {
      type: 'table-row',
      children: node.children.flatMap(x => fromMarkdocNode(x, componentBlocks))
    };
  }
  if (node.type === 'td') {
    return {
      type: 'table-cell',
      children: node.children.flatMap(x => fromMarkdocNode(x, componentBlocks))
    };
  }
  if (node.type === 'th') {
    return {
      type: 'table-cell',
      header: true,
      children: node.children.flatMap(x => fromMarkdocNode(x, componentBlocks))
    };
  }
  if (node.type === 'tag') {
    if (node.tag === 'table') {
      return fromMarkdocNode(node.children[0], componentBlocks);
    }
    if (node.tag === 'layout') {
      return {
        type: 'layout',
        layout: node.attributes.layout,
        children: node.children.flatMap(x => fromMarkdocNode(x, componentBlocks))
      };
    }
    if (node.tag === 'layout-area') {
      return {
        type: 'layout-area',
        children: node.children.flatMap(x => fromMarkdocNode(x, componentBlocks))
      };
    }
    if (node.tag === 'component-block') {
      return {
        type: 'component-block',
        component: node.attributes.component,
        props: node.attributes.props,
        children: node.children.length === 0 ? [{
          type: 'component-inline-prop',
          children: [{
            text: ''
          }]
        }] : node.children.flatMap(x => fromMarkdocNode(x, componentBlocks))
      };
    }
    if (node.tag === 'component-block-prop' && Array.isArray(node.attributes.propPath) && node.attributes.propPath.every(x => typeof x === 'string' || typeof x === 'number')) {
      return {
        type: 'component-block-prop',
        children: node.children.flatMap(x => fromMarkdocNode(x, componentBlocks)),
        propPath: node.attributes.propPath
      };
    }
    if (node.tag) {
      const componentBlock = componentBlocks[node.tag];
      if (componentBlock) {
        const singleChildField = findSingleChildField({
          kind: 'object',
          fields: componentBlock.schema
        });
        if (singleChildField) {
          const newAttributes = JSON.parse(JSON.stringify(node.attributes));
          const children = [];
          toChildrenAndProps$1(node.children, children, newAttributes, singleChildField, [], componentBlocks);
          return {
            type: 'component-block',
            component: node.tag,
            props: newAttributes,
            children
          };
        }
        return {
          type: 'component-block',
          component: node.tag,
          props: node.attributes,
          children: node.children.length === 0 ? [{
            type: 'component-inline-prop',
            children: [{
              text: ''
            }]
          }] : node.children.flatMap(x => fromMarkdocNode(x, componentBlocks))
        };
      }
    }
    throw new Error(`Unknown tag: ${node.tag}`);
  }
  return inlineNodeFromMarkdoc(node);
}
function toChildrenAndProps$1(fromMarkdoc, resultingChildren, value, singleChildField, parentPropPath, componentBlocks) {
  if (singleChildField.kind === 'child') {
    const children = fromMarkdoc.flatMap(x => fromMarkdocNode(x, componentBlocks));
    resultingChildren.push({
      type: `component-${singleChildField.options.kind}-prop`,
      propPath: [...parentPropPath, ...singleChildField.relativePath],
      children
    });
  }
  if (singleChildField.kind === 'array') {
    const arr = [];
    for (let [idx, child] of fromMarkdoc.entries()) {
      if (child.type === 'paragraph') {
        child = child.children[0].children[0];
      }
      if (child.type !== 'tag') {
        throw new Error(`expected tag ${singleChildField.asChildTag}, found type: ${child.type}`);
      }
      if (child.tag !== singleChildField.asChildTag) {
        throw new Error(`expected tag ${singleChildField.asChildTag}, found tag: ${child.tag}`);
      }
      const attributes = JSON.parse(JSON.stringify(child.attributes));
      if (singleChildField.child) {
        toChildrenAndProps$1(child.children, resultingChildren, attributes, singleChildField.child, [...parentPropPath, ...singleChildField.relativePath, idx], componentBlocks);
      }
      arr.push(attributes);
    }
    const key = singleChildField.relativePath[singleChildField.relativePath.length - 1];
    const parent = getValueAtPropPath(value, singleChildField.relativePath.slice(0, -1));
    parent[key] = arr;
  }
}

function areArraysEqual(a, b) {
  return a.length === b.length && a.every((x, i) => x === b[i]);
}
function normalizeTextBasedOnInlineMarksAndSoftBreaks(_ref, editor, inlineMarks, softBreaks) {
  let [node, path] = _ref;
  const marksToRemove = Object.keys(node).filter(x => x !== 'text' && x !== 'insertMenu' && inlineMarks[x] !== true);
  if (marksToRemove.length) {
    dist.Transforms.unsetNodes(editor, marksToRemove, {
      at: path
    });
    return true;
  }
  if (!softBreaks) {
    const hasSoftBreaks = node.text.includes('\n');
    if (hasSoftBreaks) {
      const [parentNode] = dist.Editor.parent(editor, path);
      if (parentNode.type !== 'code') {
        for (const position of dist.Editor.positions(editor, {
          at: path
        })) {
          const character = dist.Node.get(editor, position.path).text[position.offset];
          if (character === '\n') {
            dist.Transforms.delete(editor, {
              at: position
            });
            return true;
          }
        }
      }
    }
  }
  return false;
}
function normalizeInlineBasedOnLinks(_ref2, editor, links) {
  let [node, path] = _ref2;
  if (node.type === 'link' && !links) {
    dist.Transforms.insertText(editor, ` (${node.href})`, {
      at: dist.Editor.end(editor, path)
    });
    dist.Transforms.unwrapNodes(editor, {
      at: path
    });
    return true;
  }
  return false;
}
function normalizeElementBasedOnDocumentFeatures(_ref3, editor, _ref4) {
  let [node, path] = _ref3;
  let {
    formatting,
    dividers,
    layouts,
    links,
    images,
    tables
  } = _ref4;
  if (node.type === 'heading' && (!formatting.headings.levels.length || !formatting.headings.levels.includes(node.level)) || node.type === 'ordered-list' && !formatting.listTypes.ordered || node.type === 'unordered-list' && !formatting.listTypes.unordered || node.type === 'code' && !formatting.blockTypes.code || node.type === 'blockquote' && !formatting.blockTypes.blockquote || node.type === 'image' && !images || node.type === 'table' && !tables || node.type === 'layout' && (layouts.length === 0 || !layouts.some(layout => areArraysEqual(layout, node.layout)))) {
    dist.Transforms.unwrapNodes(editor, {
      at: path
    });
    return true;
  }
  if ((node.type === 'paragraph' || node.type === 'heading') && (!formatting.alignment.center && node.textAlign === 'center' || !formatting.alignment.end && node.textAlign === 'end' || 'textAlign' in node && node.textAlign !== 'center' && node.textAlign !== 'end')) {
    dist.Transforms.unsetNodes(editor, 'textAlign', {
      at: path
    });
    return true;
  }
  if (node.type === 'divider' && !dividers) {
    dist.Transforms.removeNodes(editor, {
      at: path
    });
    return true;
  }
  return normalizeInlineBasedOnLinks([node, path], editor, links);
}
function withDocumentFeaturesNormalization(documentFeatures, editor) {
  const {
    normalizeNode
  } = editor;
  editor.normalizeNode = _ref5 => {
    let [node, path] = _ref5;
    if (dist.Text.isText(node)) {
      normalizeTextBasedOnInlineMarksAndSoftBreaks([node, path], editor, documentFeatures.formatting.inlineMarks, documentFeatures.formatting.softBreaks);
    } else if (dist.Element.isElement(node)) {
      normalizeElementBasedOnDocumentFeatures([node, path], editor, documentFeatures);
    }
    normalizeNode([node, path]);
  };
  return editor;
}

function index_36a0dcb1_node_react_server_esm_image(_ref) {
  let {
    label,
    directory,
    validation,
    description,
    publicPath
  } = _ref;
  return {
    kind: 'form',
    formKind: 'asset',
    Input(props) {
      return /*#__PURE__*/jsx(ImageFieldInput, {
        label: label,
        description: description,
        validation: validation,
        ...props
      });
    },
    defaultValue() {
      return null;
    },
    filename(value, args) {
      if (typeof value === 'string') {
        return value.slice(getSrcPrefix(publicPath, args.slug).length);
      }
      return undefined;
    },
    parse(value, args) {
      var _value$match$, _value$match;
      if (value === undefined) {
        return null;
      }
      if (typeof value !== 'string') {
        throw new FieldDataError('Must be a string');
      }
      if (args.asset === undefined) {
        return null;
      }
      return {
        data: args.asset,
        filename: value.slice(getSrcPrefix(publicPath, args.slug).length),
        extension: (_value$match$ = (_value$match = value.match(/\.([^.]+$)/)) === null || _value$match === void 0 ? void 0 : _value$match[1]) !== null && _value$match$ !== void 0 ? _value$match$ : ''
      };
    },
    validate(value) {
      assertRequired(value, validation, label);
      return value;
    },
    serialize(value, args) {
      if (value === null) {
        return {
          value: undefined,
          asset: undefined
        };
      }
      const filename = args.suggestedFilenamePrefix ? args.suggestedFilenamePrefix + '.' + value.extension : value.filename;
      return {
        value: `${getSrcPrefix(publicPath, args.slug)}${filename}`,
        asset: {
          filename,
          content: value.data
        }
      };
    },
    directory: directory ? fixPath(directory) : undefined,
    reader: {
      parse(value) {
        if (typeof value !== 'string' && value !== undefined) {
          throw new FieldDataError('Must be a string');
        }
        const val = value === undefined ? null : value;
        assertRequired(val, validation, label);
        return val;
      }
    }
  };
}
function getSrcPrefix(publicPath, slug) {
  return typeof publicPath === 'string' ? `/${fixPath(publicPath)}/${slug === undefined ? '' : slug + '/'}` : '';
}

function deserializeFiles(nodes, componentBlocks, files, otherFiles, mode, documentFeatures, slug) {
  return nodes.map(node => {
    if (node.type === 'component-block') {
      const componentBlock = componentBlocks[node.component];
      if (!componentBlock) return node;
      const schema = object(componentBlock.schema);
      return {
        ...node,
        props: deserializeProps(schema, node.props, files, otherFiles, mode, slug)
      };
    }
    if (node.type === 'image' && typeof node.src === 'string' && mode === 'edit') {
      var _ref;
      const prefix = getSrcPrefixForImageBlock(documentFeatures, slug);
      const filename = node.src.slice(prefix.length);
      const content = (_ref = typeof documentFeatures.images === 'object' && typeof documentFeatures.images.directory === 'string' ? otherFiles.get(fixPath(documentFeatures.images.directory)) : files) === null || _ref === void 0 ? void 0 : _ref.get(filename);
      if (!content) {
        return {
          type: 'paragraph',
          children: [{
            text: `Missing image ${filename}`
          }]
        };
      }
      return {
        type: 'image',
        src: {
          filename,
          content
        },
        alt: node.alt,
        title: node.title,
        children: [{
          text: ''
        }]
      };
    }
    if (typeof node.type === 'string') {
      const children = deserializeFiles(node.children, componentBlocks, files, otherFiles, mode, documentFeatures, slug);
      return {
        ...node,
        children
      };
    }
    return node;
  });
}
function deserializeProps(schema, value, files, otherFiles, mode, slug) {
  return transformProps(schema, value, {
    form: (schema, value) => {
      if (schema.formKind === 'asset') {
        var _otherFiles$get;
        if (mode === 'read') {
          return schema.reader.parse(value);
        }
        const filename = schema.filename(value, {
          slug,
          suggestedFilenamePrefix: undefined
        });
        return schema.parse(value, {
          asset: filename ? schema.directory ? (_otherFiles$get = otherFiles.get(schema.directory)) === null || _otherFiles$get === void 0 ? void 0 : _otherFiles$get.get(filename) : files.get(filename) : undefined,
          slug
        });
      }
      if (schema.formKind === 'content') {
        throw new Error('Not implemented');
      }
      if (mode === 'read') {
        return schema.reader.parse(value);
      }
      return schema.parse(value, undefined);
    }
  });
}
function getSrcPrefixForImageBlock(documentFeatures, slug) {
  return getSrcPrefix(typeof documentFeatures.images === 'object' ? documentFeatures.images.publicPath : undefined, slug);
}

function serializeProps(rootValue, rootSchema,
// note you might have a slug without a slug field when serializing props inside a component block or etc. in the editor
slugField, slug, shouldSuggestFilenamePrefix) {
  const extraFiles = [];
  return {
    value: transformProps(rootSchema, rootValue, {
      form(schema, value, propPath) {
        if (propPath.length === 1 && slugField === propPath[0]) {
          if (schema.formKind !== 'slug') {
            throw new Error('slugField is a not a slug field');
          }
          return schema.serializeWithSlug(value).value;
        }
        if (schema.formKind === 'asset') {
          const {
            asset,
            value: forYaml
          } = schema.serialize(value, {
            suggestedFilenamePrefix: shouldSuggestFilenamePrefix ? getPropPathPortion(propPath, rootSchema, rootValue) : undefined,
            slug
          });
          if (asset) {
            extraFiles.push({
              path: asset.filename,
              contents: asset.content,
              parent: schema.directory
            });
          }
          return forYaml;
        }
        if (schema.formKind === 'content') {
          const {
            other,
            external,
            content,
            value: forYaml
          } = schema.serialize(value, {
            slug
          });
          if (content) {
            extraFiles.push({
              path: getPropPathPortion(propPath, rootSchema, rootValue) + schema.contentExtension,
              contents: content,
              parent: undefined
            });
          }
          for (const [key, contents] of other) {
            extraFiles.push({
              path: getPropPathPortion(propPath, rootSchema, rootValue) + '/' + key,
              contents,
              parent: undefined
            });
          }
          const allowedDirectories = new Set(schema.directories);
          for (const [directory, contents] of external) {
            if (!allowedDirectories.has(directory)) {
              throw new Error(`Invalid directory ${directory} in content field serialization`);
            }
            for (const [filename, fileContents] of contents) {
              extraFiles.push({
                path: filename,
                contents: fileContents,
                parent: directory
              });
            }
          }
          return forYaml;
        }
        return schema.serialize(value).value;
      },
      object(_schema, value) {
        return Object.fromEntries(Object.entries(value).filter(_ref => {
          let [_, val] = _ref;
          return val !== undefined;
        }));
      },
      array(_schema, value) {
        return value.map(val => val === undefined ? null : val);
      },
      child() {
        return undefined;
      }
    }),
    extraFiles
  };
}
function getPropPathPortion(path, schema, value) {
  const end = [];
  for (const portion of path) {
    if (schema.kind === 'array') {
      value = value[portion];
      if (schema.slugField && schema.element.kind === 'object') {
        const slug = getSlugFromState({
          schema: schema.element.fields,
          slugField: schema.slugField
        }, value);
        end.push(slug);
      } else {
        end.push(portion);
      }
      schema = schema.element;
      continue;
    }
    end.push(portion);
    if (schema.kind === 'object') {
      value = value[portion];
      schema = schema.fields[portion];
      continue;
    }
    if (schema.kind === 'conditional') {
      if (portion === 'discriminant') {
        schema = schema.discriminant;
      } else if (portion === 'value') {
        schema = schema.values[value.discriminant];
      }
      value = value[portion];
      continue;
    }
    throw new Error(`unexpected ${schema.kind}`);
  }
  return end.join('/');
}

function toInline(nodes) {
  return new Ast.Node('inline', {}, nodes.flatMap(toMarkdocInline));
}
const markToMarkdoc = {
  bold: {
    type: 'strong'
  },
  code: {
    type: 'code'
  },
  italic: {
    type: 'em'
  },
  underline: {
    type: 'tag',
    tag: 'u'
  },
  keyboard: {
    type: 'tag',
    tag: 'kbd'
  },
  strikethrough: {
    type: 's'
  },
  subscript: {
    type: 'tag',
    tag: 'sub'
  },
  superscript: {
    type: 'tag',
    tag: 'sup'
  }
};
function toMarkdocInline(node) {
  if (node.type === 'link') {
    return new Ast.Node('link', {
      href: node.href
    }, node.children.flatMap(toMarkdocInline));
  }
  if (node.type !== undefined) {
    throw new Error(`unexpected inline node type: ${node.type}`);
  }
  if (node.code) {
    return new Ast.Node('code', {
      content: node.text
    }, []);
  }
  const marks = Object.keys(node).filter(mark => mark !== 'text').sort();
  let markdocNode = new Ast.Node('text', {
    content: node.text
  });
  for (const mark of marks) {
    const config = markToMarkdoc[mark];
    if (config) {
      markdocNode = new Ast.Node(config.type, {}, [markdocNode], config.tag);
    }
  }
  return markdocNode;
}
function toMarkdocDocument(nodes, _config) {
  const extraFiles = [];
  const config = {
    ..._config,
    extraFiles
  };
  const node = new Ast.Node('document', {}, nodes.flatMap(x => toMarkdoc(x, config)));
  return {
    node,
    extraFiles
  };
}
function toChildrenAndProps(childrenAsMarkdoc, resultingChildren, value, singleChildField) {
  if (singleChildField.kind === 'child') {
    const child = childrenAsMarkdoc.find(x => areArraysEqual(x.propPath, singleChildField.relativePath));
    if (child) {
      resultingChildren.push(...child.children);
    }
    return;
  }
  if (singleChildField.kind === 'array') {
    const key = singleChildField.relativePath[singleChildField.relativePath.length - 1];
    const parent = getValueAtPropPath(value, singleChildField.relativePath.slice(0, -1));
    const valueAtPropPath = parent[key];
    delete parent[key];
    const childNodes = new Map();
    for (const child of childrenAsMarkdoc) {
      const innerPropPath = child.propPath.slice(singleChildField.relativePath.length + 1);
      const num = child.propPath[singleChildField.relativePath.length];
      if (childNodes.get(num) === undefined) {
        childNodes.set(num, []);
      }
      childNodes.get(num).push({
        children: child.children,
        propPath: innerPropPath
      });
    }
    resultingChildren.push(...valueAtPropPath.map((x, i) => {
      var _childNodes$get;
      const newChildrenAsMarkdoc = (_childNodes$get = childNodes.get(i)) !== null && _childNodes$get !== void 0 ? _childNodes$get : [];
      const children = [];
      toChildrenAndProps(newChildrenAsMarkdoc, children, x, singleChildField.child);
      return new Ast.Node('tag', x, children, singleChildField.asChildTag);
    }));
  }
}
function toMarkdoc(node, config) {
  if (node.type === 'paragraph') {
    const markdocNode = new Ast.Node('paragraph', node.textAlign ? {
      textAlign: node.textAlign
    } : {}, [toInline(node.children)]);
    if (node.textAlign) {
      markdocNode.annotations.push({
        name: 'textAlign',
        value: node.textAlign,
        type: 'attribute'
      });
    }
    return markdocNode;
  }
  if (node.type === 'image') {
    config.extraFiles.push({
      contents: node.src.content,
      path: node.src.filename,
      parent: typeof config.documentFeatures.images === 'object' && typeof config.documentFeatures.images.directory === 'string' ? fixPath(config.documentFeatures.images.directory) : undefined
    });
    return new Ast.Node('paragraph', {}, [new Ast.Node('inline', {}, [new Ast.Node('image', {
      src: encodeURI(`${getSrcPrefixForImageBlock(config.documentFeatures, config.slug)}${node.src.filename}`),
      alt: node.alt,
      title: node.title
    })])]);
  }
  if (node.type === 'code') {
    const extraAttributes = {};
    const {
      children,
      language,
      type,
      ...rest
    } = node;
    const schema = typeof config.documentFeatures.formatting.blockTypes.code === 'object' ? config.documentFeatures.formatting.blockTypes.code.schema : undefined;
    if (schema && Object.keys(schema.fields).length > 0) {
      const serialized = serializeProps(getInitialPropsValueFromInitializer(schema, rest), schema, undefined, config.slug, false);
      Object.assign(extraAttributes, serialized.value);
      config.extraFiles.push(...serialized.extraFiles);
    }
    let content = children[0].text + '\n';
    const markdocNode = new Ast.Node('fence', {
      content,
      language,
      ...extraAttributes
    }, [new Ast.Node('text', {
      content
    })]);
    for (const [key, value] of Object.entries(extraAttributes)) {
      markdocNode.annotations.push({
        name: key,
        value,
        type: 'attribute'
      });
    }
    return markdocNode;
  }
  const _toMarkdoc = node => toMarkdoc(node, config);
  if (node.type === 'blockquote') {
    return new Ast.Node('blockquote', {}, node.children.map(_toMarkdoc));
  }
  if (node.type === 'divider') {
    return new Ast.Node('hr');
  }
  if (node.type === 'table') {
    const head = node.children.find(x => x.type === 'table-head');
    return new Ast.Node('tag', {}, [new Ast.Node('table', {}, [new Ast.Node('thead', {}, head ? head.children.map(_toMarkdoc) : []), _toMarkdoc(node.children.find(x => x.type === 'table-body'))])], 'table');
  }
  if (node.type === 'table-body') {
    return new Ast.Node('tbody', {}, node.children.map(_toMarkdoc));
  }
  if (node.type === 'table-row') {
    return new Ast.Node('tr', {}, node.children.map(_toMarkdoc));
  }
  if (node.type === 'table-cell') {
    return new Ast.Node(node.header ? 'th' : 'td', {}, node.children.map(_toMarkdoc));
  }
  if (node.type === 'heading') {
    const extraAttributes = {};
    if (node.textAlign) {
      extraAttributes.textAlign = node.textAlign;
    }
    const {
      children,
      level,
      textAlign,
      type,
      ...rest
    } = node;
    const schema = config.documentFeatures.formatting.headings.schema;
    if (Object.keys(schema.fields).length > 0) {
      Object.assign(extraAttributes, serializeProps(getInitialPropsValueFromInitializer(schema, rest), schema, undefined, config.slug, false).value);
    }
    const markdocNode = new Ast.Node('heading', {
      level: node.level,
      ...extraAttributes
    }, [toInline(node.children)]);
    for (const [key, value] of Object.entries(extraAttributes)) {
      markdocNode.annotations.push({
        name: key,
        value,
        type: 'attribute'
      });
    }
    return markdocNode;
  }
  if (node.type === 'ordered-list') {
    return new Ast.Node('list', {
      ordered: true
    }, node.children.map(_toMarkdoc));
  }
  if (node.type === 'unordered-list') {
    return new Ast.Node('list', {
      ordered: false
    }, node.children.map(_toMarkdoc));
  }
  if (node.type === 'layout') {
    return new Ast.Node('tag', {
      layout: node.layout
    }, node.children.map(_toMarkdoc), 'layout');
  }
  if (node.type === 'layout-area') {
    return new Ast.Node('tag', {}, node.children.flatMap(_toMarkdoc), 'layout-area');
  }
  if (node.type === 'component-block') {
    const isVoid = node.children.length === 1 && node.children[0].type === 'component-inline-prop' && node.children[0].propPath === undefined;
    const componentBlock = config.componentBlocks[node.component];
    const childrenAsMarkdoc = [];
    for (const child of node.children) {
      if ((child.type === 'component-block-prop' || child.type === 'component-inline-prop') && child.propPath !== undefined) {
        childrenAsMarkdoc.push({
          type: child.type,
          propPath: child.propPath,
          children: child.type === 'component-block-prop' ? child.children.flatMap(_toMarkdoc) : [toInline(child.children)]
        });
      }
    }
    let attributes = node.props;
    if (componentBlock) {
      const serialized = serializeProps(node.props, {
        kind: 'object',
        fields: componentBlock.schema
      }, undefined, config.slug, false);
      attributes = serialized.value;
      config.extraFiles.push(...serialized.extraFiles);
      const singleChildField = findSingleChildField({
        kind: 'object',
        fields: componentBlock.schema
      });
      if (singleChildField) {
        const children = [];
        toChildrenAndProps(childrenAsMarkdoc, children, attributes, singleChildField);
        return new Ast.Node('tag', attributes, children, node.component);
      }
    }
    const children = isVoid ? [] : childrenAsMarkdoc.map(x => new Ast.Node('tag', {
      propPath: x.propPath
    }, x.children, x.type));
    return new Ast.Node('tag', attributes, children, node.component);
  }
  if (node.type === 'component-block-prop' || node.type === 'component-inline-prop') {
    return new Ast.Node('tag', {
      propPath: node.propPath
    }, node.type === 'component-inline-prop' ? [toInline(node.children)] : node.children.flatMap(_toMarkdoc), node.type);
  }
  if (node.type === 'list-item') {
    const listItemContent = node.children[0];
    if (listItemContent.type !== 'list-item-content') {
      throw new Error('list item content must contain a list-item-content');
    }
    const inline = toInline(listItemContent.children);
    const children = [inline];
    const nestedList = node.children[1];
    if (nestedList) {
      children.push(toMarkdoc(nestedList, config));
    }
    return new Ast.Node('item', {}, children);
  }
  if (node.type === 'list-item-content') {
    throw new Error('list-item-content in unexpected position');
  }
  debugger;
  throw new Error(`unexpected node type: ${node.type}`);
}

const codeBlockShortcutPattern = /^```(\w+)? ?$/;
function withCodeBlock(documentFeatures, componentBlocks, editor) {
  const {
    insertBreak,
    normalizeNode,
    insertText
  } = editor;
  function codeBlockShortcut(block) {
    var _aliasesToCanonicalNa;
    if ((block === null || block === void 0 ? void 0 : block[0].type) !== 'paragraph' || block[0].children.length !== 1 || block[0].children[0].type !== undefined) {
      return false;
    }
    const match = codeBlockShortcutPattern.exec(block[0].children[0].text);
    if (!match) {
      return false;
    }
    const locationDocumentFeatures = (0,utils_2bbfbd32_node_react_server_esm.g)(editor, documentFeatures, componentBlocks);
    if (locationDocumentFeatures && (locationDocumentFeatures.kind === 'inline' || !locationDocumentFeatures.documentFeatures.formatting.blockTypes.code)) {
      return false;
    }

    // so that this starts a new undo group
    editor.history.undos.push({
      operations: [],
      selectionBefore: editor.selection
    });
    dist.Transforms.select(editor, block[1]);
    dist.Transforms.delete(editor);
    dist.Transforms.wrapNodes(editor, {
      type: 'code',
      ...(match[1] ? {
        language: (_aliasesToCanonicalNa = languages_14058067_node_react_server_esm.a.get(match[1].toLowerCase())) !== null && _aliasesToCanonicalNa !== void 0 ? _aliasesToCanonicalNa : match[1]
      } : {}),
      children: []
    }, {
      match: node => node.type === 'paragraph'
    });
    return true;
  }
  editor.insertBreak = () => {
    const block = dist.Editor.above(editor, {
      match: utils_2bbfbd32_node_react_server_esm.i
    });
    if ((block === null || block === void 0 ? void 0 : block[0].type) === 'code' && dist.Text.isText(block[0].children[0])) {
      const text = block[0].children[0].text;
      if (text[text.length - 1] === '\n' && editor.selection && dist.Range.isCollapsed(editor.selection) && dist.Point.equals(dist.Editor.end(editor, block[1]), editor.selection.anchor)) {
        insertBreak();
        dist.Transforms.setNodes(editor, {
          type: 'paragraph',
          children: []
        });
        dist.Transforms.delete(editor, {
          distance: 1,
          at: {
            path: [...block[1], 0],
            offset: text.length - 1
          }
        });
        return;
      }
      editor.insertText('\n');
      return;
    }
    if (editor.selection && dist.Range.isCollapsed(editor.selection) && codeBlockShortcut(block)) {
      return;
    }
    insertBreak();
  };
  editor.insertText = text => {
    insertText(text);
    if (text === ' ' && editor.selection && dist.Range.isCollapsed(editor.selection)) {
      codeBlockShortcut(dist.Editor.above(editor, {
        match: utils_2bbfbd32_node_react_server_esm.i
      }));
    }
  };
  editor.normalizeNode = _ref => {
    let [node, path] = _ref;
    if (node.type === 'code' && dist.Element.isElement(node)) {
      for (const [index, childNode] of node.children.entries()) {
        if (!dist.Text.isText(childNode)) {
          if (editor.isVoid(childNode)) {
            dist.Transforms.removeNodes(editor, {
              at: [...path, index]
            });
          } else {
            dist.Transforms.unwrapNodes(editor, {
              at: [...path, index]
            });
          }
          return;
        }
        const marks = Object.keys(childNode).filter(x => x !== 'text');
        if (marks.length) {
          dist.Transforms.unsetNodes(editor, marks, {
            at: [...path, index]
          });
          return;
        }
      }
    }
    normalizeNode([node, path]);
  };
  return editor;
}

function findChildPropPathsForProp(value, schema, path) {
  switch (schema.kind) {
    case 'form':
      return [];
    case 'child':
      return [{
        path: path,
        options: schema.options
      }];
    case 'conditional':
      return findChildPropPathsForProp(value.value, schema.values[value.discriminant], path.concat('value'));
    case 'object':
      {
        const paths = [];
        Object.keys(schema.fields).forEach(key => {
          paths.push(...findChildPropPathsForProp(value[key], schema.fields[key], path.concat(key)));
        });
        return paths;
      }
    case 'array':
      {
        const paths = [];
        value.forEach((val, i) => {
          paths.push(...findChildPropPathsForProp(val, schema.element, path.concat(i)));
        });
        return paths;
      }
  }
}
function findChildPropPaths(value, props) {
  const propPaths = findChildPropPathsForProp(value, {
    kind: 'object',
    fields: props
  }, []);
  if (!propPaths.length) {
    return [{
      path: undefined,
      options: {
        kind: 'inline',
        placeholder: ''
      }
    }];
  }
  return propPaths;
}

function getAncestorComponentBlock(editor) {
  if (editor.selection) {
    const ancestorEntry = dist.Editor.above(editor, {
      match: node => (0,utils_2bbfbd32_node_react_server_esm.i)(node) && node.type !== 'paragraph'
    });
    if (ancestorEntry && (ancestorEntry[0].type === 'component-block-prop' || ancestorEntry[0].type === 'component-inline-prop')) {
      return {
        isInside: true,
        componentBlock: dist.Editor.parent(editor, ancestorEntry[1]),
        prop: ancestorEntry
      };
    }
  }
  return {
    isInside: false
  };
}
const alreadyNormalizedThings = new WeakMap();
function normalizeNodeWithinComponentProp(_ref, editor, fieldOptions) {
  let [node, path] = _ref;
  let alreadyNormalizedNodes = alreadyNormalizedThings.get(fieldOptions);
  if (!alreadyNormalizedNodes) {
    alreadyNormalizedNodes = new WeakSet();
    alreadyNormalizedThings.set(fieldOptions, alreadyNormalizedNodes);
  }
  if (alreadyNormalizedNodes.has(node)) {
    return false;
  }
  let didNormalization = false;
  if (fieldOptions.inlineMarks !== 'inherit' && dist.Text.isText(node)) {
    didNormalization = normalizeTextBasedOnInlineMarksAndSoftBreaks([node, path], editor, fieldOptions.inlineMarks, fieldOptions.softBreaks);
  }
  if (dist.Element.isElement(node)) {
    let childrenHasChanged = node.children.map((node, i) => normalizeNodeWithinComponentProp([node, [...path, i]], editor, fieldOptions))
    // .map then .some because we don't want to exit early
    .some(x => x);
    if (fieldOptions.kind === 'block') {
      if (node.type === 'component-block') {
        if (!fieldOptions.componentBlocks) {
          dist.Transforms.unwrapNodes(editor, {
            at: path
          });
          didNormalization = true;
        }
      } else {
        didNormalization = normalizeElementBasedOnDocumentFeatures([node, path], editor, fieldOptions.documentFeatures) || childrenHasChanged;
      }
    } else {
      didNormalization = normalizeInlineBasedOnLinks([node, path], editor, fieldOptions.documentFeatures.links);
    }
  }
  if (didNormalization === false) {
    alreadyNormalizedNodes.add(node);
  }
  return didNormalization;
}
function canSchemaContainChildField(rootSchema) {
  const queue = new Set([rootSchema]);
  for (const schema of queue) {
    if (schema.kind === 'form') ; else if (schema.kind === 'child') {
      return true;
    } else if (schema.kind === 'array') {
      queue.add(schema.element);
    } else if (schema.kind === 'object') {
      for (const innerProp of Object.values(schema.fields)) {
        queue.add(innerProp);
      }
    } else if (schema.kind === 'conditional') {
      for (const innerProp of Object.values(schema.values)) {
        queue.add(innerProp);
      }
    } else {
      (0,emery_cjs.assertNever)(schema);
    }
  }
  return false;
}
function doesSchemaOnlyEverContainASingleChildField(rootSchema) {
  const queue = new Set([rootSchema]);
  let hasFoundChildField = false;
  for (const schema of queue) {
    if (schema.kind === 'form') ; else if (schema.kind === 'child') {
      if (hasFoundChildField) {
        return false;
      }
      hasFoundChildField = true;
    } else if (schema.kind === 'array') {
      if (canSchemaContainChildField(schema.element)) {
        return false;
      }
    } else if (schema.kind === 'object') {
      for (const innerProp of Object.values(schema.fields)) {
        queue.add(innerProp);
      }
    } else if (schema.kind === 'conditional') {
      for (const innerProp of Object.values(schema.values)) {
        queue.add(innerProp);
      }
    } else {
      (0,emery_cjs.assertNever)(schema);
    }
  }
  return hasFoundChildField;
}
function findArrayFieldsWithSingleChildField(schema, value) {
  const propPaths = [];
  traverseProps(schema, value, (schema, value, path) => {
    if (schema.kind === 'array' && doesSchemaOnlyEverContainASingleChildField(schema.element)) {
      propPaths.push([path, schema]);
    }
  });
  return propPaths;
}
function isEmptyChildFieldNode(element) {
  const firstChild = element.children[0];
  return element.children.length === 1 && (element.type === 'component-inline-prop' && firstChild.type === undefined && firstChild.text === '' || element.type === 'component-block-prop' && firstChild.type === 'paragraph' && firstChild.children.length === 1 && firstChild.children[0].type === undefined && firstChild.children[0].text === '');
}
function withComponentBlocks(blockComponents, editorDocumentFeatures, editor) {
  // note that conflicts between the editor document features
  // and the child field document features are dealt with elsewhere
  const memoizedGetDocumentFeaturesForChildField = (0,emotion_weak_memoize_esm/* default */.Z)(options => {
    return (0,utils_2bbfbd32_node_react_server_esm.a)(editorDocumentFeatures, options);
  });
  const {
    normalizeNode,
    deleteBackward,
    insertBreak
  } = editor;
  editor.deleteBackward = unit => {
    if (editor.selection) {
      const ancestorComponentBlock = getAncestorComponentBlock(editor);
      if (ancestorComponentBlock.isInside && dist.Range.isCollapsed(editor.selection) && dist.Editor.isStart(editor, editor.selection.anchor, ancestorComponentBlock.prop[1]) && ancestorComponentBlock.prop[1][ancestorComponentBlock.prop[1].length - 1] === 0) {
        dist.Transforms.unwrapNodes(editor, {
          at: ancestorComponentBlock.componentBlock[1]
        });
        return;
      }
    }
    deleteBackward(unit);
  };
  editor.insertBreak = () => {
    const ancestorComponentBlock = getAncestorComponentBlock(editor);
    if (editor.selection && ancestorComponentBlock.isInside) {
      const {
        prop: [componentPropNode, componentPropPath],
        componentBlock: [componentBlockNode, componentBlockPath]
      } = ancestorComponentBlock;
      const isLastProp = componentPropPath[componentPropPath.length - 1] === componentBlockNode.children.length - 1;
      if (componentPropNode.type === 'component-block-prop') {
        const [[paragraphNode, paragraphPath]] = dist.Editor.nodes(editor, {
          match: node => node.type === 'paragraph'
        });
        const isLastParagraph = paragraphPath[paragraphPath.length - 1] === componentPropNode.children.length - 1;
        if (dist.Node.string(paragraphNode) === '' && isLastParagraph) {
          if (isLastProp) {
            dist.Transforms.moveNodes(editor, {
              at: paragraphPath,
              to: dist.Path.next(ancestorComponentBlock.componentBlock[1])
            });
          } else {
            dist.Transforms.move(editor, {
              distance: 1,
              unit: 'line'
            });
            dist.Transforms.removeNodes(editor, {
              at: paragraphPath
            });
          }
          return;
        }
      }
      if (componentPropNode.type === 'component-inline-prop') {
        dist.Editor.withoutNormalizing(editor, () => {
          const componentBlock = blockComponents[componentBlockNode.component];
          if (componentPropNode.propPath !== undefined && componentBlock !== undefined) {
            const rootSchema = {
              kind: 'object',
              fields: componentBlock.schema
            };
            const ancestorFields = (0,utils_2bbfbd32_node_react_server_esm.b)(rootSchema, componentPropNode.propPath, componentBlockNode.props);
            const idx = [...ancestorFields].reverse().findIndex(item => item.kind === 'array');
            if (idx !== -1) {
              const arrayFieldIdx = ancestorFields.length - 1 - idx;
              const arrayField = ancestorFields[arrayFieldIdx];
              (0,emery_cjs.assert)(arrayField.kind === 'array');
              const val = getValueAtPropPath(componentBlockNode.props, componentPropNode.propPath.slice(0, arrayFieldIdx));
              if (doesSchemaOnlyEverContainASingleChildField(arrayField.element)) {
                if (dist.Node.string(componentPropNode) === '' && val.length - 1 === componentPropNode.propPath[arrayFieldIdx]) {
                  dist.Transforms.removeNodes(editor, {
                    at: componentPropPath
                  });
                  if (isLastProp) {
                    dist.Transforms.insertNodes(editor, {
                      type: 'paragraph',
                      children: [{
                        text: ''
                      }]
                    }, {
                      at: dist.Path.next(componentBlockPath)
                    });
                    dist.Transforms.select(editor, dist.Path.next(componentBlockPath));
                  } else {
                    dist.Transforms.move(editor, {
                      distance: 1,
                      unit: 'line'
                    });
                  }
                } else {
                  insertBreak();
                }
                return;
              }
            }
          }
          dist.Transforms.splitNodes(editor, {
            always: true
          });
          const splitNodePath = dist.Path.next(componentPropPath);
          if (isLastProp) {
            dist.Transforms.moveNodes(editor, {
              at: splitNodePath,
              to: dist.Path.next(componentBlockPath)
            });
          } else {
            (0,utils_2bbfbd32_node_react_server_esm.m)(editor, splitNodePath, [...dist.Path.next(splitNodePath), 0]);
            dist.Transforms.removeNodes(editor, {
              at: splitNodePath
            });
          }
        });
        return;
      }
    }
    insertBreak();
  };
  editor.normalizeNode = entry => {
    const [node, path] = entry;
    if (node.type === 'component-inline-prop' && !node.propPath && (node.children.length !== 1 || !dist.Text.isText(node.children[0]) || node.children[0].text !== '')) {
      dist.Transforms.removeNodes(editor, {
        at: path
      });
      return;
    }
    if (node.type === 'component-block') {
      const componentBlock = blockComponents[node.component];
      if (componentBlock) {
        const rootSchema = {
          kind: 'object',
          fields: componentBlock.schema
        };
        const updatedProps = addMissingFields(node.props, rootSchema);
        if (updatedProps !== node.props) {
          dist.Transforms.setNodes(editor, {
            props: updatedProps
          }, {
            at: path
          });
          return;
        }
        for (const [propPath, arrayField] of findArrayFieldsWithSingleChildField(rootSchema, node.props)) {
          if (node.children.length === 1 && node.children[0].type === 'component-inline-prop' && node.children[0].propPath === undefined) {
            break;
          }
          const nodesWithin = [];
          for (const [idx, childNode] of node.children.entries()) {
            if ((childNode.type === 'component-block-prop' || childNode.type === 'component-inline-prop') && childNode.propPath !== undefined) {
              const subPath = childNode.propPath.concat();
              while (subPath.length) {
                if (typeof subPath.pop() === 'number') break;
              }
              if (areArraysEqual(propPath, subPath)) {
                nodesWithin.push([idx, childNode]);
              }
            }
          }
          const arrVal = getValueAtPropPath(node.props, propPath);
          const prevKeys = (0,initial_values_25bf35f4_node_react_server_esm.a)(arrVal);
          const prevKeysSet = new Set(prevKeys);
          const alreadyUsedIndicies = new Set();
          const newVal = [];
          const newKeys = [];
          const getNewKey = () => {
            let key = (0,initial_values_25bf35f4_node_react_server_esm.c)();
            while (prevKeysSet.has(key)) {
              key = (0,initial_values_25bf35f4_node_react_server_esm.c)();
            }
            return key;
          };
          for (const [, node] of nodesWithin) {
            const idxFromValue = node.propPath[propPath.length];
            (0,emery_cjs.assert)(typeof idxFromValue === 'number');
            if (arrVal.length <= idxFromValue || alreadyUsedIndicies.has(idxFromValue) && isEmptyChildFieldNode(node)) {
              newVal.push((0,initial_values_25bf35f4_node_react_server_esm.g)(arrayField.element));
              newKeys.push(getNewKey());
            } else {
              alreadyUsedIndicies.add(idxFromValue);
              newVal.push(arrVal[idxFromValue]);
              newKeys.push(alreadyUsedIndicies.has(idxFromValue) ? getNewKey() : prevKeys[idxFromValue]);
            }
          }
          (0,initial_values_25bf35f4_node_react_server_esm.s)(newVal, newKeys);
          if (!areArraysEqual(arrVal, newVal)) {
            const transformedProps = replaceValueAtPropPath(rootSchema, node.props, newVal, propPath);
            dist.Transforms.setNodes(editor, {
              props: transformedProps
            }, {
              at: path
            });
            for (const [idx, [idxInChildrenOfBlock, nodeWithin]] of nodesWithin.entries()) {
              const newPropPath = [...nodeWithin.propPath];
              newPropPath[propPath.length] = idx;
              dist.Transforms.setNodes(editor, {
                propPath: newPropPath
              }, {
                at: [...path, idxInChildrenOfBlock]
              });
            }
            return;
          }
        }
        const missingKeys = new Map(findChildPropPaths(node.props, componentBlock.schema).map(x => [JSON.stringify(x.path), x.options.kind]));
        node.children.forEach(node => {
          (0,emery_cjs.assert)(node.type === 'component-block-prop' || node.type === 'component-inline-prop');
          missingKeys.delete(JSON.stringify(node.propPath));
        });
        if (missingKeys.size) {
          dist.Transforms.insertNodes(editor, [...missingKeys].map(_ref2 => {
            let [prop, kind] = _ref2;
            return {
              type: `component-${kind}-prop`,
              propPath: prop ? JSON.parse(prop) : prop,
              children: [{
                text: ''
              }]
            };
          }), {
            at: [...path, node.children.length]
          });
          return;
        }
        const foundProps = new Set();
        const stringifiedInlinePropPaths = {};
        findChildPropPaths(node.props, blockComponents[node.component].schema).forEach((x, index) => {
          stringifiedInlinePropPaths[JSON.stringify(x.path)] = {
            options: x.options,
            index
          };
        });
        for (const [index, childNode] of node.children.entries()) {
          if (
          // children that are not these will be handled by
          // the generic allowedChildren normalization
          childNode.type !== 'component-inline-prop' && childNode.type !== 'component-block-prop') {
            continue;
          }
          const childPath = [...path, index];
          const stringifiedPropPath = JSON.stringify(childNode.propPath);
          if (stringifiedInlinePropPaths[stringifiedPropPath] === undefined) {
            dist.Transforms.removeNodes(editor, {
              at: childPath
            });
            return;
          }
          if (foundProps.has(stringifiedPropPath)) {
            dist.Transforms.removeNodes(editor, {
              at: childPath
            });
            return;
          }
          foundProps.add(stringifiedPropPath);
          const propInfo = stringifiedInlinePropPaths[stringifiedPropPath];
          const expectedIndex = propInfo.index;
          if (index !== expectedIndex) {
            dist.Transforms.moveNodes(editor, {
              at: childPath,
              to: [...path, expectedIndex]
            });
            return;
          }
          const expectedChildNodeType = `component-${propInfo.options.kind}-prop`;
          if (childNode.type !== expectedChildNodeType) {
            dist.Transforms.setNodes(editor, {
              type: expectedChildNodeType
            }, {
              at: childPath
            });
            return;
          }
          const documentFeatures = memoizedGetDocumentFeaturesForChildField(propInfo.options);
          if (normalizeNodeWithinComponentProp([childNode, childPath], editor, documentFeatures)) {
            return;
          }
        }
      }
    }
    normalizeNode(entry);
  };
  return editor;
}

// the only thing that this will fix is a new field being added to an object field, nothing else.
function addMissingFields(value, schema) {
  if (schema.kind === 'child' || schema.kind === 'form') {
    return value;
  }
  if (schema.kind === 'conditional') {
    const conditionalValue = value;
    const updatedInnerValue = addMissingFields(conditionalValue.value, schema.values[conditionalValue.discriminant.toString()]);
    if (updatedInnerValue === conditionalValue.value) {
      return value;
    }
    return {
      discriminant: conditionalValue.discriminant,
      value: updatedInnerValue
    };
  }
  if (schema.kind === 'array') {
    const arrValue = value;
    const newArrValue = arrValue.map(x => addMissingFields(x, schema.element));
    if (areArraysEqual(arrValue, newArrValue)) {
      return value;
    }
    return newArrValue;
  }
  if (schema.kind === 'object') {
    const objectValue = value;
    let hasChanged = false;
    const newObjectValue = {};
    for (const [key, innerSchema] of Object.entries(schema.fields)) {
      const innerValue = objectValue[key];
      if (innerValue === undefined) {
        hasChanged = true;
        newObjectValue[key] = (0,initial_values_25bf35f4_node_react_server_esm.g)(innerSchema);
        continue;
      }
      const newInnerValue = addMissingFields(innerValue, innerSchema);
      if (newInnerValue !== innerValue) {
        hasChanged = true;
      }
      newObjectValue[key] = newInnerValue;
    }
    if (hasChanged) {
      return newObjectValue;
    }
    return value;
  }
  (0,emery_cjs.assertNever)(schema);
}

const paragraphElement = () => ({
  type: 'paragraph',
  children: [{
    text: ''
  }]
});
function withParagraphs(editor) {
  const {
    normalizeNode
  } = editor;
  editor.normalizeNode = entry => {
    const [node, path] = entry;
    if (dist.Editor.isEditor(node)) {
      let lastNode = node.children[node.children.length - 1];
      if ((lastNode === null || lastNode === void 0 ? void 0 : lastNode.type) !== 'paragraph') {
        dist.Transforms.insertNodes(editor, paragraphElement(), {
          at: [...path, node.children.length]
        });
        return;
      }
    }
    normalizeNode(entry);
  };
  return editor;
}

function withLayouts(editor) {
  const {
    normalizeNode,
    deleteBackward
  } = editor;
  editor.deleteBackward = unit => {
    if (editor.selection && dist.Range.isCollapsed(editor.selection) &&
    // this is just an little optimisation
    // we're only doing things if we're at the start of a layout area
    // and the start of anything will always be offset 0
    // so we'll bailout if we're not at offset 0
    editor.selection.anchor.offset === 0) {
      const [aboveNode, abovePath] = dist.Editor.above(editor, {
        match: node => node.type === 'layout-area'
      }) || [editor, []];
      if (aboveNode.type === 'layout-area' && dist.Point.equals(dist.Editor.start(editor, abovePath), editor.selection.anchor)) {
        return;
      }
    }
    deleteBackward(unit);
  };
  editor.normalizeNode = entry => {
    const [node, path] = entry;
    if (dist.Element.isElement(node) && node.type === 'layout') {
      if (node.layout === undefined) {
        dist.Transforms.unwrapNodes(editor, {
          at: path
        });
        return;
      }
      if (node.children.length < node.layout.length) {
        dist.Transforms.insertNodes(editor, Array.from({
          length: node.layout.length - node.children.length
        }).map(() => ({
          type: 'layout-area',
          children: [paragraphElement()]
        })), {
          at: [...path, node.children.length]
        });
        return;
      }
      if (node.children.length > node.layout.length) {
        Array.from({
          length: node.children.length - node.layout.length
        }).map((_, i) => i).reverse().forEach(i => {
          const layoutAreaToRemovePath = [...path, i + node.layout.length];
          const child = node.children[i + node.layout.length];
          (0,utils_2bbfbd32_node_react_server_esm.m)(editor, layoutAreaToRemovePath, [...path, node.layout.length - 1, node.children[node.layout.length - 1].children.length], node => node.type !== 'paragraph' || dist.Node.string(child) !== '');
          dist.Transforms.removeNodes(editor, {
            at: layoutAreaToRemovePath
          });
        });
        return;
      }
    }
    normalizeNode(entry);
  };
  return editor;
}

const markdownLinkPattern = /(^|\s)\[(.+?)\]\((\S+)\)$/;
function withLink(editorDocumentFeatures, componentBlocks, editor) {
  const {
    insertText,
    isInline,
    normalizeNode
  } = editor;
  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element);
  };
  if (editorDocumentFeatures.links) {
    editor.insertText = text => {
      insertText(text);
      if (text !== ')' || !editor.selection) {
        return;
      }
      const startOfBlock = dist.Editor.start(editor, dist.Editor.above(editor, {
        match: utils_2bbfbd32_node_react_server_esm.i
      })[1]);
      const startOfBlockToEndOfShortcutString = dist.Editor.string(editor, {
        anchor: editor.selection.anchor,
        focus: startOfBlock
      });
      const match = markdownLinkPattern.exec(startOfBlockToEndOfShortcutString);
      if (!match) {
        return;
      }
      const ancestorComponentChildFieldDocumentFeatures = (0,utils_2bbfbd32_node_react_server_esm.g)(editor, editorDocumentFeatures, componentBlocks);
      if ((ancestorComponentChildFieldDocumentFeatures === null || ancestorComponentChildFieldDocumentFeatures === void 0 ? void 0 : ancestorComponentChildFieldDocumentFeatures.documentFeatures.links) === false) {
        return;
      }
      const [, maybeWhitespace, linkText, href] = match;
      // by doing this, the insertText(')') above will happen in a different undo than the link replacement
      // so that means that when someone does an undo after this
      // it will undo to the state of "[content](link)" rather than "[content](link" (note the missing closing bracket)
      editor.history.undos.push({
        operations: [],
        selectionBefore: editor.selection
      });
      const startOfShortcut = match.index === 0 ? startOfBlock : (0,utils_2bbfbd32_node_react_server_esm.E)(editor, startOfBlock, {
        distance: match.index
      });
      const startOfLinkText = (0,utils_2bbfbd32_node_react_server_esm.E)(editor, startOfShortcut, {
        distance: maybeWhitespace === '' ? 1 : 2
      });
      const endOfLinkText = (0,utils_2bbfbd32_node_react_server_esm.E)(editor, startOfLinkText, {
        distance: linkText.length
      });
      dist.Transforms.delete(editor, {
        at: {
          anchor: endOfLinkText,
          focus: editor.selection.anchor
        }
      });
      dist.Transforms.delete(editor, {
        at: {
          anchor: startOfShortcut,
          focus: startOfLinkText
        }
      });
      dist.Transforms.wrapNodes(editor, {
        type: 'link',
        href,
        children: []
      }, {
        at: {
          anchor: editor.selection.anchor,
          focus: startOfShortcut
        },
        split: true
      });
      const nextNode = dist.Editor.next(editor);
      if (nextNode) {
        dist.Transforms.select(editor, nextNode[1]);
      }
    };
  }
  editor.normalizeNode = _ref => {
    let [node, path] = _ref;
    if (node.type === 'link') {
      if (dist.Node.string(node) === '') {
        dist.Transforms.unwrapNodes(editor, {
          at: path
        });
        return;
      }
      for (const [idx, child] of node.children.entries()) {
        if (child.type === 'link') {
          // links cannot contain links
          dist.Transforms.unwrapNodes(editor, {
            at: [...path, idx]
          });
          return;
        }
      }
    }
    if ((0,utils_2bbfbd32_node_react_server_esm.c)(node)) {
      let lastMergableLink = null;
      for (const [idx, child] of node.children.entries()) {
        var _lastMergableLink;
        if (child.type === 'link' && child.href === ((_lastMergableLink = lastMergableLink) === null || _lastMergableLink === void 0 ? void 0 : _lastMergableLink.node.href)) {
          const firstLinkPath = [...path, lastMergableLink.index];
          const secondLinkPath = [...path, idx];
          const to = [...firstLinkPath, lastMergableLink.node.children.length];
          // note this is going in reverse, js doesn't have double-ended iterators so it's a for(;;)
          for (let i = child.children.length - 1; i >= 0; i--) {
            const childPath = [...secondLinkPath, i];
            dist.Transforms.moveNodes(editor, {
              at: childPath,
              to
            });
          }
          dist.Transforms.removeNodes(editor, {
            at: secondLinkPath
          });
          return;
        }
        if (!dist.Text.isText(child) || child.text !== '') {
          lastMergableLink = null;
        }
        if (child.type === 'link') {
          lastMergableLink = {
            index: idx,
            node: child
          };
        }
      }
    }
    normalizeNode([node, path]);
  };
  return editor;
}

const isListType = type => type === 'ordered-list' || type === 'unordered-list';
const isListNode = node => isListType(node.type);
function getAncestorList(editor) {
  if (editor.selection) {
    const listItem = dist.Editor.above(editor, {
      match: (0,utils_2bbfbd32_node_react_server_esm.n)('list-item')
    });
    const list = dist.Editor.above(editor, {
      match: isListNode
    });
    if (listItem && list) {
      return {
        isInside: true,
        listItem,
        list
      };
    }
  }
  return {
    isInside: false
  };
}
function withList(editor) {
  const {
    insertBreak,
    normalizeNode,
    deleteBackward
  } = editor;
  editor.deleteBackward = unit => {
    if (editor.selection) {
      const ancestorList = getAncestorList(editor);
      if (ancestorList.isInside && dist.Range.isCollapsed(editor.selection) && dist.Editor.isStart(editor, editor.selection.anchor, ancestorList.list[1])) {
        dist.Transforms.unwrapNodes(editor, {
          match: isListNode,
          split: true
        });
        return;
      }
    }
    deleteBackward(unit);
  };
  editor.insertBreak = () => {
    const [listItem] = dist.Editor.nodes(editor, {
      match: node => node.type === 'list-item',
      mode: 'lowest'
    });
    if (listItem && dist.Node.string(listItem[0]) === '') {
      dist.Transforms.unwrapNodes(editor, {
        match: isListNode,
        split: true
      });
      return;
    }
    insertBreak();
  };
  editor.normalizeNode = entry => {
    const [node, path] = entry;
    if (dist.Element.isElement(node) || dist.Editor.isEditor(node)) {
      const isElementBeingNormalizedAList = isListNode(node);
      for (const [childNode, childPath] of dist.Node.children(editor, path)) {
        const index = childPath[childPath.length - 1];
        // merge sibling lists
        if (isListNode(childNode)) {
          var _node$children;
          if (((_node$children = node.children[childPath[childPath.length - 1] + 1]) === null || _node$children === void 0 ? void 0 : _node$children.type) === childNode.type) {
            const siblingNodePath = dist.Path.next(childPath);
            (0,utils_2bbfbd32_node_react_server_esm.m)(editor, siblingNodePath, [...childPath, childNode.children.length]);
            dist.Transforms.removeNodes(editor, {
              at: siblingNodePath
            });
            return;
          }
          if (isElementBeingNormalizedAList) {
            const previousChild = node.children[index - 1];
            if (dist.Element.isElement(previousChild)) {
              dist.Transforms.moveNodes(editor, {
                at: childPath,
                to: [...dist.Path.previous(childPath), previousChild.children.length - 1]
              });
            } else {
              dist.Transforms.unwrapNodes(editor, {
                at: childPath
              });
            }
            return;
          }
        }
        if (node.type === 'list-item' && childNode.type !== 'list-item-content' && index === 0 && (0,utils_2bbfbd32_node_react_server_esm.i)(childNode)) {
          if (path[path.length - 1] !== 0) {
            const previousChild = dist.Node.get(editor, dist.Path.previous(path));
            if (dist.Element.isElement(previousChild)) {
              dist.Transforms.moveNodes(editor, {
                at: path,
                to: [...dist.Path.previous(path), previousChild.children.length]
              });
              return;
            }
          }
          dist.Transforms.unwrapNodes(editor, {
            at: childPath
          });
          return;
        }
        if (node.type === 'list-item' && childNode.type === 'list-item-content' && index !== 0) {
          dist.Transforms.splitNodes(editor, {
            at: childPath
          });
          return;
        }
      }
    }
    normalizeNode(entry);
  };
  return editor;
}

function order(a, b) {
  return {
    start: Math.min(a, b),
    end: Math.max(a, b)
  };
}
function getRelativeRowPath(hasHead, rowIndex) {
  return hasHead ? rowIndex === 0 ? [0, 0] : [1, rowIndex - 1] : [0, rowIndex];
}
function getSelectedTableArea(editor) {
  var _Editor$above, _editor$selection, _Editor$above2, _editor$selection2;
  const anchor = (_Editor$above = dist.Editor.above(editor, {
    match: (0,utils_2bbfbd32_node_react_server_esm.n)('table-cell'),
    at: (_editor$selection = editor.selection) === null || _editor$selection === void 0 ? void 0 : _editor$selection.anchor.path
  })) === null || _Editor$above === void 0 ? void 0 : _Editor$above[1];
  const focus = (_Editor$above2 = dist.Editor.above(editor, {
    match: (0,utils_2bbfbd32_node_react_server_esm.n)('table-cell'),
    at: (_editor$selection2 = editor.selection) === null || _editor$selection2 === void 0 ? void 0 : _editor$selection2.focus.path
  })) === null || _Editor$above2 === void 0 ? void 0 : _Editor$above2[1];
  const table = dist.Editor.above(editor, {
    match: (0,utils_2bbfbd32_node_react_server_esm.n)('table')
  });
  if (editor.selection && table && dist.Element.isElement(table[0].children[0]) && anchor && focus && dist.Path.equals(anchor.slice(0, -3), focus.slice(0, -3))) {
    const [start, end] = dist.Editor.edges(editor, editor.selection);
    return {
      tablePath: table[1],
      table: table[0],
      singleCell: dist.Path.equals(anchor, focus) ? dist.Point.equals(dist.Editor.start(editor, anchor), start) && dist.Point.equals(dist.Editor.end(editor, anchor), end) && !dist.Point.equals(start, end) ? 'selected' : 'not-selected' : 'many',
      row: order(anchor[anchor.length - 2] + anchor[anchor.length - 3], focus[focus.length - 2] + focus[anchor.length - 3]),
      column: order(anchor[anchor.length - 1], focus[focus.length - 1])
    };
  }
}
const cell = header => ({
  type: 'table-cell',
  ...(header ? {
    header: true
  } : {}),
  children: [{
    type: 'paragraph',
    children: [{
      text: ''
    }]
  }]
});
function cloneDescendant(node) {
  if (dist.Text.isText(node)) return {
    ...node
  };
  return {
    ...node,
    children: node.children.map(cloneDescendant)
  };
}
function withTable(editor) {
  const {
    deleteFragment,
    normalizeNode,
    getFragment,
    insertFragment,
    deleteBackward
  } = editor;
  editor.insertFragment = fragment => {
    const selectedTableArea = getSelectedTableArea(editor);
    if (!selectedTableArea || fragment.length !== 1 || fragment[0].type !== 'table') {
      insertFragment(fragment);
      return;
    }
    const newRows = fragment[0].children.flatMap(child => child.type === 'table-head' || child.type === 'table-body' ? child.children : []);
    if (!newRows.every((0,utils_2bbfbd32_node_react_server_esm.n)('table-row'))) {
      insertFragment(fragment);
      return;
    }
    let {
      row,
      column,
      tablePath,
      table
    } = selectedTableArea;
    const existingBody = selectedTableArea.table.children[selectedTableArea.table.children.length === 1 ? 0 : 1];
    if (newRows[0].type !== 'table-row' || existingBody.type !== 'table-body' || existingBody.children[0].type !== 'table-row') {
      insertFragment(fragment);
      return;
    }
    const hasHead = table.children[0].type === 'table-head';
    if (selectedTableArea.singleCell !== 'many') {
      row = {
        start: row.start,
        end: Math.min(row.start + newRows.length - 1, existingBody.children.length - 1 + (hasHead ? 1 : 0))
      };
      column = {
        start: column.start,
        end: Math.min(column.start + newRows[0].children.length - 1, existingBody.children[0].children.length - 1)
      };
    }
    dist.Editor.withoutNormalizing(editor, () => {
      for (let rowIndex = row.start; rowIndex <= row.end; rowIndex++) {
        const newRow = newRows[(rowIndex - row.start) % newRows.length];
        for (let cellIndex = column.start; cellIndex <= column.end; cellIndex++) {
          const relativeCellPath = [...getRelativeRowPath(hasHead, rowIndex), cellIndex];
          const cell = dist.Node.get(table, relativeCellPath);
          const newCell = newRow.children[(cellIndex - column.start) % newRow.children.length];
          if (cell.type !== 'table-cell' || newCell.type !== 'table-cell') {
            continue;
          }
          const cellPath = [...tablePath, ...relativeCellPath];
          for (const childIdx of [...cell.children.keys()].reverse()) {
            dist.Transforms.removeNodes(editor, {
              at: [...cellPath, childIdx]
            });
          }
          dist.Transforms.insertNodes(editor, newCell.children.map(cloneDescendant), {
            at: [...cellPath, 0]
          });
        }
      }
      dist.Transforms.setSelection(editor, {
        anchor: dist.Editor.start(editor, [...tablePath, ...getRelativeRowPath(hasHead, row.start), column.start]),
        focus: dist.Editor.end(editor, [...tablePath, ...getRelativeRowPath(hasHead, row.end), column.end])
      });
    });
  };
  editor.deleteBackward = unit => {
    if (editor.selection && dist.Range.isCollapsed(editor.selection) && editor.selection.anchor.offset === 0) {
      const tableCell = dist.Editor.above(editor, {
        match: (0,utils_2bbfbd32_node_react_server_esm.n)('table-cell')
      });
      if (tableCell && tableCell[0].children[0].type === 'paragraph' && tableCell[0].children[0].children[0].type === undefined && dist.Path.equals(editor.selection.anchor.path, [...tableCell[1], 0, 0])) {
        return;
      }
    }
    deleteBackward(unit);
  };
  editor.getFragment = () => {
    const selectedTableArea = getSelectedTableArea(editor);
    if (selectedTableArea && selectedTableArea.singleCell !== 'not-selected') {
      var _table$children$;
      const {
        table
      } = selectedTableArea;
      const first = table.children[0].type === 'table-head' || table.children[0].type === 'table-body' ? table.children[0] : undefined;
      if (!first) {
        return getFragment();
      }
      const second = ((_table$children$ = table.children[1]) === null || _table$children$ === void 0 ? void 0 : _table$children$.type) === 'table-body' ? table.children[1] : undefined;
      const body = second || first;
      const hasHead = first.type === 'table-head';
      const isSelectionInHead = selectedTableArea.row.start === 0 && !!second;
      const columnLength = selectedTableArea.column.end - selectedTableArea.column.start + 1;
      return [{
        type: 'table',
        children: [...(isSelectionInHead ? [{
          type: 'table-head',
          children: [{
            type: 'table-row',
            children: Array.from({
              length: columnLength
            }).map((_, columnIndex) => first.children[0].children[columnIndex + selectedTableArea.column.start])
          }]
        }] : []), {
          type: 'table-body',
          children: Array.from({
            length: selectedTableArea.row.end - selectedTableArea.row.start + (isSelectionInHead ? 0 : 1)
          }).map((_, rowIndex) => ({
            type: 'table-row',
            children: Array.from({
              length: columnLength
            }).map((_, columnIndex) => body.children[rowIndex + selectedTableArea.row.start - (hasHead && !isSelectionInHead ? 1 : 0)].children[columnIndex + selectedTableArea.column.start])
          }))
        }]
      }];
    }
    return getFragment();
  };
  editor.deleteFragment = direction => {
    if (!editor.selection || dist.Range.isCollapsed(editor.selection)) {
      deleteFragment(direction);
      return;
    }
    const selectedTableArea = getSelectedTableArea(editor);
    if (!selectedTableArea || selectedTableArea.singleCell === 'not-selected') {
      deleteFragment(direction);
      return;
    }
    const headOrBody = selectedTableArea.table.children[0];
    if (!dist.Element.isElement(headOrBody) || !dist.Element.isElement(headOrBody.children[0])) {
      deleteFragment(direction);
      return;
    }
    const maxRowIdx = selectedTableArea.table.children.reduce((sum, headOrBody) => sum + (headOrBody.type === 'table-head' || headOrBody.type === 'table-body' ? headOrBody.children.length : 0), 0) - 1;
    const {
      row,
      column,
      tablePath
    } = selectedTableArea;
    // note the fact that hasWholeColumnSelected uses row and hasWholeRowSelected uses column
    // is not a mistake. if a whole column has been selected, then the starting row is 0 and the end is the last row
    const hasWholeColumnSelected = row.start === 0 && row.end === maxRowIdx;
    const hasWholeRowSelected = column.start === 0 && column.end === headOrBody.children[0].children.length - 1;
    if (hasWholeColumnSelected && hasWholeRowSelected) {
      dist.Transforms.removeNodes(editor, {
        at: tablePath
      });
      return;
    }
    const hasHead = headOrBody.type === 'table-head';
    if (hasWholeRowSelected) {
      dist.Editor.withoutNormalizing(editor, () => {
        for (let i = row.end; i >= row.start; i--) {
          if (hasHead) {
            if (i === 0) {
              dist.Transforms.removeNodes(editor, {
                at: [...tablePath, 0]
              });
              continue;
            }
            dist.Transforms.removeNodes(editor, {
              at: [...tablePath, 1, i - 1]
            });
            continue;
          }
          dist.Transforms.removeNodes(editor, {
            at: [...tablePath, 0, i]
          });
        }
      });
      return;
    }
    if (hasWholeColumnSelected) {
      dist.Editor.withoutNormalizing(editor, () => {
        for (let i = column.end; i >= column.start; i--) {
          for (let rowIdx = 0; rowIdx <= maxRowIdx; rowIdx++) {
            dist.Transforms.removeNodes(editor, {
              at: [...tablePath, ...getRelativeRowPath(hasHead, rowIdx), i]
            });
          }
        }
        const selectionPath = [...tablePath, 0, 0, column.start];
        const point = dist.Editor.start(editor, column.start === 0 ? selectionPath : dist.Path.previous(selectionPath));
        dist.Transforms.select(editor, point);
      });
      return;
    }
    const selectionStart = dist.Editor.start(editor, editor.selection).path;
    dist.Editor.withoutNormalizing(editor, () => {
      for (let rowIndex = row.start; rowIndex <= row.end; rowIndex++) {
        for (let cellIndex = column.start; cellIndex <= column.end; cellIndex++) {
          const relativeCellPath = [...getRelativeRowPath(hasHead, rowIndex), cellIndex];
          const cell = dist.Node.get(selectedTableArea.table, relativeCellPath);
          if (!dist.Element.isElement(cell)) {
            continue;
          }
          const cellPath = [...tablePath, ...relativeCellPath];
          dist.Transforms.insertNodes(editor, {
            type: 'paragraph',
            children: [{
              text: ''
            }]
          }, {
            at: [...cellPath, 0]
          });
          for (const childIdx of [...cell.children.keys()].reverse()) {
            dist.Transforms.removeNodes(editor, {
              at: [...cellPath, childIdx + 1]
            });
          }
        }
      }
      dist.Transforms.select(editor, selectionStart);
    });
  };
  editor.normalizeNode = entry => {
    const [node, path] = entry;
    if (node.type === 'table-head' && node.children.length > 1) {
      (0,utils_2bbfbd32_node_react_server_esm.m)(editor, path, dist.Path.next(path), (_, i) => i !== 0);
      return;
    }
    let didUpdateThings = false;
    for (const parent of ['table-body', 'table-head']) {
      if (node.type === parent) {
        for (const [rowIdx, row] of node.children.entries()) {
          if (row.type === 'table-row') {
            for (const [cellIdx, cell] of row.children.entries()) {
              if (cell.type === 'table-cell') {
                const at = [...path, rowIdx, cellIdx];
                if (cell.header && parent === 'table-body') {
                  dist.Transforms.unsetNodes(editor, 'header', {
                    at
                  });
                  didUpdateThings = true;
                }
                if (!cell.header && parent === 'table-head') {
                  dist.Transforms.setNodes(editor, {
                    header: true
                  }, {
                    at
                  });
                  didUpdateThings = true;
                }
              }
            }
          }
        }
      }
    }
    if (didUpdateThings) {
      return;
    }
    if (node.type === 'table') {
      const maxRowCount = node.children.reduce((max, node) => node.type === 'table-head' || node.type === 'table-body' ? node.children.reduce((max, node) => node.type === 'table-row' ? Math.max(max, node.children.length) : max, max) : max, 0);
      let didInsert = false;
      for (const [idx, child] of node.children.entries()) {
        if (child.type === 'table-body' || child.type === 'table-head') {
          for (const [rowIdx, row] of child.children.entries()) {
            if (row.type === 'table-row' && row.children.length !== maxRowCount) {
              dist.Transforms.insertNodes(editor, Array.from({
                length: maxRowCount - row.children.length
              }, () => cell(child.type === 'table-head')), {
                at: [...path, idx, rowIdx, row.children.length]
              });
              didInsert = true;
            }
          }
        }
      }
      if (didInsert) {
        return;
      }
      if (node.children.length === 1 && node.children[0].type === 'table-head') {
        dist.Transforms.insertNodes(editor, {
          type: 'table-body',
          children: Array.from({
            length: node.children[0].children.length
          }, () => cell(false))
        }, {
          at: [...path, 1]
        });
        return;
      }
      if (node.children.length === 2 && node.children[1].type === 'table-head') {
        dist.Transforms.moveNodes(editor, {
          at: [...path, 1],
          to: [...path, 0]
        });
        return;
      }
      if (node.children.length > 2) {
        (0,utils_2bbfbd32_node_react_server_esm.m)(editor, path, dist.Path.next(path), (_, i) => i !== 0 && i !== 1);
        return;
      }
    }
    normalizeNode(entry);
  };
  return editor;
}

function createDocumentEditorForNormalization(documentFeatures, componentBlocks) {
  return _createDocumentEditor(createEditor(), documentFeatures, componentBlocks);
}
function _createDocumentEditor(baseEditor, documentFeatures, componentBlocks) {
  return withBlocksSchema(withParagraphs(withLink(documentFeatures, componentBlocks, withList(withTable(withComponentBlocks(componentBlocks, documentFeatures, withVoidElements(withLayouts(withCodeBlock(documentFeatures, componentBlocks, withDocumentFeaturesNormalization(documentFeatures, baseEditor))))))))));
}
function withBlocksSchema(editor) {
  const {
    normalizeNode
  } = editor;
  editor.normalizeNode = _ref => {
    let [node, path] = _ref;
    if (!dist.Text.isText(node) && node.type !== 'link') {
      const nodeType = dist.Editor.isEditor(node) ? 'editor' : node.type;
      if (typeof nodeType !== 'string' || utils_2bbfbd32_node_react_server_esm.e[nodeType] === undefined) {
        dist.Transforms.unwrapNodes(editor, {
          at: path
        });
        return;
      }
      const info = utils_2bbfbd32_node_react_server_esm.e[nodeType];
      if (info.kind === 'blocks' && node.children.length !== 0 && node.children.every(child => !(0,utils_2bbfbd32_node_react_server_esm.i)(child))) {
        dist.Transforms.wrapNodes(editor, {
          type: info.blockToWrapInlinesIn,
          children: []
        }, {
          at: path,
          match: node => !(0,utils_2bbfbd32_node_react_server_esm.i)(node)
        });
        return;
      }
      let didUpdate = false;
      for (const [index, childNode] of [...node.children.entries()].reverse()) {
        const childPath = [...path, index];
        if (info.kind === 'inlines') {
          if (!dist.Text.isText(childNode) && (0,utils_2bbfbd32_node_react_server_esm.i)(childNode)) {
            handleNodeInInvalidPosition(editor, [childNode, childPath], path);
            didUpdate = true;
            continue;
          }
        } else {
          if (!(0,utils_2bbfbd32_node_react_server_esm.i)(childNode)) {
            dist.Transforms.wrapNodes(editor, {
              type: info.blockToWrapInlinesIn,
              children: []
            }, {
              at: childPath
            });
            didUpdate = true;
            continue;
          }
          if (!info.allowedChildren.has(childNode.type)) {
            handleNodeInInvalidPosition(editor, [childNode, childPath], path);
            didUpdate = true;
            continue;
          }
        }
      }
      if (didUpdate) {
        return;
      }
    }
    normalizeNode([node, path]);
  };
  return editor;
}
function handleNodeInInvalidPosition(editor, _ref2, ancestorPath) {
  let [node, path] = _ref2;
  const nodeType = node.type;
  const childNodeInfo = utils_2bbfbd32_node_react_server_esm.e[nodeType];
  // the parent of a block will never be an inline so this casting is okay
  const ancestorNode = dist.Node.get(editor, ancestorPath);
  const parentNodeType = dist.Editor.isEditor(ancestorNode) ? 'editor' : ancestorNode.type;
  const parentNodeInfo = utils_2bbfbd32_node_react_server_esm.e[parentNodeType];
  if (!childNodeInfo || childNodeInfo.invalidPositionHandleMode === 'unwrap') {
    if (parentNodeInfo.kind === 'blocks' && parentNodeInfo.blockToWrapInlinesIn) {
      dist.Transforms.setNodes(editor, {
        type: parentNodeInfo.blockToWrapInlinesIn,
        ...Object.fromEntries(Object.keys(node).filter(key => key !== 'type' && key !== 'children').map(key => [key, null])) // the Slate types don't understand that null is allowed and it will unset properties with setNodes
      }, {
        at: path
      });
      return;
    }
    dist.Transforms.unwrapNodes(editor, {
      at: path
    });
    return;
  }
  const info = utils_2bbfbd32_node_react_server_esm.e[ancestorNode.type || 'editor'];
  if ((info === null || info === void 0 ? void 0 : info.kind) === 'blocks' && info.allowedChildren.has(nodeType)) {
    if (ancestorPath.length === 0) {
      dist.Transforms.moveNodes(editor, {
        at: path,
        to: [path[0] + 1]
      });
    } else {
      dist.Transforms.moveNodes(editor, {
        at: path,
        to: dist.Path.next(ancestorPath)
      });
    }
    return;
  }
  if (dist.Editor.isEditor(ancestorNode)) {
    dist.Transforms.moveNodes(editor, {
      at: path,
      to: [path[0] + 1]
    });
    dist.Transforms.unwrapNodes(editor, {
      at: [path[0] + 1]
    });
    return;
  }
  handleNodeInInvalidPosition(editor, [node, path], ancestorPath.slice(0, -1));
}
function withVoidElements(editor) {
  const {
    isVoid
  } = editor;
  editor.isVoid = node => {
    return node.type === 'divider' || node.type === 'image' || isVoid(node);
  };
  return editor;
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
const defaultAltField = (0,index_7a5cd0db_node_react_server_esm.t)({
  label: 'Alt text',
  description: 'This text will be used by screen readers and search engines.'
});
const emptyTitleField = basicFormFieldWithSimpleReaderParse({
  Input() {
    return null;
  },
  defaultValue() {
    return '';
  },
  parse(value) {
    if (value === undefined) return '';
    if (typeof value !== 'string') {
      throw new error_ca8f88e5_node_react_server_esm.F('Must be string');
    }
    return value;
  },
  validate(value) {
    return value;
  },
  serialize(value) {
    return {
      value
    };
  }
});
function normaliseDocumentFeatures(config) {
  var _config$formatting, _formatting$alignment, _formatting$alignment2, _formatting$blockType, _formatting$inlineMar, _formatting$inlineMar2, _formatting$inlineMar3, _formatting$inlineMar4, _formatting$inlineMar5, _formatting$inlineMar6, _formatting$inlineMar7, _formatting$inlineMar8, _formatting$listTypes, _formatting$listTypes2, _imagesConfig$schema$, _imagesConfig$schema, _imagesConfig$schema$2, _imagesConfig$schema2;
  const formatting = config.formatting === true ? {
    alignment: true,
    blockTypes: true,
    headingLevels: true,
    inlineMarks: true,
    listTypes: true,
    softBreaks: true
  } : (_config$formatting = config.formatting) !== null && _config$formatting !== void 0 ? _config$formatting : {};
  const imagesConfig = config.images === true ? {} : config.images;
  return {
    formatting: {
      alignment: formatting.alignment === true ? {
        center: true,
        end: true
      } : {
        center: !!((_formatting$alignment = formatting.alignment) !== null && _formatting$alignment !== void 0 && _formatting$alignment.center),
        end: !!((_formatting$alignment2 = formatting.alignment) !== null && _formatting$alignment2 !== void 0 && _formatting$alignment2.end)
      },
      blockTypes: (formatting === null || formatting === void 0 ? void 0 : formatting.blockTypes) === true ? {
        blockquote: true,
        code: {
          schema: object({})
        }
      } : {
        blockquote: !!((_formatting$blockType = formatting.blockTypes) !== null && _formatting$blockType !== void 0 && _formatting$blockType.blockquote),
        code: (() => {
          var _formatting$blockType2;
          if (((_formatting$blockType2 = formatting.blockTypes) === null || _formatting$blockType2 === void 0 ? void 0 : _formatting$blockType2.code) === undefined) {
            return false;
          }
          if (formatting.blockTypes.code === true || !formatting.blockTypes.code.schema) {
            return {
              schema: object({})
            };
          }
          for (const key of ['type', 'children', 'language']) {
            if (key in formatting.blockTypes.code.schema) {
              throw new Error(`"${key}" cannot be a key in the schema for code blocks`);
            }
          }
          return {
            schema: object(formatting.blockTypes.code.schema)
          };
        })()
      },
      headings: (() => {
        var _obj$schema;
        const opt = formatting === null || formatting === void 0 ? void 0 : formatting.headingLevels;
        const obj = typeof opt === 'object' && 'levels' in opt ? opt : {
          levels: opt,
          schema: undefined
        };
        if (obj.schema) {
          for (const key of ['type', 'children', 'level', 'textAlign']) {
            if (key in obj.schema) {
              throw new Error(`"${key}" cannot be a key in the schema for headings`);
            }
          }
        }
        return {
          levels: [...new Set(obj.levels === true ? [1, 2, 3, 4, 5, 6] : obj.levels)],
          schema: object((_obj$schema = obj.schema) !== null && _obj$schema !== void 0 ? _obj$schema : {})
        };
      })(),
      inlineMarks: formatting.inlineMarks === true ? {
        bold: true,
        code: true,
        italic: true,
        keyboard: true,
        strikethrough: true,
        subscript: true,
        superscript: true,
        underline: true
      } : {
        bold: !!((_formatting$inlineMar = formatting.inlineMarks) !== null && _formatting$inlineMar !== void 0 && _formatting$inlineMar.bold),
        code: !!((_formatting$inlineMar2 = formatting.inlineMarks) !== null && _formatting$inlineMar2 !== void 0 && _formatting$inlineMar2.code),
        italic: !!((_formatting$inlineMar3 = formatting.inlineMarks) !== null && _formatting$inlineMar3 !== void 0 && _formatting$inlineMar3.italic),
        strikethrough: !!((_formatting$inlineMar4 = formatting.inlineMarks) !== null && _formatting$inlineMar4 !== void 0 && _formatting$inlineMar4.strikethrough),
        underline: !!((_formatting$inlineMar5 = formatting.inlineMarks) !== null && _formatting$inlineMar5 !== void 0 && _formatting$inlineMar5.underline),
        keyboard: !!((_formatting$inlineMar6 = formatting.inlineMarks) !== null && _formatting$inlineMar6 !== void 0 && _formatting$inlineMar6.keyboard),
        subscript: !!((_formatting$inlineMar7 = formatting.inlineMarks) !== null && _formatting$inlineMar7 !== void 0 && _formatting$inlineMar7.subscript),
        superscript: !!((_formatting$inlineMar8 = formatting.inlineMarks) !== null && _formatting$inlineMar8 !== void 0 && _formatting$inlineMar8.superscript)
      },
      listTypes: formatting.listTypes === true ? {
        ordered: true,
        unordered: true
      } : {
        ordered: !!((_formatting$listTypes = formatting.listTypes) !== null && _formatting$listTypes !== void 0 && _formatting$listTypes.ordered),
        unordered: !!((_formatting$listTypes2 = formatting.listTypes) !== null && _formatting$listTypes2 !== void 0 && _formatting$listTypes2.unordered)
      },
      softBreaks: !!formatting.softBreaks
    },
    links: !!config.links,
    layouts: [...new Set((config.layouts || []).map(x => JSON.stringify(x)))].map(x => JSON.parse(x)),
    dividers: !!config.dividers,
    images: imagesConfig === undefined ? false : {
      ...imagesConfig,
      schema: {
        alt: (_imagesConfig$schema$ = (_imagesConfig$schema = imagesConfig.schema) === null || _imagesConfig$schema === void 0 ? void 0 : _imagesConfig$schema.alt) !== null && _imagesConfig$schema$ !== void 0 ? _imagesConfig$schema$ : defaultAltField,
        title: (_imagesConfig$schema$2 = (_imagesConfig$schema2 = imagesConfig.schema) === null || _imagesConfig$schema2 === void 0 ? void 0 : _imagesConfig$schema2.title) !== null && _imagesConfig$schema$2 !== void 0 ? _imagesConfig$schema$2 : emptyTitleField
      }
    },
    tables: !!config.tables
  };
}
function index_36a0dcb1_node_react_server_esm_document(_ref) {
  let {
    label,
    componentBlocks = {},
    description,
    ...documentFeaturesConfig
  } = _ref;
  const documentFeatures = normaliseDocumentFeatures(documentFeaturesConfig);
  const parse = mode => (_value, data) => {
    const markdoc = textDecoder.decode(data.content);
    const document = fromMarkdoc(Markdoc.parse(markdoc), componentBlocks);
    const editor = createDocumentEditorForNormalization(documentFeatures, componentBlocks);
    editor.children = document;
    Editor.normalize(editor, {
      force: true
    });
    return deserializeFiles(editor.children, componentBlocks, data.other, data.external || new Map(), mode, documentFeatures, data.slug);
  };
  return {
    kind: 'form',
    formKind: 'content',
    defaultValue() {
      return [{
        type: 'paragraph',
        children: [{
          text: ''
        }]
      }];
    },
    Input(props) {
      return /*#__PURE__*/jsx(DocumentFieldInput, {
        componentBlocks: componentBlocks,
        description: description,
        label: label,
        documentFeatures: documentFeatures,
        ...props
      });
    },
    parse: parse('edit'),
    contentExtension: '.mdoc',
    validate(value) {
      return value;
    },
    directories: [...collectDirectoriesUsedInSchema(object(Object.fromEntries(Object.entries(componentBlocks).map(_ref2 => {
      let [name, block] = _ref2;
      return [name, object(block.schema)];
    })))), ...(typeof documentFeatures.images === 'object' && typeof documentFeatures.images.directory === 'string' ? [documentFeatures.images.directory] : [])],
    serialize(value, opts) {
      const {
        extraFiles,
        node
      } = toMarkdocDocument(value, {
        componentBlocks,
        documentFeatures,
        slug: opts.slug
      });
      const other = new Map();
      const external = new Map();
      for (const file of extraFiles) {
        if (file.parent === undefined) {
          other.set(file.path, file.contents);
          continue;
        }
        if (!external.has(file.parent)) {
          external.set(file.parent, new Map());
        }
        external.get(file.parent).set(file.path, file.contents);
      }
      return {
        content: textEncoder.encode(Markdoc.format(Markdoc.parse(Markdoc.format(node)))),
        other,
        external,
        value: undefined
      };
    },
    reader: {
      parse: parse('read')
    }
  };
}




/***/ }),

/***/ 83171:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ text),
/* harmony export */   v: () => (/* binding */ validateText)
/* harmony export */ });
/* harmony import */ var _error_ca8f88e5_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(11005);
/* harmony import */ var _ui_78a3a4f0_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(62091);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);




function validateText(val, min, max, fieldLabel, slugInfo) {
  if (val.length < min) {
    if (min === 1) {
      return `${fieldLabel} must not be empty`;
    } else {
      return `${fieldLabel} must be at least ${min} characters long`;
    }
  }
  if (val.length > max) {
    return `${fieldLabel} must be no longer than ${max} characters`;
  }
  if (slugInfo) {
    if (val === '') {
      return `${fieldLabel} must not be empty`;
    }
    if (val === '..') {
      return `${fieldLabel} must not be ..`;
    }
    if (val === '.') {
      return `${fieldLabel} must not be .`;
    }
    if (slugInfo.glob === '**') {
      const split = val.split('/');
      if (split.some(s => s === '..')) {
        return `${fieldLabel} must not contain ..`;
      }
      if (split.some(s => s === '.')) {
        return `${fieldLabel} must not be .`;
      }
    }
    if ((slugInfo.glob === '*' ? /[\\/]/ : /[\\]/).test(val)) {
      return `${fieldLabel} must not contain slashes`;
    }
    if (slugInfo.slugs.has(val)) {
      return `${fieldLabel} must be unique`;
    }
  }
}
function parseAsNormalField(value) {
  if (value === undefined) {
    return '';
  }
  if (typeof value !== 'string') {
    throw new _error_ca8f88e5_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_2__.F('Must be a string');
  }
  return value;
}
const emptySet = new Set();
function text(_ref) {
  let {
    label,
    defaultValue = '',
    validation: {
      length: {
        max = Infinity,
        min = 0
      } = {}
    } = {},
    description,
    multiline = false
  } = _ref;
  function validate(value, slugField) {
    const message = validateText(value, min, max, label, slugField);
    if (message !== undefined) {
      throw new _error_ca8f88e5_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_2__.F(message);
    }
    return value;
  }
  return {
    kind: 'form',
    formKind: 'slug',
    Input(props) {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_ui_78a3a4f0_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_0__.TextFieldInput, {
        label: label,
        description: description,
        min: min,
        max: max,
        multiline: multiline,
        ...props
      });
    },
    defaultValue() {
      return typeof defaultValue === 'string' ? defaultValue : defaultValue();
    },
    parse(value, args) {
      if ((args === null || args === void 0 ? void 0 : args.slug) !== undefined) {
        return args.slug;
      }
      return parseAsNormalField(value);
    },
    serialize(value) {
      return {
        value: value === '' ? undefined : value
      };
    },
    serializeWithSlug(value) {
      return {
        slug: value,
        value: undefined
      };
    },
    reader: {
      parse(value) {
        const parsed = parseAsNormalField(value);
        return validate(parsed, undefined);
      },
      parseWithSlug(_value, args) {
        validate(parseAsNormalField(args.slug), {
          glob: args.glob,
          slugs: emptySet
        });
        return null;
      }
    },
    validate(value, args) {
      return validate(value, args === null || args === void 0 ? void 0 : args.slugField);
    }
  };
}




/***/ }),

/***/ 85955:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ l10nMessages)
/* harmony export */ });
var l10nMessages = {
	"ar-AE": {
		add: "يضيف",
		basedOn: "مرتكز على",
		branchName: "اسم الفرع",
		branches: "الفروع",
		cancel: "يلغي",
		clear: "مسح",
		collection: "مجموعة",
		collections: "المجموعات",
		create: "يخلق",
		createPullRequest: "إنشاء طلب سحب",
		currentBranch: "الفرع الحالي",
		dashboard: "لوحة القيادة",
		defaultBranch: "الفرع الافتراضي",
		"delete": "يمسح",
		deleteBranch: "حذف الفرع",
		edit: "يحرر",
		loading: "جارٍ التحميل",
		newBranch: "فرع جديد",
		otherBranches: "الفروع الأخرى",
		pullRequests: "طلبات السحب",
		save: "يحفظ",
		singleton: "سينجلتون",
		search: "بحث",
		singletons: "الفردي",
		theCurrentlyCheckedOutBranch: "الفرع المعاد حاليا. اختر هذا إذا كنت بحاجة إلى البناء على العمل الحالي من الفرع الحالي.",
		theDefaultBranchInYourRepository: "الفرع الافتراضي في المستودع الخاص بك. اختر هذا لبدء شيء جديد لا يعتمد على فرعك الحالي.",
		viewPullRequests: "عرض طلبات السحب"
	},
	"cs-CZ": {
		add: "Přidat",
		basedOn: "Na základě",
		branchName: "Jméno pobočky",
		branches: "Větve",
		cancel: "zrušení",
		clear: "Vymazat",
		collection: "Sbírka",
		collections: "Sbírky",
		create: "Vytvořit",
		createPullRequest: "Vytvořit požadavek na stažení",
		currentBranch: "Současná pobočka",
		dashboard: "Přístrojová deska",
		defaultBranch: "Výchozí větev",
		"delete": "Vymazat",
		deleteBranch: "Smazat větev",
		edit: "Upravit",
		loading: "Načítání",
		newBranch: "Nová pobočka",
		otherBranches: "Ostatní pobočky",
		pullRequests: "Vytáhněte požadavky",
		save: "Uložit",
		search: "Hledat",
		singletons: "Singletons",
		singleton: "Jedináček",
		theCurrentlyCheckedOutBranch: "Aktuálně odhlášená pobočka. Tuto možnost vyberte, pokud potřebujete navázat na stávající práci z aktuální pobočky.",
		theDefaultBranchInYourRepository: "Výchozí větev ve vašem úložišti. Zvolte tuto možnost, chcete-li začít s něčím novým, co není závislé na vaší aktuální větvi.",
		viewPullRequests: "Zobrazit žádosti o stažení"
	},
	"bg-BG": {
		add: "Добавете",
		basedOn: "Базиран на",
		branchName: "Име на клон",
		branches: "Клонове",
		cancel: "Отказ",
		clear: "Изчисти",
		collection: "колекция",
		collections: "Колекции",
		create: "Създавайте",
		createPullRequest: "Създайте заявка за изтегляне",
		currentBranch: "Текущ клон",
		dashboard: "Табло",
		defaultBranch: "Клон по подразбиране",
		"delete": "Изтрий",
		deleteBranch: "Изтриване на клон",
		edit: "редактиране",
		loading: "Зареждане",
		newBranch: "Нов клон",
		otherBranches: "Други клонове",
		pullRequests: "Заявки за изтегляне",
		save: "Запазване",
		search: "Търсене",
		singleton: "Сингълтън",
		singletons: "Единични",
		theCurrentlyCheckedOutBranch: "Текущо провереният клон. Изберете това, ако трябва да надграждате върху съществуваща работа от текущия клон.",
		theDefaultBranchInYourRepository: "Клонът по подразбиране във вашето хранилище. Изберете това, за да започнете с нещо ново, което не зависи от текущия ви клон.",
		viewPullRequests: "Преглед на заявките за изтегляне"
	},
	"da-DK": {
		add: "Tilføje",
		basedOn: "Baseret på",
		branchName: "Afdelingsnavn",
		branches: "Grene",
		cancel: "Afbestille",
		clear: "Ryd",
		collection: "Kollektion",
		collections: "Samlinger",
		create: "skab",
		createPullRequest: "Opret pull-anmodning",
		currentBranch: "Nuværende filial",
		dashboard: "Dashboard",
		defaultBranch: "Standard gren",
		"delete": "Slet",
		deleteBranch: "Slet filial",
		edit: "Redigere",
		loading: "Indlæser",
		newBranch: "Ny filial",
		otherBranches: "Andre grene",
		pullRequests: "Træk anmodninger",
		save: "Gemme",
		search: "Søg",
		singleton: "Singleton",
		singletons: "Singletoner",
		theCurrentlyCheckedOutBranch: "Den aktuelt tjekkede filial. Vælg dette, hvis du skal bygge videre på eksisterende arbejde fra den nuværende filial.",
		theDefaultBranchInYourRepository: "Standardgrenen i dit lager. Vælg dette for at starte på noget nyt, der ikke er afhængigt af din nuværende filial.",
		viewPullRequests: "Se pull-anmodninger"
	},
	"el-GR": {
		add: "Προσθήκη",
		basedOn: "Βασισμένο στο",
		branchName: "Όνομα υποκαταστήματος",
		branches: "Κλαδια δεντρου",
		cancel: "Ματαίωση",
		clear: "Καθαρισμός",
		collection: "Συλλογή",
		create: "Δημιουργώ",
		collections: "Συλλογές",
		createPullRequest: "Δημιουργία αιτήματος έλξης",
		currentBranch: "Τρέχον υποκατάστημα",
		dashboard: "Ταμπλό",
		defaultBranch: "Προεπιλεγμένος κλάδος",
		"delete": "Διαγράφω",
		deleteBranch: "Διαγραφή υποκαταστήματος",
		edit: "Επεξεργασία",
		loading: "Φόρτωση",
		otherBranches: "Άλλα υποκαταστήματα",
		newBranch: "Νέο υποκατάστημα",
		pullRequests: "Τραβήξτε αιτήματα",
		save: "Αποθηκεύσετε",
		search: "Αναζήτηση",
		singleton: "Μοναδικό χαρτί",
		singletons: "Singletons",
		theCurrentlyCheckedOutBranch: "Το υποκατάστημα που ελέγχεται αυτήν τη στιγμή. Επιλέξτε αυτό εάν χρειάζεται να βασιστείτε σε υπάρχουσες εργασίες από τον τρέχοντα κλάδο.",
		theDefaultBranchInYourRepository: "Ο προεπιλεγμένος κλάδος στο αποθετήριο σας. Επιλέξτε αυτό για να ξεκινήσετε κάτι νέο που δεν εξαρτάται από το τρέχον υποκατάστημά σας.",
		viewPullRequests: "Προβολή αιτημάτων έλξης"
	},
	"en-US": {
		add: "Add",
		basedOn: "Based on",
		branchName: "Branch name",
		branches: "Branches",
		cancel: "Cancel",
		clear: "Clear",
		collection: "Collection",
		collections: "Collections",
		create: "Create",
		currentBranch: "Current branch",
		createPullRequest: "Create pull request",
		dashboard: "Dashboard",
		defaultBranch: "Default branch",
		"delete": "Delete",
		deleteBranch: "Delete branch",
		edit: "Edit",
		loading: "Loading",
		newBranch: "New branch…",
		otherBranches: "Other branches",
		pullRequests: "Pull requests",
		save: "Save",
		search: "Search",
		singletons: "Singletons",
		singleton: "Singleton",
		theCurrentlyCheckedOutBranch: "The currently checked out branch. Choose this if you need to build on existing work from the current branch.",
		theDefaultBranchInYourRepository: "The default branch in your repository. Choose this to start something new that's not dependent on your current branch.",
		viewPullRequests: "View pull requests"
	},
	"es-ES": {
		add: "Agregar",
		basedOn: "Residencia en",
		branches: "Sucursales",
		branchName: "Nombre de la sucursal",
		cancel: "Cancelar",
		clear: "Borrar",
		collection: "Colección",
		collections: "Colecciones",
		createPullRequest: "Crear solicitud de extracción",
		create: "Crear",
		dashboard: "Panel",
		currentBranch: "Rama actual",
		defaultBranch: "Rama predeterminada",
		"delete": "Borrar",
		deleteBranch: "Eliminar rama",
		edit: "Editar",
		loading: "Cargando",
		newBranch: "Nueva sucursal",
		otherBranches: "Otras sucursales",
		pullRequests: "Solicitudes de extracción",
		save: "Ahorrar",
		search: "Buscar",
		singleton: "Semifallo",
		singletons: "Solteros",
		theCurrentlyCheckedOutBranch: "La sucursal actualmente desprotegida. Elija esto si necesita desarrollar el trabajo existente de la rama actual.",
		theDefaultBranchInYourRepository: "La rama predeterminada en su repositorio. Elija esto para comenzar algo nuevo que no dependa de su sucursal actual.",
		viewPullRequests: "Ver solicitudes de extracción"
	},
	"fi-FI": {
		add: "Lisätä",
		basedOn: "Perustuen",
		branchName: "Sivukonttorin nimi",
		branches: "Oksat",
		cancel: "Tühista",
		clear: "Kirkas",
		collection: "Kokoelma",
		collections: "Kokoelmat",
		create: "Luoda",
		currentBranch: "Nykyinen haara",
		createPullRequest: "Luo vetopyyntö",
		defaultBranch: "Oletushaara",
		dashboard: "Kojelauta",
		"delete": "Poistaa",
		deleteBranch: "Poista haara",
		edit: "Muokata",
		loading: "Ladataan",
		newBranch: "Uusi haara",
		otherBranches: "Muut haarat",
		pullRequests: "Vedä pyyntöjä",
		save: "Tallentaa",
		search: "Hae",
		singleton: "Singleton",
		singletons: "Singletons",
		theCurrentlyCheckedOutBranch: "Tällä hetkellä uloskirjautunut sivuliike. Valitse tämä, jos haluat rakentaa nykyisen haaran olemassa olevaan työhön.",
		theDefaultBranchInYourRepository: "Oletushaara arkistossasi. Valitse tämä aloittaaksesi jotain uutta, joka ei ole riippuvainen nykyisestä haarastasi.",
		viewPullRequests: "Näytä vetopyynnöt"
	},
	"fr-FR": {
		add: "Ajouter",
		branchName: "Nom de la filiale",
		basedOn: "Basé sur",
		branches: "Branches",
		cancel: "Annuler",
		clear: "Effacer",
		collection: "Collection",
		collections: "Collections",
		create: "Créer",
		createPullRequest: "Créer une demande d'extraction",
		currentBranch: "Succursale actuelle",
		dashboard: "Tableau de bord",
		defaultBranch: "Branche par défaut",
		"delete": "Supprimer",
		deleteBranch: "Supprimer la branche",
		edit: "Modifier",
		loading: "Chargement en cours",
		newBranch: "Nouvelle branche",
		otherBranches: "Autres succursales",
		pullRequests: "Demandes d'extraction",
		save: "Sauvegarder",
		search: "Rechercher",
		singleton: "Singleton",
		singletons: "Célibataires",
		theCurrentlyCheckedOutBranch: "La branche actuellement extraite. Choisissez cette option si vous devez vous appuyer sur le travail existant de la branche actuelle.",
		theDefaultBranchInYourRepository: "La branche par défaut de votre référentiel. Choisissez ceci pour commencer quelque chose de nouveau qui ne dépend pas de votre branche actuelle.",
		viewPullRequests: "Afficher les demandes d'extraction"
	},
	"hr-HR": {
		basedOn: "Na temelju",
		add: "Dodati",
		branches: "Podružnice",
		branchName: "Naziv podružnice",
		cancel: "Otkazati",
		clear: "Izbriši",
		collection: "Kolekcija",
		collections: "Zbirke",
		create: "Stvoriti",
		createPullRequest: "Kreirajte zahtjev za povlačenjem",
		currentBranch: "Trenutna grana",
		dashboard: "Nadzorna ploča",
		defaultBranch: "Zadana grana",
		"delete": "Izbrisati",
		deleteBranch: "Izbriši granu",
		edit: "Uredi",
		loading: "Učitavam",
		newBranch: "Nova grana",
		pullRequests: "Zahtjevi za povlačenjem",
		otherBranches: "Ostale grane",
		save: "Uštedjeti",
		search: "Traži",
		singletons: "Samci",
		singleton: "samac",
		theCurrentlyCheckedOutBranch: "Trenutno odjavljena poslovnica. Odaberite ovo ako trebate graditi na postojećem radu iz trenutne grane.",
		theDefaultBranchInYourRepository: "Zadana grana u vašem spremištu. Odaberite ovo da započnete nešto novo što ne ovisi o vašoj trenutnoj grani.",
		viewPullRequests: "Pregledajte zahtjeve za povlačenjem"
	},
	"he-IL": {
		add: "לְהוֹסִיף",
		basedOn: "מבוסס על",
		branchName: "שם הסניף",
		branches: "ענפים",
		cancel: "לְבַטֵל",
		collection: "אוסף",
		clear: "נקי",
		create: "לִיצוֹר",
		collections: "אוספים",
		createPullRequest: "צור בקשת משיכה",
		currentBranch: "סניף נוכחי",
		dashboard: "לוּחַ מַחווָנִים",
		defaultBranch: "סניף ברירת מחדל",
		"delete": "לִמְחוֹק",
		deleteBranch: "מחק סניף",
		edit: "לַעֲרוֹך",
		loading: "טוען",
		newBranch: "סניף חדש",
		otherBranches: "סניפים אחרים",
		pullRequests: "משוך בקשות",
		save: "להציל",
		search: "חפש",
		singletons: "רווקים",
		singleton: "קְלָף בּוֹדֵד",
		theCurrentlyCheckedOutBranch: "הסניף שנקבע כעת. בחר באפשרות זו אם אתה צריך לבנות על עבודה קיימת מהסניף הנוכחי.",
		theDefaultBranchInYourRepository: "סניף ברירת המחדל במאגר שלך. בחר באפשרות זו כדי להתחיל משהו חדש שאינו תלוי בסניף הנוכחי שלך.",
		viewPullRequests: "הצג בקשות משיכה"
	},
	"hu-HU": {
		add: "Hozzáadás",
		basedOn: "Alapján",
		branchName: "Fiók neve",
		cancel: "Megszünteti",
		branches: "Ágak",
		clear: "Törlés",
		collection: "Gyűjtemény",
		collections: "Gyűjtemények",
		create: "Teremt",
		createPullRequest: "Lehívási kérelem létrehozása",
		currentBranch: "Jelenlegi ág",
		defaultBranch: "Alapértelmezett ág",
		dashboard: "Irányítópult",
		"delete": "Töröl",
		deleteBranch: "Elágazás törlése",
		edit: "Szerkesztés",
		loading: "Betöltés folyamatban",
		newBranch: "Új ág",
		otherBranches: "Egyéb ágak",
		pullRequests: "Lehívási kérések",
		save: "Megment",
		search: "Keresés",
		singleton: "szingli",
		singletons: "Singletons",
		theDefaultBranchInYourRepository: "Az alapértelmezett ág az adattárban. Válassza ezt, ha valami újat szeretne indítani, amely nem függ az aktuális ágtól.",
		theCurrentlyCheckedOutBranch: "A jelenleg kivett fiók. Válassza ezt, ha az aktuális ág meglévő munkájára kell építenie.",
		viewPullRequests: "Lehívási kérelmek megtekintése"
	},
	"it-IT": {
		add: "Aggiungere",
		basedOn: "Basato su",
		branchName: "Nome ramo",
		branches: "Rami",
		cancel: "Annulla",
		clear: "Cancella",
		collection: "Collezione",
		collections: "Collezioni",
		create: "Creare",
		createPullRequest: "Crea richiesta pull",
		currentBranch: "Ramo attuale",
		dashboard: "Pannello di controllo",
		defaultBranch: "Ramo predefinito",
		"delete": "Eliminare",
		deleteBranch: "Elimina ramo",
		edit: "Modificare",
		loading: "Caricamento in corso",
		newBranch: "Nuova filiale",
		otherBranches: "Altri rami",
		pullRequests: "Richieste pull",
		save: "Salva",
		singleton: "Singleton",
		search: "Cerca",
		theCurrentlyCheckedOutBranch: "La filiale attualmente verificata. Scegli questa opzione se devi basarti su un lavoro esistente dal ramo corrente.",
		singletons: "Singletons",
		theDefaultBranchInYourRepository: "Il ramo predefinito nel tuo repository. Scegli questa opzione per iniziare qualcosa di nuovo che non dipenda dal tuo ramo attuale.",
		viewPullRequests: "Visualizza le richieste pull"
	},
	"ja-JP": {
		add: "追加",
		basedOn: "に基づく",
		branchName: "支店名",
		branches: "支店",
		cancel: "キャンセル",
		clear: "クリア",
		collections: "コレクション",
		collection: "コレクション",
		create: "作成",
		createPullRequest: "プルリクエストを作成",
		currentBranch: "現在のブランチ",
		dashboard: "ダッシュボード",
		defaultBranch: "デフォルトのブランチ",
		"delete": "消去",
		deleteBranch: "ブランチを削除",
		edit: "編集",
		loading: "読み込み中",
		newBranch: "新しい支店",
		pullRequests: "プルリクエスト",
		otherBranches: "その他の支店",
		search: "検索",
		save: "保存",
		singleton: "シングルトン",
		singletons: "シングルトン",
		theCurrentlyCheckedOutBranch: "現在チェックアウトされているブランチ。 現在のブランチの既存の作業に基づいて構築する必要がある場合は、これを選択してください。",
		theDefaultBranchInYourRepository: "リポジトリのデフォルト ブランチ。 これを選択して、現在のブランチに依存しない新しい何かを開始します。",
		viewPullRequests: "プル リクエストを表示"
	},
	"lt-LT": {
		add: "Papildyti",
		branchName: "Filialo pavadinimas",
		basedOn: "Remiantis",
		branches: "Filialai",
		cancel: "Atšaukti",
		clear: "Skaidrus",
		collection: "Kolekcija",
		collections: "Kolekcijos",
		create: "Sukurti",
		createPullRequest: "Sukurti ištraukimo užklausą",
		currentBranch: "Dabartinis filialas",
		dashboard: "Prietaisų skydelis",
		defaultBranch: "Numatytoji šaka",
		"delete": "Ištrinti",
		deleteBranch: "Ištrinti šaką",
		edit: "Redaguoti",
		loading: "Įkeliama",
		newBranch: "Naujas filialas",
		otherBranches: "Kitos šakos",
		pullRequests: "Ištraukti užklausas",
		save: "Sutaupyti",
		search: "Ieškoti",
		singletons: "Vienišiai",
		singleton: "vienvietis",
		theCurrentlyCheckedOutBranch: "Šiuo metu išregistruotas filialas. Pasirinkite tai, jei reikia remtis esamu darbu iš dabartinės šakos.",
		theDefaultBranchInYourRepository: "Numatytoji šaka jūsų saugykloje. Pasirinkite tai, kad pradėtumėte ką nors naujo, nepriklausančio nuo dabartinės šakos.",
		viewPullRequests: "Peržiūrėkite ištraukimo užklausas"
	},
	"ko-KR": {
		add: "추가하다",
		basedOn: "기반으로",
		branchName: "지점명",
		branches: "가지",
		cancel: "취소",
		clear: "지우기",
		collection: "수집",
		collections: "컬렉션",
		create: "만들다",
		createPullRequest: "풀 요청 생성",
		currentBranch: "현재 지점",
		dashboard: "계기반",
		defaultBranch: "기본 분기",
		"delete": "삭제",
		deleteBranch: "분기 삭제",
		edit: "편집하다",
		loading: "로드 중",
		newBranch: "새 지점",
		otherBranches: "기타 지점",
		pullRequests: "풀 리퀘스트",
		search: "검색",
		save: "구하다",
		singleton: "하나씩 일어나는 것",
		singletons: "싱글톤",
		theCurrentlyCheckedOutBranch: "현재 체크아웃된 브랜치. 현재 브랜치의 기존 작업을 기반으로 빌드해야 하는 경우 이 옵션을 선택하세요.",
		theDefaultBranchInYourRepository: "리포지토리의 기본 브랜치입니다. 현재 분기에 의존하지 않는 새로운 것을 시작하려면 이것을 선택하십시오.",
		viewPullRequests: "풀 요청 보기"
	},
	"lv-LV": {
		add: "Pievienot",
		basedOn: "Balstoties uz",
		branchName: "Filiāles nosaukums",
		branches: "Nozares",
		cancel: "Atcelt",
		collection: "Kolekcija",
		clear: "Notīrīt",
		collections: "Kolekcijas",
		createPullRequest: "Izveidot izvilkšanas pieprasījumu",
		currentBranch: "Pašreizējā filiāle",
		create: "Izveidot",
		dashboard: "Mērinstrumentu panelis",
		defaultBranch: "Noklusējuma filiāle",
		"delete": "Dzēst",
		deleteBranch: "Dzēst filiāli",
		edit: "Rediģēt",
		loading: "Notiek ielāde",
		newBranch: "Jauna filiāle",
		otherBranches: "Citas filiāles",
		pullRequests: "Izvilkšanas pieprasījumi",
		save: "Saglabāt",
		search: "Meklēt",
		singleton: "Singleton",
		singletons: "Vientuļi",
		theDefaultBranchInYourRepository: "Noklusējuma filiāle jūsu repozitorijā. Izvēlieties šo, lai sāktu kaut ko jaunu, kas nav atkarīgs no jūsu pašreizējās filiāles.",
		theCurrentlyCheckedOutBranch: "Pašlaik izrakstītā filiāle. Izvēlieties šo, ja vēlaties izmantot esošo darbu no pašreizējās filiāles.",
		viewPullRequests: "Skatīt izvilkšanas pieprasījumus"
	},
	"nb-NO": {
		add: "Legg til",
		basedOn: "Basert på",
		branchName: "Filialnavn",
		cancel: "Avbryt",
		branches: "Grener",
		clear: "Tøm",
		collection: "Samling",
		collections: "Samlinger",
		create: "Skape",
		createPullRequest: "Opprett pull-forespørsel",
		currentBranch: "Nåværende gren",
		dashboard: "Dashbord",
		defaultBranch: "Standard gren",
		"delete": "Slett",
		deleteBranch: "Slett filial",
		edit: "Redigere",
		loading: "Laster inn",
		newBranch: "Ny gren",
		otherBranches: "Andre grener",
		pullRequests: "Trekk forespørsler",
		save: "Lagre",
		search: "Søk",
		singleton: "Singleton",
		singletons: "Singletoner",
		theCurrentlyCheckedOutBranch: "Den utsjekkede grenen. Velg dette hvis du skal bygge på eksisterende arbeid fra gjeldende gren.",
		viewPullRequests: "Se pull-forespørsler",
		theDefaultBranchInYourRepository: "Standardgrenen i depotet ditt. Velg dette for å starte noe nytt som ikke er avhengig av din nåværende filial."
	},
	"nl-NL": {
		add: "Toevoegen",
		basedOn: "Gebaseerd op",
		branchName: "Filiaal naam",
		branches: "Takken",
		cancel: "Annuleren",
		clear: "Helder",
		collection: "Verzameling",
		collections: "Collecties",
		create: "Creëren",
		createPullRequest: "Pull-aanvraag maken",
		currentBranch: "Huidige tak",
		dashboard: "Dashboard",
		defaultBranch: "Standaard filiaal",
		"delete": "Verwijderen",
		deleteBranch: "Filiaal verwijderen",
		edit: "Bewerking",
		loading: "Laden",
		newBranch: "Nieuwe tak",
		otherBranches: "Andere takken",
		pullRequests: "Trek verzoeken",
		search: "Zoeken",
		save: "Redden",
		singleton: "eenling",
		singletons: "Eenlingen",
		theCurrentlyCheckedOutBranch: "Het momenteel uitgecheckte filiaal. Kies dit als u moet voortbouwen op bestaand werk van de huidige branch.",
		theDefaultBranchInYourRepository: "De standaard branch in uw repository. Kies dit om iets nieuws te starten dat niet afhankelijk is van uw huidige branche.",
		viewPullRequests: "Bekijk pull-aanvragen"
	},
	"pl-PL": {
		add: "Dodać",
		basedOn: "Oparte na",
		branchName: "Nazwa filii",
		branches: "Gałęzie",
		cancel: "Anulować",
		clear: "Wyczyść",
		collection: "Kolekcja",
		collections: "Kolekcje",
		create: "Tworzyć",
		createPullRequest: "Utwórz żądanie ściągnięcia",
		currentBranch: "Obecny oddział",
		dashboard: "Panel",
		defaultBranch: "Oddział domyślny",
		"delete": "Usuwać",
		deleteBranch: "Usuń oddział",
		edit: "Edytować",
		loading: "Trwa ładowanie",
		newBranch: "Nowa gałąź",
		otherBranches: "Inne gałęzie",
		pullRequests: "Żądania ściągnięcia",
		save: "Ratować",
		search: "Szukaj",
		singleton: "singel",
		singletons: "Singletony",
		theCurrentlyCheckedOutBranch: "Aktualnie wyewidencjonowana gałąź. Wybierz tę opcję, jeśli chcesz oprzeć się na istniejącej pracy z bieżącej gałęzi.",
		theDefaultBranchInYourRepository: "Domyślna gałąź w twoim repozytorium. Wybierz tę opcję, aby rozpocząć coś nowego, co nie jest zależne od bieżącej gałęzi.",
		viewPullRequests: "Wyświetl żądania ściągnięcia"
	},
	"pt-BR": {
		add: "Adicionar",
		basedOn: "Baseado em",
		branchName: "Nome da filial",
		branches: "Galhos",
		cancel: "Cancelar",
		clear: "Limpar",
		collection: "Coleção",
		collections: "Coleções",
		create: "Criar",
		createPullRequest: "Criar solicitação pull",
		currentBranch: "filial atual",
		dashboard: "Painel",
		defaultBranch: "ramo padrão",
		"delete": "Excluir",
		deleteBranch: "Excluir ramificação",
		edit: "Editar",
		loading: "Carregando",
		newBranch: "Nova filial",
		otherBranches: "Outros ramos",
		pullRequests: "Requisições pull",
		save: "Guardar",
		search: "Pesquisar",
		singleton: "solteiro",
		singletons: "Solteiros",
		theCurrentlyCheckedOutBranch: "A ramificação atualmente com check-out. Escolha esta opção se precisar criar um trabalho existente na ramificação atual.",
		theDefaultBranchInYourRepository: "A ramificação padrão em seu repositório. Escolha isso para iniciar algo novo que não dependa de sua ramificação atual.",
		viewPullRequests: "Ver solicitações pull"
	},
	"pt-PT": {
		add: "Adicionar",
		basedOn: "Baseado em",
		branchName: "Nome da filial",
		branches: "Galhos",
		clear: "Limpar",
		cancel: "Cancelar",
		collection: "Coleção",
		collections: "Coleções",
		create: "Criar",
		createPullRequest: "Criar solicitação pull",
		currentBranch: "filial atual",
		dashboard: "Painel",
		"delete": "Excluir",
		defaultBranch: "ramo padrão",
		deleteBranch: "Excluir ramificação",
		edit: "Editar",
		loading: "A carregar",
		newBranch: "Nova filial",
		otherBranches: "Outros ramos",
		pullRequests: "Requisições pull",
		save: "Guardar",
		search: "Procurar",
		singleton: "solteiro",
		singletons: "Solteiros",
		theCurrentlyCheckedOutBranch: "A ramificação atualmente com check-out. Escolha esta opção se precisar criar um trabalho existente na ramificação atual.",
		theDefaultBranchInYourRepository: "A ramificação padrão em seu repositório. Escolha isso para iniciar algo novo que não dependa de sua ramificação atual.",
		viewPullRequests: "Ver solicitações pull"
	},
	"ro-RO": {
		add: "Adăuga",
		basedOn: "Bazat pe",
		branchName: "Numele sucursalei",
		branches: "Ramuri",
		cancel: "Anulare",
		clear: "Golire",
		collection: "Colectie",
		collections: "Colecții",
		create: "Crea",
		currentBranch: "Filiala actuală",
		createPullRequest: "Creați cerere de tragere",
		dashboard: "Bord",
		defaultBranch: "Ramura implicită",
		"delete": "Șterge",
		deleteBranch: "Ștergeți ramura",
		edit: "Editați",
		loading: "Se încarcă",
		newBranch: "Filiala noua",
		otherBranches: "Alte ramuri",
		pullRequests: "Solicitări de tragere",
		save: "Salvați",
		search: "Căutare",
		singleton: "Singleton",
		singletons: "Singletons",
		theCurrentlyCheckedOutBranch: "Sucursala verificată în prezent. Alegeți acest lucru dacă trebuie să vă bazați pe munca existentă din ramura curentă.",
		theDefaultBranchInYourRepository: "Ramura implicită din depozitul dvs. Alegeți acest lucru pentru a începe ceva nou, care nu depinde de ramura dvs. actuală.",
		viewPullRequests: "Vizualizați solicitările de extragere"
	},
	"ru-RU": {
		add: "Добавлять",
		basedOn: "На основе",
		branchName: "Название филиала",
		branches: "Ветви",
		cancel: "Отмена",
		clear: "Очистить",
		collection: "Коллекция",
		collections: "Коллекции",
		create: "Создавать",
		createPullRequest: "Создать запрос на включение",
		currentBranch: "Текущая ветвь",
		dashboard: "Панель приборов",
		defaultBranch: "Ветка по умолчанию",
		"delete": "Удалить",
		deleteBranch: "Удалить ветку",
		edit: "Редактировать",
		loading: "Загрузка",
		newBranch: "Новая ветка",
		otherBranches: "Другие филиалы",
		pullRequests: "Пулл-реквесты",
		save: "Сохранять",
		search: "Поиск",
		singleton: "Синглтон",
		singletons: "Одиночки",
		theCurrentlyCheckedOutBranch: "Текущая проверенная ветвь. Выберите это, если вам нужно опираться на существующую работу из текущей ветки.",
		theDefaultBranchInYourRepository: "Ветка по умолчанию в вашем репозитории. Выберите это, чтобы начать что-то новое, не зависящее от вашей текущей ветки.",
		viewPullRequests: "Посмотреть пул-реквесты"
	},
	"sk-SK": {
		add: "Pridať",
		basedOn: "Založené na",
		branchName: "Meno pobočky",
		branches: "Pobočky",
		cancel: "Zrušiť",
		clear: "Vymazať",
		collection: "Zbierka",
		collections: "zbierky",
		create: "Vytvorte",
		createPullRequest: "Vytvorte požiadavku na stiahnutie",
		currentBranch: "Aktuálna pobočka",
		dashboard: "Dashboard",
		defaultBranch: "Predvolená vetva",
		"delete": "Odstrániť",
		deleteBranch: "Odstrániť vetvu",
		edit: "Upraviť",
		newBranch: "Nová pobočka",
		loading: "Načítava sa",
		otherBranches: "Ostatné pobočky",
		pullRequests: "Vytiahnite žiadosti",
		search: "Vyhľadávať",
		save: "Uložiť",
		singleton: "Singleton",
		singletons: "Singletons",
		theCurrentlyCheckedOutBranch: "Aktuálne odhlásená pobočka. Túto možnosť vyberte, ak potrebujete stavať na existujúcej práci z aktuálnej pobočky.",
		theDefaultBranchInYourRepository: "Predvolená vetva vo vašom úložisku. Zvoľte túto možnosť, ak chcete začať niečo nové, čo nezávisí od vašej aktuálnej pobočky.",
		viewPullRequests: "Zobraziť požiadavky na stiahnutie"
	},
	"sl-SI": {
		add: "Dodaj",
		branchName: "Ime podružnice",
		basedOn: "Temelji na",
		branches: "Podružnice",
		cancel: "Prekliči",
		clear: "Jasen",
		collection: "Zbirka",
		collections: "Zbirke",
		create: "Ustvari",
		createPullRequest: "Ustvari zahtevo za vleko",
		currentBranch: "Trenutna veja",
		dashboard: "Nadzorna plošča",
		defaultBranch: "Privzeta veja",
		"delete": "Izbriši",
		deleteBranch: "Izbriši vejo",
		edit: "Uredi",
		loading: "Nalaganje",
		newBranch: "Nova podružnica",
		otherBranches: "Druge veje",
		pullRequests: "Zahteve za vlečenje",
		save: "Shrani",
		search: "Iskanje",
		singleton: "Singleton",
		singletons: "Samski",
		theCurrentlyCheckedOutBranch: "Trenutno odjavljena podružnica. To izberite, če morate graditi na obstoječem delu iz trenutne veje.",
		theDefaultBranchInYourRepository: "Privzeta veja v vašem skladišču. Izberite to, da začnete nekaj novega, kar ni odvisno od vaše trenutne veje.",
		viewPullRequests: "Oglejte si zahteve za vlečenje"
	},
	"sr-SP": {
		basedOn: "На бази",
		add: "Додати",
		branchName: "Назив огранка",
		branches: "Огранци",
		clear: "Izbriši",
		cancel: "Поништити, отказати",
		collection: "Цоллецтион",
		collections: "Збирке",
		create: "Креирај",
		createPullRequest: "Креирајте захтев за повлачење",
		currentBranch: "Тренутна грана",
		dashboard: "Командна табла",
		defaultBranch: "Подразумевана грана",
		"delete": "Избриши",
		deleteBranch: "Обриши грану",
		edit: "Уредити",
		loading: "Učitavam",
		newBranch: "Нова грана",
		otherBranches: "Остале гране",
		pullRequests: "Захтеви за повлачење",
		save: "сачувати",
		search: "Pretraga",
		singleton: "Синглетон",
		singletons: "Синглетонс",
		theCurrentlyCheckedOutBranch: "Тренутно одјављена филијала. Изаберите ово ако треба да надоградите постојећи рад из тренутне гране.",
		theDefaultBranchInYourRepository: "Подразумевана грана у вашем спремишту. Изаберите ово да започнете нешто ново што не зависи од ваше тренутне гране.",
		viewPullRequests: "Прегледајте захтеве за повлачењем"
	},
	"sv-SE": {
		add: "Lägg till",
		basedOn: "Baserat på",
		branchName: "Filialens namn",
		branches: "Grenar",
		cancel: "Поништити, отказати",
		clear: "Rensa",
		collection: "Samling",
		collections: "Samlingar",
		create: "Skapa",
		createPullRequest: "Skapa pull-förfrågan",
		currentBranch: "Nuvarande gren",
		dashboard: "instrumentbräda",
		"delete": "Radera",
		defaultBranch: "Standardgren",
		deleteBranch: "Ta bort gren",
		edit: "Redigera",
		loading: "Läser in",
		newBranch: "Ny gren",
		otherBranches: "Andra grenar",
		pullRequests: "Dra förfrågningar",
		save: "Spara",
		search: "Sök",
		singleton: "Singleton",
		singletons: "Singlar",
		theCurrentlyCheckedOutBranch: "Den utcheckade filialen. Välj detta om du behöver bygga på befintligt arbete från den aktuella grenen.",
		theDefaultBranchInYourRepository: "Standardgrenen i ditt arkiv. Välj detta för att starta något nytt som inte är beroende av din nuvarande filial.",
		viewPullRequests: "Visa pull-förfrågningar"
	},
	"tr-TR": {
		add: "Avbryt",
		basedOn: "Dayalı",
		branchName: "şube adı",
		branches: "Şubeler",
		cancel: "iptal etmek",
		clear: "Temizle",
		collection: "Toplamak",
		collections: "Koleksiyonlar",
		create: "Yaratmak",
		createPullRequest: "Çekme isteği oluştur",
		currentBranch: "Mevcut şube",
		dashboard: "Gösterge Paneli",
		defaultBranch: "varsayılan dal",
		"delete": "Silmek",
		deleteBranch: "Şubeyi sil",
		edit: "Düzenlemek",
		loading: "Yükleniyor",
		newBranch: "Yeni dal",
		otherBranches: "Diğer şubeler",
		pullRequests: "Çekme istekleri",
		save: "Kaydetmek",
		search: "Ara",
		singleton: "Tekil",
		singletons: "Singleton'lar",
		theCurrentlyCheckedOutBranch: "Şu anda kontrol edilen şube. Geçerli daldaki mevcut işi geliştirmeniz gerekiyorsa bunu seçin.",
		theDefaultBranchInYourRepository: "Deponuzdaki varsayılan şube. Mevcut şubenize bağlı olmayan yeni bir şey başlatmak için bunu seçin.",
		viewPullRequests: "Çekme isteklerini görüntüle"
	},
	"uk-UA": {
		add: "додати",
		basedOn: "На основі",
		branchName: "Назва гілки",
		branches: "Відділення",
		cancel: "скасувати",
		clear: "Очистити",
		collection: "Колекція",
		collections: "Колекції",
		create: "Створити",
		createPullRequest: "Створити запит на отримання",
		currentBranch: "Поточне відділення",
		dashboard: "Панель приладів",
		defaultBranch: "Гілка за замовчуванням",
		"delete": "Видалити",
		deleteBranch: "Видалити гілку",
		edit: "Редагувати",
		loading: "Завантаження",
		newBranch: "Нова гілка",
		otherBranches: "Інші гілки",
		pullRequests: "Запити на витягування",
		save: "зберегти",
		search: "Пошук",
		singleton: "Синглтон",
		singletons: "Одиночки",
		theCurrentlyCheckedOutBranch: "Поточна перевірена гілка. Виберіть це, якщо вам потрібно створити на основі існуючої роботи з поточної гілки.",
		theDefaultBranchInYourRepository: "Стандартна гілка у вашому сховищі. Виберіть це, щоб почати щось нове, що не залежить від вашої поточної гілки.",
		viewPullRequests: "Перегляд запитів на отримання"
	},
	"zh-CN": {
		basedOn: "基于",
		add: "添加",
		branchName: "分店名称",
		branches: "分支机构",
		cancel: "取消",
		clear: "透明",
		collection: "收藏",
		collections: "收藏品",
		create: "创造",
		createPullRequest: "创建拉取请求",
		currentBranch: "当前分支",
		dashboard: "仪表板",
		defaultBranch: "默认分支",
		"delete": "删除",
		deleteBranch: "删除分支",
		edit: "编辑",
		newBranch: "新分行",
		loading: "正在加载",
		otherBranches: "其他分行",
		pullRequests: "拉取请求",
		save: "节省",
		search: "搜索",
		singleton: "单例",
		singletons: "单例",
		theCurrentlyCheckedOutBranch: "当前签出的分支。 如果您需要在当前分支的现有工作的基础上构建，请选择此项。",
		theDefaultBranchInYourRepository: "存储库中的默认分支。 选择此选项可开始一些不依赖于当前分支的新操作。",
		viewPullRequests: "查看拉取请求"
	},
	"zh-TW": {
		add: "添加",
		basedOn: "基於",
		branchName: "分店名稱",
		branches: "分支機構",
		cancel: "取消",
		clear: "清除",
		collection: "收藏",
		collections: "收藏品",
		create: "創造",
		createPullRequest: "創建拉取請求",
		currentBranch: "當前分支",
		dashboard: "儀表板",
		defaultBranch: "默認分支",
		"delete": "刪除",
		deleteBranch: "刪除分支",
		edit: "編輯",
		loading: "正在載入",
		newBranch: "新分行",
		otherBranches: "其他分行",
		pullRequests: "拉取請求",
		save: "節省",
		singleton: "單例",
		search: "搜尋",
		singletons: "單例",
		theCurrentlyCheckedOutBranch: "當前簽出的分支。 如果您需要在當前分支的現有工作的基礎上構建，請選擇此項。",
		theDefaultBranchInYourRepository: "存儲庫中的默認分支。 選擇此選項可開始一些不依賴於當前分支的新操作。",
		viewPullRequests: "查看拉取請求"
	},
	"de-DE": {
		add: "Hinzufügen",
		branches: "Geäst",
		cancel: "Stornieren",
		clear: "Löschen",
		collection: "Sammlung",
		collections: "Sammlungen",
		create: "Erstellen",
		createPullRequest: "Pull-Request erstellen",
		currentBranch: "Aktueller Zweig",
		dashboard: "Armaturenbrett",
		defaultBranch: "Standardzweig",
		"delete": "Löschen",
		deleteBranch: "Zweig löschen",
		edit: "Bearbeiten",
		loading: "Wird geladen",
		newBranch: "Neue Zweig",
		otherBranches: "Andere Filialen",
		save: "Speichern",
		pullRequests: "Pull-Requests",
		search: "Suchen",
		singleton: "Einzelling",
		singletons: "Singles",
		theCurrentlyCheckedOutBranch: "Der aktuell ausgecheckte Zweig. Wählen Sie diese Option, wenn Sie auf vorhandener Arbeit aus dem aktuellen Zweig aufbauen müssen.",
		theDefaultBranchInYourRepository: "Der Standard-Branch in Ihrem Repository. Wählen Sie dies, um etwas Neues zu starten, das nicht von Ihrem aktuellen Zweig abhängt.",
		viewPullRequests: "Pull-Requests anzeigen",
		branchName: "Zweigname",
		basedOn: "Bezogen auf"
	},
	"et-EE": {
		add: "Lisama",
		basedOn: "Põhineb",
		branchName: "Filiaali nimi",
		branches: "Filiaalid",
		cancel: "Tühista",
		clear: "Puhasta",
		collection: "Kollektsioon",
		collections: "Kollektsioonid",
		create: "Loo",
		createPullRequest: "Loo tõmbamistaotlus",
		currentBranch: "Praegune filiaal",
		dashboard: "Armatuurlaud",
		defaultBranch: "Vaikeharu",
		"delete": "Kustuta",
		deleteBranch: "Kustuta haru",
		edit: "Muuda",
		loading: "Laadimine",
		newBranch: "Uus filiaal",
		otherBranches: "Muud oksad",
		pullRequests: "Tõmbetaotlused",
		save: "Salvesta",
		search: "Otsi",
		singletons: "Üksikud",
		theCurrentlyCheckedOutBranch: "Praegu välja registreeritud filiaal. Valige see, kui peate kasutama praeguse haru olemasolevaid töid.",
		theDefaultBranchInYourRepository: "Vaikeharu teie hoidlas. Valige see, et alustada midagi uut, mis ei sõltu teie praegusest harust.",
		viewPullRequests: "Vaadake tõmbamistaotlusi",
		singleton: "üksikud"
	}
};




/***/ }),

/***/ 24867:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ DocumentEditor),
/* harmony export */   u: () => (/* binding */ useIsInDocumentEditor)
/* harmony export */ });
/* harmony import */ var _prism_e4e5bc8f_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46080);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var is_hotkey__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(42950);
/* harmony import */ var slate__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(91526);
/* harmony import */ var slate_react__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(68051);
/* harmony import */ var _keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9772);
/* harmony import */ var _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(46792);
/* harmony import */ var _react_aria_i18n__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(93009);
/* harmony import */ var _keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(84371);
/* harmony import */ var _keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(70156);
/* harmony import */ var _keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(828);
/* harmony import */ var _keystar_ui_icon_icons_editIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(26544);
/* harmony import */ var _keystar_ui_icon_icons_externalLinkIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(69804);
/* harmony import */ var _keystar_ui_icon_icons_linkIcon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(38758);
/* harmony import */ var _keystar_ui_icon_icons_unlinkIcon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(66333);
/* harmony import */ var _keystar_ui_slots__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(71819);
/* harmony import */ var _keystar_ui_text_field__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(71209);
/* harmony import */ var _keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(74404);
/* harmony import */ var _keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(79798);
/* harmony import */ var _index_b8966079_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(85955);
/* harmony import */ var _index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(92788);
/* harmony import */ var _index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(52967);
/* harmony import */ var _utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(82101);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _isValidURL_02af2848_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(1988);
/* harmony import */ var _ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(54085);
/* harmony import */ var _keystar_ui_action_group__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(69034);
/* harmony import */ var _keystar_ui_icon_icons_boldIcon__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(60485);
/* harmony import */ var _keystar_ui_icon_icons_chevronDownIcon__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(47467);
/* harmony import */ var _keystar_ui_icon_icons_codeIcon__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(75434);
/* harmony import */ var _keystar_ui_icon_icons_italicIcon__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(41653);
/* harmony import */ var _keystar_ui_icon_icons_maximizeIcon__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(99071);
/* harmony import */ var _keystar_ui_icon_icons_minimizeIcon__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(76361);
/* harmony import */ var _keystar_ui_icon_icons_plusIcon__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(28273);
/* harmony import */ var _keystar_ui_icon_icons_removeFormattingIcon__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(95778);
/* harmony import */ var _keystar_ui_icon_icons_strikethroughIcon__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(51193);
/* harmony import */ var _keystar_ui_icon_icons_subscriptIcon__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(4030);
/* harmony import */ var _keystar_ui_icon_icons_superscriptIcon__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(63833);
/* harmony import */ var _keystar_ui_icon_icons_typeIcon__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(50839);
/* harmony import */ var _keystar_ui_icon_icons_underlineIcon__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(28315);
/* harmony import */ var _keystar_ui_menu__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(42188);
/* harmony import */ var _keystar_ui_picker__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(21991);
/* harmony import */ var _keystar_ui_icon_icons_alignLeftIcon__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(29031);
/* harmony import */ var _keystar_ui_icon_icons_alignRightIcon__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(23708);
/* harmony import */ var _keystar_ui_icon_icons_alignCenterIcon__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(43453);
/* harmony import */ var _keystar_ui_icon_icons_quoteIcon__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(83157);
/* harmony import */ var _react_stately_collections__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(4315);
/* harmony import */ var match_sorter__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(11868);
/* harmony import */ var _keystar_ui_combobox__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(16817);
/* harmony import */ var _keystar_ui_icon_icons_trash2Icon__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(51227);
/* harmony import */ var _languages_14058067_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(10896);
/* harmony import */ var _form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(84044);
/* harmony import */ var _errors_f334cbf7_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(71175);
/* harmony import */ var _initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(17181);
/* harmony import */ var emery__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(85916);
/* harmony import */ var _keystar_ui_field__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(60137);
/* harmony import */ var _keystar_ui_icon_icons_trashIcon__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(29980);
/* harmony import */ var emery_assertions__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(86522);
/* harmony import */ var _keystar_ui_icon_icons_minusIcon__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(77153);
/* harmony import */ var _keystar_ui_icon_icons_columnsIcon__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(63620);
/* harmony import */ var _keystar_ui_icon_icons_listIcon__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(93934);
/* harmony import */ var _keystar_ui_icon_icons_listOrderedIcon__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(19463);
/* harmony import */ var _keystar_ui_icon_icons_fileUpIcon__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(22992);
/* harmony import */ var _keystar_ui_icon_icons_imageIcon__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(56573);
/* harmony import */ var _ui_32b334fd_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(31764);
/* harmony import */ var _keystar_ui_checkbox__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(85501);
/* harmony import */ var _ui_b1673cee_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(71223);
/* harmony import */ var _ui_58f594ec_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(11317);
/* harmony import */ var _ui_1b838e41_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(27120);
/* harmony import */ var _ui_4365cc36_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(23779);
/* harmony import */ var _utils_677addd9_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(9583);
/* harmony import */ var _ui_fa32ff3c_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(93464);
/* harmony import */ var _ui_4f76db75_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(69262);
/* harmony import */ var _ui_23d3b9aa_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(59191);
/* harmony import */ var _sindresorhus_slugify__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(34903);
/* harmony import */ var _sindresorhus_slugify__WEBPACK_IMPORTED_MODULE_70___default = /*#__PURE__*/__webpack_require__.n(_sindresorhus_slugify__WEBPACK_IMPORTED_MODULE_70__);
/* harmony import */ var _ui_78a3a4f0_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(62091);
/* harmony import */ var _ui_c44da0bc_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(91985);
/* harmony import */ var _braintree_sanitize_url__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(19047);
/* harmony import */ var _ui_949db933_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(34548);
/* harmony import */ var _ui_6ea72555_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(11837);
/* harmony import */ var _keystar_ui_icon_icons_sheetIcon__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(55219);
/* harmony import */ var _keystar_ui_icon_icons_tableIcon__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(80479);
/* harmony import */ var _keystar_ui_utils__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(47187);
/* harmony import */ var scroll_into_view_if_needed__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(72841);
/* harmony import */ var _react_aria_overlays__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(43622);
/* harmony import */ var _react_stately_list__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(41746);
/* harmony import */ var _react_stately_overlays__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(57817);
/* harmony import */ var _keystar_ui_listbox__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(66805);
/* harmony import */ var _keystar_ui_overlays__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(52743);
/* harmony import */ var slate_history__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(60071);
/* harmony import */ var mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(27733);
/* harmony import */ var mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_81___default = /*#__PURE__*/__webpack_require__.n(mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_81__);
/* harmony import */ var mdast_util_gfm_autolink_literal_from_markdown__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(81411);
/* harmony import */ var micromark_extension_gfm_autolink_literal__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(45518);
/* harmony import */ var mdast_util_gfm_strikethrough_from_markdown__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(71504);
/* harmony import */ var micromark_extension_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(26567);
/* harmony import */ var micromark_extension_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_85___default = /*#__PURE__*/__webpack_require__.n(micromark_extension_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_85__);
/* harmony import */ var js_base64__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(222);


































































































const ToolbarStateContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createContext(null);
function useToolbarState() {
  const toolbarState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ToolbarStateContext);
  if (!toolbarState) {
    throw new Error('ToolbarStateProvider must be used to use useToolbarState');
  }
  return toolbarState;
}
const createToolbarState = (editor, componentBlocks, editorDocumentFeatures) => {
  const locationDocumentFeatures = (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.g)(editor, editorDocumentFeatures, componentBlocks) || {
    kind: 'block',
    inlineMarks: 'inherit',
    documentFeatures: {
      dividers: true,
      formatting: {
        alignment: {
          center: true,
          end: true
        },
        blockTypes: {
          blockquote: true,
          code: editorDocumentFeatures.formatting.blockTypes.code
        },
        headings: editorDocumentFeatures.formatting.headings,
        listTypes: {
          ordered: true,
          unordered: true
        }
      },
      layouts: editorDocumentFeatures.layouts,
      links: true,
      images: editorDocumentFeatures.images,
      tables: true
    },
    softBreaks: true,
    componentBlocks: true
  };
  let [maybeCodeBlockEntry] = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.nodes(editor, {
    match: node => node.type !== 'code' && (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i)(node)
  });
  const editorMarks = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.marks(editor) || {};
  const marks = Object.fromEntries(_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.d.map(mark => [mark, {
    isDisabled: locationDocumentFeatures.inlineMarks !== 'inherit' && !locationDocumentFeatures.inlineMarks[mark] || !maybeCodeBlockEntry,
    isSelected: !!editorMarks[mark]
  }]));

  // Editor.marks is "what are the marks that would be applied if text was inserted now"
  // that's not really the UX we want, if we have some a document like this
  // <paragraph>
  //   <text>
  //     <anchor />
  //     content
  //   </text>
  //   <text bold>bold</text>
  //   <text>
  //     content
  //     <focus />
  //   </text>
  // </paragraph>

  // we want bold to be shown as selected even though if you inserted text from that selection, it wouldn't be bold
  // so we look at all the text nodes in the selection to get their marks
  // but only if the selection is expanded because if you're in the middle of some text
  // with your selection collapsed with a mark but you've removed it(i.e. editor.removeMark)
  // the text nodes you're in will have the mark but the ui should show the mark as not being selected
  if (editor.selection && slate__WEBPACK_IMPORTED_MODULE_86__.Range.isExpanded(editor.selection)) {
    for (const node of slate__WEBPACK_IMPORTED_MODULE_86__.Editor.nodes(editor, {
      match: slate__WEBPACK_IMPORTED_MODULE_86__.Text.isText
    })) {
      for (const key of Object.keys(node[0])) {
        if (key === 'insertMenu' || key === 'text') {
          continue;
        }
        if (key in marks) {
          marks[key].isSelected = true;
        }
      }
    }
  }
  let [headingEntry] = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.nodes(editor, {
    match: (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.n)('heading')
  });
  let [listEntry] = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.nodes(editor, {
    match: _index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.a
  });
  let [alignableEntry] = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.nodes(editor, {
    match: (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.n)('paragraph', 'heading')
  });

  // (we're gonna use markdown here because the equivelant slate structure is quite large and doesn't add value here)
  // let's imagine a document that looks like this:
  // - thing
  //   1. something<cursor />
  // in the toolbar, you don't want to see that both ordered and unordered lists are selected
  // you want to see only ordered list selected, because
  // - you want to know what list you're actually in, you don't really care about the outer list
  // - when you want to change the list to a unordered list, the unordered list button should be inactive to show you can change to it
  const listTypeAbove = getListTypeAbove(editor);
  return {
    marks,
    textStyles: {
      selected: headingEntry ? headingEntry[0].level : 'normal',
      allowedHeadingLevels: locationDocumentFeatures.kind === 'block' && !listEntry ? locationDocumentFeatures.documentFeatures.formatting.headings.levels : []
    },
    code: {
      isSelected: (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.f)(editor, 'code'),
      isDisabled: !(locationDocumentFeatures.kind === 'block' && locationDocumentFeatures.documentFeatures.formatting.blockTypes.code)
    },
    lists: {
      ordered: {
        isSelected: (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.f)(editor, 'ordered-list') && (listTypeAbove === 'none' || listTypeAbove === 'ordered-list'),
        isDisabled: !(locationDocumentFeatures.kind === 'block' && locationDocumentFeatures.documentFeatures.formatting.listTypes.ordered && !headingEntry)
      },
      unordered: {
        isSelected: (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.f)(editor, 'unordered-list') && (listTypeAbove === 'none' || listTypeAbove === 'unordered-list'),
        isDisabled: !(locationDocumentFeatures.kind === 'block' && locationDocumentFeatures.documentFeatures.formatting.listTypes.unordered && !headingEntry)
      }
    },
    alignment: {
      isDisabled: !alignableEntry && !(locationDocumentFeatures.kind === 'block' && locationDocumentFeatures.documentFeatures.formatting.alignment),
      selected: (alignableEntry === null || alignableEntry === void 0 ? void 0 : alignableEntry[0].textAlign) || 'start'
    },
    blockquote: {
      isDisabled: !(locationDocumentFeatures.kind === 'block' && locationDocumentFeatures.documentFeatures.formatting.blockTypes.blockquote),
      isSelected: (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.f)(editor, 'blockquote')
    },
    layouts: {
      isSelected: (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.f)(editor, 'layout')
    },
    links: {
      isDisabled: !editor.selection || slate__WEBPACK_IMPORTED_MODULE_86__.Range.isCollapsed(editor.selection) || !locationDocumentFeatures.documentFeatures.links,
      isSelected: (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.f)(editor, 'link')
    },
    editor,
    dividers: {
      isDisabled: locationDocumentFeatures.kind === 'inline' || !locationDocumentFeatures.documentFeatures.dividers
    },
    clearFormatting: {
      isDisabled: !(Object.values(marks).some(x => x.isSelected) || !!hasBlockThatClearsOnClearFormatting(editor))
    },
    editorDocumentFeatures
  };
};
function hasBlockThatClearsOnClearFormatting(editor) {
  const [node] = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.nodes(editor, {
    match: node => node.type === 'heading' || node.type === 'code' || node.type === 'blockquote'
  });
  return !!node;
}
function getListTypeAbove(editor) {
  const listAbove = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
    match: _index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.a
  });
  if (!listAbove) {
    return 'none';
  }
  return listAbove[0].type;
}
const DocumentEditorConfigContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
function useDocumentEditorConfig() {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(DocumentEditorConfigContext);
  if (!context) {
    throw new Error('useDocumentEditorConfig must be used within a DocumentEditorConfigContext.Provider');
  }
  return context;
}
const ToolbarStateProvider = _ref => {
  let {
    children,
    componentBlocks,
    editorDocumentFeatures
  } = _ref;
  const editor = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSlate */ .ui)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(DocumentEditorConfigContext.Provider, {
    value: (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => ({
      componentBlocks,
      documentFeatures: editorDocumentFeatures
    }), [componentBlocks, editorDocumentFeatures]),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ToolbarStateContext.Provider, {
      value: createToolbarState(editor, componentBlocks, editorDocumentFeatures),
      children: children
    })
  });
};

const isLinkActive = editor => {
  return (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.f)(editor, 'link');
};
const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unwrapNodes(editor, {
      match: n => n.type === 'link'
    });
    return;
  }
  const {
    selection
  } = editor;
  const isCollapsed = selection && slate__WEBPACK_IMPORTED_MODULE_86__.Range.isCollapsed(selection);
  if (isCollapsed) {
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.insertNodes(editor, {
      type: 'link',
      href: url,
      children: [{
        text: url
      }]
    });
  } else {
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.wrapNodes(editor, {
      type: 'link',
      href: url,
      children: [{
        text: ''
      }]
    }, {
      split: true
    });
  }
};
const LinkElement = _ref => {
  let {
    attributes,
    children,
    element: __elementForGettingPath
  } = _ref;
  const stringFormatter = (0,_react_aria_i18n__WEBPACK_IMPORTED_MODULE_88__/* .useLocalizedStringFormatter */ .qb)(_index_b8966079_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_16__.l);
  const editor = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSlateStatic */ ._7)();
  const [currentElement, setNode] = (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.a)(editor, __elementForGettingPath);
  const href = currentElement.href;
  const text = slate__WEBPACK_IMPORTED_MODULE_86__.Node.string(currentElement);
  const [dialogOpen, setDialogOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const activePopoverElement = (0,_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.useActiveBlockPopover)();
  const selected = activePopoverElement === __elementForGettingPath;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (selected && !href) {
      setDialogOpen(true);
    }
  }, [href, selected]);
  const unlink = (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.u)(() => {
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unwrapNodes(editor, {
      at: slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, __elementForGettingPath)
    });
    slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.focus(editor);
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.BlockPopoverTrigger, {
      element: __elementForGettingPath,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("a", {
        href: href,
        ...attributes,
        children: children
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.BlockPopover, {
        placement: "bottom start",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
          gap: "small",
          padding: "regular",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
              prominence: "low",
              onPress: () => setDialogOpen(true),
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
                src: _keystar_ui_icon_icons_editIcon__WEBPACK_IMPORTED_MODULE_8__/* .editIcon */ .g
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
              children: stringFormatter.format('edit')
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
              prominence: "low",
              onPress: () => {
                window.open(href, '_blank', 'noopener,noreferrer');
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
                src: _keystar_ui_icon_icons_externalLinkIcon__WEBPACK_IMPORTED_MODULE_9__/* .externalLinkIcon */ .K
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Text, {
                truncate: 3,
                children: href
              })
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
              prominence: "low",
              onPress: unlink,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
                src: _keystar_ui_icon_icons_unlinkIcon__WEBPACK_IMPORTED_MODULE_11__/* .unlinkIcon */ .s
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
              children: "Unlink"
            })]
          })]
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_6__/* .DialogContainer */ .TW, {
      onDismiss: () => {
        setDialogOpen(false);
        (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.f)(editor);
      },
      children: dialogOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(LinkDialog, {
        text: text,
        href: href,
        onSubmit: _ref2 => {
          let {
            href
          } = _ref2;
          setNode({
            href
          });
        }
      })
    })]
  });
};
function LinkDialog(_ref3) {
  let {
    onSubmit,
    ...props
  } = _ref3;
  let [href, setHref] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(props.href || '');
  let [touched, setTouched] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  let {
    dismiss
  } = (0,_keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_6__/* .useDialogContainer */ .SN)();
  let stringFormatter = (0,_react_aria_i18n__WEBPACK_IMPORTED_MODULE_88__/* .useLocalizedStringFormatter */ .qb)(_index_b8966079_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_16__.l);
  const showInvalidState = touched && !(0,_isValidURL_02af2848_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_21__.i)(href);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_6__/* .Dialog */ .Vq, {
    size: "small",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)("form", {
      style: {
        display: 'contents'
      },
      onSubmit: event => {
        if (event.target !== event.currentTarget) return;
        event.preventDefault();
        if (!showInvalidState) {
          dismiss();
          onSubmit({
            href
          });
        }
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Heading, {
        children: [props.href ? 'Edit' : 'Add', " link"]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_slots__WEBPACK_IMPORTED_MODULE_12__/* .Content */ .VY, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
          gap: "large",
          direction: "column",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_text_field__WEBPACK_IMPORTED_MODULE_13__/* .TextField */ .nv, {
            label: "Text",
            value: props.text,
            isReadOnly: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_text_field__WEBPACK_IMPORTED_MODULE_13__/* .TextField */ .nv, {
            autoFocus: true,
            isRequired: true,
            onBlur: () => setTouched(true),
            label: "Link",
            onChange: setHref,
            value: href,
            errorMessage: showInvalidState && 'Please provide a valid URL.'
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ButtonGroup */ .hE, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .zx, {
          onPress: dismiss,
          children: stringFormatter.format('cancel')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .zx, {
          prominence: "high",
          type: "submit",
          children: stringFormatter.format('save')
        })]
      })]
    })
  });
}
let _linkIcon = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
  src: _keystar_ui_icon_icons_linkIcon__WEBPACK_IMPORTED_MODULE_10__/* .linkIcon */ .N
});
function LinkButton() {
  const {
    editor,
    links: {
      isDisabled,
      isSelected
    }
  } = useToolbarState();
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
    prominence: "low",
    isDisabled: isDisabled,
    isSelected: isSelected,
    onPress: () => {
      wrapLink(editor, '');
      slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.focus(editor);
    },
    children: _linkIcon
  }), [isSelected, isDisabled, editor]);
}
const linkButton = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(LinkButton, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Text, {
      children: "Link"
    })
  })]
});

const values = {
  start: {
    key: 'start',
    label: 'Align Start',
    icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
      src: _keystar_ui_icon_icons_alignLeftIcon__WEBPACK_IMPORTED_MODULE_39__/* .alignLeftIcon */ .$
    })
  },
  center: {
    key: 'center',
    label: 'Align Center',
    icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
      src: _keystar_ui_icon_icons_alignCenterIcon__WEBPACK_IMPORTED_MODULE_41__/* .alignCenterIcon */ .L
    })
  },
  end: {
    key: 'end',
    label: 'Align End',
    icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
      src: _keystar_ui_icon_icons_alignRightIcon__WEBPACK_IMPORTED_MODULE_40__/* .alignRightIcon */ .g
    })
  }
};
const TextAlignMenu = _ref => {
  let {
    alignment
  } = _ref;
  const toolbarState = useToolbarState();
  const items = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => [values.start, ...Object.keys(alignment).map(x => values[x])], [alignment]);
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_menu__WEBPACK_IMPORTED_MODULE_37__/* .MenuTrigger */ .bF, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
        prominence: "low",
        children: [values[toolbarState.alignment.selected].icon, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
          src: _keystar_ui_icon_icons_chevronDownIcon__WEBPACK_IMPORTED_MODULE_25__/* .chevronDownIcon */ .i
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Text, {
          children: "Text Alignment"
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_menu__WEBPACK_IMPORTED_MODULE_37__/* .Menu */ .v2, {
      selectionMode: "single",
      selectedKeys: [toolbarState.alignment.selected],
      items: items,
      onAction: key => {
        if (key === 'start') {
          slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unsetNodes(toolbarState.editor, 'textAlign', {
            match: node => node.type === 'paragraph' || node.type === 'heading'
          });
        } else {
          slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.setNodes(toolbarState.editor, {
            textAlign: key
          }, {
            match: node => node.type === 'paragraph' || node.type === 'heading'
          });
        }
        slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.focus(toolbarState.editor);
      },
      children: item => {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_action_group__WEBPACK_IMPORTED_MODULE_23__/* .Item */ .c, {
          textValue: item.label,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Text, {
            children: item.label
          }), item.icon]
        }, item.key);
      }
    })]
  }), [items, toolbarState.alignment.selected, toolbarState.editor]);
};

const insertBlockquote = editor => {
  const isActive = (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.f)(editor, 'blockquote');
  if (isActive) {
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unwrapNodes(editor, {
      match: node => node.type === 'blockquote'
    });
  } else {
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.wrapNodes(editor, {
      type: 'blockquote',
      children: []
    });
  }
};
const BlockquoteElement = _ref => {
  let {
    attributes,
    children
  } = _ref;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Box */ .xu, {
    UNSAFE_className: _ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.b,
    borderColor: "neutral",
    marginX: 0,
    paddingX: "large",
    borderStartStyle: "solid",
    borderStartWidth: "large",
    ...attributes,
    children: children
  });
};
const BlockquoteButton = () => {
  const {
    editor,
    blockquote: {
      isDisabled,
      isSelected
    }
  } = useToolbarState();
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
    prominence: "low",
    isSelected: isSelected,
    isDisabled: isDisabled,
    onPress: () => {
      insertBlockquote(editor);
      slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.focus(editor);
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
      src: _keystar_ui_icon_icons_quoteIcon__WEBPACK_IMPORTED_MODULE_42__/* .quoteIcon */ .O
    })
  }), [editor, isDisabled, isSelected]);
};
const blockquoteButton = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(BlockquoteButton, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Text, {
      children: "Quote"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Kbd, {
      children: '>⎵'
    })]
  })]
});

function CustomAttributesDialogInner(props) {
  const editor = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSlateStatic */ ._7)();
  const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(() => {
    return (0,_initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_49__.b)(props.schema, Object.fromEntries(Object.keys(props.schema.fields).map(key => [key, props.element[key]])));
  });
  const [forceValidation, setForceValidation] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const previewProps = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => (0,_form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_47__.c)(props.schema, setState, () => undefined), [props.schema])(state);
  let {
    dismiss
  } = (0,_keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_6__/* .useDialogContainer */ .SN)();
  const stringFormatter = (0,_react_aria_i18n__WEBPACK_IMPORTED_MODULE_88__/* .useLocalizedStringFormatter */ .qb)(_index_b8966079_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_16__.l);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_6__/* .Dialog */ .Vq, {
    size: "small",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)("form", {
      style: {
        display: 'contents'
      },
      onSubmit: event => {
        if (event.target !== event.currentTarget) return;
        event.preventDefault();
        setForceValidation(true);
        if ((0,_errors_f334cbf7_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_48__.c)(props.schema, state, undefined)) {
          dismiss();
          const path = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, props.element);
          console.log(state);
          slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.setNodes(editor, state, {
            at: path
          });
        }
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Heading, {
        children: [props.nodeLabel, " details"]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_slots__WEBPACK_IMPORTED_MODULE_12__/* .Content */ .VY, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_47__.F, {
          forceValidation: forceValidation,
          autoFocus: true,
          ...previewProps
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ButtonGroup */ .hE, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .zx, {
          onPress: dismiss,
          children: stringFormatter.format('cancel')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .zx, {
          prominence: "high",
          type: "submit",
          children: stringFormatter.format('save')
        })]
      })]
    })
  });
}
function CustomAttributesEditButton(props) {
  const stringFormatter = (0,_react_aria_i18n__WEBPACK_IMPORTED_MODULE_88__/* .useLocalizedStringFormatter */ .qb)(_index_b8966079_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_16__.l);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
      prominence: "low",
      onPress: props.onPress,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
        src: _keystar_ui_icon_icons_editIcon__WEBPACK_IMPORTED_MODULE_8__/* .editIcon */ .g
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
      children: stringFormatter.format('edit')
    })]
  });
}
function CustomAttributesDialog(props) {
  const editor = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSlateStatic */ ._7)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_6__/* .DialogContainer */ .TW, {
    onDismiss: () => {
      props.onDismiss();
      (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.f)(editor);
    },
    children: props.isOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(CustomAttributesDialogInner, {
      element: props.element,
      nodeLabel: props.nodeLabel,
      schema: props.schema
    })
  });
}

function CodeButton() {
  const {
    editor,
    code: {
      isDisabled,
      isSelected
    }
  } = useToolbarState();
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
    isSelected: isSelected,
    isDisabled: isDisabled,
    prominence: "low",
    onPress: () => {
      if (isSelected) {
        slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unwrapNodes(editor, {
          match: node => node.type === 'code'
        });
      } else {
        slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.wrapNodes(editor, {
          type: 'code',
          children: [{
            text: ''
          }]
        });
      }
      slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.focus(editor);
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
      src: _keystar_ui_icon_icons_codeIcon__WEBPACK_IMPORTED_MODULE_26__/* .codeIcon */ .z
    })
  }), [isDisabled, isSelected, editor]);
}
const codeButton = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(CodeButton, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Text, {
      children: "Code block"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Kbd, {
      children: "```"
    })]
  })]
});
function CodeElement(_ref) {
  var _aliasesToLabel$get;
  let {
    attributes,
    children,
    element
  } = _ref;
  const editor = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSlateStatic */ ._7)();
  const triggerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const [inputValue, setInputValue] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(element.language ? (_aliasesToLabel$get = _languages_14058067_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_46__.b.get(element.language)) !== null && _aliasesToLabel$get !== void 0 ? _aliasesToLabel$get : element.language : 'Plain text');
  const [dialogOpen, setDialogOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    documentFeatures
  } = useDocumentEditorConfig();
  const customAttributesSchema = documentFeatures.formatting.blockTypes.code && Object.keys(documentFeatures.formatting.blockTypes.code.schema.fields).length ? documentFeatures.formatting.blockTypes.code.schema : undefined;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.BlockWrapper, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.BlockPopoverTrigger, {
        element: element,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("pre", {
          spellCheck: "false",
          className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
            backgroundColor: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.background.surface,
            borderRadius: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.size.radius.medium,
            color: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.foreground.neutralEmphasis,
            fontFamily: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.typography.fontFamily.code,
            fontSize: '0.85em',
            lineHeight: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.typography.lineheight.medium,
            maxWidth: '100%',
            overflow: 'auto',
            padding: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.size.space.medium,
            code: {
              fontFamily: 'inherit'
            }
          }),
          ref: triggerRef,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("code", {
            ...attributes,
            children: children
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.BlockPopover, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
            gap: "regular",
            padding: "regular",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_combobox__WEBPACK_IMPORTED_MODULE_44__/* .Combobox */ .hQ, {
              "aria-label": "Language",
              width: "scale.2000",
              allowsCustomValue: true // allow consumers to support other languages
              ,
              inputValue: inputValue,
              onInputChange: setInputValue,
              onBlur: () => {
                const path = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, element);
                const canonicalName = _languages_14058067_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_46__.a.get(inputValue);
                if (canonicalName !== undefined) {
                  if (canonicalName === 'plain') {
                    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unsetNodes(editor, 'language', {
                      at: path
                    });
                    return;
                  }
                  setInputValue(_languages_14058067_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_46__.c.get(canonicalName));
                  slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.setNodes(editor, {
                    language: canonicalName
                  }, {
                    at: path
                  });
                  return;
                }
                const nameFromLabel = _languages_14058067_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_46__.l.get(inputValue);
                if (nameFromLabel !== undefined) {
                  if (nameFromLabel === 'plain') {
                    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unsetNodes(editor, 'language', {
                      at: path
                    });
                    return;
                  }
                  slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.setNodes(editor, {
                    language: nameFromLabel
                  }, {
                    at: path
                  });
                  return;
                }
                if (inputValue === '') {
                  slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unsetNodes(editor, 'language', {
                    at: path
                  });
                  setInputValue('Plain text');
                  return;
                }
                if (inputValue !== element.language) {
                  slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.setNodes(editor, {
                    language: inputValue
                  }, {
                    at: path
                  });
                }
              },
              onSelectionChange: selection => {
                const path = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, element);
                if (_languages_14058067_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_46__.a.has(inputValue)) {
                  selection = _languages_14058067_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_46__.a.get(inputValue);
                }
                if (selection === null) {
                  if (inputValue === '') {
                    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unsetNodes(editor, 'language', {
                      at: path
                    });
                  } else {
                    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.setNodes(editor, {
                      language: inputValue
                    }, {
                      at: path
                    });
                  }
                } else if (typeof selection === 'string') {
                  if (selection === 'plain') {
                    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unsetNodes(editor, 'language', {
                      at: path
                    });
                    setInputValue('Plain text');
                    return;
                  }
                  slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.setNodes(editor, {
                    language: selection
                  }, {
                    at: path
                  });
                  const label = _languages_14058067_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_46__.c.get(selection);
                  if (label) {
                    setInputValue(label);
                  }
                }
              },
              selectedKey: element.language ? _languages_14058067_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_46__.a.get(element.language) : 'plain',
              items: (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => inputValue === 'Plain text' || _languages_14058067_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_46__.l.has(inputValue) ? _languages_14058067_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_46__.d : (0,match_sorter__WEBPACK_IMPORTED_MODULE_43__/* .matchSorter */ .Lu)(_languages_14058067_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_46__.d, inputValue, {
                keys: ['label', 'value', 'aliases']
              }), [inputValue]),
              children: item => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_89__/* .Item */ .ck, {
                children: item.label
              }, item.value)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.ToolbarSeparator, {}), customAttributesSchema !== undefined && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(CustomAttributesEditButton, {
              onPress: () => setDialogOpen(true)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
                prominence: "low",
                onPress: () => {
                  slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.removeNodes(editor, {
                    at: slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, element)
                  });
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
                  src: _keystar_ui_icon_icons_trash2Icon__WEBPACK_IMPORTED_MODULE_45__/* .trash2Icon */ .S
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
                tone: "critical",
                children: "Remove"
              })]
            })]
          })
        })]
      })
    }), customAttributesSchema !== undefined && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(CustomAttributesDialog, {
      element: element,
      isOpen: dialogOpen,
      nodeLabel: "Code block",
      schema: customAttributesSchema,
      onDismiss: () => {
        setDialogOpen(false);
      }
    })]
  });
}

function updateComponentBlockElementProps(editor, componentBlock, prevProps, newProps, basePath, setElement) {
  slate__WEBPACK_IMPORTED_MODULE_86__.Editor.withoutNormalizing(editor, () => {
    setElement({
      props: newProps
    });
    const childPropPaths = findChildPropPathsWithPrevious(newProps, prevProps, {
      kind: 'object',
      fields: componentBlock.schema
    }, [], [], []);
    const getNode = () => slate__WEBPACK_IMPORTED_MODULE_86__.Node.get(editor, basePath);
    const elementForChildren = getNode();
    if (childPropPaths.length === 0) {
      const indexes = elementForChildren.children.map((_, i) => i).reverse();
      for (const idx of indexes) {
        slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.removeNodes(editor, {
          at: [...basePath, idx]
        });
      }
      slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.insertNodes(editor, {
        type: 'component-inline-prop',
        propPath: undefined,
        children: [{
          text: ''
        }]
      }, {
        at: [...basePath, 0]
      });
      return;
    }
    const initialPropPathsToEditorPath = new Map();
    for (const [idx, node] of elementForChildren.children.entries()) {
      (0,emery__WEBPACK_IMPORTED_MODULE_50__.assert)(node.type === 'component-block-prop' || node.type === 'component-inline-prop');
      initialPropPathsToEditorPath.set(node.propPath === undefined ? undefined : JSON.stringify(node.propPath), idx);
    }
    const childrenLeftToAdd = new Set(childPropPaths);
    for (const childProp of childPropPaths) {
      if (childProp.prevPath === undefined) {
        continue;
      }
      const stringifiedPath = JSON.stringify(childProp.prevPath);
      const idxInChildren = initialPropPathsToEditorPath.get(stringifiedPath);
      if (idxInChildren !== undefined) {
        const prevNode = elementForChildren.children[idxInChildren];
        (0,emery__WEBPACK_IMPORTED_MODULE_50__.assert)(prevNode.propPath !== undefined);
        if (!(0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.b)(childProp.path, prevNode.propPath)) {
          slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.setNodes(editor, {
            propPath: childProp.path
          }, {
            at: [...basePath, idxInChildren]
          });
        }
        childrenLeftToAdd.delete(childProp);
        initialPropPathsToEditorPath.delete(stringifiedPath);
      }
    }
    let newIdx = getNode().children.length;
    for (const childProp of childrenLeftToAdd) {
      slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.insertNodes(editor, {
        type: `component-${childProp.options.kind}-prop`,
        propPath: childProp.path,
        children: [childProp.options.kind === 'block' ? {
          type: 'paragraph',
          children: [{
            text: ''
          }]
        } : {
          text: ''
        }]
      }, {
        at: [...basePath, newIdx]
      });
      newIdx++;
    }
    const pathsToRemove = [];
    for (const [, idxInChildren] of initialPropPathsToEditorPath) {
      pathsToRemove.push(slate__WEBPACK_IMPORTED_MODULE_86__.Editor.pathRef(editor, [...basePath, idxInChildren]));
    }
    for (const pathRef of pathsToRemove) {
      const path = pathRef.unref();
      (0,emery__WEBPACK_IMPORTED_MODULE_50__.assert)(path !== null);
      slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.removeNodes(editor, {
        at: path
      });
    }
    const propPathsToExpectedIndexes = new Map();
    for (const [idx, thing] of childPropPaths.entries()) {
      propPathsToExpectedIndexes.set(JSON.stringify(thing.path), idx);
    }
    outer: while (true) {
      for (const [idx, childNode] of getNode().children.entries()) {
        (0,emery__WEBPACK_IMPORTED_MODULE_50__.assert)(childNode.type === 'component-block-prop' || childNode.type === 'component-inline-prop');
        const expectedIndex = propPathsToExpectedIndexes.get(JSON.stringify(childNode.propPath));
        (0,emery__WEBPACK_IMPORTED_MODULE_50__.assert)(expectedIndex !== undefined);
        if (idx === expectedIndex) continue;
        slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.moveNodes(editor, {
          at: [...basePath, idx],
          to: [...basePath, expectedIndex]
        });

        // start the for-loop again
        continue outer;
      }
      break;
    }
  });
}
function findChildPropPathsWithPrevious(value, prevValue, schema, newPath, prevPath, pathWithKeys) {
  switch (schema.kind) {
    case 'form':
      return [];
    case 'child':
      return [{
        path: newPath,
        prevPath,
        options: schema.options
      }];
    case 'conditional':
      const hasChangedDiscriminant = value.discriminant === prevValue.discriminant;
      return findChildPropPathsWithPrevious(value.value, hasChangedDiscriminant ? prevValue.value : (0,_initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_49__.g)(schema.values[value.discriminant]), schema.values[value.discriminant], newPath.concat('value'), hasChangedDiscriminant ? undefined : prevPath === null || prevPath === void 0 ? void 0 : prevPath.concat('value'), hasChangedDiscriminant ? undefined : pathWithKeys === null || pathWithKeys === void 0 ? void 0 : pathWithKeys.concat('value'));
    case 'object':
      {
        const paths = [];
        for (const key of Object.keys(schema.fields)) {
          paths.push(...findChildPropPathsWithPrevious(value[key], prevValue[key], schema.fields[key], newPath.concat(key), prevPath === null || prevPath === void 0 ? void 0 : prevPath.concat(key), pathWithKeys === null || pathWithKeys === void 0 ? void 0 : pathWithKeys.concat(key)));
        }
        return paths;
      }
    case 'array':
      {
        const paths = [];
        const prevKeys = (0,_initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_49__.a)(prevValue);
        const keys = (0,_initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_49__.a)(value);
        for (const [i, val] of value.entries()) {
          const key = keys[i];
          const prevIdx = prevKeys.indexOf(key);
          let prevVal;
          if (prevIdx === -1) {
            prevVal = (0,_initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_49__.g)(schema.element);
          } else {
            prevVal = prevValue[prevIdx];
          }
          paths.push(...findChildPropPathsWithPrevious(val, prevVal, schema.element, newPath.concat(i), prevIdx === -1 ? undefined : prevPath === null || prevPath === void 0 ? void 0 : prevPath.concat(prevIdx), prevIdx === -1 ? undefined : pathWithKeys === null || pathWithKeys === void 0 ? void 0 : pathWithKeys.concat(key)));
        }
        return paths;
      }
  }
}

const ChildrenByPathContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createContext({});
function ChildFieldEditable(_ref) {
  let {
    path
  } = _ref;
  const childrenByPath = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(ChildrenByPathContext);
  const child = childrenByPath[JSON.stringify(path)];
  if (child === undefined) {
    return null;
  }
  return child;
}
function ComponentBlockRender(_ref2) {
  let {
    componentBlock,
    element,
    onChange,
    children
  } = _ref2;
  const getPreviewProps = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    return (0,_form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_47__.c)({
      kind: 'object',
      fields: componentBlock.schema
    }, onChange, path => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ChildFieldEditable, {
      path: path
    }));
  }, [onChange, componentBlock]);
  const previewProps = getPreviewProps(element.props);
  const childrenByPath = {};
  let maybeChild;
  children.forEach(child => {
    const propPath = child.props.children.props.element.propPath;
    if (propPath === undefined) {
      maybeChild = child;
    } else {
      childrenByPath[JSON.stringify(propPathWithIndiciesToKeys(propPath, element.props))] = child;
    }
  });
  const ComponentBlockPreview = componentBlock.preview;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(ChildrenByPathContext.Provider, {
    value: childrenByPath,
    children: [(0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ComponentBlockPreview, {
      ...previewProps
    }), [previewProps, ComponentBlockPreview]), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("span", {
      className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
        caretColor: 'transparent',
        '& ::selection': {
          backgroundColor: 'transparent'
        }
      }),
      children: maybeChild
    })]
  });
}

// note this is written to avoid crashing when the given prop path doesn't exist in the value
// this is because editor updates happen asynchronously but we have some logic to ensure
// that updating the props of a component block synchronously updates it
// (this is primarily to not mess up things like cursors in inputs)
// this means that sometimes the child elements will be inconsistent with the values
// so to deal with this, we return a prop path this is "wrong" but won't break anything
function propPathWithIndiciesToKeys(propPath, val) {
  return propPath.map(key => {
    var _val2;
    if (typeof key === 'string') {
      var _val;
      val = (_val = val) === null || _val === void 0 ? void 0 : _val[key];
      return key;
    }
    if (!Array.isArray(val)) {
      val = undefined;
      return '';
    }
    const keys = (0,_initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_49__.a)(val);
    val = (_val2 = val) === null || _val2 === void 0 ? void 0 : _val2[key];
    return keys[key];
  });
}

function ChromefulComponentBlockElement(props) {
  var _props$componentBlock;
  const selected = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSelected */ .vt)();
  const isValid = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => (0,_errors_f334cbf7_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_48__.c)({
    kind: 'object',
    fields: props.componentBlock.schema
  }, props.elementProps, undefined), [props.componentBlock, props.elementProps]);
  const [editMode, setEditMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const onCloseEditMode = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    setEditMode(false);
  }, []);
  const onShowEditMode = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
    setEditMode(true);
  }, []);
  const ChromefulToolbar = (_props$componentBlock = props.componentBlock.toolbar) !== null && _props$componentBlock !== void 0 ? _props$componentBlock : DefaultToolbarWithChrome;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(BlockPrimitive, {
    selected: selected,
    ...props.attributes,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
      gap: "medium",
      direction: "column",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.NotEditable, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Text, {
          casing: "uppercase",
          color: "neutralSecondary",
          weight: "medium",
          size: "small",
          children: props.componentBlock.label
        })
      }), editMode ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(FormValue, {
          isValid: isValid,
          props: props.previewProps,
          onClose: onCloseEditMode
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div", {
          className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
            display: 'none'
          }),
          children: props.children
        })]
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
        children: [props.renderedBlock, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ChromefulToolbar, {
          isValid: isValid,
          onRemove: props.onRemove,
          onShowEditMode: onShowEditMode,
          props: props.previewProps
        })]
      })]
    })
  });
}

/**
 * Wrap block content, delimiting it from surrounding content, and provide a
 * focus indicator because the cursor may not be present.
 */
const BlockPrimitive = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function BlockPrimitive(_ref, ref) {
  let {
    children,
    selected,
    ...attributes
  } = _ref;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div", {
    ...attributes,
    ref: ref,
    className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)(_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.b, {
      position: 'relative',
      paddingInlineStart: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.size.space.xlarge,
      '::before': {
        display: 'block',
        content: '" "',
        backgroundColor: selected ? _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.alias.borderSelected : _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.alias.borderIdle,
        borderRadius: 4,
        width: 4,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1
      }
    }),
    children: children
  });
});
function DefaultToolbarWithChrome(_ref2) {
  let {
    onShowEditMode,
    onRemove,
    isValid
  } = _ref2;
  const stringFormatter = (0,_react_aria_i18n__WEBPACK_IMPORTED_MODULE_88__/* .useLocalizedStringFormatter */ .qb)(_index_b8966079_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_16__.l);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.NotEditable, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
      direction: "column",
      gap: "medium",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
        alignItems: "center",
        gap: "regular",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
          onPress: () => onShowEditMode(),
          children: stringFormatter.format('edit')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
            prominence: "low",
            onPress: onRemove,
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
              src: _keystar_ui_icon_icons_trash2Icon__WEBPACK_IMPORTED_MODULE_45__/* .trash2Icon */ .S
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
            tone: "critical",
            children: stringFormatter.format('delete')
          })]
        })]
      }), !isValid && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_field__WEBPACK_IMPORTED_MODULE_51__/* .FieldMessage */ .nd, {
        children: "Contains invalid fields. Please edit."
      })]
    })
  });
}
function FormValue(_ref3) {
  let {
    onClose,
    props,
    isValid
  } = _ref3;
  const [forceValidation, setForceValidation] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
    direction: "column",
    gap: "medium",
    contentEditable: false,
    UNSAFE_className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
      whiteSpace: 'initial'
    }),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_47__.F, {
      ...props,
      forceValidation: forceValidation
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .zx, {
      alignSelf: "start",
      tone: "accent",
      onPress: () => {
        if (isValid) {
          onClose();
        } else {
          setForceValidation(true);
        }
      },
      children: "Done"
    })]
  });
}

function ChromelessComponentBlockElement(props) {
  var _props$componentBlock;
  const ChromelessToolbar = (_props$componentBlock = props.componentBlock.toolbar) !== null && _props$componentBlock !== void 0 ? _props$componentBlock : DefaultToolbarWithoutChrome;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div", {
    ...props.attributes,
    className: _ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.b,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.BlockPopoverTrigger, {
      element: props.element,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div", {
        children: props.renderedBlock
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.BlockPopover, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ChromelessToolbar, {
          onRemove: props.onRemove,
          props: props.previewProps
        })
      })]
    })
  });
}
function DefaultToolbarWithoutChrome(_ref) {
  let {
    onRemove
  } = _ref;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
      onPress: onRemove,
      margin: "regular",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
        src: _keystar_ui_icon_icons_trashIcon__WEBPACK_IMPORTED_MODULE_52__/* .trashIcon */ .y
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
      tone: "critical",
      children: "Remove"
    })]
  });
}

function ComponentInlineProp(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("span", {
    ...props.attributes,
    children: props.children
  });
}
function getInitialValue(type, componentBlock) {
  const props = (0,_initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_49__.g)({
    kind: 'object',
    fields: componentBlock.schema
  });
  return {
    type: 'component-block',
    component: type,
    props,
    children: (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.f)(props, componentBlock.schema).map(x => ({
      type: `component-${x.options.kind}-prop`,
      propPath: x.path,
      children: [x.options.kind === 'block' ? {
        type: 'paragraph',
        children: [{
          text: ''
        }]
      } : {
        text: ''
      }]
    }))
  };
}
function insertComponentBlock(editor, componentBlocks, componentBlock) {
  const node = getInitialValue(componentBlock, componentBlocks[componentBlock]);
  (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.i)(editor, node);
  const componentBlockEntry = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
    match: node => node.type === 'component-block'
  });
  if (componentBlockEntry) {
    const start = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.start(editor, componentBlockEntry[1]);
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.setSelection(editor, {
      anchor: start,
      focus: start
    });
  }
}
const ComponentBlocksElement = _ref => {
  let {
    attributes,
    children,
    element: __elementToGetPath
  } = _ref;
  const editor = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSlateStatic */ ._7)();
  const [currentElement, setElement] = (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.a)(editor, __elementToGetPath);
  const blockComponents = useDocumentEditorConfig().componentBlocks;
  const componentBlock = blockComponents[currentElement.component];
  const elementToGetPathRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({
    __elementToGetPath,
    currentElement
  });
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    elementToGetPathRef.current = {
      __elementToGetPath,
      currentElement
    };
  });
  const onRemove = (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.u)(() => {
    const path = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, __elementToGetPath);
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.removeNodes(editor, {
      at: path
    });
  });
  const onPropsChange = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(cb => {
    const prevProps = elementToGetPathRef.current.currentElement.props;
    updateComponentBlockElementProps(editor, componentBlock, prevProps, cb(prevProps), slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, elementToGetPathRef.current.__elementToGetPath), setElement);
  }, [setElement, componentBlock, editor]);
  const getToolbarPreviewProps = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    if (!componentBlock) {
      return () => {
        throw new Error('expected component block to exist when called');
      };
    }
    return (0,_form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_47__.c)({
      kind: 'object',
      fields: componentBlock.schema
    }, onPropsChange, () => undefined);
  }, [componentBlock, onPropsChange]);
  if (!componentBlock) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)("div", {
      style: {
        border: 'red 4px solid',
        padding: 8
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("pre", {
        contentEditable: false,
        style: {
          userSelect: 'none'
        },
        children: `The block "${currentElement.component}" no longer exists.

Props:

${JSON.stringify(currentElement.props, null, 2)}

Content:`
      }), children]
    });
  }
  const toolbarPreviewProps = getToolbarPreviewProps(currentElement.props);
  const renderedBlock = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ComponentBlockRender, {
    children: children,
    componentBlock: componentBlock,
    element: currentElement,
    onChange: onPropsChange
  });
  return componentBlock.chromeless ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ChromelessComponentBlockElement, {
    element: __elementToGetPath,
    attributes: attributes,
    renderedBlock: renderedBlock,
    componentBlock: componentBlock,
    onRemove: onRemove,
    previewProps: toolbarPreviewProps
  }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ChromefulComponentBlockElement, {
    attributes: attributes,
    children: children,
    componentBlock: componentBlock,
    onRemove: onRemove,
    previewProps: toolbarPreviewProps,
    renderedBlock: renderedBlock,
    elementProps: currentElement.props
  });
};

function insertDivider(editor) {
  (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.i)(editor, {
    type: 'divider',
    children: [{
      text: ''
    }]
  });
  slate__WEBPACK_IMPORTED_MODULE_86__.Editor.insertNode(editor, {
    type: 'paragraph',
    children: [{
      text: ''
    }]
  });
}
const DividerButton = () => {
  const {
    editor,
    dividers: {
      isDisabled
    }
  } = useToolbarState();
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
    prominence: "low",
    isDisabled: isDisabled,
    onPress: () => {
      insertDivider(editor);
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
      src: _keystar_ui_icon_icons_minusIcon__WEBPACK_IMPORTED_MODULE_54__/* .minusIcon */ .$
    })
  }), [editor, isDisabled]);
};
const dividerButton = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
  delay: 200,
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(DividerButton, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Text, {
      children: "Divider"
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Kbd, {
      children: "---"
    })]
  })]
});
function DividerElement(_ref) {
  let {
    attributes,
    children
  } = _ref;
  const selected = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSelected */ .vt)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Box */ .xu, {
    ...attributes,
    paddingY: "medium",
    UNSAFE_className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
      caretColor: 'transparent'
    }),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("hr", {
      className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
        backgroundColor: selected ? _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.alias.borderSelected : _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.alias.borderIdle,
        border: 0,
        height: 2
      })
    }), children]
  });
}

const LayoutContainer = _ref => {
  let {
    attributes,
    children,
    element
  } = _ref;
  const editor = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSlateStatic */ ._7)();
  const layout = element.layout;
  const layoutOptions = useDocumentEditorConfig().documentFeatures.layouts;
  const currentLayoutIndex = layoutOptions.findIndex(x => x.toString() === layout.toString());
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div", {
    className: _ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.b,
    ...attributes,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.BlockPopoverTrigger, {
      element: element,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div", {
        className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
          columnGap: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.size.space.regular,
          display: 'grid'
        }),
        style: {
          gridTemplateColumns: layout.map(x => `${x}fr`).join(' ')
        },
        children: children
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.BlockPopover, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
          padding: "regular",
          gap: "regular",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_action_group__WEBPACK_IMPORTED_MODULE_23__/* .ActionGroup */ .W, {
            selectionMode: "single",
            prominence: "low",
            density: "compact",
            onAction: key => {
              const path = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, element);
              const layoutOption = layoutOptions[key];
              slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.setNodes(editor, {
                type: 'layout',
                layout: layoutOption
              }, {
                at: path
              });
              slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.focus(editor);
            },
            selectedKeys: currentLayoutIndex !== -1 ? [currentLayoutIndex.toString()] : [],
            children: layoutOptions.map((layoutOption, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_action_group__WEBPACK_IMPORTED_MODULE_23__/* .Item */ .c, {
              children: makeLayoutIcon(layoutOption)
            }, i))
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.ToolbarSeparator, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
              prominence: "low",
              onPress: () => {
                const path = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, element);
                slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.removeNodes(editor, {
                  at: path
                });
              },
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
                src: _keystar_ui_icon_icons_trash2Icon__WEBPACK_IMPORTED_MODULE_45__/* .trash2Icon */ .S
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
              tone: "critical",
              children: "Remove"
            })]
          })]
        })
      })]
    })
  });
};
const LayoutArea = _ref2 => {
  let {
    attributes,
    children
  } = _ref2;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div", {
    className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
      borderColor: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.border.neutral,
      borderRadius: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.size.radius.regular,
      borderStyle: 'dashed',
      borderWidth: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.size.border.regular,
      padding: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.size.space.medium
    }),
    ...attributes,
    children: children
  });
};
const insertLayout = (editor, layout) => {
  (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.i)(editor, [{
    type: 'layout',
    layout,
    children: [{
      type: 'layout-area',
      children: [{
        type: 'paragraph',
        children: [{
          text: ''
        }]
      }]
    }]
  }]);
  const layoutEntry = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
    match: x => x.type === 'layout'
  });
  if (layoutEntry) {
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.select(editor, [...layoutEntry[1], 0]);
  }
};

// Utils
// ------------------------------

function makeLayoutIcon(ratios) {
  const size = 16;
  const element = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div", {
    role: "img",
    className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
      display: 'grid',
      gridTemplateColumns: ratios.map(r => `${r}fr`).join(' '),
      gap: 2,
      width: size,
      height: size
    }),
    children: ratios.map((_, i) => {
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div", {
        className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
          backgroundColor: 'currentcolor',
          borderRadius: 1
        })
      }, i);
    })
  });
  return element;
}
const layoutsIcon = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
  src: _keystar_ui_icon_icons_columnsIcon__WEBPACK_IMPORTED_MODULE_55__/* .columnsIcon */ .b
});
const LayoutsButton = _ref3 => {
  let {
    layouts
  } = _ref3;
  const {
    editor,
    layouts: {
      isSelected
    }
  } = useToolbarState();
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
      prominence: "low",
      isSelected: isSelected,
      onPress: () => {
        if ((0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.f)(editor, 'layout')) {
          slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unwrapNodes(editor, {
            match: node => node.type === 'layout'
          });
        } else {
          insertLayout(editor, layouts[0]);
        }
        slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.focus(editor);
      },
      children: layoutsIcon
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
      children: "Layouts"
    })]
  }), [editor, isSelected, layouts]);
};

const toggleList = (editor, format) => {
  const listAbove = getListTypeAbove(editor);
  const isActive = (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.f)(editor, format) && (listAbove === 'none' || listAbove === format);
  slate__WEBPACK_IMPORTED_MODULE_86__.Editor.withoutNormalizing(editor, () => {
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unwrapNodes(editor, {
      match: _index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.a,
      split: true,
      mode: isActive ? 'all' : 'lowest'
    });
    if (!isActive) {
      slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.wrapNodes(editor, {
        type: format,
        children: []
      }, {
        match: x => x.type !== 'list-item-content' && (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i)(x)
      });
    }
  });
};
function ListButtons(props) {
  const {
    editor,
    lists
  } = useToolbarState();
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const disabledKeys = [];
    if (lists.ordered.isDisabled) disabledKeys.push('ordered');
    if (lists.unordered.isDisabled) disabledKeys.push('unordered');
    const selectedKeys = [];
    if (lists.ordered.isSelected) selectedKeys.push('ordered');
    if (lists.unordered.isSelected) selectedKeys.push('unordered');
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_action_group__WEBPACK_IMPORTED_MODULE_23__/* .ActionGroup */ .W, {
      flexShrink: 0,
      "aria-label": "Lists",
      selectionMode: "single",
      buttonLabelBehavior: "hide",
      density: "compact"
      // overflowMode="collapse"
      ,
      prominence: "low",
      summaryIcon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
        src: _keystar_ui_icon_icons_listIcon__WEBPACK_IMPORTED_MODULE_56__/* .listIcon */ .U
      }),
      selectedKeys: selectedKeys,
      disabledKeys: disabledKeys,
      onAction: key => {
        const format = `${key}-list`;
        toggleList(editor, format);
        slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.focus(editor);
      },
      children: [props.lists.unordered && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_action_group__WEBPACK_IMPORTED_MODULE_23__/* .Item */ .c, {
        textValue: "Bullet List (- )",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
          src: _keystar_ui_icon_icons_listIcon__WEBPACK_IMPORTED_MODULE_56__/* .listIcon */ .U
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Text, {
          children: "Bullet List"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Kbd, {
          children: "-\u23B5"
        })]
      }, "unordered"), props.lists.ordered && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_action_group__WEBPACK_IMPORTED_MODULE_23__/* .Item */ .c, {
        textValue: "Numbered List (1.)",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
          src: _keystar_ui_icon_icons_listOrderedIcon__WEBPACK_IMPORTED_MODULE_57__/* .listOrderedIcon */ .P
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Text, {
          children: "Numbered List"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Kbd, {
          children: "1.\u23B5"
        })]
      }, "ordered")].filter(x => x !== false)
    });
  }, [editor, lists.ordered.isDisabled, lists.ordered.isSelected, lists.unordered.isDisabled, lists.unordered.isSelected, props.lists.ordered, props.lists.unordered]);
}
function nestList(editor) {
  const block = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
    match: _utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i
  });
  if (!block || block[0].type !== 'list-item-content') {
    return false;
  }
  const listItemPath = slate__WEBPACK_IMPORTED_MODULE_86__.Path.parent(block[1]);
  // we're the first item in the list therefore we can't nest
  if (listItemPath[listItemPath.length - 1] === 0) {
    return false;
  }
  const previousListItemPath = slate__WEBPACK_IMPORTED_MODULE_86__.Path.previous(listItemPath);
  const previousListItemNode = slate__WEBPACK_IMPORTED_MODULE_86__.Node.get(editor, previousListItemPath);
  if (previousListItemNode.children.length !== 1) {
    // there's a list nested inside our previous sibling list item so move there
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.moveNodes(editor, {
      at: listItemPath,
      to: [...previousListItemPath, previousListItemNode.children.length - 1, previousListItemNode.children[previousListItemNode.children.length - 1].children.length]
    });
    return true;
  }
  const type = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.parent(editor, slate__WEBPACK_IMPORTED_MODULE_86__.Path.parent(block[1]))[0].type;
  slate__WEBPACK_IMPORTED_MODULE_86__.Editor.withoutNormalizing(editor, () => {
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.wrapNodes(editor, {
      type,
      children: []
    }, {
      at: listItemPath
    });
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.moveNodes(editor, {
      to: [...previousListItemPath, previousListItemNode.children.length],
      at: listItemPath
    });
  });
  return true;
}
function unnestList(editor) {
  const block = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
    match: _utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i
  });
  if (block && block[0].type === 'list-item-content') {
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unwrapNodes(editor, {
      match: _index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.a,
      split: true
    });
    return true;
  }
  return false;
}

const ImageElement = _ref => {
  let {
    attributes,
    children,
    element: __elementForGettingPath
  } = _ref;
  const [dialogOpen, setDialogOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const [aspectRatio, setAspectRatio] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const stringFormatter = (0,_react_aria_i18n__WEBPACK_IMPORTED_MODULE_88__/* .useLocalizedStringFormatter */ .qb)(_index_b8966079_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_16__.l);
  const editor = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSlateStatic */ ._7)();
  const [currentElement, setNode] = (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.a)(editor, __elementForGettingPath);
  const objectUrl = (0,_ui_32b334fd_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_60__.useObjectURL)(currentElement.src.content);
  const activePopoverElement = (0,_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.useActiveBlockPopover)();
  const selected = activePopoverElement === __elementForGettingPath;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.BlockWrapper, {
      attributes: attributes,
      children: [children, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.BlockPopoverTrigger, {
        element: __elementForGettingPath,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div", {
          style: {
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.NotEditable, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("img", {
              ...attributes,
              src: objectUrl,
              alt: currentElement.alt,
              "data-selected": selected,
              onLoad: e => {
                const target = e.target;
                setAspectRatio(target.width / target.height);
              },
              className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
                boxSizing: 'border-box',
                borderRadius: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.size.radius.regular,
                display: 'block',
                maxHeight: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.size.scale[3600],
                maxWidth: '100%',
                transition: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .transition */ .eR)('box-shadow'),
                '&[data-selected=true]': {
                  boxShadow: `0 0 0 ${_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.size.border.regular} ${_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.alias.borderSelected}`
                }
              })
            })
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.BlockPopover, {
          hideArrow: true,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
            gap: "regular",
            padding: "regular",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
              gap: "small",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
                  prominence: "low",
                  onPress: () => setDialogOpen(true),
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
                    src: _keystar_ui_icon_icons_editIcon__WEBPACK_IMPORTED_MODULE_8__/* .editIcon */ .g
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
                  children: stringFormatter.format('edit')
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
                  prominence: "low",
                  onPress: async () => {
                    const src = await (0,_ui_32b334fd_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_60__.getUploadedImage)();
                    if (src) {
                      setNode({
                        src
                      });
                    }
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
                    src: _keystar_ui_icon_icons_fileUpIcon__WEBPACK_IMPORTED_MODULE_58__/* .fileUpIcon */ .Y
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
                  children: "Choose file"
                })]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Divider */ .iz, {
              orientation: "vertical"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
                prominence: "low",
                onPress: () => {
                  slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.removeNodes(editor, {
                    at: slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, __elementForGettingPath)
                  });
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
                  src: _keystar_ui_icon_icons_trash2Icon__WEBPACK_IMPORTED_MODULE_45__/* .trash2Icon */ .S
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
                tone: "critical",
                children: "Remove"
              })]
            })]
          })
        })]
      }, aspectRatio)]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_6__/* .DialogContainer */ .TW, {
      onDismiss: () => {
        setDialogOpen(false);
        (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.f)(editor);
      },
      children: dialogOpen && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ImageDialog, {
        alt: currentElement.alt,
        title: currentElement.title,
        filename: currentElement.src.filename,
        onSubmit: _ref2 => {
          let {
            alt,
            filename,
            title
          } = _ref2;
          setNode({
            alt,
            title,
            src: {
              content: currentElement.src.content,
              filename
            }
          });
        }
      })
    })]
  });
};
function ImageDialog(props) {
  const {
    images
  } = useDocumentEditorConfig().documentFeatures;
  if (!images) {
    throw new Error('unexpected image rendered when images are disabled');
  }
  const schema = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => (0,_utils_677addd9_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_66__.o)(images.schema), [images]);
  const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    alt: props.alt,
    title: props.title
  });
  const previewProps = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => (0,_form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_47__.c)(schema, setState, () => undefined), [schema])(state);
  const [filenameWithoutExtension, filenameExtension] = splitFilename(props.filename);
  const [forceValidation, setForceValidation] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  let [fileName, setFileName] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(filenameWithoutExtension);
  let [fileNameTouched, setFileNameTouched] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  let {
    dismiss
  } = (0,_keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_6__/* .useDialogContainer */ .SN)();
  let stringFormatter = (0,_react_aria_i18n__WEBPACK_IMPORTED_MODULE_88__/* .useLocalizedStringFormatter */ .qb)(_index_b8966079_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_16__.l);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_6__/* .Dialog */ .Vq, {
    size: "small",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)("form", {
      style: {
        display: 'contents'
      },
      onSubmit: event => {
        if (event.target !== event.currentTarget) return;
        event.preventDefault();
        setForceValidation(true);
        if (fileName && (0,_errors_f334cbf7_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_48__.c)(schema, state, undefined)) {
          dismiss();
          props.onSubmit({
            alt: state.alt,
            title: state.title,
            filename: [fileName, filenameExtension].join('.')
          });
        }
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Heading, {
        children: "Image details"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_slots__WEBPACK_IMPORTED_MODULE_12__/* .Content */ .VY, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
          gap: "large",
          direction: "column",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_text_field__WEBPACK_IMPORTED_MODULE_13__/* .TextField */ .nv, {
            label: "File name",
            onChange: setFileName,
            onBlur: () => setFileNameTouched(true),
            value: fileName,
            isRequired: true,
            errorMessage: (fileNameTouched || forceValidation) && !fileName ? 'Please provide a file name.' : undefined,
            endElement: filenameExtension ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
              alignItems: "center",
              justifyContent: "center",
              paddingEnd: "regular",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Text, {
                color: "neutralTertiary",
                children: [".", filenameExtension]
              })
            }) : null
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_47__.F, {
            forceValidation: forceValidation,
            autoFocus: true,
            ...previewProps
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ButtonGroup */ .hE, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .zx, {
          onPress: dismiss,
          children: stringFormatter.format('cancel')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .zx, {
          prominence: "high",
          type: "submit",
          children: stringFormatter.format('save')
        })]
      })]
    })
  });
}
function splitFilename(filename) {
  const dotIndex = filename.lastIndexOf('.');
  if (dotIndex === -1) {
    return [filename, ''];
  }
  return [filename.substring(0, dotIndex), filename.substring(dotIndex + 1)];
}
let _imageIcon = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
  src: _keystar_ui_icon_icons_imageIcon__WEBPACK_IMPORTED_MODULE_59__/* .imageIcon */ .y
});
function ImageButton() {
  const editor = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSlateStatic */ ._7)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
      prominence: "low",
      onPress: async () => {
        const src = await (0,_ui_32b334fd_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_60__.getUploadedImage)();
        if (src) {
          slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.insertNodes(editor, {
            type: 'image',
            src,
            alt: '',
            title: '',
            children: [{
              text: ''
            }]
          });
        }
      },
      children: _imageIcon
    })
  });
}
const imageButton = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ImageButton, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Text, {
      children: "Image"
    })
  })]
});
function withImages(editor) {
  const {
    insertData
  } = editor;
  editor.insertData = data => {
    const images = Array.from(data.files).filter(x => x.type.startsWith('image/'));
    if (images.length) {
      Promise.all(images.map(async file => ({
        name: file.name,
        data: new Uint8Array(await file.arrayBuffer())
      }))).then(images => {
        (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.i)(editor, {
          type: 'image',
          src: {
            content: images[0].data,
            filename: images[0].name
          },
          alt: '',
          title: '',
          children: [{
            text: ''
          }]
        });
      });
      return;
    }
    insertData(data);
  };
  return editor;
}

const insertTable = editor => {
  slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.insertNodes(editor, {
    type: 'table',
    children: [{
      type: 'table-head',
      children: [{
        type: 'table-row',
        children: [(0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.h)(true), (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.h)(true), (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.h)(true)]
      }]
    }, {
      type: 'table-body',
      children: [{
        type: 'table-row',
        children: [(0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.h)(false), (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.h)(false), (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.h)(false)]
      }, {
        type: 'table-row',
        children: [(0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.h)(false), (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.h)(false), (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.h)(false)]
      }]
    }]
  });
};
const SelectedCellsContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
function getSelectedCells(table, row, column) {
  var _table$children$;
  const selectedCells = new Set();
  const first = table.children[0].type === 'table-head' || table.children[0].type === 'table-body' ? table.children[0] : undefined;
  if (!first) return selectedCells;
  const second = ((_table$children$ = table.children[1]) === null || _table$children$ === void 0 ? void 0 : _table$children$.type) === 'table-body' ? table.children[1] : undefined;
  for (let rowIndex = row.start; rowIndex <= row.end; rowIndex++) {
    const row = second ? rowIndex === 0 ? first.children[0] : second.children[rowIndex - 1] : first.children[rowIndex];
    if (!slate__WEBPACK_IMPORTED_MODULE_86__.Element.isElement(row)) continue;
    for (let cellIndex = column.start; cellIndex <= column.end; cellIndex++) {
      selectedCells.add(row.children[cellIndex]);
    }
  }
  return selectedCells;
}
function TableSelectionProvider(props) {
  const editor = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSlate */ .ui)();
  const selectedTableArea = (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.c)(editor);
  if (selectedTableArea) {
    var _Editor$above, _editor$selection;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(SelectedCellsContext.Provider, {
      value: {
        cells: selectedTableArea.singleCell === 'not-selected' ? new Set() : getSelectedCells(selectedTableArea.table, selectedTableArea.row, selectedTableArea.column),
        table: selectedTableArea.table,
        focus: (_Editor$above = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
          match: (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.n)('table-cell'),
          at: (_editor$selection = editor.selection) === null || _editor$selection === void 0 ? void 0 : _editor$selection.focus.path
        })) === null || _Editor$above === void 0 ? void 0 : _Editor$above[0]
      },
      children: props.children
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(SelectedCellsContext.Provider, {
    value: undefined,
    children: props.children
  });
}
const StartElementsContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)({
  top: new Map(),
  left: new Map()
});
const TableElement = _ref => {
  var _element$children$;
  let {
    attributes,
    children,
    element
  } = _ref;
  const editor = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSlateStatic */ ._7)();
  const selectedCellsContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SelectedCellsContext);
  const selectedCells = (selectedCellsContext === null || selectedCellsContext === void 0 ? void 0 : selectedCellsContext.table) === element ? selectedCellsContext : undefined;
  const startElements = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const firstTableChild = element.children[0];
    if (!slate__WEBPACK_IMPORTED_MODULE_86__.Element.isElement(firstTableChild) || !slate__WEBPACK_IMPORTED_MODULE_86__.Element.isElement(firstTableChild.children[0])) {
      return {
        top: new Map(),
        left: new Map()
      };
    }
    const top = new Map();
    const left = new Map();
    for (const [idx, cell] of firstTableChild.children[0].children.entries()) {
      if (cell.type !== 'table-cell') continue;
      top.set(cell, element.children.every(headOrBody => slate__WEBPACK_IMPORTED_MODULE_86__.Element.isElement(headOrBody) ? headOrBody.children.every(row => slate__WEBPACK_IMPORTED_MODULE_86__.Element.isElement(row) && (selectedCells === null || selectedCells === void 0 ? void 0 : selectedCells.cells.has(row.children[idx]))) : false));
    }
    for (const headOrBody of element.children) {
      if (headOrBody.type !== 'table-head' && headOrBody.type !== 'table-body') {
        continue;
      }
      for (const row of headOrBody.children) {
        if (row.type !== 'table-row' || row.children[0].type !== 'table-cell') {
          continue;
        }
        left.set(row.children[0], row.children.every(element => selectedCells === null || selectedCells === void 0 ? void 0 : selectedCells.cells.has(element)));
      }
    }
    return {
      top,
      left
    };
  }, [element, selectedCells]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(StartElementsContext.Provider, {
    value: startElements,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(SelectedCellsContext.Provider, {
      value: selectedCells,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.BlockWrapper, {
        attributes: attributes,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.BlockPopoverTrigger, {
          element: element,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("table", {
            className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
              width: '100%',
              tableLayout: 'fixed',
              position: 'relative',
              borderSpacing: 0,
              '& *::selection': selectedCells !== null && selectedCells !== void 0 && selectedCells.cells.size ? {
                backgroundColor: 'transparent'
              } : undefined
            }),
            children: children
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.BlockPopover, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
              gap: "regular",
              padding: "regular",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
                  prominence: "low",
                  isSelected: ((_element$children$ = element.children[0]) === null || _element$children$ === void 0 ? void 0 : _element$children$.type) === 'table-head',
                  onPress: () => {
                    const tablePath = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, element);
                    slate__WEBPACK_IMPORTED_MODULE_86__.Editor.withoutNormalizing(editor, () => {
                      if (element.children[0].type === 'table-head') {
                        slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.moveNodes(editor, {
                          at: [...tablePath, 0, 0],
                          to: [...tablePath, 1, 0]
                        });
                        slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.removeNodes(editor, {
                          at: [...tablePath, 0]
                        });
                        return;
                      }
                      slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.insertNodes(editor, {
                        type: 'table-head',
                        children: []
                      }, {
                        at: [...tablePath, 0]
                      });
                      slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.moveNodes(editor, {
                        at: [...tablePath, 1, 0],
                        to: [...tablePath, 0, 0]
                      });
                    });
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
                    src: _keystar_ui_icon_icons_sheetIcon__WEBPACK_IMPORTED_MODULE_76__/* .sheetIcon */ .x
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
                  children: "Header row"
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.ToolbarSeparator, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
                  prominence: "low",
                  onPress: () => {
                    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.removeNodes(editor, {
                      at: slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, element)
                    });
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
                    src: _keystar_ui_icon_icons_trash2Icon__WEBPACK_IMPORTED_MODULE_45__/* .trash2Icon */ .S
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
                  tone: "critical",
                  children: "Remove"
                })]
              })]
            })
          })]
        })
      })
    })
  });
};
const TableBodyElement = _ref2 => {
  let {
    attributes,
    children
  } = _ref2;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("tbody", {
    ...attributes,
    children: children
  });
};
const TableHeadElement = _ref3 => {
  let {
    attributes,
    children
  } = _ref3;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("thead", {
    ...attributes,
    children: children
  });
};
const TableRowElement = _ref4 => {
  var _useContext, _table$children$index;
  let {
    attributes,
    children,
    element
  } = _ref4;
  const table = (_useContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SelectedCellsContext)) === null || _useContext === void 0 ? void 0 : _useContext.table;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(RowIndexContext.Provider, {
    value: (_table$children$index = table === null || table === void 0 ? void 0 : table.children.indexOf(element)) !== null && _table$children$index !== void 0 ? _table$children$index : -1,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("tr", {
      ...attributes,
      children: children
    })
  });
};
const RowIndexContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(-1);
function TableCellElement(_ref5) {
  let {
    attributes,
    children,
    element
  } = _ref5;
  const editor = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSlateStatic */ ._7)();
  const selectedCellsContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SelectedCellsContext);
  const startElements = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(StartElementsContext);
  const isSelected = selectedCellsContext === null || selectedCellsContext === void 0 ? void 0 : selectedCellsContext.cells.has(element);
  const size = `calc(100% + 2px)`;
  const ElementType = element.header ? 'th' : 'td';
  const borderColor = isSelected ? _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.alias.borderSelected : _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.alias.borderIdle;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(ElementType, {
    className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
      borderInlineEnd: `1px solid ${borderColor}`,
      borderBottom: `1px solid ${borderColor}`,
      borderTop: startElements.top.has(element) ? `1px solid ${borderColor}` : undefined,
      borderInlineStart: startElements.left.has(element) ? `1px solid ${borderColor}` : undefined,
      backgroundColor: selectedCellsContext !== null && selectedCellsContext !== void 0 && selectedCellsContext.cells.has(element) ? _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.alias.backgroundSelected : element.header ? _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.scale.slate3 : undefined,
      position: 'relative',
      margin: 0,
      padding: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.size.space.regular,
      fontWeight: 'inherit',
      boxSizing: 'border-box',
      textAlign: 'start',
      verticalAlign: 'top'
    }),
    ...attributes,
    children: [isSelected && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div", {
        contentEditable: false,
        className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
          position: 'absolute',
          top: -1,
          insetInlineStart: -1,
          background: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.alias.borderSelected,
          height: size,
          width: 1
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div", {
        contentEditable: false,
        className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
          position: 'absolute',
          top: -1,
          insetInlineStart: -1,
          background: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.alias.borderSelected,
          height: 1,
          width: size
        })
      })]
    }), startElements.top.has(element) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(CellSelection, {
      location: "top",
      selected: !!startElements.top.get(element),
      label: "Select Column",
      onClick: () => {
        const path = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, element);
        const table = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
          match: (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.n)('table'),
          at: path
        });
        if (!table) return;
        const lastTableIndex = table[0].children.length - 1;
        const tableBody = table[0].children[lastTableIndex];
        if (tableBody.type !== 'table-body') return;
        const cellIndex = path[path.length - 1];
        const endPath = [...table[1], table[0].children.length - 1, tableBody.children.length - 1, cellIndex];
        slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.select(editor, {
          anchor: slate__WEBPACK_IMPORTED_MODULE_86__.Editor.start(editor, path),
          focus: slate__WEBPACK_IMPORTED_MODULE_86__.Editor.end(editor, endPath)
        });
      }
    }), startElements.left.has(element) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(CellSelection, {
      location: "left",
      selected: !!startElements.left.get(element),
      label: "Select Row",
      onClick: () => {
        const path = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, element);
        slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.select(editor, {
          anchor: slate__WEBPACK_IMPORTED_MODULE_86__.Editor.start(editor, slate__WEBPACK_IMPORTED_MODULE_86__.Path.parent(path)),
          focus: slate__WEBPACK_IMPORTED_MODULE_86__.Editor.end(editor, slate__WEBPACK_IMPORTED_MODULE_86__.Path.parent(path))
        });
      }
    }), startElements.left.has(element) && startElements.top.has(element) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(CellSelection, {
      location: "top-left",
      selected: !!(startElements.top.get(element) && startElements.left.get(element)),
      label: "Select Table",
      onClick: () => {
        const path = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, element);
        const table = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
          match: (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.n)('table'),
          at: path
        });
        if (!table) return;
        slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.select(editor, {
          anchor: slate__WEBPACK_IMPORTED_MODULE_86__.Editor.start(editor, table[1]),
          focus: slate__WEBPACK_IMPORTED_MODULE_86__.Editor.end(editor, table[1])
        });
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div", {
      children: children
    }), (selectedCellsContext === null || selectedCellsContext === void 0 ? void 0 : selectedCellsContext.focus) === element && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(CellMenu, {
      cell: element,
      table: selectedCellsContext.table
    })]
  });
}
function CellSelection(props) {
  const selectedCellsContext = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(SelectedCellsContext);
  const editor = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSlateStatic */ ._7)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)("div", {
    contentEditable: false,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("button", {
      tabIndex: -1,
      type: "button",
      ...(0,_keystar_ui_utils__WEBPACK_IMPORTED_MODULE_78__/* .toDataAttributes */ .a9)(props, new Set(['location', 'selected'])),
      className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
        background: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.scale.slate3,
        border: `1px solid ${_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.alias.borderIdle}`,
        margin: 0,
        padding: 0,
        position: 'absolute',
        ':hover': {
          background: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.scale.slate4
        },
        // ever so slightly larger hit area
        '::before': {
          content: '""',
          inset: -1,
          position: 'absolute'
        },
        // location
        '&[data-location=top]': {
          top: -9,
          insetInlineStart: -1,
          width: 'calc(100% + 2px)',
          height: 8
        },
        '&[data-location=left]': {
          top: -1,
          insetInlineStart: -9,
          width: 8,
          height: 'calc(100% + 2px)'
        },
        '&[data-location=top-left]': {
          top: -9,
          insetInlineStart: -9,
          width: 8,
          height: 8
        },
        '&:not([data-location=top])': {
          borderInlineEnd: 'none'
        },
        '&:not([data-location=left])': {
          borderBottom: 'none'
        },
        // state
        '&[data-selected=true]': {
          background: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.scale.indigo8,
          borderColor: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.alias.borderSelected
        }
      }),
      style: {
        visibility: selectedCellsContext !== null && selectedCellsContext !== void 0 && selectedCellsContext.focus ? 'visible' : 'hidden'
      },
      "aria-label": props.label,
      onClick: () => {
        slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.focus(editor);
        props.onClick();
      }
    }), props.selected && (props.location === 'top' ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div", {
      className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
        position: 'absolute',
        top: -9,
        insetInlineEnd: -1,
        background: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.alias.borderSelected,
        height: 8,
        width: 1,
        zIndex: 2
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div", {
      className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
        position: 'absolute',
        bottom: -1,
        insetInlineStart: -9,
        background: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.alias.borderSelected,
        height: 1,
        width: 8,
        zIndex: 2
      })
    }))]
  });
}
const cellActions = {
  deleteRow: {
    label: 'Delete row',
    action: (editor, cellPath) => {
      const tablePath = cellPath.slice(0, -3);
      const table = slate__WEBPACK_IMPORTED_MODULE_86__.Node.get(editor, tablePath);
      if (table.type !== 'table') return;
      const hasHead = table.children[0].type === 'table-head';
      const rowPath = slate__WEBPACK_IMPORTED_MODULE_86__.Path.parent(cellPath);
      slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.removeNodes(editor, {
        at: hasHead && rowPath[cellPath.length - 3] === 0 ? slate__WEBPACK_IMPORTED_MODULE_86__.Path.parent(rowPath) : rowPath
      });
    }
  },
  deleteColumn: {
    label: 'Delete column',
    action: (editor, path) => {
      const cellIndex = path[path.length - 1];
      const tablePath = path.slice(0, -3);
      const table = slate__WEBPACK_IMPORTED_MODULE_86__.Node.get(editor, tablePath);
      if (table.type !== 'table') return;
      slate__WEBPACK_IMPORTED_MODULE_86__.Editor.withoutNormalizing(editor, () => {
        for (const [headOrBodyIdx, headOrBody] of table.children.entries()) {
          if (headOrBody.type !== 'table-head' && headOrBody.type !== 'table-body') {
            continue;
          }
          for (const idx of headOrBody.children.keys()) {
            slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.removeNodes(editor, {
              at: [...tablePath, headOrBodyIdx, idx, cellIndex]
            });
          }
        }
      });
    }
  },
  insertRowBelow: {
    label: 'Insert row below',
    action: (editor, path) => {
      const tableRow = slate__WEBPACK_IMPORTED_MODULE_86__.Node.get(editor, slate__WEBPACK_IMPORTED_MODULE_86__.Path.parent(path));
      const tablePath = path.slice(0, -3);
      const table = slate__WEBPACK_IMPORTED_MODULE_86__.Node.get(editor, tablePath);
      if (tableRow.type !== 'table-row' || table.type !== 'table') {
        return;
      }
      const hasHead = table.children[0].type === 'table-head';
      const newRowPath = [...tablePath, hasHead ? 1 : 0, hasHead && path[path.length - 3] === 0 ? 0 : path[path.length - 2] + 1];
      slate__WEBPACK_IMPORTED_MODULE_86__.Editor.withoutNormalizing(editor, () => {
        slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.insertNodes(editor, {
          type: 'table-row',
          children: tableRow.children.map(() => (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.h)(false))
        }, {
          at: newRowPath
        });
        slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.select(editor, [...newRowPath, path[path.length - 1]]);
      });
    }
  },
  insertColumnRight: {
    label: 'Insert column right',
    action: (editor, path) => {
      const newCellIndex = path[path.length - 1] + 1;
      const tablePath = path.slice(0, -3);
      const table = slate__WEBPACK_IMPORTED_MODULE_86__.Node.get(editor, tablePath);
      if (table.type !== 'table') return;
      slate__WEBPACK_IMPORTED_MODULE_86__.Editor.withoutNormalizing(editor, () => {
        for (const [headOrBodyIdx, headOrBody] of table.children.entries()) {
          if (headOrBody.type !== 'table-head' && headOrBody.type !== 'table-body') {
            continue;
          }
          for (const rowIdx of headOrBody.children.keys()) {
            slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.insertNodes(editor, (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.h)(headOrBody.type === 'table-head'), {
              at: [...tablePath, headOrBodyIdx, rowIdx, newCellIndex]
            });
          }
        }
        slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.select(editor, slate__WEBPACK_IMPORTED_MODULE_86__.Editor.start(editor, slate__WEBPACK_IMPORTED_MODULE_86__.Path.next(path)));
      });
    }
  }
};
const _cellActions = cellActions;
function CellMenu(props) {
  const editor = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSlateStatic */ ._7)();
  const gutter = _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.size.space.small;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div", {
    contentEditable: false,
    className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
      top: gutter,
      insetInlineEnd: gutter,
      position: 'absolute'
    }),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_menu__WEBPACK_IMPORTED_MODULE_37__/* .MenuTrigger */ .bF, {
        align: "end",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
          prominence: "low",
          UNSAFE_className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
            borderRadius: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.size.radius.small,
            height: 'auto',
            minWidth: 0,
            padding: 0,
            // tiny buttons; increase the hit area
            '&::before': {
              content: '""',
              inset: `calc(${gutter} * -1)`,
              position: 'absolute'
            }
          }),
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
            src: _keystar_ui_icon_icons_chevronDownIcon__WEBPACK_IMPORTED_MODULE_25__/* .chevronDownIcon */ .i
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_menu__WEBPACK_IMPORTED_MODULE_37__/* .Menu */ .v2, {
          onAction: key => {
            if (key in _cellActions) {
              _cellActions[key].action(editor, slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, props.cell));
            }
          },
          items: Object.entries(_cellActions).map(_ref6 => {
            let [key, item] = _ref6;
            return {
              ...item,
              key
            };
          }),
          children: item => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_menu__WEBPACK_IMPORTED_MODULE_37__/* .Item */ .ck, {
            children: item.label
          }, item.key)
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
        children: "Options"
      })]
    })
  });
}
const TableButton = () => {
  const {
    editor,
    blockquote: {
      isDisabled,
      isSelected
    }
  } = useToolbarState();
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
    prominence: "low",
    isSelected: isSelected,
    isDisabled: isDisabled,
    onPress: () => {
      insertTable(editor);
      slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.focus(editor);
    },
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
      src: _keystar_ui_icon_icons_tableIcon__WEBPACK_IMPORTED_MODULE_77__/* .tableIcon */ .I
    })
  }), [editor, isDisabled, isSelected]);
};
const tableButton = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(TableButton, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Text, {
      children: "Table"
    })
  })]
});
function getCellPathInDirection(editor, path, direction) {
  if (direction === 'left' || direction === 'right') {
    const row = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
      match: (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.n)('table-row'),
      at: path
    });
    if (!row) return;
    const currentCellIdx = path[path.length - 1];
    const diff = direction === 'left' ? -1 : 1;
    const nextCellIdx = currentCellIdx + diff;
    const nextCell = row[0].children[nextCellIdx];
    if (!nextCell) return;
    return [...row[1], nextCellIdx];
  }
  const table = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
    match: (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.n)('table'),
    at: path
  });
  if (!table) return;
  const diff = direction === 'up' ? -1 : 1;
  const rowIndex = path[path.length - 3] + path[path.length - 2];
  const nextRowIndex = rowIndex + diff;
  const relativeRowPath = (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.e)(table[0].children[0].type === 'table-head', nextRowIndex);
  if (!slate__WEBPACK_IMPORTED_MODULE_86__.Node.has(table[0], relativeRowPath)) return;
  return [...table[1], ...relativeRowPath, path[path.length - 1]];
}

function Toolbar(_ref) {
  let {
    documentFeatures,
    viewState
  } = _ref;
  const blockComponent = useDocumentEditorConfig().componentBlocks;
  const hasBlockItems = Object.keys(blockComponent).length;
  const hasMarks = Object.values(documentFeatures.formatting.inlineMarks).some(x => x);
  const hasAlignment = documentFeatures.formatting.alignment.center || documentFeatures.formatting.alignment.end;
  const hasLists = documentFeatures.formatting.listTypes.unordered || documentFeatures.formatting.listTypes.ordered;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(ToolbarContainer, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(ToolbarScrollArea, {
      children: [!!documentFeatures.formatting.headings.levels.length && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(HeadingMenu, {
        headingLevels: documentFeatures.formatting.headings.levels
      }), hasMarks && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(InlineMarks, {
        marks: documentFeatures.formatting.inlineMarks
      }), (hasAlignment || hasLists) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(ToolbarGroup, {
        children: [hasAlignment && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(TextAlignMenu, {
          alignment: documentFeatures.formatting.alignment
        }), hasLists && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ListButtons, {
          lists: documentFeatures.formatting.listTypes
        })]
      }), (documentFeatures.dividers || documentFeatures.links || !!documentFeatures.images || documentFeatures.formatting.blockTypes.blockquote || documentFeatures.tables || !!documentFeatures.layouts.length || documentFeatures.formatting.blockTypes.code) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(ToolbarGroup, {
        children: [documentFeatures.dividers && dividerButton, documentFeatures.links && linkButton, documentFeatures.images && imageButton, documentFeatures.formatting.blockTypes.blockquote && blockquoteButton, !!documentFeatures.layouts.length && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(LayoutsButton, {
          layouts: documentFeatures.layouts
        }), documentFeatures.formatting.blockTypes.code && codeButton, documentFeatures.tables && tableButton]
      })]
    }), (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
      return viewState && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
        gap: "xsmall",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.ToolbarSeparator, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .Button */ .zx, {
            prominence: "low",
            onPress: () => {
              viewState.toggle();
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
              src: viewState.expanded ? _keystar_ui_icon_icons_minimizeIcon__WEBPACK_IMPORTED_MODULE_29__/* .minimizeIcon */ .Y : _keystar_ui_icon_icons_maximizeIcon__WEBPACK_IMPORTED_MODULE_28__/* .maximizeIcon */ .M
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
            children: viewState.expanded ? 'Collapse' : 'Expand'
          })]
        })]
      });
    }, [viewState]), !!hasBlockItems && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(InsertBlockMenu, {})]
  });
}

/** Group buttons together that don't fit into an `ActionGroup` semantically. */
const ToolbarGroup = _ref2 => {
  let {
    children
  } = _ref2;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
    gap: "regular",
    children: children
  });
};
const ToolbarContainer = _ref3 => {
  let {
    children
  } = _ref3;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
    minWidth: 0,
    backgroundColor: "canvas",
    borderTopStartRadius: "medium",
    borderTopEndRadius: "medium",
    position: "sticky",
    zIndex: 2,
    insetTop: 0,
    children: [children, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
      role: "presentation" // dividing line
      ,
      borderBottom: "muted",
      position: "absolute",
      insetX: "medium",
      insetBottom: 0
    })]
  });
};
const ToolbarScrollArea = props => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC
  // borderRadius="regular"
  // backgroundColor="surfaceSecondary"
  , {
    padding: "regular",
    paddingEnd: "medium",
    gap: "large",
    flex: true,
    minWidth: 0,
    UNSAFE_className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
      msOverflowStyle: 'none' /* for Internet Explorer, Edge */,
      scrollbarWidth: 'none' /* for Firefox */,
      overflowX: 'auto',
      /* for Chrome, Safari, and Opera */
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    }),
    ...props
  });
};
const headingMenuVals = new Map([['normal', 'normal'], ['1', 1], ['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6]]);
const HeadingMenu = _ref4 => {
  let {
    headingLevels
  } = _ref4;
  const {
    editor,
    textStyles
  } = useToolbarState();
  const isDisabled = textStyles.allowedHeadingLevels.length === 0;
  const items = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    let resolvedItems = [{
      name: 'Paragraph',
      id: 'normal'
    }];
    headingLevels.forEach(level => {
      resolvedItems.push({
        name: `Heading ${level}`,
        id: level.toString()
      });
    });
    return resolvedItems;
  }, [headingLevels]);
  const selected = textStyles.selected.toString();
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_picker__WEBPACK_IMPORTED_MODULE_38__/* .Picker */ .cW, {
    flexShrink: 0,
    width: "scale.1700",
    prominence: "low",
    "aria-label": "Text block",
    items: items,
    isDisabled: isDisabled,
    selectedKey: selected,
    onSelectionChange: selected => {
      let key = headingMenuVals.get(selected);
      if (key === 'normal') {
        slate__WEBPACK_IMPORTED_MODULE_86__.Editor.withoutNormalizing(editor, () => {
          slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unsetNodes(editor, 'level', {
            match: n => n.type === 'heading'
          });
          slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.setNodes(editor, {
            type: 'paragraph'
          }, {
            match: n => n.type === 'heading'
          });
        });
      } else if (key) {
        slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.setNodes(editor, {
          type: 'heading',
          level: key
        }, {
          match: node => node.type === 'paragraph' || node.type === 'heading'
        });
      }
      slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.focus(editor);
    },
    children: item => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_action_group__WEBPACK_IMPORTED_MODULE_23__/* .Item */ .c, {
      children: item.name
    }, item.id)
  }), [editor, isDisabled, items, selected]);
};
function InsertBlockMenu() {
  const editor = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSlateStatic */ ._7)();
  const componentBlocks = useDocumentEditorConfig().componentBlocks;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_menu__WEBPACK_IMPORTED_MODULE_37__/* .MenuTrigger */ .bF, {
    align: "end",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
        marginY: "regular",
        marginEnd: "medium",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
          src: _keystar_ui_icon_icons_plusIcon__WEBPACK_IMPORTED_MODULE_30__/* .plusIcon */ .R
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
          src: _keystar_ui_icon_icons_chevronDownIcon__WEBPACK_IMPORTED_MODULE_25__/* .chevronDownIcon */ .i
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Text, {
          children: "Insert"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Kbd, {
          children: "/"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_menu__WEBPACK_IMPORTED_MODULE_37__/* .Menu */ .v2, {
      onAction: key => {
        insertComponentBlock(editor, componentBlocks, key);
      },
      items: Object.entries(componentBlocks),
      children: _ref5 => {
        let [key, item] = _ref5;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_action_group__WEBPACK_IMPORTED_MODULE_23__/* .Item */ .c, {
          children: item.label
        }, key);
      }
    })]
  });
}
const inlineMarks = [{
  key: 'bold',
  label: 'Bold',
  icon: _keystar_ui_icon_icons_boldIcon__WEBPACK_IMPORTED_MODULE_24__/* .boldIcon */ .r,
  shortcut: `B`
}, {
  key: 'italic',
  label: 'Italic',
  icon: _keystar_ui_icon_icons_italicIcon__WEBPACK_IMPORTED_MODULE_27__/* .italicIcon */ .Z,
  shortcut: `I`
}, {
  key: 'underline',
  label: 'Underline',
  icon: _keystar_ui_icon_icons_underlineIcon__WEBPACK_IMPORTED_MODULE_36__/* .underlineIcon */ .Q,
  shortcut: `U`
}, {
  key: 'strikethrough',
  label: 'Strikethrough',
  icon: _keystar_ui_icon_icons_strikethroughIcon__WEBPACK_IMPORTED_MODULE_32__/* .strikethroughIcon */ .U
}, {
  key: 'code',
  label: 'Code',
  icon: _keystar_ui_icon_icons_codeIcon__WEBPACK_IMPORTED_MODULE_26__/* .codeIcon */ .z
}, {
  key: 'superscript',
  label: 'Superscript',
  icon: _keystar_ui_icon_icons_superscriptIcon__WEBPACK_IMPORTED_MODULE_34__/* .superscriptIcon */ .Y
}, {
  key: 'subscript',
  label: 'Subscript',
  icon: _keystar_ui_icon_icons_subscriptIcon__WEBPACK_IMPORTED_MODULE_33__/* .subscriptIcon */ .N
}, {
  key: 'clearFormatting',
  label: 'Clear formatting',
  icon: _keystar_ui_icon_icons_removeFormattingIcon__WEBPACK_IMPORTED_MODULE_31__/* .removeFormattingIcon */ .v
}];
function InlineMarks(_ref6) {
  let {
    marks: _marksShown
  } = _ref6;
  const {
    editor,
    clearFormatting: {
      isDisabled
    },
    marks
  } = useToolbarState();
  const marksShown = useMemoStringified(_marksShown);
  const selectedKeys = useMemoStringified(Object.keys(marks).filter(key => marks[key].isSelected));
  const disabledKeys = useMemoStringified(Object.keys(marks).filter(key => marks[key].isDisabled).concat(isDisabled ? 'clearFormatting' : []));
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const items = inlineMarks.filter(item => item.key === 'clearFormatting' || marksShown[item.key]);
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_action_group__WEBPACK_IMPORTED_MODULE_23__/* .ActionGroup */ .W, {
      UNSAFE_className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
        minWidth: `calc(${_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.size.element.medium} * 4)`
      }),
      prominence: "low",
      density: "compact",
      buttonLabelBehavior: "hide",
      overflowMode: "collapse",
      summaryIcon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
        src: _keystar_ui_icon_icons_typeIcon__WEBPACK_IMPORTED_MODULE_35__/* .typeIcon */ .R
      }),
      items: items,
      selectionMode: "multiple",
      selectedKeys: selectedKeys,
      disabledKeys: disabledKeys,
      onAction: key => {
        if (key === 'clearFormatting') {
          (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.h)(editor);
        } else {
          var _Editor$marks;
          const mark = key;
          if ((_Editor$marks = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.marks(editor)) !== null && _Editor$marks !== void 0 && _Editor$marks[mark]) {
            slate__WEBPACK_IMPORTED_MODULE_86__.Editor.removeMark(editor, mark);
          } else {
            slate__WEBPACK_IMPORTED_MODULE_86__.Editor.addMark(editor, mark, true);
          }
        }
        slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.focus(editor);
      },
      children: item => {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_action_group__WEBPACK_IMPORTED_MODULE_23__/* .Item */ .c, {
          textValue: item.label,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Text, {
            children: item.label
          }), 'shortcut' in item && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_15__.Kbd, {
            meta: true,
            children: item.shortcut
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
            src: item.icon
          })]
        }, item.key);
      }
    });
  }, [disabledKeys, editor, marksShown, selectedKeys]);
}
function useMemoStringified(value) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => value, [JSON.stringify(value)]);
}

const HeadingElement = _ref => {
  let {
    attributes,
    children,
    element
  } = _ref;
  const ElementType = `h${element.level}`;
  const editor = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSlateStatic */ ._7)();
  const {
    documentFeatures
  } = useDocumentEditorConfig();
  const [dialogOpen, setDialogOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  if (Object.keys(documentFeatures.formatting.headings.schema).length === 0) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ElementType, {
      ...attributes,
      className: _ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.b,
      style: {
        color: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.foreground.neutralEmphasis,
        textAlign: element.textAlign
      },
      children: children
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ElementType, {
      className: _ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.b,
      style: {
        color: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.foreground.neutralEmphasis,
        textAlign: element.textAlign
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.BlockPopoverTrigger, {
        element: element,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div", {
          children: children
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.BlockPopover, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
            gap: "regular",
            padding: "regular",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(CustomAttributesEditButton, {
              onPress: () => setDialogOpen(true)
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .TooltipTrigger */ .a, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_5__/* .ActionButton */ .Kk, {
                prominence: "low",
                onPress: () => {
                  slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.removeNodes(editor, {
                    at: slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, element)
                  });
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_icon__WEBPACK_IMPORTED_MODULE_7__/* .Icon */ .J, {
                  src: _keystar_ui_icon_icons_trash2Icon__WEBPACK_IMPORTED_MODULE_45__/* .trash2Icon */ .S
                })
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_14__/* .Tooltip */ .u, {
                tone: "critical",
                children: "Remove"
              })]
            })]
          })
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(CustomAttributesDialog, {
      element: element,
      schema: documentFeatures.formatting.headings.schema,
      isOpen: dialogOpen,
      nodeLabel: "Heading",
      onDismiss: () => setDialogOpen(false)
    })]
  });
};

const renderElement = props => {
  switch (props.element.type) {
    case 'layout':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(LayoutContainer, {
        attributes: props.attributes,
        children: props.children,
        element: props.element
      });
    case 'layout-area':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(LayoutArea, {
        ...props
      });
    case 'code':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(CodeElement, {
        attributes: props.attributes,
        children: props.children,
        element: props.element
      });
    case 'component-block':
      {
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ComponentBlocksElement, {
          attributes: props.attributes,
          children: props.children,
          element: props.element
        });
      }
    case 'component-inline-prop':
    case 'component-block-prop':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ComponentInlineProp, {
        ...props
      });
    case 'heading':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(HeadingElement, {
        attributes: props.attributes,
        children: props.children,
        element: props.element
      });
    case 'link':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(LinkElement, {
        attributes: props.attributes,
        children: props.children,
        element: props.element
      });
    case 'ordered-list':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("ol", {
        className: _ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.b,
        ...props.attributes,
        children: props.children
      });
    case 'unordered-list':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("ul", {
        className: _ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.b,
        ...props.attributes,
        children: props.children
      });
    case 'list-item':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("li", {
        ...props.attributes,
        children: props.children
      });
    case 'list-item-content':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("span", {
        ...props.attributes,
        children: props.children
      });
    case 'blockquote':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(BlockquoteElement, {
        ...props
      });
    case 'divider':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(DividerElement, {
        ...props
      });
    case 'image':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ImageElement, {
        attributes: props.attributes,
        children: props.children,
        element: props.element
      });
    case 'table':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(TableElement, {
        attributes: props.attributes,
        children: props.children,
        element: props.element
      });
    case 'table-head':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(TableHeadElement, {
        attributes: props.attributes,
        children: props.children,
        element: props.element
      });
    case 'table-body':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(TableBodyElement, {
        attributes: props.attributes,
        children: props.children,
        element: props.element
      });
    case 'table-row':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(TableRowElement, {
        attributes: props.attributes,
        children: props.children,
        element: props.element
      });
    case 'table-cell':
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(TableCellElement, {
        attributes: props.attributes,
        children: props.children,
        element: props.element
      });
    default:
      let {
        textAlign
      } = props.element;
      return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("p", {
        className: _ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.b,
        style: {
          textAlign
        },
        ...props.attributes,
        children: props.children
      });
  }
};

function getOptions(toolbarState, componentBlocks) {
  const options = [...Object.keys(componentBlocks).map(key => ({
    label: componentBlocks[key].label,
    insert: editor => {
      insertComponentBlock(editor, componentBlocks, key);
    }
  })), ...toolbarState.textStyles.allowedHeadingLevels.filter(a => toolbarState.editorDocumentFeatures.formatting.headings.levels.includes(a)).map(level => ({
    label: `Heading ${level}`,
    insert(editor) {
      (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.i)(editor, {
        type: 'heading',
        level,
        children: [{
          text: ''
        }]
      });
    }
  })), !toolbarState.blockquote.isDisabled && toolbarState.editorDocumentFeatures.formatting.blockTypes.blockquote && {
    label: 'Blockquote',
    insert(editor) {
      (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.i)(editor, {
        type: 'blockquote',
        children: [{
          text: ''
        }]
      });
    }
  }, !toolbarState.code.isDisabled && toolbarState.editorDocumentFeatures.formatting.blockTypes.code && {
    label: 'Code block',
    insert(editor) {
      (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.i)(editor, {
        type: 'code',
        children: [{
          text: ''
        }]
      });
    }
  }, !!toolbarState.editorDocumentFeatures.images && {
    label: 'Image',
    async insert(editor) {
      const image = await (0,_ui_32b334fd_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_60__.getUploadedImage)();
      if (image) {
        (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.i)(editor, {
          type: 'image',
          src: image,
          alt: '',
          title: '',
          children: [{
            text: ''
          }]
        });
      }
    }
  }, !!toolbarState.editorDocumentFeatures.tables && {
    label: 'Table',
    insert: insertTable
  }, !toolbarState.dividers.isDisabled && toolbarState.editorDocumentFeatures.dividers && {
    label: 'Divider',
    insert(editor) {
      (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.i)(editor, {
        type: 'divider',
        children: [{
          text: ''
        }]
      });
    }
  }, !!toolbarState.editorDocumentFeatures.layouts.length && {
    label: 'Layout',
    insert(editor) {
      insertLayout(editor, toolbarState.editorDocumentFeatures.layouts[0]);
    }
  }, !toolbarState.lists.ordered.isDisabled && toolbarState.editorDocumentFeatures.formatting.listTypes.ordered && {
    label: 'Numbered List',
    keywords: ['ordered list'],
    insert(editor) {
      (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.i)(editor, {
        type: 'ordered-list',
        children: [{
          text: ''
        }]
      });
    }
  }, !toolbarState.lists.unordered.isDisabled && toolbarState.editorDocumentFeatures.formatting.listTypes.unordered && {
    label: 'Bullet List',
    keywords: ['unordered list'],
    insert(editor) {
      (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.i)(editor, {
        type: 'unordered-list',
        children: [{
          text: ''
        }]
      });
    }
  }];
  return options.filter(x => typeof x !== 'boolean');
}
function insertOption(editor, text, option) {
  const path = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, text);
  slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.delete(editor, {
    at: {
      focus: slate__WEBPACK_IMPORTED_MODULE_86__.Editor.start(editor, path),
      anchor: slate__WEBPACK_IMPORTED_MODULE_86__.Editor.end(editor, path)
    }
  });
  option.insert(editor);
}
function InsertMenu(_ref) {
  let {
    children,
    text
  } = _ref;
  const toolbarState = useToolbarState();
  const {
    editor
  } = toolbarState;
  const {
    componentBlocks
  } = useDocumentEditorConfig();
  const options = (0,match_sorter__WEBPACK_IMPORTED_MODULE_43__/* .matchSorter */ .Lu)(getOptions(toolbarState, componentBlocks), text.text.slice(1), {
    keys: ['label', 'keywords']
  }).map((option, index) => ({
    ...option,
    index
  }));
  const stateRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)({
    options,
    text
  });
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    stateRef.current = {
      options,
      text
    };
  });
  const listenerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(_event => {});
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    listenerRef.current = event => {
      if (event.defaultPrevented) return;
      switch (event.key) {
        case 'ArrowDown':
          {
            if (stateRef.current.options.length) {
              event.preventDefault();
              state.selectionManager.setFocused(true);
              state.selectionManager.setFocusedKey((Number(state.selectionManager.focusedKey) === stateRef.current.options.length - 1 ? 0 : Number(state.selectionManager.focusedKey) + 1).toString());
            }
            return;
          }
        case 'ArrowUp':
          {
            if (stateRef.current.options.length) {
              event.preventDefault();
              state.selectionManager.setFocused(true);
              state.selectionManager.setFocusedKey((state.selectionManager.focusedKey === '0' ? stateRef.current.options.length - 1 : Number(state.selectionManager.focusedKey) - 1).toString());
            }
            return;
          }
        case 'Enter':
          {
            const option = stateRef.current.options[Number(state.selectionManager.focusedKey)];
            if (option) {
              insertOption(editor, stateRef.current.text, option);
              event.preventDefault();
            }
            return;
          }
        case 'Escape':
          {
            const path = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.findPath(editor, stateRef.current.text);
            slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unsetNodes(editor, 'insertMenu', {
              at: path
            });
            event.preventDefault();
            return;
          }
      }
    };
  });
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    const domNode = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.toDOMNode(editor, editor);
    let listener = event => listenerRef.current(event);
    domNode.addEventListener('keydown', listener);
    return () => {
      domNode.removeEventListener('keydown', listener);
    };
  }, [editor]);
  const triggerRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const overlayState = (0,_react_stately_overlays__WEBPACK_IMPORTED_MODULE_90__/* .useOverlayTriggerState */ .d)({
    isOpen: true
  });
  const {
    triggerProps: {
      onPress,
      ...triggerProps
    },
    overlayProps
  } = (0,_react_aria_overlays__WEBPACK_IMPORTED_MODULE_91__/* .useOverlayTrigger */ .IB)({
    type: 'listbox'
  }, overlayState, triggerRef);
  let state = (0,_react_stately_list__WEBPACK_IMPORTED_MODULE_92__/* .useListState */ .n_)({
    items: options,
    children: item => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_listbox__WEBPACK_IMPORTED_MODULE_79__/* .Item */ .ck, {
      children: item.label
    }, item.index)
  });
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (!state.selectionManager.isFocused && state.collection.size) {
      state.selectionManager.setFocused(true);
      state.selectionManager.setFocusedKey('0');
    }
  }, [state]);
  const scrollableRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    var _scrollableRef$curren, _scrollableRef$curren2;
    const element = (_scrollableRef$curren = scrollableRef.current) === null || _scrollableRef$curren === void 0 ? void 0 : (_scrollableRef$curren2 = _scrollableRef$curren.querySelector('[role="listbox"] [role="presentation"]')) === null || _scrollableRef$curren2 === void 0 ? void 0 : _scrollableRef$curren2.children[state.selectionManager.focusedKey];
    if (element) {
      (0,scroll_into_view_if_needed__WEBPACK_IMPORTED_MODULE_93__/* ["default"] */ .Z)(element, {
        scrollMode: 'if-needed',
        boundary: scrollableRef.current,
        block: 'nearest'
      });
    }
  }, [state.selectionManager.focusedKey]);
  const listboxRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  let layout = (0,_keystar_ui_listbox__WEBPACK_IMPORTED_MODULE_79__/* .useListBoxLayout */ .vG)(state);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(react__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("span", {
      ...triggerProps,
      role: "button",
      className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
        color: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.foreground.accent,
        fontWeight: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.typography.fontWeight.medium
      }),
      ref: triggerRef,
      children: children
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_overlays__WEBPACK_IMPORTED_MODULE_80__/* .Popover */ .J2, {
      width: "alias.singleLineWidth",
      placement: "bottom start",
      isNonModal: true,
      hideArrow: true,
      ...overlayProps,
      state: overlayState,
      triggerRef: triggerRef,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("div", {
        className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
          overflow: 'scroll',
          maxHeight: 300
        }),
        ref: scrollableRef,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_listbox__WEBPACK_IMPORTED_MODULE_79__/* .ListBoxBase */ .W5, {
          "aria-label": "Insert block",
          state: state,
          shouldUseVirtualFocus: true,
          layout: layout,
          ref: listboxRef,
          onAction: key => {
            insertOption(editor, text, options[key]);
          }
        })
      })
    })]
  });
}
const nodeListsWithoutInsertMenu = new WeakSet();
const nodesWithoutInsertMenu = new WeakSet();
function findPathWithInsertMenu(node, path) {
  if (slate__WEBPACK_IMPORTED_MODULE_86__.Text.isText(node)) {
    return node.insertMenu ? path : undefined;
  }
  if (nodeListsWithoutInsertMenu.has(node.children)) {
    return;
  }
  for (const [index, child] of node.children.entries()) {
    if (nodesWithoutInsertMenu.has(child)) continue;
    let maybePath = findPathWithInsertMenu(child, [...path, index]);
    if (maybePath) {
      return maybePath;
    }
    nodesWithoutInsertMenu.add(child);
  }
  nodeListsWithoutInsertMenu.add(node.children);
}
function removeInsertMenuMarkWhenOutsideOfSelection(editor) {
  var _Editor$marks;
  const path = findPathWithInsertMenu(editor, []);
  if (path && !((_Editor$marks = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.marks(editor)) !== null && _Editor$marks !== void 0 && _Editor$marks.insertMenu) && (!editor.selection || !slate__WEBPACK_IMPORTED_MODULE_86__.Path.equals(editor.selection.anchor.path, path) || !slate__WEBPACK_IMPORTED_MODULE_86__.Path.equals(editor.selection.focus.path, path))) {
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unsetNodes(editor, 'insertMenu', {
      at: path
    });
    return true;
  }
  return false;
}
function withInsertMenu(editor) {
  const {
    normalizeNode,
    apply,
    insertText
  } = editor;
  editor.normalizeNode = _ref2 => {
    let [node, path] = _ref2;
    if (slate__WEBPACK_IMPORTED_MODULE_86__.Text.isText(node) && node.insertMenu) {
      if (node.text[0] !== '/') {
        slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unsetNodes(editor, 'insertMenu', {
          at: path
        });
        return;
      }
      const whitespaceMatch = /\s/.exec(node.text);
      if (whitespaceMatch) {
        slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unsetNodes(editor, 'insertMenu', {
          at: {
            anchor: {
              path,
              offset: whitespaceMatch.index
            },
            focus: slate__WEBPACK_IMPORTED_MODULE_86__.Editor.end(editor, path)
          },
          match: slate__WEBPACK_IMPORTED_MODULE_86__.Text.isText,
          split: true
        });
        return;
      }
    }
    if (slate__WEBPACK_IMPORTED_MODULE_86__.Editor.isEditor(editor) && removeInsertMenuMarkWhenOutsideOfSelection(editor)) {
      return;
    }
    normalizeNode([node, path]);
  };
  editor.apply = op => {
    apply(op);
    // we're calling this here AND in normalizeNode
    // because normalizeNode won't be called on selection changes
    // but apply will
    // we're still calling this from normalizeNode though because we want it to happen
    // when normalization happens
    if (op.type === 'set_selection') {
      removeInsertMenuMarkWhenOutsideOfSelection(editor);
    }
  };
  editor.insertText = text => {
    insertText(text);
    if (editor.selection && text === '/') {
      const startOfBlock = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.start(editor, slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
        match: _utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i
      })[1]);
      const before = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.before(editor, editor.selection.anchor, {
        unit: 'character'
      });
      if (before && (slate__WEBPACK_IMPORTED_MODULE_86__.Point.equals(startOfBlock, before) || before.offset !== 0 && /\s/.test(slate__WEBPACK_IMPORTED_MODULE_86__.Node.get(editor, before.path).text[before.offset - 1]))) {
        slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.setNodes(editor, {
          insertMenu: true
        }, {
          at: {
            anchor: before,
            focus: editor.selection.anchor
          },
          match: slate__WEBPACK_IMPORTED_MODULE_86__.Text.isText,
          split: true
        });
      }
    }
  };
  return editor;
}

function Placeholder(_ref) {
  let {
    placeholder,
    children
  } = _ref;
  const [width, setWidth] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)("span", {
    className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
      position: 'relative',
      display: 'inline-block',
      width
    }),
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("span", {
      contentEditable: false,
      className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
        position: 'absolute',
        pointerEvents: 'none',
        display: 'inline-block',
        left: 0,
        top: 0,
        maxWidth: '100%',
        whiteSpace: 'nowrap',
        opacity: '0.5',
        userSelect: 'none',
        fontStyle: 'normal',
        fontWeight: 'normal',
        textDecoration: 'none',
        textAlign: 'left'
      }),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("span", {
        ref: node => {
          if (node) {
            const offsetWidth = node.offsetWidth;
            if (offsetWidth !== width) {
              setWidth(offsetWidth);
            }
          }
        },
        children: placeholder
      })
    }), children]
  });
}
const Leaf = _ref2 => {
  let {
    leaf,
    text,
    children,
    attributes
  } = _ref2;
  const {
    underline,
    strikethrough,
    bold,
    italic,
    code,
    keyboard,
    superscript,
    subscript,
    placeholder,
    insertMenu,
    ...rest
  } = leaf;
  if (placeholder !== undefined) {
    children = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(Placeholder, {
      placeholder: placeholder,
      children: children
    });
  }
  if (insertMenu) {
    children = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(InsertMenu, {
      text: text,
      children: children
    });
  }
  if (code) {
    children = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Box */ .xu, {
      elementType: "code",
      backgroundColor: "accent",
      paddingX: "xsmall",
      paddingY: 2,
      borderRadius: "small",
      UNSAFE_className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
        color: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.foreground.neutralEmphasis,
        fontSize: '0.85em',
        fontFamily: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.typography.fontFamily.code
      }),
      children: children
    });
  }
  if (bold) {
    children = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("strong", {
      children: children
    });
  }
  if (strikethrough) {
    children = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("s", {
      children: children
    });
  }
  if (italic) {
    children = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("em", {
      children: children
    });
  }
  if (keyboard) {
    children = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("kbd", {
      children: children
    });
  }
  if (superscript) {
    children = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("sup", {
      children: children
    });
  }
  if (subscript) {
    children = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("sub", {
      children: children
    });
  }
  if (underline) {
    children = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("u", {
      children: children
    });
  }
  const prismClassNames = Object.keys(rest).filter(x => x.startsWith('prism_')).map(x => styles$1.get(x.replace('prism_', '')));
  if (prismClassNames.length) {
    const className = prismClassNames.join(' ');
    children = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("span", {
      className: className,
      children: children
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)("span", {
    ...attributes,
    children: children
  });
};
const renderLeaf = props => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(Leaf, {
    ...props
  });
};
const styles$1 = new Map([{
  types: ['comment', 'prolog', 'doctype', 'cdata'],
  style: {
    color: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.foreground.neutralTertiary,
    fontStyle: 'italic'
  }
}, {
  types: ['atrule', 'attr-name', 'class-name', 'selector'],
  style: {
    color: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.scale.amber11
  }
}, {
  types: ['boolean', 'constant', 'inserted-sign', 'entity', 'inserted', 'number', 'regex', 'symbol', 'variable'],
  style: {
    color: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.scale.green11
  }
}, {
  types: ['attr-value', 'builtin', 'char', 'constant', 'generics', 'url'],
  style: {
    color: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.scale.pink11
  }
}, {
  types: ['string'],
  style: {
    color: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.scale.indigo9
  }
}, {
  types: ['annotation', 'deleted', 'deleted-sign', 'decorator', 'important', 'tag'],
  style: {
    color: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.scale.red11
  }
}, {
  types: ['function', 'function-variable', 'operator'],
  style: {
    color: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.scale.purple11
  }
}, {
  types: ['tag', 'selector', 'keyword'],
  style: {
    color: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.scale.indigo11
  }
}, {
  types: ['punctuation'],
  style: {
    color: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.foreground.neutralSecondary
  }
}].flatMap(style => {
  const className = (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)(style.style);
  return style.types.map(x => [x, className]);
}));

function withBlockMarkdownShortcuts(documentFeatures, componentBlocks, editor) {
  const {
    insertText
  } = editor;
  const shortcuts = Object.create(null);
  const editorDocumentFeaturesForNormalizationToCheck = {
    ...documentFeatures
  };
  let addShortcut = function (text, insert, shouldBeEnabledInComponentBlock) {
    let type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'paragraph';
    if (!shouldBeEnabledInComponentBlock(editorDocumentFeaturesForNormalizationToCheck)) {
      return;
    }
    const trigger = text[text.length - 1];
    if (!shortcuts[trigger]) {
      shortcuts[trigger] = Object.create(null);
    }
    shortcuts[trigger][text] = {
      insert,
      type,
      shouldBeEnabledInComponentBlock
    };
  };
  addShortcut('1. ', () => {
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.wrapNodes(editor, {
      type: 'ordered-list',
      children: []
    }, {
      match: _utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i
    });
  }, features => features.formatting.listTypes.ordered);
  addShortcut('- ', () => {
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.wrapNodes(editor, {
      type: 'unordered-list',
      children: []
    }, {
      match: _utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i
    });
  }, features => features.formatting.listTypes.unordered);
  addShortcut('* ', () => {
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.wrapNodes(editor, {
      type: 'unordered-list',
      children: []
    }, {
      match: _utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i
    });
  }, features => features.formatting.listTypes.unordered);
  documentFeatures.formatting.headings.levels.forEach(level => {
    addShortcut('#'.repeat(level) + ' ', () => {
      slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.setNodes(editor, {
        type: 'heading',
        level
      }, {
        match: node => node.type === 'paragraph' || node.type === 'heading'
      });
    }, features => features.formatting.headings.levels.includes(level), 'heading-or-paragraph');
  });
  addShortcut('> ', () => {
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.wrapNodes(editor, {
      type: 'blockquote',
      children: []
    }, {
      match: node => node.type === 'paragraph'
    });
  }, features => features.formatting.blockTypes.blockquote);
  addShortcut('---', () => {
    insertDivider(editor);
  }, features => features.dividers);
  editor.insertText = text => {
    insertText(text);
    const shortcutsForTrigger = shortcuts[text];
    if (shortcutsForTrigger && editor.selection && slate__WEBPACK_IMPORTED_MODULE_86__.Range.isCollapsed(editor.selection)) {
      const {
        anchor
      } = editor.selection;
      const block = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
        match: _utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i
      });
      if (!block || block[0].type !== 'paragraph' && block[0].type !== 'heading') {
        return;
      }
      const start = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.start(editor, block[1]);
      const range = {
        anchor,
        focus: start
      };
      const shortcutText = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.string(editor, range);
      const shortcut = shortcutsForTrigger[shortcutText];
      if (!shortcut || shortcut.type === 'paragraph' && block[0].type !== 'paragraph') {
        return;
      }
      const locationDocumentFeatures = (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.g)(editor, documentFeatures, componentBlocks);
      if (locationDocumentFeatures && (locationDocumentFeatures.kind === 'inline' || !shortcut.shouldBeEnabledInComponentBlock(locationDocumentFeatures.documentFeatures))) {
        return;
      }

      // so that this starts a new undo group
      editor.history.undos.push({
        operations: [],
        selectionBefore: editor.selection
      });
      slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.select(editor, range);
      slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.delete(editor);
      shortcut.insert();
    }
  };
  return editor;
}

function getDirectBlockquoteParentFromSelection(editor) {
  if (!editor.selection) return {
    isInside: false
  };
  const [, parentPath] = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.parent(editor, editor.selection);
  if (!parentPath.length) {
    return {
      isInside: false
    };
  }
  const [maybeBlockquoteParent, maybeBlockquoteParentPath] = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.parent(editor, parentPath);
  const isBlockquote = maybeBlockquoteParent.type === 'blockquote';
  return isBlockquote ? {
    isInside: true,
    path: maybeBlockquoteParentPath
  } : {
    isInside: false
  };
}
function withBlockquote(editor) {
  const {
    insertBreak,
    deleteBackward
  } = editor;
  editor.deleteBackward = unit => {
    if (editor.selection) {
      const parentBlockquote = getDirectBlockquoteParentFromSelection(editor);
      if (parentBlockquote.isInside && slate__WEBPACK_IMPORTED_MODULE_86__.Range.isCollapsed(editor.selection) &&
      // the selection is at the start of the paragraph
      editor.selection.anchor.offset === 0 &&
      // it's the first paragraph in the panel
      editor.selection.anchor.path[editor.selection.anchor.path.length - 2] === 0) {
        slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unwrapNodes(editor, {
          match: node => node.type === 'blockquote',
          split: true
        });
        return;
      }
    }
    deleteBackward(unit);
  };
  editor.insertBreak = () => {
    const panel = getDirectBlockquoteParentFromSelection(editor);
    if (editor.selection && panel.isInside) {
      const [node, nodePath] = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.node(editor, editor.selection);
      if (slate__WEBPACK_IMPORTED_MODULE_86__.Path.isDescendant(nodePath, panel.path) && slate__WEBPACK_IMPORTED_MODULE_86__.Node.string(node) === '') {
        slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unwrapNodes(editor, {
          match: node => node.type === 'blockquote',
          split: true
        });
        return;
      }
    }
    insertBreak();
  };
  return editor;
}

function withHeading(editor) {
  const {
    insertBreak
  } = editor;
  editor.insertBreak = () => {
    insertBreak();
    const entry = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
      match: n => n.type === 'heading'
    });
    if (!entry || !editor.selection || !slate__WEBPACK_IMPORTED_MODULE_86__.Range.isCollapsed(editor.selection)) {
      return;
    }
    const path = entry[1];
    if (
    // we want to unwrap the heading when the user inserted a break at the end of the heading
    // when the user inserts a break at the end of a heading, the new heading
    // that we want to unwrap will be empty so the end will be equal to the selection
    slate__WEBPACK_IMPORTED_MODULE_86__.Point.equals(slate__WEBPACK_IMPORTED_MODULE_86__.Editor.end(editor, path), editor.selection.anchor)) {
      slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unwrapNodes(editor, {
        at: path
      });
      return;
    }
    // we also want to unwrap the _previous_ heading when the user inserted a break
    // at the start of the heading, essentially just inserting an empty paragraph above the heading
    if (!slate__WEBPACK_IMPORTED_MODULE_86__.Path.hasPrevious(path)) {
      return;
    }
    const previousPath = slate__WEBPACK_IMPORTED_MODULE_86__.Path.previous(path);
    const previousNode = slate__WEBPACK_IMPORTED_MODULE_86__.Node.get(editor, previousPath);
    if (previousNode.type === 'heading' && previousNode.children.length === 1 && slate__WEBPACK_IMPORTED_MODULE_86__.Text.isText(previousNode.children[0]) && previousNode.children[0].text === '') {
      slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.unwrapNodes(editor, {
        at: previousPath
      });
    }
  };
  return editor;
}

const allMarkdownShortcuts = {
  bold: ['**', '__'],
  italic: ['*', '_'],
  strikethrough: ['~~'],
  code: ['`']
};
function applyMark(editor, mark, shortcutText, startOfStartPoint) {
  // so that this starts a new undo group
  editor.history.undos.push({
    operations: [],
    selectionBefore: editor.selection
  });
  const startPointRef = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.pointRef(editor, startOfStartPoint);
  slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.delete(editor, {
    at: editor.selection.anchor,
    distance: shortcutText.length,
    reverse: true
  });
  slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.delete(editor, {
    at: startOfStartPoint,
    distance: shortcutText.length
  });
  slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.setNodes(editor, {
    [mark]: true
  }, {
    match: slate__WEBPACK_IMPORTED_MODULE_86__.Text.isText,
    split: true,
    at: {
      anchor: startPointRef.unref(),
      focus: editor.selection.anchor
    }
  });
  // once you've ended the shortcut, you're done with the mark
  // so we need to remove it so the text you insert after doesn't have it
  editor.removeMark(mark);
}
function withMarks(editorDocumentFeatures, componentBlocks, editor) {
  const {
    insertText,
    insertBreak
  } = editor;
  editor.insertBreak = () => {
    insertBreak();
    const marksAfterInsertBreak = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.marks(editor);
    if (!marksAfterInsertBreak || !editor.selection) return;
    const parentBlock = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
      match: _utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i
    });
    if (!parentBlock) return;
    const point = (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.E)(editor, editor.selection.anchor);
    const marksAfterInsertBreakArr = Object.keys(marksAfterInsertBreak);
    if (!point || !slate__WEBPACK_IMPORTED_MODULE_86__.Path.isDescendant(point.path, parentBlock[1])) {
      for (const mark of marksAfterInsertBreakArr) {
        editor.removeMark(mark);
      }
      return;
    }
    const textNode = slate__WEBPACK_IMPORTED_MODULE_86__.Node.get(editor, point.path);
    for (const mark of marksAfterInsertBreakArr) {
      if (!textNode[mark]) {
        editor.removeMark(mark);
      }
    }
  };
  const selectedMarkdownShortcuts = {};
  const enabledMarks = editorDocumentFeatures.formatting.inlineMarks;
  Object.keys(allMarkdownShortcuts).forEach(mark => {
    if (enabledMarks[mark]) {
      selectedMarkdownShortcuts[mark] = allMarkdownShortcuts[mark];
    }
  });
  if (Object.keys(selectedMarkdownShortcuts).length === 0) return editor;
  editor.insertText = text => {
    insertText(text);
    if (editor.selection && slate__WEBPACK_IMPORTED_MODULE_86__.Range.isCollapsed(editor.selection)) {
      for (const [mark, shortcuts] of Object.entries(selectedMarkdownShortcuts)) {
        for (const shortcutText of shortcuts) {
          if (text === shortcutText[shortcutText.length - 1]) {
            // this function is not inlined because
            // https://github.com/swc-project/swc/issues/2622
            const startOfBlock = getStartOfBlock(editor);
            let startOfBlockToEndOfShortcutString = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.string(editor, {
              anchor: editor.selection.anchor,
              focus: startOfBlock
            });
            const hasWhitespaceBeforeEndOfShortcut = /\s/.test(startOfBlockToEndOfShortcutString.slice(-shortcutText.length - 1, -shortcutText.length));
            const endOfShortcutContainsExpectedContent = shortcutText === startOfBlockToEndOfShortcutString.slice(-shortcutText.length);
            if (hasWhitespaceBeforeEndOfShortcut || !endOfShortcutContainsExpectedContent) {
              continue;
            }
            const strToMatchOn = startOfBlockToEndOfShortcutString.slice(0, -shortcutText.length - 1);
            // TODO: use regex probs
            for (const [offsetFromStartOfBlock] of [...strToMatchOn].reverse().entries()) {
              const expectedShortcutText = strToMatchOn.slice(offsetFromStartOfBlock, offsetFromStartOfBlock + shortcutText.length);
              if (expectedShortcutText !== shortcutText) {
                continue;
              }
              const startOfStartOfShortcut = offsetFromStartOfBlock === 0 ? startOfBlock : (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.E)(editor, startOfBlock, {
                distance: offsetFromStartOfBlock
              });
              const endOfStartOfShortcut = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.after(editor, startOfStartOfShortcut, {
                distance: shortcutText.length
              });
              if (offsetFromStartOfBlock !== 0 && !/\s/.test(slate__WEBPACK_IMPORTED_MODULE_86__.Editor.string(editor, {
                anchor: slate__WEBPACK_IMPORTED_MODULE_86__.Editor.before(editor, startOfStartOfShortcut, {
                  unit: 'character'
                }),
                focus: startOfStartOfShortcut
              }))) {
                continue;
              }
              const contentBetweenShortcuts = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.string(editor, {
                anchor: endOfStartOfShortcut,
                focus: editor.selection.anchor
              }).slice(0, -shortcutText.length);
              if (contentBetweenShortcuts === '' || /\s/.test(contentBetweenShortcuts[0])) {
                continue;
              }

              // this is a bit of a weird one
              // let's say you had <text>__thing _<cursor /></text> and you insert `_`.
              // without the below, that would turn into <text italic>_thing _<cursor /></text>
              // but it's probably meant to be bold but it's not because of the space before the ending _
              // there's probably a better way to do this but meh, this works
              if (mark === 'italic' && (contentBetweenShortcuts[0] === '_' || contentBetweenShortcuts[0] === '*')) {
                continue;
              }
              // this is the start of a code block shortcut
              if (mark === 'code' && contentBetweenShortcuts === '`') {
                continue;
              }
              const ancestorComponentChildFieldDocumentFeatures = (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.g)(editor, editorDocumentFeatures, componentBlocks);
              if (ancestorComponentChildFieldDocumentFeatures && ancestorComponentChildFieldDocumentFeatures.inlineMarks !== 'inherit' && ancestorComponentChildFieldDocumentFeatures.inlineMarks[mark] === false) {
                continue;
              }
              applyMark(editor, mark, shortcutText, startOfStartOfShortcut);
              return;
            }
          }
        }
      }
    }
  };
  return editor;
}
function getStartOfBlock(editor) {
  return slate__WEBPACK_IMPORTED_MODULE_86__.Editor.start(editor, slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
    match: _utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i
  })[1]);
}

// very loosely based on https://github.com/ianstormtaylor/slate/blob/d22c76ae1313fe82111317417912a2670e73f5c9/site/examples/paste-html.tsx
function getAlignmentFromElement(element) {
  const parent = element.parentElement;
  // confluence
  const attribute = parent === null || parent === void 0 ? void 0 : parent.getAttribute('data-align');
  // note: we don't show html that confluence would parse as alignment
  // we could change that but meh
  // (they match on div.fabric-editor-block-mark with data-align)
  if (attribute === 'center' || attribute === 'end') {
    return attribute;
  }
  if (element instanceof HTMLElement) {
    // Google docs
    const textAlign = element.style.textAlign;
    if (textAlign === 'center') {
      return 'center';
    }
    // TODO: RTL things?
    if (textAlign === 'right' || textAlign === 'end') {
      return 'end';
    }
  }
}
const headings = {
  H1: 1,
  H2: 2,
  H3: 3,
  H4: 4,
  H5: 5,
  H6: 6
};
const TEXT_TAGS = {
  CODE: 'code',
  DEL: 'strikethrough',
  S: 'strikethrough',
  STRIKE: 'strikethrough',
  EM: 'italic',
  I: 'italic',
  STRONG: 'bold',
  U: 'underline',
  SUP: 'superscript',
  SUB: 'subscript',
  KBD: 'keyboard'
};
function marksFromElementAttributes(element) {
  const marks = new Set();
  const style = element.style;
  const {
    nodeName
  } = element;
  const markFromNodeName = TEXT_TAGS[nodeName];
  if (markFromNodeName) {
    marks.add(markFromNodeName);
  }
  const {
    fontWeight,
    textDecoration,
    verticalAlign
  } = style;
  if (textDecoration === 'underline') {
    marks.add('underline');
  } else if (textDecoration === 'line-through') {
    marks.add('strikethrough');
  }
  // confluence
  if (nodeName === 'SPAN' && element.classList.contains('code')) {
    marks.add('code');
  }
  // Google Docs does weird things with <b>
  if (nodeName === 'B' && fontWeight !== 'normal') {
    marks.add('bold');
  } else if (typeof fontWeight === 'string' && (fontWeight === 'bold' || fontWeight === 'bolder' || fontWeight === '1000' || /^[5-9]\d{2}$/.test(fontWeight))) {
    marks.add('bold');
  }
  if (style.fontStyle === 'italic') {
    marks.add('italic');
  }
  // Google Docs uses vertical align for subscript and superscript instead of <sup> and <sub>
  if (verticalAlign === 'super') {
    marks.add('superscript');
  } else if (verticalAlign === 'sub') {
    marks.add('subscript');
  }
  return marks;
}
function deserializeHTML(html) {
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  return fixNodesForBlockChildren(deserializeNodes(parsed.body.childNodes));
}
function deserializeHTMLNode(el) {
  if (!(el instanceof globalThis.HTMLElement)) {
    const text = el.textContent;
    if (!text) {
      return [];
    }
    return (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.j)(text);
  }
  if (el.nodeName === 'BR') {
    return (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.j)('\n');
  }
  if (el.nodeName === 'IMG') {
    const alt = el.getAttribute('alt');
    return (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.j)(alt !== null && alt !== void 0 ? alt : '');
  }
  if (el.nodeName === 'HR') {
    return [{
      type: 'divider',
      children: [{
        text: ''
      }]
    }];
  }
  const marks = marksFromElementAttributes(el);

  // Dropbox Paper displays blockquotes as lists for some reason
  if (el.classList.contains('listtype-quote')) {
    marks.delete('italic');
    return (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.k)(marks, () => [{
      type: 'blockquote',
      children: fixNodesForBlockChildren(deserializeNodes(el.childNodes))
    }]);
  }
  return (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.k)(marks, () => {
    const {
      nodeName
    } = el;
    if (nodeName === 'A') {
      const href = el.getAttribute('href');
      if (href) {
        return (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.l)(href, () => (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.m)('underline', () => deserializeNodes(el.childNodes)));
      }
    }
    if (nodeName === 'PRE' && el.textContent) {
      return [{
        type: 'code',
        children: [{
          text: el.textContent || ''
        }]
      }];
    }
    const deserialized = deserializeNodes(el.childNodes);
    const children = fixNodesForBlockChildren(deserialized);
    if (nodeName === 'LI') {
      let nestedList;
      const listItemContent = {
        type: 'list-item-content',
        children: children.filter(node => {
          if (nestedList === undefined && (node.type === 'ordered-list' || node.type === 'unordered-list')) {
            nestedList = node;
            return false;
          }
          return true;
        })
      };
      const listItemChildren = nestedList ? [listItemContent, nestedList] : [listItemContent];
      return [{
        type: 'list-item',
        children: listItemChildren
      }];
    }
    if (nodeName === 'P') {
      return [{
        type: 'paragraph',
        textAlign: getAlignmentFromElement(el),
        children
      }];
    }
    const headingLevel = headings[nodeName];
    if (typeof headingLevel === 'number') {
      return [{
        type: 'heading',
        level: headingLevel,
        textAlign: getAlignmentFromElement(el),
        children
      }];
    }
    if (nodeName === 'BLOCKQUOTE') {
      return [{
        type: 'blockquote',
        children
      }];
    }
    if (nodeName === 'OL') {
      return [{
        type: 'ordered-list',
        children
      }];
    }
    if (nodeName === 'UL') {
      return [{
        type: 'unordered-list',
        children
      }];
    }
    if (nodeName === 'DIV' && !(0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i)(children[0])) {
      return [{
        type: 'paragraph',
        children
      }];
    }
    return deserialized;
  });
}
function deserializeNodes(nodes) {
  const outputNodes = [];
  for (const node of nodes) {
    outputNodes.push(...deserializeHTMLNode(node));
  }
  return outputNodes;
}
function fixNodesForBlockChildren(deserializedNodes) {
  if (!deserializedNodes.length) {
    // Slate also gets unhappy if an element has no children
    // the empty text nodes will get normalized away if they're not needed
    return [{
      text: ''
    }];
  }
  if (deserializedNodes.some(_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i)) {
    const result = [];
    let queuedInlines = [];
    const flushInlines = () => {
      if (queuedInlines.length) {
        result.push({
          type: 'paragraph',
          children: queuedInlines
        });
        queuedInlines = [];
      }
    };
    for (const node of deserializedNodes) {
      if ((0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i)(node)) {
        flushInlines();
        result.push(node);
        continue;
      }
      // we want to ignore whitespace between block level elements
      // useful info about whitespace in html:
      // https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace
      if (slate__WEBPACK_IMPORTED_MODULE_86__.Node.string(node).trim() !== '') {
        queuedInlines.push(node);
      }
    }
    flushInlines();
    return result;
  }
  return deserializedNodes;
}

const markdownConfig = {
  mdastExtensions: [mdast_util_gfm_autolink_literal_from_markdown__WEBPACK_IMPORTED_MODULE_82__, mdast_util_gfm_strikethrough_from_markdown__WEBPACK_IMPORTED_MODULE_84__],
  extensions: [micromark_extension_gfm_autolink_literal__WEBPACK_IMPORTED_MODULE_83__, micromark_extension_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_85___default()()]
};
function deserializeMarkdown(markdown) {
  const root = mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_81___default()(markdown, markdownConfig);
  let nodes = root.children;
  if (nodes.length === 1 && nodes[0].type === 'paragraph') {
    nodes = nodes[0].children;
  }
  return deserializeChildren(nodes, markdown);
}
function deserializeChildren(nodes, input) {
  const outputNodes = [];
  for (const node of nodes) {
    const result = deserializeMarkdownNode(node, input);
    if (result.length) {
      outputNodes.push(...result);
    }
  }
  if (!outputNodes.length) {
    outputNodes.push({
      text: ''
    });
  }
  return outputNodes;
}
function deserializeMarkdownNode(node, input) {
  switch (node.type) {
    case 'blockquote':
      {
        return [{
          type: 'blockquote',
          children: deserializeChildren(node.children, input)
        }];
      }
    case 'link':
      {
        // arguably this could just return a link node rather than use setLinkForChildren since the children _should_ only be inlines
        // but rather than relying on the markdown parser we use being correct in this way since it isn't nicely codified in types
        // let's be safe since we already have the code to do it the safer way because of html pasting
        return (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.l)(node.url, () => deserializeChildren(node.children, input));
      }
    case 'code':
      {
        return [{
          type: 'code',
          children: [{
            text: node.value
          }]
        }];
      }
    case 'paragraph':
      {
        return [{
          type: 'paragraph',
          children: deserializeChildren(node.children, input)
        }];
      }
    case 'heading':
      {
        return [{
          type: 'heading',
          level: node.depth,
          children: deserializeChildren(node.children, input)
        }];
      }
    case 'list':
      {
        return [{
          type: node.ordered ? 'ordered-list' : 'unordered-list',
          children: deserializeChildren(node.children, input)
        }];
      }
    case 'listItem':
      {
        return [{
          type: 'list-item',
          children: deserializeChildren(node.children, input)
        }];
      }
    case 'thematicBreak':
      {
        return [{
          type: 'divider',
          children: [{
            text: ''
          }]
        }];
      }
    case 'break':
      {
        return (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.j)('\n');
      }
    case 'delete':
      {
        return (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.n)('strikethrough', () => deserializeChildren(node.children, input));
      }
    case 'strong':
      {
        return (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.n)('bold', () => deserializeChildren(node.children, input));
      }
    case 'emphasis':
      {
        return (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.n)('italic', () => deserializeChildren(node.children, input));
      }
    case 'inlineCode':
      {
        return (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.n)('code', () => (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.j)(node.value));
      }
    case 'text':
      {
        return (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.j)(node.value);
      }
  }
  return (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.j)(input.slice(node.position.start.offset, node.position.end.offset));
}

const urlPattern = /https?:\/\//;
function insertFragmentButDifferent(editor, nodes) {
  if ((0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i)(nodes[0])) {
    (0,_ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__.i)(editor, nodes);
  } else {
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.insertFragment(editor, nodes);
  }
}
const clipboardFormatKey = 'x-keystatic-fragment';
const getDefaultView = value => {
  return value && value.ownerDocument && value.ownerDocument.defaultView || null;
};
const isDOMNode = value => {
  const window = getDefaultView(value);
  return !!window && value instanceof window.Node;
};
const isDOMText = value => {
  return isDOMNode(value) && value.nodeType === 3;
};
const isDOMElement = value => {
  return isDOMNode(value) && value.nodeType === 1;
};
const getPlainText = domNode => {
  let text = '';
  if (isDOMText(domNode) && domNode.nodeValue) {
    return domNode.nodeValue;
  }
  if (isDOMElement(domNode)) {
    for (const childNode of Array.from(domNode.childNodes)) {
      text += getPlainText(childNode);
    }
    const display = getComputedStyle(domNode).getPropertyValue('display');
    if (display === 'block' || display === 'list' || domNode.tagName === 'BR') {
      text += '\n';
    }
  }
  return text;
};
function setFragmentData(e, data) {
  const {
    selection
  } = e;
  if (!selection) {
    return;
  }
  const [start, end] = slate__WEBPACK_IMPORTED_MODULE_86__.Range.edges(selection);
  const startVoid = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.void(e, {
    at: start.path
  });
  const endVoid = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.void(e, {
    at: end.path
  });
  if (slate__WEBPACK_IMPORTED_MODULE_86__.Range.isCollapsed(selection) && !startVoid) {
    return;
  }

  // Create a fake selection so that we can add a Base64-encoded copy of the
  // fragment to the HTML, to decode on future pastes.
  const domRange = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.toDOMRange(e, selection);
  let contents = domRange.cloneContents();
  let attach = contents.childNodes[0];

  // Make sure attach is non-empty, since empty nodes will not get copied.
  contents.childNodes.forEach(node => {
    if (node.textContent && node.textContent.trim() !== '') {
      attach = node;
    }
  });

  // COMPAT: If the end node is a void node, we need to move the end of the
  // range from the void node's spacer span, to the end of the void node's
  // content, since the spacer is before void's content in the DOM.
  if (endVoid) {
    const [voidNode] = endVoid;
    const r = domRange.cloneRange();
    const domNode = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.toDOMNode(e, voidNode);
    r.setEndAfter(domNode);
    contents = r.cloneContents();
  }

  // COMPAT: If the start node is a void node, we need to attach the encoded
  // fragment to the void node's content node instead of the spacer, because
  // attaching it to empty `<div>/<span>` nodes will end up having it erased by
  // most browsers. (2018/04/27)
  if (startVoid) {
    attach = contents.querySelector('[data-slate-spacer]');
  }

  // Remove any zero-width space spans from the cloned DOM so that they don't
  // show up elsewhere when pasted.
  Array.from(contents.querySelectorAll('[data-slate-zero-width]')).forEach(zw => {
    const isNewline = zw.getAttribute('data-slate-zero-width') === 'n';
    zw.textContent = isNewline ? '\n' : '';
  });

  // Set a `data-slate-fragment` attribute on a non-empty node, so it shows up
  // in the HTML, and can be used for intra-Slate pasting. If it's a text
  // node, wrap it in a `<span>` so we have something to set an attribute on.
  if (isDOMText(attach)) {
    const span = attach.ownerDocument.createElement('span');
    // COMPAT: In Chrome and Safari, if we don't add the `white-space` style
    // then leading and trailing spaces will be ignored. (2017/09/21)
    span.style.whiteSpace = 'pre';
    span.appendChild(attach);
    contents.appendChild(span);
    attach = span;
  }
  const fragment = e.getFragment();
  const string = JSON.stringify(fragment, (key, val) => {
    if (val instanceof Uint8Array) {
      return {
        [bytesName]: (0,js_base64__WEBPACK_IMPORTED_MODULE_94__/* .fromUint8Array */ .kZ)(val)
      };
    }
    return val;
  });
  const encoded = window.btoa(encodeURIComponent(string));
  attach.setAttribute('data-keystatic-fragment', encoded);
  data.setData(`application/${clipboardFormatKey}`, encoded);

  // Add the content to a <div> so that we can get its inner HTML.
  const div = contents.ownerDocument.createElement('div');
  div.appendChild(contents);
  div.setAttribute('hidden', 'true');
  contents.ownerDocument.body.appendChild(div);
  data.setData('text/html', div.innerHTML);
  data.setData('text/plain', getPlainText(div));
  contents.ownerDocument.body.removeChild(div);
}
const catchSlateFragment = /data-keystatic-fragment="(.+?)"/m;
const getSlateFragmentAttribute = dataTransfer => {
  const htmlData = dataTransfer.getData('text/html');
  const [, fragment] = htmlData.match(catchSlateFragment) || [];
  return fragment;
};
const bytesName = '$$keystaticUint8Array$$';
function withPasting(editor) {
  const {
    insertTextData
  } = editor;
  editor.setFragmentData = data => {
    setFragmentData(editor, data);
  };
  editor.insertFragmentData = data => {
    /**
     * Checking copied fragment from application/x-slate-fragment or data-slate-fragment
     */
    const fragment = data.getData(`application/${clipboardFormatKey}`) || getSlateFragmentAttribute(data);
    if (fragment) {
      const decoded = decodeURIComponent(window.atob(fragment));
      const parsed = JSON.parse(decoded, (key, val) => typeof val === 'object' && val !== null && bytesName in val && typeof val[bytesName] === 'string' ? (0,js_base64__WEBPACK_IMPORTED_MODULE_94__/* .toUint8Array */ ._f)(val[bytesName]) : val);
      editor.insertFragment(parsed);
      return true;
    }
    return false;
  };
  editor.insertTextData = data => {
    const blockAbove = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
      match: _utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i
    });
    if ((blockAbove === null || blockAbove === void 0 ? void 0 : blockAbove[0].type) === 'code') {
      const plain = data.getData('text/plain');
      editor.insertText(plain);
      return true;
    }
    let vsCodeEditorData = data.getData('vscode-editor-data');
    if (vsCodeEditorData) {
      try {
        const vsCodeData = JSON.parse(vsCodeEditorData);
        if ((vsCodeData === null || vsCodeData === void 0 ? void 0 : vsCodeData.mode) === 'markdown' || (vsCodeData === null || vsCodeData === void 0 ? void 0 : vsCodeData.mode) === 'mdx') {
          const plain = data.getData('text/plain');
          if (plain) {
            const fragment = deserializeMarkdown(plain);
            insertFragmentButDifferent(editor, fragment);
            return true;
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    const plain = data.getData('text/plain');
    if (
    // isValidURL is a bit more permissive than a user might expect
    // so for pasting, we'll constrain it to starting with https:// or http://
    urlPattern.test(plain) && (0,_isValidURL_02af2848_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_21__.i)(plain) && editor.selection && !slate__WEBPACK_IMPORTED_MODULE_86__.Range.isCollapsed(editor.selection) &&
    // we only want to turn the selected text into a link if the selection is within the same block
    slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
      match: node => (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i)(node) && !(0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i)(node.children[0])
    }) &&
    // and there is only text(potentially with marks) in the selection
    // no other links
    slate__WEBPACK_IMPORTED_MODULE_86__.Editor.nodes(editor, {
      match: node => node.type === 'link'
    }).next().done) {
      slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.wrapNodes(editor, {
        type: 'link',
        href: plain,
        children: []
      }, {
        split: true
      });
      return true;
    }
    const html = data.getData('text/html');
    if (html) {
      const fragment = deserializeHTML(html);
      insertFragmentButDifferent(editor, fragment);
      return true;
    }
    if (plain) {
      const fragment = deserializeMarkdown(plain);
      insertFragmentButDifferent(editor, fragment);
      return true;
    }
    return insertTextData(data);
  };
  return editor;
}

const shortcuts = {
  '...': '…',
  '-->': '→',
  '->': '→',
  '<-': '←',
  '<--': '←',
  '--': '–'
};
function withShortcuts(editor) {
  const {
    insertText
  } = editor;
  editor.insertText = text => {
    insertText(text);
    if (text === ' ' && editor.selection && slate__WEBPACK_IMPORTED_MODULE_86__.Range.isCollapsed(editor.selection)) {
      const selectionPoint = editor.selection.anchor;
      const ancestorBlock = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
        match: _utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i
      });
      if (ancestorBlock) {
        Object.keys(shortcuts).forEach(shortcut => {
          const pointBefore = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.before(editor, selectionPoint, {
            unit: 'character',
            distance: shortcut.length + 1
          });
          if (pointBefore && slate__WEBPACK_IMPORTED_MODULE_86__.Path.isDescendant(pointBefore.path, ancestorBlock[1])) {
            const range = {
              anchor: selectionPoint,
              focus: pointBefore
            };
            const str = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.string(editor, range);
            if (str.slice(0, shortcut.length) === shortcut) {
              editor.history.undos.push({
                operations: [],
                selectionBefore: editor.selection
              });
              slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.select(editor, range);
              editor.insertText(shortcuts[shortcut] + ' ');
            }
          }
        });
      }
    }
  };
  return editor;
}

function withSoftBreaks(editor) {
  // TODO: should soft breaks only work in particular places
  editor.insertSoftBreak = () => {
    slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.insertText(editor, '\n');
  };
  return editor;
}

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline'
};
function isMarkActive(editor, mark) {
  const marks = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.marks(editor);
  if (marks !== null && marks !== void 0 && marks[mark]) {
    return true;
  }
  // see the stuff about marks in toolbar-state for why this is here
  for (const entry of slate__WEBPACK_IMPORTED_MODULE_86__.Editor.nodes(editor, {
    match: slate__WEBPACK_IMPORTED_MODULE_86__.Text.isText
  })) {
    if (entry[0][mark]) {
      return true;
    }
  }
  return false;
}
const arrowKeyToDirection = new Map([['ArrowUp', 'up'], ['ArrowDown', 'down'], ['ArrowLeft', 'left'], ['ArrowRight', 'right']]);
const getKeyDownHandler = (editor, documentFeatures) => event => {
  if (event.defaultPrevented) return;
  for (const hotkey in HOTKEYS) {
    if (documentFeatures.formatting.inlineMarks[HOTKEYS[hotkey]] && (0,is_hotkey__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP)(hotkey, event.nativeEvent)) {
      event.preventDefault();
      const mark = HOTKEYS[hotkey];
      const isActive = isMarkActive(editor, mark);
      if (isActive) {
        slate__WEBPACK_IMPORTED_MODULE_86__.Editor.removeMark(editor, mark);
      } else {
        slate__WEBPACK_IMPORTED_MODULE_86__.Editor.addMark(editor, mark, true);
      }
      return;
    }
  }
  if ((0,is_hotkey__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP)('mod+\\', event.nativeEvent)) {
    (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.h)(editor);
    return;
  }
  if (documentFeatures.links && (0,is_hotkey__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP)('mod+k', event.nativeEvent)) {
    event.preventDefault();
    wrapLink(editor, '');
    return;
  }
  if (event.key === 'Tab') {
    const didAction = event.shiftKey ? unnestList(editor) : nestList(editor);
    if (didAction) {
      event.preventDefault();
      return;
    }
  }
  if (event.key === 'Tab' && editor.selection) {
    const layoutArea = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
      match: node => node.type === 'layout-area' || node.type === 'table-cell'
    });
    if (layoutArea) {
      const layoutAreaToEnter = event.shiftKey ? slate__WEBPACK_IMPORTED_MODULE_86__.Editor.before(editor, layoutArea[1], {
        unit: 'block'
      }) : slate__WEBPACK_IMPORTED_MODULE_86__.Editor.after(editor, layoutArea[1], {
        unit: 'block'
      });
      slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.setSelection(editor, {
        anchor: layoutAreaToEnter,
        focus: layoutAreaToEnter
      });
      event.preventDefault();
    }
  }
  if ((0,is_hotkey__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP)('mod+a', event)) {
    const parentTable = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
      match: (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.n)('table')
    });
    if (parentTable) {
      slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.select(editor, parentTable[1]);
      event.preventDefault();
      return;
    }
  }
  const direction = arrowKeyToDirection.get(event.key);
  const {
    selection
  } = editor;
  if (direction && selection) {
    const selectedTableArea = (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__.c)(editor);
    if (selectedTableArea) {
      var _Editor$above, _Editor$above2;
      const focusCellPath = (_Editor$above = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
        match: (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.n)('table-cell'),
        at: selection.focus.path
      })) === null || _Editor$above === void 0 ? void 0 : _Editor$above[1];
      const anchorCellPath = (_Editor$above2 = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
        match: (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.n)('table-cell'),
        at: selection.anchor.path
      })) === null || _Editor$above2 === void 0 ? void 0 : _Editor$above2[1];
      if (!focusCellPath || !anchorCellPath) return;
      const newCellPath = getCellPathInDirection(editor, focusCellPath, direction);
      if (newCellPath) {
        if (selectedTableArea.singleCell === 'not-selected') {
          if (direction !== 'up' && direction !== 'down') return;
          const [node, offset] = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.toDOMPoint(editor, selection.focus);
          const blockElement = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.above(editor, {
            match: _utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.i,
            at: selection.focus.path
          });
          if (!blockElement) return;
          if (direction === 'up' && blockElement[1].slice(focusCellPath.length).some(idx => idx !== 0)) {
            return;
          }
          if (direction === 'down') {
            const [parentNode] = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.parent(editor, blockElement[1]);
            if (parentNode.children.length - 1 !== blockElement[1][blockElement[1].length - 1]) {
              return;
            }
            for (const [node, path] of slate__WEBPACK_IMPORTED_MODULE_86__.Node.ancestors(editor, blockElement[1], {
              reverse: true
            })) {
              if (node.type === 'table-cell') break;
              const [parentNode] = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.parent(editor, path);
              if (parentNode.children.length - 1 === path[path.length - 1]) {
                continue;
              }
              return;
            }
          }
          const domNodeForBlockElement = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.toDOMNode(editor, blockElement[0]);
          const rangeOfWholeBlock = document.createRange();
          rangeOfWholeBlock.selectNodeContents(domNodeForBlockElement);
          const rectsOfRangeOfWholeBlock = Array.from(rangeOfWholeBlock.getClientRects());
          const newRange = document.createRange();
          newRange.setStart(node, offset);
          newRange.setEnd(node, offset);
          const rangeRects = Array.from(newRange.getClientRects());
          const lastRangeRect = rangeRects[rangeRects.length - 1];
          const key = direction === 'up' ? 'top' : 'bottom';
          const expected = key === 'top' ? Math.min(...rectsOfRangeOfWholeBlock.map(x => x.top)) : Math.max(...rectsOfRangeOfWholeBlock.map(x => x.bottom));
          if (lastRangeRect[key] === expected) {
            const focus = slate__WEBPACK_IMPORTED_MODULE_86__.Editor[direction === 'up' ? 'end' : 'start'](editor, newCellPath);
            slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.select(editor, {
              focus,
              anchor: event.shiftKey ? selection.anchor : focus
            });
            event.preventDefault();
          }
          return;
        }
        if (!event.shiftKey) return;
        if (slate__WEBPACK_IMPORTED_MODULE_86__.Path.equals(newCellPath, anchorCellPath)) {
          slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.select(editor, newCellPath);
        } else {
          slate__WEBPACK_IMPORTED_MODULE_86__.Transforms.select(editor, {
            anchor: selection.anchor,
            focus: slate__WEBPACK_IMPORTED_MODULE_86__.Editor.start(editor, newCellPath)
          });
        }
        event.preventDefault();
      }
    }
  }
};
function createDocumentEditor(documentFeatures, componentBlocks) {
  return withPasting(withImages(withSoftBreaks(withInsertMenu(withShortcuts(withHeading(withBlockquote(withMarks(documentFeatures, componentBlocks, withBlockMarkdownShortcuts(documentFeatures, componentBlocks, (0,_index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__._)((0,slate_history__WEBPACK_IMPORTED_MODULE_95__/* .withHistory */ .VC)((0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .withReact */ .BU)((0,slate__WEBPACK_IMPORTED_MODULE_86__.createEditor)())), documentFeatures, componentBlocks))))))))));
}
function DocumentEditor(_ref) {
  let {
    onChange,
    value,
    componentBlocks,
    documentFeatures,
    ...props
  } = _ref;
  const editor = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => createDocumentEditor(documentFeatures, componentBlocks), [documentFeatures, componentBlocks]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Box */ .xu, {
    backgroundColor: "canvas",
    border: "neutral",
    borderRadius: "medium",
    minWidth: 0,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsxs)(DocumentEditorProvider, {
      componentBlocks: componentBlocks,
      documentFeatures: documentFeatures,
      editor: editor,
      value: value,
      onChange: value => {
        onChange === null || onChange === void 0 ? void 0 : onChange(value);
        // this fixes a strange issue in Safari where the selection stays inside of the editor
        // after a blur event happens but the selection is still in the editor
        // so the cursor is visually in the wrong place and it inserts text backwards
        const selection = window.getSelection();
        if (selection && !slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.isFocused(editor)) {
          const editorNode = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.toDOMNode(editor, editor);
          if (selection.anchorNode === editorNode) {
            slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.focus(editor);
          }
        }
      },
      children: [(0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => onChange !== undefined && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(Toolbar, {
        documentFeatures: documentFeatures
      }), [documentFeatures, onChange]), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(DocumentEditorEditable, {
        id: "document-editor-boundary",
        ...props,
        readOnly: onChange === undefined
      }),
      // for debugging
      false ]
    })
  });
}
const IsInEditorContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(false);
function useIsInDocumentEditor() {
  return (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(IsInEditorContext);
}
function DocumentEditorProvider(_ref2) {
  let {
    children,
    editor,
    onChange,
    value,
    componentBlocks,
    documentFeatures
  } = _ref2;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const identity = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => Math.random().toString(36), [editor]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(IsInEditorContext.Provider, {
    value: true,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(slate_react__WEBPACK_IMPORTED_MODULE_87__/* .Slate */ .mH
    // this fixes issues with Slate crashing when a fast refresh occcurs
    , {
      editor: editor,
      value: value,
      onChange: value => {
        onChange(value);
        // this fixes a strange issue in Safari where the selection stays inside of the editor
        // after a blur event happens but the selection is still in the editor
        // so the cursor is visually in the wrong place and it inserts text backwards
        const selection = window.getSelection();
        if (selection && !slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.isFocused(editor)) {
          const editorNode = slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.toDOMNode(editor, editor);
          if (selection.anchorNode === editorNode) {
            slate_react__WEBPACK_IMPORTED_MODULE_87__/* .ReactEditor */ .F3.focus(editor);
          }
        }
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(TableSelectionProvider, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(ToolbarStateProvider, {
          componentBlocks: componentBlocks,
          editorDocumentFeatures: documentFeatures,
          children: children
        })
      })
    }, identity)
  });
}
function getPrismTokenLength(token) {
  if (typeof token === 'string') {
    return token.length;
  } else if (Array.isArray(token.content)) {
    return token.content.reduce((l, t) => l + getPrismTokenLength(t), 0);
  } else {
    return getPrismTokenLength(token.content);
  }
}
function DocumentEditorEditable(props) {
  const editor = (0,slate_react__WEBPACK_IMPORTED_MODULE_87__/* .useSlate */ .ui)();
  const {
    componentBlocks,
    documentFeatures
  } = useDocumentEditorConfig();
  const onKeyDown = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => getKeyDownHandler(editor, documentFeatures), [editor, documentFeatures]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(_index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__.ActiveBlockPopoverProvider, {
    editor: editor,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_20__.jsx)(slate_react__WEBPACK_IMPORTED_MODULE_87__/* .Editable */ .CX, {
      decorate: (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(_ref3 => {
        let [node, path] = _ref3;
        let decorations = [];
        if (node.type === 'component-block') {
          if (node.children.length === 1 && slate__WEBPACK_IMPORTED_MODULE_86__.Element.isElement(node.children[0]) && node.children[0].type === 'component-inline-prop' && node.children[0].propPath === undefined) {
            return decorations;
          }
          node.children.forEach((child, index) => {
            if (slate__WEBPACK_IMPORTED_MODULE_86__.Node.string(child) === '' && slate__WEBPACK_IMPORTED_MODULE_86__.Element.isElement(child) && (child.type === 'component-block-prop' || child.type === 'component-inline-prop') && child.propPath !== undefined) {
              const start = slate__WEBPACK_IMPORTED_MODULE_86__.Editor.start(editor, [...path, index]);
              const placeholder = (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__.j)(child.propPath, componentBlocks[node.component].schema, node.props);
              if (placeholder) {
                decorations.push({
                  placeholder,
                  anchor: start,
                  focus: start
                });
              }
            }
          });
        }
        if (node.type === 'code' && node.children.length === 1 && node.children[0].type === undefined && node.language && node.language in _prism_e4e5bc8f_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_0__.P.languages) {
          const textPath = [...path, 0];
          const tokens = _prism_e4e5bc8f_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_0__.P.tokenize(node.children[0].text, _prism_e4e5bc8f_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_0__.P.languages[node.language]);
          function consumeTokens(start, tokens) {
            for (const token of tokens) {
              const length = getPrismTokenLength(token);
              const end = start + length;
              if (typeof token !== 'string') {
                decorations.push({
                  ['prism_' + token.type]: true,
                  anchor: {
                    path: textPath,
                    offset: start
                  },
                  focus: {
                    path: textPath,
                    offset: end
                  }
                });
                consumeTokens(start, Array.isArray(token.content) ? token.content : [token.content]);
              }
              start = end;
            }
          }
          consumeTokens(0, tokens);
        }
        return decorations;
      }, [editor, componentBlocks]),
      onKeyDown: onKeyDown,
      renderElement: renderElement,
      renderLeaf: renderLeaf,
      ...props,
      className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .classNames */ .AK)(editableStyles, props.className)
    })
  });
}
const orderedListStyles = ['lower-roman', 'decimal', 'lower-alpha'];
const unorderedListStyles = ['square', 'disc', 'circle'];
let styles = {
  color: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.foreground.neutral,
  flex: 1,
  fontFamily: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.typography.fontFamily.base,
  fontSize: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.fontsize.text.regular.size,
  height: 'auto',
  lineHeight: 1.4,
  minHeight: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.size.scale[2000],
  minWidth: 0,
  padding: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.size.space.medium,
  // antialiased editor text, to match the rest of the app
  MozOsxFontSmoothing: 'grayscale',
  WebkitFontSmoothing: 'antialiased'
};
let listDepth = 10;
while (listDepth--) {
  let arr = Array.from({
    length: listDepth
  });
  if (arr.length) {
    styles[arr.map(() => `ol`).join(' ')] = {
      listStyle: orderedListStyles[listDepth % 3]
    };
    styles[arr.map(() => `ul`).join(' ')] = {
      listStyle: unorderedListStyles[listDepth % 3]
    };
  }
}
const editableStyles = (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .css */ .iv)({
  ...styles,
  a: {
    color: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_4__/* .tokenSchema */ .iK.color.foreground.accent
  }
});




/***/ }),

/***/ 92788:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActiveBlockPopoverProvider: () => (/* binding */ ActiveBlockPopoverProvider),
/* harmony export */   BlockPopover: () => (/* binding */ BlockPopover),
/* harmony export */   BlockPopoverTrigger: () => (/* binding */ BlockPopoverTrigger),
/* harmony export */   BlockWrapper: () => (/* binding */ BlockWrapper),
/* harmony export */   NotEditable: () => (/* binding */ NotEditable),
/* harmony export */   ToolbarSeparator: () => (/* binding */ ToolbarSeparator),
/* harmony export */   useActiveBlockPopover: () => (/* binding */ useActiveBlockPopover)
/* harmony export */ });
/* harmony import */ var _react_aria_overlays__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(43622);
/* harmony import */ var _react_aria_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(41933);
/* harmony import */ var _react_stately_overlays__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(57817);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var slate__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(91526);
/* harmony import */ var _keystar_ui_overlays__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(52743);
/* harmony import */ var _keystar_ui_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46792);
/* harmony import */ var _utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(82101);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(54085);
/* harmony import */ var _keystar_ui_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9772);
/* harmony import */ var emery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(85916);
'use client';














const BlockPopoverContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);
function useBlockPopoverContext() {
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(BlockPopoverContext);
  if (!context) {
    throw new Error('useBlockPopoverContext must be used within a BlockPopoverTrigger');
  }
  return context;
}
const typeMatcher = (0,_utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_3__.n)('code', 'component-block', 'image', 'layout', 'link', 'table', 'heading');
const ActiveBlockPopoverContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);
function useActiveBlockPopover() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(ActiveBlockPopoverContext);
}
function ActiveBlockPopoverProvider(props) {
  const nodeWithPopover = slate__WEBPACK_IMPORTED_MODULE_8__.Editor.above(props.editor, {
    match: typeMatcher
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(ActiveBlockPopoverContext.Provider, {
    value: nodeWithPopover === null || nodeWithPopover === void 0 ? void 0 : nodeWithPopover[0],
    children: props.children
  });
}
const BlockPopoverTrigger = _ref => {
  let {
    children,
    element
  } = _ref;
  const [trigger, popover] = children;
  const activePopoverElement = useActiveBlockPopover();
  const triggerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const state = (0,_react_stately_overlays__WEBPACK_IMPORTED_MODULE_9__/* .useOverlayTriggerState */ .d)({
    isOpen: activePopoverElement === element
  });
  const context = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => ({
    state,
    triggerRef
  }), [state, triggerRef]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(BlockPopoverContext.Provider, {
    value: context,
    children: [/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(trigger, {
      ref: triggerRef
    }), popover]
  });
};
function BlockPopover(props) {
  const {
    state
  } = useBlockPopoverContext();
  let wrapperRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  return (
    /*#__PURE__*/
    /* @ts-expect-error FIXME: resolve ref inconsistencies */
    (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_keystar_ui_overlays__WEBPACK_IMPORTED_MODULE_1__/* .Overlay */ .aV, {
      isOpen: state.isOpen,
      nodeRef: wrapperRef,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(BlockPopoverWrapper, {
        wrapperRef: wrapperRef,
        ...props
      })
    })
  );
}
const BlockPopoverWrapper = _ref2 => {
  let {
    children,
    placement: preferredPlacement = 'bottom'
  } = _ref2;
  let popoverRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  let {
    state,
    triggerRef
  } = useBlockPopoverContext();
  let {
    placement,
    popoverProps
  } = useBlockPopover({
    isNonModal: true,
    isKeyboardDismissDisabled: false,
    placement: preferredPlacement,
    triggerRef,
    popoverRef
  }, state);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
    ref: popoverRef,
    ...popoverProps,
    "data-open": state.isOpen,
    "data-placement": placement,
    contentEditable: false,
    className: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_2__/* .css */ .iv)({
      backgroundColor: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_2__/* .tokenSchema */ .iK.color.background.surface,
      // TODO: component token?
      borderRadius: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_2__/* .tokenSchema */ .iK.size.radius.medium,
      // TODO: component token?
      border: `${_keystar_ui_style__WEBPACK_IMPORTED_MODULE_2__/* .tokenSchema */ .iK.size.border.regular} solid ${_keystar_ui_style__WEBPACK_IMPORTED_MODULE_2__/* .tokenSchema */ .iK.color.border.emphasis}`,
      boxSizing: 'content-box',
      // resolves measurement/scroll issues related to border
      // boxShadow: `0 0 0 ${tokenSchema.size.border.regular} ${tokenSchema.color.border.emphasis}`,
      minHeight: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_2__/* .tokenSchema */ .iK.size.element.regular,
      minWidth: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_2__/* .tokenSchema */ .iK.size.element.regular,
      opacity: 0,
      outline: 0,
      pointerEvents: 'auto',
      position: 'absolute',
      // use filter:drop-shadow instead of box-shadow so the arrow is included
      filter: `drop-shadow(0 1px 4px ${_keystar_ui_style__WEBPACK_IMPORTED_MODULE_2__/* .tokenSchema */ .iK.color.shadow.regular})`,
      // filter bug in safari: https://stackoverflow.com/questions/56478925/safari-drop-shadow-filter-remains-visible-even-with-hidden-element
      willChange: 'filter',
      userSelect: 'none',
      // placement
      '&[data-placement="top"]': {
        marginBottom: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_2__/* .tokenSchema */ .iK.size.space.regular,
        transform: `translateY(${_keystar_ui_style__WEBPACK_IMPORTED_MODULE_2__/* .tokenSchema */ .iK.size.space.regular})`
      },
      '&[data-placement="bottom"]': {
        marginTop: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_2__/* .tokenSchema */ .iK.size.space.regular,
        transform: `translateY(calc(${_keystar_ui_style__WEBPACK_IMPORTED_MODULE_2__/* .tokenSchema */ .iK.size.space.regular} * -1))`
      },
      '&[data-open="true"]': {
        opacity: 1,
        transform: `translateX(0) translateY(0)`,
        // enter animation
        transition: (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_2__/* .transition */ .eR)(['opacity', 'transform'], {
          easing: 'easeOut'
        })
      }
    }),
    children: typeof children === 'function' ? children(state.close) : children
  });
};

/**
 * Provides the behavior and accessibility implementation for a popover component.
 * A popover is an overlay element positioned relative to a trigger.
 */
function useBlockPopover(props, state) {
  var _triggerRef$current2;
  let {
    triggerRef,
    popoverRef,
    isNonModal,
    isKeyboardDismissDisabled,
    ...otherProps
  } = props;
  let [isSticky, setSticky] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  let {
    overlayProps,
    underlayProps
  } = (0,_react_aria_overlays__WEBPACK_IMPORTED_MODULE_10__/* .useOverlay */ .Ir)({
    isOpen: state.isOpen,
    onClose: state.close,
    shouldCloseOnBlur: true,
    isDismissable: !isNonModal,
    isKeyboardDismissDisabled: false
  }, popoverRef);

  // stick the popover to the bottom of the viewport instead of flipping
  const containerPadding = 8;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (state.isOpen) {
      const checkForStickiness = () => {
        var _popoverRef$current, _triggerRef$current;
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        let popoverRect = (_popoverRef$current = popoverRef.current) === null || _popoverRef$current === void 0 ? void 0 : _popoverRef$current.getBoundingClientRect();
        let triggerRect = (_triggerRef$current = triggerRef.current) === null || _triggerRef$current === void 0 ? void 0 : _triggerRef$current.getBoundingClientRect();
        if (popoverRect && triggerRect) {
          setSticky(triggerRect.bottom + popoverRect.height + containerPadding * 2 > vh && triggerRect.top < vh);
        }
      };
      checkForStickiness();
      window.addEventListener('scroll', checkForStickiness);
      return () => {
        checkForStickiness();
        window.removeEventListener('scroll', checkForStickiness);
      };
    }
  }, [popoverRef, triggerRef, state.isOpen]);
  let {
    overlayProps: positionProps,
    arrowProps,
    placement,
    updatePosition
  } = (0,_react_aria_overlays__WEBPACK_IMPORTED_MODULE_10__/* .useOverlayPosition */ .tN)({
    ...otherProps,
    containerPadding,
    shouldFlip: false,
    targetRef: triggerRef,
    overlayRef: popoverRef,
    isOpen: state.isOpen,
    onClose: undefined
  });

  // force update position when the trigger changes
  let previousBoundingRect = usePrevious((_triggerRef$current2 = triggerRef.current) === null || _triggerRef$current2 === void 0 ? void 0 : _triggerRef$current2.getBoundingClientRect());
  (0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_11__/* .useLayoutEffect */ .bt)(() => {
    if (previousBoundingRect) {
      var _triggerRef$current3;
      const currentBoundingRect = (_triggerRef$current3 = triggerRef.current) === null || _triggerRef$current3 === void 0 ? void 0 : _triggerRef$current3.getBoundingClientRect();
      if (currentBoundingRect) {
        const hasChanged = previousBoundingRect.height !== currentBoundingRect.height || previousBoundingRect.width !== currentBoundingRect.width || previousBoundingRect.x !== currentBoundingRect.x || previousBoundingRect.y !== currentBoundingRect.y;
        if (hasChanged) {
          updatePosition();
        }
      }
    }
  }, [previousBoundingRect, triggerRef, updatePosition]);

  // make sure popovers are below modal dialogs and their blanket
  if (positionProps.style) {
    positionProps.style.zIndex = 1;
  }

  // switching to position: fixed will undoubtedly bite me later, but this hack works for now
  if (isSticky) {
    positionProps.style = {
      ...positionProps.style,
      // @ts-expect-error
      maxHeight: null,
      position: 'fixed',
      // @ts-expect-error
      top: null,
      bottom: containerPadding
    };
  }
  return {
    arrowProps,
    placement,
    popoverProps: (0,_react_aria_utils__WEBPACK_IMPORTED_MODULE_11__/* .mergeProps */ .dG)(overlayProps, positionProps),
    underlayProps,
    updatePosition
  };
}
function usePrevious(value) {
  const ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    ref.current = value;
  });
  return ref.current;
}

const BlockWrapper = props => {
  let {
    attributes,
    children,
    draggable = false
  } = props;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
    draggable: draggable,
    className: _ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_5__.b,
    ...attributes,
    children: children
  });
};

const NotEditable = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(function NotEditable(_ref, ref) {
  let {
    className,
    ...props
  } = _ref;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
    ...props,
    ref: ref,
    className: [(0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_2__/* .css */ .iv)({
      userSelect: 'none',
      whiteSpace: 'initial'
    }), className].join(' '),
    contentEditable: false
  });
});

const ToolbarSeparator = () => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_6__/* .Divider */ .iz, {
    orientation: "vertical",
    flexShrink: 0
  });
};




/***/ }),

/***/ 17181:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ getKeysForArrayValue),
/* harmony export */   b: () => (/* binding */ getInitialPropsValueFromInitializer),
/* harmony export */   c: () => (/* binding */ getNewArrayElementKey),
/* harmony export */   g: () => (/* binding */ getInitialPropsValue),
/* harmony export */   s: () => (/* binding */ setKeysForArrayValue),
/* harmony export */   u: () => (/* binding */ updateValue)
/* harmony export */ });
/* harmony import */ var emery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85916);


const arrayValuesToElementKeys = new WeakMap();
let counter = 0;
function getKeysForArrayValue(value) {
  if (!arrayValuesToElementKeys.has(value)) {
    arrayValuesToElementKeys.set(value, Array.from({
      length: value.length
    }, getNewArrayElementKey));
  }
  return arrayValuesToElementKeys.get(value);
}
function setKeysForArrayValue(value, elementIds) {
  arrayValuesToElementKeys.set(value, elementIds);
}
function getNewArrayElementKey() {
  return (counter++).toString();
}
const getInitialPropsValue = _getInitialPropsValue;
function _getInitialPropsValue(schema) {
  switch (schema.kind) {
    case 'form':
      return schema.defaultValue();
    case 'child':
      return null;
    case 'conditional':
      {
        const defaultValue = schema.discriminant.defaultValue();
        return {
          discriminant: defaultValue,
          value: getInitialPropsValue(schema.values[defaultValue.toString()])
        };
      }
    case 'object':
      {
        const obj = {};
        for (const key of Object.keys(schema.fields)) {
          obj[key] = getInitialPropsValue(schema.fields[key]);
        }
        return obj;
      }
    case 'array':
      {
        return [];
      }
  }
  (0,emery__WEBPACK_IMPORTED_MODULE_0__.assertNever)(schema);
}
function getInitialPropsValueFromInitializer(schema, initializer) {
  switch (schema.kind) {
    case 'form':
      return initializer === undefined ? schema.defaultValue() : initializer;
    case 'child':
      return null;
    case 'conditional':
      {
        const defaultValue = initializer === undefined ? schema.discriminant.defaultValue() : initializer.discriminant;
        return {
          discriminant: defaultValue,
          value: getInitialPropsValueFromInitializer(schema.values[defaultValue.toString()], initializer === undefined ? undefined : initializer.value)
        };
      }
    case 'object':
      {
        const obj = {};
        for (const key of Object.keys(schema.fields)) {
          obj[key] = getInitialPropsValueFromInitializer(schema.fields[key], initializer === undefined ? undefined : initializer[key]);
        }
        return obj;
      }
    case 'array':
      {
        return (initializer !== null && initializer !== void 0 ? initializer : []).map(x => getInitialPropsValueFromInitializer(schema.element, x.value));
      }
  }
  (0,emery__WEBPACK_IMPORTED_MODULE_0__.assertNever)(schema);
}
function updateValue(schema, currentValue, updater) {
  if (updater === undefined) return currentValue;
  switch (schema.kind) {
    case 'form':
      return updater;
    case 'child':
      return null;
    case 'conditional':
      {
        return {
          discriminant: updater.discriminant,
          value: updater.discriminant === currentValue.discriminant ? updateValue(schema.values[updater.discriminant.toString()], currentValue.value, updater.value) : getInitialPropsValueFromInitializer(schema.values[updater.discriminant.toString()], updater.value)
        };
      }
    case 'object':
      {
        const obj = {};
        for (const key of Object.keys(schema.fields)) {
          obj[key] = updateValue(schema.fields[key], currentValue[key], updater[key]);
        }
        return obj;
      }
    case 'array':
      {
        const currentArrVal = currentValue;
        const newVal = updater;
        const uniqueKeys = new Set();
        for (const x of newVal) {
          if (x.key !== undefined) {
            if (uniqueKeys.has(x.key)) {
              throw new Error('Array elements must have unique keys');
            }
            uniqueKeys.add(x.key);
          }
        }
        const keys = newVal.map(x => {
          if (x.key !== undefined) return x.key;
          let elementKey = getNewArrayElementKey();
          // just in case someone gives a key that is above our counter
          while (uniqueKeys.has(elementKey)) {
            elementKey = getNewArrayElementKey();
          }
          uniqueKeys.add(elementKey);
          return elementKey;
        });
        const prevKeys = getKeysForArrayValue(currentArrVal);
        const prevValuesByKey = new Map(currentArrVal.map((value, i) => {
          return [prevKeys[i], value];
        }));
        const val = newVal.map((x, i) => {
          const id = keys[i];
          if (prevValuesByKey.has(id)) {
            return updateValue(schema.element, prevValuesByKey.get(id), x.value);
          }
          return getInitialPropsValueFromInitializer(schema.element, x.value);
        });
        setKeysForArrayValue(val, keys);
        return val;
      }
  }
  (0,emery__WEBPACK_IMPORTED_MODULE_0__.assertNever)(schema);
}




/***/ }),

/***/ 1988:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ isValidURL)
/* harmony export */ });
/* harmony import */ var _braintree_sanitize_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19047);


function isValidURL(url) {
  return url === (0,_braintree_sanitize_url__WEBPACK_IMPORTED_MODULE_0__/* .sanitizeUrl */ .N)(url);
}




/***/ }),

/***/ 10896:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ aliasesToCanonicalName),
/* harmony export */   b: () => (/* binding */ aliasesToLabel),
/* harmony export */   c: () => (/* binding */ canonicalNameToLabel),
/* harmony export */   d: () => (/* binding */ languagesWithAliases),
/* harmony export */   l: () => (/* binding */ labelToCanonicalName)
/* harmony export */ });
/* harmony import */ var _prism_e4e5bc8f_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46080);


const languages = [{
  label: 'C',
  value: 'c'
}, {
  label: 'C++',
  value: 'cpp'
}, {
  label: 'Arduino',
  value: 'arduino'
}, {
  label: 'Bash',
  value: 'bash'
}, {
  label: 'C#',
  value: 'csharp'
}, {
  label: 'CSS',
  value: 'css'
}, {
  label: 'Diff',
  value: 'diff'
}, {
  label: 'Go',
  value: 'go'
}, {
  label: 'INI',
  value: 'ini'
}, {
  label: 'Java',
  value: 'java'
}, {
  label: 'JavaScript',
  value: 'javascript'
}, {
  label: 'JSX',
  value: 'jsx'
}, {
  label: 'JSON',
  value: 'json'
}, {
  label: 'Kotlin',
  value: 'kotlin'
}, {
  label: 'Less',
  value: 'less'
}, {
  label: 'Lua',
  value: 'lua'
}, {
  label: 'Makefile',
  value: 'makefile'
}, {
  label: 'Markdown',
  value: 'markdown'
}, {
  label: 'Objective-C',
  value: 'objectivec'
}, {
  label: 'Perl',
  value: 'perl'
}, {
  label: 'PHP',
  value: 'php'
}, {
  label: 'Python',
  value: 'python'
}, {
  label: 'R',
  value: 'r'
}, {
  label: 'Ruby',
  value: 'ruby'
}, {
  label: 'Rust',
  value: 'rust'
}, {
  label: 'Sass',
  value: 'sass'
}, {
  label: 'SCSS',
  value: 'scss'
}, {
  label: 'SQL',
  value: 'sql'
}, {
  label: 'Swift',
  value: 'swift'
}, {
  label: 'TypeScript',
  value: 'typescript'
}, {
  label: 'TSX',
  value: 'tsx'
}, {
  label: 'VB.NET',
  value: 'vbnet'
}, {
  label: 'YAML',
  value: 'yaml'
}];
const canonicalNameToLabel = new Map(languages.map(x => [x.value, x.label]));
const labelToCanonicalName = new Map(languages.map(x => [x.label, x.value]));
const languageToCanonicalName = new Map(languages.map(lang => [_prism_e4e5bc8f_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_0__.P.languages[lang.value], lang.value]));
const aliasesToCanonicalName = new Map(Object.keys(_prism_e4e5bc8f_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_0__.P.languages).flatMap(lang => {
  const canonicalName = languageToCanonicalName.get(_prism_e4e5bc8f_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_0__.P.languages[lang]);
  if (canonicalName === undefined) {
    return [];
  }
  return [[lang, canonicalName]];
}));
const languagesToAliases = new Map(languages.map(lang => [lang.value, []]));
for (const [alias, canonicalName] of aliasesToCanonicalName) {
  languagesToAliases.get(canonicalName).push(alias);
}
const languagesWithAliases = [{
  label: 'Plain text',
  value: 'plain',
  aliases: []
}, ...[...languagesToAliases].map(_ref => {
  let [canonicalName, aliases] = _ref;
  return {
    label: canonicalNameToLabel.get(canonicalName),
    value: canonicalName,
    aliases
  };
})];
const aliasesToLabel = new Map([...aliasesToCanonicalName].map(_ref2 => {
  let [alias, canonicalName] = _ref2;
  return [alias, canonicalNameToLabel.get(canonicalName)];
}));




/***/ }),

/***/ 46080:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ Prism)
/* harmony export */ });
/* eslint-disable */
globalThis.Prism = {
  manual: true
};

/* **********************************************
     Begin prism-core.js
********************************************** */

/// <reference lib="WebWorker"/>

var _self = globalThis;

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
var Prism = function (_self) {
  // Private helper vars
  var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
  var uniqueId = 0;

  // The grammar object for plaintext
  var plainTextGrammar = {};
  var _ = {
    /**
     * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
     * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
     * additional languages or plugins yourself.
     *
     * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
     *
     * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
     * empty Prism object into the global scope before loading the Prism script like this:
     *
     * ```js
     * window.Prism = window.Prism || {};
     * Prism.manual = true;
     * // add a new <script> to load Prism's script
     * ```
     *
     * @default false
     * @type {boolean}
     * @memberof Prism
     * @public
     */
    manual: _self.Prism && _self.Prism.manual,
    /**
     * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
     * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
     * own worker, you don't want it to do this.
     *
     * By setting this value to `true`, Prism will not add its own listeners to the worker.
     *
     * You obviously have to change this value before Prism executes. To do this, you can add an
     * empty Prism object into the global scope before loading the Prism script like this:
     *
     * ```js
     * window.Prism = window.Prism || {};
     * Prism.disableWorkerMessageHandler = true;
     * // Load Prism's script
     * ```
     *
     * @default false
     * @type {boolean}
     * @memberof Prism
     * @public
     */
    disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
    /**
     * A namespace for utility methods.
     *
     * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
     * change or disappear at any time.
     *
     * @namespace
     * @memberof Prism
     */
    util: {
      encode: function encode(tokens) {
        if (tokens instanceof Token) {
          return new Token(tokens.type, encode(tokens.content), tokens.alias);
        } else if (Array.isArray(tokens)) {
          return tokens.map(encode);
        } else {
          return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
        }
      },
      /**
       * Returns the name of the type of the given value.
       *
       * @param {any} o
       * @returns {string}
       * @example
       * type(null)      === 'Null'
       * type(undefined) === 'Undefined'
       * type(123)       === 'Number'
       * type('foo')     === 'String'
       * type(true)      === 'Boolean'
       * type([1, 2])    === 'Array'
       * type({})        === 'Object'
       * type(String)    === 'Function'
       * type(/abc+/)    === 'RegExp'
       */
      type: function (o) {
        return Object.prototype.toString.call(o).slice(8, -1);
      },
      /**
       * Returns a unique number for the given object. Later calls will still return the same number.
       *
       * @param {Object} obj
       * @returns {number}
       */
      objId: function (obj) {
        if (!obj['__id']) {
          Object.defineProperty(obj, '__id', {
            value: ++uniqueId
          });
        }
        return obj['__id'];
      },
      /**
       * Creates a deep clone of the given object.
       *
       * The main intended use of this function is to clone language definitions.
       *
       * @param {T} o
       * @param {Record<number, any>} [visited]
       * @returns {T}
       * @template T
       */
      clone: function deepClone(o, visited) {
        visited = visited || {};
        var clone;
        var id;
        switch (_.util.type(o)) {
          case 'Object':
            id = _.util.objId(o);
            if (visited[id]) {
              return visited[id];
            }
            clone = /** @type {Record<string, any>} */{};
            visited[id] = clone;
            for (var key in o) {
              if (o.hasOwnProperty(key)) {
                clone[key] = deepClone(o[key], visited);
              }
            }
            return (/** @type {any} */clone
            );
          case 'Array':
            id = _.util.objId(o);
            if (visited[id]) {
              return visited[id];
            }
            clone = [];
            visited[id] = clone;
            /** @type {Array} */ /** @type {any} */o.forEach(function (v, i) {
              clone[i] = deepClone(v, visited);
            });
            return (/** @type {any} */clone
            );
          default:
            return o;
        }
      },
      /**
       * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
       *
       * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
       *
       * @param {Element} element
       * @returns {string}
       */
      getLanguage: function (element) {
        while (element) {
          var m = lang.exec(element.className);
          if (m) {
            return m[1].toLowerCase();
          }
          element = element.parentElement;
        }
        return 'none';
      },
      /**
       * Sets the Prism `language-xxxx` class of the given element.
       *
       * @param {Element} element
       * @param {string} language
       * @returns {void}
       */
      setLanguage: function (element, language) {
        // remove all `language-xxxx` classes
        // (this might leave behind a leading space)
        element.className = element.className.replace(RegExp(lang, 'gi'), '');

        // add the new `language-xxxx` class
        // (using `classList` will automatically clean up spaces for us)
        element.classList.add('language-' + language);
      },
      /**
       * Returns the script element that is currently executing.
       *
       * This does __not__ work for line script element.
       *
       * @returns {HTMLScriptElement | null}
       */
      currentScript: function () {
        if (typeof document === 'undefined') {
          return null;
        }
        if ('currentScript' in document && 1 < 2 /* hack to trip TS' flow analysis */) {
          return (/** @type {any} */document.currentScript
          );
        }

        // IE11 workaround
        // we'll get the src of the current script by parsing IE11's error stack trace
        // this will not work for inline scripts

        try {
          throw new Error();
        } catch (err) {
          // Get file src url from stack. Specifically works with the format of stack traces in IE.
          // A stack will look like this:
          //
          // Error
          //    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
          //    at Global code (http://localhost/components/prism-core.js:606:1)

          var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
          if (src) {
            var scripts = document.getElementsByTagName('script');
            for (var i in scripts) {
              if (scripts[i].src == src) {
                return scripts[i];
              }
            }
          }
          return null;
        }
      },
      /**
       * Returns whether a given class is active for `element`.
       *
       * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
       * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
       * given class is just the given class with a `no-` prefix.
       *
       * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
       * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
       * ancestors have the given class or the negated version of it, then the default activation will be returned.
       *
       * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
       * version of it, the class is considered active.
       *
       * @param {Element} element
       * @param {string} className
       * @param {boolean} [defaultActivation=false]
       * @returns {boolean}
       */
      isActive: function (element, className, defaultActivation) {
        var no = 'no-' + className;
        while (element) {
          var classList = element.classList;
          if (classList.contains(className)) {
            return true;
          }
          if (classList.contains(no)) {
            return false;
          }
          element = element.parentElement;
        }
        return !!defaultActivation;
      }
    },
    /**
     * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
     *
     * @namespace
     * @memberof Prism
     * @public
     */
    languages: {
      /**
       * The grammar for plain, unformatted text.
       */
      plain: plainTextGrammar,
      plaintext: plainTextGrammar,
      text: plainTextGrammar,
      txt: plainTextGrammar,
      /**
       * Creates a deep copy of the language with the given id and appends the given tokens.
       *
       * If a token in `redef` also appears in the copied language, then the existing token in the copied language
       * will be overwritten at its original position.
       *
       * ## Best practices
       *
       * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
       * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
       * understand the language definition because, normally, the order of tokens matters in Prism grammars.
       *
       * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
       * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
       *
       * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
       * @param {Grammar} redef The new tokens to append.
       * @returns {Grammar} The new language created.
       * @public
       * @example
       * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
       *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
       *     // at its original position
       *     'comment': { ... },
       *     // CSS doesn't have a 'color' token, so this token will be appended
       *     'color': /\b(?:red|green|blue)\b/
       * });
       */
      extend: function (id, redef) {
        var lang = _.util.clone(_.languages[id]);
        for (var key in redef) {
          lang[key] = redef[key];
        }
        return lang;
      },
      /**
       * Inserts tokens _before_ another token in a language definition or any other grammar.
       *
       * ## Usage
       *
       * This helper method makes it easy to modify existing languages. For example, the CSS language definition
       * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
       * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
       * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
       * this:
       *
       * ```js
       * Prism.languages.markup.style = {
       *     // token
       * };
       * ```
       *
       * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
       * before existing tokens. For the CSS example above, you would use it like this:
       *
       * ```js
       * Prism.languages.insertBefore('markup', 'cdata', {
       *     'style': {
       *         // token
       *     }
       * });
       * ```
       *
       * ## Special cases
       *
       * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
       * will be ignored.
       *
       * This behavior can be used to insert tokens after `before`:
       *
       * ```js
       * Prism.languages.insertBefore('markup', 'comment', {
       *     'comment': Prism.languages.markup.comment,
       *     // tokens after 'comment'
       * });
       * ```
       *
       * ## Limitations
       *
       * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
       * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
       * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
       * deleting properties which is necessary to insert at arbitrary positions.
       *
       * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
       * Instead, it will create a new object and replace all references to the target object with the new one. This
       * can be done without temporarily deleting properties, so the iteration order is well-defined.
       *
       * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
       * you hold the target object in a variable, then the value of the variable will not change.
       *
       * ```js
       * var oldMarkup = Prism.languages.markup;
       * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
       *
       * assert(oldMarkup !== Prism.languages.markup);
       * assert(newMarkup === Prism.languages.markup);
       * ```
       *
       * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
       * object to be modified.
       * @param {string} before The key to insert before.
       * @param {Grammar} insert An object containing the key-value pairs to be inserted.
       * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
       * object to be modified.
       *
       * Defaults to `Prism.languages`.
       * @returns {Grammar} The new grammar object.
       * @public
       */
      insertBefore: function (inside, before, insert, root) {
        root = root || /** @type {any} */_.languages;
        var grammar = root[inside];
        /** @type {Grammar} */
        var ret = {};
        for (var token in grammar) {
          if (grammar.hasOwnProperty(token)) {
            if (token == before) {
              for (var newToken in insert) {
                if (insert.hasOwnProperty(newToken)) {
                  ret[newToken] = insert[newToken];
                }
              }
            }

            // Do not insert token which also occur in insert. See #1525
            if (!insert.hasOwnProperty(token)) {
              ret[token] = grammar[token];
            }
          }
        }
        var old = root[inside];
        root[inside] = ret;

        // Update references in other language definitions
        _.languages.DFS(_.languages, function (key, value) {
          if (value === old && key != inside) {
            this[key] = ret;
          }
        });
        return ret;
      },
      // Traverse a language definition with Depth First Search
      DFS: function DFS(o, callback, type, visited) {
        visited = visited || {};
        var objId = _.util.objId;
        for (var i in o) {
          if (o.hasOwnProperty(i)) {
            callback.call(o, i, o[i], type || i);
            var property = o[i];
            var propertyType = _.util.type(property);
            if (propertyType === 'Object' && !visited[objId(property)]) {
              visited[objId(property)] = true;
              DFS(property, callback, null, visited);
            } else if (propertyType === 'Array' && !visited[objId(property)]) {
              visited[objId(property)] = true;
              DFS(property, callback, i, visited);
            }
          }
        }
      }
    },
    plugins: {},
    /**
     * This is the most high-level function in Prism’s API.
     * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
     * each one of them.
     *
     * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
     *
     * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
     * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
     * @memberof Prism
     * @public
     */
    highlightAll: function (async, callback) {
      _.highlightAllUnder(document, async, callback);
    },
    /**
     * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
     * {@link Prism.highlightElement} on each one of them.
     *
     * The following hooks will be run:
     * 1. `before-highlightall`
     * 2. `before-all-elements-highlight`
     * 3. All hooks of {@link Prism.highlightElement} for each element.
     *
     * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
     * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
     * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
     * @memberof Prism
     * @public
     */
    highlightAllUnder: function (container, async, callback) {
      var env = {
        callback: callback,
        container: container,
        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
      };
      _.hooks.run('before-highlightall', env);
      env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
      _.hooks.run('before-all-elements-highlight', env);
      for (var i = 0, element; element = env.elements[i++];) {
        _.highlightElement(element, async === true, env.callback);
      }
    },
    /**
     * Highlights the code inside a single element.
     *
     * The following hooks will be run:
     * 1. `before-sanity-check`
     * 2. `before-highlight`
     * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
     * 4. `before-insert`
     * 5. `after-highlight`
     * 6. `complete`
     *
     * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
     * the element's language.
     *
     * @param {Element} element The element containing the code.
     * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
     * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
     * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
     * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
     *
     * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
     * asynchronous highlighting to work. You can build your own bundle on the
     * [Download page](https://prismjs.com/download.html).
     * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
     * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
     * @memberof Prism
     * @public
     */
    highlightElement: function (element, async, callback) {
      // Find language
      var language = _.util.getLanguage(element);
      var grammar = _.languages[language];

      // Set language on the element, if not present
      _.util.setLanguage(element, language);

      // Set language on the parent, for styling
      var parent = element.parentElement;
      if (parent && parent.nodeName.toLowerCase() === 'pre') {
        _.util.setLanguage(parent, language);
      }
      var code = element.textContent;
      var env = {
        element: element,
        language: language,
        grammar: grammar,
        code: code
      };
      function insertHighlightedCode(highlightedCode) {
        env.highlightedCode = highlightedCode;
        _.hooks.run('before-insert', env);
        env.element.innerHTML = env.highlightedCode;
        _.hooks.run('after-highlight', env);
        _.hooks.run('complete', env);
        callback && callback.call(env.element);
      }
      _.hooks.run('before-sanity-check', env);

      // plugins may change/add the parent/element
      parent = env.element.parentElement;
      if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
        parent.setAttribute('tabindex', '0');
      }
      if (!env.code) {
        _.hooks.run('complete', env);
        callback && callback.call(env.element);
        return;
      }
      _.hooks.run('before-highlight', env);
      if (!env.grammar) {
        insertHighlightedCode(_.util.encode(env.code));
        return;
      }
      if (async && _self.Worker) {
        var worker = new Worker(_.filename);
        worker.onmessage = function (evt) {
          insertHighlightedCode(evt.data);
        };
        worker.postMessage(JSON.stringify({
          language: env.language,
          code: env.code,
          immediateClose: true
        }));
      } else {
        insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
      }
    },
    /**
     * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
     * and the language definitions to use, and returns a string with the HTML produced.
     *
     * The following hooks will be run:
     * 1. `before-tokenize`
     * 2. `after-tokenize`
     * 3. `wrap`: On each {@link Token}.
     *
     * @param {string} text A string with the code to be highlighted.
     * @param {Grammar} grammar An object containing the tokens to use.
     *
     * Usually a language definition like `Prism.languages.markup`.
     * @param {string} language The name of the language definition passed to `grammar`.
     * @returns {string} The highlighted HTML.
     * @memberof Prism
     * @public
     * @example
     * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
     */
    highlight: function (text, grammar, language) {
      var env = {
        code: text,
        grammar: grammar,
        language: language
      };
      _.hooks.run('before-tokenize', env);
      if (!env.grammar) {
        throw new Error('The language "' + env.language + '" has no grammar.');
      }
      env.tokens = _.tokenize(env.code, env.grammar);
      _.hooks.run('after-tokenize', env);
      return Token.stringify(_.util.encode(env.tokens), env.language);
    },
    /**
     * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
     * and the language definitions to use, and returns an array with the tokenized code.
     *
     * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
     *
     * This method could be useful in other contexts as well, as a very crude parser.
     *
     * @param {string} text A string with the code to be highlighted.
     * @param {Grammar} grammar An object containing the tokens to use.
     *
     * Usually a language definition like `Prism.languages.markup`.
     * @returns {TokenStream} An array of strings and tokens, a token stream.
     * @memberof Prism
     * @public
     * @example
     * let code = `var foo = 0;`;
     * let tokens = Prism.tokenize(code, Prism.languages.javascript);
     * tokens.forEach(token => {
     *     if (token instanceof Prism.Token && token.type === 'number') {
     *         console.log(`Found numeric literal: ${token.content}`);
     *     }
     * });
     */
    tokenize: function (text, grammar) {
      var rest = grammar.rest;
      if (rest) {
        for (var token in rest) {
          grammar[token] = rest[token];
        }
        delete grammar.rest;
      }
      var tokenList = new LinkedList();
      addAfter(tokenList, tokenList.head, text);
      matchGrammar(text, tokenList, grammar, tokenList.head, 0);
      return toArray(tokenList);
    },
    /**
     * @namespace
     * @memberof Prism
     * @public
     */
    hooks: {
      all: {},
      /**
       * Adds the given callback to the list of callbacks for the given hook.
       *
       * The callback will be invoked when the hook it is registered for is run.
       * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
       *
       * One callback function can be registered to multiple hooks and the same hook multiple times.
       *
       * @param {string} name The name of the hook.
       * @param {HookCallback} callback The callback function which is given environment variables.
       * @public
       */
      add: function (name, callback) {
        var hooks = _.hooks.all;
        hooks[name] = hooks[name] || [];
        hooks[name].push(callback);
      },
      /**
       * Runs a hook invoking all registered callbacks with the given environment variables.
       *
       * Callbacks will be invoked synchronously and in the order in which they were registered.
       *
       * @param {string} name The name of the hook.
       * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
       * @public
       */
      run: function (name, env) {
        var callbacks = _.hooks.all[name];
        if (!callbacks || !callbacks.length) {
          return;
        }
        for (var i = 0, callback; callback = callbacks[i++];) {
          callback(env);
        }
      }
    },
    Token: Token
  };
  _self.Prism = _;

  // Typescript note:
  // The following can be used to import the Token type in JSDoc:
  //
  //   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

  /**
   * Creates a new token.
   *
   * @param {string} type See {@link Token#type type}
   * @param {string | TokenStream} content See {@link Token#content content}
   * @param {string|string[]} [alias] The alias(es) of the token.
   * @param {string} [matchedStr=""] A copy of the full string this token was created from.
   * @class
   * @global
   * @public
   */
  function Token(type, content, alias, matchedStr) {
    /**
     * The type of the token.
     *
     * This is usually the key of a pattern in a {@link Grammar}.
     *
     * @type {string}
     * @see GrammarToken
     * @public
     */
    this.type = type;
    /**
     * The strings or tokens contained by this token.
     *
     * This will be a token stream if the pattern matched also defined an `inside` grammar.
     *
     * @type {string | TokenStream}
     * @public
     */
    this.content = content;
    /**
     * The alias(es) of the token.
     *
     * @type {string|string[]}
     * @see GrammarToken
     * @public
     */
    this.alias = alias;
    // Copy of the full string this token was created from
    this.length = (matchedStr || '').length | 0;
  }

  /**
   * A token stream is an array of strings and {@link Token Token} objects.
   *
   * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
   * them.
   *
   * 1. No adjacent strings.
   * 2. No empty strings.
   *
   *    The only exception here is the token stream that only contains the empty string and nothing else.
   *
   * @typedef {Array<string | Token>} TokenStream
   * @global
   * @public
   */

  /**
   * Converts the given token or token stream to an HTML representation.
   *
   * The following hooks will be run:
   * 1. `wrap`: On each {@link Token}.
   *
   * @param {string | Token | TokenStream} o The token or token stream to be converted.
   * @param {string} language The name of current language.
   * @returns {string} The HTML representation of the token or token stream.
   * @memberof Token
   * @static
   */
  Token.stringify = function stringify(o, language) {
    if (typeof o == 'string') {
      return o;
    }
    if (Array.isArray(o)) {
      var s = '';
      o.forEach(function (e) {
        s += stringify(e, language);
      });
      return s;
    }
    var env = {
      type: o.type,
      content: stringify(o.content, language),
      tag: 'span',
      classes: ['token', o.type],
      attributes: {},
      language: language
    };
    var aliases = o.alias;
    if (aliases) {
      if (Array.isArray(aliases)) {
        Array.prototype.push.apply(env.classes, aliases);
      } else {
        env.classes.push(aliases);
      }
    }
    _.hooks.run('wrap', env);
    var attributes = '';
    for (var name in env.attributes) {
      attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
    }
    return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
  };

  /**
   * @param {RegExp} pattern
   * @param {number} pos
   * @param {string} text
   * @param {boolean} lookbehind
   * @returns {RegExpExecArray | null}
   */
  function matchPattern(pattern, pos, text, lookbehind) {
    pattern.lastIndex = pos;
    var match = pattern.exec(text);
    if (match && lookbehind && match[1]) {
      // change the match to remove the text matched by the Prism lookbehind group
      var lookbehindLength = match[1].length;
      match.index += lookbehindLength;
      match[0] = match[0].slice(lookbehindLength);
    }
    return match;
  }

  /**
   * @param {string} text
   * @param {LinkedList<string | Token>} tokenList
   * @param {any} grammar
   * @param {LinkedListNode<string | Token>} startNode
   * @param {number} startPos
   * @param {RematchOptions} [rematch]
   * @returns {void}
   * @private
   *
   * @typedef RematchOptions
   * @property {string} cause
   * @property {number} reach
   */
  function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
    for (var token in grammar) {
      if (!grammar.hasOwnProperty(token) || !grammar[token]) {
        continue;
      }
      var patterns = grammar[token];
      patterns = Array.isArray(patterns) ? patterns : [patterns];
      for (var j = 0; j < patterns.length; ++j) {
        if (rematch && rematch.cause == token + ',' + j) {
          return;
        }
        var patternObj = patterns[j];
        var inside = patternObj.inside;
        var lookbehind = !!patternObj.lookbehind;
        var greedy = !!patternObj.greedy;
        var alias = patternObj.alias;
        if (greedy && !patternObj.pattern.global) {
          // Without the global flag, lastIndex won't work
          var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
          patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
        }

        /** @type {RegExp} */
        var pattern = patternObj.pattern || patternObj;
        for (
        // iterate the token list and keep track of the current token/string position
        var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
          if (rematch && pos >= rematch.reach) {
            break;
          }
          var str = currentNode.value;
          if (tokenList.length > text.length) {
            // Something went terribly wrong, ABORT, ABORT!
            return;
          }
          if (str instanceof Token) {
            continue;
          }
          var removeCount = 1; // this is the to parameter of removeBetween
          var match;
          if (greedy) {
            match = matchPattern(pattern, pos, text, lookbehind);
            if (!match || match.index >= text.length) {
              break;
            }
            var from = match.index;
            var to = match.index + match[0].length;
            var p = pos;

            // find the node that contains the match
            p += currentNode.value.length;
            while (from >= p) {
              currentNode = currentNode.next;
              p += currentNode.value.length;
            }
            // adjust pos (and p)
            p -= currentNode.value.length;
            pos = p;

            // the current node is a Token, then the match starts inside another Token, which is invalid
            if (currentNode.value instanceof Token) {
              continue;
            }

            // find the last node which is affected by this match
            for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === 'string'); k = k.next) {
              removeCount++;
              p += k.value.length;
            }
            removeCount--;

            // replace with the new match
            str = text.slice(pos, p);
            match.index -= pos;
          } else {
            match = matchPattern(pattern, 0, str, lookbehind);
            if (!match) {
              continue;
            }
          }

          // eslint-disable-next-line no-redeclare
          var from = match.index;
          var matchStr = match[0];
          var before = str.slice(0, from);
          var after = str.slice(from + matchStr.length);
          var reach = pos + str.length;
          if (rematch && reach > rematch.reach) {
            rematch.reach = reach;
          }
          var removeFrom = currentNode.prev;
          if (before) {
            removeFrom = addAfter(tokenList, removeFrom, before);
            pos += before.length;
          }
          removeRange(tokenList, removeFrom, removeCount);
          var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
          currentNode = addAfter(tokenList, removeFrom, wrapped);
          if (after) {
            addAfter(tokenList, currentNode, after);
          }
          if (removeCount > 1) {
            // at least one Token object was removed, so we have to do some rematching
            // this can only happen if the current pattern is greedy

            /** @type {RematchOptions} */
            var nestedRematch = {
              cause: token + ',' + j,
              reach: reach
            };
            matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

            // the reach might have been extended because of the rematching
            if (rematch && nestedRematch.reach > rematch.reach) {
              rematch.reach = nestedRematch.reach;
            }
          }
        }
      }
    }
  }

  /**
   * @typedef LinkedListNode
   * @property {T} value
   * @property {LinkedListNode<T> | null} prev The previous node.
   * @property {LinkedListNode<T> | null} next The next node.
   * @template T
   * @private
   */

  /**
   * @template T
   * @private
   */
  function LinkedList() {
    /** @type {LinkedListNode<T>} */
    var head = {
      value: null,
      prev: null,
      next: null
    };
    /** @type {LinkedListNode<T>} */
    var tail = {
      value: null,
      prev: head,
      next: null
    };
    head.next = tail;

    /** @type {LinkedListNode<T>} */
    this.head = head;
    /** @type {LinkedListNode<T>} */
    this.tail = tail;
    this.length = 0;
  }

  /**
   * Adds a new node with the given value to the list.
   *
   * @param {LinkedList<T>} list
   * @param {LinkedListNode<T>} node
   * @param {T} value
   * @returns {LinkedListNode<T>} The added node.
   * @template T
   */
  function addAfter(list, node, value) {
    // assumes that node != list.tail && values.length >= 0
    var next = node.next;
    var newNode = {
      value: value,
      prev: node,
      next: next
    };
    node.next = newNode;
    next.prev = newNode;
    list.length++;
    return newNode;
  }
  /**
   * Removes `count` nodes after the given node. The given node will not be removed.
   *
   * @param {LinkedList<T>} list
   * @param {LinkedListNode<T>} node
   * @param {number} count
   * @template T
   */
  function removeRange(list, node, count) {
    var next = node.next;
    for (var i = 0; i < count && next !== list.tail; i++) {
      next = next.next;
    }
    node.next = next;
    next.prev = node;
    list.length -= i;
  }
  /**
   * @param {LinkedList<T>} list
   * @returns {T[]}
   * @template T
   */
  function toArray(list) {
    var array = [];
    var node = list.head.next;
    while (node !== list.tail) {
      array.push(node.value);
      node = node.next;
    }
    return array;
  }
  if (!_self.document) {
    if (!_self.addEventListener) {
      // in Node.js
      return _;
    }
    if (!_.disableWorkerMessageHandler) {
      // In worker
      _self.addEventListener('message', function (evt) {
        var message = JSON.parse(evt.data);
        var lang = message.language;
        var code = message.code;
        var immediateClose = message.immediateClose;
        _self.postMessage(_.highlight(code, _.languages[lang], lang));
        if (immediateClose) {
          _self.close();
        }
      }, false);
    }
    return _;
  }

  // Get current script and highlight
  var script = _.util.currentScript();
  if (script) {
    _.filename = script.src;
    if (script.hasAttribute('data-manual')) {
      _.manual = true;
    }
  }
  function highlightAutomaticallyCallback() {
    if (!_.manual) {
      _.highlightAll();
    }
  }
  if (!_.manual) {
    // If the document state is "loading", then we'll use DOMContentLoaded.
    // If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
    // DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
    // might take longer one animation frame to execute which can create a race condition where only some plugins have
    // been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
    // See https://github.com/PrismJS/prism/issues/2102
    var readyState = document.readyState;
    if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
      document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
    } else {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(highlightAutomaticallyCallback);
      } else {
        window.setTimeout(highlightAutomaticallyCallback, 16);
      }
    }
  }
  return _;
}(_self);

// some additional documentation/types

/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
 */

/**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */

/**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
 */

/**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */

/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
  'comment': {
    pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
    greedy: true
  },
  'prolog': {
    pattern: /<\?[\s\S]+?\?>/,
    greedy: true
  },
  'doctype': {
    // https://www.w3.org/TR/xml/#NT-doctypedecl
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: true,
    inside: {
      'internal-subset': {
        pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
        lookbehind: true,
        greedy: true,
        inside: null // see below
      },

      'string': {
        pattern: /"[^"]*"|'[^']*'/,
        greedy: true
      },
      'punctuation': /^<!|>$|[[\]]/,
      'doctype-tag': /^DOCTYPE/i,
      'name': /[^\s<>'"]+/
    }
  },
  'cdata': {
    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
    greedy: true
  },
  'tag': {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    inside: {
      'tag': {
        pattern: /^<\/?[^\s>\/]+/,
        inside: {
          'punctuation': /^<\/?/,
          'namespace': /^[^\s>\/:]+:/
        }
      },
      'special-attr': [],
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          'punctuation': [{
            pattern: /^=/,
            alias: 'attr-equals'
          }, {
            pattern: /^(\s*)["']|["']$/,
            lookbehind: true
          }]
        }
      },
      'punctuation': /\/?>/,
      'attr-name': {
        pattern: /[^\s>\/]+/,
        inside: {
          'namespace': /^[^\s>\/:]+:/
        }
      }
    }
  },
  'entity': [{
    pattern: /&[\da-z]{1,8};/i,
    alias: 'named-entity'
  }, /&#x?[\da-f]{1,8};/i]
};
Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity'];
Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {
  if (env.type === 'entity') {
    env.attributes['title'] = env.content.replace(/&amp;/, '&');
  }
});
Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
  /**
   * Adds an inlined language to markup.
   *
   * An example of an inlined language is CSS with `<style>` tags.
   *
   * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addInlined('style', 'css');
   */
  value: function addInlined(tagName, lang) {
    var includedCdataInside = {};
    includedCdataInside['language-' + lang] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: true,
      inside: Prism.languages[lang]
    };
    includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;
    var inside = {
      'included-cdata': {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: includedCdataInside
      }
    };
    inside['language-' + lang] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[lang]
    };
    var def = {};
    def[tagName] = {
      pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () {
        return tagName;
      }), 'i'),
      lookbehind: true,
      greedy: true,
      inside: inside
    };
    Prism.languages.insertBefore('markup', 'cdata', def);
  }
});
Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
  /**
   * Adds an pattern to highlight languages embedded in HTML attributes.
   *
   * An example of an inlined language is CSS with `style` attributes.
   *
   * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addAttribute('style', 'css');
   */
  value: function (attrName, lang) {
    Prism.languages.markup.tag.inside['special-attr'].push({
      pattern: RegExp(/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, 'i'),
      lookbehind: true,
      inside: {
        'attr-name': /^[^\s=]+/,
        'attr-value': {
          pattern: /=[\s\S]+/,
          inside: {
            'value': {
              pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
              lookbehind: true,
              alias: [lang, 'language-' + lang],
              inside: Prism.languages[lang]
            },
            'punctuation': [{
              pattern: /^=/,
              alias: 'attr-equals'
            }, /"|'/]
          }
        }
      }
    });
  }
});
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;
Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;

/* **********************************************
     Begin prism-css.js
********************************************** */

(function (Prism) {
  var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
  Prism.languages.css = {
    'comment': /\/\*[\s\S]*?\*\//,
    'atrule': {
      pattern: RegExp('@[\\w-](?:' + /[^;{\s"']|\s+(?!\s)/.source + '|' + string.source + ')*?' + /(?:;|(?=\s*\{))/.source),
      inside: {
        'rule': /^@[\w-]+/,
        'selector-function-argument': {
          pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: true,
          alias: 'selector'
        },
        'keyword': {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: true
        }
        // See rest below
      }
    },

    'url': {
      // https://drafts.csswg.org/css-values-3/#urls
      pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
      greedy: true,
      inside: {
        'function': /^url/i,
        'punctuation': /^\(|\)$/,
        'string': {
          pattern: RegExp('^' + string.source + '$'),
          alias: 'url'
        }
      }
    },
    'selector': {
      pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
      lookbehind: true
    },
    'string': {
      pattern: string,
      greedy: true
    },
    'property': {
      pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      lookbehind: true
    },
    'important': /!important\b/i,
    'function': {
      pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
      lookbehind: true
    },
    'punctuation': /[(){};:,]/
  };
  Prism.languages.css['atrule'].inside.rest = Prism.languages.css;
  var markup = Prism.languages.markup;
  if (markup) {
    markup.tag.addInlined('style', 'css');
    markup.tag.addAttribute('style', 'css');
  }
})(Prism);

/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
  'comment': [{
    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    lookbehind: true,
    greedy: true
  }, {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: true,
    greedy: true
  }],
  'string': {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  'class-name': {
    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: true,
    inside: {
      'punctuation': /[.\\]/
    }
  },
  'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
  'boolean': /\b(?:false|true)\b/,
  'function': /\b\w+(?=\()/,
  'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  'punctuation': /[{}[\];(),.:]/
};

/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
  'class-name': [Prism.languages.clike['class-name'], {
    pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
    lookbehind: true
  }],
  'keyword': [{
    pattern: /((?:^|\})\s*)catch\b/,
    lookbehind: true
  }, {
    pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
    lookbehind: true
  }],
  // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
  'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  'number': {
    pattern: RegExp(/(^|[^\w$])/.source + '(?:' + (
    // constant
    /NaN|Infinity/.source + '|' +
    // binary integer
    /0[bB][01]+(?:_[01]+)*n?/.source + '|' +
    // octal integer
    /0[oO][0-7]+(?:_[0-7]+)*n?/.source + '|' +
    // hexadecimal integer
    /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + '|' +
    // decimal bigint
    /\d+(?:_\d+)*n/.source + '|' +
    // decimal number (integer or float) but no bigint
    /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ')' + /(?![\w$])/.source),
    lookbehind: true
  },
  'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});
Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
Prism.languages.insertBefore('javascript', 'keyword', {
  'regex': {
    pattern: RegExp(
    // lookbehind
    // eslint-disable-next-line regexp/no-dupe-characters-character-class
    /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
    // Regex pattern:
    // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
    // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
    // with the only syntax, so we have to define 2 different regex patterns.
    /\//.source + '(?:' + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + '|' +
    // `v` flag syntax. This supports 3 levels of nested character classes.
    /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ')' +
    // lookahead
    /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),
    lookbehind: true,
    greedy: true,
    inside: {
      'regex-source': {
        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
        lookbehind: true,
        alias: 'language-regex',
        inside: Prism.languages.regex
      },
      'regex-delimiter': /^\/|\/$/,
      'regex-flags': /^[a-z]+$/
    }
  },
  // This must be declared before keyword because we use "function" inside the look-forward
  'function-variable': {
    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
    alias: 'function'
  },
  'parameter': [{
    pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
    lookbehind: true,
    inside: Prism.languages.javascript
  }, {
    pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
    lookbehind: true,
    inside: Prism.languages.javascript
  }, {
    pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
    lookbehind: true,
    inside: Prism.languages.javascript
  }, {
    pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
    lookbehind: true,
    inside: Prism.languages.javascript
  }],
  'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});
Prism.languages.insertBefore('javascript', 'string', {
  'hashbang': {
    pattern: /^#!.*/,
    greedy: true,
    alias: 'comment'
  },
  'template-string': {
    pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
    greedy: true,
    inside: {
      'template-punctuation': {
        pattern: /^`|`$/,
        alias: 'string'
      },
      'interpolation': {
        pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
        lookbehind: true,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\$\{|\}$/,
            alias: 'punctuation'
          },
          rest: Prism.languages.javascript
        }
      },
      'string': /[\s\S]+/
    }
  },
  'string-property': {
    pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
    lookbehind: true,
    greedy: true,
    alias: 'property'
  }
});
Prism.languages.insertBefore('javascript', 'operator', {
  'literal-property': {
    pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
    lookbehind: true,
    alias: 'property'
  }
});
if (Prism.languages.markup) {
  Prism.languages.markup.tag.addInlined('script', 'javascript');

  // add attribute support for all DOM events.
  // https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
  Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, 'javascript');
}
Prism.languages.js = Prism.languages.javascript;

/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {
  if (typeof Prism === 'undefined' || typeof document === 'undefined') {
    return;
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }
  var LOADING_MESSAGE = 'Loading…';
  var FAILURE_MESSAGE = function (status, message) {
    return '✖ Error ' + status + ' while fetching file: ' + message;
  };
  var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';
  var EXTENSIONS = {
    'js': 'javascript',
    'py': 'python',
    'rb': 'ruby',
    'ps1': 'powershell',
    'psm1': 'powershell',
    'sh': 'bash',
    'bat': 'batch',
    'h': 'c',
    'tex': 'latex'
  };
  var STATUS_ATTR = 'data-src-status';
  var STATUS_LOADING = 'loading';
  var STATUS_LOADED = 'loaded';
  var STATUS_FAILED = 'failed';
  var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])' + ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';

  /**
   * Loads the given file.
   *
   * @param {string} src The URL or path of the source file to load.
   * @param {(result: string) => void} success
   * @param {(reason: string) => void} error
   */
  function loadFile(src, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', src, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status < 400 && xhr.responseText) {
          success(xhr.responseText);
        } else {
          if (xhr.status >= 400) {
            error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
          } else {
            error(FAILURE_EMPTY_MESSAGE);
          }
        }
      }
    };
    xhr.send(null);
  }

  /**
   * Parses the given range.
   *
   * This returns a range with inclusive ends.
   *
   * @param {string | null | undefined} range
   * @returns {[number, number | undefined] | undefined}
   */
  function parseRange(range) {
    var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || '');
    if (m) {
      var start = Number(m[1]);
      var comma = m[2];
      var end = m[3];
      if (!comma) {
        return [start, start];
      }
      if (!end) {
        return [start, undefined];
      }
      return [start, Number(end)];
    }
    return undefined;
  }
  Prism.hooks.add('before-highlightall', function (env) {
    env.selector += ', ' + SELECTOR;
  });
  Prism.hooks.add('before-sanity-check', function (env) {
    var pre = /** @type {HTMLPreElement} */env.element;
    if (pre.matches(SELECTOR)) {
      env.code = ''; // fast-path the whole thing and go to complete

      pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading

      // add code element with loading message
      var code = pre.appendChild(document.createElement('CODE'));
      code.textContent = LOADING_MESSAGE;
      var src = pre.getAttribute('data-src');
      var language = env.language;
      if (language === 'none') {
        // the language might be 'none' because there is no language set;
        // in this case, we want to use the extension as the language
        var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
        language = EXTENSIONS[extension] || extension;
      }

      // set language classes
      Prism.util.setLanguage(code, language);
      Prism.util.setLanguage(pre, language);

      // preload the language
      var autoloader = Prism.plugins.autoloader;
      if (autoloader) {
        autoloader.loadLanguages(language);
      }

      // load file
      loadFile(src, function (text) {
        // mark as loaded
        pre.setAttribute(STATUS_ATTR, STATUS_LOADED);

        // handle data-range
        var range = parseRange(pre.getAttribute('data-range'));
        if (range) {
          var lines = text.split(/\r\n?|\n/g);

          // the range is one-based and inclusive on both ends
          var start = range[0];
          var end = range[1] == null ? lines.length : range[1];
          if (start < 0) {
            start += lines.length;
          }
          start = Math.max(0, Math.min(start - 1, lines.length));
          if (end < 0) {
            end += lines.length;
          }
          end = Math.max(0, Math.min(end, lines.length));
          text = lines.slice(start, end).join('\n');

          // add data-start for line numbers
          if (!pre.hasAttribute('data-start')) {
            pre.setAttribute('data-start', String(start + 1));
          }
        }

        // highlight code
        code.textContent = text;
        Prism.highlightElement(code);
      }, function (error) {
        // mark as failed
        pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
        code.textContent = error;
      });
    }
  });
  Prism.plugins.fileHighlight = {
    /**
     * Executes the File Highlight plugin for all matching `pre` elements under the given container.
     *
     * Note: Elements which are already loaded or currently loading will not be touched by this method.
     *
     * @param {ParentNode} [container=document]
     */
    highlight: function highlight(container) {
      var elements = (container || document).querySelectorAll(SELECTOR);
      for (var i = 0, element; element = elements[i++];) {
        Prism.highlightElement(element);
      }
    }
  };
  var logged = false;
  /** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
  Prism.fileHighlight = function () {
    if (!logged) {
      console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
      logged = true;
    }
    Prism.plugins.fileHighlight.highlight.apply(this, arguments);
  };
})();
Prism.languages.clike = {
  'comment': [{
    pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
    lookbehind: true,
    greedy: true
  }, {
    pattern: /(^|[^\\:])\/\/.*/,
    lookbehind: true,
    greedy: true
  }],
  'string': {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  'class-name': {
    pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: true,
    inside: {
      'punctuation': /[.\\]/
    }
  },
  'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
  'boolean': /\b(?:false|true)\b/,
  'function': /\b\w+(?=\()/,
  'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  'punctuation': /[{}[\];(),.:]/
};
Prism.languages.c = Prism.languages.extend('clike', {
  'comment': {
    pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: true
  },
  'string': {
    // https://en.cppreference.com/w/c/language/string_literal
    pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
    greedy: true
  },
  'class-name': {
    pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,
    lookbehind: true
  },
  'keyword': /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,
  'function': /\b[a-z_]\w*(?=\s*\()/i,
  'number': /(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,
  'operator': />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/
});
Prism.languages.insertBefore('c', 'string', {
  'char': {
    // https://en.cppreference.com/w/c/language/character_constant
    pattern: /'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,
    greedy: true
  }
});
Prism.languages.insertBefore('c', 'string', {
  'macro': {
    // allow for multiline macro definitions
    // spaces after the # character compile fine with gcc
    pattern: /(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
    lookbehind: true,
    greedy: true,
    alias: 'property',
    inside: {
      'string': [{
        // highlight the path of the include statement as a string
        pattern: /^(#\s*include\s*)<[^>]+>/,
        lookbehind: true
      }, Prism.languages.c['string']],
      'char': Prism.languages.c['char'],
      'comment': Prism.languages.c['comment'],
      'macro-name': [{
        pattern: /(^#\s*define\s+)\w+\b(?!\()/i,
        lookbehind: true
      }, {
        pattern: /(^#\s*define\s+)\w+\b(?=\()/i,
        lookbehind: true,
        alias: 'function'
      }],
      // highlight macro directives as keywords
      'directive': {
        pattern: /^(#\s*)[a-z]+/,
        lookbehind: true,
        alias: 'keyword'
      },
      'directive-hash': /^#/,
      'punctuation': /##|\\(?=[\r\n])/,
      'expression': {
        pattern: /\S[\s\S]*/,
        inside: Prism.languages.c
      }
    }
  }
});
Prism.languages.insertBefore('c', 'function', {
  // highlight predefined macros as constants
  'constant': /\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/
});
delete Prism.languages.c['boolean'];
(function (Prism) {
  var keyword = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/;
  var modName = /\b(?!<keyword>)\w+(?:\s*\.\s*\w+)*\b/.source.replace(/<keyword>/g, function () {
    return keyword.source;
  });
  Prism.languages.cpp = Prism.languages.extend('c', {
    'class-name': [{
      pattern: RegExp(/(\b(?:class|concept|enum|struct|typename)\s+)(?!<keyword>)\w+/.source.replace(/<keyword>/g, function () {
        return keyword.source;
      })),
      lookbehind: true
    },
    // This is intended to capture the class name of method implementations like:
    //   void foo::bar() const {}
    // However! The `foo` in the above example could also be a namespace, so we only capture the class name if
    // it starts with an uppercase letter. This approximation should give decent results.
    /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,
    // This will capture the class name before destructors like:
    //   Foo::~Foo() {}
    /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,
    // This also intends to capture the class name of method implementations but here the class has template
    // parameters, so it can't be a namespace (until C++ adds generic namespaces).
    /\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/],
    'keyword': keyword,
    'number': {
      pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,
      greedy: true
    },
    'operator': />>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
    'boolean': /\b(?:false|true)\b/
  });
  Prism.languages.insertBefore('cpp', 'string', {
    'module': {
      // https://en.cppreference.com/w/cpp/language/modules
      pattern: RegExp(/(\b(?:import|module)\s+)/.source + '(?:' +
      // header-name
      /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|<[^<>\r\n]*>/.source + '|' +
      // module name or partition or both
      /<mod-name>(?:\s*:\s*<mod-name>)?|:\s*<mod-name>/.source.replace(/<mod-name>/g, function () {
        return modName;
      }) + ')'),
      lookbehind: true,
      greedy: true,
      inside: {
        'string': /^[<"][\s\S]+/,
        'operator': /:/,
        'punctuation': /\./
      }
    },
    'raw-string': {
      pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
      alias: 'string',
      greedy: true
    }
  });
  Prism.languages.insertBefore('cpp', 'keyword', {
    'generic-function': {
      pattern: /\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,
      inside: {
        'function': /^\w+/,
        'generic': {
          pattern: /<[\s\S]+/,
          alias: 'class-name',
          inside: Prism.languages.cpp
        }
      }
    }
  });
  Prism.languages.insertBefore('cpp', 'operator', {
    'double-colon': {
      pattern: /::/,
      alias: 'punctuation'
    }
  });
  Prism.languages.insertBefore('cpp', 'class-name', {
    // the base clause is an optional list of parent classes
    // https://en.cppreference.com/w/cpp/language/class
    'base-clause': {
      pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,
      lookbehind: true,
      greedy: true,
      inside: Prism.languages.extend('cpp', {})
    }
  });
  Prism.languages.insertBefore('inside', 'double-colon', {
    // All untokenized words that are not namespaces should be class names
    'class-name': /\b[a-z_]\w*\b(?!\s*::)/i
  }, Prism.languages.cpp['base-clause']);
})(Prism);
Prism.languages.arduino = Prism.languages.extend('cpp', {
  'keyword': /\b(?:String|array|bool|boolean|break|byte|case|catch|continue|default|do|double|else|finally|for|function|goto|if|in|instanceof|int|integer|long|loop|new|null|return|setup|string|switch|throw|try|void|while|word)\b/,
  'constant': /\b(?:ANALOG_MESSAGE|DEFAULT|DIGITAL_MESSAGE|EXTERNAL|FIRMATA_STRING|HIGH|INPUT|INPUT_PULLUP|INTERNAL|INTERNAL1V1|INTERNAL2V56|LED_BUILTIN|LOW|OUTPUT|REPORT_ANALOG|REPORT_DIGITAL|SET_PIN_MODE|SYSEX_START|SYSTEM_RESET)\b/,
  'builtin': /\b(?:Audio|BSSID|Bridge|Client|Console|EEPROM|Esplora|EsploraTFT|Ethernet|EthernetClient|EthernetServer|EthernetUDP|File|FileIO|FileSystem|Firmata|GPRS|GSM|GSMBand|GSMClient|GSMModem|GSMPIN|GSMScanner|GSMServer|GSMVoiceCall|GSM_SMS|HttpClient|IPAddress|IRread|Keyboard|KeyboardController|LiquidCrystal|LiquidCrystal_I2C|Mailbox|Mouse|MouseController|PImage|Process|RSSI|RobotControl|RobotMotor|SD|SPI|SSID|Scheduler|Serial|Server|Servo|SoftwareSerial|Stepper|Stream|TFT|Task|USBHost|WiFi|WiFiClient|WiFiServer|WiFiUDP|Wire|YunClient|YunServer|abs|addParameter|analogRead|analogReadResolution|analogReference|analogWrite|analogWriteResolution|answerCall|attach|attachGPRS|attachInterrupt|attached|autoscroll|available|background|beep|begin|beginPacket|beginSD|beginSMS|beginSpeaker|beginTFT|beginTransmission|beginWrite|bit|bitClear|bitRead|bitSet|bitWrite|blink|blinkVersion|buffer|changePIN|checkPIN|checkPUK|checkReg|circle|cityNameRead|cityNameWrite|clear|clearScreen|click|close|compassRead|config|connect|connected|constrain|cos|countryNameRead|countryNameWrite|createChar|cursor|debugPrint|delay|delayMicroseconds|detach|detachInterrupt|digitalRead|digitalWrite|disconnect|display|displayLogos|drawBMP|drawCompass|encryptionType|end|endPacket|endSMS|endTransmission|endWrite|exists|exitValue|fill|find|findUntil|flush|gatewayIP|get|getAsynchronously|getBand|getButton|getCurrentCarrier|getIMEI|getKey|getModifiers|getOemKey|getPINUsed|getResult|getSignalStrength|getSocket|getVoiceCallStatus|getXChange|getYChange|hangCall|height|highByte|home|image|interrupts|isActionDone|isDirectory|isListening|isPIN|isPressed|isValid|keyPressed|keyReleased|keyboardRead|knobRead|leftToRight|line|lineFollowConfig|listen|listenOnLocalhost|loadImage|localIP|lowByte|macAddress|maintain|map|max|messageAvailable|micros|millis|min|mkdir|motorsStop|motorsWrite|mouseDragged|mouseMoved|mousePressed|mouseReleased|move|noAutoscroll|noBlink|noBuffer|noCursor|noDisplay|noFill|noInterrupts|noListenOnLocalhost|noStroke|noTone|onReceive|onRequest|open|openNextFile|overflow|parseCommand|parseFloat|parseInt|parsePacket|pauseMode|peek|pinMode|playFile|playMelody|point|pointTo|position|pow|prepare|press|print|printFirmwareVersion|printVersion|println|process|processInput|pulseIn|put|random|randomSeed|read|readAccelerometer|readBlue|readButton|readBytes|readBytesUntil|readGreen|readJoystickButton|readJoystickSwitch|readJoystickX|readJoystickY|readLightSensor|readMessage|readMicrophone|readNetworks|readRed|readSlider|readString|readStringUntil|readTemperature|ready|rect|release|releaseAll|remoteIP|remoteNumber|remotePort|remove|requestFrom|retrieveCallingNumber|rewindDirectory|rightToLeft|rmdir|robotNameRead|robotNameWrite|run|runAsynchronously|runShellCommand|runShellCommandAsynchronously|running|scanNetworks|scrollDisplayLeft|scrollDisplayRight|seek|sendAnalog|sendDigitalPortPair|sendDigitalPorts|sendString|sendSysex|serialEvent|setBand|setBitOrder|setClockDivider|setCursor|setDNS|setDataMode|setFirmwareVersion|setMode|setPINUsed|setSpeed|setTextSize|setTimeout|shiftIn|shiftOut|shutdown|sin|size|sqrt|startLoop|step|stop|stroke|subnetMask|switchPIN|tan|tempoWrite|text|tone|transfer|tuneWrite|turn|updateIR|userNameRead|userNameWrite|voiceCall|waitContinue|width|write|writeBlue|writeGreen|writeJSON|writeMessage|writeMicroseconds|writeRGB|writeRed|yield)\b/
});
Prism.languages.ino = Prism.languages.arduino;
(function (Prism) {
  // $ set | grep '^[A-Z][^[:space:]]*=' | cut -d= -f1 | tr '\n' '|'
  // + LC_ALL, RANDOM, REPLY, SECONDS.
  // + make sure PS1..4 are here as they are not always set,
  // - some useless things.
  var envVars = '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b';
  var commandAfterHeredoc = {
    pattern: /(^(["']?)\w+\2)[ \t]+\S.*/,
    lookbehind: true,
    alias: 'punctuation',
    // this looks reasonably well in all themes
    inside: null // see below
  };

  var insideString = {
    'bash': commandAfterHeredoc,
    'environment': {
      pattern: RegExp('\\$' + envVars),
      alias: 'constant'
    },
    'variable': [
    // [0]: Arithmetic Environment
    {
      pattern: /\$?\(\([\s\S]+?\)\)/,
      greedy: true,
      inside: {
        // If there is a $ sign at the beginning highlight $(( and )) as variable
        'variable': [{
          pattern: /(^\$\(\([\s\S]+)\)\)/,
          lookbehind: true
        }, /^\$\(\(/],
        'number': /\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,
        // Operators according to https://www.gnu.org/software/bash/manual/bashref.html#Shell-Arithmetic
        'operator': /--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,
        // If there is no $ sign at the beginning highlight (( and )) as punctuation
        'punctuation': /\(\(?|\)\)?|,|;/
      }
    },
    // [1]: Command Substitution
    {
      pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
      greedy: true,
      inside: {
        'variable': /^\$\(|^`|\)$|`$/
      }
    },
    // [2]: Brace expansion
    {
      pattern: /\$\{[^}]+\}/,
      greedy: true,
      inside: {
        'operator': /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
        'punctuation': /[\[\]]/,
        'environment': {
          pattern: RegExp('(\\{)' + envVars),
          lookbehind: true,
          alias: 'constant'
        }
      }
    }, /\$(?:\w+|[#?*!@$])/],
    // Escape sequences from echo and printf's manuals, and escaped quotes.
    'entity': /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/
  };
  Prism.languages.bash = {
    'shebang': {
      pattern: /^#!\s*\/.*/,
      alias: 'important'
    },
    'comment': {
      pattern: /(^|[^"{\\$])#.*/,
      lookbehind: true
    },
    'function-name': [
    // a) function foo {
    // b) foo() {
    // c) function foo() {
    // but not “foo {”
    {
      // a) and c)
      pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
      lookbehind: true,
      alias: 'function'
    }, {
      // b)
      pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/,
      alias: 'function'
    }],
    // Highlight variable names as variables in for and select beginnings.
    'for-or-select': {
      pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
      alias: 'variable',
      lookbehind: true
    },
    // Highlight variable names as variables in the left-hand part
    // of assignments (“=” and “+=”).
    'assign-left': {
      pattern: /(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,
      inside: {
        'environment': {
          pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + envVars),
          lookbehind: true,
          alias: 'constant'
        }
      },
      alias: 'variable',
      lookbehind: true
    },
    // Highlight parameter names as variables
    'parameter': {
      pattern: /(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/,
      alias: 'variable',
      lookbehind: true
    },
    'string': [
    // Support for Here-documents https://en.wikipedia.org/wiki/Here_document
    {
      pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
      lookbehind: true,
      greedy: true,
      inside: insideString
    },
    // Here-document with quotes around the tag
    // → No expansion (so no “inside”).
    {
      pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
      lookbehind: true,
      greedy: true,
      inside: {
        'bash': commandAfterHeredoc
      }
    },
    // “Normal” string
    {
      // https://www.gnu.org/software/bash/manual/html_node/Double-Quotes.html
      pattern: /(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,
      lookbehind: true,
      greedy: true,
      inside: insideString
    }, {
      // https://www.gnu.org/software/bash/manual/html_node/Single-Quotes.html
      pattern: /(^|[^$\\])'[^']*'/,
      lookbehind: true,
      greedy: true
    }, {
      // https://www.gnu.org/software/bash/manual/html_node/ANSI_002dC-Quoting.html
      pattern: /\$'(?:[^'\\]|\\[\s\S])*'/,
      greedy: true,
      inside: {
        'entity': insideString.entity
      }
    }],
    'environment': {
      pattern: RegExp('\\$?' + envVars),
      alias: 'constant'
    },
    'variable': insideString.variable,
    'function': {
      pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    'keyword': {
      pattern: /(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    // https://www.gnu.org/software/bash/manual/html_node/Shell-Builtin-Commands.html
    'builtin': {
      pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,
      lookbehind: true,
      // Alias added to make those easier to distinguish from strings.
      alias: 'class-name'
    },
    'boolean': {
      pattern: /(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,
      lookbehind: true
    },
    'file-descriptor': {
      pattern: /\B&\d\b/,
      alias: 'important'
    },
    'operator': {
      // Lots of redirections here, but not just that.
      pattern: /\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
      inside: {
        'file-descriptor': {
          pattern: /^\d/,
          alias: 'important'
        }
      }
    },
    'punctuation': /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
    'number': {
      pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
      lookbehind: true
    }
  };
  commandAfterHeredoc.inside = Prism.languages.bash;

  /* Patterns in command substitution. */
  var toBeCopied = ['comment', 'function-name', 'for-or-select', 'assign-left', 'parameter', 'string', 'environment', 'function', 'keyword', 'builtin', 'boolean', 'file-descriptor', 'operator', 'punctuation', 'number'];
  var inside = insideString.variable[1].inside;
  for (var i = 0; i < toBeCopied.length; i++) {
    inside[toBeCopied[i]] = Prism.languages.bash[toBeCopied[i]];
  }
  Prism.languages.sh = Prism.languages.bash;
  Prism.languages.shell = Prism.languages.bash;
})(Prism);
(function (Prism) {
  /**
   * Replaces all placeholders "<<n>>" of given pattern with the n-th replacement (zero based).
   *
   * Note: This is a simple text based replacement. Be careful when using backreferences!
   *
   * @param {string} pattern the given pattern.
   * @param {string[]} replacements a list of replacement which can be inserted into the given pattern.
   * @returns {string} the pattern with all placeholders replaced with their corresponding replacements.
   * @example replace(/a<<0>>a/.source, [/b+/.source]) === /a(?:b+)a/.source
   */
  function replace(pattern, replacements) {
    return pattern.replace(/<<(\d+)>>/g, function (m, index) {
      return '(?:' + replacements[+index] + ')';
    });
  }
  /**
   * @param {string} pattern
   * @param {string[]} replacements
   * @param {string} [flags]
   * @returns {RegExp}
   */
  function re(pattern, replacements, flags) {
    return RegExp(replace(pattern, replacements), flags || '');
  }

  /**
   * Creates a nested pattern where all occurrences of the string `<<self>>` are replaced with the pattern itself.
   *
   * @param {string} pattern
   * @param {number} depthLog2
   * @returns {string}
   */
  function nested(pattern, depthLog2) {
    for (var i = 0; i < depthLog2; i++) {
      pattern = pattern.replace(/<<self>>/g, function () {
        return '(?:' + pattern + ')';
      });
    }
    return pattern.replace(/<<self>>/g, '[^\\s\\S]');
  }

  // https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/
  var keywordKinds = {
    // keywords which represent a return or variable type
    type: 'bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void',
    // keywords which are used to declare a type
    typeDeclaration: 'class enum interface record struct',
    // contextual keywords
    // ("var" and "dynamic" are missing because they are used like types)
    contextual: 'add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)',
    // all other keywords
    other: 'abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield'
  };

  // keywords
  function keywordsToPattern(words) {
    return '\\b(?:' + words.trim().replace(/ /g, '|') + ')\\b';
  }
  var typeDeclarationKeywords = keywordsToPattern(keywordKinds.typeDeclaration);
  var keywords = RegExp(keywordsToPattern(keywordKinds.type + ' ' + keywordKinds.typeDeclaration + ' ' + keywordKinds.contextual + ' ' + keywordKinds.other));
  var nonTypeKeywords = keywordsToPattern(keywordKinds.typeDeclaration + ' ' + keywordKinds.contextual + ' ' + keywordKinds.other);
  var nonContextualKeywords = keywordsToPattern(keywordKinds.type + ' ' + keywordKinds.typeDeclaration + ' ' + keywordKinds.other);

  // types
  var generic = nested(/<(?:[^<>;=+\-*/%&|^]|<<self>>)*>/.source, 2); // the idea behind the other forbidden characters is to prevent false positives. Same for tupleElement.
  var nestedRound = nested(/\((?:[^()]|<<self>>)*\)/.source, 2);
  var name = /@?\b[A-Za-z_]\w*\b/.source;
  var genericName = replace(/<<0>>(?:\s*<<1>>)?/.source, [name, generic]);
  var identifier = replace(/(?!<<0>>)<<1>>(?:\s*\.\s*<<1>>)*/.source, [nonTypeKeywords, genericName]);
  var array = /\[\s*(?:,\s*)*\]/.source;
  var typeExpressionWithoutTuple = replace(/<<0>>(?:\s*(?:\?\s*)?<<1>>)*(?:\s*\?)?/.source, [identifier, array]);
  var tupleElement = replace(/[^,()<>[\];=+\-*/%&|^]|<<0>>|<<1>>|<<2>>/.source, [generic, nestedRound, array]);
  var tuple = replace(/\(<<0>>+(?:,<<0>>+)+\)/.source, [tupleElement]);
  var typeExpression = replace(/(?:<<0>>|<<1>>)(?:\s*(?:\?\s*)?<<2>>)*(?:\s*\?)?/.source, [tuple, identifier, array]);
  var typeInside = {
    'keyword': keywords,
    'punctuation': /[<>()?,.:[\]]/
  };

  // strings & characters
  // https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/lexical-structure#character-literals
  // https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/lexical-structure#string-literals
  var character = /'(?:[^\r\n'\\]|\\.|\\[Uux][\da-fA-F]{1,8})'/.source; // simplified pattern
  var regularString = /"(?:\\.|[^\\"\r\n])*"/.source;
  var verbatimString = /@"(?:""|\\[\s\S]|[^\\"])*"(?!")/.source;
  Prism.languages.csharp = Prism.languages.extend('clike', {
    'string': [{
      pattern: re(/(^|[^$\\])<<0>>/.source, [verbatimString]),
      lookbehind: true,
      greedy: true
    }, {
      pattern: re(/(^|[^@$\\])<<0>>/.source, [regularString]),
      lookbehind: true,
      greedy: true
    }],
    'class-name': [{
      // Using static
      // using static System.Math;
      pattern: re(/(\busing\s+static\s+)<<0>>(?=\s*;)/.source, [identifier]),
      lookbehind: true,
      inside: typeInside
    }, {
      // Using alias (type)
      // using Project = PC.MyCompany.Project;
      pattern: re(/(\busing\s+<<0>>\s*=\s*)<<1>>(?=\s*;)/.source, [name, typeExpression]),
      lookbehind: true,
      inside: typeInside
    }, {
      // Using alias (alias)
      // using Project = PC.MyCompany.Project;
      pattern: re(/(\busing\s+)<<0>>(?=\s*=)/.source, [name]),
      lookbehind: true
    }, {
      // Type declarations
      // class Foo<A, B>
      // interface Foo<out A, B>
      pattern: re(/(\b<<0>>\s+)<<1>>/.source, [typeDeclarationKeywords, genericName]),
      lookbehind: true,
      inside: typeInside
    }, {
      // Single catch exception declaration
      // catch(Foo)
      // (things like catch(Foo e) is covered by variable declaration)
      pattern: re(/(\bcatch\s*\(\s*)<<0>>/.source, [identifier]),
      lookbehind: true,
      inside: typeInside
    }, {
      // Name of the type parameter of generic constraints
      // where Foo : class
      pattern: re(/(\bwhere\s+)<<0>>/.source, [name]),
      lookbehind: true
    }, {
      // Casts and checks via as and is.
      // as Foo<A>, is Bar<B>
      // (things like if(a is Foo b) is covered by variable declaration)
      pattern: re(/(\b(?:is(?:\s+not)?|as)\s+)<<0>>/.source, [typeExpressionWithoutTuple]),
      lookbehind: true,
      inside: typeInside
    }, {
      // Variable, field and parameter declaration
      // (Foo bar, Bar baz, Foo[,,] bay, Foo<Bar, FooBar<Bar>> bax)
      pattern: re(/\b<<0>>(?=\s+(?!<<1>>|with\s*\{)<<2>>(?:\s*[=,;:{)\]]|\s+(?:in|when)\b))/.source, [typeExpression, nonContextualKeywords, name]),
      inside: typeInside
    }],
    'keyword': keywords,
    // https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/lexical-structure#literals
    'number': /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,
    'operator': />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
    'punctuation': /\?\.?|::|[{}[\];(),.:]/
  });
  Prism.languages.insertBefore('csharp', 'number', {
    'range': {
      pattern: /\.\./,
      alias: 'operator'
    }
  });
  Prism.languages.insertBefore('csharp', 'punctuation', {
    'named-parameter': {
      pattern: re(/([(,]\s*)<<0>>(?=\s*:)/.source, [name]),
      lookbehind: true,
      alias: 'punctuation'
    }
  });
  Prism.languages.insertBefore('csharp', 'class-name', {
    'namespace': {
      // namespace Foo.Bar {}
      // using Foo.Bar;
      pattern: re(/(\b(?:namespace|using)\s+)<<0>>(?:\s*\.\s*<<0>>)*(?=\s*[;{])/.source, [name]),
      lookbehind: true,
      inside: {
        'punctuation': /\./
      }
    },
    'type-expression': {
      // default(Foo), typeof(Foo<Bar>), sizeof(int)
      pattern: re(/(\b(?:default|sizeof|typeof)\s*\(\s*(?!\s))(?:[^()\s]|\s(?!\s)|<<0>>)*(?=\s*\))/.source, [nestedRound]),
      lookbehind: true,
      alias: 'class-name',
      inside: typeInside
    },
    'return-type': {
      // Foo<Bar> ForBar(); Foo IFoo.Bar() => 0
      // int this[int index] => 0; T IReadOnlyList<T>.this[int index] => this[index];
      // int Foo => 0; int Foo { get; set } = 0;
      pattern: re(/<<0>>(?=\s+(?:<<1>>\s*(?:=>|[({]|\.\s*this\s*\[)|this\s*\[))/.source, [typeExpression, identifier]),
      inside: typeInside,
      alias: 'class-name'
    },
    'constructor-invocation': {
      // new List<Foo<Bar[]>> { }
      pattern: re(/(\bnew\s+)<<0>>(?=\s*[[({])/.source, [typeExpression]),
      lookbehind: true,
      inside: typeInside,
      alias: 'class-name'
    },
    /*'explicit-implementation': {
    	// int IFoo<Foo>.Bar => 0; void IFoo<Foo<Foo>>.Foo<T>();
    	pattern: replace(/\b<<0>>(?=\.<<1>>)/, className, methodOrPropertyDeclaration),
    	inside: classNameInside,
    	alias: 'class-name'
    },*/
    'generic-method': {
      // foo<Bar>()
      pattern: re(/<<0>>\s*<<1>>(?=\s*\()/.source, [name, generic]),
      inside: {
        'function': re(/^<<0>>/.source, [name]),
        'generic': {
          pattern: RegExp(generic),
          alias: 'class-name',
          inside: typeInside
        }
      }
    },
    'type-list': {
      // The list of types inherited or of generic constraints
      // class Foo<F> : Bar, IList<FooBar>
      // where F : Bar, IList<int>
      pattern: re(/\b((?:<<0>>\s+<<1>>|record\s+<<1>>\s*<<5>>|where\s+<<2>>)\s*:\s*)(?:<<3>>|<<4>>|<<1>>\s*<<5>>|<<6>>)(?:\s*,\s*(?:<<3>>|<<4>>|<<6>>))*(?=\s*(?:where|[{;]|=>|$))/.source, [typeDeclarationKeywords, genericName, name, typeExpression, keywords.source, nestedRound, /\bnew\s*\(\s*\)/.source]),
      lookbehind: true,
      inside: {
        'record-arguments': {
          pattern: re(/(^(?!new\s*\()<<0>>\s*)<<1>>/.source, [genericName, nestedRound]),
          lookbehind: true,
          greedy: true,
          inside: Prism.languages.csharp
        },
        'keyword': keywords,
        'class-name': {
          pattern: RegExp(typeExpression),
          greedy: true,
          inside: typeInside
        },
        'punctuation': /[,()]/
      }
    },
    'preprocessor': {
      pattern: /(^[\t ]*)#.*/m,
      lookbehind: true,
      alias: 'property',
      inside: {
        // highlight preprocessor directives as keywords
        'directive': {
          pattern: /(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,
          lookbehind: true,
          alias: 'keyword'
        }
      }
    }
  });

  // attributes
  var regularStringOrCharacter = regularString + '|' + character;
  var regularStringCharacterOrComment = replace(/\/(?![*/])|\/\/[^\r\n]*[\r\n]|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>/.source, [regularStringOrCharacter]);
  var roundExpression = nested(replace(/[^"'/()]|<<0>>|\(<<self>>*\)/.source, [regularStringCharacterOrComment]), 2);

  // https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/concepts/attributes/#attribute-targets
  var attrTarget = /\b(?:assembly|event|field|method|module|param|property|return|type)\b/.source;
  var attr = replace(/<<0>>(?:\s*\(<<1>>*\))?/.source, [identifier, roundExpression]);
  Prism.languages.insertBefore('csharp', 'class-name', {
    'attribute': {
      // Attributes
      // [Foo], [Foo(1), Bar(2, Prop = "foo")], [return: Foo(1), Bar(2)], [assembly: Foo(Bar)]
      pattern: re(/((?:^|[^\s\w>)?])\s*\[\s*)(?:<<0>>\s*:\s*)?<<1>>(?:\s*,\s*<<1>>)*(?=\s*\])/.source, [attrTarget, attr]),
      lookbehind: true,
      greedy: true,
      inside: {
        'target': {
          pattern: re(/^<<0>>(?=\s*:)/.source, [attrTarget]),
          alias: 'keyword'
        },
        'attribute-arguments': {
          pattern: re(/\(<<0>>*\)/.source, [roundExpression]),
          inside: Prism.languages.csharp
        },
        'class-name': {
          pattern: RegExp(identifier),
          inside: {
            'punctuation': /\./
          }
        },
        'punctuation': /[:,]/
      }
    }
  });

  // string interpolation
  var formatString = /:[^}\r\n]+/.source;
  // multi line
  var mInterpolationRound = nested(replace(/[^"'/()]|<<0>>|\(<<self>>*\)/.source, [regularStringCharacterOrComment]), 2);
  var mInterpolation = replace(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source, [mInterpolationRound, formatString]);
  // single line
  var sInterpolationRound = nested(replace(/[^"'/()]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|<<0>>|\(<<self>>*\)/.source, [regularStringOrCharacter]), 2);
  var sInterpolation = replace(/\{(?!\{)(?:(?![}:])<<0>>)*<<1>>?\}/.source, [sInterpolationRound, formatString]);
  function createInterpolationInside(interpolation, interpolationRound) {
    return {
      'interpolation': {
        pattern: re(/((?:^|[^{])(?:\{\{)*)<<0>>/.source, [interpolation]),
        lookbehind: true,
        inside: {
          'format-string': {
            pattern: re(/(^\{(?:(?![}:])<<0>>)*)<<1>>(?=\}$)/.source, [interpolationRound, formatString]),
            lookbehind: true,
            inside: {
              'punctuation': /^:/
            }
          },
          'punctuation': /^\{|\}$/,
          'expression': {
            pattern: /[\s\S]+/,
            alias: 'language-csharp',
            inside: Prism.languages.csharp
          }
        }
      },
      'string': /[\s\S]+/
    };
  }
  Prism.languages.insertBefore('csharp', 'string', {
    'interpolation-string': [{
      pattern: re(/(^|[^\\])(?:\$@|@\$)"(?:""|\\[\s\S]|\{\{|<<0>>|[^\\{"])*"/.source, [mInterpolation]),
      lookbehind: true,
      greedy: true,
      inside: createInterpolationInside(mInterpolation, mInterpolationRound)
    }, {
      pattern: re(/(^|[^@\\])\$"(?:\\.|\{\{|<<0>>|[^\\"{])*"/.source, [sInterpolation]),
      lookbehind: true,
      greedy: true,
      inside: createInterpolationInside(sInterpolation, sInterpolationRound)
    }],
    'char': {
      pattern: RegExp(character),
      greedy: true
    }
  });
  Prism.languages.dotnet = Prism.languages.cs = Prism.languages.csharp;
})(Prism);
Prism.languages.markup = {
  'comment': {
    pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
    greedy: true
  },
  'prolog': {
    pattern: /<\?[\s\S]+?\?>/,
    greedy: true
  },
  'doctype': {
    // https://www.w3.org/TR/xml/#NT-doctypedecl
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: true,
    inside: {
      'internal-subset': {
        pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
        lookbehind: true,
        greedy: true,
        inside: null // see below
      },

      'string': {
        pattern: /"[^"]*"|'[^']*'/,
        greedy: true
      },
      'punctuation': /^<!|>$|[[\]]/,
      'doctype-tag': /^DOCTYPE/i,
      'name': /[^\s<>'"]+/
    }
  },
  'cdata': {
    pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
    greedy: true
  },
  'tag': {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: true,
    inside: {
      'tag': {
        pattern: /^<\/?[^\s>\/]+/,
        inside: {
          'punctuation': /^<\/?/,
          'namespace': /^[^\s>\/:]+:/
        }
      },
      'special-attr': [],
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          'punctuation': [{
            pattern: /^=/,
            alias: 'attr-equals'
          }, {
            pattern: /^(\s*)["']|["']$/,
            lookbehind: true
          }]
        }
      },
      'punctuation': /\/?>/,
      'attr-name': {
        pattern: /[^\s>\/]+/,
        inside: {
          'namespace': /^[^\s>\/:]+:/
        }
      }
    }
  },
  'entity': [{
    pattern: /&[\da-z]{1,8};/i,
    alias: 'named-entity'
  }, /&#x?[\da-f]{1,8};/i]
};
Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity'];
Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {
  if (env.type === 'entity') {
    env.attributes['title'] = env.content.replace(/&amp;/, '&');
  }
});
Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
  /**
   * Adds an inlined language to markup.
   *
   * An example of an inlined language is CSS with `<style>` tags.
   *
   * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addInlined('style', 'css');
   */
  value: function addInlined(tagName, lang) {
    var includedCdataInside = {};
    includedCdataInside['language-' + lang] = {
      pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
      lookbehind: true,
      inside: Prism.languages[lang]
    };
    includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;
    var inside = {
      'included-cdata': {
        pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
        inside: includedCdataInside
      }
    };
    inside['language-' + lang] = {
      pattern: /[\s\S]+/,
      inside: Prism.languages[lang]
    };
    var def = {};
    def[tagName] = {
      pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () {
        return tagName;
      }), 'i'),
      lookbehind: true,
      greedy: true,
      inside: inside
    };
    Prism.languages.insertBefore('markup', 'cdata', def);
  }
});
Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
  /**
   * Adds an pattern to highlight languages embedded in HTML attributes.
   *
   * An example of an inlined language is CSS with `style` attributes.
   *
   * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
   * case insensitive.
   * @param {string} lang The language key.
   * @example
   * addAttribute('style', 'css');
   */
  value: function (attrName, lang) {
    Prism.languages.markup.tag.inside['special-attr'].push({
      pattern: RegExp(/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, 'i'),
      lookbehind: true,
      inside: {
        'attr-name': /^[^\s=]+/,
        'attr-value': {
          pattern: /=[\s\S]+/,
          inside: {
            'value': {
              pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
              lookbehind: true,
              alias: [lang, 'language-' + lang],
              inside: Prism.languages[lang]
            },
            'punctuation': [{
              pattern: /^=/,
              alias: 'attr-equals'
            }, /"|'/]
          }
        }
      }
    });
  }
});
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;
Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;
(function (Prism) {
  var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
  Prism.languages.css = {
    'comment': /\/\*[\s\S]*?\*\//,
    'atrule': {
      pattern: RegExp('@[\\w-](?:' + /[^;{\s"']|\s+(?!\s)/.source + '|' + string.source + ')*?' + /(?:;|(?=\s*\{))/.source),
      inside: {
        'rule': /^@[\w-]+/,
        'selector-function-argument': {
          pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
          lookbehind: true,
          alias: 'selector'
        },
        'keyword': {
          pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
          lookbehind: true
        }
        // See rest below
      }
    },

    'url': {
      // https://drafts.csswg.org/css-values-3/#urls
      pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
      greedy: true,
      inside: {
        'function': /^url/i,
        'punctuation': /^\(|\)$/,
        'string': {
          pattern: RegExp('^' + string.source + '$'),
          alias: 'url'
        }
      }
    },
    'selector': {
      pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
      lookbehind: true
    },
    'string': {
      pattern: string,
      greedy: true
    },
    'property': {
      pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
      lookbehind: true
    },
    'important': /!important\b/i,
    'function': {
      pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
      lookbehind: true
    },
    'punctuation': /[(){};:,]/
  };
  Prism.languages.css['atrule'].inside.rest = Prism.languages.css;
  var markup = Prism.languages.markup;
  if (markup) {
    markup.tag.addInlined('style', 'css');
    markup.tag.addAttribute('style', 'css');
  }
})(Prism);
(function (Prism) {
  Prism.languages.diff = {
    'coord': [
    // Match all kinds of coord lines (prefixed by "+++", "---" or "***").
    /^(?:\*{3}|-{3}|\+{3}).*$/m,
    // Match "@@ ... @@" coord lines in unified diff.
    /^@@.*@@$/m,
    // Match coord lines in normal diff (starts with a number).
    /^\d.*$/m]

    // deleted, inserted, unchanged, diff
  };

  /**
   * A map from the name of a block to its line prefix.
   *
   * @type {Object<string, string>}
   */
  var PREFIXES = {
    'deleted-sign': '-',
    'deleted-arrow': '<',
    'inserted-sign': '+',
    'inserted-arrow': '>',
    'unchanged': ' ',
    'diff': '!'
  };

  // add a token for each prefix
  Object.keys(PREFIXES).forEach(function (name) {
    var prefix = PREFIXES[name];
    var alias = [];
    if (!/^\w+$/.test(name)) {
      // "deleted-sign" -> "deleted"
      alias.push(/\w+/.exec(name)[0]);
    }
    if (name === 'diff') {
      alias.push('bold');
    }
    Prism.languages.diff[name] = {
      pattern: RegExp('^(?:[' + prefix + '].*(?:\r\n?|\n|(?![\\s\\S])))+', 'm'),
      alias: alias,
      inside: {
        'line': {
          pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/,
          lookbehind: true
        },
        'prefix': {
          pattern: /[\s\S]/,
          alias: /\w+/.exec(name)[0]
        }
      }
    };
  });

  // make prefixes available to Diff plugin
  Object.defineProperty(Prism.languages.diff, 'PREFIXES', {
    value: PREFIXES
  });
})(Prism);
Prism.languages.go = Prism.languages.extend('clike', {
  'string': {
    pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,
    lookbehind: true,
    greedy: true
  },
  'keyword': /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
  'boolean': /\b(?:_|false|iota|nil|true)\b/,
  'number': [
  // binary and octal integers
  /\b0(?:b[01_]+|o[0-7_]+)i?\b/i,
  // hexadecimal integers and floats
  /\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,
  // decimal integers and floats
  /(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i],
  'operator': /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
  'builtin': /\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/
});
Prism.languages.insertBefore('go', 'string', {
  'char': {
    pattern: /'(?:\\.|[^'\\\r\n]){0,10}'/,
    greedy: true
  }
});
delete Prism.languages.go['class-name'];
Prism.languages.ini = {
  /**
   * The component mimics the behavior of the Win32 API parser.
   *
   * @see {@link https://github.com/PrismJS/prism/issues/2775#issuecomment-787477723}
   */

  'comment': {
    pattern: /(^[ \f\t\v]*)[#;][^\n\r]*/m,
    lookbehind: true
  },
  'section': {
    pattern: /(^[ \f\t\v]*)\[[^\n\r\]]*\]?/m,
    lookbehind: true,
    inside: {
      'section-name': {
        pattern: /(^\[[ \f\t\v]*)[^ \f\t\v\]]+(?:[ \f\t\v]+[^ \f\t\v\]]+)*/,
        lookbehind: true,
        alias: 'selector'
      },
      'punctuation': /\[|\]/
    }
  },
  'key': {
    pattern: /(^[ \f\t\v]*)[^ \f\n\r\t\v=]+(?:[ \f\t\v]+[^ \f\n\r\t\v=]+)*(?=[ \f\t\v]*=)/m,
    lookbehind: true,
    alias: 'attr-name'
  },
  'value': {
    pattern: /(=[ \f\t\v]*)[^ \f\n\r\t\v]+(?:[ \f\t\v]+[^ \f\n\r\t\v]+)*/,
    lookbehind: true,
    alias: 'attr-value',
    inside: {
      'inner-value': {
        pattern: /^("|').+(?=\1$)/,
        lookbehind: true
      }
    }
  },
  'punctuation': /=/
};
(function (Prism) {
  var keywords = /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/;

  // full package (optional) + parent classes (optional)
  var classNamePrefix = /(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source;

  // based on the java naming conventions
  var className = {
    pattern: RegExp(/(^|[^\w.])/.source + classNamePrefix + /[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),
    lookbehind: true,
    inside: {
      'namespace': {
        pattern: /^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,
        inside: {
          'punctuation': /\./
        }
      },
      'punctuation': /\./
    }
  };
  Prism.languages.java = Prism.languages.extend('clike', {
    'string': {
      pattern: /(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,
      lookbehind: true,
      greedy: true
    },
    'class-name': [className, {
      // variables, parameters, and constructor references
      // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
      pattern: RegExp(/(^|[^\w.])/.source + classNamePrefix + /[A-Z]\w*(?=\s+\w+\s*[;,=()]|\s*(?:\[[\s,]*\]\s*)?::\s*new\b)/.source),
      lookbehind: true,
      inside: className.inside
    }, {
      // class names based on keyword
      // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)
      pattern: RegExp(/(\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\s+)/.source + classNamePrefix + /[A-Z]\w*\b/.source),
      lookbehind: true,
      inside: className.inside
    }],
    'keyword': keywords,
    'function': [Prism.languages.clike.function, {
      pattern: /(::\s*)[a-z_]\w*/,
      lookbehind: true
    }],
    'number': /\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
    'operator': {
      pattern: /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
      lookbehind: true
    },
    'constant': /\b[A-Z][A-Z_\d]+\b/
  });
  Prism.languages.insertBefore('java', 'string', {
    'triple-quoted-string': {
      // http://openjdk.java.net/jeps/355#Description
      pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
      greedy: true,
      alias: 'string'
    },
    'char': {
      pattern: /'(?:\\.|[^'\\\r\n]){1,6}'/,
      greedy: true
    }
  });
  Prism.languages.insertBefore('java', 'class-name', {
    'annotation': {
      pattern: /(^|[^.])@\w+(?:\s*\.\s*\w+)*/,
      lookbehind: true,
      alias: 'punctuation'
    },
    'generics': {
      pattern: /<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,
      inside: {
        'class-name': className,
        'keyword': keywords,
        'punctuation': /[<>(),.:]/,
        'operator': /[?&|]/
      }
    },
    'import': [{
      pattern: RegExp(/(\bimport\s+)/.source + classNamePrefix + /(?:[A-Z]\w*|\*)(?=\s*;)/.source),
      lookbehind: true,
      inside: {
        'namespace': className.inside.namespace,
        'punctuation': /\./,
        'operator': /\*/,
        'class-name': /\w+/
      }
    }, {
      pattern: RegExp(/(\bimport\s+static\s+)/.source + classNamePrefix + /(?:\w+|\*)(?=\s*;)/.source),
      lookbehind: true,
      alias: 'static',
      inside: {
        'namespace': className.inside.namespace,
        'static': /\b\w+$/,
        'punctuation': /\./,
        'operator': /\*/,
        'class-name': /\w+/
      }
    }],
    'namespace': {
      pattern: RegExp(/(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/.source.replace(/<keyword>/g, function () {
        return keywords.source;
      })),
      lookbehind: true,
      inside: {
        'punctuation': /\./
      }
    }
  });
})(Prism);
(function (Prism) {
  var specialEscape = {
    pattern: /\\[\\(){}[\]^$+*?|.]/,
    alias: 'escape'
  };
  var escape = /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/;
  var charSet = {
    pattern: /\.|\\[wsd]|\\p\{[^{}]+\}/i,
    alias: 'class-name'
  };
  var charSetWithoutDot = {
    pattern: /\\[wsd]|\\p\{[^{}]+\}/i,
    alias: 'class-name'
  };
  var rangeChar = '(?:[^\\\\-]|' + escape.source + ')';
  var range = RegExp(rangeChar + '-' + rangeChar);

  // the name of a capturing group
  var groupName = {
    pattern: /(<|')[^<>']+(?=[>']$)/,
    lookbehind: true,
    alias: 'variable'
  };
  Prism.languages.regex = {
    'char-class': {
      pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,
      lookbehind: true,
      inside: {
        'char-class-negation': {
          pattern: /(^\[)\^/,
          lookbehind: true,
          alias: 'operator'
        },
        'char-class-punctuation': {
          pattern: /^\[|\]$/,
          alias: 'punctuation'
        },
        'range': {
          pattern: range,
          inside: {
            'escape': escape,
            'range-punctuation': {
              pattern: /-/,
              alias: 'operator'
            }
          }
        },
        'special-escape': specialEscape,
        'char-set': charSetWithoutDot,
        'escape': escape
      }
    },
    'special-escape': specialEscape,
    'char-set': charSet,
    'backreference': [{
      // a backreference which is not an octal escape
      pattern: /\\(?![123][0-7]{2})[1-9]/,
      alias: 'keyword'
    }, {
      pattern: /\\k<[^<>']+>/,
      alias: 'keyword',
      inside: {
        'group-name': groupName
      }
    }],
    'anchor': {
      pattern: /[$^]|\\[ABbGZz]/,
      alias: 'function'
    },
    'escape': escape,
    'group': [{
      // https://docs.oracle.com/javase/10/docs/api/java/util/regex/Pattern.html
      // https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference?view=netframework-4.7.2#grouping-constructs

      // (), (?<name>), (?'name'), (?>), (?:), (?=), (?!), (?<=), (?<!), (?is-m), (?i-m:)
      pattern: /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,
      alias: 'punctuation',
      inside: {
        'group-name': groupName
      }
    }, {
      pattern: /\)/,
      alias: 'punctuation'
    }],
    'quantifier': {
      pattern: /(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/,
      alias: 'number'
    },
    'alternation': {
      pattern: /\|/,
      alias: 'keyword'
    }
  };
})(Prism);
Prism.languages.javascript = Prism.languages.extend('clike', {
  'class-name': [Prism.languages.clike['class-name'], {
    pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
    lookbehind: true
  }],
  'keyword': [{
    pattern: /((?:^|\})\s*)catch\b/,
    lookbehind: true
  }, {
    pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
    lookbehind: true
  }],
  // Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
  'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  'number': {
    pattern: RegExp(/(^|[^\w$])/.source + '(?:' + (
    // constant
    /NaN|Infinity/.source + '|' +
    // binary integer
    /0[bB][01]+(?:_[01]+)*n?/.source + '|' +
    // octal integer
    /0[oO][0-7]+(?:_[0-7]+)*n?/.source + '|' +
    // hexadecimal integer
    /0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source + '|' +
    // decimal bigint
    /\d+(?:_\d+)*n/.source + '|' +
    // decimal number (integer or float) but no bigint
    /(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source) + ')' + /(?![\w$])/.source),
    lookbehind: true
  },
  'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});
Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;
Prism.languages.insertBefore('javascript', 'keyword', {
  'regex': {
    pattern: RegExp(
    // lookbehind
    // eslint-disable-next-line regexp/no-dupe-characters-character-class
    /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
    // Regex pattern:
    // There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
    // classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
    // with the only syntax, so we have to define 2 different regex patterns.
    /\//.source + '(?:' + /(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source + '|' +
    // `v` flag syntax. This supports 3 levels of nested character classes.
    /(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source + ')' +
    // lookahead
    /(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),
    lookbehind: true,
    greedy: true,
    inside: {
      'regex-source': {
        pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
        lookbehind: true,
        alias: 'language-regex',
        inside: Prism.languages.regex
      },
      'regex-delimiter': /^\/|\/$/,
      'regex-flags': /^[a-z]+$/
    }
  },
  // This must be declared before keyword because we use "function" inside the look-forward
  'function-variable': {
    pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
    alias: 'function'
  },
  'parameter': [{
    pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
    lookbehind: true,
    inside: Prism.languages.javascript
  }, {
    pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
    lookbehind: true,
    inside: Prism.languages.javascript
  }, {
    pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
    lookbehind: true,
    inside: Prism.languages.javascript
  }, {
    pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
    lookbehind: true,
    inside: Prism.languages.javascript
  }],
  'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});
Prism.languages.insertBefore('javascript', 'string', {
  'hashbang': {
    pattern: /^#!.*/,
    greedy: true,
    alias: 'comment'
  },
  'template-string': {
    pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
    greedy: true,
    inside: {
      'template-punctuation': {
        pattern: /^`|`$/,
        alias: 'string'
      },
      'interpolation': {
        pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
        lookbehind: true,
        inside: {
          'interpolation-punctuation': {
            pattern: /^\$\{|\}$/,
            alias: 'punctuation'
          },
          rest: Prism.languages.javascript
        }
      },
      'string': /[\s\S]+/
    }
  },
  'string-property': {
    pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
    lookbehind: true,
    greedy: true,
    alias: 'property'
  }
});
Prism.languages.insertBefore('javascript', 'operator', {
  'literal-property': {
    pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
    lookbehind: true,
    alias: 'property'
  }
});
if (Prism.languages.markup) {
  Prism.languages.markup.tag.addInlined('script', 'javascript');

  // add attribute support for all DOM events.
  // https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
  Prism.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, 'javascript');
}
Prism.languages.js = Prism.languages.javascript;
(function (Prism) {
  var javascript = Prism.util.clone(Prism.languages.javascript);
  var space = /(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source;
  var braces = /(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source;
  var spread = /(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;

  /**
   * @param {string} source
   * @param {string} [flags]
   */
  function re(source, flags) {
    source = source.replace(/<S>/g, function () {
      return space;
    }).replace(/<BRACES>/g, function () {
      return braces;
    }).replace(/<SPREAD>/g, function () {
      return spread;
    });
    return RegExp(source, flags);
  }
  spread = re(spread).source;
  Prism.languages.jsx = Prism.languages.extend('markup', javascript);
  Prism.languages.jsx.tag.pattern = re(/<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source);
  Prism.languages.jsx.tag.inside['tag'].pattern = /^<\/?[^\s>\/]*/;
  Prism.languages.jsx.tag.inside['attr-value'].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/;
  Prism.languages.jsx.tag.inside['tag'].inside['class-name'] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/;
  Prism.languages.jsx.tag.inside['comment'] = javascript['comment'];
  Prism.languages.insertBefore('inside', 'attr-name', {
    'spread': {
      pattern: re(/<SPREAD>/.source),
      inside: Prism.languages.jsx
    }
  }, Prism.languages.jsx.tag);
  Prism.languages.insertBefore('inside', 'special-attr', {
    'script': {
      // Allow for two levels of nesting
      pattern: re(/=<BRACES>/.source),
      alias: 'language-javascript',
      inside: {
        'script-punctuation': {
          pattern: /^=(?=\{)/,
          alias: 'punctuation'
        },
        rest: Prism.languages.jsx
      }
    }
  }, Prism.languages.jsx.tag);

  // The following will handle plain text inside tags
  var stringifyToken = function (token) {
    if (!token) {
      return '';
    }
    if (typeof token === 'string') {
      return token;
    }
    if (typeof token.content === 'string') {
      return token.content;
    }
    return token.content.map(stringifyToken).join('');
  };
  var walkTokens = function (tokens) {
    var openedTags = [];
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      var notTagNorBrace = false;
      if (typeof token !== 'string') {
        if (token.type === 'tag' && token.content[0] && token.content[0].type === 'tag') {
          // We found a tag, now find its kind

          if (token.content[0].content[0].content === '</') {
            // Closing tag
            if (openedTags.length > 0 && openedTags[openedTags.length - 1].tagName === stringifyToken(token.content[0].content[1])) {
              // Pop matching opening tag
              openedTags.pop();
            }
          } else {
            if (token.content[token.content.length - 1].content === '/>') ; else {
              // Opening tag
              openedTags.push({
                tagName: stringifyToken(token.content[0].content[1]),
                openedBraces: 0
              });
            }
          }
        } else if (openedTags.length > 0 && token.type === 'punctuation' && token.content === '{') {
          // Here we might have entered a JSX context inside a tag
          openedTags[openedTags.length - 1].openedBraces++;
        } else if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces > 0 && token.type === 'punctuation' && token.content === '}') {
          // Here we might have left a JSX context inside a tag
          openedTags[openedTags.length - 1].openedBraces--;
        } else {
          notTagNorBrace = true;
        }
      }
      if (notTagNorBrace || typeof token === 'string') {
        if (openedTags.length > 0 && openedTags[openedTags.length - 1].openedBraces === 0) {
          // Here we are inside a tag, and not inside a JSX context.
          // That's plain text: drop any tokens matched.
          var plainText = stringifyToken(token);

          // And merge text with adjacent text
          if (i < tokens.length - 1 && (typeof tokens[i + 1] === 'string' || tokens[i + 1].type === 'plain-text')) {
            plainText += stringifyToken(tokens[i + 1]);
            tokens.splice(i + 1, 1);
          }
          if (i > 0 && (typeof tokens[i - 1] === 'string' || tokens[i - 1].type === 'plain-text')) {
            plainText = stringifyToken(tokens[i - 1]) + plainText;
            tokens.splice(i - 1, 1);
            i--;
          }
          tokens[i] = new Prism.Token('plain-text', plainText, null, plainText);
        }
      }
      if (token.content && typeof token.content !== 'string') {
        walkTokens(token.content);
      }
    }
  };
  Prism.hooks.add('after-tokenize', function (env) {
    if (env.language !== 'jsx' && env.language !== 'tsx') {
      return;
    }
    walkTokens(env.tokens);
  });
})(Prism);

// https://www.json.org/json-en.html
Prism.languages.json = {
  'property': {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
    lookbehind: true,
    greedy: true
  },
  'string': {
    pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
    lookbehind: true,
    greedy: true
  },
  'comment': {
    pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: true
  },
  'number': /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
  'punctuation': /[{}[\],]/,
  'operator': /:/,
  'boolean': /\b(?:false|true)\b/,
  'null': {
    pattern: /\bnull\b/,
    alias: 'keyword'
  }
};
Prism.languages.webmanifest = Prism.languages.json;
(function (Prism) {
  Prism.languages.kotlin = Prism.languages.extend('clike', {
    'keyword': {
      // The lookbehind prevents wrong highlighting of e.g. kotlin.properties.get
      pattern: /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
      lookbehind: true
    },
    'function': [{
      pattern: /(?:`[^\r\n`]+`|\b\w+)(?=\s*\()/,
      greedy: true
    }, {
      pattern: /(\.)(?:`[^\r\n`]+`|\w+)(?=\s*\{)/,
      lookbehind: true,
      greedy: true
    }],
    'number': /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
    'operator': /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/
  });
  delete Prism.languages.kotlin['class-name'];
  var interpolationInside = {
    'interpolation-punctuation': {
      pattern: /^\$\{?|\}$/,
      alias: 'punctuation'
    },
    'expression': {
      pattern: /[\s\S]+/,
      inside: Prism.languages.kotlin
    }
  };
  Prism.languages.insertBefore('kotlin', 'string', {
    // https://kotlinlang.org/spec/expressions.html#string-interpolation-expressions
    'string-literal': [{
      pattern: /"""(?:[^$]|\$(?:(?!\{)|\{[^{}]*\}))*?"""/,
      alias: 'multiline',
      inside: {
        'interpolation': {
          pattern: /\$(?:[a-z_]\w*|\{[^{}]*\})/i,
          inside: interpolationInside
        },
        'string': /[\s\S]+/
      }
    }, {
      pattern: /"(?:[^"\\\r\n$]|\\.|\$(?:(?!\{)|\{[^{}]*\}))*"/,
      alias: 'singleline',
      inside: {
        'interpolation': {
          pattern: /((?:^|[^\\])(?:\\{2})*)\$(?:[a-z_]\w*|\{[^{}]*\})/i,
          lookbehind: true,
          inside: interpolationInside
        },
        'string': /[\s\S]+/
      }
    }],
    'char': {
      // https://kotlinlang.org/spec/expressions.html#character-literals
      pattern: /'(?:[^'\\\r\n]|\\(?:.|u[a-fA-F0-9]{0,4}))'/,
      greedy: true
    }
  });
  delete Prism.languages.kotlin['string'];
  Prism.languages.insertBefore('kotlin', 'keyword', {
    'annotation': {
      pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
      alias: 'builtin'
    }
  });
  Prism.languages.insertBefore('kotlin', 'function', {
    'label': {
      pattern: /\b\w+@|@\w+\b/,
      alias: 'symbol'
    }
  });
  Prism.languages.kt = Prism.languages.kotlin;
  Prism.languages.kts = Prism.languages.kotlin;
})(Prism);

/* FIXME :
 :extend() is not handled specifically : its highlighting is buggy.
 Mixin usage must be inside a ruleset to be highlighted.
 At-rules (e.g. import) containing interpolations are buggy.
 Detached rulesets are highlighted as at-rules.
 A comment before a mixin usage prevents the latter to be properly highlighted.
 */

Prism.languages.less = Prism.languages.extend('css', {
  'comment': [/\/\*[\s\S]*?\*\//, {
    pattern: /(^|[^\\])\/\/.*/,
    lookbehind: true
  }],
  'atrule': {
    pattern: /@[\w-](?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};\s]|\s+(?!\s))*?(?=\s*\{)/,
    inside: {
      'punctuation': /[:()]/
    }
  },
  // selectors and mixins are considered the same
  'selector': {
    pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@\s]|\s+(?!\s))*?(?=\s*\{)/,
    inside: {
      // mixin parameters
      'variable': /@+[\w-]+/
    }
  },
  'property': /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/,
  'operator': /[+\-*\/]/
});
Prism.languages.insertBefore('less', 'property', {
  'variable': [
  // Variable declaration (the colon must be consumed!)
  {
    pattern: /@[\w-]+\s*:/,
    inside: {
      'punctuation': /:/
    }
  },
  // Variable usage
  /@@?[\w-]+/],
  'mixin-usage': {
    pattern: /([{;]\s*)[.#](?!\d)[\w-].*?(?=[(;])/,
    lookbehind: true,
    alias: 'function'
  }
});
Prism.languages.lua = {
  'comment': /^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,
  // \z may be used to skip the following space
  'string': {
    pattern: /(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[^z]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,
    greedy: true
  },
  'number': /\b0x[a-f\d]+(?:\.[a-f\d]*)?(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|(?:\.\d*)?(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,
  'keyword': /\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,
  'function': /(?!\d)\w+(?=\s*(?:[({]))/,
  'operator': [/[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/, {
    // Match ".." but don't break "..."
    pattern: /(^|[^.])\.\.(?!\.)/,
    lookbehind: true
  }],
  'punctuation': /[\[\](){},;]|\.+|:+/
};
Prism.languages.makefile = {
  'comment': {
    pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
    lookbehind: true
  },
  'string': {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  'builtin-target': {
    pattern: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
    alias: 'builtin'
  },
  'target': {
    pattern: /^(?:[^:=\s]|[ \t]+(?![\s:]))+(?=\s*:(?!=))/m,
    alias: 'symbol',
    inside: {
      'variable': /\$+(?:(?!\$)[^(){}:#=\s]+|(?=[({]))/
    }
  },
  'variable': /\$+(?:(?!\$)[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
  // Directives
  'keyword': /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
  'function': {
    pattern: /(\()(?:abspath|addsuffix|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:list|s)?)(?=[ \t])/,
    lookbehind: true
  },
  'operator': /(?:::|[?:+!])?=|[|@]/,
  'punctuation': /[:;(){}]/
};
(function (Prism) {
  // https://yaml.org/spec/1.2/spec.html#c-ns-anchor-property
  // https://yaml.org/spec/1.2/spec.html#c-ns-alias-node
  var anchorOrAlias = /[*&][^\s[\]{},]+/;
  // https://yaml.org/spec/1.2/spec.html#c-ns-tag-property
  var tag = /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/;
  // https://yaml.org/spec/1.2/spec.html#c-ns-properties(n,c)
  var properties = '(?:' + tag.source + '(?:[ \t]+' + anchorOrAlias.source + ')?|' + anchorOrAlias.source + '(?:[ \t]+' + tag.source + ')?)';
  // https://yaml.org/spec/1.2/spec.html#ns-plain(n,c)
  // This is a simplified version that doesn't support "#" and multiline keys
  // All these long scarry character classes are simplified versions of YAML's characters
  var plainKey = /(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g, function () {
    return /[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source;
  });
  var string = /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;

  /**
   *
   * @param {string} value
   * @param {string} [flags]
   * @returns {RegExp}
   */
  function createValuePattern(value, flags) {
    flags = (flags || '').replace(/m/g, '') + 'm'; // add m flag
    var pattern = /([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g, function () {
      return properties;
    }).replace(/<<value>>/g, function () {
      return value;
    });
    return RegExp(pattern, flags);
  }
  Prism.languages.yaml = {
    'scalar': {
      pattern: RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g, function () {
        return properties;
      })),
      lookbehind: true,
      alias: 'string'
    },
    'comment': /#.*/,
    'key': {
      pattern: RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g, function () {
        return properties;
      }).replace(/<<key>>/g, function () {
        return '(?:' + plainKey + '|' + string + ')';
      })),
      lookbehind: true,
      greedy: true,
      alias: 'atrule'
    },
    'directive': {
      pattern: /(^[ \t]*)%.+/m,
      lookbehind: true,
      alias: 'important'
    },
    'datetime': {
      pattern: createValuePattern(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),
      lookbehind: true,
      alias: 'number'
    },
    'boolean': {
      pattern: createValuePattern(/false|true/.source, 'i'),
      lookbehind: true,
      alias: 'important'
    },
    'null': {
      pattern: createValuePattern(/null|~/.source, 'i'),
      lookbehind: true,
      alias: 'important'
    },
    'string': {
      pattern: createValuePattern(string),
      lookbehind: true,
      greedy: true
    },
    'number': {
      pattern: createValuePattern(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source, 'i'),
      lookbehind: true
    },
    'tag': tag,
    'important': anchorOrAlias,
    'punctuation': /---|[:[\]{}\-,|>?]|\.\.\./
  };
  Prism.languages.yml = Prism.languages.yaml;
})(Prism);
(function (Prism) {
  // Allow only one line break
  var inner = /(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;

  /**
   * This function is intended for the creation of the bold or italic pattern.
   *
   * This also adds a lookbehind group to the given pattern to ensure that the pattern is not backslash-escaped.
   *
   * _Note:_ Keep in mind that this adds a capturing group.
   *
   * @param {string} pattern
   * @returns {RegExp}
   */
  function createInline(pattern) {
    pattern = pattern.replace(/<inner>/g, function () {
      return inner;
    });
    return RegExp(/((?:^|[^\\])(?:\\{2})*)/.source + '(?:' + pattern + ')');
  }
  var tableCell = /(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source;
  var tableRow = /\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g, function () {
    return tableCell;
  });
  var tableLine = /\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;
  Prism.languages.markdown = Prism.languages.extend('markup', {});
  Prism.languages.insertBefore('markdown', 'prolog', {
    'front-matter-block': {
      pattern: /(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,
      lookbehind: true,
      greedy: true,
      inside: {
        'punctuation': /^---|---$/,
        'front-matter': {
          pattern: /\S+(?:\s+\S+)*/,
          alias: ['yaml', 'language-yaml'],
          inside: Prism.languages.yaml
        }
      }
    },
    'blockquote': {
      // > ...
      pattern: /^>(?:[\t ]*>)*/m,
      alias: 'punctuation'
    },
    'table': {
      pattern: RegExp('^' + tableRow + tableLine + '(?:' + tableRow + ')*', 'm'),
      inside: {
        'table-data-rows': {
          pattern: RegExp('^(' + tableRow + tableLine + ')(?:' + tableRow + ')*$'),
          lookbehind: true,
          inside: {
            'table-data': {
              pattern: RegExp(tableCell),
              inside: Prism.languages.markdown
            },
            'punctuation': /\|/
          }
        },
        'table-line': {
          pattern: RegExp('^(' + tableRow + ')' + tableLine + '$'),
          lookbehind: true,
          inside: {
            'punctuation': /\||:?-{3,}:?/
          }
        },
        'table-header-row': {
          pattern: RegExp('^' + tableRow + '$'),
          inside: {
            'table-header': {
              pattern: RegExp(tableCell),
              alias: 'important',
              inside: Prism.languages.markdown
            },
            'punctuation': /\|/
          }
        }
      }
    },
    'code': [{
      // Prefixed by 4 spaces or 1 tab and preceded by an empty line
      pattern: /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
      lookbehind: true,
      alias: 'keyword'
    }, {
      // ```optional language
      // code block
      // ```
      pattern: /^```[\s\S]*?^```$/m,
      greedy: true,
      inside: {
        'code-block': {
          pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
          lookbehind: true
        },
        'code-language': {
          pattern: /^(```).+/,
          lookbehind: true
        },
        'punctuation': /```/
      }
    }],
    'title': [{
      // title 1
      // =======

      // title 2
      // -------
      pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
      alias: 'important',
      inside: {
        punctuation: /==+$|--+$/
      }
    }, {
      // # title 1
      // ###### title 6
      pattern: /(^\s*)#.+/m,
      lookbehind: true,
      alias: 'important',
      inside: {
        punctuation: /^#+|#+$/
      }
    }],
    'hr': {
      // ***
      // ---
      // * * *
      // -----------
      pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
      lookbehind: true,
      alias: 'punctuation'
    },
    'list': {
      // * item
      // + item
      // - item
      // 1. item
      pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
      lookbehind: true,
      alias: 'punctuation'
    },
    'url-reference': {
      // [id]: http://example.com "Optional title"
      // [id]: http://example.com 'Optional title'
      // [id]: http://example.com (Optional title)
      // [id]: <http://example.com> "Optional title"
      pattern: /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
      inside: {
        'variable': {
          pattern: /^(!?\[)[^\]]+/,
          lookbehind: true
        },
        'string': /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
        'punctuation': /^[\[\]!:]|[<>]/
      },
      alias: 'url'
    },
    'bold': {
      // **strong**
      // __strong__

      // allow one nested instance of italic text using the same delimiter
      pattern: createInline(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),
      lookbehind: true,
      greedy: true,
      inside: {
        'content': {
          pattern: /(^..)[\s\S]+(?=..$)/,
          lookbehind: true,
          inside: {} // see below
        },

        'punctuation': /\*\*|__/
      }
    },
    'italic': {
      // *em*
      // _em_

      // allow one nested instance of bold text using the same delimiter
      pattern: createInline(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),
      lookbehind: true,
      greedy: true,
      inside: {
        'content': {
          pattern: /(^.)[\s\S]+(?=.$)/,
          lookbehind: true,
          inside: {} // see below
        },

        'punctuation': /[*_]/
      }
    },
    'strike': {
      // ~~strike through~~
      // ~strike~
      // eslint-disable-next-line regexp/strict
      pattern: createInline(/(~~?)(?:(?!~)<inner>)+\2/.source),
      lookbehind: true,
      greedy: true,
      inside: {
        'content': {
          pattern: /(^~~?)[\s\S]+(?=\1$)/,
          lookbehind: true,
          inside: {} // see below
        },

        'punctuation': /~~?/
      }
    },
    'code-snippet': {
      // `code`
      // ``code``
      pattern: /(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,
      lookbehind: true,
      greedy: true,
      alias: ['code', 'keyword']
    },
    'url': {
      // [example](http://example.com "Optional title")
      // [example][id]
      // [example] [id]
      pattern: createInline(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),
      lookbehind: true,
      greedy: true,
      inside: {
        'operator': /^!/,
        'content': {
          pattern: /(^\[)[^\]]+(?=\])/,
          lookbehind: true,
          inside: {} // see below
        },

        'variable': {
          pattern: /(^\][ \t]?\[)[^\]]+(?=\]$)/,
          lookbehind: true
        },
        'url': {
          pattern: /(^\]\()[^\s)]+/,
          lookbehind: true
        },
        'string': {
          pattern: /(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,
          lookbehind: true
        }
      }
    }
  });
  ['url', 'bold', 'italic', 'strike'].forEach(function (token) {
    ['url', 'bold', 'italic', 'strike', 'code-snippet'].forEach(function (inside) {
      if (token !== inside) {
        Prism.languages.markdown[token].inside.content.inside[inside] = Prism.languages.markdown[inside];
      }
    });
  });
  Prism.hooks.add('after-tokenize', function (env) {
    if (env.language !== 'markdown' && env.language !== 'md') {
      return;
    }
    function walkTokens(tokens) {
      if (!tokens || typeof tokens === 'string') {
        return;
      }
      for (var i = 0, l = tokens.length; i < l; i++) {
        var token = tokens[i];
        if (token.type !== 'code') {
          walkTokens(token.content);
          continue;
        }

        /*
         * Add the correct `language-xxxx` class to this code block. Keep in mind that the `code-language` token
         * is optional. But the grammar is defined so that there is only one case we have to handle:
         *
         * token.content = [
         *     <span class="punctuation">```</span>,
         *     <span class="code-language">xxxx</span>,
         *     '\n', // exactly one new lines (\r or \n or \r\n)
         *     <span class="code-block">...</span>,
         *     '\n', // exactly one new lines again
         *     <span class="punctuation">```</span>
         * ];
         */

        var codeLang = token.content[1];
        var codeBlock = token.content[3];
        if (codeLang && codeBlock && codeLang.type === 'code-language' && codeBlock.type === 'code-block' && typeof codeLang.content === 'string') {
          // this might be a language that Prism does not support

          // do some replacements to support C++, C#, and F#
          var lang = codeLang.content.replace(/\b#/g, 'sharp').replace(/\b\+\+/g, 'pp');
          // only use the first word
          lang = (/[a-z][\w-]*/i.exec(lang) || [''])[0].toLowerCase();
          var alias = 'language-' + lang;

          // add alias
          if (!codeBlock.alias) {
            codeBlock.alias = [alias];
          } else if (typeof codeBlock.alias === 'string') {
            codeBlock.alias = [codeBlock.alias, alias];
          } else {
            codeBlock.alias.push(alias);
          }
        }
      }
    }
    walkTokens(env.tokens);
  });
  Prism.hooks.add('wrap', function (env) {
    if (env.type !== 'code-block') {
      return;
    }
    var codeLang = '';
    for (var i = 0, l = env.classes.length; i < l; i++) {
      var cls = env.classes[i];
      var match = /language-(.+)/.exec(cls);
      if (match) {
        codeLang = match[1];
        break;
      }
    }
    var grammar = Prism.languages[codeLang];
    if (!grammar) {
      if (codeLang && codeLang !== 'none' && Prism.plugins.autoloader) {
        var id = 'md-' + new Date().valueOf() + '-' + Math.floor(Math.random() * 1e16);
        env.attributes['id'] = id;
        Prism.plugins.autoloader.loadLanguages(codeLang, function () {
          var ele = document.getElementById(id);
          if (ele) {
            ele.innerHTML = Prism.highlight(ele.textContent, Prism.languages[codeLang], codeLang);
          }
        });
      }
    } else {
      env.content = Prism.highlight(textContent(env.content), grammar, codeLang);
    }
  });
  var tagPattern = RegExp(Prism.languages.markup.tag.pattern.source, 'gi');

  /**
   * A list of known entity names.
   *
   * This will always be incomplete to save space. The current list is the one used by lowdash's unescape function.
   *
   * @see {@link https://github.com/lodash/lodash/blob/2da024c3b4f9947a48517639de7560457cd4ec6c/unescape.js#L2}
   */
  var KNOWN_ENTITY_NAMES = {
    'amp': '&',
    'lt': '<',
    'gt': '>',
    'quot': '"'
  };

  // IE 11 doesn't support `String.fromCodePoint`
  var fromCodePoint = String.fromCodePoint || String.fromCharCode;

  /**
   * Returns the text content of a given HTML source code string.
   *
   * @param {string} html
   * @returns {string}
   */
  function textContent(html) {
    // remove all tags
    var text = html.replace(tagPattern, '');

    // decode known entities
    text = text.replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi, function (m, code) {
      code = code.toLowerCase();
      if (code[0] === '#') {
        var value;
        if (code[1] === 'x') {
          value = parseInt(code.slice(2), 16);
        } else {
          value = Number(code.slice(1));
        }
        return fromCodePoint(value);
      } else {
        var known = KNOWN_ENTITY_NAMES[code];
        if (known) {
          return known;
        }

        // unable to decode
        return m;
      }
    });
    return text;
  }
  Prism.languages.md = Prism.languages.markdown;
})(Prism);
Prism.languages.objectivec = Prism.languages.extend('c', {
  'string': {
    pattern: /@?"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
    greedy: true
  },
  'keyword': /\b(?:asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|in|inline|int|long|register|return|self|short|signed|sizeof|static|struct|super|switch|typedef|typeof|union|unsigned|void|volatile|while)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
  'operator': /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/
});
delete Prism.languages.objectivec['class-name'];
Prism.languages.objc = Prism.languages.objectivec;
(function (Prism) {
  var brackets = /(?:\((?:[^()\\]|\\[\s\S])*\)|\{(?:[^{}\\]|\\[\s\S])*\}|\[(?:[^[\]\\]|\\[\s\S])*\]|<(?:[^<>\\]|\\[\s\S])*>)/.source;
  Prism.languages.perl = {
    'comment': [{
      // POD
      pattern: /(^\s*)=\w[\s\S]*?=cut.*/m,
      lookbehind: true,
      greedy: true
    }, {
      pattern: /(^|[^\\$])#.*/,
      lookbehind: true,
      greedy: true
    }],
    // TODO Could be nice to handle Heredoc too.
    'string': [{
      pattern: RegExp(/\b(?:q|qq|qw|qx)(?![a-zA-Z0-9])\s*/.source + '(?:' + [
      // q/.../
      /([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,
      // q a...a
      // eslint-disable-next-line regexp/strict
      /([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2/.source,
      // q(...)
      // q{...}
      // q[...]
      // q<...>
      brackets].join('|') + ')'),
      greedy: true
    },
    // "...", `...`
    {
      pattern: /("|`)(?:(?!\1)[^\\]|\\[\s\S])*\1/,
      greedy: true
    },
    // '...'
    // FIXME Multi-line single-quoted strings are not supported as they would break variables containing '
    {
      pattern: /'(?:[^'\\\r\n]|\\.)*'/,
      greedy: true
    }],
    'regex': [{
      pattern: RegExp(/\b(?:m|qr)(?![a-zA-Z0-9])\s*/.source + '(?:' + [
      // m/.../
      /([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,
      // m a...a
      // eslint-disable-next-line regexp/strict
      /([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2/.source,
      // m(...)
      // m{...}
      // m[...]
      // m<...>
      brackets].join('|') + ')' + /[msixpodualngc]*/.source),
      greedy: true
    },
    // The lookbehinds prevent -s from breaking
    {
      pattern: RegExp(/(^|[^-])\b(?:s|tr|y)(?![a-zA-Z0-9])\s*/.source + '(?:' + [
      // s/.../.../
      // eslint-disable-next-line regexp/strict
      /([^a-zA-Z0-9\s{(\[<])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2/.source,
      // s a...a...a
      // eslint-disable-next-line regexp/strict
      /([a-zA-Z0-9])(?:(?!\3)[^\\]|\\[\s\S])*\3(?:(?!\3)[^\\]|\\[\s\S])*\3/.source,
      // s(...)(...)
      // s{...}{...}
      // s[...][...]
      // s<...><...>
      // s(...)[...]
      brackets + /\s*/.source + brackets].join('|') + ')' + /[msixpodualngcer]*/.source),
      lookbehind: true,
      greedy: true
    },
    // /.../
    // The look-ahead tries to prevent two divisions on
    // the same line from being highlighted as regex.
    // This does not support multi-line regex.
    {
      pattern: /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(?:and|cmp|eq|ge|gt|le|lt|ne|not|or|x|xor)\b))/,
      greedy: true
    }],
    // FIXME Not sure about the handling of ::, ', and #
    'variable': [
    // ${^POSTMATCH}
    /[&*$@%]\{\^[A-Z]+\}/,
    // $^V
    /[&*$@%]\^[A-Z_]/,
    // ${...}
    /[&*$@%]#?(?=\{)/,
    // $foo
    /[&*$@%]#?(?:(?:::)*'?(?!\d)[\w$]+(?![\w$]))+(?:::)*/,
    // $1
    /[&*$@%]\d+/,
    // $_, @_, %!
    // The negative lookahead prevents from breaking the %= operator
    /(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/],
    'filehandle': {
      // <>, <FOO>, _
      pattern: /<(?![<=])\S*?>|\b_\b/,
      alias: 'symbol'
    },
    'v-string': {
      // v1.2, 1.2.3
      pattern: /v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/,
      alias: 'string'
    },
    'function': {
      pattern: /(\bsub[ \t]+)\w+/,
      lookbehind: true
    },
    'keyword': /\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
    'number': /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)\b/,
    'operator': /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(?:and|cmp|eq|ge|gt|le|lt|ne|not|or|xor)\b/,
    'punctuation': /[{}[\];(),:]/
  };
})(Prism);
(function (Prism) {
  /**
   * Returns the placeholder for the given language id and index.
   *
   * @param {string} language
   * @param {string|number} index
   * @returns {string}
   */
  function getPlaceholder(language, index) {
    return '___' + language.toUpperCase() + index + '___';
  }
  Object.defineProperties(Prism.languages['markup-templating'] = {}, {
    buildPlaceholders: {
      /**
       * Tokenize all inline templating expressions matching `placeholderPattern`.
       *
       * If `replaceFilter` is provided, only matches of `placeholderPattern` for which `replaceFilter` returns
       * `true` will be replaced.
       *
       * @param {object} env The environment of the `before-tokenize` hook.
       * @param {string} language The language id.
       * @param {RegExp} placeholderPattern The matches of this pattern will be replaced by placeholders.
       * @param {(match: string) => boolean} [replaceFilter]
       */
      value: function (env, language, placeholderPattern, replaceFilter) {
        if (env.language !== language) {
          return;
        }
        var tokenStack = env.tokenStack = [];
        env.code = env.code.replace(placeholderPattern, function (match) {
          if (typeof replaceFilter === 'function' && !replaceFilter(match)) {
            return match;
          }
          var i = tokenStack.length;
          var placeholder;

          // Check for existing strings
          while (env.code.indexOf(placeholder = getPlaceholder(language, i)) !== -1) {
            ++i;
          }

          // Create a sparse array
          tokenStack[i] = match;
          return placeholder;
        });

        // Switch the grammar to markup
        env.grammar = Prism.languages.markup;
      }
    },
    tokenizePlaceholders: {
      /**
       * Replace placeholders with proper tokens after tokenizing.
       *
       * @param {object} env The environment of the `after-tokenize` hook.
       * @param {string} language The language id.
       */
      value: function (env, language) {
        if (env.language !== language || !env.tokenStack) {
          return;
        }

        // Switch the grammar back
        env.grammar = Prism.languages[language];
        var j = 0;
        var keys = Object.keys(env.tokenStack);
        function walkTokens(tokens) {
          for (var i = 0; i < tokens.length; i++) {
            // all placeholders are replaced already
            if (j >= keys.length) {
              break;
            }
            var token = tokens[i];
            if (typeof token === 'string' || token.content && typeof token.content === 'string') {
              var k = keys[j];
              var t = env.tokenStack[k];
              var s = typeof token === 'string' ? token : token.content;
              var placeholder = getPlaceholder(language, k);
              var index = s.indexOf(placeholder);
              if (index > -1) {
                ++j;
                var before = s.substring(0, index);
                var middle = new Prism.Token(language, Prism.tokenize(t, env.grammar), 'language-' + language, t);
                var after = s.substring(index + placeholder.length);
                var replacement = [];
                if (before) {
                  replacement.push.apply(replacement, walkTokens([before]));
                }
                replacement.push(middle);
                if (after) {
                  replacement.push.apply(replacement, walkTokens([after]));
                }
                if (typeof token === 'string') {
                  tokens.splice.apply(tokens, [i, 1].concat(replacement));
                } else {
                  token.content = replacement;
                }
              }
            } else if (token.content /* && typeof token.content !== 'string' */) {
              walkTokens(token.content);
            }
          }
          return tokens;
        }
        walkTokens(env.tokens);
      }
    }
  });
})(Prism);

/**
 * Original by Aaron Harun: http://aahacreative.com/2012/07/31/php-syntax-highlighting-prism/
 * Modified by Miles Johnson: http://milesj.me
 * Rewritten by Tom Pavelec
 *
 * Supports PHP 5.3 - 8.0
 */
(function (Prism) {
  var comment = /\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/;
  var constant = [{
    pattern: /\b(?:false|true)\b/i,
    alias: 'boolean'
  }, {
    pattern: /(::\s*)\b[a-z_]\w*\b(?!\s*\()/i,
    greedy: true,
    lookbehind: true
  }, {
    pattern: /(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i,
    greedy: true,
    lookbehind: true
  }, /\b(?:null)\b/i, /\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/];
  var number = /\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i;
  var operator = /<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/;
  var punctuation = /[{}\[\](),:;]/;
  Prism.languages.php = {
    'delimiter': {
      pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
      alias: 'important'
    },
    'comment': comment,
    'variable': /\$+(?:\w+\b|(?=\{))/,
    'package': {
      pattern: /(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
      lookbehind: true,
      inside: {
        'punctuation': /\\/
      }
    },
    'class-name-definition': {
      pattern: /(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,
      lookbehind: true,
      alias: 'class-name'
    },
    'function-definition': {
      pattern: /(\bfunction\s+)[a-z_]\w*(?=\s*\()/i,
      lookbehind: true,
      alias: 'function'
    },
    'keyword': [{
      pattern: /(\(\s*)\b(?:array|bool|boolean|float|int|integer|object|string)\b(?=\s*\))/i,
      alias: 'type-casting',
      greedy: true,
      lookbehind: true
    }, {
      pattern: /([(,?]\s*)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string)\b(?=\s*\$)/i,
      alias: 'type-hint',
      greedy: true,
      lookbehind: true
    }, {
      pattern: /(\)\s*:\s*(?:\?\s*)?)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|never|object|self|static|string|void)\b/i,
      alias: 'return-type',
      greedy: true,
      lookbehind: true
    }, {
      pattern: /\b(?:array(?!\s*\()|bool|float|int|iterable|mixed|object|string|void)\b/i,
      alias: 'type-declaration',
      greedy: true
    }, {
      pattern: /(\|\s*)(?:false|null)\b|\b(?:false|null)(?=\s*\|)/i,
      alias: 'type-declaration',
      greedy: true,
      lookbehind: true
    }, {
      pattern: /\b(?:parent|self|static)(?=\s*::)/i,
      alias: 'static-context',
      greedy: true
    }, {
      // yield from
      pattern: /(\byield\s+)from\b/i,
      lookbehind: true
    },
    // `class` is always a keyword unlike other keywords
    /\bclass\b/i, {
      // https://www.php.net/manual/en/reserved.keywords.php
      //
      // keywords cannot be preceded by "->"
      // the complex lookbehind means `(?<!(?:->|::)\s*)`
      pattern: /((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|never|new|or|parent|print|private|protected|public|readonly|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield|__halt_compiler)\b/i,
      lookbehind: true
    }],
    'argument-name': {
      pattern: /([(,]\s*)\b[a-z_]\w*(?=\s*:(?!:))/i,
      lookbehind: true
    },
    'class-name': [{
      pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,
      greedy: true,
      lookbehind: true
    }, {
      pattern: /(\|\s*)\b[a-z_]\w*(?!\\)\b/i,
      greedy: true,
      lookbehind: true
    }, {
      pattern: /\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i,
      greedy: true
    }, {
      pattern: /(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,
      alias: 'class-name-fully-qualified',
      greedy: true,
      lookbehind: true,
      inside: {
        'punctuation': /\\/
      }
    }, {
      pattern: /(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,
      alias: 'class-name-fully-qualified',
      greedy: true,
      inside: {
        'punctuation': /\\/
      }
    }, {
      pattern: /(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
      alias: 'class-name-fully-qualified',
      greedy: true,
      lookbehind: true,
      inside: {
        'punctuation': /\\/
      }
    }, {
      pattern: /\b[a-z_]\w*(?=\s*\$)/i,
      alias: 'type-declaration',
      greedy: true
    }, {
      pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
      alias: ['class-name-fully-qualified', 'type-declaration'],
      greedy: true,
      inside: {
        'punctuation': /\\/
      }
    }, {
      pattern: /\b[a-z_]\w*(?=\s*::)/i,
      alias: 'static-context',
      greedy: true
    }, {
      pattern: /(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,
      alias: ['class-name-fully-qualified', 'static-context'],
      greedy: true,
      inside: {
        'punctuation': /\\/
      }
    }, {
      pattern: /([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,
      alias: 'type-hint',
      greedy: true,
      lookbehind: true
    }, {
      pattern: /([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,
      alias: ['class-name-fully-qualified', 'type-hint'],
      greedy: true,
      lookbehind: true,
      inside: {
        'punctuation': /\\/
      }
    }, {
      pattern: /(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i,
      alias: 'return-type',
      greedy: true,
      lookbehind: true
    }, {
      pattern: /(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,
      alias: ['class-name-fully-qualified', 'return-type'],
      greedy: true,
      lookbehind: true,
      inside: {
        'punctuation': /\\/
      }
    }],
    'constant': constant,
    'function': {
      pattern: /(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i,
      lookbehind: true,
      inside: {
        'punctuation': /\\/
      }
    },
    'property': {
      pattern: /(->\s*)\w+/,
      lookbehind: true
    },
    'number': number,
    'operator': operator,
    'punctuation': punctuation
  };
  var string_interpolation = {
    pattern: /\{\$(?:\{(?:\{[^{}]+\}|[^{}]+)\}|[^{}])+\}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)?)/,
    lookbehind: true,
    inside: Prism.languages.php
  };
  var string = [{
    pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
    alias: 'nowdoc-string',
    greedy: true,
    inside: {
      'delimiter': {
        pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
        alias: 'symbol',
        inside: {
          'punctuation': /^<<<'?|[';]$/
        }
      }
    }
  }, {
    pattern: /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
    alias: 'heredoc-string',
    greedy: true,
    inside: {
      'delimiter': {
        pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
        alias: 'symbol',
        inside: {
          'punctuation': /^<<<"?|[";]$/
        }
      },
      'interpolation': string_interpolation
    }
  }, {
    pattern: /`(?:\\[\s\S]|[^\\`])*`/,
    alias: 'backtick-quoted-string',
    greedy: true
  }, {
    pattern: /'(?:\\[\s\S]|[^\\'])*'/,
    alias: 'single-quoted-string',
    greedy: true
  }, {
    pattern: /"(?:\\[\s\S]|[^\\"])*"/,
    alias: 'double-quoted-string',
    greedy: true,
    inside: {
      'interpolation': string_interpolation
    }
  }];
  Prism.languages.insertBefore('php', 'variable', {
    'string': string,
    'attribute': {
      pattern: /#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,
      greedy: true,
      inside: {
        'attribute-content': {
          pattern: /^(#\[)[\s\S]+(?=\]$)/,
          lookbehind: true,
          // inside can appear subset of php
          inside: {
            'comment': comment,
            'string': string,
            'attribute-class-name': [{
              pattern: /([^:]|^)\b[a-z_]\w*(?!\\)\b/i,
              alias: 'class-name',
              greedy: true,
              lookbehind: true
            }, {
              pattern: /([^:]|^)(?:\\?\b[a-z_]\w*)+/i,
              alias: ['class-name', 'class-name-fully-qualified'],
              greedy: true,
              lookbehind: true,
              inside: {
                'punctuation': /\\/
              }
            }],
            'constant': constant,
            'number': number,
            'operator': operator,
            'punctuation': punctuation
          }
        },
        'delimiter': {
          pattern: /^#\[|\]$/,
          alias: 'punctuation'
        }
      }
    }
  });
  Prism.hooks.add('before-tokenize', function (env) {
    if (!/<\?/.test(env.code)) {
      return;
    }
    var phpPattern = /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/g;
    Prism.languages['markup-templating'].buildPlaceholders(env, 'php', phpPattern);
  });
  Prism.hooks.add('after-tokenize', function (env) {
    Prism.languages['markup-templating'].tokenizePlaceholders(env, 'php');
  });
})(Prism);
Prism.languages.python = {
  'comment': {
    pattern: /(^|[^\\])#.*/,
    lookbehind: true,
    greedy: true
  },
  'string-interpolation': {
    pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
    greedy: true,
    inside: {
      'interpolation': {
        // "{" <expression> <optional "!s", "!r", or "!a"> <optional ":" format specifier> "}"
        pattern: /((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,
        lookbehind: true,
        inside: {
          'format-spec': {
            pattern: /(:)[^:(){}]+(?=\}$)/,
            lookbehind: true
          },
          'conversion-option': {
            pattern: /![sra](?=[:}]$)/,
            alias: 'punctuation'
          },
          rest: null
        }
      },
      'string': /[\s\S]+/
    }
  },
  'triple-quoted-string': {
    pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
    greedy: true,
    alias: 'string'
  },
  'string': {
    pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
    greedy: true
  },
  'function': {
    pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
    lookbehind: true
  },
  'class-name': {
    pattern: /(\bclass\s+)\w+/i,
    lookbehind: true
  },
  'decorator': {
    pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
    lookbehind: true,
    alias: ['annotation', 'punctuation'],
    inside: {
      'punctuation': /\./
    }
  },
  'keyword': /\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
  'builtin': /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
  'boolean': /\b(?:False|None|True)\b/,
  'number': /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
  'operator': /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
  'punctuation': /[{}[\];(),.:]/
};
Prism.languages.python['string-interpolation'].inside['interpolation'].inside.rest = Prism.languages.python;
Prism.languages.py = Prism.languages.python;
Prism.languages.r = {
  'comment': /#.*/,
  'string': {
    pattern: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  'percent-operator': {
    // Includes user-defined operators
    // and %%, %*%, %/%, %in%, %o%, %x%
    pattern: /%[^%\s]*%/,
    alias: 'operator'
  },
  'boolean': /\b(?:FALSE|TRUE)\b/,
  'ellipsis': /\.\.(?:\.|\d+)/,
  'number': [/\b(?:Inf|NaN)\b/, /(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+(?:\.\d*)?|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/],
  'keyword': /\b(?:NA|NA_character_|NA_complex_|NA_integer_|NA_real_|NULL|break|else|for|function|if|in|next|repeat|while)\b/,
  'operator': /->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,
  'punctuation': /[(){}\[\],;]/
};

/**
 * Original by Samuel Flores
 *
 * Adds the following new token classes:
 *     constant, builtin, variable, symbol, regex
 */
(function (Prism) {
  Prism.languages.ruby = Prism.languages.extend('clike', {
    'comment': {
      pattern: /#.*|^=begin\s[\s\S]*?^=end/m,
      greedy: true
    },
    'class-name': {
      pattern: /(\b(?:class|module)\s+|\bcatch\s+\()[\w.\\]+|\b[A-Z_]\w*(?=\s*\.\s*new\b)/,
      lookbehind: true,
      inside: {
        'punctuation': /[.\\]/
      }
    },
    'keyword': /\b(?:BEGIN|END|alias|and|begin|break|case|class|def|define_method|defined|do|each|else|elsif|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|private|protected|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/,
    'operator': /\.{2,3}|&\.|===|<?=>|[!=]?~|(?:&&|\|\||<<|>>|\*\*|[+\-*/%<>!^&|=])=?|[?:]/,
    'punctuation': /[(){}[\].,;]/
  });
  Prism.languages.insertBefore('ruby', 'operator', {
    'double-colon': {
      pattern: /::/,
      alias: 'punctuation'
    }
  });
  var interpolation = {
    pattern: /((?:^|[^\\])(?:\\{2})*)#\{(?:[^{}]|\{[^{}]*\})*\}/,
    lookbehind: true,
    inside: {
      'content': {
        pattern: /^(#\{)[\s\S]+(?=\}$)/,
        lookbehind: true,
        inside: Prism.languages.ruby
      },
      'delimiter': {
        pattern: /^#\{|\}$/,
        alias: 'punctuation'
      }
    }
  };
  delete Prism.languages.ruby.function;
  var percentExpression = '(?:' + [/([^a-zA-Z0-9\s{(\[<=])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source, /\((?:[^()\\]|\\[\s\S]|\((?:[^()\\]|\\[\s\S])*\))*\)/.source, /\{(?:[^{}\\]|\\[\s\S]|\{(?:[^{}\\]|\\[\s\S])*\})*\}/.source, /\[(?:[^\[\]\\]|\\[\s\S]|\[(?:[^\[\]\\]|\\[\s\S])*\])*\]/.source, /<(?:[^<>\\]|\\[\s\S]|<(?:[^<>\\]|\\[\s\S])*>)*>/.source].join('|') + ')';
  var symbolName = /(?:"(?:\\.|[^"\\\r\n])*"|(?:\b[a-zA-Z_]\w*|[^\s\0-\x7F]+)[?!]?|\$.)/.source;
  Prism.languages.insertBefore('ruby', 'keyword', {
    'regex-literal': [{
      pattern: RegExp(/%r/.source + percentExpression + /[egimnosux]{0,6}/.source),
      greedy: true,
      inside: {
        'interpolation': interpolation,
        'regex': /[\s\S]+/
      }
    }, {
      pattern: /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[egimnosux]{0,6}(?=\s*(?:$|[\r\n,.;})#]))/,
      lookbehind: true,
      greedy: true,
      inside: {
        'interpolation': interpolation,
        'regex': /[\s\S]+/
      }
    }],
    'variable': /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
    'symbol': [{
      pattern: RegExp(/(^|[^:]):/.source + symbolName),
      lookbehind: true,
      greedy: true
    }, {
      pattern: RegExp(/([\r\n{(,][ \t]*)/.source + symbolName + /(?=:(?!:))/.source),
      lookbehind: true,
      greedy: true
    }],
    'method-definition': {
      pattern: /(\bdef\s+)\w+(?:\s*\.\s*\w+)?/,
      lookbehind: true,
      inside: {
        'function': /\b\w+$/,
        'keyword': /^self\b/,
        'class-name': /^\w+/,
        'punctuation': /\./
      }
    }
  });
  Prism.languages.insertBefore('ruby', 'string', {
    'string-literal': [{
      pattern: RegExp(/%[qQiIwWs]?/.source + percentExpression),
      greedy: true,
      inside: {
        'interpolation': interpolation,
        'string': /[\s\S]+/
      }
    }, {
      pattern: /("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/,
      greedy: true,
      inside: {
        'interpolation': interpolation,
        'string': /[\s\S]+/
      }
    }, {
      pattern: /<<[-~]?([a-z_]\w*)[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
      alias: 'heredoc-string',
      greedy: true,
      inside: {
        'delimiter': {
          pattern: /^<<[-~]?[a-z_]\w*|\b[a-z_]\w*$/i,
          inside: {
            'symbol': /\b\w+/,
            'punctuation': /^<<[-~]?/
          }
        },
        'interpolation': interpolation,
        'string': /[\s\S]+/
      }
    }, {
      pattern: /<<[-~]?'([a-z_]\w*)'[\r\n](?:.*[\r\n])*?[\t ]*\1/i,
      alias: 'heredoc-string',
      greedy: true,
      inside: {
        'delimiter': {
          pattern: /^<<[-~]?'[a-z_]\w*'|\b[a-z_]\w*$/i,
          inside: {
            'symbol': /\b\w+/,
            'punctuation': /^<<[-~]?'|'$/
          }
        },
        'string': /[\s\S]+/
      }
    }],
    'command-literal': [{
      pattern: RegExp(/%x/.source + percentExpression),
      greedy: true,
      inside: {
        'interpolation': interpolation,
        'command': {
          pattern: /[\s\S]+/,
          alias: 'string'
        }
      }
    }, {
      pattern: /`(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|[^\\`#\r\n])*`/,
      greedy: true,
      inside: {
        'interpolation': interpolation,
        'command': {
          pattern: /[\s\S]+/,
          alias: 'string'
        }
      }
    }]
  });
  delete Prism.languages.ruby.string;
  Prism.languages.insertBefore('ruby', 'number', {
    'builtin': /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Fixnum|Float|Hash|IO|Integer|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|Stat|String|Struct|Symbol|TMS|Thread|ThreadGroup|Time|TrueClass)\b/,
    'constant': /\b[A-Z][A-Z0-9_]*(?:[?!]|\b)/
  });
  Prism.languages.rb = Prism.languages.ruby;
})(Prism);
(function (Prism) {
  var multilineComment = /\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source;
  for (var i = 0; i < 2; i++) {
    // support 4 levels of nested comments
    multilineComment = multilineComment.replace(/<self>/g, function () {
      return multilineComment;
    });
  }
  multilineComment = multilineComment.replace(/<self>/g, function () {
    return /[^\s\S]/.source;
  });
  Prism.languages.rust = {
    'comment': [{
      pattern: RegExp(/(^|[^\\])/.source + multilineComment),
      lookbehind: true,
      greedy: true
    }, {
      pattern: /(^|[^\\:])\/\/.*/,
      lookbehind: true,
      greedy: true
    }],
    'string': {
      pattern: /b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,
      greedy: true
    },
    'char': {
      pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,
      greedy: true
    },
    'attribute': {
      pattern: /#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,
      greedy: true,
      alias: 'attr-name',
      inside: {
        'string': null // see below
      }
    },

    // Closure params should not be confused with bitwise OR |
    'closure-params': {
      pattern: /([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,
      lookbehind: true,
      greedy: true,
      inside: {
        'closure-punctuation': {
          pattern: /^\||\|$/,
          alias: 'punctuation'
        },
        rest: null // see below
      }
    },

    'lifetime-annotation': {
      pattern: /'\w+/,
      alias: 'symbol'
    },
    'fragment-specifier': {
      pattern: /(\$\w+:)[a-z]+/,
      lookbehind: true,
      alias: 'punctuation'
    },
    'variable': /\$\w+/,
    'function-definition': {
      pattern: /(\bfn\s+)\w+/,
      lookbehind: true,
      alias: 'function'
    },
    'type-definition': {
      pattern: /(\b(?:enum|struct|trait|type|union)\s+)\w+/,
      lookbehind: true,
      alias: 'class-name'
    },
    'module-declaration': [{
      pattern: /(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,
      lookbehind: true,
      alias: 'namespace'
    }, {
      pattern: /(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,
      lookbehind: true,
      alias: 'namespace',
      inside: {
        'punctuation': /::/
      }
    }],
    'keyword': [
    // https://github.com/rust-lang/reference/blob/master/src/keywords.md
    /\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
    // primitives and str
    // https://doc.rust-lang.org/stable/rust-by-example/primitives.html
    /\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/],
    // functions can technically start with an upper-case letter, but this will introduce a lot of false positives
    // and Rust's naming conventions recommend snake_case anyway.
    // https://doc.rust-lang.org/1.0.0/style/style/naming/README.html
    'function': /\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,
    'macro': {
      pattern: /\b\w+!/,
      alias: 'property'
    },
    'constant': /\b[A-Z_][A-Z_\d]+\b/,
    'class-name': /\b[A-Z]\w*\b/,
    'namespace': {
      pattern: /(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,
      inside: {
        'punctuation': /::/
      }
    },
    // Hex, oct, bin, dec numbers with visual separators and type suffix
    'number': /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,
    'boolean': /\b(?:false|true)\b/,
    'punctuation': /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
    'operator': /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/
  };
  Prism.languages.rust['closure-params'].inside.rest = Prism.languages.rust;
  Prism.languages.rust['attribute'].inside['string'] = Prism.languages.rust['string'];
})(Prism);
(function (Prism) {
  Prism.languages.sass = Prism.languages.extend('css', {
    // Sass comments don't need to be closed, only indented
    'comment': {
      pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t].+)*/m,
      lookbehind: true,
      greedy: true
    }
  });
  Prism.languages.insertBefore('sass', 'atrule', {
    // We want to consume the whole line
    'atrule-line': {
      // Includes support for = and + shortcuts
      pattern: /^(?:[ \t]*)[@+=].+/m,
      greedy: true,
      inside: {
        'atrule': /(?:@[\w-]+|[+=])/
      }
    }
  });
  delete Prism.languages.sass.atrule;
  var variable = /\$[-\w]+|#\{\$[-\w]+\}/;
  var operator = [/[+*\/%]|[=!]=|<=?|>=?|\b(?:and|not|or)\b/, {
    pattern: /(\s)-(?=\s)/,
    lookbehind: true
  }];
  Prism.languages.insertBefore('sass', 'property', {
    // We want to consume the whole line
    'variable-line': {
      pattern: /^[ \t]*\$.+/m,
      greedy: true,
      inside: {
        'punctuation': /:/,
        'variable': variable,
        'operator': operator
      }
    },
    // We want to consume the whole line
    'property-line': {
      pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s].*)/m,
      greedy: true,
      inside: {
        'property': [/[^:\s]+(?=\s*:)/, {
          pattern: /(:)[^:\s]+/,
          lookbehind: true
        }],
        'punctuation': /:/,
        'variable': variable,
        'operator': operator,
        'important': Prism.languages.sass.important
      }
    }
  });
  delete Prism.languages.sass.property;
  delete Prism.languages.sass.important;

  // Now that whole lines for other patterns are consumed,
  // what's left should be selectors
  Prism.languages.insertBefore('sass', 'punctuation', {
    'selector': {
      pattern: /^([ \t]*)\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,[^,\r\n]+|[^,\r\n]*)(?:,[^,\r\n]+)*)*/m,
      lookbehind: true,
      greedy: true
    }
  });
})(Prism);
Prism.languages.scss = Prism.languages.extend('css', {
  'comment': {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
    lookbehind: true
  },
  'atrule': {
    pattern: /@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,
    inside: {
      'rule': /@[\w-]+/
      // See rest below
    }
  },

  // url, compassified
  'url': /(?:[-a-z]+-)?url(?=\()/i,
  // CSS selector regex is not appropriate for Sass
  // since there can be lot more things (var, @ directive, nesting..)
  // a selector must start at the end of a property or after a brace (end of other rules or nesting)
  // it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable
  // the end of a selector is found when there is no rules in it ( {} or {\s}) or if there is a property (because an interpolated var
  // can "pass" as a selector- e.g: proper#{$erty})
  // this one was hard to do, so please be careful if you edit this one :)
  'selector': {
    // Initial look-ahead is used to prevent matching of blank selectors
    pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/,
    inside: {
      'parent': {
        pattern: /&/,
        alias: 'important'
      },
      'placeholder': /%[-\w]+/,
      'variable': /\$[-\w]+|#\{\$[-\w]+\}/
    }
  },
  'property': {
    pattern: /(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,
    inside: {
      'variable': /\$[-\w]+|#\{\$[-\w]+\}/
    }
  }
});
Prism.languages.insertBefore('scss', 'atrule', {
  'keyword': [/@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i, {
    pattern: /( )(?:from|through)(?= )/,
    lookbehind: true
  }]
});
Prism.languages.insertBefore('scss', 'important', {
  // var and interpolated vars
  'variable': /\$[-\w]+|#\{\$[-\w]+\}/
});
Prism.languages.insertBefore('scss', 'function', {
  'module-modifier': {
    pattern: /\b(?:as|hide|show|with)\b/i,
    alias: 'keyword'
  },
  'placeholder': {
    pattern: /%[-\w]+/,
    alias: 'selector'
  },
  'statement': {
    pattern: /\B!(?:default|optional)\b/i,
    alias: 'keyword'
  },
  'boolean': /\b(?:false|true)\b/,
  'null': {
    pattern: /\bnull\b/,
    alias: 'keyword'
  },
  'operator': {
    pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|not|or)(?=\s)/,
    lookbehind: true
  }
});
Prism.languages.scss['atrule'].inside.rest = Prism.languages.scss;
Prism.languages.sql = {
  'comment': {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
    lookbehind: true
  },
  'variable': [{
    pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
    greedy: true
  }, /@[\w.$]+/],
  'string': {
    pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
    greedy: true,
    lookbehind: true
  },
  'identifier': {
    pattern: /(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,
    greedy: true,
    lookbehind: true,
    inside: {
      'punctuation': /^`|`$/
    }
  },
  'function': /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
  // Should we highlight user defined functions too?
  'keyword': /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
  'boolean': /\b(?:FALSE|NULL|TRUE)\b/i,
  'number': /\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,
  'operator': /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
  'punctuation': /[;[\]()`,.]/
};
Prism.languages.swift = {
  'comment': {
    // Nested comments are supported up to 2 levels
    pattern: /(^|[^\\:])(?:\/\/.*|\/\*(?:[^/*]|\/(?!\*)|\*(?!\/)|\/\*(?:[^*]|\*(?!\/))*\*\/)*\*\/)/,
    lookbehind: true,
    greedy: true
  },
  'string-literal': [
  // https://docs.swift.org/swift-book/LanguageGuide/StringsAndCharacters.html
  {
    pattern: RegExp(/(^|[^"#])/.source + '(?:'
    // single-line string
    + /"(?:\\(?:\((?:[^()]|\([^()]*\))*\)|\r\n|[^(])|[^\\\r\n"])*"/.source + '|'
    // multi-line string
    + /"""(?:\\(?:\((?:[^()]|\([^()]*\))*\)|[^(])|[^\\"]|"(?!""))*"""/.source + ')' + /(?!["#])/.source),
    lookbehind: true,
    greedy: true,
    inside: {
      'interpolation': {
        pattern: /(\\\()(?:[^()]|\([^()]*\))*(?=\))/,
        lookbehind: true,
        inside: null // see below
      },

      'interpolation-punctuation': {
        pattern: /^\)|\\\($/,
        alias: 'punctuation'
      },
      'punctuation': /\\(?=[\r\n])/,
      'string': /[\s\S]+/
    }
  }, {
    pattern: RegExp(/(^|[^"#])(#+)/.source + '(?:'
    // single-line string
    + /"(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|\r\n|[^#])|[^\\\r\n])*?"/.source + '|'
    // multi-line string
    + /"""(?:\\(?:#+\((?:[^()]|\([^()]*\))*\)|[^#])|[^\\])*?"""/.source + ')' + '\\2'),
    lookbehind: true,
    greedy: true,
    inside: {
      'interpolation': {
        pattern: /(\\#+\()(?:[^()]|\([^()]*\))*(?=\))/,
        lookbehind: true,
        inside: null // see below
      },

      'interpolation-punctuation': {
        pattern: /^\)|\\#+\($/,
        alias: 'punctuation'
      },
      'string': /[\s\S]+/
    }
  }],
  'directive': {
    // directives with conditions
    pattern: RegExp(/#/.source + '(?:' + (/(?:elseif|if)\b/.source + '(?:[ \t]*'
    // This regex is a little complex. It's equivalent to this:
    //   (?:![ \t]*)?(?:\b\w+\b(?:[ \t]*<round>)?|<round>)(?:[ \t]*(?:&&|\|\|))?
    // where <round> is a general parentheses expression.
    + /(?:![ \t]*)?(?:\b\w+\b(?:[ \t]*\((?:[^()]|\([^()]*\))*\))?|\((?:[^()]|\([^()]*\))*\))(?:[ \t]*(?:&&|\|\|))?/.source + ')+') + '|' + /(?:else|endif)\b/.source + ')'),
    alias: 'property',
    inside: {
      'directive-name': /^#\w+/,
      'boolean': /\b(?:false|true)\b/,
      'number': /\b\d+(?:\.\d+)*\b/,
      'operator': /!|&&|\|\||[<>]=?/,
      'punctuation': /[(),]/
    }
  },
  'literal': {
    pattern: /#(?:colorLiteral|column|dsohandle|file(?:ID|Literal|Path)?|function|imageLiteral|line)\b/,
    alias: 'constant'
  },
  'other-directive': {
    pattern: /#\w+\b/,
    alias: 'property'
  },
  'attribute': {
    pattern: /@\w+/,
    alias: 'atrule'
  },
  'function-definition': {
    pattern: /(\bfunc\s+)\w+/,
    lookbehind: true,
    alias: 'function'
  },
  'label': {
    // https://docs.swift.org/swift-book/LanguageGuide/ControlFlow.html#ID141
    pattern: /\b(break|continue)\s+\w+|\b[a-zA-Z_]\w*(?=\s*:\s*(?:for|repeat|while)\b)/,
    lookbehind: true,
    alias: 'important'
  },
  'keyword': /\b(?:Any|Protocol|Self|Type|actor|as|assignment|associatedtype|associativity|async|await|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic|else|enum|extension|fallthrough|fileprivate|final|for|func|get|guard|higherThan|if|import|in|indirect|infix|init|inout|internal|is|isolated|lazy|left|let|lowerThan|mutating|none|nonisolated|nonmutating|open|operator|optional|override|postfix|precedencegroup|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|set|some|static|struct|subscript|super|switch|throw|throws|try|typealias|unowned|unsafe|var|weak|where|while|willSet)\b/,
  'boolean': /\b(?:false|true)\b/,
  'nil': {
    pattern: /\bnil\b/,
    alias: 'constant'
  },
  'short-argument': /\$\d+\b/,
  'omit': {
    pattern: /\b_\b/,
    alias: 'keyword'
  },
  'number': /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
  // A class name must start with an upper-case letter and be either 1 letter long or contain a lower-case letter.
  'class-name': /\b[A-Z](?:[A-Z_\d]*[a-z]\w*)?\b/,
  'function': /\b[a-z_]\w*(?=\s*\()/i,
  'constant': /\b(?:[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
  // Operators are generic in Swift. Developers can even create new operators (e.g. +++).
  // https://docs.swift.org/swift-book/ReferenceManual/zzSummaryOfTheGrammar.html#ID481
  // This regex only supports ASCII operators.
  'operator': /[-+*/%=!<>&|^~?]+|\.[.\-+*/%=!<>&|^~?]+/,
  'punctuation': /[{}[\]();,.:\\]/
};
Prism.languages.swift['string-literal'].forEach(function (rule) {
  rule.inside['interpolation'].inside = Prism.languages.swift;
});
(function (Prism) {
  Prism.languages.typescript = Prism.languages.extend('javascript', {
    'class-name': {
      pattern: /(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,
      lookbehind: true,
      greedy: true,
      inside: null // see below
    },

    'builtin': /\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/
  });

  // The keywords TypeScript adds to JavaScript
  Prism.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,
  // keywords that have to be followed by an identifier
  /\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,
  // This is for `import type *, {}`
  /\btype\b(?=\s*(?:[\{*]|$))/);

  // doesn't work with TS because TS is too complex
  delete Prism.languages.typescript['parameter'];
  delete Prism.languages.typescript['literal-property'];

  // a version of typescript specifically for highlighting types
  var typeInside = Prism.languages.extend('typescript', {});
  delete typeInside['class-name'];
  Prism.languages.typescript['class-name'].inside = typeInside;
  Prism.languages.insertBefore('typescript', 'function', {
    'decorator': {
      pattern: /@[$\w\xA0-\uFFFF]+/,
      inside: {
        'at': {
          pattern: /^@/,
          alias: 'operator'
        },
        'function': /^[\s\S]+/
      }
    },
    'generic-function': {
      // e.g. foo<T extends "bar" | "baz">( ...
      pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,
      greedy: true,
      inside: {
        'function': /^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
        'generic': {
          pattern: /<[\s\S]+/,
          // everything after the first <
          alias: 'class-name',
          inside: typeInside
        }
      }
    }
  });
  Prism.languages.ts = Prism.languages.typescript;
})(Prism);
(function (Prism) {
  var typescript = Prism.util.clone(Prism.languages.typescript);
  Prism.languages.tsx = Prism.languages.extend('jsx', typescript);

  // doesn't work with TS because TS is too complex
  delete Prism.languages.tsx['parameter'];
  delete Prism.languages.tsx['literal-property'];

  // This will prevent collisions between TSX tags and TS generic types.
  // Idea by https://github.com/karlhorky
  // Discussion: https://github.com/PrismJS/prism/issues/2594#issuecomment-710666928
  var tag = Prism.languages.tsx.tag;
  tag.pattern = RegExp(/(^|[^\w$]|(?=<\/))/.source + '(?:' + tag.pattern.source + ')', tag.pattern.flags);
  tag.lookbehind = true;
})(Prism);
Prism.languages.basic = {
  'comment': {
    pattern: /(?:!|REM\b).+/i,
    inside: {
      'keyword': /^REM/i
    }
  },
  'string': {
    pattern: /"(?:""|[!#$%&'()*,\/:;<=>?^\w +\-.])*"/,
    greedy: true
  },
  'number': /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:E[+-]?\d+)?/i,
  'keyword': /\b(?:AS|BEEP|BLOAD|BSAVE|CALL(?: ABSOLUTE)?|CASE|CHAIN|CHDIR|CLEAR|CLOSE|CLS|COM|COMMON|CONST|DATA|DECLARE|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DIM|DO|DOUBLE|ELSE|ELSEIF|END|ENVIRON|ERASE|ERROR|EXIT|FIELD|FILES|FOR|FUNCTION|GET|GOSUB|GOTO|IF|INPUT|INTEGER|IOCTL|KEY|KILL|LINE INPUT|LOCATE|LOCK|LONG|LOOP|LSET|MKDIR|NAME|NEXT|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPEN|OPTION BASE|OUT|POKE|PUT|READ|REDIM|REM|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SELECT CASE|SHARED|SHELL|SINGLE|SLEEP|STATIC|STEP|STOP|STRING|SUB|SWAP|SYSTEM|THEN|TIMER|TO|TROFF|TRON|TYPE|UNLOCK|UNTIL|USING|VIEW PRINT|WAIT|WEND|WHILE|WRITE)(?:\$|\b)/i,
  'function': /\b(?:ABS|ACCESS|ACOS|ANGLE|AREA|ARITHMETIC|ARRAY|ASIN|ASK|AT|ATN|BASE|BEGIN|BREAK|CAUSE|CEIL|CHR|CLIP|COLLATE|COLOR|CON|COS|COSH|COT|CSC|DATE|DATUM|DEBUG|DECIMAL|DEF|DEG|DEGREES|DELETE|DET|DEVICE|DISPLAY|DOT|ELAPSED|EPS|ERASABLE|EXLINE|EXP|EXTERNAL|EXTYPE|FILETYPE|FIXED|FP|GO|GRAPH|HANDLER|IDN|IMAGE|IN|INT|INTERNAL|IP|IS|KEYED|LBOUND|LCASE|LEFT|LEN|LENGTH|LET|LINE|LINES|LOG|LOG10|LOG2|LTRIM|MARGIN|MAT|MAX|MAXNUM|MID|MIN|MISSING|MOD|NATIVE|NUL|NUMERIC|OF|OPTION|ORD|ORGANIZATION|OUTIN|OUTPUT|PI|POINT|POINTER|POINTS|POS|PRINT|PROGRAM|PROMPT|RAD|RADIANS|RANDOMIZE|RECORD|RECSIZE|RECTYPE|RELATIVE|REMAINDER|REPEAT|REST|RETRY|REWRITE|RIGHT|RND|ROUND|RTRIM|SAME|SEC|SELECT|SEQUENTIAL|SET|SETTER|SGN|SIN|SINH|SIZE|SKIP|SQR|STANDARD|STATUS|STR|STREAM|STYLE|TAB|TAN|TANH|TEMPLATE|TEXT|THERE|TIME|TIMEOUT|TRACE|TRANSFORM|TRUNCATE|UBOUND|UCASE|USE|VAL|VARIABLE|VIEWPORT|WHEN|WINDOW|WITH|ZER|ZONEWIDTH)(?:\$|\b)/i,
  'operator': /<[=>]?|>=?|[+\-*\/^=&]|\b(?:AND|EQV|IMP|NOT|OR|XOR)\b/i,
  'punctuation': /[,;:()]/
};
Prism.languages.vbnet = Prism.languages.extend('basic', {
  'comment': [{
    pattern: /(?:!|REM\b).+/i,
    inside: {
      'keyword': /^REM/i
    }
  }, {
    pattern: /(^|[^\\:])'.*/,
    lookbehind: true,
    greedy: true
  }],
  'string': {
    pattern: /(^|[^"])"(?:""|[^"])*"(?!")/,
    lookbehind: true,
    greedy: true
  },
  'keyword': /(?:\b(?:ADDHANDLER|ADDRESSOF|ALIAS|AND|ANDALSO|AS|BEEP|BLOAD|BOOLEAN|BSAVE|BYREF|BYTE|BYVAL|CALL(?: ABSOLUTE)?|CASE|CATCH|CBOOL|CBYTE|CCHAR|CDATE|CDBL|CDEC|CHAIN|CHAR|CHDIR|CINT|CLASS|CLEAR|CLNG|CLOSE|CLS|COBJ|COM|COMMON|CONST|CONTINUE|CSBYTE|CSHORT|CSNG|CSTR|CTYPE|CUINT|CULNG|CUSHORT|DATA|DATE|DECIMAL|DECLARE|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DEFAULT|DELEGATE|DIM|DIRECTCAST|DO|DOUBLE|ELSE|ELSEIF|END|ENUM|ENVIRON|ERASE|ERROR|EVENT|EXIT|FALSE|FIELD|FILES|FINALLY|FOR(?: EACH)?|FRIEND|FUNCTION|GET|GETTYPE|GETXMLNAMESPACE|GLOBAL|GOSUB|GOTO|HANDLES|IF|IMPLEMENTS|IMPORTS|IN|INHERITS|INPUT|INTEGER|INTERFACE|IOCTL|IS|ISNOT|KEY|KILL|LET|LIB|LIKE|LINE INPUT|LOCATE|LOCK|LONG|LOOP|LSET|ME|MKDIR|MOD|MODULE|MUSTINHERIT|MUSTOVERRIDE|MYBASE|MYCLASS|NAME|NAMESPACE|NARROWING|NEW|NEXT|NOT|NOTHING|NOTINHERITABLE|NOTOVERRIDABLE|OBJECT|OF|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPEN|OPERATOR|OPTION(?: BASE)?|OPTIONAL|OR|ORELSE|OUT|OVERLOADS|OVERRIDABLE|OVERRIDES|PARAMARRAY|PARTIAL|POKE|PRIVATE|PROPERTY|PROTECTED|PUBLIC|PUT|RAISEEVENT|READ|READONLY|REDIM|REM|REMOVEHANDLER|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SBYTE|SELECT(?: CASE)?|SET|SHADOWS|SHARED|SHELL|SHORT|SINGLE|SLEEP|STATIC|STEP|STOP|STRING|STRUCTURE|SUB|SWAP|SYNCLOCK|SYSTEM|THEN|THROW|TIMER|TO|TROFF|TRON|TRUE|TRY|TRYCAST|TYPE|TYPEOF|UINTEGER|ULONG|UNLOCK|UNTIL|USHORT|USING|VIEW PRINT|WAIT|WEND|WHEN|WHILE|WIDENING|WITH|WITHEVENTS|WRITE|WRITEONLY|XOR)|\B(?:#CONST|#ELSE|#ELSEIF|#END|#IF))(?:\$|\b)/i,
  'punctuation': /[,;:(){}]/
});




/***/ }),

/***/ 27120:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  IntegerFieldInput: () => (/* binding */ ui_1b838e41_node_react_server_esm_IntegerFieldInput)
});

// EXTERNAL MODULE: ../node_modules/@keystar/ui/number-field/dist/keystar-ui-number-field.esm.js + 4 modules
var keystar_ui_number_field_esm = __webpack_require__(34966);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
;// CONCATENATED MODULE: ../node_modules/@keystatic/core/dist/index-ca4f7ef7.node.react-server.esm.js





function validateInteger(validation, value, label) {
  if (value !== null && (typeof value !== 'number' || !Number.isFinite(value))) {
    return `${label} is not a valid whole number`;
  }
  if (validation !== null && validation !== void 0 && validation.isRequired && value === null) {
    return `${label} is required`;
  }
  if (value !== null) {
    if ((validation === null || validation === void 0 ? void 0 : validation.min) !== undefined && value < validation.min) {
      return `${label} must be at least ${validation.min}`;
    }
    if ((validation === null || validation === void 0 ? void 0 : validation.max) !== undefined && value > validation.max) {
      return `${label} must be at most ${validation.max}`;
    }
  }
}
function integer(_ref) {
  let {
    label,
    defaultValue,
    validation,
    description
  } = _ref;
  return basicFormFieldWithSimpleReaderParse({
    Input(props) {
      return /*#__PURE__*/jsx(IntegerFieldInput, {
        label: label,
        description: description,
        validation: validation,
        ...props
      });
    },
    defaultValue() {
      return defaultValue !== null && defaultValue !== void 0 ? defaultValue : null;
    },
    parse(value) {
      if (value === undefined) {
        return null;
      }
      if (typeof value === 'number') {
        return value;
      }
      throw new FieldDataError('Must be a number');
    },
    validate(value) {
      const message = validateInteger(validation, value, label);
      if (message !== undefined) {
        throw new FieldDataError(message);
      }
      assertRequired(value, validation, label);
      return value;
    },
    serialize(value) {
      return {
        value: value === null ? undefined : value
      };
    }
  });
}



;// CONCATENATED MODULE: ../node_modules/@keystatic/core/dist/ui-1b838e41.node.react-server.esm.js
'use client';








function ui_1b838e41_node_react_server_esm_IntegerFieldInput(props) {
  const [blurred, onBlur] = (0,react_.useReducer)(() => true, false);
  return /*#__PURE__*/(0,jsx_runtime_.jsx)(keystar_ui_number_field_esm/* NumberField */.K, {
    label: props.label,
    description: props.description,
    errorMessage: props.forceValidation || blurred ? validateInteger(props.validation, props.value, props.label) : undefined,
    onBlur: onBlur,
    autoFocus: props.autoFocus,
    value: props.value === null ? undefined : props.value,
    onChange: val => {
      props.onChange(val === undefined ? null : val);
    }
  });
}




/***/ }),

/***/ 93530:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DocumentFieldInput: () => (/* binding */ DocumentFieldInput)
/* harmony export */ });
/* harmony import */ var _keystar_ui_field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(60137);
/* harmony import */ var _index_c162740a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24867);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _prism_e4e5bc8f_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(46080);
/* harmony import */ var is_hotkey__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(42950);
/* harmony import */ var _keystar_ui_layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9772);
/* harmony import */ var _keystar_ui_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(46792);
/* harmony import */ var _keystar_ui_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(84371);
/* harmony import */ var _keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(70156);
/* harmony import */ var _keystar_ui_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(828);
/* harmony import */ var _keystar_ui_icon_icons_editIcon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(26544);
/* harmony import */ var _keystar_ui_icon_icons_externalLinkIcon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(69804);
/* harmony import */ var _keystar_ui_icon_icons_linkIcon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(38758);
/* harmony import */ var _keystar_ui_icon_icons_unlinkIcon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(66333);
/* harmony import */ var _keystar_ui_slots__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(71819);
/* harmony import */ var _keystar_ui_text_field__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(71209);
/* harmony import */ var _keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(74404);
/* harmony import */ var _keystar_ui_typography__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(79798);
/* harmony import */ var _index_b8966079_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(85955);
/* harmony import */ var _index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(92788);
/* harmony import */ var _index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(52967);
/* harmony import */ var emery_assertions__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(86522);
/* harmony import */ var _initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(17181);
/* harmony import */ var emery__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(85916);
/* harmony import */ var _utils_677addd9_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(9583);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(6113);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _ui_32b334fd_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(31764);
/* harmony import */ var _index_7a5cd0db_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(83171);
/* harmony import */ var _ui_78a3a4f0_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(62091);
/* harmony import */ var _ui_1f1aa184_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(93530);
/* harmony import */ var _utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(82101);
/* harmony import */ var _languages_14058067_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(10896);
/* harmony import */ var _isValidURL_02af2848_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(1988);
/* harmony import */ var _braintree_sanitize_url__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(19047);
/* harmony import */ var _ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(54085);
/* harmony import */ var _keystar_ui_action_group__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(69034);
/* harmony import */ var _keystar_ui_icon_icons_boldIcon__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(60485);
/* harmony import */ var _keystar_ui_icon_icons_chevronDownIcon__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(47467);
/* harmony import */ var _keystar_ui_icon_icons_codeIcon__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(75434);
/* harmony import */ var _keystar_ui_icon_icons_italicIcon__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(41653);
/* harmony import */ var _keystar_ui_icon_icons_maximizeIcon__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(99071);
/* harmony import */ var _keystar_ui_icon_icons_minimizeIcon__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(76361);
/* harmony import */ var _keystar_ui_icon_icons_plusIcon__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(28273);
/* harmony import */ var _keystar_ui_icon_icons_removeFormattingIcon__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(95778);
/* harmony import */ var _keystar_ui_icon_icons_strikethroughIcon__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(51193);
/* harmony import */ var _keystar_ui_icon_icons_subscriptIcon__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(4030);
/* harmony import */ var _keystar_ui_icon_icons_superscriptIcon__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(63833);
/* harmony import */ var _keystar_ui_icon_icons_typeIcon__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(50839);
/* harmony import */ var _keystar_ui_icon_icons_underlineIcon__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(28315);
/* harmony import */ var _keystar_ui_menu__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(42188);
/* harmony import */ var _keystar_ui_picker__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(21991);
/* harmony import */ var _keystar_ui_icon_icons_alignLeftIcon__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(29031);
/* harmony import */ var _keystar_ui_icon_icons_alignRightIcon__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(23708);
/* harmony import */ var _keystar_ui_icon_icons_alignCenterIcon__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(43453);
/* harmony import */ var _keystar_ui_icon_icons_quoteIcon__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(83157);
/* harmony import */ var match_sorter__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(11868);
/* harmony import */ var _keystar_ui_combobox__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(16817);
/* harmony import */ var _keystar_ui_icon_icons_trash2Icon__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(51227);
/* harmony import */ var _form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(84044);
/* harmony import */ var _ui_370f536e_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(86981);
/* harmony import */ var _keystar_ui_drag_and_drop__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(63138);
/* harmony import */ var _keystar_ui_list_view__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(6027);
/* harmony import */ var _errors_f334cbf7_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(71175);
/* harmony import */ var _keystar_ui_icon_icons_trashIcon__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(29980);
/* harmony import */ var _keystar_ui_icon_icons_minusIcon__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(77153);
/* harmony import */ var _keystar_ui_icon_icons_columnsIcon__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(63620);
/* harmony import */ var _keystar_ui_icon_icons_listIcon__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(93934);
/* harmony import */ var _keystar_ui_icon_icons_listOrderedIcon__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(19463);
/* harmony import */ var _keystar_ui_icon_icons_fileUpIcon__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(22992);
/* harmony import */ var _keystar_ui_icon_icons_imageIcon__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(56573);
/* harmony import */ var _keystar_ui_checkbox__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(85501);
/* harmony import */ var _ui_b1673cee_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(71223);
/* harmony import */ var _ui_58f594ec_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(11317);
/* harmony import */ var _ui_1b838e41_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(27120);
/* harmony import */ var _ui_4365cc36_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(23779);
/* harmony import */ var _ui_fa32ff3c_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(93464);
/* harmony import */ var _ui_4f76db75_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(69262);
/* harmony import */ var _ui_23d3b9aa_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(59191);
/* harmony import */ var _sindresorhus_slugify__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(34903);
/* harmony import */ var _sindresorhus_slugify__WEBPACK_IMPORTED_MODULE_79___default = /*#__PURE__*/__webpack_require__.n(_sindresorhus_slugify__WEBPACK_IMPORTED_MODULE_79__);
/* harmony import */ var _ui_c44da0bc_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(91985);
/* harmony import */ var _ui_949db933_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(34548);
/* harmony import */ var _ui_6ea72555_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(11837);
/* harmony import */ var _keystar_ui_icon_icons_sheetIcon__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(55219);
/* harmony import */ var _keystar_ui_icon_icons_tableIcon__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(80479);
/* harmony import */ var _keystar_ui_utils__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(47187);
/* harmony import */ var _keystar_ui_listbox__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(66805);
/* harmony import */ var _keystar_ui_overlays__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(52743);
/* harmony import */ var mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(27733);
/* harmony import */ var mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_88___default = /*#__PURE__*/__webpack_require__.n(mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_88__);
/* harmony import */ var mdast_util_gfm_autolink_literal_from_markdown__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(81411);
/* harmony import */ var micromark_extension_gfm_autolink_literal__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(45518);
/* harmony import */ var mdast_util_gfm_strikethrough_from_markdown__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(71504);
/* harmony import */ var micromark_extension_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(26567);
/* harmony import */ var micromark_extension_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_92___default = /*#__PURE__*/__webpack_require__.n(micromark_extension_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_92__);
'use client';












































































































let i = 0;
function newKey() {
  return i++;
}
function DocumentFieldInput(props) {
  const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(() => ({
    key: newKey(),
    value: props.value
  }));
  if (state.value !== props.value) {
    setState({
      key: newKey(),
      value: props.value
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_keystar_ui_field__WEBPACK_IMPORTED_MODULE_0__/* .FieldPrimitive */ .rt, {
    label: props.label,
    description: props.description,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(_index_c162740a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_1__.D, {
      componentBlocks: props.componentBlocks,
      documentFeatures: props.documentFeatures,
      onChange: val => {
        setState(state => ({
          key: state.key,
          value: val
        }));
        props.onChange(val);
      },
      value: state.value
    }, state.key)
  });
}




/***/ }),

/***/ 59191:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectFieldInput: () => (/* binding */ SelectFieldInput)
/* harmony export */ });
/* harmony import */ var _keystar_ui_picker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21991);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
'use client';



function SelectFieldInput(props) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_keystar_ui_picker__WEBPACK_IMPORTED_MODULE_0__/* .Picker */ .cW, {
    label: props.label,
    description: props.description,
    items: props.options,
    selectedKey: props.value,
    onSelectionChange: key => {
      props.onChange(key);
    },
    autoFocus: props.autoFocus,
    children: item => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_keystar_ui_picker__WEBPACK_IMPORTED_MODULE_0__/* .Item */ .ck, {
      children: item.label
    }, item.value)
  });
}




/***/ }),

/***/ 31764:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ImageFieldInput: () => (/* binding */ ImageFieldInput),
/* harmony export */   getUploadedFile: () => (/* binding */ getUploadedFile),
/* harmony export */   getUploadedImage: () => (/* binding */ getUploadedImage),
/* harmony export */   useObjectURL: () => (/* binding */ useObjectURL)
/* harmony export */ });
/* harmony import */ var _keystar_ui_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84371);
/* harmony import */ var _keystar_ui_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(60137);
/* harmony import */ var _keystar_ui_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9772);
/* harmony import */ var _keystar_ui_style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(46792);
/* harmony import */ var _keystar_ui_text_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(71209);
/* harmony import */ var _keystar_ui_typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(79798);
/* harmony import */ var _index_c162740a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(24867);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _prism_e4e5bc8f_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(46080);
/* harmony import */ var is_hotkey__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(42950);
/* harmony import */ var _keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(70156);
/* harmony import */ var _keystar_ui_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(828);
/* harmony import */ var _keystar_ui_icon_icons_editIcon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(26544);
/* harmony import */ var _keystar_ui_icon_icons_externalLinkIcon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(69804);
/* harmony import */ var _keystar_ui_icon_icons_linkIcon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(38758);
/* harmony import */ var _keystar_ui_icon_icons_unlinkIcon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(66333);
/* harmony import */ var _keystar_ui_slots__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(71819);
/* harmony import */ var _keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(74404);
/* harmony import */ var _index_b8966079_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(85955);
/* harmony import */ var _index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(92788);
/* harmony import */ var _index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(52967);
/* harmony import */ var emery_assertions__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(86522);
/* harmony import */ var _initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(17181);
/* harmony import */ var emery__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(85916);
/* harmony import */ var _utils_677addd9_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(9583);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(6113);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _ui_32b334fd_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(31764);
/* harmony import */ var _index_7a5cd0db_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(83171);
/* harmony import */ var _ui_78a3a4f0_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(62091);
/* harmony import */ var _ui_1f1aa184_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(93530);
/* harmony import */ var _utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(82101);
/* harmony import */ var _languages_14058067_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(10896);
/* harmony import */ var _isValidURL_02af2848_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(1988);
/* harmony import */ var _braintree_sanitize_url__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(19047);
/* harmony import */ var _ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(54085);
/* harmony import */ var _keystar_ui_action_group__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(69034);
/* harmony import */ var _keystar_ui_icon_icons_boldIcon__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(60485);
/* harmony import */ var _keystar_ui_icon_icons_chevronDownIcon__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(47467);
/* harmony import */ var _keystar_ui_icon_icons_codeIcon__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(75434);
/* harmony import */ var _keystar_ui_icon_icons_italicIcon__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(41653);
/* harmony import */ var _keystar_ui_icon_icons_maximizeIcon__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(99071);
/* harmony import */ var _keystar_ui_icon_icons_minimizeIcon__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(76361);
/* harmony import */ var _keystar_ui_icon_icons_plusIcon__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(28273);
/* harmony import */ var _keystar_ui_icon_icons_removeFormattingIcon__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(95778);
/* harmony import */ var _keystar_ui_icon_icons_strikethroughIcon__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(51193);
/* harmony import */ var _keystar_ui_icon_icons_subscriptIcon__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(4030);
/* harmony import */ var _keystar_ui_icon_icons_superscriptIcon__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(63833);
/* harmony import */ var _keystar_ui_icon_icons_typeIcon__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(50839);
/* harmony import */ var _keystar_ui_icon_icons_underlineIcon__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(28315);
/* harmony import */ var _keystar_ui_menu__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(42188);
/* harmony import */ var _keystar_ui_picker__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(21991);
/* harmony import */ var _keystar_ui_icon_icons_alignLeftIcon__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(29031);
/* harmony import */ var _keystar_ui_icon_icons_alignRightIcon__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(23708);
/* harmony import */ var _keystar_ui_icon_icons_alignCenterIcon__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(43453);
/* harmony import */ var _keystar_ui_icon_icons_quoteIcon__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(83157);
/* harmony import */ var match_sorter__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(11868);
/* harmony import */ var _keystar_ui_combobox__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(16817);
/* harmony import */ var _keystar_ui_icon_icons_trash2Icon__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(51227);
/* harmony import */ var _form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(84044);
/* harmony import */ var _ui_370f536e_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(86981);
/* harmony import */ var _keystar_ui_drag_and_drop__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(63138);
/* harmony import */ var _keystar_ui_list_view__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(6027);
/* harmony import */ var _errors_f334cbf7_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(71175);
/* harmony import */ var _keystar_ui_icon_icons_trashIcon__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(29980);
/* harmony import */ var _keystar_ui_icon_icons_minusIcon__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(77153);
/* harmony import */ var _keystar_ui_icon_icons_columnsIcon__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(63620);
/* harmony import */ var _keystar_ui_icon_icons_listIcon__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(93934);
/* harmony import */ var _keystar_ui_icon_icons_listOrderedIcon__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(19463);
/* harmony import */ var _keystar_ui_icon_icons_fileUpIcon__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(22992);
/* harmony import */ var _keystar_ui_icon_icons_imageIcon__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(56573);
/* harmony import */ var _keystar_ui_checkbox__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(85501);
/* harmony import */ var _ui_b1673cee_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(71223);
/* harmony import */ var _ui_58f594ec_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(11317);
/* harmony import */ var _ui_1b838e41_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(27120);
/* harmony import */ var _ui_4365cc36_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(23779);
/* harmony import */ var _ui_fa32ff3c_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(93464);
/* harmony import */ var _ui_4f76db75_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(69262);
/* harmony import */ var _ui_23d3b9aa_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(59191);
/* harmony import */ var _sindresorhus_slugify__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(34903);
/* harmony import */ var _sindresorhus_slugify__WEBPACK_IMPORTED_MODULE_79___default = /*#__PURE__*/__webpack_require__.n(_sindresorhus_slugify__WEBPACK_IMPORTED_MODULE_79__);
/* harmony import */ var _ui_c44da0bc_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(91985);
/* harmony import */ var _ui_949db933_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(34548);
/* harmony import */ var _ui_6ea72555_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(11837);
/* harmony import */ var _keystar_ui_icon_icons_sheetIcon__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(55219);
/* harmony import */ var _keystar_ui_icon_icons_tableIcon__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(80479);
/* harmony import */ var _keystar_ui_utils__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(47187);
/* harmony import */ var _keystar_ui_listbox__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(66805);
/* harmony import */ var _keystar_ui_overlays__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(52743);
/* harmony import */ var mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(27733);
/* harmony import */ var mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_88___default = /*#__PURE__*/__webpack_require__.n(mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_88__);
/* harmony import */ var mdast_util_gfm_autolink_literal_from_markdown__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(81411);
/* harmony import */ var micromark_extension_gfm_autolink_literal__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(45518);
/* harmony import */ var mdast_util_gfm_strikethrough_from_markdown__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(71504);
/* harmony import */ var micromark_extension_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(26567);
/* harmony import */ var micromark_extension_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_92___default = /*#__PURE__*/__webpack_require__.n(micromark_extension_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_92__);
'use client';












































































































function getUploadedFile(accept) {
  return new Promise(resolve => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    let didChange = false;
    input.onchange = () => {
      var _input$files;
      didChange = true;
      const file = (_input$files = input.files) === null || _input$files === void 0 ? void 0 : _input$files[0];
      if (file) {
        file.arrayBuffer().then(buffer => {
          resolve({
            content: new Uint8Array(buffer),
            filename: file.name
          });
        });
      }
    };
    const cancelDetector = () => {
      window.removeEventListener('focus', cancelDetector);
      setTimeout(() => {
        var _input$files2;
        if (((_input$files2 = input.files) === null || _input$files2 === void 0 ? void 0 : _input$files2.length) === 0 && !didChange) {
          resolve(undefined);
        }
      }, 500);
      if ([...document.body.childNodes].includes(input)) {
        document.body.removeChild(input);
      }
    };
    input.addEventListener('click', () => {
      window.addEventListener('focus', cancelDetector, true);
    });
    document.body.appendChild(input);
    input.click();
  });
}
function getUploadedImage() {
  return getUploadedFile('image/*');
}
function useObjectURL(data) {
  const [url, setUrl] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useState)(null);
  (0,react__WEBPACK_IMPORTED_MODULE_7__.useEffect)(() => {
    if (data) {
      const url = URL.createObjectURL(new Blob([data]));
      setUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setUrl(null);
    }
  }, [data]);
  return url;
}

// TODO: button labels ("Choose file", "Remove") need i18n support
function ImageFieldInput(props) {
  var _props$validation;
  const {
    value
  } = props;
  const [blurred, onBlur] = (0,react__WEBPACK_IMPORTED_MODULE_7__.useReducer)(() => true, false);
  const isInEditor = (0,_index_c162740a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_6__.u)();
  const objectUrl = useObjectURL(value === null ? null : value.data);
  const labelId = (0,react__WEBPACK_IMPORTED_MODULE_7__.useId)();
  const descriptionId = (0,react__WEBPACK_IMPORTED_MODULE_7__.useId)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_2__/* .Flex */ .kC, {
    "aria-describedby": props.description ? descriptionId : undefined,
    "aria-labelledby": labelId,
    direction: "column",
    gap: "medium",
    role: "group",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_keystar_ui_field__WEBPACK_IMPORTED_MODULE_1__/* .FieldLabel */ .Qy, {
      id: labelId,
      elementType: "span",
      children: props.label
    }), props.description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_5__.Text, {
      size: "small",
      color: "neutralSecondary",
      id: descriptionId,
      children: props.description
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_0__/* .ButtonGroup */ .hE, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_0__/* .ActionButton */ .Kk, {
        onPress: async () => {
          const image = await getUploadedImage();
          if (image) {
            var _image$filename$match;
            const extension = (_image$filename$match = image.filename.match(/\.([^.]+$)/)) === null || _image$filename$match === void 0 ? void 0 : _image$filename$match[1];
            if (extension) {
              props.onChange({
                data: image.content,
                extension,
                filename: image.filename
              });
            }
          }
        },
        children: "Choose file"
      }), value !== null && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_0__/* .ActionButton */ .Kk, {
        prominence: "low",
        onPress: () => {
          props.onChange(null);
          onBlur();
        },
        children: "Remove"
      })]
    }), objectUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_2__/* .Box */ .xu, {
      alignSelf: "start",
      backgroundColor: "canvas",
      borderRadius: "regular",
      border: "neutral",
      padding: "regular",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("img", {
        src: objectUrl,
        alt: "",
        style: {
          display: 'block',
          maxHeight: _keystar_ui_style__WEBPACK_IMPORTED_MODULE_3__/* .tokenSchema */ .iK.size.alias.singleLineWidth,
          maxWidth: '100%'
        }
      })
    }), isInEditor && value !== null && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_keystar_ui_text_field__WEBPACK_IMPORTED_MODULE_4__/* .TextField */ .nv, {
      label: "Filename",
      onChange: filename => {
        props.onChange({
          ...value,
          filename
        });
      },
      value: value.filename
    }), (props.forceValidation || blurred) && ((_props$validation = props.validation) === null || _props$validation === void 0 ? void 0 : _props$validation.isRequired) && value === null && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_keystar_ui_field__WEBPACK_IMPORTED_MODULE_1__/* .FieldMessage */ .nd, {
      children: [props.label, " is required"]
    })]
  });
}




/***/ }),

/***/ 86981:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ ObjectFieldInput)
/* harmony export */ });
/* harmony import */ var _keystar_ui_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9772);
/* harmony import */ var emery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(85916);
/* harmony import */ var _form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(84044);
/* harmony import */ var _ui_78a3a4f0_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(62091);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _keystar_ui_typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(79798);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ui_370f536e_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(86981);
/* harmony import */ var _keystar_ui_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(84371);
/* harmony import */ var _keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(70156);
/* harmony import */ var _keystar_ui_drag_and_drop__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(63138);
/* harmony import */ var _keystar_ui_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(60137);
/* harmony import */ var _keystar_ui_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(828);
/* harmony import */ var _keystar_ui_icon_icons_trash2Icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(51227);
/* harmony import */ var _keystar_ui_list_view__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(6027);
/* harmony import */ var _keystar_ui_slots__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(71819);
/* harmony import */ var _keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(74404);
/* harmony import */ var _initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(17181);
/* harmony import */ var _index_b8966079_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(85955);
/* harmony import */ var _utils_677addd9_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(9583);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(6113);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _errors_f334cbf7_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(71175);
/* harmony import */ var _ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(54085);
/* harmony import */ var _keystar_ui_style__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(46792);
'use client';






























function ObjectFieldInput(_ref) {
  let {
    schema,
    autoFocus,
    fields,
    forceValidation
  } = _ref;
  const firstFocusable = autoFocus ? findFocusableObjectFieldKey(schema) : undefined;
  const inner = /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_0__/* .Flex */ .kC, {
    gap: "xlarge",
    direction: "column",
    children: Object.entries(fields).map(_ref2 => {
      let [key, propVal] = _ref2;
      return (0,_form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_2__.i)(propVal) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_ui_78a3a4f0_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_3__.AddToPathProvider, {
        part: key,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_2__.I, {
          forceValidation: forceValidation,
          autoFocus: key === firstFocusable,
          ...propVal
        })
      }, key);
    })
  });
  const id = (0,react__WEBPACK_IMPORTED_MODULE_4__.useId)();
  if (!schema.label) {
    return inner;
  }
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_0__/* .Flex */ .kC, {
    role: "group",
    gap: "medium",
    marginY: "large",
    "aria-labelledby": labelId,
    "aria-describedby": schema.description ? descriptionId : undefined,
    direction: "column",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_5__.Text, {
      color: "neutral",
      size: "medium",
      weight: "medium",
      id: labelId,
      children: schema.label
    }), !!schema.description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_5__.Text, {
      id: descriptionId,
      size: "regular",
      color: "neutralSecondary",
      children: schema.description
    }), inner]
  });
}
function findFocusableObjectFieldKey(schema) {
  for (const [key, innerProp] of Object.entries(schema.fields)) {
    const childFocusable = canFieldBeFocused(innerProp);
    if (childFocusable) {
      return key;
    }
  }
  return undefined;
}
function canFieldBeFocused(schema) {
  if (schema.kind === 'array' || schema.kind === 'conditional' || schema.kind === 'form') {
    return true;
  }
  if (schema.kind === 'child') {
    return false;
  }
  if (schema.kind === 'object') {
    for (const innerProp of Object.values(schema.fields)) {
      if (canFieldBeFocused(innerProp)) {
        return true;
      }
    }
    return false;
  }
  (0,emery__WEBPACK_IMPORTED_MODULE_1__.assertNever)(schema);
}




/***/ }),

/***/ 23779:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MultiselectFieldInput: () => (/* binding */ MultiselectFieldInput)
/* harmony export */ });
/* harmony import */ var _keystar_ui_checkbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85501);
/* harmony import */ var _keystar_ui_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(60137);
/* harmony import */ var _keystar_ui_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9772);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _keystar_ui_typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(79798);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
'use client';







function MultiselectFieldInput(props) {
  const labelId = (0,react__WEBPACK_IMPORTED_MODULE_3__.useId)();
  const descriptionId = (0,react__WEBPACK_IMPORTED_MODULE_3__.useId)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_2__/* .Flex */ .kC, {
    role: "group",
    "aria-labelledby": labelId,
    "aria-describedby": props.description ? descriptionId : undefined,
    direction: "column",
    gap: "medium",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_keystar_ui_field__WEBPACK_IMPORTED_MODULE_1__/* .FieldLabel */ .Qy, {
      elementType: "span",
      id: labelId,
      children: props.label
    }), props.description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_4__.Text, {
      id: descriptionId,
      size: "small",
      color: "neutralSecondary",
      children: props.description
    }), props.options.map(option => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_keystar_ui_checkbox__WEBPACK_IMPORTED_MODULE_0__.Checkbox, {
      isSelected: props.value.includes(option.value),
      onChange: () => {
        if (props.value.includes(option.value)) {
          props.onChange(props.value.filter(x => x !== option.value));
        } else {
          props.onChange([...props.value, option.value]);
        }
      },
      children: option.label
    }, option.value))]
  });
}




/***/ }),

/***/ 69262:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  RelationshipInput: () => (/* binding */ RelationshipInput)
});

// EXTERNAL MODULE: ../node_modules/@react-stately/collections/dist/import.mjs
var dist_import = __webpack_require__(4315);
// EXTERNAL MODULE: ../node_modules/@keystar/ui/combobox/dist/keystar-ui-combobox.esm.js + 2 modules
var keystar_ui_combobox_esm = __webpack_require__(16817);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/data-0adde031.node.react-server.esm.js
var data_0adde031_node_react_server_esm = __webpack_require__(5924);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/utils-677addd9.node.react-server.esm.js
var utils_677addd9_node_react_server_esm = __webpack_require__(9583);
;// CONCATENATED MODULE: ../node_modules/@keystatic/core/dist/useSlugsInCollection-924c3f8e.node.react-server.esm.js




const ConfigContext = /*#__PURE__*/(0,react_.createContext)(null);
function useConfig() {
  const config = (0,react_.useContext)(ConfigContext);
  if (!config) {
    throw new Error('ConfigContext.Provider not found');
  }
  return config;
}

function useSlugsInCollection(collection) {
  const config = useConfig();
  const tree = (0,data_0adde031_node_react_server_esm.e)().current;
  return (0,react_.useMemo)(() => {
    const loadedTree = tree.kind === 'loaded' ? tree.data.tree : new Map();
    return (0,utils_677addd9_node_react_server_esm.d)(config, collection, loadedTree).map(x => x.slug);
  }, [config, tree, collection]);
}



// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ../node_modules/@ts-gql/tag/no-transform/dist/tag.cjs.js
var tag_cjs = __webpack_require__(76772);
// EXTERNAL MODULE: ../node_modules/emery/dist/emery.cjs.js
var emery_cjs = __webpack_require__(85916);
// EXTERNAL MODULE: external "crypto"
var external_crypto_ = __webpack_require__(6113);
// EXTERNAL MODULE: ../node_modules/cookie/index.js
var cookie = __webpack_require__(496);
;// CONCATENATED MODULE: ../node_modules/@keystatic/core/dist/ui-4f76db75.node.react-server.esm.js
'use client';
















function RelationshipInput(props) {
  var _props$validation;
  const [blurred, onBlur] = (0,react_.useReducer)(() => true, false);
  const slugs = useSlugsInCollection(props.collection);
  const options = (0,react_.useMemo)(() => {
    return slugs.map(slug => ({
      slug
    }));
  }, [slugs]);
  const _errorMessage = (props.forceValidation || blurred) && (_props$validation = props.validation) !== null && _props$validation !== void 0 && _props$validation.isRequired && props.value === null ? `${props.label} is required` : undefined;
  // this state & effect shouldn't really exist
  // it's here because react-aria/stately calls onSelectionChange with null
  // after selecting an item if we immediately remove the error message
  // so we delay it with an effect
  const [errorMessage, setErrorMessage] = (0,react_.useState)(_errorMessage);
  (0,react_.useEffect)(() => {
    setErrorMessage(_errorMessage);
  }, [_errorMessage]);
  return /*#__PURE__*/(0,jsx_runtime_.jsx)(keystar_ui_combobox_esm/* Combobox */.hQ, {
    label: props.label,
    description: props.description,
    selectedKey: props.value,
    onSelectionChange: key => {
      if (typeof key === 'string' || key === null) {
        props.onChange(key);
      }
    },
    onBlur: onBlur,
    autoFocus: props.autoFocus,
    defaultItems: options,
    errorMessage: errorMessage,
    width: "auto",
    children: item => /*#__PURE__*/(0,jsx_runtime_.jsx)(dist_import/* Item */.ck, {
      children: item.slug
    }, item.slug)
  });
}




/***/ }),

/***/ 11317:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FileFieldInput: () => (/* binding */ FileFieldInput)
/* harmony export */ });
/* harmony import */ var _keystar_ui_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84371);
/* harmony import */ var _keystar_ui_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(60137);
/* harmony import */ var _keystar_ui_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9772);
/* harmony import */ var _keystar_ui_text_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(71209);
/* harmony import */ var _keystar_ui_typography__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(79798);
/* harmony import */ var _index_c162740a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(24867);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ui_32b334fd_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(31764);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _prism_e4e5bc8f_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(46080);
/* harmony import */ var is_hotkey__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(42950);
/* harmony import */ var _keystar_ui_style__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(46792);
/* harmony import */ var _keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(70156);
/* harmony import */ var _keystar_ui_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(828);
/* harmony import */ var _keystar_ui_icon_icons_editIcon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(26544);
/* harmony import */ var _keystar_ui_icon_icons_externalLinkIcon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(69804);
/* harmony import */ var _keystar_ui_icon_icons_linkIcon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(38758);
/* harmony import */ var _keystar_ui_icon_icons_unlinkIcon__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(66333);
/* harmony import */ var _keystar_ui_slots__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(71819);
/* harmony import */ var _keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(74404);
/* harmony import */ var _index_b8966079_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(85955);
/* harmony import */ var _index_ec0a153a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(92788);
/* harmony import */ var _index_36a0dcb1_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(52967);
/* harmony import */ var emery_assertions__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(86522);
/* harmony import */ var _initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(17181);
/* harmony import */ var emery__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(85916);
/* harmony import */ var _utils_677addd9_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(9583);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(6113);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _index_7a5cd0db_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(83171);
/* harmony import */ var _ui_78a3a4f0_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(62091);
/* harmony import */ var _ui_1f1aa184_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(93530);
/* harmony import */ var _utils_2bbfbd32_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(82101);
/* harmony import */ var _languages_14058067_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(10896);
/* harmony import */ var _isValidURL_02af2848_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(1988);
/* harmony import */ var _braintree_sanitize_url__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(19047);
/* harmony import */ var _ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(54085);
/* harmony import */ var _keystar_ui_action_group__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(69034);
/* harmony import */ var _keystar_ui_icon_icons_boldIcon__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(60485);
/* harmony import */ var _keystar_ui_icon_icons_chevronDownIcon__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(47467);
/* harmony import */ var _keystar_ui_icon_icons_codeIcon__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(75434);
/* harmony import */ var _keystar_ui_icon_icons_italicIcon__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(41653);
/* harmony import */ var _keystar_ui_icon_icons_maximizeIcon__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(99071);
/* harmony import */ var _keystar_ui_icon_icons_minimizeIcon__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(76361);
/* harmony import */ var _keystar_ui_icon_icons_plusIcon__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(28273);
/* harmony import */ var _keystar_ui_icon_icons_removeFormattingIcon__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(95778);
/* harmony import */ var _keystar_ui_icon_icons_strikethroughIcon__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(51193);
/* harmony import */ var _keystar_ui_icon_icons_subscriptIcon__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(4030);
/* harmony import */ var _keystar_ui_icon_icons_superscriptIcon__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(63833);
/* harmony import */ var _keystar_ui_icon_icons_typeIcon__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(50839);
/* harmony import */ var _keystar_ui_icon_icons_underlineIcon__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(28315);
/* harmony import */ var _keystar_ui_menu__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(42188);
/* harmony import */ var _keystar_ui_picker__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(21991);
/* harmony import */ var _keystar_ui_icon_icons_alignLeftIcon__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(29031);
/* harmony import */ var _keystar_ui_icon_icons_alignRightIcon__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(23708);
/* harmony import */ var _keystar_ui_icon_icons_alignCenterIcon__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(43453);
/* harmony import */ var _keystar_ui_icon_icons_quoteIcon__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(83157);
/* harmony import */ var match_sorter__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(11868);
/* harmony import */ var _keystar_ui_combobox__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(16817);
/* harmony import */ var _keystar_ui_icon_icons_trash2Icon__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(51227);
/* harmony import */ var _form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(84044);
/* harmony import */ var _ui_370f536e_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(86981);
/* harmony import */ var _keystar_ui_drag_and_drop__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(63138);
/* harmony import */ var _keystar_ui_list_view__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(6027);
/* harmony import */ var _errors_f334cbf7_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(71175);
/* harmony import */ var _keystar_ui_icon_icons_trashIcon__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(29980);
/* harmony import */ var _keystar_ui_icon_icons_minusIcon__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(77153);
/* harmony import */ var _keystar_ui_icon_icons_columnsIcon__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(63620);
/* harmony import */ var _keystar_ui_icon_icons_listIcon__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(93934);
/* harmony import */ var _keystar_ui_icon_icons_listOrderedIcon__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(19463);
/* harmony import */ var _keystar_ui_icon_icons_fileUpIcon__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(22992);
/* harmony import */ var _keystar_ui_icon_icons_imageIcon__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(56573);
/* harmony import */ var _keystar_ui_checkbox__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(85501);
/* harmony import */ var _ui_b1673cee_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(71223);
/* harmony import */ var _ui_58f594ec_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(11317);
/* harmony import */ var _ui_1b838e41_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(27120);
/* harmony import */ var _ui_4365cc36_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(23779);
/* harmony import */ var _ui_fa32ff3c_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(93464);
/* harmony import */ var _ui_4f76db75_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(69262);
/* harmony import */ var _ui_23d3b9aa_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(59191);
/* harmony import */ var _sindresorhus_slugify__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(34903);
/* harmony import */ var _sindresorhus_slugify__WEBPACK_IMPORTED_MODULE_79___default = /*#__PURE__*/__webpack_require__.n(_sindresorhus_slugify__WEBPACK_IMPORTED_MODULE_79__);
/* harmony import */ var _ui_c44da0bc_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(91985);
/* harmony import */ var _ui_949db933_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(34548);
/* harmony import */ var _ui_6ea72555_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(11837);
/* harmony import */ var _keystar_ui_icon_icons_sheetIcon__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(55219);
/* harmony import */ var _keystar_ui_icon_icons_tableIcon__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(80479);
/* harmony import */ var _keystar_ui_utils__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(47187);
/* harmony import */ var _keystar_ui_listbox__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(66805);
/* harmony import */ var _keystar_ui_overlays__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(52743);
/* harmony import */ var mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(27733);
/* harmony import */ var mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_88___default = /*#__PURE__*/__webpack_require__.n(mdast_util_from_markdown__WEBPACK_IMPORTED_MODULE_88__);
/* harmony import */ var mdast_util_gfm_autolink_literal_from_markdown__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(81411);
/* harmony import */ var micromark_extension_gfm_autolink_literal__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(45518);
/* harmony import */ var mdast_util_gfm_strikethrough_from_markdown__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(71504);
/* harmony import */ var micromark_extension_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(26567);
/* harmony import */ var micromark_extension_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_92___default = /*#__PURE__*/__webpack_require__.n(micromark_extension_gfm_strikethrough__WEBPACK_IMPORTED_MODULE_92__);
'use client';












































































































function FileFieldInput(props) {
  var _props$validation;
  const {
    value
  } = props;
  const [blurred, onBlur] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useReducer)(() => true, false);
  const isInEditor = (0,_index_c162740a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_5__.u)();
  const objectUrl = (0,_ui_32b334fd_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_7__.useObjectURL)(value === null ? null : value.data);
  const labelId = (0,react__WEBPACK_IMPORTED_MODULE_6__.useId)();
  const descriptionId = (0,react__WEBPACK_IMPORTED_MODULE_6__.useId)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_2__/* .Flex */ .kC, {
    "aria-describedby": props.description ? descriptionId : undefined,
    "aria-labelledby": labelId,
    direction: "column",
    gap: "medium",
    role: "group",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_keystar_ui_field__WEBPACK_IMPORTED_MODULE_1__/* .FieldLabel */ .Qy, {
      id: labelId,
      elementType: "span",
      children: props.label
    }), props.description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_4__.Text, {
      size: "small",
      color: "neutralSecondary",
      id: descriptionId,
      children: props.description
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_0__/* .ButtonGroup */ .hE, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_0__/* .ActionButton */ .Kk, {
        onPress: async () => {
          const file = await (0,_ui_32b334fd_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_7__.getUploadedFile)('');
          if (file) {
            var _file$filename$match$, _file$filename$match;
            props.onChange({
              data: file.content,
              filename: file.filename,
              extension: (_file$filename$match$ = (_file$filename$match = file.filename.match(/\.([^.]+$)/)) === null || _file$filename$match === void 0 ? void 0 : _file$filename$match[1]) !== null && _file$filename$match$ !== void 0 ? _file$filename$match$ : ''
            });
          }
        },
        children: "Choose file"
      }), value !== null && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_0__/* .ActionButton */ .Kk, {
          prominence: "low",
          onPress: () => {
            props.onChange(null);
            onBlur();
          },
          children: "Remove"
        }), objectUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_0__/* .Button */ .zx, {
          href: objectUrl,
          download: value.filename,
          prominence: "low",
          children: "Download"
        })]
      })]
    }), isInEditor && value !== null && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_keystar_ui_text_field__WEBPACK_IMPORTED_MODULE_3__/* .TextField */ .nv, {
      label: "Filename",
      onChange: filename => {
        props.onChange({
          ...value,
          filename
        });
      },
      value: value.filename
    }), (props.forceValidation || blurred) && ((_props$validation = props.validation) === null || _props$validation === void 0 ? void 0 : _props$validation.isRequired) && value === null && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_keystar_ui_field__WEBPACK_IMPORTED_MODULE_1__/* .FieldMessage */ .nd, {
      children: [props.label, " is required"]
    })]
  });
}




/***/ }),

/***/ 11837:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BlocksFieldInput: () => (/* binding */ BlocksFieldInput)
/* harmony export */ });
/* harmony import */ var _react_aria_i18n__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(93009);
/* harmony import */ var _keystar_ui_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84371);
/* harmony import */ var _keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(70156);
/* harmony import */ var _keystar_ui_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(60137);
/* harmony import */ var _keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9772);
/* harmony import */ var _keystar_ui_slots__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(71819);
/* harmony import */ var _keystar_ui_typography__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(79798);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _errors_f334cbf7_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(71175);
/* harmony import */ var _form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(84044);
/* harmony import */ var _initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(17181);
/* harmony import */ var _index_b8966079_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(85955);
/* harmony import */ var _react_stately_collections__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(4315);
/* harmony import */ var _keystar_ui_menu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(42188);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _utils_677addd9_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(9583);
/* harmony import */ var emery__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(85916);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(6113);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _ui_78a3a4f0_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(62091);
/* harmony import */ var _ui_370f536e_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(86981);
/* harmony import */ var _keystar_ui_drag_and_drop__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(63138);
/* harmony import */ var _keystar_ui_icon__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(828);
/* harmony import */ var _keystar_ui_icon_icons_trash2Icon__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(51227);
/* harmony import */ var _keystar_ui_list_view__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(6027);
/* harmony import */ var _keystar_ui_tooltip__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(74404);
/* harmony import */ var _ui_utils_5b790e6b_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(54085);
/* harmony import */ var _keystar_ui_style__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(46792);
'use client';
































function BlocksFieldInput(props) {
  const labelId = (0,react__WEBPACK_IMPORTED_MODULE_6__.useId)();
  const descriptionId = (0,react__WEBPACK_IMPORTED_MODULE_6__.useId)();
  const stringFormatter = (0,_react_aria_i18n__WEBPACK_IMPORTED_MODULE_25__/* .useLocalizedStringFormatter */ .qb)(_index_b8966079_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_10__.l);
  const [modalState, setModalState] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)({
    kind: 'closed'
  });
  const dismiss = () => {
    setModalState({
      kind: 'closed'
    });
  };
  const formId = (0,react__WEBPACK_IMPORTED_MODULE_6__.useId)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
    elementType: "section",
    gap: "medium",
    role: "group",
    "aria-labelledby": labelId,
    "aria-describedby": props.schema.description ? descriptionId : undefined,
    direction: "column",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_keystar_ui_field__WEBPACK_IMPORTED_MODULE_2__/* .FieldLabel */ .Qy, {
      elementType: "h3",
      id: labelId,
      children: props.schema.label
    }), props.schema.description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_5__.Text, {
      id: descriptionId,
      size: "small",
      color: "neutralSecondary",
      children: props.schema.description
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_keystar_ui_menu__WEBPACK_IMPORTED_MODULE_11__/* .MenuTrigger */ .bF, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_0__/* .ActionButton */ .Kk, {
        alignSelf: "start",
        children: "Add"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_keystar_ui_menu__WEBPACK_IMPORTED_MODULE_11__/* .Menu */ .v2, {
        items: props.schema.element.discriminant.options,
        onAction: key => {
          if (typeof key !== 'string') return;
          const discriminant = key;
          setModalState({
            kind: 'new',
            initial: {
              discriminant,
              value: (0,_initial_values_25bf35f4_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_9__.g)(props.schema.element.values[`${discriminant}`])
            }
          });
        },
        children: item => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_react_stately_collections__WEBPACK_IMPORTED_MODULE_26__/* .Item */ .ck, {
          children: item.label
        }, item.value)
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_8__.A, {
      ...props,
      labelId: labelId,
      onOpenItem: idx => {
        setModalState({
          kind: 'edit',
          idx,
          initial: (0,_form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_8__.p)(props.elements[idx])
        });
      }
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_8__.a, {
      ...props
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_1__/* .DialogContainer */ .TW, {
      onDismiss: dismiss,
      children: (() => {
        var _props$schema$element;
        if (modalState.kind === 'closed') {
          return null;
        }
        const discriminant = modalState.initial.discriminant;
        return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_1__/* .Dialog */ .Vq, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_keystar_ui_typography__WEBPACK_IMPORTED_MODULE_5__.Heading, {
            children: [modalState.kind === 'edit' ? 'Edit' : 'Add', ' ', (_props$schema$element = props.schema.element.discriminant.options.find(x => x.value === discriminant)) === null || _props$schema$element === void 0 ? void 0 : _props$schema$element.label]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_keystar_ui_slots__WEBPACK_IMPORTED_MODULE_4__/* .Content */ .VY, {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(ItemForm, {
              id: formId,
              schema: props.schema.element.values[discriminant],
              initialValue: modalState.initial.value,
              onSubmit: val => {
                dismiss();
                if (modalState.kind === 'new') {
                  props.onChange([...props.elements.map(x => ({
                    key: x.key
                  })), {
                    key: undefined,
                    value: (0,_form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_8__.v)({
                      value: val,
                      discriminant
                    }, props.schema.element)
                  }]);
                  return;
                }
                (0,_form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_8__.s)(val, props.elements[modalState.idx].value);
              }
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_0__/* .ButtonGroup */ .hE, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_0__/* .Button */ .zx, {
              onPress: dismiss,
              children: stringFormatter.format('cancel')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_0__/* .Button */ .zx, {
              form: formId,
              prominence: "high",
              type: "submit",
              children: "Done"
            })]
          })]
        });
      })()
    })]
  });
}
function ItemForm(props) {
  const [value, setValue] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(props.initialValue);
  const [forceValidation, setForceValidation] = (0,react__WEBPACK_IMPORTED_MODULE_6__.useState)(false);
  const previewProps = (0,react__WEBPACK_IMPORTED_MODULE_6__.useMemo)(() => (0,_form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_8__.c)(props.schema, setValue, () => undefined), [props.schema, setValue])(value);
  const {
    dismiss
  } = (0,_keystar_ui_dialog__WEBPACK_IMPORTED_MODULE_1__/* .useDialogContainer */ .SN)();
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_3__/* .Flex */ .kC, {
    id: props.id,
    elementType: "form",
    onSubmit: event => {
      if (event.target !== event.currentTarget) return;
      event.preventDefault();
      if (!(0,_errors_f334cbf7_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_7__.c)(props.schema, value, undefined)) {
        setForceValidation(true);
        return;
      }
      props.onSubmit(value);
      dismiss();
    },
    direction: "column",
    gap: "xxlarge",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx)(_form_from_preview_7a6b5b8a_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_8__.F, {
      forceValidation: forceValidation,
      autoFocus: true,
      ...previewProps
    })
  });
}




/***/ }),

/***/ 62091:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AddToPathProvider: () => (/* binding */ AddToPathProvider),
/* harmony export */   PathContext: () => (/* binding */ PathContext),
/* harmony export */   PathContextProvider: () => (/* binding */ PathContextProvider),
/* harmony export */   SlugFieldContext: () => (/* binding */ SlugFieldContext),
/* harmony export */   SlugFieldProvider: () => (/* binding */ SlugFieldProvider),
/* harmony export */   TextFieldInput: () => (/* binding */ TextFieldInput)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _keystar_ui_text_field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71209);
/* harmony import */ var _index_7a5cd0db_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(83171);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ui_78a3a4f0_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(62091);
'use client';







const SlugFieldContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);
const SlugFieldProvider = SlugFieldContext.Provider;
const PathContext = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)([]);
const PathContextProvider = PathContext.Provider;
function AddToPathProvider(props) {
  const path = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(PathContext);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(PathContext.Provider, {
    value: (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => path.concat(props.part), [path, props.part]),
    children: props.children
  });
}
function TextFieldInput(props) {
  const TextFieldComponent = props.multiline ? _keystar_ui_text_field__WEBPACK_IMPORTED_MODULE_1__/* .TextArea */ .Kx : _keystar_ui_text_field__WEBPACK_IMPORTED_MODULE_1__/* .TextField */ .nv;
  const [blurred, setBlurred] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const slugContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(SlugFieldContext);
  const path = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(PathContext);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_3__.jsx)(TextFieldComponent, {
    label: props.label,
    description: props.description,
    autoFocus: props.autoFocus,
    value: props.value,
    onChange: props.onChange,
    onBlur: () => setBlurred(true),
    errorMessage: props.forceValidation || blurred ? (0,_index_7a5cd0db_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_2__.v)(props.value, props.min, props.max, props.label, path.length === 1 && (slugContext === null || slugContext === void 0 ? void 0 : slugContext.field) === path[0] ? slugContext : undefined) : undefined
  });
}




/***/ }),

/***/ 34548:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  UrlFieldInput: () => (/* binding */ ui_949db933_node_react_server_esm_UrlFieldInput)
});

// EXTERNAL MODULE: ../node_modules/@keystar/ui/text-field/dist/keystar-ui-text-field.esm.js
var keystar_ui_text_field_esm = __webpack_require__(71209);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/isValidURL-02af2848.node.react-server.esm.js
var isValidURL_02af2848_node_react_server_esm = __webpack_require__(1988);
// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
;// CONCATENATED MODULE: ../node_modules/@keystatic/core/dist/index-27182009.node.react-server.esm.js






function validateUrl(validation, value, label) {
  if (value !== null && (typeof value !== 'string' || !(0,isValidURL_02af2848_node_react_server_esm.i)(value))) {
    return `${label} is not a valid URL`;
  }
  if (validation !== null && validation !== void 0 && validation.isRequired && value === null) {
    return `${label} is required`;
  }
}
function url(_ref) {
  let {
    label,
    defaultValue = '',
    validation,
    description
  } = _ref;
  return basicFormFieldWithSimpleReaderParse({
    Input(props) {
      return /*#__PURE__*/jsx(UrlFieldInput, {
        label: label,
        description: description,
        validation: validation,
        ...props
      });
    },
    defaultValue() {
      return defaultValue !== null && defaultValue !== void 0 ? defaultValue : null;
    },
    parse(value) {
      if (value === undefined) {
        return null;
      }
      if (typeof value !== 'string') {
        throw new FieldDataError('Must be a string');
      }
      return value;
    },
    validate(value) {
      const message = validateUrl(validation, value, label);
      if (message !== undefined) {
        throw new FieldDataError(message);
      }
      assertRequired(value, validation, label);
      return value;
    },
    serialize(value) {
      return {
        value: value === null ? undefined : value
      };
    }
  });
}



// EXTERNAL MODULE: ../node_modules/@braintree/sanitize-url/dist/index.js
var dist = __webpack_require__(19047);
;// CONCATENATED MODULE: ../node_modules/@keystatic/core/dist/ui-949db933.node.react-server.esm.js
'use client';










function ui_949db933_node_react_server_esm_UrlFieldInput(props) {
  const [blurred, onBlur] = (0,react_.useReducer)(() => true, false);
  return /*#__PURE__*/(0,jsx_runtime_.jsx)(keystar_ui_text_field_esm/* TextField */.nv, {
    width: "auto",
    maxWidth: "scale.6000",
    label: props.label,
    description: props.description,
    autoFocus: props.autoFocus,
    value: props.value === null ? '' : props.value,
    onChange: val => {
      props.onChange(val === '' ? null : val);
    },
    onBlur: onBlur,
    errorMessage: props.forceValidation || blurred ? validateUrl(props.validation, props.value, props.label) : undefined
  });
}




/***/ }),

/***/ 71223:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  DateFieldInput: () => (/* binding */ ui_b1673cee_node_react_server_esm_DateFieldInput)
});

// EXTERNAL MODULE: ../node_modules/@keystar/ui/text-field/dist/keystar-ui-text-field.esm.js
var keystar_ui_text_field_esm = __webpack_require__(71209);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(18038);
// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
;// CONCATENATED MODULE: ../node_modules/@keystatic/core/dist/index-a3fe1512.node.react-server.esm.js





function validateDate(validation, value, label) {
  if (value !== null && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return `${label} is not a valid date`;
  }
  if (validation !== null && validation !== void 0 && validation.isRequired && value === null) {
    return `${label} is required`;
  }
  if ((validation !== null && validation !== void 0 && validation.min || validation !== null && validation !== void 0 && validation.max) && value !== null) {
    const date = new Date(value);
    if ((validation === null || validation === void 0 ? void 0 : validation.min) !== undefined) {
      const min = new Date(validation.min);
      if (date < min) {
        return `${label} must be after ${min.toLocaleDateString()}`;
      }
    }
    if ((validation === null || validation === void 0 ? void 0 : validation.max) !== undefined) {
      const max = new Date(validation.max);
      if (date > max) {
        return `${label} must be no later than ${max.toLocaleDateString()}`;
      }
    }
  }
}
function date(_ref) {
  let {
    label,
    defaultValue,
    validation,
    description
  } = _ref;
  return basicFormFieldWithSimpleReaderParse({
    Input(props) {
      return /*#__PURE__*/jsx(DateFieldInput, {
        validation: validation,
        label: label,
        description: description,
        ...props
      });
    },
    defaultValue() {
      if (defaultValue === undefined) {
        return null;
      }
      if (typeof defaultValue === 'string') {
        return defaultValue;
      }
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    parse(value) {
      if (value === undefined) {
        return null;
      }
      if (typeof value !== 'string') {
        throw new FieldDataError('Must be a string');
      }
      return value;
    },
    serialize(value) {
      return {
        value: value === null ? undefined : value
      };
    },
    validate(value) {
      const message = validateDate(validation, value, label);
      if (message !== undefined) {
        throw new FieldDataError(message);
      }
      assertRequired(value, validation, label);
      return value;
    }
  });
}



;// CONCATENATED MODULE: ../node_modules/@keystatic/core/dist/ui-b1673cee.node.react-server.esm.js
'use client';








function ui_b1673cee_node_react_server_esm_DateFieldInput(props) {
  const [blurred, onBlur] = (0,react_.useReducer)(() => true, false);
  return /*#__PURE__*/(0,jsx_runtime_.jsx)(keystar_ui_text_field_esm/* TextField */.nv, {
    label: props.label,
    description: props.description,
    type: "date",
    onChange: val => {
      props.onChange(val === '' ? null : val);
    },
    autoFocus: props.autoFocus,
    value: props.value === null ? '' : props.value,
    onBlur: onBlur,
    errorMessage: blurred || props.forceValidation ? validateDate(props.validation, props.value, props.label) : undefined
  });
}




/***/ }),

/***/ 91985:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SlugFieldInput: () => (/* binding */ SlugFieldInput)
/* harmony export */ });
/* harmony import */ var _keystar_ui_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84371);
/* harmony import */ var _keystar_ui_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9772);
/* harmony import */ var _keystar_ui_text_field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(71209);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ui_78a3a4f0_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(62091);
/* harmony import */ var _index_7a5cd0db_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(83171);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
'use client';









const emptySet = new Set();
function SlugFieldInput(props) {
  var _props$args$slug$vali, _props$args$slug, _props$args$slug$vali2, _props$args$slug$vali3, _props$args$slug$vali4, _props$args$slug2, _props$args$slug2$val, _props$args$slug2$val2, _props$args$slug$labe, _props$args$slug3, _props$args$name$vali, _props$args$name$vali2, _props$args$name$vali3, _props$args$name$vali4, _props$args$name$vali5, _props$args$name$vali6, _props$args$slug$labe2, _props$args$slug4, _props$args$slug5;
  const slugContext = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(_ui_78a3a4f0_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_4__.SlugFieldContext);
  const path = (0,react__WEBPACK_IMPORTED_MODULE_3__.useContext)(_ui_78a3a4f0_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_4__.PathContext);
  const slugInfo = path.length === 1 && path[0] === (slugContext === null || slugContext === void 0 ? void 0 : slugContext.field) ? slugContext : {
    slugs: emptySet,
    glob: '*'
  };
  const [blurredName, setBlurredName] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const [blurredSlug, setBlurredSlug] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
  const [shouldGenerateSlug, setShouldGenerateSlug] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(props.value === props.defaultValue);
  const generateSlug = name => {
    const generated = props.naiveGenerateSlug(name);
    if (slugInfo.slugs.has(generated)) {
      let i = 1;
      while (slugInfo.slugs.has(`${generated}-${i}`)) {
        i++;
      }
      return `${generated}-${i}`;
    }
    return generated;
  };
  const slugErrorMessage = props.forceValidation || blurredSlug ? (0,_index_7a5cd0db_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_5__.v)(props.value.slug, (_props$args$slug$vali = (_props$args$slug = props.args.slug) === null || _props$args$slug === void 0 ? void 0 : (_props$args$slug$vali2 = _props$args$slug.validation) === null || _props$args$slug$vali2 === void 0 ? void 0 : (_props$args$slug$vali3 = _props$args$slug$vali2.length) === null || _props$args$slug$vali3 === void 0 ? void 0 : _props$args$slug$vali3.min) !== null && _props$args$slug$vali !== void 0 ? _props$args$slug$vali : 1, (_props$args$slug$vali4 = (_props$args$slug2 = props.args.slug) === null || _props$args$slug2 === void 0 ? void 0 : (_props$args$slug2$val = _props$args$slug2.validation) === null || _props$args$slug2$val === void 0 ? void 0 : (_props$args$slug2$val2 = _props$args$slug2$val.length) === null || _props$args$slug2$val2 === void 0 ? void 0 : _props$args$slug2$val2.max) !== null && _props$args$slug$vali4 !== void 0 ? _props$args$slug$vali4 : Infinity, (_props$args$slug$labe = (_props$args$slug3 = props.args.slug) === null || _props$args$slug3 === void 0 ? void 0 : _props$args$slug3.label) !== null && _props$args$slug$labe !== void 0 ? _props$args$slug$labe : 'Slug', slugInfo) : undefined;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_1__/* .Flex */ .kC, {
    gap: "xlarge",
    direction: "column",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_keystar_ui_text_field__WEBPACK_IMPORTED_MODULE_2__/* .TextField */ .nv, {
      label: props.args.name.label,
      description: props.args.name.description,
      autoFocus: props.autoFocus,
      value: props.value.name,
      onChange: name => {
        props.onChange({
          name,
          slug: shouldGenerateSlug ? generateSlug(name) : props.value.slug
        });
      },
      onBlur: () => setBlurredName(true),
      errorMessage: props.forceValidation || blurredName ? (0,_index_7a5cd0db_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_5__.v)(props.value.name, (_props$args$name$vali = (_props$args$name$vali2 = props.args.name.validation) === null || _props$args$name$vali2 === void 0 ? void 0 : (_props$args$name$vali3 = _props$args$name$vali2.length) === null || _props$args$name$vali3 === void 0 ? void 0 : _props$args$name$vali3.min) !== null && _props$args$name$vali !== void 0 ? _props$args$name$vali : 0, (_props$args$name$vali4 = (_props$args$name$vali5 = props.args.name.validation) === null || _props$args$name$vali5 === void 0 ? void 0 : (_props$args$name$vali6 = _props$args$name$vali5.length) === null || _props$args$name$vali6 === void 0 ? void 0 : _props$args$name$vali6.max) !== null && _props$args$name$vali4 !== void 0 ? _props$args$name$vali4 : Infinity, props.args.name.label, undefined) : undefined
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_1__/* .Flex */ .kC, {
      gap: "regular",
      alignItems: "end",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_keystar_ui_text_field__WEBPACK_IMPORTED_MODULE_2__/* .TextField */ .nv, {
        flex: 1,
        label: (_props$args$slug$labe2 = (_props$args$slug4 = props.args.slug) === null || _props$args$slug4 === void 0 ? void 0 : _props$args$slug4.label) !== null && _props$args$slug$labe2 !== void 0 ? _props$args$slug$labe2 : 'Slug',
        description: (_props$args$slug5 = props.args.slug) === null || _props$args$slug5 === void 0 ? void 0 : _props$args$slug5.description,
        value: props.value.slug,
        onChange: slug => {
          setShouldGenerateSlug(false);
          props.onChange({
            name: props.value.name,
            slug
          });
        },
        onBlur: () => setBlurredSlug(true),
        errorMessage: slugErrorMessage
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_1__/* .Flex */ .kC, {
        gap: "regular",
        direction: "column",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_keystar_ui_button__WEBPACK_IMPORTED_MODULE_0__/* .ActionButton */ .Kk, {
          onPress: () => {
            props.onChange({
              name: props.value.name,
              slug: generateSlug(props.value.name)
            });
          },
          children: "Regenerate"
        }), slugErrorMessage !== undefined && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_keystar_ui_layout__WEBPACK_IMPORTED_MODULE_1__/* .Box */ .xu, {
          height: "element.xsmall"
        })]
      })]
    })]
  });
}




/***/ }),

/***/ 93464:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PathReferenceInput: () => (/* binding */ PathReferenceInput)
/* harmony export */ });
/* harmony import */ var _keystar_ui_combobox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16817);
/* harmony import */ var minimatch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29736);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _data_0adde031_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5924);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(56786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ts_gql_tag_no_transform__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(76772);
/* harmony import */ var _utils_677addd9_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9583);
/* harmony import */ var emery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(85916);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6113);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(496);
'use client';















function PathReferenceInput(props) {
  var _props$validation;
  const match = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => props.pattern ? (0,minimatch__WEBPACK_IMPORTED_MODULE_1__/* .filter */ .hX)(props.pattern) : () => true, [props.pattern]);
  const [blurred, onBlur] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useReducer)(() => true, false);
  const tree = (0,_data_0adde031_node_react_server_esm_js__WEBPACK_IMPORTED_MODULE_3__.e)().current;
  const options = (0,react__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => {
    const files = tree.kind === 'loaded' ? [...tree.data.entries.values()] : [];
    return files.filter(val => match(val.path));
  }, [tree, match]);
  const _errorMessage = (props.forceValidation || blurred) && (_props$validation = props.validation) !== null && _props$validation !== void 0 && _props$validation.isRequired && props.value === null ? `${props.label} is required` : undefined;
  // this state & effect shouldn't really exist
  // it's here because react-aria/stately calls onSelectionChange with null
  // after selecting an item if we immediately remove the error message
  // so we delay it with an effect
  const [errorMessage, setErrorMessage] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(_errorMessage);
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    setErrorMessage(_errorMessage);
  }, [_errorMessage]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_keystar_ui_combobox__WEBPACK_IMPORTED_MODULE_0__/* .Combobox */ .hQ, {
    label: props.label,
    description: props.description,
    selectedKey: props.value,
    onSelectionChange: key => {
      if (typeof key === 'string' || key === null) {
        props.onChange(key);
      }
    },
    onBlur: onBlur,
    errorMessage: errorMessage,
    autoFocus: props.autoFocus,
    defaultItems: options,
    width: "auto",
    children: item => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_keystar_ui_combobox__WEBPACK_IMPORTED_MODULE_0__/* .Item */ .ck, {
      children: item.path
    }, item.path)
  });
}




/***/ }),

/***/ 54085:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   a: () => (/* binding */ useElementWithSetNodes),
/* harmony export */   b: () => (/* binding */ blockElementSpacing),
/* harmony export */   f: () => (/* binding */ focusWithPreviousSelection),
/* harmony export */   i: () => (/* binding */ insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading),
/* harmony export */   u: () => (/* binding */ useEventCallback)
/* harmony export */ });
/* harmony import */ var _keystar_ui_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(46792);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var slate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(91526);
/* harmony import */ var slate_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(68051);





function focusWithPreviousSelection(editor) {
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(slate_react__WEBPACK_IMPORTED_MODULE_2__/* .ReactEditor */ .F3.toDOMRange(editor, editor.selection));
  }
  slate_react__WEBPACK_IMPORTED_MODULE_2__/* .ReactEditor */ .F3.focus(editor);
}
const blockElementSpacing = (0,_keystar_ui_style__WEBPACK_IMPORTED_MODULE_0__/* .css */ .iv)({
  marginBlock: '1em',
  '&:first-child': {
    marginBlockStart: 0
  },
  '&:last-child': {
    marginBlockEnd: 0
  }
});
const ForceValidationContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createContext(false);
ForceValidationContext.Provider;

// this ensures that when changes happen, they are immediately shown
// this stops the problem of a cursor resetting to the end when a change is made
// because the changes are applied asynchronously
function useElementWithSetNodes(editor, element) {
  const [state, setState] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
    element,
    elementWithChanges: element
  });
  if (state.element !== element) {
    setState({
      element,
      elementWithChanges: element
    });
  }
  const elementRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(element);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    elementRef.current = element;
  });
  const setNodes = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(changesOrCallback => {
    const currentElement = elementRef.current;
    const changes = typeof changesOrCallback === 'function' ? changesOrCallback(currentElement) : changesOrCallback;
    slate__WEBPACK_IMPORTED_MODULE_3__.Transforms.setNodes(editor, changes, {
      at: slate_react__WEBPACK_IMPORTED_MODULE_2__/* .ReactEditor */ .F3.findPath(editor, currentElement)
    });
    setState({
      element: currentElement,
      elementWithChanges: {
        ...currentElement,
        ...changes
      }
    });
  }, [editor]);
  return [state.elementWithChanges, setNodes];
}
function useEventCallback(callback) {
  const callbackRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(callback);
  const cb = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () {
    return callbackRef.current(...arguments);
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    callbackRef.current = callback;
  });
  return cb;
}
function insertNodesButReplaceIfSelectionIsAtEmptyParagraphOrHeading(editor, nodes) {
  var _pathRefForEmptyNodeA;
  let pathRefForEmptyNodeAtCursor;
  const entry = slate__WEBPACK_IMPORTED_MODULE_3__.Editor.above(editor, {
    match: node => node.type === 'heading' || node.type === 'paragraph'
  });
  if (entry && slate__WEBPACK_IMPORTED_MODULE_3__.Node.string(entry[0]) === '') {
    pathRefForEmptyNodeAtCursor = slate__WEBPACK_IMPORTED_MODULE_3__.Editor.pathRef(editor, entry[1]);
  }
  slate__WEBPACK_IMPORTED_MODULE_3__.Transforms.insertNodes(editor, nodes);
  let path = (_pathRefForEmptyNodeA = pathRefForEmptyNodeAtCursor) === null || _pathRefForEmptyNodeA === void 0 ? void 0 : _pathRefForEmptyNodeA.unref();
  if (path) {
    slate__WEBPACK_IMPORTED_MODULE_3__.Transforms.removeNodes(editor, {
      at: path
    });
    // even though the selection is in the right place after the removeNodes
    // for some reason the editor blurs so we need to focus it again
    slate_react__WEBPACK_IMPORTED_MODULE_2__/* .ReactEditor */ .F3.focus(editor);
  }
}




/***/ }),

/***/ 82101:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ EditorAfterButIgnoringingPointsWithNoContent),
/* harmony export */   a: () => (/* binding */ getDocumentFeaturesForChildField),
/* harmony export */   b: () => (/* binding */ getAncestorSchemas),
/* harmony export */   c: () => (/* binding */ isInlineContainer),
/* harmony export */   d: () => (/* binding */ allMarks),
/* harmony export */   e: () => (/* binding */ editorSchema),
/* harmony export */   f: () => (/* binding */ isElementActive),
/* harmony export */   g: () => (/* binding */ getAncestorComponentChildFieldDocumentFeatures),
/* harmony export */   h: () => (/* binding */ clearFormatting),
/* harmony export */   i: () => (/* binding */ isBlock),
/* harmony export */   j: () => (/* binding */ getPlaceholderTextForPropPath),
/* harmony export */   m: () => (/* binding */ moveChildren),
/* harmony export */   n: () => (/* binding */ nodeTypeMatcher)
/* harmony export */ });
/* harmony import */ var slate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(91526);
/* harmony import */ var emery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85916);



const tableCellChildren = ['paragraph', 'code', 'heading', 'ordered-list', 'unordered-list', 'divider', 'image'];
const blockquoteChildren = [...tableCellChildren, 'table'];
const paragraphLike = [...blockquoteChildren, 'blockquote'];
const insideOfLayouts = [...paragraphLike, 'component-block'];
function blockContainer(args) {
  return {
    kind: 'blocks',
    allowedChildren: new Set(args.allowedChildren),
    blockToWrapInlinesIn: args.allowedChildren[0],
    invalidPositionHandleMode: args.invalidPositionHandleMode
  };
}
function inlineContainer(args) {
  return {
    kind: 'inlines',
    invalidPositionHandleMode: args.invalidPositionHandleMode
  };
}

// a user land version of https://github.com/microsoft/TypeScript/issues/47920
function satisfies() {
  return function (value) {
    return value;
  };
}
const editorSchema = satisfies()({
  editor: blockContainer({
    allowedChildren: [...insideOfLayouts, 'layout'],
    invalidPositionHandleMode: 'move'
  }),
  layout: blockContainer({
    allowedChildren: ['layout-area'],
    invalidPositionHandleMode: 'move'
  }),
  'layout-area': blockContainer({
    allowedChildren: insideOfLayouts,
    invalidPositionHandleMode: 'unwrap'
  }),
  blockquote: blockContainer({
    allowedChildren: blockquoteChildren,
    invalidPositionHandleMode: 'move'
  }),
  paragraph: inlineContainer({
    invalidPositionHandleMode: 'unwrap'
  }),
  code: inlineContainer({
    invalidPositionHandleMode: 'move'
  }),
  divider: inlineContainer({
    invalidPositionHandleMode: 'move'
  }),
  heading: inlineContainer({
    invalidPositionHandleMode: 'unwrap'
  }),
  'component-block': blockContainer({
    allowedChildren: ['component-block-prop', 'component-inline-prop'],
    invalidPositionHandleMode: 'move'
  }),
  'component-inline-prop': inlineContainer({
    invalidPositionHandleMode: 'unwrap'
  }),
  'component-block-prop': blockContainer({
    allowedChildren: [...paragraphLike, 'component-block'],
    invalidPositionHandleMode: 'unwrap'
  }),
  'ordered-list': blockContainer({
    allowedChildren: ['list-item'],
    invalidPositionHandleMode: 'move'
  }),
  'unordered-list': blockContainer({
    allowedChildren: ['list-item'],
    invalidPositionHandleMode: 'move'
  }),
  'list-item': blockContainer({
    allowedChildren: ['list-item-content', 'ordered-list', 'unordered-list'],
    invalidPositionHandleMode: 'unwrap'
  }),
  'list-item-content': inlineContainer({
    invalidPositionHandleMode: 'unwrap'
  }),
  image: inlineContainer({
    invalidPositionHandleMode: 'move'
  }),
  table: blockContainer({
    invalidPositionHandleMode: 'move',
    allowedChildren: ['table-head', 'table-body']
  }),
  'table-body': blockContainer({
    invalidPositionHandleMode: 'move',
    allowedChildren: ['table-row']
  }),
  'table-row': blockContainer({
    invalidPositionHandleMode: 'move',
    allowedChildren: ['table-cell']
  }),
  'table-cell': blockContainer({
    invalidPositionHandleMode: 'move',
    allowedChildren: tableCellChildren
  }),
  'table-head': blockContainer({
    invalidPositionHandleMode: 'move',
    allowedChildren: ['table-row']
  })
});
const inlineContainerTypes = new Set(Object.entries(editorSchema).filter(_ref => {
  let [, value] = _ref;
  return value.kind === 'inlines';
}).map(_ref2 => {
  let [type] = _ref2;
  return type;
}));
function isInlineContainer(node) {
  return node.type !== undefined && inlineContainerTypes.has(node.type);
}
const blockTypes = new Set(Object.keys(editorSchema).filter(x => x !== 'editor'));
function isBlock(node) {
  return blockTypes.has(node.type);
}

// to print the editor schema in Graphviz if you want to visualize it
// function printEditorSchema(editorSchema: EditorSchema) {
//   return `digraph G {
//   concentrate=true;
//   ${Object.keys(editorSchema)
//     .map(key => {
//       let val = editorSchema[key];
//       if (val.kind === 'inlines') {
//         return `"${key}" -> inlines`;
//       }
//       if (val.kind === 'blocks') {
//         return `"${key}" -> {${[...val.allowedChildren].map(x => JSON.stringify(x)).join(' ')}}`;
//       }
//     })
//     .join('\n  ')}
// }`;
// }

function getDocumentFeaturesForChildField(editorDocumentFeatures, options) {
  var _options$formatting, _options$formatting3, _options$formatting4, _options$formatting5, _options$formatting6, _options$formatting7;
  // an important note for this: normalization based on document features
  // is done based on the document features returned here
  // and the editor document features
  // so the result for any given child prop will be the things that are
  // allowed by both these document features
  // AND the editor document features
  const inlineMarksFromOptions = (_options$formatting = options.formatting) === null || _options$formatting === void 0 ? void 0 : _options$formatting.inlineMarks;
  const inlineMarks = inlineMarksFromOptions === 'inherit' ? 'inherit' : Object.fromEntries(Object.keys(editorDocumentFeatures.formatting.inlineMarks).map(mark => {
    return [mark, !!(inlineMarksFromOptions || {})[mark]];
  }));
  if (options.kind === 'inline') {
    var _options$formatting2;
    return {
      kind: 'inline',
      inlineMarks,
      documentFeatures: {
        links: options.links === 'inherit'
      },
      softBreaks: ((_options$formatting2 = options.formatting) === null || _options$formatting2 === void 0 ? void 0 : _options$formatting2.softBreaks) === 'inherit'
    };
  }
  const headingLevels = (_options$formatting3 = options.formatting) === null || _options$formatting3 === void 0 ? void 0 : _options$formatting3.headingLevels;
  return {
    kind: 'block',
    inlineMarks,
    softBreaks: ((_options$formatting4 = options.formatting) === null || _options$formatting4 === void 0 ? void 0 : _options$formatting4.softBreaks) === 'inherit',
    documentFeatures: {
      layouts: [],
      dividers: options.dividers === 'inherit' ? editorDocumentFeatures.dividers : false,
      formatting: {
        alignment: ((_options$formatting5 = options.formatting) === null || _options$formatting5 === void 0 ? void 0 : _options$formatting5.alignment) === 'inherit' ? editorDocumentFeatures.formatting.alignment : {
          center: false,
          end: false
        },
        blockTypes: ((_options$formatting6 = options.formatting) === null || _options$formatting6 === void 0 ? void 0 : _options$formatting6.blockTypes) === 'inherit' ? editorDocumentFeatures.formatting.blockTypes : {
          blockquote: false,
          code: false
        },
        headings: headingLevels === 'inherit' ? editorDocumentFeatures.formatting.headings : {
          levels: headingLevels ? editorDocumentFeatures.formatting.headings.levels.filter(level => headingLevels.includes(level)) : [],
          schema: editorDocumentFeatures.formatting.headings.schema
        },
        listTypes: ((_options$formatting7 = options.formatting) === null || _options$formatting7 === void 0 ? void 0 : _options$formatting7.listTypes) === 'inherit' ? editorDocumentFeatures.formatting.listTypes : {
          ordered: false,
          unordered: false
        }
      },
      links: options.links === 'inherit',
      images: options.images === 'inherit' ? editorDocumentFeatures.images : false,
      tables: options.tables === 'inherit'
    },
    componentBlocks: options.componentBlocks === 'inherit'
  };
}
function getSchemaAtPropPathInner(path, value, schema) {
  // because we're checking the length here
  // the non-null asserts on shift below are fine
  if (path.length === 0) {
    return schema;
  }
  if (schema.kind === 'child' || schema.kind === 'form') {
    return;
  }
  if (schema.kind === 'conditional') {
    const key = path.shift();
    if (key === 'discriminant') {
      return getSchemaAtPropPathInner(path, value.discriminant, schema.discriminant);
    }
    if (key === 'value') {
      const propVal = schema.values[value.discriminant];
      return getSchemaAtPropPathInner(path, value.value, propVal);
    }
    return;
  }
  if (schema.kind === 'object') {
    const key = path.shift();
    return getSchemaAtPropPathInner(path, value[key], schema.fields[key]);
  }
  if (schema.kind === 'array') {
    const index = path.shift();
    return getSchemaAtPropPathInner(path, value[index], schema.element);
  }
  (0,emery__WEBPACK_IMPORTED_MODULE_0__.assertNever)(schema);
}
function getSchemaAtPropPath(path, value, props) {
  return getSchemaAtPropPathInner([...path], value, {
    kind: 'object',
    fields: props
  });
}
function getAncestorSchemas(rootSchema, path, value) {
  const ancestors = [];
  const currentPath = [...path];
  let currentProp = rootSchema;
  let currentValue = value;
  while (currentPath.length) {
    ancestors.push(currentProp);
    const key = currentPath.shift(); // this code only runs when path.length is truthy so this non-null assertion is fine
    if (currentProp.kind === 'array') {
      currentProp = currentProp.element;
      currentValue = currentValue[key];
    } else if (currentProp.kind === 'conditional') {
      currentProp = currentProp.values[value.discriminant];
      currentValue = currentValue.value;
    } else if (currentProp.kind === 'object') {
      currentValue = currentValue[key];
      currentProp = currentProp.fields[key];
    } else if (currentProp.kind === 'child' || currentProp.kind === 'form') {
      throw new Error(`unexpected prop "${key}"`);
    } else {
      (0,emery__WEBPACK_IMPORTED_MODULE_0__.assertNever)(currentProp);
    }
  }
  return ancestors;
}
function getPlaceholderTextForPropPath(propPath, fields, formProps) {
  const field = getSchemaAtPropPath(propPath, formProps, fields);
  if ((field === null || field === void 0 ? void 0 : field.kind) === 'child') {
    return field.options.placeholder;
  }
  return '';
}

const allMarks = ['bold', 'italic', 'underline', 'strikethrough', 'code', 'superscript', 'subscript', 'keyboard'];
const isElementActive = (editor, format) => {
  const [match] = slate__WEBPACK_IMPORTED_MODULE_1__.Editor.nodes(editor, {
    match: n => n.type === format
  });
  return !!match;
};
function clearFormatting(editor) {
  slate__WEBPACK_IMPORTED_MODULE_1__.Transforms.unwrapNodes(editor, {
    match: node => node.type === 'heading' || node.type === 'blockquote' || node.type === 'code'
  });
  slate__WEBPACK_IMPORTED_MODULE_1__.Transforms.unsetNodes(editor, allMarks, {
    match: slate__WEBPACK_IMPORTED_MODULE_1__.Text.isText
  });
}
function moveChildren(editor, parent, to) {
  let shouldMoveNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : () => true;
  const parentPath = slate__WEBPACK_IMPORTED_MODULE_1__.Path.isPath(parent) ? parent : parent[1];
  const parentNode = slate__WEBPACK_IMPORTED_MODULE_1__.Path.isPath(parent) ? slate__WEBPACK_IMPORTED_MODULE_1__.Node.get(editor, parentPath) : parent[0];
  if (!isBlock(parentNode)) return;
  for (let i = parentNode.children.length - 1; i >= 0; i--) {
    if (shouldMoveNode(parentNode.children[i], i)) {
      const childPath = [...parentPath, i];
      slate__WEBPACK_IMPORTED_MODULE_1__.Transforms.moveNodes(editor, {
        at: childPath,
        to
      });
    }
  }
}

/**
 * This is equivalent to Editor.after except that it ignores points that have no content
 * like the point in a void text node, an empty text node and the last point in a text node
 */
// TODO: this would probably break if you were trying to get the last point in the editor?
function EditorAfterButIgnoringingPointsWithNoContent(editor, at) {
  let {
    distance = 1
  } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const anchor = slate__WEBPACK_IMPORTED_MODULE_1__.Editor.point(editor, at, {
    edge: 'end'
  });
  const focus = slate__WEBPACK_IMPORTED_MODULE_1__.Editor.end(editor, []);
  const range = {
    anchor,
    focus
  };
  let d = 0;
  let target;
  for (const p of slate__WEBPACK_IMPORTED_MODULE_1__.Editor.positions(editor, {
    at: range
  })) {
    if (d > distance) {
      break;
    }

    // this is the important change
    const node = slate__WEBPACK_IMPORTED_MODULE_1__.Node.get(editor, p.path);
    if (node.text.length === p.offset) {
      continue;
    }
    if (d !== 0) {
      target = p;
    }
    d++;
  }
  return target;
}
function nodeTypeMatcher() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (args.length === 1) {
    const type = args[0];
    return node => node.type === type;
  }
  const set = new Set(args);
  return node => typeof node.type === 'string' && set.has(node.type);
}
function getAncestorComponentChildFieldDocumentFeatures(editor, editorDocumentFeatures, componentBlocks) {
  const ancestorComponentProp = slate__WEBPACK_IMPORTED_MODULE_1__.Editor.above(editor, {
    match: nodeTypeMatcher('component-block-prop', 'component-inline-prop')
  });
  if (ancestorComponentProp) {
    const propPath = ancestorComponentProp[0].propPath;
    const ancestorComponent = slate__WEBPACK_IMPORTED_MODULE_1__.Editor.parent(editor, ancestorComponentProp[1]);
    if (ancestorComponent[0].type === 'component-block') {
      const component = ancestorComponent[0].component;
      const componentBlock = componentBlocks[component];
      if (componentBlock && propPath) {
        const childField = getSchemaAtPropPath(propPath, ancestorComponent[0].props, componentBlock.schema);
        if ((childField === null || childField === void 0 ? void 0 : childField.kind) === 'child') {
          return getDocumentFeaturesForChildField(editorDocumentFeatures, childField.options);
        }
      }
    }
  }
}




/***/ }),

/***/ 9583:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ getEntriesInCollectionWithTreeKey),
/* harmony export */   m: () => (/* binding */ getSlugFromState),
/* harmony export */   o: () => (/* binding */ object)
/* harmony export */ });
/* unused harmony exports A, B, C, K, a, b, c, e, f, g, h, i, j, k, l, n, p, q, r, s, t, u, v, w, x, y, z */
/* harmony import */ var emery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(85916);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6113);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);




function fixPath(path) {
  return path.replace(/^\.?\/+/, '').replace(/\/*$/, '');
}
const collectionPath = /\/\*\*?(?:$|\/)/;
function getConfiguredCollectionPath(config, collection) {
  var _collectionConfig$pat;
  const collectionConfig = config.collections[collection];
  const path = (_collectionConfig$pat = collectionConfig.path) !== null && _collectionConfig$pat !== void 0 ? _collectionConfig$pat : `${collection}/*/`;
  if (!collectionPath.test(path)) {
    throw new Error(`Collection path must end with /* or /** or include /*/ or /**/ but ${collection} has ${path}`);
  }
  return path;
}
function getCollectionPath(config, collection) {
  const configuredPath = getConfiguredCollectionPath(config, collection);
  const path = fixPath(configuredPath.replace(/\*\*?.*$/, ''));
  return path;
}
function getCollectionFormat(config, collection) {
  var _collectionConfig$for;
  const collectionConfig = config.collections[collection];
  return getFormatInfo((_collectionConfig$for = collectionConfig.format) !== null && _collectionConfig$for !== void 0 ? _collectionConfig$for : 'yaml', collectionConfig.schema, getConfiguredCollectionPath(config, collection));
}
function getSingletonFormat(config, singleton) {
  var _singletonConfig$form, _singletonConfig$path;
  const singletonConfig = config.singletons[singleton];
  return getFormatInfo((_singletonConfig$form = singletonConfig.format) !== null && _singletonConfig$form !== void 0 ? _singletonConfig$form : 'yaml', singletonConfig.schema, (_singletonConfig$path = singletonConfig.path) !== null && _singletonConfig$path !== void 0 ? _singletonConfig$path : `${singleton}/`);
}
function getCollectionItemPath(config, collection, slug) {
  const basePath = getCollectionPath(config, collection);
  const suffix = getCollectionItemSlugSuffix(config, collection);
  return `${basePath}/${slug}${suffix}`;
}
function getEntryDataFilepath(dir, formatInfo) {
  return `${dir}${formatInfo.dataLocation === 'index' ? '/index' : ''}${getDataFileExtension(formatInfo)}`;
}
function getSlugGlobForCollection(config, collection) {
  const collectionPath = getConfiguredCollectionPath(config, collection);
  return collectionPath.includes('**') ? '**' : '*';
}
function getCollectionItemSlugSuffix(config, collection) {
  const configuredPath = getConfiguredCollectionPath(config, collection);
  const path = fixPath(configuredPath.replace(/^[^*]+\*\*?/, ''));
  return path ? `/${path}` : '';
}
function getSingletonPath(config, singleton) {
  var _singleton$path, _singleton$path2;
  if ((_singleton$path = config.singletons[singleton].path) !== null && _singleton$path !== void 0 && _singleton$path.includes('*')) {
    throw new Error(`Singleton paths cannot include * but ${singleton} has ${config.singletons[singleton].path}`);
  }
  return fixPath((_singleton$path2 = config.singletons[singleton].path) !== null && _singleton$path2 !== void 0 ? _singleton$path2 : singleton);
}
function getDataFileExtension(formatInfo) {
  return formatInfo.contentField ? formatInfo.contentField.config.contentExtension : '.' + formatInfo.data;
}
function getFormatInfo(format, schema, path) {
  var _format$data;
  const dataLocation = path.endsWith('/') ? 'index' : 'outer';
  if (typeof format === 'string') {
    return {
      dataLocation,
      contentField: undefined,
      data: format
    };
  }
  let contentField;
  if (format.contentField) {
    const field = schema[format.contentField];
    (0,emery__WEBPACK_IMPORTED_MODULE_0__.assert)((field === null || field === void 0 ? void 0 : field.kind) === 'form', `${format.contentField} is not a form field`);
    (0,emery__WEBPACK_IMPORTED_MODULE_0__.assert)(field.formKind === 'content', `${format.contentField} is not a content field`);
    contentField = {
      key: format.contentField,
      config: field
    };
  }
  return {
    data: (_format$data = format.data) !== null && _format$data !== void 0 ? _format$data : 'yaml',
    contentField,
    dataLocation
  };
}

async function sha1(content) {
  return createHash('sha1').update(content).digest('hex');
}

const textEncoder$1 = new TextEncoder();
function blobSha(contents) {
  const blobPrefix = textEncoder$1.encode('blob ' + contents.length + '\0');
  const array = new Uint8Array(blobPrefix.byteLength + contents.byteLength);
  array.set(blobPrefix, 0);
  array.set(contents, blobPrefix.byteLength);
  return sha1(array);
}
function getTreeNodeAtPath(root, path) {
  const parts = path.split('/');
  let node = root.get(parts[0]);
  for (const part of parts.slice(1)) {
    if (!node) return undefined;
    if (!node.children) return undefined;
    node = node.children.get(part);
  }
  return node;
}
function getNodeAtPath(tree, path) {
  let node = tree;
  for (const part of path.split('/')) {
    if (!node.has(part)) {
      node.set(part, new Map());
    }
    const innerNode = node.get(part);
    assert(innerNode instanceof Map, 'expected tree');
    node = innerNode;
  }
  return node;
}
function getFilename(path) {
  return path.replace(/.*\//, '');
}
function getDirname(path) {
  return path.replace(/\/[^/]+$/, '');
}
function toTreeChanges(changes) {
  const changesRoot = new Map();
  for (const deletion of changes.deletions) {
    const parentTree = getNodeAtPath(changesRoot, getDirname(deletion));
    parentTree.set(getFilename(deletion), 'delete');
  }
  for (const addition of changes.additions) {
    const parentTree = getNodeAtPath(changesRoot, getDirname(addition.path));
    parentTree.set(getFilename(addition.path), addition.contents);
  }
  return changesRoot;
}
const SPACE_CHAR_CODE = 32;
const space = new Uint8Array([SPACE_CHAR_CODE]);
const nullchar = new Uint8Array([0]);
const tree = textEncoder$1.encode('tree ');

// based on https://github.com/isomorphic-git/isomorphic-git/blob/c09dfa20ffe0ab9e6602e0fa172d72ba8994e443/src/models/GitTree.js#L108-L122
function treeSha(children) {
  const entries = [...children].map(_ref => {
    let [name, node] = _ref;
    return {
      name,
      sha: node.entry.sha,
      mode: node.entry.mode
    };
  });
  entries.sort((a, b) => {
    const aName = a.mode === '040000' ? a.name + '/' : a.name;
    const bName = b.mode === '040000' ? b.name + '/' : b.name;
    return aName === bName ? 0 : aName < bName ? -1 : 1;
  });
  const treeObject = entries.flatMap(entry => {
    const mode = textEncoder$1.encode(entry.mode.replace(/^0/, ''));
    const name = textEncoder$1.encode(entry.name);
    const sha = hexToBytes(entry.sha);
    return [mode, space, name, nullchar, sha];
  });
  return sha1(concatBytes([tree, textEncoder$1.encode(treeObject.reduce((sum, val) => sum + val.byteLength, 0).toString()), nullchar, ...treeObject]));
}
function concatBytes(byteArrays) {
  const totalLength = byteArrays.reduce((sum, arr) => sum + arr.byteLength, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const arr of byteArrays) {
    result.set(arr, offset);
    offset += arr.byteLength;
  }
  return result;
}
function hexToBytes(str) {
  const bytes = new Uint8Array(str.length / 2);
  for (var i = 0; i < bytes.byteLength; i += 1) {
    const start = i * 2;
    bytes[i] = parseInt(str.slice(start, start + 2), 16);
  }
  return bytes;
}
async function createTreeNodeEntry(path, children) {
  const sha = await treeSha(children);
  return {
    path,
    mode: '040000',
    type: 'tree',
    sha
  };
}
async function createBlobNodeEntry(path, contents) {
  const sha = 'sha' in contents ? contents.sha : await blobSha(contents);
  return {
    path,
    mode: '100644',
    type: 'blob',
    sha,
    size: contents.byteLength
  };
}
async function updateTreeWithChanges(tree, changes) {
  var _await$updateTree;
  const newTree = (_await$updateTree = await updateTree(tree, toTreeChanges(changes), [])) !== null && _await$updateTree !== void 0 ? _await$updateTree : new Map();
  return {
    entries: treeToEntries(newTree),
    sha: await treeSha(newTree !== null && newTree !== void 0 ? newTree : new Map())
  };
}
function treeToEntries(tree) {
  return [...tree.values()].flatMap(x => x.children ? [x.entry, ...treeToEntries(x.children)] : [x.entry]);
}
async function updateTree(tree, changedTree, path) {
  const newTree = new Map(tree);
  for (const [key, value] of changedTree) {
    if (value === 'delete') {
      newTree.delete(key);
    }
    if (value instanceof Map) {
      var _newTree$get$children, _newTree$get;
      const existingChildren = (_newTree$get$children = (_newTree$get = newTree.get(key)) === null || _newTree$get === void 0 ? void 0 : _newTree$get.children) !== null && _newTree$get$children !== void 0 ? _newTree$get$children : new Map();
      const children = await updateTree(existingChildren, value, path.concat(key));
      if (children === undefined) {
        newTree.delete(key);
        continue;
      }
      const entry = await createTreeNodeEntry(path.concat(key).join('/'), children);
      newTree.set(key, {
        entry,
        children
      });
    }
    if (value instanceof Uint8Array || typeof value === 'object' && 'sha' in value) {
      const entry = await createBlobNodeEntry(path.concat(key).join('/'), value);
      newTree.set(key, {
        entry
      });
    }
  }
  if (newTree.size === 0) {
    return undefined;
  }
  return newTree;
}
function treeEntriesToTreeNodes(entries) {
  const root = new Map();
  const getChildrenAtPath = parts => {
    var _node;
    if (parts.length === 0) {
      return root;
    }
    let node = root.get(parts[0]);
    for (const part of parts.slice(1)) {
      if (!node) return undefined;
      if (!node.children) return undefined;
      node = node.children.get(part);
    }
    return (_node = node) === null || _node === void 0 ? void 0 : _node.children;
  };
  for (const entry of entries) {
    const split = entry.path.split('/');
    const children = getChildrenAtPath(split.slice(0, -1));
    if (children) {
      children.set(split[split.length - 1], {
        entry,
        children: entry.type === 'tree' ? new Map() : undefined
      });
    }
  }
  return root;
}

function collectDirectoriesUsedInSchemaInner(schema, directories, seenSchemas) {
  if (seenSchemas.has(schema)) {
    return;
  }
  seenSchemas.add(schema);
  if (schema.kind === 'array') {
    return collectDirectoriesUsedInSchemaInner(schema.element, directories, seenSchemas);
  }
  if (schema.kind === 'child') {
    return;
  }
  if (schema.kind === 'form') {
    if (schema.formKind === 'asset' && schema.directory !== undefined) {
      directories.add(fixPath(schema.directory));
    }
    if (schema.formKind === 'content' && schema.directories !== undefined) {
      for (const directory of schema.directories) {
        directories.add(fixPath(directory));
      }
    }
    return;
  }
  if (schema.kind === 'object') {
    for (const field of Object.values(schema.fields)) {
      collectDirectoriesUsedInSchemaInner(field, directories, seenSchemas);
    }
    return;
  }
  if (schema.kind === 'conditional') {
    for (const innerSchema of Object.values(schema.values)) {
      collectDirectoriesUsedInSchemaInner(innerSchema, directories, seenSchemas);
    }
    return;
  }
  (0,emery__WEBPACK_IMPORTED_MODULE_0__.assertNever)(schema);
}
function collectDirectoriesUsedInSchema(schema) {
  const directories = new Set();
  collectDirectoriesUsedInSchemaInner(schema, directories, new Set());
  return directories;
}
function getDirectoriesForTreeKey(schema, directory, slug, format) {
  const directories = [fixPath(directory)];
  if (format.dataLocation === 'outer') {
    directories.push(fixPath(directory) + getDataFileExtension(format));
  }
  const toAdd = slug === undefined ? '' : `/${slug}`;
  for (const directory of collectDirectoriesUsedInSchema(schema)) {
    directories.push(directory + toAdd);
  }
  return directories;
}
function getTreeKey(directories, tree) {
  return directories.map(d => {
    var _getTreeNodeAtPath;
    return (_getTreeNodeAtPath = getTreeNodeAtPath(tree, d)) === null || _getTreeNodeAtPath === void 0 ? void 0 : _getTreeNodeAtPath.entry.sha;
  }).join('-');
}

var pkgJson = {
	name: "@keystatic/core",
	version: "0.0.111",
	license: "MIT",
	repository: {
		type: "git",
		url: "https://github.com/Thinkmill/keystatic/",
		directory: "packages/keystatic"
	},
	exports: {
		"./ui": {
			types: "./ui/dist/keystatic-core-ui.cjs.js",
			node: {
				"react-server": {
					module: "./ui/dist/keystatic-core-ui.node.react-server.esm.js",
					"default": "./ui/dist/keystatic-core-ui.node.react-server.cjs.js"
				},
				module: "./ui/dist/keystatic-core-ui.node.esm.js",
				"default": "./ui/dist/keystatic-core-ui.node.cjs.js"
			},
			"react-server": {
				module: "./ui/dist/keystatic-core-ui.react-server.esm.js",
				"default": "./ui/dist/keystatic-core-ui.react-server.cjs.js"
			},
			module: "./ui/dist/keystatic-core-ui.esm.js",
			"default": "./ui/dist/keystatic-core-ui.cjs.js"
		},
		".": {
			types: "./dist/keystatic-core.cjs.js",
			node: {
				"react-server": {
					module: "./dist/keystatic-core.node.react-server.esm.js",
					"default": "./dist/keystatic-core.node.react-server.cjs.js"
				},
				module: "./dist/keystatic-core.node.esm.js",
				"default": "./dist/keystatic-core.node.cjs.js"
			},
			"react-server": {
				module: "./dist/keystatic-core.react-server.esm.js",
				"default": "./dist/keystatic-core.react-server.cjs.js"
			},
			module: "./dist/keystatic-core.esm.js",
			"default": "./dist/keystatic-core.cjs.js"
		},
		"./api/utils": {
			types: "./api/utils/dist/keystatic-core-api-utils.cjs.js",
			node: {
				"react-server": {
					module: "./api/utils/dist/keystatic-core-api-utils.node.react-server.esm.js",
					"default": "./api/utils/dist/keystatic-core-api-utils.node.react-server.cjs.js"
				},
				module: "./api/utils/dist/keystatic-core-api-utils.node.esm.js",
				"default": "./api/utils/dist/keystatic-core-api-utils.node.cjs.js"
			},
			"react-server": {
				module: "./api/utils/dist/keystatic-core-api-utils.react-server.esm.js",
				"default": "./api/utils/dist/keystatic-core-api-utils.react-server.cjs.js"
			},
			module: "./api/utils/dist/keystatic-core-api-utils.esm.js",
			"default": "./api/utils/dist/keystatic-core-api-utils.cjs.js"
		},
		"./renderer": {
			types: "./renderer/dist/keystatic-core-renderer.cjs.js",
			node: {
				"react-server": {
					module: "./renderer/dist/keystatic-core-renderer.node.react-server.esm.js",
					"default": "./renderer/dist/keystatic-core-renderer.node.react-server.cjs.js"
				},
				module: "./renderer/dist/keystatic-core-renderer.node.esm.js",
				"default": "./renderer/dist/keystatic-core-renderer.node.cjs.js"
			},
			"react-server": {
				module: "./renderer/dist/keystatic-core-renderer.react-server.esm.js",
				"default": "./renderer/dist/keystatic-core-renderer.react-server.cjs.js"
			},
			module: "./renderer/dist/keystatic-core-renderer.esm.js",
			"default": "./renderer/dist/keystatic-core-renderer.cjs.js"
		},
		"./api/generic": {
			types: "./api/generic/dist/keystatic-core-api-generic.cjs.js",
			node: {
				"react-server": {
					module: "./api/generic/dist/keystatic-core-api-generic.node.react-server.esm.js",
					"default": "./api/generic/dist/keystatic-core-api-generic.node.react-server.cjs.js"
				},
				module: "./api/generic/dist/keystatic-core-api-generic.node.esm.js",
				"default": "./api/generic/dist/keystatic-core-api-generic.node.cjs.js"
			},
			"react-server": {
				module: "./api/generic/dist/keystatic-core-api-generic.react-server.esm.js",
				"default": "./api/generic/dist/keystatic-core-api-generic.react-server.cjs.js"
			},
			module: "./api/generic/dist/keystatic-core-api-generic.esm.js",
			"default": "./api/generic/dist/keystatic-core-api-generic.cjs.js"
		},
		"./reader": {
			types: "./reader/dist/keystatic-core-reader.cjs.js",
			node: {
				"react-server": {
					module: "./reader/dist/keystatic-core-reader.node.react-server.esm.js",
					"default": "./reader/dist/keystatic-core-reader.node.react-server.cjs.js"
				},
				module: "./reader/dist/keystatic-core-reader.node.esm.js",
				"default": "./reader/dist/keystatic-core-reader.node.cjs.js"
			},
			"react-server": {
				module: "./reader/dist/keystatic-core-reader.react-server.esm.js",
				"default": "./reader/dist/keystatic-core-reader.react-server.cjs.js"
			},
			module: "./reader/dist/keystatic-core-reader.esm.js",
			"default": "./reader/dist/keystatic-core-reader.cjs.js"
		},
		"./form/fields/markdoc": {
			types: "./form/fields/markdoc/dist/keystatic-core-form-fields-markdoc.cjs.js",
			node: {
				"react-server": {
					module: "./form/fields/markdoc/dist/keystatic-core-form-fields-markdoc.node.react-server.esm.js",
					"default": "./form/fields/markdoc/dist/keystatic-core-form-fields-markdoc.node.react-server.cjs.js"
				},
				module: "./form/fields/markdoc/dist/keystatic-core-form-fields-markdoc.node.esm.js",
				"default": "./form/fields/markdoc/dist/keystatic-core-form-fields-markdoc.node.cjs.js"
			},
			"react-server": {
				module: "./form/fields/markdoc/dist/keystatic-core-form-fields-markdoc.react-server.esm.js",
				"default": "./form/fields/markdoc/dist/keystatic-core-form-fields-markdoc.react-server.cjs.js"
			},
			module: "./form/fields/markdoc/dist/keystatic-core-form-fields-markdoc.esm.js",
			"default": "./form/fields/markdoc/dist/keystatic-core-form-fields-markdoc.cjs.js"
		},
		"./package.json": "./package.json"
	},
	main: "dist/keystatic-core.cjs.js",
	module: "dist/keystatic-core.esm.js",
	files: [
		"dist",
		"api",
		"reader",
		"renderer",
		"ui",
		"form"
	],
	scripts: {
		setup: "ts-gql build && tsx scripts/l10n.ts && tsx scripts/build-prism.ts",
		build: "pnpm run setup && next build",
		dev: "next dev",
		start: "next start"
	},
	dependencies: {
		"@babel/runtime": "^7.18.3",
		"@braintree/sanitize-url": "^6.0.2",
		"@emotion/css": "^11.9.0",
		"@emotion/weak-memoize": "^0.3.0",
		"@floating-ui/react": "^0.24.0",
		"@hapi/iron": "^7.0.0",
		"@internationalized/string": "^3.1.1",
		"@keystar/ui": "^0.1.4",
		"@markdoc/markdoc": "^0.3.0",
		"@react-aria/focus": "^3.13.0",
		"@react-aria/i18n": "^3.8.0",
		"@react-aria/interactions": "^3.16.0",
		"@react-aria/overlays": "^3.15.0",
		"@react-aria/selection": "^3.16.0",
		"@react-aria/utils": "^3.18.0",
		"@react-aria/visually-hidden": "^3.8.2",
		"@react-stately/collections": "^3.9.0",
		"@react-stately/list": "^3.9.0",
		"@react-stately/overlays": "^3.6.0",
		"@react-stately/utils": "^3.7.0",
		"@react-types/shared": "^3.18.0",
		"@sindresorhus/slugify": "^1.1.2",
		"@ts-gql/tag": "^0.7.0",
		"@types/node": "16.11.13",
		"@types/react": "^18.2.8",
		"@types/react-dom": "^18.0.11",
		"@urql/core": "^4.0.4",
		"@urql/exchange-auth": "^2.1.0",
		"@urql/exchange-graphcache": "^6.0.1",
		"@urql/exchange-persisted": "^3.0.0",
		"apply-ref": "^1.0.0",
		cookie: "^0.5.0",
		emery: "^1.4.1",
		"escape-string-regexp": "^4.0.0",
		"fast-deep-equal": "^3.1.3",
		graphql: "^16.6.0",
		ignore: "^5.2.4",
		"is-hotkey": "^0.2.0",
		"js-base64": "^3.7.5",
		"js-yaml": "^4.1.0",
		"lru-cache": "^7.14.1",
		"match-sorter": "^6.3.1",
		"mdast-util-from-markdown": "^0.8.5",
		"mdast-util-gfm-autolink-literal": "^0.1.3",
		"mdast-util-gfm-strikethrough": "^0.2.3",
		"micromark-extension-gfm-autolink-literal": "0.5.7",
		"micromark-extension-gfm-strikethrough": "0.6.5",
		mime: "^3.0.0",
		minimatch: "^7.1.0",
		"pretty-format": "^29.0.1",
		prismjs: "^1.29.0",
		"prosemirror-commands": "^1.5.1",
		"prosemirror-history": "^1.3.0",
		"prosemirror-keymap": "^1.2.1",
		"prosemirror-model": "^1.19.0",
		"prosemirror-state": "^1.4.2",
		"prosemirror-transform": "^1.7.1",
		"prosemirror-view": "^1.30.2",
		"react-resizable-panels": "^0.0.53",
		"scroll-into-view-if-needed": "^3.0.3",
		slate: "^0.91.4",
		"slate-history": "^0.86.0",
		"slate-hyperscript": "^0.77.0",
		"slate-react": "^0.91.9",
		urql: "^4.0.0",
		zod: "^3.20.2"
	},
	devDependencies: {
		"@testing-library/user-event": "^14.4.3",
		"@ts-gql/compiler": "^0.16.1",
		"@ts-gql/eslint-plugin": "^0.8.5",
		"@ts-gql/next": "^17.0.0",
		"@types/cookie": "^0.5.1",
		"@types/is-hotkey": "^0.1.7",
		"@types/js-yaml": "^4.0.5",
		"@types/prismjs": "^1.26.0",
		"@types/signal-exit": "^3.0.1",
		eslint: "^8.18.0",
		"fast-glob": "^3.2.12",
		"jest-diff": "^29.0.1",
		outdent: "^0.8.0",
		react: "^18.2.0",
		"react-dom": "^18.2.0",
		"react-element-to-jsx-string": "^15.0.0",
		"resize-observer-polyfill": "^1.5.1",
		"signal-exit": "^3.0.7",
		tsx: "^3.8.0",
		typescript: "^5.1.3"
	},
	peerDependencies: {
		react: "^18.2.0",
		"react-dom": "^18.2.0"
	},
	preconstruct: {
		entrypoints: [
			"index.ts",
			"api/generic.ts",
			"api/utils.ts",
			"reader/index.ts",
			"renderer.tsx",
			"ui.tsx",
			"form/fields/markdoc/index.tsx"
		]
	},
	"ts-gql": {
		schema: "./github.graphql",
		mode: "no-transform",
		addTypename: false,
		scalars: {
			GitObjectID: "string"
		}
	},
	imports: {
		"#react-cache-in-react-server": {
			"react-server": "./src/reader/react-server-cache.ts",
			"default": "./src/reader/noop-cache.ts"
		},
		"#sha1": {
			node: "./src/sha1/node.ts",
			"default": "./src/sha1/webcrypto.ts"
		}
	}
};

function object(fields, opts) {
  return {
    ...opts,
    kind: 'object',
    fields
  };
}

function pluralize(count, options) {
  const {
    singular,
    plural = singular + 's',
    inclusive = true
  } = options;
  const variant = count === 1 ? singular : plural;
  return inclusive ? `${count} ${variant}` : variant;
}
function keyedEntries(obj) {
  return Object.entries(obj).map(_ref => {
    let [key, value] = _ref;
    return {
      key,
      ...value
    };
  });
}
function isGitHubConfig(config) {
  return config.storage.kind === 'github';
}
function isLocalConfig(config) {
  return config.storage.kind === 'local';
}
function isCloudConfig(config) {
  return config.storage.kind === 'cloud';
}
function getRepoPath(config) {
  return `${config.mainOwner}/${config.mainRepo}`;
}
function getRepoUrl(config) {
  return `https://github.com/${getRepoPath(config)}`;
}
function getSlugFromState(collectionConfig, state) {
  const value = state[collectionConfig.slugField];
  const field = collectionConfig.schema[collectionConfig.slugField];
  if (field.kind !== 'form' || field.formKind !== 'slug') {
    throw new Error(`slugField is not a slug field`);
  }
  return field.serializeWithSlug(value).slug;
}
function getEntriesInCollectionWithTreeKey(config, collection, rootTree) {
  var _getTreeNodeAtPath$ch, _getTreeNodeAtPath;
  const collectionConfig = config.collections[collection];
  const schema = object(collectionConfig.schema);
  const formatInfo = getCollectionFormat(config, collection);
  const extension = getDataFileExtension(formatInfo);
  const glob = getSlugGlobForCollection(config, collection);
  const collectionPath = getCollectionPath(config, collection);
  const directory = (_getTreeNodeAtPath$ch = (_getTreeNodeAtPath = getTreeNodeAtPath(rootTree, collectionPath)) === null || _getTreeNodeAtPath === void 0 ? void 0 : _getTreeNodeAtPath.children) !== null && _getTreeNodeAtPath$ch !== void 0 ? _getTreeNodeAtPath$ch : new Map();
  const entries = [];
  const directoriesUsedInSchema = [...collectDirectoriesUsedInSchema(schema)];
  const suffix = getCollectionItemSlugSuffix(config, collection);
  const possibleEntries = new Map(directory);
  if (glob === '**') {
    const handleDirectory = (dir, prefix) => {
      for (const [key, entry] of dir) {
        if (entry.children) {
          possibleEntries.set(`${prefix}${key}`, entry);
          handleDirectory(entry.children, `${prefix}${key}/`);
        } else {
          possibleEntries.set(`${prefix}${key}`, entry);
        }
      }
    };
    handleDirectory(directory, '');
  }
  for (const [key, entry] of possibleEntries) {
    if (formatInfo.dataLocation === 'index') {
      var _actualEntry$children;
      const actualEntry = getTreeNodeAtPath(rootTree, getCollectionItemPath(config, collection, key));
      if (!(actualEntry !== null && actualEntry !== void 0 && (_actualEntry$children = actualEntry.children) !== null && _actualEntry$children !== void 0 && _actualEntry$children.has('index' + extension))) continue;
      entries.push({
        key: getTreeKey([actualEntry.entry.path, ...directoriesUsedInSchema.map(x => `${x}/${key}`)], rootTree),
        slug: key
      });
    } else {
      if (suffix) {
        const newEntry = getTreeNodeAtPath(rootTree, getCollectionItemPath(config, collection, key) + extension);
        if (!newEntry || newEntry.children) continue;
        entries.push({
          key: getTreeKey([entry.entry.path, getCollectionItemPath(config, collection, key), ...directoriesUsedInSchema.map(x => `${x}/${key}`)], rootTree),
          slug: key
        });
      }
      if (entry.children || !key.endsWith(extension)) continue;
      const slug = key.slice(0, -extension.length);
      entries.push({
        key: getTreeKey([entry.entry.path, getCollectionItemPath(config, collection, slug), ...directoriesUsedInSchema.map(x => `${x}/${slug}`)], rootTree),
        slug
      });
    }
  }
  return entries;
}
const KEYSTATIC_CLOUD_API_URL = 'https://api.keystatic.cloud';
const KEYSTATIC_CLOUD_HEADERS = {
  'x-keystatic-version': pkgJson.version
};
const textEncoder = new TextEncoder();
async function redirectToCloudAuth(from, config) {
  if (config.storage.kind !== 'cloud') {
    throw new Error('Not a cloud config');
  }
  const code_verifier = fromUint8Array(crypto.getRandomValues(new Uint8Array(32)), true);
  const code_challenge = fromUint8Array(new Uint8Array(await crypto.subtle.digest('SHA-256', textEncoder.encode(code_verifier))), true);
  const state = fromUint8Array(crypto.getRandomValues(new Uint8Array(32)), true);
  localStorage.setItem('keystatic-cloud-state', JSON.stringify({
    state,
    from,
    code_verifier
  }));
  const url = new URL(`${KEYSTATIC_CLOUD_API_URL}/oauth/authorize`);
  url.searchParams.set('state', state);
  url.searchParams.set('client_id', config.storage.project);
  url.searchParams.set('redirect_uri', `${window.location.origin}/keystatic/cloud/oauth/callback`);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('code_challenge_method', 'S256');
  url.searchParams.set('code_challenge', code_challenge);
  url.searchParams.set('keystatic_version', pkgJson.version);
  window.location.href = url.toString();
}




/***/ }),

/***/ 65705:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  t: () => (/* binding */ createReader)
});

// EXTERNAL MODULE: ../node_modules/@keystar/ui/checkbox/dist/keystar-ui-checkbox.esm.js
var keystar_ui_checkbox_esm = __webpack_require__(69286);
// EXTERNAL MODULE: ../node_modules/@keystar/ui/typography/dist/keystar-ui-typography.esm.js
var keystar_ui_typography_esm = __webpack_require__(57646);
// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(56786);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/ui-b1673cee.node.react-server.esm.js
var ui_b1673cee_node_react_server_esm = __webpack_require__(55788);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/index-36a0dcb1.node.react-server.esm.js + 1 modules
var index_36a0dcb1_node_react_server_esm = __webpack_require__(77619);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/utils-677addd9.node.react-server.esm.js
var utils_677addd9_node_react_server_esm = __webpack_require__(32186);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/ui-32b334fd.node.react-server.esm.js
var ui_32b334fd_node_react_server_esm = __webpack_require__(90253);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/ui-58f594ec.node.react-server.esm.js
var ui_58f594ec_node_react_server_esm = __webpack_require__(35887);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/ui-1b838e41.node.react-server.esm.js
var ui_1b838e41_node_react_server_esm = __webpack_require__(36034);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/ui-4365cc36.node.react-server.esm.js
var ui_4365cc36_node_react_server_esm = __webpack_require__(78936);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/ui-fa32ff3c.node.react-server.esm.js
var ui_fa32ff3c_node_react_server_esm = __webpack_require__(30227);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/ui-4f76db75.node.react-server.esm.js
var ui_4f76db75_node_react_server_esm = __webpack_require__(69753);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/ui-23d3b9aa.node.react-server.esm.js
var ui_23d3b9aa_node_react_server_esm = __webpack_require__(79097);
// EXTERNAL MODULE: ../node_modules/@sindresorhus/slugify/index.js
var slugify = __webpack_require__(66615);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/ui-78a3a4f0.node.react-server.esm.js
var ui_78a3a4f0_node_react_server_esm = __webpack_require__(27449);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/ui-c44da0bc.node.react-server.esm.js
var ui_c44da0bc_node_react_server_esm = __webpack_require__(38566);
// EXTERNAL MODULE: ../node_modules/@braintree/sanitize-url/dist/index.js
var dist = __webpack_require__(69797);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/ui-949db933.node.react-server.esm.js
var ui_949db933_node_react_server_esm = __webpack_require__(45192);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/ui-6ea72555.node.react-server.esm.js
var ui_6ea72555_node_react_server_esm = __webpack_require__(97313);
// EXTERNAL MODULE: external "fs/promises"
var promises_ = __webpack_require__(73292);
var promises_default = /*#__PURE__*/__webpack_require__.n(promises_);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(71017);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/error-ca8f88e5.node.react-server.esm.js
var error_ca8f88e5_node_react_server_esm = __webpack_require__(79646);
// EXTERNAL MODULE: ../node_modules/emery/dist/emery.cjs.js
var emery_cjs = __webpack_require__(45603);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/initial-values-25bf35f4.node.react-server.esm.js
var initial_values_25bf35f4_node_react_server_esm = __webpack_require__(26136);
;// CONCATENATED MODULE: ../node_modules/@keystatic/core/dist/errors-f334cbf7.node.react-server.esm.js




function validateArrayLength(schema, val, path) {
    var _schema$validation, _schema$validation$le, _schema$validation2, _schema$validation2$l;
    if (((_schema$validation = schema.validation) === null || _schema$validation === void 0 ? void 0 : (_schema$validation$le = _schema$validation.length) === null || _schema$validation$le === void 0 ? void 0 : _schema$validation$le.min) !== undefined && val.length < schema.validation.length.min) {
        return new PropValidationError(new error_ca8f88e5_node_react_server_esm.F(`Must have at least ${schema.validation.length.min} element${schema.validation.length.min === 1 ? "" : "s"}`), path, schema);
    }
    if (((_schema$validation2 = schema.validation) === null || _schema$validation2 === void 0 ? void 0 : (_schema$validation2$l = _schema$validation2.length) === null || _schema$validation2$l === void 0 ? void 0 : _schema$validation2$l.max) !== undefined && val.length > schema.validation.length.max) {
        return new PropValidationError(new error_ca8f88e5_node_react_server_esm.F(`Must have at most ${schema.validation.length.max} element${schema.validation.length.max === 1 ? "" : "s"}}`), path, schema);
    }
}
class PropValidationError extends Error {
    constructor(cause, path, schema){
        super(`field error at ${path.join(".")}`, {
            cause
        });
        this.path = path;
        this.schema = schema;
        this.cause = cause;
    }
}
function toFormFieldStoredValue(val) {
    if (val === null) {
        return undefined;
    }
    return val;
}
const isArray = Array.isArray;
function parseProps(schema, _value, path, pathWithArrayFieldSlugs, parseFormField, /** This should be true for the reader and false elsewhere */ validateArrayFieldLength) {
    let value = toFormFieldStoredValue(_value);
    if (schema.kind === "form") {
        try {
            return parseFormField(schema, value, path, pathWithArrayFieldSlugs);
        } catch (err) {
            throw new PropValidationError(err, path, schema);
        }
    }
    if (schema.kind === "child") {
        return null;
    }
    if (schema.kind === "conditional") {
        if (value === undefined) {
            return (0,initial_values_25bf35f4_node_react_server_esm.g)(schema);
        }
        try {
            if (typeof value !== "object" || value === null || isArray(value)) {
                throw new error_ca8f88e5_node_react_server_esm.F("Must be an object");
            }
            for (const key of Object.keys(value)){
                if (key !== "discriminant" && key !== "value") {
                    throw new error_ca8f88e5_node_react_server_esm.F(`Must only contain keys "discriminant" and "value", not "${key}"`);
                }
            }
        } catch (err) {
            throw new PropValidationError(err, path, schema);
        }
        const parsedDiscriminant = parseProps(schema.discriminant, value.discriminant, path.concat("discriminant"), pathWithArrayFieldSlugs.concat("discriminant"), parseFormField, validateArrayFieldLength);
        return {
            discriminant: parsedDiscriminant,
            value: parseProps(schema.values[parsedDiscriminant], value.value, path.concat("value"), pathWithArrayFieldSlugs.concat("value"), parseFormField, validateArrayFieldLength)
        };
    }
    if (schema.kind === "object") {
        if (value === undefined) {
            value = {};
        }
        try {
            if (typeof value !== "object" || value === null || isArray(value)) {
                throw new error_ca8f88e5_node_react_server_esm.F("Must be an object");
            }
            const allowedKeysSet = new Set(Object.keys(schema.fields));
            for (const key of Object.keys(value)){
                if (!allowedKeysSet.has(key)) {
                    throw new error_ca8f88e5_node_react_server_esm.F(`Key on object value "${key}" is not allowed`);
                }
            }
        } catch (err) {
            throw new PropValidationError(err, path, schema);
        }
        const val = {};
        const errors = [];
        for (const key of Object.keys(schema.fields)){
            let individualVal = value[key];
            try {
                const propVal = parseProps(schema.fields[key], individualVal, path.concat(key), pathWithArrayFieldSlugs.concat(key), parseFormField, validateArrayFieldLength);
                val[key] = propVal;
            } catch (err) {
                errors.push(err);
            }
        }
        if (errors.length) {
            throw new AggregateError(errors);
        }
        return val;
    }
    if (schema.kind === "array") {
        if (value === undefined) {
            return [];
        }
        try {
            if (!isArray(value)) {
                throw new error_ca8f88e5_node_react_server_esm.F("Must be an array");
            }
        } catch (err) {
            throw new PropValidationError(err, path, schema);
        }
        const errors = [];
        try {
            if (validateArrayFieldLength) {
                const error = validateArrayLength(schema, value, path);
                if (error !== undefined) {
                    errors.push(error);
                }
            }
            return value.map((innerVal, i)=>{
                try {
                    let slug = i.toString();
                    if (schema.slugField && typeof innerVal === "object" && innerVal !== null && !isArray(innerVal)) {
                        if (schema.element.kind !== "object") {
                            throw new Error("slugField on array fields requires the an object field element");
                        }
                        const slugField = schema.element.fields[schema.slugField];
                        if (!slugField) {
                            throw new Error(`slugField "${schema.slugField}" does not exist on object field`);
                        }
                        if (slugField.kind !== "form") {
                            throw new Error(`slugField "${schema.slugField}" is not a form field`);
                        }
                        if (slugField.formKind !== "slug") {
                            throw new Error(`slugField "${schema.slugField}" is not a slug field`);
                        }
                        let parsedSlugFieldValue;
                        try {
                            parsedSlugFieldValue = slugField.parse(toFormFieldStoredValue(innerVal[schema.slugField]), undefined);
                        } catch (err) {
                            throw new AggregateError([
                                err
                            ]);
                        }
                        slug = slugField.serializeWithSlug(parsedSlugFieldValue).slug;
                    }
                    return parseProps(schema.element, innerVal, path.concat(i), pathWithArrayFieldSlugs.concat(slug), parseFormField, validateArrayFieldLength);
                } catch (err) {
                    errors.push(err);
                }
            });
        } finally{
            if (errors.length) {
                throw new AggregateError(errors);
            }
        }
    }
    (0,emery_cjs.assertNever)(schema);
}
function flattenErrors(error) {
    if (error instanceof AggregateError) {
        return error.errors.flatMap(flattenErrors);
    }
    return [
        error
    ];
}
function formatFormDataError(error) {
    const flatErrors = flattenErrors(error);
    return flatErrors.map((error)=>{
        if (error instanceof PropValidationError) {
            const path = error.path.join(".");
            return `${path}: ${error.cause instanceof error_ca8f88e5_node_react_server_esm.F ? error.cause.message : `Unexpected error: ${error.cause}`}`;
        }
        return `Unexpected error: ${error}`;
    }).join("\n");
}
function toFormattedFormDataError(error) {
    const formatted = formatFormDataError(error);
    return new Error(`Field validation failed:\n` + formatted);
}
function clientSideValidateProp(schema, value, slugField) {
    try {
        validateValueWithSchema(schema, value, slugField);
        return true;
    } catch (error) {
        console.warn(toFormattedFormDataError(error));
        return false;
    }
}
function validateValueWithSchema(schema, value, slugField) {
    let path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
    switch(schema.kind){
        case "child":
            {
                return;
            }
        case "form":
            {
                try {
                    if (slugField && path[path.length - 1] === (slugField === null || slugField === void 0 ? void 0 : slugField.field)) {
                        schema.validate(value, {
                            slugField: {
                                slugs: slugField.slugs,
                                glob: slugField.glob
                            }
                        });
                        return;
                    }
                    schema.validate(value, undefined);
                } catch (err) {
                    throw new PropValidationError(err, path, schema);
                }
                return;
            }
        case "conditional":
            {
                schema.discriminant.validate(value.discriminant);
                validateValueWithSchema(schema.values[value.discriminant], value.value, undefined, path.concat("value"));
                return;
            }
        case "object":
            {
                const errors = [];
                for (const [key, childProp] of Object.entries(schema.fields)){
                    try {
                        validateValueWithSchema(childProp, value[key], key === (slugField === null || slugField === void 0 ? void 0 : slugField.field) ? slugField : undefined, path.concat(key));
                    } catch (err) {
                        errors.push(err);
                    }
                }
                if (errors.length > 0) {
                    throw new AggregateError(errors);
                }
                return;
            }
        case "array":
            {
                let slugInfo;
                if (schema.slugField !== undefined && schema.element.kind === "object") {
                    const innerSchema = schema.element.fields;
                    const { slugField } = schema;
                    slugInfo = {
                        slugField,
                        slugs: value.map((val)=>getSlugFromState({
                                schema: innerSchema,
                                slugField
                            }, val))
                    };
                }
                const errors = [];
                const val = value;
                const error = validateArrayLength(schema, value, path);
                if (error !== undefined) {
                    errors.push(error);
                }
                for (const [idx, innerVal] of val.entries()){
                    try {
                        validateValueWithSchema(schema.element, innerVal, slugInfo === undefined ? undefined : {
                            field: slugInfo.slugField,
                            slugs: new Set(slugInfo.slugs.filter((_, i)=>idx !== i)),
                            glob: "*"
                        }, path.concat(idx));
                    } catch (err) {
                        errors.push(err);
                    }
                }
                if (errors.length > 0) {
                    throw new AggregateError(errors);
                }
                return;
            }
    }
}


;// CONCATENATED MODULE: ../node_modules/js-yaml/dist/js-yaml.mjs
/*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */ function isNothing(subject) {
    return typeof subject === "undefined" || subject === null;
}
function isObject(subject) {
    return typeof subject === "object" && subject !== null;
}
function toArray(sequence) {
    if (Array.isArray(sequence)) return sequence;
    else if (isNothing(sequence)) return [];
    return [
        sequence
    ];
}
function extend(target, source) {
    var index, length, key, sourceKeys;
    if (source) {
        sourceKeys = Object.keys(source);
        for(index = 0, length = sourceKeys.length; index < length; index += 1){
            key = sourceKeys[index];
            target[key] = source[key];
        }
    }
    return target;
}
function repeat(string, count) {
    var result = "", cycle;
    for(cycle = 0; cycle < count; cycle += 1){
        result += string;
    }
    return result;
}
function isNegativeZero(number) {
    return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
}
var isNothing_1 = isNothing;
var isObject_1 = isObject;
var toArray_1 = toArray;
var repeat_1 = repeat;
var isNegativeZero_1 = isNegativeZero;
var extend_1 = extend;
var common = {
    isNothing: isNothing_1,
    isObject: isObject_1,
    toArray: toArray_1,
    repeat: repeat_1,
    isNegativeZero: isNegativeZero_1,
    extend: extend_1
};
// YAML error class. http://stackoverflow.com/questions/8458984
function formatError(exception, compact) {
    var where = "", message = exception.reason || "(unknown reason)";
    if (!exception.mark) return message;
    if (exception.mark.name) {
        where += 'in "' + exception.mark.name + '" ';
    }
    where += "(" + (exception.mark.line + 1) + ":" + (exception.mark.column + 1) + ")";
    if (!compact && exception.mark.snippet) {
        where += "\n\n" + exception.mark.snippet;
    }
    return message + " " + where;
}
function YAMLException$1(reason, mark) {
    // Super constructor
    Error.call(this);
    this.name = "YAMLException";
    this.reason = reason;
    this.mark = mark;
    this.message = formatError(this, false);
    // Include stack trace in error object
    if (Error.captureStackTrace) {
        // Chrome and NodeJS
        Error.captureStackTrace(this, this.constructor);
    } else {
        // FF, IE 10+ and Safari 6+. Fallback for others
        this.stack = new Error().stack || "";
    }
}
// Inherit from Error
YAMLException$1.prototype = Object.create(Error.prototype);
YAMLException$1.prototype.constructor = YAMLException$1;
YAMLException$1.prototype.toString = function toString(compact) {
    return this.name + ": " + formatError(this, compact);
};
var exception = YAMLException$1;
// get snippet for a single line, respecting maxLength
function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
    var head = "";
    var tail = "";
    var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
    if (position - lineStart > maxHalfLength) {
        head = " ... ";
        lineStart = position - maxHalfLength + head.length;
    }
    if (lineEnd - position > maxHalfLength) {
        tail = " ...";
        lineEnd = position + maxHalfLength - tail.length;
    }
    return {
        str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "→") + tail,
        pos: position - lineStart + head.length // relative position
    };
}
function padStart(string, max) {
    return common.repeat(" ", max - string.length) + string;
}
function makeSnippet(mark, options) {
    options = Object.create(options || null);
    if (!mark.buffer) return null;
    if (!options.maxLength) options.maxLength = 79;
    if (typeof options.indent !== "number") options.indent = 1;
    if (typeof options.linesBefore !== "number") options.linesBefore = 3;
    if (typeof options.linesAfter !== "number") options.linesAfter = 2;
    var re = /\r?\n|\r|\0/g;
    var lineStarts = [
        0
    ];
    var lineEnds = [];
    var match;
    var foundLineNo = -1;
    while(match = re.exec(mark.buffer)){
        lineEnds.push(match.index);
        lineStarts.push(match.index + match[0].length);
        if (mark.position <= match.index && foundLineNo < 0) {
            foundLineNo = lineStarts.length - 2;
        }
    }
    if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
    var result = "", i, line;
    var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
    var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
    for(i = 1; i <= options.linesBefore; i++){
        if (foundLineNo - i < 0) break;
        line = getLine(mark.buffer, lineStarts[foundLineNo - i], lineEnds[foundLineNo - i], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]), maxLineLength);
        result = common.repeat(" ", options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
    }
    line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
    result += common.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
    result += common.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^" + "\n";
    for(i = 1; i <= options.linesAfter; i++){
        if (foundLineNo + i >= lineEnds.length) break;
        line = getLine(mark.buffer, lineStarts[foundLineNo + i], lineEnds[foundLineNo + i], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]), maxLineLength);
        result += common.repeat(" ", options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + " | " + line.str + "\n";
    }
    return result.replace(/\n$/, "");
}
var snippet = makeSnippet;
var TYPE_CONSTRUCTOR_OPTIONS = [
    "kind",
    "multi",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "representName",
    "defaultStyle",
    "styleAliases"
];
var YAML_NODE_KINDS = [
    "scalar",
    "sequence",
    "mapping"
];
function compileStyleAliases(map) {
    var result = {};
    if (map !== null) {
        Object.keys(map).forEach(function(style) {
            map[style].forEach(function(alias) {
                result[String(alias)] = style;
            });
        });
    }
    return result;
}
function Type$1(tag, options) {
    options = options || {};
    Object.keys(options).forEach(function(name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
            throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
        }
    });
    // TODO: Add tag format check.
    this.options = options; // keep original options in case user wants to extend this type later
    this.tag = tag;
    this.kind = options["kind"] || null;
    this.resolve = options["resolve"] || function() {
        return true;
    };
    this.construct = options["construct"] || function(data) {
        return data;
    };
    this.instanceOf = options["instanceOf"] || null;
    this.predicate = options["predicate"] || null;
    this.represent = options["represent"] || null;
    this.representName = options["representName"] || null;
    this.defaultStyle = options["defaultStyle"] || null;
    this.multi = options["multi"] || false;
    this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
    if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
    }
}
var type = Type$1;
/*eslint-disable max-len*/ function compileList(schema, name) {
    var result = [];
    schema[name].forEach(function(currentType) {
        var newIndex = result.length;
        result.forEach(function(previousType, previousIndex) {
            if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
                newIndex = previousIndex;
            }
        });
        result[newIndex] = currentType;
    });
    return result;
}
function compileMap() {
    var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {},
        multi: {
            scalar: [],
            sequence: [],
            mapping: [],
            fallback: []
        }
    }, index, length;
    function collectType(type) {
        if (type.multi) {
            result.multi[type.kind].push(type);
            result.multi["fallback"].push(type);
        } else {
            result[type.kind][type.tag] = result["fallback"][type.tag] = type;
        }
    }
    for(index = 0, length = arguments.length; index < length; index += 1){
        arguments[index].forEach(collectType);
    }
    return result;
}
function Schema$1(definition) {
    return this.extend(definition);
}
Schema$1.prototype.extend = function extend(definition) {
    var implicit = [];
    var explicit = [];
    if (definition instanceof type) {
        // Schema.extend(type)
        explicit.push(definition);
    } else if (Array.isArray(definition)) {
        // Schema.extend([ type1, type2, ... ])
        explicit = explicit.concat(definition);
    } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
        // Schema.extend({ explicit: [ type1, type2, ... ], implicit: [ type1, type2, ... ] })
        if (definition.implicit) implicit = implicit.concat(definition.implicit);
        if (definition.explicit) explicit = explicit.concat(definition.explicit);
    } else {
        throw new exception("Schema.extend argument should be a Type, [ Type ], " + "or a schema definition ({ implicit: [...], explicit: [...] })");
    }
    implicit.forEach(function(type$1) {
        if (!(type$1 instanceof type)) {
            throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
        }
        if (type$1.loadKind && type$1.loadKind !== "scalar") {
            throw new exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
        }
        if (type$1.multi) {
            throw new exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
        }
    });
    explicit.forEach(function(type$1) {
        if (!(type$1 instanceof type)) {
            throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
        }
    });
    var result = Object.create(Schema$1.prototype);
    result.implicit = (this.implicit || []).concat(implicit);
    result.explicit = (this.explicit || []).concat(explicit);
    result.compiledImplicit = compileList(result, "implicit");
    result.compiledExplicit = compileList(result, "explicit");
    result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
    return result;
};
var schema = Schema$1;
var str = new type("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(data) {
        return data !== null ? data : "";
    }
});
var seq = new type("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(data) {
        return data !== null ? data : [];
    }
});
var map = new type("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(data) {
        return data !== null ? data : {};
    }
});
var failsafe = new schema({
    explicit: [
        str,
        seq,
        map
    ]
});
function resolveYamlNull(data) {
    if (data === null) return true;
    var max = data.length;
    return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
}
function constructYamlNull() {
    return null;
}
function isNull(object) {
    return object === null;
}
var _null = new type("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: resolveYamlNull,
    construct: constructYamlNull,
    predicate: isNull,
    represent: {
        canonical: function() {
            return "~";
        },
        lowercase: function() {
            return "null";
        },
        uppercase: function() {
            return "NULL";
        },
        camelcase: function() {
            return "Null";
        },
        empty: function() {
            return "";
        }
    },
    defaultStyle: "lowercase"
});
function resolveYamlBoolean(data) {
    if (data === null) return false;
    var max = data.length;
    return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
}
function constructYamlBoolean(data) {
    return data === "true" || data === "True" || data === "TRUE";
}
function isBoolean(object) {
    return Object.prototype.toString.call(object) === "[object Boolean]";
}
var bool = new type("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: resolveYamlBoolean,
    construct: constructYamlBoolean,
    predicate: isBoolean,
    represent: {
        lowercase: function(object) {
            return object ? "true" : "false";
        },
        uppercase: function(object) {
            return object ? "TRUE" : "FALSE";
        },
        camelcase: function(object) {
            return object ? "True" : "False";
        }
    },
    defaultStyle: "lowercase"
});
function isHexCode(c) {
    return 0x30 /* 0 */  <= c && c <= 0x39 /* 9 */  || 0x41 /* A */  <= c && c <= 0x46 /* F */  || 0x61 /* a */  <= c && c <= 0x66 /* f */ ;
}
function isOctCode(c) {
    return 0x30 /* 0 */  <= c && c <= 0x37 /* 7 */ ;
}
function isDecCode(c) {
    return 0x30 /* 0 */  <= c && c <= 0x39 /* 9 */ ;
}
function resolveYamlInteger(data) {
    if (data === null) return false;
    var max = data.length, index = 0, hasDigits = false, ch;
    if (!max) return false;
    ch = data[index];
    // sign
    if (ch === "-" || ch === "+") {
        ch = data[++index];
    }
    if (ch === "0") {
        // 0
        if (index + 1 === max) return true;
        ch = data[++index];
        // base 2, base 8, base 16
        if (ch === "b") {
            // base 2
            index++;
            for(; index < max; index++){
                ch = data[index];
                if (ch === "_") continue;
                if (ch !== "0" && ch !== "1") return false;
                hasDigits = true;
            }
            return hasDigits && ch !== "_";
        }
        if (ch === "x") {
            // base 16
            index++;
            for(; index < max; index++){
                ch = data[index];
                if (ch === "_") continue;
                if (!isHexCode(data.charCodeAt(index))) return false;
                hasDigits = true;
            }
            return hasDigits && ch !== "_";
        }
        if (ch === "o") {
            // base 8
            index++;
            for(; index < max; index++){
                ch = data[index];
                if (ch === "_") continue;
                if (!isOctCode(data.charCodeAt(index))) return false;
                hasDigits = true;
            }
            return hasDigits && ch !== "_";
        }
    }
    // base 10 (except 0)
    // value should not start with `_`;
    if (ch === "_") return false;
    for(; index < max; index++){
        ch = data[index];
        if (ch === "_") continue;
        if (!isDecCode(data.charCodeAt(index))) {
            return false;
        }
        hasDigits = true;
    }
    // Should have digits and should not end with `_`
    if (!hasDigits || ch === "_") return false;
    return true;
}
function constructYamlInteger(data) {
    var value = data, sign = 1, ch;
    if (value.indexOf("_") !== -1) {
        value = value.replace(/_/g, "");
    }
    ch = value[0];
    if (ch === "-" || ch === "+") {
        if (ch === "-") sign = -1;
        value = value.slice(1);
        ch = value[0];
    }
    if (value === "0") return 0;
    if (ch === "0") {
        if (value[1] === "b") return sign * parseInt(value.slice(2), 2);
        if (value[1] === "x") return sign * parseInt(value.slice(2), 16);
        if (value[1] === "o") return sign * parseInt(value.slice(2), 8);
    }
    return sign * parseInt(value, 10);
}
function isInteger(object) {
    return Object.prototype.toString.call(object) === "[object Number]" && object % 1 === 0 && !common.isNegativeZero(object);
}
var js_yaml_int = new type("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: resolveYamlInteger,
    construct: constructYamlInteger,
    predicate: isInteger,
    represent: {
        binary: function(obj) {
            return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
        },
        octal: function(obj) {
            return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
        },
        decimal: function(obj) {
            return obj.toString(10);
        },
        /* eslint-disable max-len */ hexadecimal: function(obj) {
            return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
        }
    },
    defaultStyle: "decimal",
    styleAliases: {
        binary: [
            2,
            "bin"
        ],
        octal: [
            8,
            "oct"
        ],
        decimal: [
            10,
            "dec"
        ],
        hexadecimal: [
            16,
            "hex"
        ]
    }
});
var YAML_FLOAT_PATTERN = new RegExp(// 2.5e4, 2.5 and integers
"^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?" + // .2e4, .2
// special case, seems not from spec
"|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?" + // .inf
"|[-+]?\\.(?:inf|Inf|INF)" + // .nan
"|\\.(?:nan|NaN|NAN))$");
function resolveYamlFloat(data) {
    if (data === null) return false;
    if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    data[data.length - 1] === "_") {
        return false;
    }
    return true;
}
function constructYamlFloat(data) {
    var value, sign;
    value = data.replace(/_/g, "").toLowerCase();
    sign = value[0] === "-" ? -1 : 1;
    if ("+-".indexOf(value[0]) >= 0) {
        value = value.slice(1);
    }
    if (value === ".inf") {
        return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    } else if (value === ".nan") {
        return NaN;
    }
    return sign * parseFloat(value, 10);
}
var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
function representYamlFloat(object, style) {
    var res;
    if (isNaN(object)) {
        switch(style){
            case "lowercase":
                return ".nan";
            case "uppercase":
                return ".NAN";
            case "camelcase":
                return ".NaN";
        }
    } else if (Number.POSITIVE_INFINITY === object) {
        switch(style){
            case "lowercase":
                return ".inf";
            case "uppercase":
                return ".INF";
            case "camelcase":
                return ".Inf";
        }
    } else if (Number.NEGATIVE_INFINITY === object) {
        switch(style){
            case "lowercase":
                return "-.inf";
            case "uppercase":
                return "-.INF";
            case "camelcase":
                return "-.Inf";
        }
    } else if (common.isNegativeZero(object)) {
        return "-0.0";
    }
    res = object.toString(10);
    // JS stringifier can build scientific format without dots: 5e-100,
    // while YAML requres dot: 5.e-100. Fix it with simple hack
    return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
}
function isFloat(object) {
    return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
}
var js_yaml_float = new type("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: resolveYamlFloat,
    construct: constructYamlFloat,
    predicate: isFloat,
    represent: representYamlFloat,
    defaultStyle: "lowercase"
});
var json = failsafe.extend({
    implicit: [
        _null,
        bool,
        js_yaml_int,
        js_yaml_float
    ]
});
var core = json;
var YAML_DATE_REGEXP = new RegExp("^([0-9][0-9][0-9][0-9])" + // [1] year
"-([0-9][0-9])" + // [2] month
"-([0-9][0-9])$"); // [3] day
var YAML_TIMESTAMP_REGEXP = new RegExp("^([0-9][0-9][0-9][0-9])" + // [1] year
"-([0-9][0-9]?)" + // [2] month
"-([0-9][0-9]?)" + // [3] day
"(?:[Tt]|[ \\t]+)" + // ...
"([0-9][0-9]?)" + // [4] hour
":([0-9][0-9])" + // [5] minute
":([0-9][0-9])" + // [6] second
"(?:\\.([0-9]*))?" + // [7] fraction
"(?:[ \\t]*(Z|([-+])([0-9][0-9]?)" + // [8] tz [9] tz_sign [10] tz_hour
"(?::([0-9][0-9]))?))?$"); // [11] tz_minute
function resolveYamlTimestamp(data) {
    if (data === null) return false;
    if (YAML_DATE_REGEXP.exec(data) !== null) return true;
    if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
    return false;
}
function constructYamlTimestamp(data) {
    var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
    match = YAML_DATE_REGEXP.exec(data);
    if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
    if (match === null) throw new Error("Date resolve error");
    // match: [1] year [2] month [3] day
    year = +match[1];
    month = +match[2] - 1; // JS month starts with 0
    day = +match[3];
    if (!match[4]) {
        return new Date(Date.UTC(year, month, day));
    }
    // match: [4] hour [5] minute [6] second [7] fraction
    hour = +match[4];
    minute = +match[5];
    second = +match[6];
    if (match[7]) {
        fraction = match[7].slice(0, 3);
        while(fraction.length < 3){
            fraction += "0";
        }
        fraction = +fraction;
    }
    // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute
    if (match[9]) {
        tz_hour = +match[10];
        tz_minute = +(match[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
        if (match[9] === "-") delta = -delta;
    }
    date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
    if (delta) date.setTime(date.getTime() - delta);
    return date;
}
function representYamlTimestamp(object /*, style*/ ) {
    return object.toISOString();
}
var timestamp = new type("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: resolveYamlTimestamp,
    construct: constructYamlTimestamp,
    instanceOf: Date,
    represent: representYamlTimestamp
});
function resolveYamlMerge(data) {
    return data === "<<" || data === null;
}
var merge = new type("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: resolveYamlMerge
});
/*eslint-disable no-bitwise*/ // [ 64, 65, 66 ] -> [ padding, CR, LF ]
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function resolveYamlBinary(data) {
    if (data === null) return false;
    var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
    // Convert one by one.
    for(idx = 0; idx < max; idx++){
        code = map.indexOf(data.charAt(idx));
        // Skip CR/LF
        if (code > 64) continue;
        // Fail on illegal characters
        if (code < 0) return false;
        bitlen += 6;
    }
    // If there are any bits left, source was corrupted
    return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
    var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map = BASE64_MAP, bits = 0, result = [];
    // Collect by 6*4 bits (3 bytes)
    for(idx = 0; idx < max; idx++){
        if (idx % 4 === 0 && idx) {
            result.push(bits >> 16 & 0xFF);
            result.push(bits >> 8 & 0xFF);
            result.push(bits & 0xFF);
        }
        bits = bits << 6 | map.indexOf(input.charAt(idx));
    }
    // Dump tail
    tailbits = max % 4 * 6;
    if (tailbits === 0) {
        result.push(bits >> 16 & 0xFF);
        result.push(bits >> 8 & 0xFF);
        result.push(bits & 0xFF);
    } else if (tailbits === 18) {
        result.push(bits >> 10 & 0xFF);
        result.push(bits >> 2 & 0xFF);
    } else if (tailbits === 12) {
        result.push(bits >> 4 & 0xFF);
    }
    return new Uint8Array(result);
}
function representYamlBinary(object /*, style*/ ) {
    var result = "", bits = 0, idx, tail, max = object.length, map = BASE64_MAP;
    // Convert every three bytes to 4 ASCII characters.
    for(idx = 0; idx < max; idx++){
        if (idx % 3 === 0 && idx) {
            result += map[bits >> 18 & 0x3F];
            result += map[bits >> 12 & 0x3F];
            result += map[bits >> 6 & 0x3F];
            result += map[bits & 0x3F];
        }
        bits = (bits << 8) + object[idx];
    }
    // Dump tail
    tail = max % 3;
    if (tail === 0) {
        result += map[bits >> 18 & 0x3F];
        result += map[bits >> 12 & 0x3F];
        result += map[bits >> 6 & 0x3F];
        result += map[bits & 0x3F];
    } else if (tail === 2) {
        result += map[bits >> 10 & 0x3F];
        result += map[bits >> 4 & 0x3F];
        result += map[bits << 2 & 0x3F];
        result += map[64];
    } else if (tail === 1) {
        result += map[bits >> 2 & 0x3F];
        result += map[bits << 4 & 0x3F];
        result += map[64];
        result += map[64];
    }
    return result;
}
function isBinary(obj) {
    return Object.prototype.toString.call(obj) === "[object Uint8Array]";
}
var binary = new type("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: resolveYamlBinary,
    construct: constructYamlBinary,
    predicate: isBinary,
    represent: representYamlBinary
});
var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
var _toString$2 = Object.prototype.toString;
function resolveYamlOmap(data) {
    if (data === null) return true;
    var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
    for(index = 0, length = object.length; index < length; index += 1){
        pair = object[index];
        pairHasKey = false;
        if (_toString$2.call(pair) !== "[object Object]") return false;
        for(pairKey in pair){
            if (_hasOwnProperty$3.call(pair, pairKey)) {
                if (!pairHasKey) pairHasKey = true;
                else return false;
            }
        }
        if (!pairHasKey) return false;
        if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
        else return false;
    }
    return true;
}
function constructYamlOmap(data) {
    return data !== null ? data : [];
}
var omap = new type("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: resolveYamlOmap,
    construct: constructYamlOmap
});
var _toString$1 = Object.prototype.toString;
function resolveYamlPairs(data) {
    if (data === null) return true;
    var index, length, pair, keys, result, object = data;
    result = new Array(object.length);
    for(index = 0, length = object.length; index < length; index += 1){
        pair = object[index];
        if (_toString$1.call(pair) !== "[object Object]") return false;
        keys = Object.keys(pair);
        if (keys.length !== 1) return false;
        result[index] = [
            keys[0],
            pair[keys[0]]
        ];
    }
    return true;
}
function constructYamlPairs(data) {
    if (data === null) return [];
    var index, length, pair, keys, result, object = data;
    result = new Array(object.length);
    for(index = 0, length = object.length; index < length; index += 1){
        pair = object[index];
        keys = Object.keys(pair);
        result[index] = [
            keys[0],
            pair[keys[0]]
        ];
    }
    return result;
}
var pairs = new type("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: resolveYamlPairs,
    construct: constructYamlPairs
});
var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
    if (data === null) return true;
    var key, object = data;
    for(key in object){
        if (_hasOwnProperty$2.call(object, key)) {
            if (object[key] !== null) return false;
        }
    }
    return true;
}
function constructYamlSet(data) {
    return data !== null ? data : {};
}
var set = new type("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: resolveYamlSet,
    construct: constructYamlSet
});
var _default = core.extend({
    implicit: [
        timestamp,
        merge
    ],
    explicit: [
        binary,
        omap,
        pairs,
        set
    ]
});
/*eslint-disable max-len,no-use-before-define*/ var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
var CONTEXT_FLOW_IN = 1;
var CONTEXT_FLOW_OUT = 2;
var CONTEXT_BLOCK_IN = 3;
var CONTEXT_BLOCK_OUT = 4;
var CHOMPING_CLIP = 1;
var CHOMPING_STRIP = 2;
var CHOMPING_KEEP = 3;
var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function _class(obj) {
    return Object.prototype.toString.call(obj);
}
function is_EOL(c) {
    return c === 0x0A /* LF */  || c === 0x0D /* CR */ ;
}
function is_WHITE_SPACE(c) {
    return c === 0x09 /* Tab */  || c === 0x20 /* Space */ ;
}
function is_WS_OR_EOL(c) {
    return c === 0x09 /* Tab */  || c === 0x20 /* Space */  || c === 0x0A /* LF */  || c === 0x0D /* CR */ ;
}
function is_FLOW_INDICATOR(c) {
    return c === 0x2C /* , */  || c === 0x5B /* [ */  || c === 0x5D /* ] */  || c === 0x7B /* { */  || c === 0x7D /* } */ ;
}
function fromHexCode(c) {
    var lc;
    if (0x30 /* 0 */  <= c && c <= 0x39 /* 9 */ ) {
        return c - 0x30;
    }
    /*eslint-disable no-bitwise*/ lc = c | 0x20;
    if (0x61 /* a */  <= lc && lc <= 0x66 /* f */ ) {
        return lc - 0x61 + 10;
    }
    return -1;
}
function escapedHexLen(c) {
    if (c === 0x78 /* x */ ) {
        return 2;
    }
    if (c === 0x75 /* u */ ) {
        return 4;
    }
    if (c === 0x55 /* U */ ) {
        return 8;
    }
    return 0;
}
function fromDecimalCode(c) {
    if (0x30 /* 0 */  <= c && c <= 0x39 /* 9 */ ) {
        return c - 0x30;
    }
    return -1;
}
function simpleEscapeSequence(c) {
    /* eslint-disable indent */ return c === 0x30 /* 0 */  ? "\x00" : c === 0x61 /* a */  ? "\x07" : c === 0x62 /* b */  ? "\b" : c === 0x74 /* t */  ? "	" : c === 0x09 /* Tab */  ? "	" : c === 0x6E /* n */  ? "\n" : c === 0x76 /* v */  ? "\v" : c === 0x66 /* f */  ? "\f" : c === 0x72 /* r */  ? "\r" : c === 0x65 /* e */  ? "\x1b" : c === 0x20 /* Space */  ? " " : c === 0x22 /* " */  ? '"' : c === 0x2F /* / */  ? "/" : c === 0x5C /* \ */  ? "\\" : c === 0x4E /* N */  ? "\x85" : c === 0x5F /* _ */  ? "\xa0" : c === 0x4C /* L */  ? "\u2028" : c === 0x50 /* P */  ? "\u2029" : "";
}
function charFromCodepoint(c) {
    if (c <= 0xFFFF) {
        return String.fromCharCode(c);
    }
    // Encode UTF-16 surrogate pair
    // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
    return String.fromCharCode((c - 0x010000 >> 10) + 0xD800, (c - 0x010000 & 0x03FF) + 0xDC00);
}
var simpleEscapeCheck = new Array(256); // integer, for fast access
var simpleEscapeMap = new Array(256);
for(var i = 0; i < 256; i++){
    simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
    simpleEscapeMap[i] = simpleEscapeSequence(i);
}
function State$1(input, options) {
    this.input = input;
    this.filename = options["filename"] || null;
    this.schema = options["schema"] || _default;
    this.onWarning = options["onWarning"] || null;
    // (Hidden) Remove? makes the loader to expect YAML 1.1 documents
    // if such documents have no explicit %YAML directive
    this.legacy = options["legacy"] || false;
    this.json = options["json"] || false;
    this.listener = options["listener"] || null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.typeMap = this.schema.compiledTypeMap;
    this.length = input.length;
    this.position = 0;
    this.line = 0;
    this.lineStart = 0;
    this.lineIndent = 0;
    // position of first leading tab in the current line,
    // used to make sure there are no tabs in the indentation
    this.firstTabInLine = -1;
    this.documents = [];
/*
  this.version;
  this.checkLineBreaks;
  this.tagMap;
  this.anchorMap;
  this.tag;
  this.anchor;
  this.kind;
  this.result;*/ }
function generateError(state, message) {
    var mark = {
        name: state.filename,
        buffer: state.input.slice(0, -1),
        position: state.position,
        line: state.line,
        column: state.position - state.lineStart
    };
    mark.snippet = snippet(mark);
    return new exception(message, mark);
}
function throwError(state, message) {
    throw generateError(state, message);
}
function throwWarning(state, message) {
    if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message));
    }
}
var directiveHandlers = {
    YAML: function handleYamlDirective(state, name, args) {
        var match, major, minor;
        if (state.version !== null) {
            throwError(state, "duplication of %YAML directive");
        }
        if (args.length !== 1) {
            throwError(state, "YAML directive accepts exactly one argument");
        }
        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match === null) {
            throwError(state, "ill-formed argument of the YAML directive");
        }
        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);
        if (major !== 1) {
            throwError(state, "unacceptable YAML version of the document");
        }
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) {
            throwWarning(state, "unsupported YAML version of the document");
        }
    },
    TAG: function handleTagDirective(state, name, args) {
        var handle, prefix;
        if (args.length !== 2) {
            throwError(state, "TAG directive accepts exactly two arguments");
        }
        handle = args[0];
        prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
            throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
        }
        if (_hasOwnProperty$1.call(state.tagMap, handle)) {
            throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
            throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
        }
        try {
            prefix = decodeURIComponent(prefix);
        } catch (err) {
            throwError(state, "tag prefix is malformed: " + prefix);
        }
        state.tagMap[handle] = prefix;
    }
};
function captureSegment(state, start, end, checkJson) {
    var _position, _length, _character, _result;
    if (start < end) {
        _result = state.input.slice(start, end);
        if (checkJson) {
            for(_position = 0, _length = _result.length; _position < _length; _position += 1){
                _character = _result.charCodeAt(_position);
                if (!(_character === 0x09 || 0x20 <= _character && _character <= 0x10FFFF)) {
                    throwError(state, "expected valid JSON character");
                }
            }
        } else if (PATTERN_NON_PRINTABLE.test(_result)) {
            throwError(state, "the stream contains non-printable characters");
        }
        state.result += _result;
    }
}
function mergeMappings(state, destination, source, overridableKeys) {
    var sourceKeys, key, index, quantity;
    if (!common.isObject(source)) {
        throwError(state, "cannot merge mappings; the provided source object is unacceptable");
    }
    sourceKeys = Object.keys(source);
    for(index = 0, quantity = sourceKeys.length; index < quantity; index += 1){
        key = sourceKeys[index];
        if (!_hasOwnProperty$1.call(destination, key)) {
            destination[key] = source[key];
            overridableKeys[key] = true;
        }
    }
}
function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
    var index, quantity;
    // The output is a plain object here, so keys can only be strings.
    // We need to convert keyNode to a string, but doing so can hang the process
    // (deeply nested arrays that explode exponentially using aliases).
    if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
        for(index = 0, quantity = keyNode.length; index < quantity; index += 1){
            if (Array.isArray(keyNode[index])) {
                throwError(state, "nested arrays are not supported inside keys");
            }
            if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
                keyNode[index] = "[object Object]";
            }
        }
    }
    // Avoid code execution in load() via toString property
    // (still use its own toString for arrays, timestamps,
    // and whatever user schema extensions happen to have @@toStringTag)
    if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
        keyNode = "[object Object]";
    }
    keyNode = String(keyNode);
    if (_result === null) {
        _result = {};
    }
    if (keyTag === "tag:yaml.org,2002:merge") {
        if (Array.isArray(valueNode)) {
            for(index = 0, quantity = valueNode.length; index < quantity; index += 1){
                mergeMappings(state, _result, valueNode[index], overridableKeys);
            }
        } else {
            mergeMappings(state, _result, valueNode, overridableKeys);
        }
    } else {
        if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
            state.line = startLine || state.line;
            state.lineStart = startLineStart || state.lineStart;
            state.position = startPos || state.position;
            throwError(state, "duplicated mapping key");
        }
        // used for this specific key only because Object.defineProperty is slow
        if (keyNode === "__proto__") {
            Object.defineProperty(_result, keyNode, {
                configurable: true,
                enumerable: true,
                writable: true,
                value: valueNode
            });
        } else {
            _result[keyNode] = valueNode;
        }
        delete overridableKeys[keyNode];
    }
    return _result;
}
function readLineBreak(state) {
    var ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x0A /* LF */ ) {
        state.position++;
    } else if (ch === 0x0D /* CR */ ) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 0x0A /* LF */ ) {
            state.position++;
        }
    } else {
        throwError(state, "a line break is expected");
    }
    state.line += 1;
    state.lineStart = state.position;
    state.firstTabInLine = -1;
}
function skipSeparationSpace(state, allowComments, checkIndent) {
    var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
    while(ch !== 0){
        while(is_WHITE_SPACE(ch)){
            if (ch === 0x09 /* Tab */  && state.firstTabInLine === -1) {
                state.firstTabInLine = state.position;
            }
            ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && ch === 0x23 /* # */ ) {
            do {
                ch = state.input.charCodeAt(++state.position);
            }while (ch !== 0x0A /* LF */  && ch !== 0x0D /* CR */  && ch !== 0);
        }
        if (is_EOL(ch)) {
            readLineBreak(state);
            ch = state.input.charCodeAt(state.position);
            lineBreaks++;
            state.lineIndent = 0;
            while(ch === 0x20 /* Space */ ){
                state.lineIndent++;
                ch = state.input.charCodeAt(++state.position);
            }
        } else {
            break;
        }
    }
    if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
        throwWarning(state, "deficient indentation");
    }
    return lineBreaks;
}
function testDocumentSeparator(state) {
    var _position = state.position, ch;
    ch = state.input.charCodeAt(_position);
    // Condition state.position === state.lineStart is tested
    // in parent on each call, for efficiency. No needs to test here again.
    if ((ch === 0x2D /* - */  || ch === 0x2E /* . */ ) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || is_WS_OR_EOL(ch)) {
            return true;
        }
    }
    return false;
}
function writeFoldedLines(state, count) {
    if (count === 1) {
        state.result += " ";
    } else if (count > 1) {
        state.result += common.repeat("\n", count - 1);
    }
}
function readPlainScalar(state, nodeIndent, withinFlowCollection) {
    var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
    ch = state.input.charCodeAt(state.position);
    if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 0x23 /* # */  || ch === 0x26 /* & */  || ch === 0x2A /* * */  || ch === 0x21 /* ! */  || ch === 0x7C /* | */  || ch === 0x3E /* > */  || ch === 0x27 /* ' */  || ch === 0x22 /* " */  || ch === 0x25 /* % */  || ch === 0x40 /* @ */  || ch === 0x60 /* ` */ ) {
        return false;
    }
    if (ch === 0x3F /* ? */  || ch === 0x2D /* - */ ) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
            return false;
        }
    }
    state.kind = "scalar";
    state.result = "";
    captureStart = captureEnd = state.position;
    hasPendingContent = false;
    while(ch !== 0){
        if (ch === 0x3A /* : */ ) {
            following = state.input.charCodeAt(state.position + 1);
            if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
                break;
            }
        } else if (ch === 0x23 /* # */ ) {
            preceding = state.input.charCodeAt(state.position - 1);
            if (is_WS_OR_EOL(preceding)) {
                break;
            }
        } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
            break;
        } else if (is_EOL(ch)) {
            _line = state.line;
            _lineStart = state.lineStart;
            _lineIndent = state.lineIndent;
            skipSeparationSpace(state, false, -1);
            if (state.lineIndent >= nodeIndent) {
                hasPendingContent = true;
                ch = state.input.charCodeAt(state.position);
                continue;
            } else {
                state.position = captureEnd;
                state.line = _line;
                state.lineStart = _lineStart;
                state.lineIndent = _lineIndent;
                break;
            }
        }
        if (hasPendingContent) {
            captureSegment(state, captureStart, captureEnd, false);
            writeFoldedLines(state, state.line - _line);
            captureStart = captureEnd = state.position;
            hasPendingContent = false;
        }
        if (!is_WHITE_SPACE(ch)) {
            captureEnd = state.position + 1;
        }
        ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, captureEnd, false);
    if (state.result) {
        return true;
    }
    state.kind = _kind;
    state.result = _result;
    return false;
}
function readSingleQuotedScalar(state, nodeIndent) {
    var ch, captureStart, captureEnd;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x27 /* ' */ ) {
        return false;
    }
    state.kind = "scalar";
    state.result = "";
    state.position++;
    captureStart = captureEnd = state.position;
    while((ch = state.input.charCodeAt(state.position)) !== 0){
        if (ch === 0x27 /* ' */ ) {
            captureSegment(state, captureStart, state.position, true);
            ch = state.input.charCodeAt(++state.position);
            if (ch === 0x27 /* ' */ ) {
                captureStart = state.position;
                state.position++;
                captureEnd = state.position;
            } else {
                return true;
            }
        } else if (is_EOL(ch)) {
            captureSegment(state, captureStart, captureEnd, true);
            writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
            captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
            throwError(state, "unexpected end of the document within a single quoted scalar");
        } else {
            state.position++;
            captureEnd = state.position;
        }
    }
    throwError(state, "unexpected end of the stream within a single quoted scalar");
}
function readDoubleQuotedScalar(state, nodeIndent) {
    var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x22 /* " */ ) {
        return false;
    }
    state.kind = "scalar";
    state.result = "";
    state.position++;
    captureStart = captureEnd = state.position;
    while((ch = state.input.charCodeAt(state.position)) !== 0){
        if (ch === 0x22 /* " */ ) {
            captureSegment(state, captureStart, state.position, true);
            state.position++;
            return true;
        } else if (ch === 0x5C /* \ */ ) {
            captureSegment(state, captureStart, state.position, true);
            ch = state.input.charCodeAt(++state.position);
            if (is_EOL(ch)) {
                skipSeparationSpace(state, false, nodeIndent);
            // TODO: rework to inline fn with no type cast?
            } else if (ch < 256 && simpleEscapeCheck[ch]) {
                state.result += simpleEscapeMap[ch];
                state.position++;
            } else if ((tmp = escapedHexLen(ch)) > 0) {
                hexLength = tmp;
                hexResult = 0;
                for(; hexLength > 0; hexLength--){
                    ch = state.input.charCodeAt(++state.position);
                    if ((tmp = fromHexCode(ch)) >= 0) {
                        hexResult = (hexResult << 4) + tmp;
                    } else {
                        throwError(state, "expected hexadecimal character");
                    }
                }
                state.result += charFromCodepoint(hexResult);
                state.position++;
            } else {
                throwError(state, "unknown escape sequence");
            }
            captureStart = captureEnd = state.position;
        } else if (is_EOL(ch)) {
            captureSegment(state, captureStart, captureEnd, true);
            writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
            captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
            throwError(state, "unexpected end of the document within a double quoted scalar");
        } else {
            state.position++;
            captureEnd = state.position;
        }
    }
    throwError(state, "unexpected end of the stream within a double quoted scalar");
}
function readFlowCollection(state, nodeIndent) {
    var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = Object.create(null), keyNode, keyTag, valueNode, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x5B /* [ */ ) {
        terminator = 0x5D; /* ] */ 
        isMapping = false;
        _result = [];
    } else if (ch === 0x7B /* { */ ) {
        terminator = 0x7D; /* } */ 
        isMapping = true;
        _result = {};
    } else {
        return false;
    }
    if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(++state.position);
    while(ch !== 0){
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
            state.position++;
            state.tag = _tag;
            state.anchor = _anchor;
            state.kind = isMapping ? "mapping" : "sequence";
            state.result = _result;
            return true;
        } else if (!readNext) {
            throwError(state, "missed comma between flow collection entries");
        } else if (ch === 0x2C /* , */ ) {
            // "flow collection entries can never be completely empty", as per YAML 1.2, section 7.4
            throwError(state, "expected the node content, but found ','");
        }
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (ch === 0x3F /* ? */ ) {
            following = state.input.charCodeAt(state.position + 1);
            if (is_WS_OR_EOL(following)) {
                isPair = isExplicitPair = true;
                state.position++;
                skipSeparationSpace(state, true, nodeIndent);
            }
        }
        _line = state.line; // Save the current line.
        _lineStart = state.lineStart;
        _pos = state.position;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === _line) && ch === 0x3A /* : */ ) {
            isPair = true;
            ch = state.input.charCodeAt(++state.position);
            skipSeparationSpace(state, true, nodeIndent);
            composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
            valueNode = state.result;
        }
        if (isMapping) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
        } else if (isPair) {
            _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
        } else {
            _result.push(keyNode);
        }
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === 0x2C /* , */ ) {
            readNext = true;
            ch = state.input.charCodeAt(++state.position);
        } else {
            readNext = false;
        }
    }
    throwError(state, "unexpected end of the stream within a flow collection");
}
function readBlockScalar(state, nodeIndent) {
    var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x7C /* | */ ) {
        folding = false;
    } else if (ch === 0x3E /* > */ ) {
        folding = true;
    } else {
        return false;
    }
    state.kind = "scalar";
    state.result = "";
    while(ch !== 0){
        ch = state.input.charCodeAt(++state.position);
        if (ch === 0x2B /* + */  || ch === 0x2D /* - */ ) {
            if (CHOMPING_CLIP === chomping) {
                chomping = ch === 0x2B /* + */  ? CHOMPING_KEEP : CHOMPING_STRIP;
            } else {
                throwError(state, "repeat of a chomping mode identifier");
            }
        } else if ((tmp = fromDecimalCode(ch)) >= 0) {
            if (tmp === 0) {
                throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
            } else if (!detectedIndent) {
                textIndent = nodeIndent + tmp - 1;
                detectedIndent = true;
            } else {
                throwError(state, "repeat of an indentation width identifier");
            }
        } else {
            break;
        }
    }
    if (is_WHITE_SPACE(ch)) {
        do {
            ch = state.input.charCodeAt(++state.position);
        }while (is_WHITE_SPACE(ch));
        if (ch === 0x23 /* # */ ) {
            do {
                ch = state.input.charCodeAt(++state.position);
            }while (!is_EOL(ch) && ch !== 0);
        }
    }
    while(ch !== 0){
        readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while((!detectedIndent || state.lineIndent < textIndent) && ch === 0x20 /* Space */ ){
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) {
            textIndent = state.lineIndent;
        }
        if (is_EOL(ch)) {
            emptyLines++;
            continue;
        }
        // End of the scalar.
        if (state.lineIndent < textIndent) {
            // Perform the chomping.
            if (chomping === CHOMPING_KEEP) {
                state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
            } else if (chomping === CHOMPING_CLIP) {
                if (didReadContent) {
                    state.result += "\n";
                }
            }
            break;
        }
        // Folded style: use fancy rules to handle line breaks.
        if (folding) {
            // Lines starting with white space characters (more-indented lines) are not folded.
            if (is_WHITE_SPACE(ch)) {
                atMoreIndented = true;
                // except for the first content line (cf. Example 8.1)
                state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
            // End of more-indented block.
            } else if (atMoreIndented) {
                atMoreIndented = false;
                state.result += common.repeat("\n", emptyLines + 1);
            // Just one line break - perceive as the same line.
            } else if (emptyLines === 0) {
                if (didReadContent) {
                    state.result += " ";
                }
            // Several line breaks - perceive as different lines.
            } else {
                state.result += common.repeat("\n", emptyLines);
            }
        // Literal style: just add exact number of line breaks between content lines.
        } else {
            // Keep all line breaks except the header line break.
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        }
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;
        while(!is_EOL(ch) && ch !== 0){
            ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, state.position, false);
    }
    return true;
}
function readBlockSequence(state, nodeIndent) {
    var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
    // there is a leading tab before this token, so it can't be a block sequence/mapping;
    // it can still be flow sequence/mapping or a scalar
    if (state.firstTabInLine !== -1) return false;
    if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(state.position);
    while(ch !== 0){
        if (state.firstTabInLine !== -1) {
            state.position = state.firstTabInLine;
            throwError(state, "tab characters must not be used in indentation");
        }
        if (ch !== 0x2D /* - */ ) {
            break;
        }
        following = state.input.charCodeAt(state.position + 1);
        if (!is_WS_OR_EOL(following)) {
            break;
        }
        detected = true;
        state.position++;
        if (skipSeparationSpace(state, true, -1)) {
            if (state.lineIndent <= nodeIndent) {
                _result.push(null);
                ch = state.input.charCodeAt(state.position);
                continue;
            }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
            throwError(state, "bad indentation of a sequence entry");
        } else if (state.lineIndent < nodeIndent) {
            break;
        }
    }
    if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "sequence";
        state.result = _result;
        return true;
    }
    return false;
}
function readBlockMapping(state, nodeIndent, flowIndent) {
    var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
    // there is a leading tab before this token, so it can't be a block sequence/mapping;
    // it can still be flow sequence/mapping or a scalar
    if (state.firstTabInLine !== -1) return false;
    if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(state.position);
    while(ch !== 0){
        if (!atExplicitKey && state.firstTabInLine !== -1) {
            state.position = state.firstTabInLine;
            throwError(state, "tab characters must not be used in indentation");
        }
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line; // Save the current line.
        //
        // Explicit notation case. There are two separate blocks:
        // first for the key (denoted by "?") and second for the value (denoted by ":")
        //
        if ((ch === 0x3F /* ? */  || ch === 0x3A /* : */ ) && is_WS_OR_EOL(following)) {
            if (ch === 0x3F /* ? */ ) {
                if (atExplicitKey) {
                    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
                    keyTag = keyNode = valueNode = null;
                }
                detected = true;
                atExplicitKey = true;
                allowCompact = true;
            } else if (atExplicitKey) {
                // i.e. 0x3A/* : */ === character after the explicit key.
                atExplicitKey = false;
                allowCompact = true;
            } else {
                throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
            }
            state.position += 1;
            ch = following;
        //
        // Implicit notation case. Flow-style node as the key first, then ":", and the value.
        //
        } else {
            _keyLine = state.line;
            _keyLineStart = state.lineStart;
            _keyPos = state.position;
            if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
                break;
            }
            if (state.line === _line) {
                ch = state.input.charCodeAt(state.position);
                while(is_WHITE_SPACE(ch)){
                    ch = state.input.charCodeAt(++state.position);
                }
                if (ch === 0x3A /* : */ ) {
                    ch = state.input.charCodeAt(++state.position);
                    if (!is_WS_OR_EOL(ch)) {
                        throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
                    }
                    if (atExplicitKey) {
                        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
                        keyTag = keyNode = valueNode = null;
                    }
                    detected = true;
                    atExplicitKey = false;
                    allowCompact = false;
                    keyTag = state.tag;
                    keyNode = state.result;
                } else if (detected) {
                    throwError(state, "can not read an implicit mapping pair; a colon is missed");
                } else {
                    state.tag = _tag;
                    state.anchor = _anchor;
                    return true; // Keep the result of `composeNode`.
                }
            } else if (detected) {
                throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
            } else {
                state.tag = _tag;
                state.anchor = _anchor;
                return true; // Keep the result of `composeNode`.
            }
        }
        //
        // Common reading code for both explicit and implicit notations.
        //
        if (state.line === _line || state.lineIndent > nodeIndent) {
            if (atExplicitKey) {
                _keyLine = state.line;
                _keyLineStart = state.lineStart;
                _keyPos = state.position;
            }
            if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
                if (atExplicitKey) {
                    keyNode = state.result;
                } else {
                    valueNode = state.result;
                }
            }
            if (!atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
                keyTag = keyNode = valueNode = null;
            }
            skipSeparationSpace(state, true, -1);
            ch = state.input.charCodeAt(state.position);
        }
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
            throwError(state, "bad indentation of a mapping entry");
        } else if (state.lineIndent < nodeIndent) {
            break;
        }
    }
    //
    // Epilogue.
    //
    // Special case: last mapping's node contains only the key in explicit notation.
    if (atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
    }
    // Expose the resulting mapping.
    if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "mapping";
        state.result = _result;
    }
    return detected;
}
function readTagProperty(state) {
    var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x21 /* ! */ ) return false;
    if (state.tag !== null) {
        throwError(state, "duplication of a tag property");
    }
    ch = state.input.charCodeAt(++state.position);
    if (ch === 0x3C /* < */ ) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
    } else if (ch === 0x21 /* ! */ ) {
        isNamed = true;
        tagHandle = "!!";
        ch = state.input.charCodeAt(++state.position);
    } else {
        tagHandle = "!";
    }
    _position = state.position;
    if (isVerbatim) {
        do {
            ch = state.input.charCodeAt(++state.position);
        }while (ch !== 0 && ch !== 0x3E /* > */ );
        if (state.position < state.length) {
            tagName = state.input.slice(_position, state.position);
            ch = state.input.charCodeAt(++state.position);
        } else {
            throwError(state, "unexpected end of the stream within a verbatim tag");
        }
    } else {
        while(ch !== 0 && !is_WS_OR_EOL(ch)){
            if (ch === 0x21 /* ! */ ) {
                if (!isNamed) {
                    tagHandle = state.input.slice(_position - 1, state.position + 1);
                    if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                        throwError(state, "named tag handle cannot contain such characters");
                    }
                    isNamed = true;
                    _position = state.position + 1;
                } else {
                    throwError(state, "tag suffix cannot contain exclamation marks");
                }
            }
            ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(_position, state.position);
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
            throwError(state, "tag suffix cannot contain flow indicator characters");
        }
    }
    if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(state, "tag name cannot contain such characters: " + tagName);
    }
    try {
        tagName = decodeURIComponent(tagName);
    } catch (err) {
        throwError(state, "tag name is malformed: " + tagName);
    }
    if (isVerbatim) {
        state.tag = tagName;
    } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
    } else if (tagHandle === "!") {
        state.tag = "!" + tagName;
    } else if (tagHandle === "!!") {
        state.tag = "tag:yaml.org,2002:" + tagName;
    } else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
    }
    return true;
}
function readAnchorProperty(state) {
    var _position, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x26 /* & */ ) return false;
    if (state.anchor !== null) {
        throwError(state, "duplication of an anchor property");
    }
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while(ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)){
        ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
        throwError(state, "name of an anchor node must contain at least one character");
    }
    state.anchor = state.input.slice(_position, state.position);
    return true;
}
function readAlias(state) {
    var _position, alias, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x2A /* * */ ) return false;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while(ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)){
        ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
        throwError(state, "name of an alias node must contain at least one character");
    }
    alias = state.input.slice(_position, state.position);
    if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
    }
    state.result = state.anchorMap[alias];
    skipSeparationSpace(state, true, -1);
    return true;
}
function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
    var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type, flowIndent, blockIndent;
    if (state.listener !== null) {
        state.listener("open", state);
    }
    state.tag = null;
    state.anchor = null;
    state.kind = null;
    state.result = null;
    allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
    if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            if (state.lineIndent > parentIndent) {
                indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
                indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
                indentStatus = -1;
            }
        }
    }
    if (indentStatus === 1) {
        while(readTagProperty(state) || readAnchorProperty(state)){
            if (skipSeparationSpace(state, true, -1)) {
                atNewLine = true;
                allowBlockCollections = allowBlockStyles;
                if (state.lineIndent > parentIndent) {
                    indentStatus = 1;
                } else if (state.lineIndent === parentIndent) {
                    indentStatus = 0;
                } else if (state.lineIndent < parentIndent) {
                    indentStatus = -1;
                }
            } else {
                allowBlockCollections = false;
            }
        }
    }
    if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
    }
    if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
        if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
            flowIndent = parentIndent;
        } else {
            flowIndent = parentIndent + 1;
        }
        blockIndent = state.position - state.lineStart;
        if (indentStatus === 1) {
            if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
                hasContent = true;
            } else {
                if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
                    hasContent = true;
                } else if (readAlias(state)) {
                    hasContent = true;
                    if (state.tag !== null || state.anchor !== null) {
                        throwError(state, "alias node should not have any properties");
                    }
                } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
                    hasContent = true;
                    if (state.tag === null) {
                        state.tag = "?";
                    }
                }
                if (state.anchor !== null) {
                    state.anchorMap[state.anchor] = state.result;
                }
            }
        } else if (indentStatus === 0) {
            // Special case: block sequences are allowed to have same indentation level as the parent.
            // http://www.yaml.org/spec/1.2/spec.html#id2799784
            hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
    }
    if (state.tag === null) {
        if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
        }
    } else if (state.tag === "?") {
        // Implicit resolving is not allowed for non-scalar types, and '?'
        // non-specific tag is only automatically assigned to plain scalars.
        //
        // We only need to check kind conformity in case user explicitly assigns '?'
        // tag, for example like this: "!<?> [0]"
        //
        if (state.result !== null && state.kind !== "scalar") {
            throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
        }
        for(typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1){
            type = state.implicitTypes[typeIndex];
            if (type.resolve(state.result)) {
                state.result = type.construct(state.result);
                state.tag = type.tag;
                if (state.anchor !== null) {
                    state.anchorMap[state.anchor] = state.result;
                }
                break;
            }
        }
    } else if (state.tag !== "!") {
        if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) {
            type = state.typeMap[state.kind || "fallback"][state.tag];
        } else {
            // looking for multi type
            type = null;
            typeList = state.typeMap.multi[state.kind || "fallback"];
            for(typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1){
                if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
                    type = typeList[typeIndex];
                    break;
                }
            }
        }
        if (!type) {
            throwError(state, "unknown tag !<" + state.tag + ">");
        }
        if (state.result !== null && type.kind !== state.kind) {
            throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
        }
        if (!type.resolve(state.result, state.tag)) {
            throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
        } else {
            state.result = type.construct(state.result, state.tag);
            if (state.anchor !== null) {
                state.anchorMap[state.anchor] = state.result;
            }
        }
    }
    if (state.listener !== null) {
        state.listener("close", state);
    }
    return state.tag !== null || state.anchor !== null || hasContent;
}
function readDocument(state) {
    var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
    state.version = null;
    state.checkLineBreaks = state.legacy;
    state.tagMap = Object.create(null);
    state.anchorMap = Object.create(null);
    while((ch = state.input.charCodeAt(state.position)) !== 0){
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || ch !== 0x25 /* % */ ) {
            break;
        }
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while(ch !== 0 && !is_WS_OR_EOL(ch)){
            ch = state.input.charCodeAt(++state.position);
        }
        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];
        if (directiveName.length < 1) {
            throwError(state, "directive name must not be less than one character in length");
        }
        while(ch !== 0){
            while(is_WHITE_SPACE(ch)){
                ch = state.input.charCodeAt(++state.position);
            }
            if (ch === 0x23 /* # */ ) {
                do {
                    ch = state.input.charCodeAt(++state.position);
                }while (ch !== 0 && !is_EOL(ch));
                break;
            }
            if (is_EOL(ch)) break;
            _position = state.position;
            while(ch !== 0 && !is_WS_OR_EOL(ch)){
                ch = state.input.charCodeAt(++state.position);
            }
            directiveArgs.push(state.input.slice(_position, state.position));
        }
        if (ch !== 0) readLineBreak(state);
        if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
            directiveHandlers[directiveName](state, directiveName, directiveArgs);
        } else {
            throwWarning(state, 'unknown document directive "' + directiveName + '"');
        }
    }
    skipSeparationSpace(state, true, -1);
    if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 0x2D /* - */  && state.input.charCodeAt(state.position + 1) === 0x2D /* - */  && state.input.charCodeAt(state.position + 2) === 0x2D /* - */ ) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
    } else if (hasDirectives) {
        throwError(state, "directives end mark is expected");
    }
    composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
    skipSeparationSpace(state, true, -1);
    if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, "non-ASCII line breaks are interpreted as content");
    }
    state.documents.push(state.result);
    if (state.position === state.lineStart && testDocumentSeparator(state)) {
        if (state.input.charCodeAt(state.position) === 0x2E /* . */ ) {
            state.position += 3;
            skipSeparationSpace(state, true, -1);
        }
        return;
    }
    if (state.position < state.length - 1) {
        throwError(state, "end of the stream or a document separator is expected");
    } else {
        return;
    }
}
function loadDocuments(input, options) {
    input = String(input);
    options = options || {};
    if (input.length !== 0) {
        // Add tailing `\n` if not exists
        if (input.charCodeAt(input.length - 1) !== 0x0A /* LF */  && input.charCodeAt(input.length - 1) !== 0x0D /* CR */ ) {
            input += "\n";
        }
        // Strip BOM
        if (input.charCodeAt(0) === 0xFEFF) {
            input = input.slice(1);
        }
    }
    var state = new State$1(input, options);
    var nullpos = input.indexOf("\x00");
    if (nullpos !== -1) {
        state.position = nullpos;
        throwError(state, "null byte is not allowed in input");
    }
    // Use 0 as string terminator. That significantly simplifies bounds check.
    state.input += "\x00";
    while(state.input.charCodeAt(state.position) === 0x20 /* Space */ ){
        state.lineIndent += 1;
        state.position += 1;
    }
    while(state.position < state.length - 1){
        readDocument(state);
    }
    return state.documents;
}
function loadAll$1(input, iterator, options) {
    if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
        options = iterator;
        iterator = null;
    }
    var documents = loadDocuments(input, options);
    if (typeof iterator !== "function") {
        return documents;
    }
    for(var index = 0, length = documents.length; index < length; index += 1){
        iterator(documents[index]);
    }
}
function load$1(input, options) {
    var documents = loadDocuments(input, options);
    if (documents.length === 0) {
        /*eslint-disable no-undefined*/ return undefined;
    } else if (documents.length === 1) {
        return documents[0];
    }
    throw new exception("expected a single document in the stream, but found more");
}
var loadAll_1 = loadAll$1;
var load_1 = load$1;
var loader = {
    loadAll: loadAll_1,
    load: load_1
};
/*eslint-disable no-use-before-define*/ var _toString = Object.prototype.toString;
var _hasOwnProperty = Object.prototype.hasOwnProperty;
var CHAR_BOM = 0xFEFF;
var CHAR_TAB = 0x09; /* Tab */ 
var CHAR_LINE_FEED = 0x0A; /* LF */ 
var CHAR_CARRIAGE_RETURN = 0x0D; /* CR */ 
var CHAR_SPACE = 0x20; /* Space */ 
var CHAR_EXCLAMATION = 0x21; /* ! */ 
var CHAR_DOUBLE_QUOTE = 0x22; /* " */ 
var CHAR_SHARP = 0x23; /* # */ 
var CHAR_PERCENT = 0x25; /* % */ 
var CHAR_AMPERSAND = 0x26; /* & */ 
var CHAR_SINGLE_QUOTE = 0x27; /* ' */ 
var CHAR_ASTERISK = 0x2A; /* * */ 
var CHAR_COMMA = 0x2C; /* , */ 
var CHAR_MINUS = 0x2D; /* - */ 
var CHAR_COLON = 0x3A; /* : */ 
var CHAR_EQUALS = 0x3D; /* = */ 
var CHAR_GREATER_THAN = 0x3E; /* > */ 
var CHAR_QUESTION = 0x3F; /* ? */ 
var CHAR_COMMERCIAL_AT = 0x40; /* @ */ 
var CHAR_LEFT_SQUARE_BRACKET = 0x5B; /* [ */ 
var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */ 
var CHAR_GRAVE_ACCENT = 0x60; /* ` */ 
var CHAR_LEFT_CURLY_BRACKET = 0x7B; /* { */ 
var CHAR_VERTICAL_LINE = 0x7C; /* | */ 
var CHAR_RIGHT_CURLY_BRACKET = 0x7D; /* } */ 
var ESCAPE_SEQUENCES = {};
ESCAPE_SEQUENCES[0x00] = "\\0";
ESCAPE_SEQUENCES[0x07] = "\\a";
ESCAPE_SEQUENCES[0x08] = "\\b";
ESCAPE_SEQUENCES[0x09] = "\\t";
ESCAPE_SEQUENCES[0x0A] = "\\n";
ESCAPE_SEQUENCES[0x0B] = "\\v";
ESCAPE_SEQUENCES[0x0C] = "\\f";
ESCAPE_SEQUENCES[0x0D] = "\\r";
ESCAPE_SEQUENCES[0x1B] = "\\e";
ESCAPE_SEQUENCES[0x22] = '\\"';
ESCAPE_SEQUENCES[0x5C] = "\\\\";
ESCAPE_SEQUENCES[0x85] = "\\N";
ESCAPE_SEQUENCES[0xA0] = "\\_";
ESCAPE_SEQUENCES[0x2028] = "\\L";
ESCAPE_SEQUENCES[0x2029] = "\\P";
var DEPRECATED_BOOLEANS_SYNTAX = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
];
var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function compileStyleMap(schema, map) {
    var result, keys, index, length, tag, style, type;
    if (map === null) return {};
    result = {};
    keys = Object.keys(map);
    for(index = 0, length = keys.length; index < length; index += 1){
        tag = keys[index];
        style = String(map[tag]);
        if (tag.slice(0, 2) === "!!") {
            tag = "tag:yaml.org,2002:" + tag.slice(2);
        }
        type = schema.compiledTypeMap["fallback"][tag];
        if (type && _hasOwnProperty.call(type.styleAliases, style)) {
            style = type.styleAliases[style];
        }
        result[tag] = style;
    }
    return result;
}
function encodeHex(character) {
    var string, handle, length;
    string = character.toString(16).toUpperCase();
    if (character <= 0xFF) {
        handle = "x";
        length = 2;
    } else if (character <= 0xFFFF) {
        handle = "u";
        length = 4;
    } else if (character <= 0xFFFFFFFF) {
        handle = "U";
        length = 8;
    } else {
        throw new exception("code point within a string may not be greater than 0xFFFFFFFF");
    }
    return "\\" + handle + common.repeat("0", length - string.length) + string;
}
var QUOTING_TYPE_SINGLE = 1, QUOTING_TYPE_DOUBLE = 2;
function State(options) {
    this.schema = options["schema"] || _default;
    this.indent = Math.max(1, options["indent"] || 2);
    this.noArrayIndent = options["noArrayIndent"] || false;
    this.skipInvalid = options["skipInvalid"] || false;
    this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
    this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
    this.sortKeys = options["sortKeys"] || false;
    this.lineWidth = options["lineWidth"] || 80;
    this.noRefs = options["noRefs"] || false;
    this.noCompatMode = options["noCompatMode"] || false;
    this.condenseFlow = options["condenseFlow"] || false;
    this.quotingType = options["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
    this.forceQuotes = options["forceQuotes"] || false;
    this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.explicitTypes = this.schema.compiledExplicit;
    this.tag = null;
    this.result = "";
    this.duplicates = [];
    this.usedDuplicates = null;
}
// Indents every line in a string. Empty lines (\n only) are not indented.
function indentString(string, spaces) {
    var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
    while(position < length){
        next = string.indexOf("\n", position);
        if (next === -1) {
            line = string.slice(position);
            position = length;
        } else {
            line = string.slice(position, next + 1);
            position = next + 1;
        }
        if (line.length && line !== "\n") result += ind;
        result += line;
    }
    return result;
}
function generateNextLine(state, level) {
    return "\n" + common.repeat(" ", state.indent * level);
}
function testImplicitResolving(state, str) {
    var index, length, type;
    for(index = 0, length = state.implicitTypes.length; index < length; index += 1){
        type = state.implicitTypes[index];
        if (type.resolve(str)) {
            return true;
        }
    }
    return false;
}
// [33] s-white ::= s-space | s-tab
function isWhitespace(c) {
    return c === CHAR_SPACE || c === CHAR_TAB;
}
// Returns true if the character can be printed without escaping.
// From YAML 1.2: "any allowed characters known to be non-printable
// should also be escaped. [However,] This isn’t mandatory"
// Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
function isPrintable(c) {
    return 0x00020 <= c && c <= 0x00007E || 0x000A1 <= c && c <= 0x00D7FF && c !== 0x2028 && c !== 0x2029 || 0x0E000 <= c && c <= 0x00FFFD && c !== CHAR_BOM || 0x10000 <= c && c <= 0x10FFFF;
}
// [34] ns-char ::= nb-char - s-white
// [27] nb-char ::= c-printable - b-char - c-byte-order-mark
// [26] b-char  ::= b-line-feed | b-carriage-return
// Including s-white (for some reason, examples doesn't match specs in this aspect)
// ns-char ::= c-printable - b-line-feed - b-carriage-return - c-byte-order-mark
function isNsCharOrWhitespace(c) {
    return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
}
// [127]  ns-plain-safe(c) ::= c = flow-out  ⇒ ns-plain-safe-out
//                             c = flow-in   ⇒ ns-plain-safe-in
//                             c = block-key ⇒ ns-plain-safe-out
//                             c = flow-key  ⇒ ns-plain-safe-in
// [128] ns-plain-safe-out ::= ns-char
// [129]  ns-plain-safe-in ::= ns-char - c-flow-indicator
// [130]  ns-plain-char(c) ::=  ( ns-plain-safe(c) - “:” - “#” )
//                            | ( /* An ns-char preceding */ “#” )
//                            | ( “:” /* Followed by an ns-plain-safe(c) */ )
function isPlainSafe(c, prev, inblock) {
    var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
    var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
    return(// ns-plain-safe
    (inblock ? cIsNsCharOrWhitespace : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP // false on '#'
     && !(prev === CHAR_COLON && !cIsNsChar // false on ': '
    ) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP // change to true on '[^ ]#'
     || prev === CHAR_COLON && cIsNsChar); // change to true on ':[^ ]'
}
// Simplified test for values allowed as the first character in plain style.
function isPlainSafeFirst(c) {
    // Uses a subset of ns-char - c-indicator
    // where ns-char = nb-char - s-white.
    // No support of ( ( “?” | “:” | “-” ) /* Followed by an ns-plain-safe(c)) */ ) part
    return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) // - s-white
     && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
}
// Simplified test for values allowed as the last character in plain style.
function isPlainSafeLast(c) {
    // just not whitespace or colon, it will be checked to be plain character later
    return !isWhitespace(c) && c !== CHAR_COLON;
}
// Same as 'string'.codePointAt(pos), but works in older browsers.
function codePointAt(string, pos) {
    var first = string.charCodeAt(pos), second;
    if (first >= 0xD800 && first <= 0xDBFF && pos + 1 < string.length) {
        second = string.charCodeAt(pos + 1);
        if (second >= 0xDC00 && second <= 0xDFFF) {
            // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        }
    }
    return first;
}
// Determines whether block indentation indicator is required.
function needIndentIndicator(string) {
    var leadingSpaceRe = /^\n* /;
    return leadingSpaceRe.test(string);
}
var STYLE_PLAIN = 1, STYLE_SINGLE = 2, STYLE_LITERAL = 3, STYLE_FOLDED = 4, STYLE_DOUBLE = 5;
// Determines which scalar styles are possible and returns the preferred style.
// lineWidth = -1 => no limit.
// Pre-conditions: str.length > 0.
// Post-conditions:
//    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
//    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
//    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
    var i;
    var char = 0;
    var prevChar = null;
    var hasLineBreak = false;
    var hasFoldableLine = false; // only checked if shouldTrackWidth
    var shouldTrackWidth = lineWidth !== -1;
    var previousLineBreak = -1; // count the first line correctly
    var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
    if (singleLineOnly || forceQuotes) {
        // Case: no block styles.
        // Check for disallowed characters to rule out plain and single.
        for(i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++){
            char = codePointAt(string, i);
            if (!isPrintable(char)) {
                return STYLE_DOUBLE;
            }
            plain = plain && isPlainSafe(char, prevChar, inblock);
            prevChar = char;
        }
    } else {
        // Case: block styles permitted.
        for(i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++){
            char = codePointAt(string, i);
            if (char === CHAR_LINE_FEED) {
                hasLineBreak = true;
                // Check if any line can be folded.
                if (shouldTrackWidth) {
                    hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
                    i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
                    previousLineBreak = i;
                }
            } else if (!isPrintable(char)) {
                return STYLE_DOUBLE;
            }
            plain = plain && isPlainSafe(char, prevChar, inblock);
            prevChar = char;
        }
        // in case the end is missing a \n
        hasFoldableLine = hasFoldableLine || shouldTrackWidth && i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
    }
    // Although every style can represent \n without escaping, prefer block styles
    // for multiline, since they're more readable and they don't add empty lines.
    // Also prefer folding a super-long line.
    if (!hasLineBreak && !hasFoldableLine) {
        // Strings interpretable as another type have to be quoted;
        // e.g. the string 'true' vs. the boolean true.
        if (plain && !forceQuotes && !testAmbiguousType(string)) {
            return STYLE_PLAIN;
        }
        return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
    }
    // Edge case: block indentation indicator can only have one digit.
    if (indentPerLevel > 9 && needIndentIndicator(string)) {
        return STYLE_DOUBLE;
    }
    // At this point we know block styles are valid.
    // Prefer literal style unless we want to fold.
    if (!forceQuotes) {
        return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
}
// Note: line breaking/folding is implemented for only the folded style.
// NB. We drop the last trailing newline (if any) of a returned block scalar
//  since the dumper adds its own newline. This always works:
//    • No ending newline => unaffected; already using strip "-" chomping.
//    • Ending newline    => removed then restored.
//  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
function writeScalar(state, string, level, iskey, inblock) {
    state.dump = function() {
        if (string.length === 0) {
            return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
        }
        if (!state.noCompatMode) {
            if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
                return state.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string + '"' : "'" + string + "'";
            }
        }
        var indent = state.indent * Math.max(1, level); // no 0-indent scalars
        // As indentation gets deeper, let the width decrease monotonically
        // to the lower bound min(state.lineWidth, 40).
        // Note that this implies
        //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
        //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
        // This behaves better than a constant minimum width which disallows narrower options,
        // or an indent threshold which causes the width to suddenly increase.
        var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        // Without knowing if keys are implicit/explicit, assume implicit for safety.
        var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
        function testAmbiguity(string) {
            return testImplicitResolving(state, string);
        }
        switch(chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity, state.quotingType, state.forceQuotes && !iskey, inblock)){
            case STYLE_PLAIN:
                return string;
            case STYLE_SINGLE:
                return "'" + string.replace(/'/g, "''") + "'";
            case STYLE_LITERAL:
                return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
            case STYLE_FOLDED:
                return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
            case STYLE_DOUBLE:
                return '"' + escapeString(string) + '"';
            default:
                throw new exception("impossible error: invalid scalar style");
        }
    }();
}
// Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
function blockHeader(string, indentPerLevel) {
    var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
    // note the special case: the string '\n' counts as a "trailing" empty line.
    var clip = string[string.length - 1] === "\n";
    var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
    var chomp = keep ? "+" : clip ? "" : "-";
    return indentIndicator + chomp + "\n";
}
// (See the note for writeScalar.)
function dropEndingNewline(string) {
    return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
}
// Note: a long line without a suitable break point will exceed the width limit.
// Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
function foldString(string, width) {
    // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
    // unless they're before or after a more-indented line, or at the very
    // beginning or end, in which case $k$ maps to $k$.
    // Therefore, parse each chunk as newline(s) followed by a content line.
    var lineRe = /(\n+)([^\n]*)/g;
    // first line (possibly an empty line)
    var result = function() {
        var nextLF = string.indexOf("\n");
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return foldLine(string.slice(0, nextLF), width);
    }();
    // If we haven't reached the first content line yet, don't add an extra \n.
    var prevMoreIndented = string[0] === "\n" || string[0] === " ";
    var moreIndented;
    // rest of the lines
    var match;
    while(match = lineRe.exec(string)){
        var prefix = match[1], line = match[2];
        moreIndented = line[0] === " ";
        result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
        prevMoreIndented = moreIndented;
    }
    return result;
}
// Greedy line breaking.
// Picks the longest line under the limit each time,
// otherwise settles for the shortest line over the limit.
// NB. More-indented lines *cannot* be folded, as that would add an extra \n.
function foldLine(line, width) {
    if (line === "" || line[0] === " ") return line;
    // Since a more-indented line adds a \n, breaks can't be followed by a space.
    var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
    var match;
    // start is an inclusive index. end, curr, and next are exclusive.
    var start = 0, end, curr = 0, next = 0;
    var result = "";
    // Invariants: 0 <= start <= length-1.
    //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
    // Inside the loop:
    //   A match implies length >= 2, so curr and next are <= length-2.
    while(match = breakRe.exec(line)){
        next = match.index;
        // maintain invariant: curr - start <= width
        if (next - start > width) {
            end = curr > start ? curr : next; // derive end <= length-2
            result += "\n" + line.slice(start, end);
            // skip the space that was output as \n
            start = end + 1; // derive start <= length-1
        }
        curr = next;
    }
    // By the invariants, start <= length-1, so there is something left over.
    // It is either the whole string or a part starting from non-whitespace.
    result += "\n";
    // Insert a break if the remainder is too long and there is a break available.
    if (line.length - start > width && curr > start) {
        result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
    } else {
        result += line.slice(start);
    }
    return result.slice(1); // drop extra \n joiner
}
// Escapes a double-quoted string.
function escapeString(string) {
    var result = "";
    var char = 0;
    var escapeSeq;
    for(var i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++){
        char = codePointAt(string, i);
        escapeSeq = ESCAPE_SEQUENCES[char];
        if (!escapeSeq && isPrintable(char)) {
            result += string[i];
            if (char >= 0x10000) result += string[i + 1];
        } else {
            result += escapeSeq || encodeHex(char);
        }
    }
    return result;
}
function writeFlowSequence(state, level, object) {
    var _result = "", _tag = state.tag, index, length, value;
    for(index = 0, length = object.length; index < length; index += 1){
        value = object[index];
        if (state.replacer) {
            value = state.replacer.call(object, String(index), value);
        }
        // Write only valid elements, put null instead of invalid elements.
        if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
            if (_result !== "") _result += "," + (!state.condenseFlow ? " " : "");
            _result += state.dump;
        }
    }
    state.tag = _tag;
    state.dump = "[" + _result + "]";
}
function writeBlockSequence(state, level, object, compact) {
    var _result = "", _tag = state.tag, index, length, value;
    for(index = 0, length = object.length; index < length; index += 1){
        value = object[index];
        if (state.replacer) {
            value = state.replacer.call(object, String(index), value);
        }
        // Write only valid elements, put null instead of invalid elements.
        if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
            if (!compact || _result !== "") {
                _result += generateNextLine(state, level);
            }
            if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
                _result += "-";
            } else {
                _result += "- ";
            }
            _result += state.dump;
        }
    }
    state.tag = _tag;
    state.dump = _result || "[]"; // Empty sequence if no valid values.
}
function writeFlowMapping(state, level, object) {
    var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
    for(index = 0, length = objectKeyList.length; index < length; index += 1){
        pairBuffer = "";
        if (_result !== "") pairBuffer += ", ";
        if (state.condenseFlow) pairBuffer += '"';
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (state.replacer) {
            objectValue = state.replacer.call(object, objectKey, objectValue);
        }
        if (!writeNode(state, level, objectKey, false, false)) {
            continue; // Skip this pair because of invalid key;
        }
        if (state.dump.length > 1024) pairBuffer += "? ";
        pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
        if (!writeNode(state, level, objectValue, false, false)) {
            continue; // Skip this pair because of invalid value.
        }
        pairBuffer += state.dump;
        // Both key and value are valid.
        _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = "{" + _result + "}";
}
function writeBlockMapping(state, level, object, compact) {
    var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
    // Allow sorting keys so that the output file is deterministic
    if (state.sortKeys === true) {
        // Default sorting
        objectKeyList.sort();
    } else if (typeof state.sortKeys === "function") {
        // Custom sort function
        objectKeyList.sort(state.sortKeys);
    } else if (state.sortKeys) {
        // Something is wrong
        throw new exception("sortKeys must be a boolean or a function");
    }
    for(index = 0, length = objectKeyList.length; index < length; index += 1){
        pairBuffer = "";
        if (!compact || _result !== "") {
            pairBuffer += generateNextLine(state, level);
        }
        objectKey = objectKeyList[index];
        objectValue = object[objectKey];
        if (state.replacer) {
            objectValue = state.replacer.call(object, objectKey, objectValue);
        }
        if (!writeNode(state, level + 1, objectKey, true, true, true)) {
            continue; // Skip this pair because of invalid key.
        }
        explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
        if (explicitPair) {
            if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
                pairBuffer += "?";
            } else {
                pairBuffer += "? ";
            }
        }
        pairBuffer += state.dump;
        if (explicitPair) {
            pairBuffer += generateNextLine(state, level);
        }
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
            continue; // Skip this pair because of invalid value.
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += ":";
        } else {
            pairBuffer += ": ";
        }
        pairBuffer += state.dump;
        // Both key and value are valid.
        _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = _result || "{}"; // Empty mapping if no valid pairs.
}
function detectType(state, object, explicit) {
    var _result, typeList, index, length, type, style;
    typeList = explicit ? state.explicitTypes : state.implicitTypes;
    for(index = 0, length = typeList.length; index < length; index += 1){
        type = typeList[index];
        if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object === "object" && object instanceof type.instanceOf) && (!type.predicate || type.predicate(object))) {
            if (explicit) {
                if (type.multi && type.representName) {
                    state.tag = type.representName(object);
                } else {
                    state.tag = type.tag;
                }
            } else {
                state.tag = "?";
            }
            if (type.represent) {
                style = state.styleMap[type.tag] || type.defaultStyle;
                if (_toString.call(type.represent) === "[object Function]") {
                    _result = type.represent(object, style);
                } else if (_hasOwnProperty.call(type.represent, style)) {
                    _result = type.represent[style](object, style);
                } else {
                    throw new exception("!<" + type.tag + '> tag resolver accepts not "' + style + '" style');
                }
                state.dump = _result;
            }
            return true;
        }
    }
    return false;
}
// Serializes `object` and writes it to global `result`.
// Returns true on success, or false on invalid object.
//
function writeNode(state, level, object, block, compact, iskey, isblockseq) {
    state.tag = null;
    state.dump = object;
    if (!detectType(state, object, false)) {
        detectType(state, object, true);
    }
    var type = _toString.call(state.dump);
    var inblock = block;
    var tagStr;
    if (block) {
        block = state.flowLevel < 0 || state.flowLevel > level;
    }
    var objectOrArray = type === "[object Object]" || type === "[object Array]", duplicateIndex, duplicate;
    if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
    }
    if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
        compact = false;
    }
    if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = "*ref_" + duplicateIndex;
    } else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
            state.usedDuplicates[duplicateIndex] = true;
        }
        if (type === "[object Object]") {
            if (block && Object.keys(state.dump).length !== 0) {
                writeBlockMapping(state, level, state.dump, compact);
                if (duplicate) {
                    state.dump = "&ref_" + duplicateIndex + state.dump;
                }
            } else {
                writeFlowMapping(state, level, state.dump);
                if (duplicate) {
                    state.dump = "&ref_" + duplicateIndex + " " + state.dump;
                }
            }
        } else if (type === "[object Array]") {
            if (block && state.dump.length !== 0) {
                if (state.noArrayIndent && !isblockseq && level > 0) {
                    writeBlockSequence(state, level - 1, state.dump, compact);
                } else {
                    writeBlockSequence(state, level, state.dump, compact);
                }
                if (duplicate) {
                    state.dump = "&ref_" + duplicateIndex + state.dump;
                }
            } else {
                writeFlowSequence(state, level, state.dump);
                if (duplicate) {
                    state.dump = "&ref_" + duplicateIndex + " " + state.dump;
                }
            }
        } else if (type === "[object String]") {
            if (state.tag !== "?") {
                writeScalar(state, state.dump, level, iskey, inblock);
            }
        } else if (type === "[object Undefined]") {
            return false;
        } else {
            if (state.skipInvalid) return false;
            throw new exception("unacceptable kind of an object to dump " + type);
        }
        if (state.tag !== null && state.tag !== "?") {
            // Need to encode all characters except those allowed by the spec:
            //
            // [35] ns-dec-digit    ::=  [#x30-#x39] /* 0-9 */
            // [36] ns-hex-digit    ::=  ns-dec-digit
            //                         | [#x41-#x46] /* A-F */ | [#x61-#x66] /* a-f */
            // [37] ns-ascii-letter ::=  [#x41-#x5A] /* A-Z */ | [#x61-#x7A] /* a-z */
            // [38] ns-word-char    ::=  ns-dec-digit | ns-ascii-letter | “-”
            // [39] ns-uri-char     ::=  “%” ns-hex-digit ns-hex-digit | ns-word-char | “#”
            //                         | “;” | “/” | “?” | “:” | “@” | “&” | “=” | “+” | “$” | “,”
            //                         | “_” | “.” | “!” | “~” | “*” | “'” | “(” | “)” | “[” | “]”
            //
            // Also need to encode '!' because it has special meaning (end of tag prefix).
            //
            tagStr = encodeURI(state.tag[0] === "!" ? state.tag.slice(1) : state.tag).replace(/!/g, "%21");
            if (state.tag[0] === "!") {
                tagStr = "!" + tagStr;
            } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
                tagStr = "!!" + tagStr.slice(18);
            } else {
                tagStr = "!<" + tagStr + ">";
            }
            state.dump = tagStr + " " + state.dump;
        }
    }
    return true;
}
function getDuplicateReferences(object, state) {
    var objects = [], duplicatesIndexes = [], index, length;
    inspectNode(object, objects, duplicatesIndexes);
    for(index = 0, length = duplicatesIndexes.length; index < length; index += 1){
        state.duplicates.push(objects[duplicatesIndexes[index]]);
    }
    state.usedDuplicates = new Array(length);
}
function inspectNode(object, objects, duplicatesIndexes) {
    var objectKeyList, index, length;
    if (object !== null && typeof object === "object") {
        index = objects.indexOf(object);
        if (index !== -1) {
            if (duplicatesIndexes.indexOf(index) === -1) {
                duplicatesIndexes.push(index);
            }
        } else {
            objects.push(object);
            if (Array.isArray(object)) {
                for(index = 0, length = object.length; index < length; index += 1){
                    inspectNode(object[index], objects, duplicatesIndexes);
                }
            } else {
                objectKeyList = Object.keys(object);
                for(index = 0, length = objectKeyList.length; index < length; index += 1){
                    inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
                }
            }
        }
    }
}
function dump$1(input, options) {
    options = options || {};
    var state = new State(options);
    if (!state.noRefs) getDuplicateReferences(input, state);
    var value = input;
    if (state.replacer) {
        value = state.replacer.call({
            "": value
        }, "", value);
    }
    if (writeNode(state, 0, value, true, true)) return state.dump + "\n";
    return "";
}
var dump_1 = dump$1;
var dumper = {
    dump: dump_1
};
function renamed(from, to) {
    return function() {
        throw new Error("Function yaml." + from + " is removed in js-yaml 4. " + "Use yaml." + to + " instead, which is now safe by default.");
    };
}
var Type = type;
var Schema = schema;
var FAILSAFE_SCHEMA = failsafe;
var JSON_SCHEMA = json;
var CORE_SCHEMA = core;
var DEFAULT_SCHEMA = _default;
var load = loader.load;
var loadAll = loader.loadAll;
var dump = dumper.dump;
var YAMLException = exception;
// Re-export all types in case user wants to create custom schema
var types = {
    binary: binary,
    float: js_yaml_float,
    map: map,
    null: _null,
    pairs: pairs,
    set: set,
    timestamp: timestamp,
    bool: bool,
    int: js_yaml_int,
    merge: merge,
    omap: omap,
    seq: seq,
    str: str
};
// Removed functions from JS-YAML 3.0.x
var safeLoad = renamed("safeLoad", "load");
var safeLoadAll = renamed("safeLoadAll", "loadAll");
var safeDump = renamed("safeDump", "dump");
var jsYaml = {
    Type: Type,
    Schema: Schema,
    FAILSAFE_SCHEMA: FAILSAFE_SCHEMA,
    JSON_SCHEMA: JSON_SCHEMA,
    CORE_SCHEMA: CORE_SCHEMA,
    DEFAULT_SCHEMA: DEFAULT_SCHEMA,
    load: load,
    loadAll: loadAll,
    dump: dump,
    YAMLException: YAMLException,
    types: types,
    safeLoad: safeLoad,
    safeLoadAll: safeLoadAll,
    safeDump: safeDump
};
/* harmony default export */ const js_yaml = ((/* unused pure expression or super */ null && (jsYaml)));


;// CONCATENATED MODULE: ../node_modules/@keystatic/core/dist/required-files-e1ca83cb.node.react-server.esm.js


const textDecoder = new TextDecoder();
const textEncoder = new TextEncoder();
function splitFrontmatter(data) {
    const str = textDecoder.decode(data);
    const match = str.match(/^---(?:\r?\n([^]*?))?\r?\n---\r?\n?/);
    if (match) {
        var _match$;
        const encoded = textEncoder.encode(match[0]);
        return {
            frontmatter: (_match$ = match[1]) !== null && _match$ !== void 0 ? _match$ : "",
            content: data.slice(encoded.byteLength)
        };
    }
    return null;
}
function loadDataFile(data, formatInfo) {
    const parse = formatInfo.data === "json" ? JSON.parse : load;
    if (!formatInfo.contentField) {
        const dataFile = textDecoder.decode(data);
        return {
            loaded: parse(dataFile)
        };
    }
    const res = splitFrontmatter(data);
    (0,emery_cjs.assert)(res !== null, "frontmatter not found");
    return {
        loaded: parse(res.frontmatter),
        extraFakeFile: {
            path: `${formatInfo.contentField.key}${formatInfo.contentField.config.contentExtension}`,
            contents: res.content
        }
    };
}


// EXTERNAL MODULE: ../node_modules/next/dist/compiled/react/react.shared-subset.js
var react_shared_subset = __webpack_require__(16017);
var react_shared_subset_namespaceObject = /*#__PURE__*/__webpack_require__.t(react_shared_subset, 2);
// EXTERNAL MODULE: ../node_modules/emery/assertions/dist/emery-assertions.cjs.js
var emery_assertions_cjs = __webpack_require__(42220);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/index-7a5cd0db.node.react-server.esm.js
var index_7a5cd0db_node_react_server_esm = __webpack_require__(32159);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/ui-1f1aa184.node.react-server.esm.js
var ui_1f1aa184_node_react_server_esm = __webpack_require__(63688);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/utils-2bbfbd32.node.react-server.esm.js
var utils_2bbfbd32_node_react_server_esm = __webpack_require__(91001);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/languages-14058067.node.react-server.esm.js
var languages_14058067_node_react_server_esm = __webpack_require__(94438);
// EXTERNAL MODULE: ../node_modules/@keystatic/core/dist/prism-e4e5bc8f.node.react-server.esm.js
var prism_e4e5bc8f_node_react_server_esm = __webpack_require__(48006);
// EXTERNAL MODULE: external "crypto"
var external_crypto_ = __webpack_require__(6113);
;// CONCATENATED MODULE: ../node_modules/@keystatic/core/reader/dist/keystatic-core-reader.node.react-server.esm.js








































function cache$1(func) {
    return func;
}
// we conditionally using it since it's not actually in stable react releases yet
// (though it should be unnecessary since this file is only imported in react-server environments anyway)
// it's a function because some tools try to be smart with accessing things on namespace imports
// and error at build time if you try to read an export that doesn't exist on a namespace object
function getCache(react) {
    var _react$cache;
    return (_react$cache = react.cache) !== null && _react$cache !== void 0 ? _react$cache : cache$1;
}
const cache = getCache(react_shared_subset_namespaceObject);
async function getAllEntries(root, prefix) {
    return (await Promise.all((await promises_default().readdir(external_path_default().join(root, prefix), {
        withFileTypes: true
    }).catch((err)=>{
        if (err.code === "ENOENT") {
            return [];
        }
        throw err;
    })).map(async (dirent)=>{
        const name = `${prefix}${dirent.name}`;
        const entry = {
            entry: dirent,
            name
        };
        if (dirent.isDirectory()) {
            return [
                entry,
                ...await getAllEntries(root, `${name}/`)
            ];
        }
        if (dirent.isFile()) {
            return entry;
        }
        return [];
    }))).flat();
}
const listCollection = cache(async function listCollection(repoPath, collectionPath, glob, formatInfo, extension) {
    const entries = glob === "*" ? (await promises_default().readdir(external_path_default().join(repoPath, collectionPath), {
        withFileTypes: true
    }).catch((err)=>{
        if (err.code === "ENOENT") {
            return [];
        }
        throw err;
    })).map((x)=>({
            entry: x,
            name: x.name
        })) : await getAllEntries(external_path_default().join(repoPath, collectionPath), "");
    return (await Promise.all(entries.map(async (x)=>{
        if (formatInfo.dataLocation === "index") {
            if (!x.entry.isDirectory()) return [];
            try {
                await promises_default().stat(external_path_default().join(repoPath, (0,utils_677addd9_node_react_server_esm.j)(`${collectionPath}/${x.name}`, formatInfo)));
                return [
                    x.name
                ];
            } catch (err) {
                if (err.code === "ENOENT") {
                    return [];
                }
                throw err;
            }
        } else {
            if (!x.entry.isFile() || !x.name.endsWith(extension)) return [];
            return [
                x.name.slice(0, -extension.length)
            ];
        }
    }))).flat();
});
function collectionReader(repoPath, collection, config) {
    const formatInfo = (0,utils_677addd9_node_react_server_esm.n)(config, collection);
    const collectionPath = (0,utils_677addd9_node_react_server_esm.c)(config, collection);
    const collectionConfig = config.collections[collection];
    const schema = (0,utils_677addd9_node_react_server_esm.o)(collectionConfig.schema);
    const glob = (0,utils_677addd9_node_react_server_esm.q)(config, collection);
    const extension = (0,utils_677addd9_node_react_server_esm.v)(formatInfo);
    const read = function(slug) {
        var _ref;
        return readItem(schema, formatInfo, (0,utils_677addd9_node_react_server_esm.s)(config, collection, slug), repoPath, (_ref = arguments.length <= 1 ? undefined : arguments[1]) === null || _ref === void 0 ? void 0 : _ref.resolveLinkedFiles, `"${slug}" in collection "${collection}"`, slug, collectionConfig.slugField, glob);
    };
    const list = ()=>listCollection(repoPath, collectionPath, glob, formatInfo, extension);
    return {
        read,
        readOrThrow: async function() {
            const entry = await read(...arguments);
            if (entry === null) {
                throw new Error(`Entry "${arguments.length <= 0 ? undefined : arguments[0]}" not found in collection "${collection}"`);
            }
            return entry;
        },
        // TODO: this could drop the fs.stat call that list does for each item
        // since we just immediately read it
        all: async function() {
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                args[_key] = arguments[_key];
            }
            const slugs = await list();
            return (await Promise.all(slugs.map(async (slug)=>{
                const entry = await read(slug, args[0]);
                if (entry === null) return [];
                return [
                    {
                        slug,
                        entry
                    }
                ];
            }))).flat();
        },
        list
    };
}
const readItem = cache(async function readItem(rootSchema, formatInfo, itemDir, repoPath, resolveLinkedFiles, debugReference) {
    for(var _len2 = arguments.length, slugInfo = new Array(_len2 > 6 ? _len2 - 6 : 0), _key2 = 6; _key2 < _len2; _key2++){
        slugInfo[_key2 - 6] = arguments[_key2];
    }
    let dataFile;
    try {
        dataFile = await promises_default().readFile(external_path_default().resolve(repoPath, (0,utils_677addd9_node_react_server_esm.j)(itemDir, formatInfo)));
    } catch (err) {
        if (err.code === "ENOENT") {
            return null;
        }
        throw err;
    }
    const { loaded, extraFakeFile } = loadDataFile(dataFile, formatInfo);
    const contentFieldPathsToEagerlyResolve = resolveLinkedFiles ? [] : undefined;
    let validated;
    try {
        validated = parseProps(rootSchema, loaded, [], [], (schema, value, path$1, pathWithArrayFieldSlugs)=>{
            if (schema.formKind === "asset") {
                return schema.reader.parse(value);
            }
            if (schema.formKind === "content") {
                contentFieldPathsToEagerlyResolve === null || contentFieldPathsToEagerlyResolve === void 0 ? void 0 : contentFieldPathsToEagerlyResolve.push(path$1);
                return async ()=>{
                    let content;
                    const filename = pathWithArrayFieldSlugs.join("/") + schema.contentExtension;
                    if (filename === (extraFakeFile === null || extraFakeFile === void 0 ? void 0 : extraFakeFile.path)) {
                        content = extraFakeFile.contents;
                    } else {
                        content = await promises_default().readFile(external_path_default().resolve(repoPath, `${itemDir}/${filename}`)).catch((x)=>{
                            if (x.code === "ENOENT") return undefined;
                            throw x;
                        });
                    }
                    return schema.reader.parse(value, {
                        content
                    });
                };
            }
            if (path$1.length === 1 && slugInfo[0] !== undefined) {
                const [slug, slugField, glob] = slugInfo;
                if (path$1[0] === slugField) {
                    if (schema.formKind !== "slug") {
                        throw new Error(`Slug field ${slugInfo[1]} is not a slug field`);
                    }
                    return schema.reader.parseWithSlug(value, {
                        slug,
                        glob
                    });
                }
            }
            return schema.reader.parse(value);
        }, true);
        if (contentFieldPathsToEagerlyResolve !== null && contentFieldPathsToEagerlyResolve !== void 0 && contentFieldPathsToEagerlyResolve.length) {
            await Promise.all(contentFieldPathsToEagerlyResolve.map(async (path)=>{
                const parentValue = (0,index_36a0dcb1_node_react_server_esm.g)(validated, path.slice(0, -1));
                const keyOnParent = path[path.length - 1];
                const originalValue = parentValue[keyOnParent];
                parentValue[keyOnParent] = await originalValue();
            }));
        }
    } catch (err) {
        const formatted = formatFormDataError(err);
        throw new Error(`Invalid data for ${debugReference}:\n${formatted}`);
    }
    return validated;
});
function singletonReader(repoPath, singleton, config) {
    const formatInfo = (0,utils_677addd9_node_react_server_esm.x)(config, singleton);
    const singletonPath = (0,utils_677addd9_node_react_server_esm.y)(config, singleton);
    const schema = (0,utils_677addd9_node_react_server_esm.o)(config.singletons[singleton].schema);
    const read = function() {
        var _ref2;
        return readItem(schema, formatInfo, singletonPath, repoPath, (_ref2 = arguments.length <= 0 ? undefined : arguments[0]) === null || _ref2 === void 0 ? void 0 : _ref2.resolveLinkedFiles, `singleton "${singleton}"`, undefined);
    };
    return {
        read,
        readOrThrow: async function() {
            const entry = await read(...arguments);
            if (entry === null) {
                throw new Error(`Singleton "${singleton}" not found`);
            }
            return entry;
        }
    };
}
function createReader(repoPath, config) {
    return {
        collections: Object.fromEntries(Object.keys(config.collections || {}).map((key)=>[
                key,
                collectionReader(repoPath, key, config)
            ])),
        singletons: Object.fromEntries(Object.keys(config.singletons || {}).map((key)=>[
                key,
                singletonReader(repoPath, key, config)
            ])),
        repoPath,
        config
    };
}



/***/ })

};
;