const darknet = require('@moovel/yolo');

module.exports = function(RED) {
    function YOLODetect(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg){
	    var image = msg.payload;
	    console.log("Thresh: " + config.thresh);
            console.log("HThresh: " + config.hierThresh);

	    darknet.detectImage({
  		cfg: config.cfg,
  		weights: config.weights,
  		data: config.data,
  		image: image,
  		thresh: config.thresh,
  		hierThresh: config.hierThresh
	    }, function(modified, original, detections, dimensions) {
		msg.payload = detections
		node.send(msg);
	    });
        });
    }
    RED.nodes.registerType("yolo-detect",YOLODetect);
}
