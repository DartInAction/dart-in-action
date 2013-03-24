part of concrete_mix;

class Ingredient {
  num bags;


  get name => super.toString().substring(12);

  Ingredient operator +(Ingredient other) {
    return new MixedIngredient(name, other.name);
  }

  Ingredient operator *(num multiplier) {
    bags = bags * multiplier;
    return this;
  }

  toString() => "${super.toString().substring(12)}";
}

class MixedIngredient extends Ingredient {
  String mixtureOf;

  MixedIngredient(item1, item2) {
    mixtureOf = "$item1 and $item2";
  }

  toString() => "${super.toString()} containing: $mixtureOf";
}

class Sand extends Ingredient {
  Sand() {
   bags = 1;
  }
}

class Gravel extends Ingredient {
  Gravel() {
    bags = 1;
  }
}

class Water extends Ingredient {
  Water() {
    bags = 1;
  }
}

class Cement extends Ingredient {
  Cement() {
    bags = 1; // 1 bag
  }
}


class ConcreteMix {
  ConcreteMix(mixture, water) {

  }

}