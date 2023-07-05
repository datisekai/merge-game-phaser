import Phaser from "phaser";

const CELL_SIZE = 100;

export default class Icon extends Phaser.GameObjects.Sprite {
  constructor(scene, level, row, col) {
    const x = CELL_SIZE * (col + 0.5);
    const y = CELL_SIZE * (row + 0.5);
    const texture = "icon-" + level;

    super(scene, x, y, texture);

    this.level = level;
    this.row = this.row0 = row;
    this.col = this.col0 = col;
    this.scene = scene;

    this.key = texture;

    scene.add.existing(this);


  }

  back(){
    this.x = CELL_SIZE * (this.col0 + 0.5);
    this.y = CELL_SIZE * (this.row0 + 0.5);
  }

  randomLevel(){
    const level = Phaser.Math.Between(1, 2);
    this.level = level;
    this.setTexture( "icon-" + this.level)
  }

  levelUp(){
    if(this.level < 3){

      this.level += 1
      this.setTexture( "icon-" + this.level)
    }
  }

}
