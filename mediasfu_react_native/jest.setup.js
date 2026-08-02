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
