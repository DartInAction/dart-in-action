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

Ingredient mix(Ingredient item1, Ingredient item2) {
  return item1 + item2;
}

Ingredient weighQty(Ingredient ingredient, int weight) {
  return ingredient * weight;
}

Cake bake(Ingredient ingredientMix) {
  return new Cake(ingredientMix);
}

typedef Ingredient MixFunction(Ingredient item1, Ingredient item2);

Ingredient combineIngredients(MixFunction mixFunc, Ingredient item1, Ingredient item2) {
    print("combining $item1 with $item2 using $mixFunc");
    return mixFunc(item1, item2);
}

Ingredient otherCombineIngredients(Ingredient mixFunction(Ingredient, Ingredient), item1, item2) {
  return mixFunction(item1, item2);
}

main() {
   mix2() {
    return mix2;
  }
  print(mix2 is Object);
  print(mix2 is Function);
  print(mix2() is Function);


  List eggs = [new Egg(), new Egg()];
  int eggWeight = getTheWeight(eggs, 30);
  print(eggWeight);
  Ingredient beatenEggs = combineIngredients(mix, eggs[0], eggs[1]);

  Ingredient weighedSugar = weighQty(new Sugar(), eggWeight);
  print(weighedSugar);
  Ingredient weighedMarge = weighQty(new Margarine(), eggWeight);
  print(weighedMarge);
  Ingredient weighedFlour = weighQty(new Flour(), eggWeight);
  print(weighedFlour);

  Ingredient buttercream = mix(weighedSugar, weighedMarge);
  print(buttercream);
  Ingredient eggyMix = mix(buttercream, beatenEggs);
  print(eggyMix);
  Ingredient cakeMix = mix(eggyMix, weighedFlour);
  print(cakeMix);

  var cake = bake(cakeMix);


}
