library dartexpense_tests;

import "dart:html";
import "package:/unittest/unittest.dart";
import "package:/unittest/html_enhanced_config.dart";

import "../DartExpense.dart" as app; // the library under test

part "models_test.dart";
part "data_access_test.dart";


main() {
  useHtmlEnhancedConfiguration();

  group('models', () => test_models());

  group('data access',() => test_data_access());

}