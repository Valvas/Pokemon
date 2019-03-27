/****************************************************************************************************/

const thundershock = new Competence('thundershock', 40, 100);
const thunder = new Competence('thunder', 120, 70);
const vineWhip = new Competence('vine whip', 35, 100);
const powerWhip = new Competence('power whip', 120, 85);

const bottomPokemon = new Pokemon('pikachu', 5, 35, 55, 40, 90, thundershock);
const topPokemon = new Pokemon('bulbasaur', 5, 45, 49, 49, 45, vineWhip);

/****************************************************************************************************/

const firstOpponent = bottomPokemon.speed >= topPokemon.speed ? bottomPokemon : topPokemon;
const secondOpponent = bottomPokemon.speed >= topPokemon.speed ? topPokemon : bottomPokemon;

const logsList = document.getElementById('logsList');

logsList.innerHTML += `<div class="logsListElement">A fight begins between <span class="pokemon">${bottomPokemon.name}</span> and <span class="pokemon">${topPokemon.name}</span> !</div></br>`;

prepareFight();

/****************************************************************************************************/

function prepareFight()
{
  document.getElementById('bottomOpponentName').innerText = bottomPokemon.name;
  document.getElementById('bottomOpponentHealthStatus').innerText = `${bottomPokemon.currentHp} / ${bottomPokemon.maxHp} HP`;

  document.getElementById('topOpponentName').innerText = topPokemon.name;
  document.getElementById('topOpponentHealthStatus').innerText = `${topPokemon.currentHp} / ${topPokemon.maxHp} HP`;

  setTimeout(() =>
  {
    startFight();
  }, 1000);
}

/****************************************************************************************************/

function startFight()
{
  fightRound(firstOpponent, secondOpponent, firstOpponent === bottomPokemon);
}

/****************************************************************************************************/

function fightRound(attackingOpponent, attackedOpponent, isBottomPokemon)
{
  logsList.innerHTML += `<div class="logsListElement"><span class="pokemon">${attackingOpponent.name}</span> uses <span class="attack">${attackingOpponent.competence.name}</span></div>`;
  logsList.scrollTop = logsList.scrollHeight;

  if(checkIfAttackSucceeds(attackingOpponent) == false)
  {
    logsList.innerHTML += `<div class="logsListElement"><span class="pokemon">${attackingOpponent.name}</span> misses !</div></br>`;
    logsList.scrollTop = logsList.scrollHeight;

    setTimeout(() =>
    {
      fightRound(attackedOpponent, attackingOpponent, isBottomPokemon ? false : true);
    }, 1000);
  }

  else
  {
    const damages = calculateDamages(attackingOpponent, attackedOpponent);

    logsList.innerHTML += `<div class="logsListElement"><span class="pokemon">${attackedOpponent.name}</span> takes <span class="damages">${damages}</span> damages !</div></br>`;
    logsList.scrollTop = logsList.scrollHeight;

    const newCurrentHp = attackedOpponent.currentHp - damages < 0 ? 0 : attackedOpponent.currentHp - damages;

    var a = true;
    var b = 0;

    const blinkInterval = setInterval(() =>
    {
      if(isBottomPokemon)
      {
        a
        ? document.getElementById('topOpponentGif').style.display = 'none'
        : document.getElementById('topOpponentGif').removeAttribute('style');
      }

      else
      {
        a
        ? document.getElementById('bottomOpponentGif').style.display = 'none'
        : document.getElementById('bottomOpponentGif').removeAttribute('style');
      }

      a = a ? false : true;

      if((b += 1) === 4)
      {
        clearInterval(blinkInterval);
      }
    }, 110);

    const takeOffHpInterval = setInterval(() =>
    {
      attackedOpponent.currentHp -= 1;

      if(isBottomPokemon)
      {
        document.getElementById('topOpponentHealthStatus').innerText = `${topPokemon.currentHp} / ${topPokemon.maxHp} HP`;
        document.getElementById('topOpponentHealthFiller').style.width = `${(topPokemon.currentHp * 100) / topPokemon.maxHp}%`;
        document.getElementById('topOpponentHealthFiller').style.backgroundColor = `#${getFillerColor(Math.floor((topPokemon.currentHp * 100) / topPokemon.maxHp))}`;
      }

      else
      {
        document.getElementById('bottomOpponentHealthStatus').innerText = `${bottomPokemon.currentHp} / ${bottomPokemon.maxHp} HP`;
        document.getElementById('bottomOpponentHealthFiller').style.width = `${(bottomPokemon.currentHp * 100) / bottomPokemon.maxHp}%`;
        document.getElementById('bottomOpponentHealthFiller').style.backgroundColor = `#${getFillerColor(Math.floor((bottomPokemon.currentHp * 100) / bottomPokemon.maxHp))}`;
      }

      if(attackedOpponent.currentHp === newCurrentHp)
      {
        clearInterval(takeOffHpInterval);

        if(attackedOpponent.currentHp === 0)
        {
          logsList.innerHTML += `<div class="logsListElement"><span class="pokemon">${attackedOpponent.name}</span> fainted !</div>`;
          logsList.innerHTML += `<div class="logsListElement"><span class="pokemon">${attackingOpponent.name}</span> wins !</div>`;
          logsList.scrollTop = logsList.scrollHeight;

          isBottomPokemon
          ? document.getElementById('topOpponentGif').style.display = 'none'
          : document.getElementById('bottomOpponentGif').style.display = 'none';
        }

        else
        {
          setTimeout(() =>
          {
            fightRound(attackedOpponent, attackingOpponent, isBottomPokemon ? false : true);
          }, 1000);
        }
      }

    }, 100);
  }
}

/****************************************************************************************************/

function checkIfAttackSucceeds(pokemon)
{
  return Math.floor(Math.random() * 100) < pokemon.competence.accuracy;
}

/****************************************************************************************************/

function calculateDamages(attackingOpponent, attackedOpponent)
{
  return (Math.floor(Math.floor(Math.floor((2 * attackingOpponent.level / 5) + 2) * (attackingOpponent.attack * attackingOpponent.competence.power) / attackedOpponent.defense) / 50) + 2);
}

/****************************************************************************************************/

function getFillerColor(percentage)
{
  return percentage >= 90
  ? '5CB85C'
  : percentage >= 80
  ? '69AC5A'
  : percentage >= 70
  ? '77A159'
  : percentage >= 60
  ? '859657'
  : percentage >= 50
  ? '938B56'
  : percentage >= 40
  ? 'A17F54'
  : percentage >= 30
  ? 'AF7453'
  : percentage >= 20
  ? 'BD6951'
  : percentage >= 10
  ? 'CB5E50'
  : 'D9534F';
}

/****************************************************************************************************/
