import React, { FC, Suspense } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useSearchParams,
} from 'react-router-dom';

import { Location } from 'history';
import { Provider } from 'react-redux';

export const Navigation: FC = () => {
  const [searchParams] = useSearchParams();
  const level = searchParams.get('level') || '';

  const getLocationObjWithSearchParams = (
    pathname: string
  ): Partial<Location> => ({
    pathname,
    search: `${
      level &&
      `?${new URLSearchParams({
        level,
      }).toString()}`
    }`,
  });

  return (
    <nav>
      <ul>
        <li>
          <Link to={getLocationObjWithSearchParams('/')}>Home</Link>
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/minesweeper/hooks')}>
            Game With Hooks
          </Link>
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/minesweeper/usereducer')}>
            Game With useReducer
          </Link>
        </li>
        <li>
          <Link to={getLocationObjWithSearchParams('/minesweeper/reactredux')}>
            Game With ReactRedux
          </Link>
        </li>
        <li>
          <Link
            to={getLocationObjWithSearchParams(
              '/minesweeper/cellular-automation'
            )}
          >
            Game With cellular-automation
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export const Home: FC = () => <h2>Minesweeper game Forever!</h2>;

const MinesweeperWithHooks = React.lazy(() =>
  import('@/pages/MinesweeperWithHooks').then(({ MinesweeperWithHooks }) => ({
    default: MinesweeperWithHooks,
  }))
);

const MinesweeperWithUseReducer = React.lazy(() =>
  import('@/pages/MinesweeperWithUseReducer').then(
    ({ MinesweeperWithUseReducer }) => ({
      default: MinesweeperWithUseReducer,
    })
  )
);

const MinesweeperWithReactRedux = React.lazy(() =>
  import('@/pages/MinesweeperWithReactRedux').then(
    ({ MinesweeperWithReactRedux }) => ({
      default: MinesweeperWithReactRedux,
    })
  )
);

const CellularAutomation = React.lazy(() =>
  import('@/pages/CellularAutomation').then(({ CellularAutomation }) => ({
    default: CellularAutomation,
  }))
);

import { store } from '@/store';
export const Routing: FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/minesweeper">
      <Route
        path="hooks"
        element={
          <Suspense fallback={<div>Loading minesweeper with hooks...</div>}>
            <MinesweeperWithHooks />
          </Suspense>
        }
      >
        <Route
          path=":username"
          element={
            <Suspense fallback={<div>Loading minesweeper with hooks...</div>}>
              <MinesweeperWithHooks />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="usereducer"
        element={
          <Suspense
            fallback={<div>Loading minesweeper with useReducer...</div>}
          >
            <MinesweeperWithUseReducer />
          </Suspense>
        }
      />
      <Route
        path="reactredux"
        element={
          <Suspense
            fallback={<div>Loading minesweeper with ReactRedux...</div>}
          >
            <MinesweeperWithReactRedux />
          </Suspense>
        }
      />
      <Route
        path="cellular-automation"
        element={
          <Suspense fallback={<div>Loading Cellular Automation...</div>}>
            <CellularAutomation />
          </Suspense>
        }
      />
    </Route>
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export const App: FC = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Navigation />
      <Routing />
    </BrowserRouter>
  </Provider>
);
