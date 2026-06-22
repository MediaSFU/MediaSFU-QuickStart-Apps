import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('test harness renders a Flutter widget', (WidgetTester tester) async {
    await tester.pumpWidget(
      const MaterialApp(
        home: Scaffold(
          body: Text('MediaSFU Flutter quick-start'),
        ),
      ),
    );

    expect(find.text('MediaSFU Flutter quick-start'), findsOneWidget);
  });
}
