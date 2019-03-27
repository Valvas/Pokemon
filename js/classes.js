/****************************************************************************************************/

class Pokemon
{
  constructor(name, level, hp, attack, defense, speed, competence)
  {
    this.name = `${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`;
    this.level = Math.floor(level) < 1 ? 1 : Math.floor(level);
    this.maxHp = Math.floor(hp) < 1 ? 1 : Math.floor(hp);
    this.currentHp = Math.floor(hp) < 1 ? 1 : Math.floor(hp);
    this.attack = Math.floor(attack) < 1 ? 1 : Math.floor(attack);
    this.defense = Math.floor(defense) < 1 ? 1 : Math.floor(defense);
    this.speed = Math.floor(speed) < 1 ? 1 : Math.floor(speed);
    this.competence = competence;
  }
}

/****************************************************************************************************/

class Competence
{
  constructor(name, power, accuracy)
  {
    this.name = `${name.charAt(0).toUpperCase()}${name.slice(1).toLowerCase()}`;
    this.power = Math.floor(power) < 1 ? 1 : Math.floor(power);
    this.accuracy = Math.floor(accuracy) < 1 ? 1 : Math.floor(accuracy) > 100 ? 100 : Math.floor(accuracy);
  }
}

/****************************************************************************************************/
