(function() {
    var videoControls = document.getElementById('video-controls');
    var video = document.getElementById('video');
    var playButton = document.getElementById('play-button');
    var playOuter = document.getElementById('outer');
    var playInner = document.getElementById('inner');
    var resume = document.getElementById('resume-text')
    var canvas = document.getElementById('progress');
    var ctx = canvas.getContext('2d');
    var duration = 60;
    videoControls.setAttribute('data-state', 'visible');

    function calcPoints(max) {
        // Calculate x,y coords for progress arc at 3 degree intervals
        var points=[]
        for(var i=0; i<Math.floor(max/(2*Math.PI)*360); i=i+3){
            var x=49*Math.cos(Math.PI/2-(i/360*2*Math.PI))+50;
            var y=49*Math.sin(3*Math.PI/2-(i/360*2*Math.PI))+50;
            points.push({x:x,y:y});
        };
        return(points);
    };

    videoControls.addEventListener("click", function(e){
        if (video.paused || video.ended) {
            // User clicks button when video is paused
            playButton.setAttribute('data-state','pause');
            playButton.classList.add("video-btn-active");
            playInner.classList.remove("video-detail-inner-active");
            playOuter.classList.add("video-detail-outer-active");
            resume.classList.remove("reveal");
            ctx.clearRect(0,0,100,100);
            video.play();
        }
        else {
            // User clicks button when video is playing
            playButton.setAttribute('data-state','play');
            playButton.classList.remove("video-btn-active");
            playInner.classList.remove("video-detail-inner-active");
            playOuter.classList.add("video-detail-outer-active");
            var progress = video.currentTime;
            var angle = (progress/duration*2*Math.PI);
            var points = calcPoints(angle);
            var t=1;
            function animate() {
                // Draw progress arc
                if(t<points.length-1) {
                    requestAnimationFrame(animate);
                }
                ctx.lineWidth=2;
                ctx.strokeStyle="#FF1A3E";                
                ctx.beginPath();
                ctx.moveTo(points[t-1].x, points[t-1].y);
                ctx.lineTo(points[t].x, points[t].y);
                ctx.stroke();
                t++;
            };
            animate();
            resume.classList.add("reveal"); // Reveal 'RESUME'
            video.pause();
        }
    });
    videoControls.addEventListener("mouseenter", function(e){
        if (video.paused || video.ended) {
            // Mouse enters video area when video is paused
            playInner.classList.add("video-detail-inner-active");
            playOuter.classList.add("video-detail-outer-active");
            ctx.clearRect(0,0,100,100);
        }
        else {
            // Mouse enters video area when video is playing
            playButton.classList.remove("video-btn-active");
            playInner.classList.add("video-detail-inner-active");
            playOuter.classList.add("video-detail-outer-active");
        }
    });
    videoControls.addEventListener("mouseleave", function(e){
        if (video.paused || video.ended) {
            // Mouse leaves video area when video is paused
            playInner.classList.remove("video-detail-inner-active");
            playOuter.classList.remove("video-detail-outer-active");
        }
        else {
            // Mouse leaves video area when video is playing
            playButton.classList.add("video-btn-active");
            playInner.classList.remove("video-detail-inner-active");
            playOuter.classList.add("video-detail-outer-active");
        }
    });
})();