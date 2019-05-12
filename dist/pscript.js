//background image
console.log("hello");
        var raster = new Raster('smokey');
        raster.position = view.center;
        raster.opacity = 0.95;
        raster.size = view.size;

        // var sound = new Howl({
        //     src: ['squiggle.mp3']      
        // });

        //state of animation
        var up = 1;
        var expand = 1;
        var color = 0;

        //set up lineGroup
        var lineCount = 2500;
        var lineGroup = new Group();
        for (var i = 0; i < lineCount; i++) {
            var linePath = new Path.Line([0, 0], [0,0]);
            lineGroup.addChild(linePath);
        }
        lineGroup.strokeColor = "rgba(0, 0, 0, .15)";
        lineGroup.strokeWidth = 3;

        //need to change this!
        var path1 = new Path({
            segments: [[174, 73], [199, 172], [238, 72],[280, 165], [311, 74], [344, 167], [376, 70], [372, 262], [342, 164], [310, 259], [280, 159], [256, 264], [196, 163], [182, 253], [213, 349], [254, 261], [280, 346], [308, 253], [345, 339], [371, 255], [388, 333], [344, 338], [278,344], [211, 347],[181, 344], [173, 65], [236, 70], [309, 73], [376, 70]]  
        });

        path1.position = view.center;
        path1.smooth();

        var path2 = path1.clone();
        path1.scale(1);
        path2.scale(1);

        var length1 = path1.length;
        var length2 = path2.length;
        path1.rotate(1);

        function onResize(event){
            path1.position = view.center;
            path2.position = view.center;
            raster.position = view.center
            raster.size = view.size;

        }
        function onFrame(event) {
            var vector = new Point({
                angle: -event.count % 360,
                length: 100
            });
            if (event.count%50 == 0 && event.count!= 0){
                if (expand==1){expand = 0;}
                else{expand=1;}
            }
            if(expand==1){
                path1.rotate(-0.05);
            }
            else{
                path1.rotate(0.05);
            }
            if(event.count){
                if(up==1){
                    lineGroup.strokeColor = "rgba(" + color + ", " + color + ", " + color + ", .15)"
                    color++;
                    if (color == 230){
                        up = 0;
                    }
                }
                else{
                    if (color == 200){
                        up = 1;
                    }
                    color--
                    lineGroup.strokeColor = "rgba(" + color + ", " + color + ", " + color + ", .15)"
                }
            }

            for (var i = 0; i < lineCount; i++) {
                var path = lineGroup.children[i];
                var l1 = (length1 / lineCount * (i + event.count / 10)) % length1;
                var l2 = (length2 / lineCount * (i + event.count / 10)) % length2;
                path.firstSegment.point = path1.getPointAt(l1),
                path.lastSegment.point = path2.getPointAt(l2);
            }

        }