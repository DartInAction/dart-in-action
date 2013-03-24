part of cake_baking;

class Ingredient {
  num weight;

  get name => super.toString().substring(12);

  Ingredient operator +(Ingredient other) {
    return new MixedIngredient(name, other.name);
  }

  Ingredient operator *(num multiplier) {
    this.weight = this.weight * multiplier;
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

class Sugar extends Ingredient {
   Sugar() {
    this.weight = 1;
   }
}

class Margarine extends Ingredient {
  Margarine() {
   this.weight = 1;
  }
}

class Flour extends Ingredient {
  Flour() {
    this.weight = 1;
  }
}

class Egg extends Ingredient {
  Egg() {
    this.weight = 60; // 60g
  }
}


class Cake extends Ingredient {
  Cake(mixture) {

  }

}