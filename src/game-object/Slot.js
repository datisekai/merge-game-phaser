import Phaser from "phaser";

const CELL_SIZE = 100

//Lập trình kéo icon move theo cursor
//Bắt sự kiện thả chuột, biết được icon nào vừa thả A
//

export default class Slot extends Phaser.GameObjects.Sprite{
    constructor(scene, row, col){
        const x = CELL_SIZE * (col + 0.5);
        const y = CELL_SIZE * (row + 0.5);
    
        super(scene, x, y, 'slot');
    
        this.row = row;
        this.col = col;
        this.scene = scene;
    
        this.key = 'slot';
    
        scene.add.existing(this)

        this.setScale(0.7)
        this.setSize(this.width * 0.7, this.height * 0.7)
    
    }
}