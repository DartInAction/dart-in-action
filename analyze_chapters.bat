@echo off

rem Dart Analyzer tests for Dart in Action code

setlocal
set ANA=dart_analyzer --enable_type_checks --fatal-type-errors --extended-exit-code --type-checks-for-inferred-types 

echo - Analyzing Chapter 1
call %ANA% chap-01/1_1_strings/Listing11Strings.dart
call %ANA% chap-01/1_2_simple_class/Listing12_SimpleClass.dart
call %ANA% chap-01/1_3_implied_interfaces/Listing13_ImpliedInterfaces.dart
call %ANA% chap-01/1_4_factory_constructors/Listing14_Factoryconstructors.dart
call %ANA% chap-01/1_5_libraries/Listing15_Libraries.dart
call %ANA% chap-01/1_6_first_class_functions/Listing16_Firstclassfunctions.dart
call %ANA% chap-01/1_7_dart_html/Listing17_Dart_html.dart
call %ANA% chap-01/1_8_dart_canvas/Listing18_DartCanvas.dart

echo - Analyzing Chapter 2

call %ANA% chap-02/2_1_hello_world/Listing21_HelloWorld.dart
call %ANA% chap-02/2_2_hello_world_with_html/Listing22_HelloWorldwithHTML.dart
call %ANA% chap-02/2_4_hello_world_in_the_browser/Listing24_HelloWorldintheBrowser.dart
call %ANA% chap-02/2_5_creating_elements/Listing25_CreatingElements.dart
call %ANA% chap-02/hello_world_dartdoc/HelloWorld.dart

echo - Analyzing Chapter 3

call %ANA% chap-03/3_1_adding_elements/Listing31_AddingElements.dart
call %ANA% chap-03/3_2_building_ui/Listing32_BuildingUI.dart
call %ANA% chap-03/3_3_reacting_to_user_events/Listing33_reactingtouserevents.dart
call %ANA% chap-03/3_4_packItem_class/Listing34_PackItemclass.dart
call %ANA% chap-03/3_5_using_packItem_class/Listing35_UsingPackItemclass.dart
call %ANA% chap-03/3_6_using_a_getter/Listing36_Usingagetter.dart
call %ANA% chap-03/3_7_using_a_setter/Listing37_Usingasetter.dart

echo - Analyzing Chapter 4

call %ANA% chap-04/ConcreteMix/ConcreteMix.dart
call %ANA% chap-04/ConcreteMix_Closures/CakeBaking.dart
call %ANA% chap-04/ConcreteMix_FirstClass/CakeBaking.dart