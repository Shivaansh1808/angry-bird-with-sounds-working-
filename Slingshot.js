class SlingShot{
    constructor(bodyA, pointB){
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.04,
            length: 10
        }
        this.sling1 = loadImage("sprites/sling1.png");
        this.sling2 = loadImage("sprites/sling2.png");
        this.sling3 = loadImage("sprites/sling3.png");
        this.pointB = pointB
        this.sling = Constraint.create(options);
        World.add(world, this.sling);
    }

    fly(){
        this.sling.bodyA = null;
    }

    beforeBird(){
        image(this.sling1, 200, 70, 40, 150);
        
        if(this.sling.bodyA){
            var pointA = this.sling.bodyA.position;
            var pointB = this.pointB;
            strokeWeight(8);
            stroke(50, 23, 8);
            if(pointA.x < 220){
                line(pointA.x - 20, pointA.y, pointB.x + 25, pointB.y - 3);
            }else{
                line(pointA.x + 20, pointA.y, pointB.x + 25, pointB.y - 3);
            }
        }
    }
    afterBird(){
        image(this.sling2, 173, 70, 40, 90);
        if(this.sling.bodyA){
            var pointA = this.sling.bodyA.position;
            var pointB = this.pointB;
            strokeWeight(8);
            stroke(50, 23, 8);
            if(pointA.x < 220){
                line(pointA.x - 20, pointA.y, pointB.x - 10, pointB.y);
                image(this.sling3, pointA.x - 25,pointA.y - 10, 10, 20);
            }else{
                line(pointA.x + 25, pointA.y, pointB.x - 10, pointB.y);
                image(this.sling3, pointA.x + 25,pointA.y - 10, 10, 20);
            }
            
        }
    }

    attach(body){
        this.sling.bodyA = body;
    }
    
}