namespace SpriteKind {
    export const Fuel = SpriteKind.create()
    export const Tendies = SpriteKind.create()
    export const PPH = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Tendies, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeScoreBy(50)
    sprite.destroy()
    music.baDing.play()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Banana = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . e e e e e . . . . 
        . . . . . . . 5 5 5 5 5 . . . . 
        . . . . . . 5 5 4 5 4 5 . . . . 
        . . . . . 5 5 4 4 5 4 5 . . . . 
        . . . 5 5 5 4 4 5 5 4 5 . . . . 
        . 5 5 5 5 4 4 5 5 5 4 5 . . . . 
        5 5 5 4 4 4 5 5 4 4 5 5 . . . . 
        5 5 4 4 5 5 5 4 5 5 5 . . . . . 
        . . . 5 5 5 4 4 5 5 . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 0, -50)
    music.pewPew.play()
})
sprites.onOverlap(SpriteKind.Fuel, SpriteKind.Player, function (sprite, otherSprite) {
    statusbar.value = 100
    sprite.destroy()
    music.powerUp.play()
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    info.changeScoreBy(-5 - 0.25 * info.score())
    sprite.destroy(effects.disintegrate, 100)
    scene.cameraShake(4, 500)
    music.bigCrash.play()
})
function Ladders_Destroyed (mySprite: Sprite, mySprite2: Sprite) {
    mySprite.destroy()
    mySprite2.destroy(effects.disintegrate, 100)
    if (Math.percentChance(25)) {
        Tendies = sprites.create(img`
            . . . . . d . . . d d . . . . . 
            . . . . . d d . . d d . . . . . 
            . . . . . d . . . . d . . . . . 
            . . . . . . 4 . . . . . 4 . . . 
            . . . . . 4 4 e e e 4 4 4 . . . 
            . . . 4 4 4 e 4 4 e 4 4 . . . . 
            . . . . 4 4 e 4 4 e 4 4 . . . . 
            . . . . 1 1 1 1 1 1 1 1 . . . . 
            . . . . 2 2 1 2 2 1 2 2 . . . . 
            . . . . 2 2 1 2 2 1 2 2 . . . . 
            . . . . 2 2 1 2 2 1 2 2 . . . . 
            . . . . 2 2 1 2 2 1 2 2 . . . . 
            . . . . 2 2 1 2 2 1 2 2 . . . . 
            . . . . 2 2 1 2 2 1 2 2 . . . . 
            . . . . 1 1 1 1 1 1 1 1 . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Tendies)
        Tendies.x = mySprite2.x
        Tendies.y = mySprite2.y
    }
    music.smallCrash.play()
}
info.onLifeZero(function () {
    game.showLongText("You paper handed!", DialogLayout.Bottom)
    game.over(true)
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.showLongText("This is as far as we got!", DialogLayout.Bottom)
    game.over(true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    Ladders_Destroyed(sprite, otherSprite)
})
let Diamond: Sprite = null
let Ladder_Attack: Sprite = null
let Tendies: Sprite = null
let Banana: Sprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
game.showLongText("To the Moon!                   1.- Shoot bannanas at the ladder attack!         2.-Collect diamonds to fuel our rocket       3.- Collect Tendies to increase the Value of our Stock!             4.-See you at the moon brother!", DialogLayout.Full)
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . 2 . . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . 2 2 2 2 2 . . . . . . 
    . . . . 2 2 2 2 2 2 2 . . . . . 
    . . . . 9 9 9 9 9 9 9 . . . . . 
    . . . . 9 9 9 8 9 9 9 . . . . . 
    . . . . 9 9 8 8 8 9 9 . . . . . 
    . . . . 9 9 8 8 8 9 9 . . . . . 
    . . . . 9 9 9 8 9 9 9 . . . . . 
    . . . . 9 9 9 9 9 9 9 . . . . . 
    . . . . 9 9 9 9 9 9 9 . . . . . 
    . . . 2 2 9 9 9 9 9 2 2 . . . . 
    . . 2 2 2 . . 2 . . 2 2 2 . . . 
    . . 2 2 . . . 2 . . . 2 2 . . . 
    . . 2 . . . . 2 . . . . 2 . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -20, 0)
info.setLife(10)
music.beamUp.play()
game.onUpdateInterval(500, function () {
    if (info.score() > 1000) {
        if (info.score() > 5000) {
            Ladder_Attack = sprites.createProjectileFromSide(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . e . . . . e . . . . . . 
                . . . . e e e e e e . . . . . . 
                . . . . e . . . . e . . . . . . 
                . . . . e e e e e e . . . . . . 
                . . . . e . . . . e . . . . . . 
                . . . . e e e e e e . . . . . . 
                . . . . e . . . . e . . . . . . 
                . . . . e e e e e e . . . . . . 
                . . . . e . . . . e . . . . . . 
                . . . . e e e e e e . . . . . . 
                . . . . e . . . . e . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, randint(25, 55), 80)
            Ladder_Attack.x = randint(5, 155)
            Ladder_Attack.setKind(SpriteKind.Enemy)
        }
        Ladder_Attack = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . e . . . . e . . . . . . 
            . . . . e e e e e e . . . . . . 
            . . . . e . . . . e . . . . . . 
            . . . . e e e e e e . . . . . . 
            . . . . e . . . . e . . . . . . 
            . . . . e e e e e e . . . . . . 
            . . . . e . . . . e . . . . . . 
            . . . . e e e e e e . . . . . . 
            . . . . e . . . . e . . . . . . 
            . . . . e e e e e e . . . . . . 
            . . . . e . . . . e . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, randint(5, 25), 65)
        Ladder_Attack.x = randint(5, 155)
        Ladder_Attack.setKind(SpriteKind.Enemy)
    }
    Ladder_Attack = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . e . . . . e . . . . . . 
        . . . . e e e e e e . . . . . . 
        . . . . e . . . . e . . . . . . 
        . . . . e e e e e e . . . . . . 
        . . . . e . . . . e . . . . . . 
        . . . . e e e e e e . . . . . . 
        . . . . e . . . . e . . . . . . 
        . . . . e e e e e e . . . . . . 
        . . . . e . . . . e . . . . . . 
        . . . . e e e e e e . . . . . . 
        . . . . e . . . . e . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, 0, 50)
    Ladder_Attack.x = randint(5, 155)
    Ladder_Attack.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(500, function () {
    statusbar.value += -5
})
game.onUpdateInterval(100, function () {
    if (info.score() < 0) {
        game.showLongText("The HF Bankrupted GME!! But dont worry this is a simulation! keep the Diamond hands!", DialogLayout.Bottom)
        game.over(false)
    }
})
game.onUpdateInterval(200, function () {
    info.changeScoreBy(1)
    if (info.score() > 250) {
        if (info.score() > 500) {
            if (info.score() > 1000) {
                info.changeScoreBy(50)
            }
            info.changeScoreBy(5)
        }
        info.changeScoreBy(2)
    }
})
game.onUpdateInterval(4500, function () {
    Diamond = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 9 9 6 6 6 9 9 . . . . . 
        . . . 9 9 6 9 6 9 6 9 9 . . . . 
        . . 9 9 6 9 9 6 9 9 6 9 9 . . . 
        . 9 6 6 6 6 6 6 6 6 6 6 6 9 . . 
        . . 9 9 6 9 9 6 9 9 6 9 9 . . . 
        . . . 9 9 6 9 6 9 6 9 9 . . . . 
        . . . . 9 9 6 6 6 9 9 . . . . . 
        . . . . . 9 6 6 6 9 . . . . . . 
        . . . . . . 9 6 9 . . . . . . . 
        . . . . . . . 6 . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, 0, 50)
    Diamond.x = randint(5, 155)
    Diamond.y = 0
    Diamond.setKind(SpriteKind.Fuel)
})
