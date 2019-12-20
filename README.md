# Jaipur

Jaipur is a web adaptation of the homonymous board game in which the player will be competing against the machine to become the best (and richer) trader. 

![game gif](images/main.gif)

## Rules
As this is a simpler version, there won't be any camels and it'll be a one round game, but the rules are essentially the same as in the original game. Each turn you can either take one card from the market, exchange several goods (at least two) at the market or choose one type of good to sell. Selling goods will give you points in the form of goods token and/or bonus tokens. The game ends if there are no cards left in the draw pile or three types of goods token are unavailable. Player with the highest score wins the game!  
Be aware that there are some aditional rules to the game, so go ahead and take a look at them before playing [[EN]](https://www.fgbradleys.com/rules/rules2/Jaipur-rules.pdf) - [[ES]](https://www.jugonesweb.com/wp-content/uploads/2016/05/Instrucciones-Jaipur.pdf).

## Demo
Live version: *coming soon*

## Features
* Landing page shows game's title and a start button
* When user clicks start button, instructions are displayed along with the board
* The user can click the question mark icon on the right top of the screen to display the game rules at any time  
* When the round ends, a scoreboard and a final message are shown

![Win message and scoreboard](images/win-screen.png)

**To do:**
* Improve machine's intelligence so that their actions are not actually aimless
* Include camels from the original board game

## Technologies
* HTML5 and CSS3 to get the structure and styling of the game
* JavaScript for DOM manipulation, event handling and overall game's functionality 

## Author
This game was built by [@AnaSegarra](https://github.com/AnaSegarra) for the Ironhack Web Dev Bootcamp in December of 2019.
