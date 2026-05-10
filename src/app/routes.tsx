import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { HomeScreen } from './components/HomeScreen';
import { TrackingScreen } from './components/TrackingScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { LearnScreen } from './components/LearnScreen';
import { HelpBotScreen } from './components/HelpBotScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';

export const router = createBrowserRouter([
  // Auth screens (no header/bottom nav)
  { path: '/welcome', Component: WelcomeScreen },
  { path: '/login', Component: LoginScreen },
  { path: '/register', Component: RegisterScreen },
  // App screens (with Root layout)
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomeScreen },
      { path: 'seguimiento', Component: TrackingScreen },
      { path: 'historial', Component: HistoryScreen },
      { path: 'aprender', Component: LearnScreen },
      { path: 'ayuda', Component: HelpBotScreen },
    ],
  },
]);
