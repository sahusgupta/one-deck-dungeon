class Dice {
    sides: number = 6;
    value: number;

    constructor(v: number){this.value = v}
    roll(): number {
        this.value = Math.floor(Math.random() * this.sides) + 1
        return this.value;
    }
}

export {Dice}