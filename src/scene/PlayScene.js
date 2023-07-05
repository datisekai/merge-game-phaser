import Phaser from "phaser";
import Icon from "../game-object/Icon";
import Slot from "../game-object/Slot";

export default class PlayScene extends Phaser.Scene {
  constructor() {
    super("play-scene");
    this.map = [[], [], [], []];
    this.dragObject = null;
  }

  preload() {
    this.load.image("icon-1", "images/64X64/1.png"); //Đỏ
    this.load.image("icon-2", "images/64X64/2.png"); //trắng
    this.load.image("icon-3", "images/64X64/3.png"); //vàng
    this.load.image("slot", "images/tile/02.png");
  }

  create() {
    this.slots = this.add.group();

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const slot = new Slot(this, row, col);
        this.slots.add(slot);
      }
    }

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const level = Phaser.Math.Between(1, 2);
        const icon = new Icon(this, level, row, col);
        this.map[row][col] = icon;
        icon.setInteractive();
      }
    }

    this.input.on("pointerdown", this.startDrag, this);
    this.input.setDefaultCursor("pointer");
  }

  startDrag(pointer, targets) {
    if (targets.length == 0) {
      return;
    }

    this.dragObject = targets[0];
    this.input.off("pointerdown", this.startDrag, this);
    this.input.on("pointermove", this.doDrag, this);
    this.input.on("pointerup", this.stopDrag, this);
  }

  doDrag(pointer) {
    const { x, y } = pointer;
    this.dragObject.x = x;
    this.dragObject.y = y;
  }

  mergeIcon(objectA, objectB) {
    objectB.levelUp();
    objectA.randomLevel();
    objectA.back();


    this.dragObject = null;
  }

  stopDrag() {
    let flag = false;
    for (let i = 0; i < this.slots.getChildren().length; i++) {
      const current = this.slots.getChildren()[i];
      const boundSlot = current.getBounds();
      const boundIcon = this.dragObject.getBounds();

      const isIntersects = Phaser.Geom.Intersects.RectangleToRectangle(
        boundIcon,
        boundSlot
      );

      if (isIntersects) {
        const nextIcon = this.map[current.row][current.col];
        if (
          this.dragObject.level !== nextIcon.level ||
          this.dragObject.level == 3 ||
          current.level == 3 || (this.dragObject.row == current.row && this.dragObject.col == current.col)
        ) {
          break;
        }

        flag = true;
        this.mergeIcon(this.dragObject, nextIcon);
        break;
      }
    }

    if (!flag) {
      this.dragObject.back();
    }

    this.input.on("pointerdown", this.startDrag, this);
    this.input.off("pointermove", this.doDrag, this);
    this.input.off("pointerup", this.stopDrag, this);
  }
}
