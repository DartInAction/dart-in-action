library concrete_mix;

part "ingredients.dart";

Ingredient mix(Ingredient item1, Ingredient item2) {
  return item1 + item2;
}

Ingredient calculateQty(Ingredient ingredient, int bags, int quantity) {
  return ingredient * (bags * quantity);
}

lay(ConcreteMix concreteMix) {

}

main() {
  Ingredient cement = new Cement();
  print(cement.bags);

  Ingredient sand = calculateQty(new Sand(), cement.bags, 2);
  print(sand);
  Ingredient gravel = calculateQty(new Gravel(), cement.bags, 3);
  print(gravel);

  Ingredient mortar = mix(cement, sand);
  print(mortar);
  Ingredient dryConcrete = mix(mortar, gravel);

  ConcreteMix wetConcrete = new ConcreteMix(dryConcrete, new Water());

  lay(wetConcrete);


}


