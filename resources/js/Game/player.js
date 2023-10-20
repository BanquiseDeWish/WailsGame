export default class Player {
    constructor(id, name, points) {
        this.id = id;
        this.name = name;
        this.points = points;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getPoints() {
        return this.points;
    }

    addPoints(points) {
        this.points += points;
    }

    removePoints(points) {
        this.points -= points;
    }
}