jest.mock('react-native-reanimated', () => ({
  configureReanimatedLogger: jest.fn(),
  ReanimatedLogLevel: {
    warn: 'warn',
    error: 'error',
  },
  createAnimatedComponent: (component) => component,
  useAnimatedStyle: jest.fn(() => ({})),
  useSharedValue: jest.fn((value) => ({ value })),
  withTiming: jest.fn((value) => value),
  runOnJS: jest.fn((fn) => fn),
}));

jest.mock('react-native-orientation-locker', () => ({
  lockToPortrait: jest.fn(),
  unlockAllOrientations: jest.fn(),
  addOrientationListener: jest.fn(),
  removeOrientationListener: jest.fn(),
}));
