const assert = require('assert');
const core = require('./oop');
const {Point3D} = require("./oop");

describe('ООП', () => {
    describe('#Point', () => {
        it('Точка создается с двумя параметрами, которые становятся x и y', () => {
            const point = new core.Point(1, 2);

            assert.strictEqual(point.x, 1);
            assert.strictEqual(point.y, 2);
        });

        it('Точка создается без параметров, x и y принимают нули как значение по умолчанию', () => {
            const point = new core.Point();

            assert.strictEqual(point.x, 0);
            assert.strictEqual(point.y, 0);
        });

        it('Точка создается с одним параметром, x принимает значение, y принимают нуль как значение по умолчанию', () => {
            const point = new core.Point(1);

            assert.strictEqual(point.x, 1);
            assert.strictEqual(point.y, 0);
        });
    });

    describe('#Point3D', () => {
        it('Точка создается с двумя параметрами, которые становятся x и y, z принимает нуль как значение по умолчанию', () => {
            const point = new core.Point3D(1, 2);

            assert.strictEqual(point.x, 1);
            assert.strictEqual(point.y, 2);
            assert.strictEqual(point.z, 0);
        });

        it('Точка создается с тремя параметрами, которые становятся x, y, z', () => {
            const point = new core.Point3D(1, 2.5, -3);

            assert.strictEqual(point.x, 1);
            assert.strictEqual(point.y, 2.5);
            assert.strictEqual(point.z, -3);
        });

        it('Point3D имеет статический метод vectorLength', () => {
            const pointA = new core.Point3D(1, 2, -3);
            const pointB = new core.Point3D(1, -1, 1);

            assert.strictEqual(typeof Point3D.vectorLength, 'function');

            const length = Point3D.vectorLength(pointA, pointB);

            assert.strictEqual(length, 5);
        });
    });

    describe('#Queue', () => {
        it('проверка массивом', () => {
            const queue = new core.Queue([0,1,2,3,4]);
            let arr = [];
            for(let i = 0;i<5;i++) arr.push(queue.Dequeue());
            let result = true;
            for(let i = 0;i<5;i++){
                if(arr[i]!=i) result = false;
            }
            assert.strictEqual(result, true);
        });

        it('проверка на пограничные случаи', () => {
            const queue = new core.Queue();
            queue.Enqueue(0);
            queue.Enqueue(1);
            queue.Enqueue(2);
            let result = true;
            for(let i = 0;i<3;i++){
                if(queue.arr[i]!=i) result = false;
            }
            assert.strictEqual(result, true);
        });

        it('может создаться из массива', () => {
            const queue = new core.Queue([0,1,2,3,4]);
            let result = true;
            for(let i = 0;i<queue.arr.length;i++){
                if(queue.arr[i]!=i){
                    result = false;
                    break;
                } 
            }
            assert.strictEqual(result, true);
        });
    });
});
