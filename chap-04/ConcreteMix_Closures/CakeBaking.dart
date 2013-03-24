library cake_baking;

part "ingredients.dart";
part "tools.dart";

int getTheWeight(List<Ingredient> items, [int bowlWeight = 0, int spoonWeight=0]) {
  var totalWeight = 0;
  items.forEach((item) => totalWeight += item.weight);
  print(bowlWeight);
  print(spoonWeight);
  return totalWeight - bowlWeight - spoonWeight;
}

Ingredient weighQty(Ingredient ingredient, int weight) {
  return ingredient * weight;
}

Cake bake(Ingredient ingredientMix) {
  return new Cake(ingredientMix);
}

combineIngredients(mix, item2) {
  return mix(item2);
}

separateIngredients(unmix) {
  var items = unmix();
  var sugar = items[0];
  var marge = items[1];
  print(sugar);
  print(marge);
}


main() {

  var sugar = new Sugar();

  mix(item2) {
    return sugar + item2;
  }

  var marge = new Margarine();
  // var buttercream = mix(marge);
  var buttercream = combineIngredients(mix, marge);
  print(buttercream);

  List unmix() {
    return [sugar, marge];
  }

  separateIngredients(unmix);

}
