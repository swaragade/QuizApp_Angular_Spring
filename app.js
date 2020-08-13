'use strict';
const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const tempService = process.env.PY_ENDPOINT || "http://localhost:8080/";
const tempCalc = `${tempService}/api/temp`;
const imageCrop=`${tempService}/api/crop`;

// Init app
const app = express();

var cors = require('cors')
var fs=require('fs');
var spawn = require("child_process").spawn;
var filepath=path.join(__dirname, './public/uploads/');
const request = require('request');
var croppedImage='';
var imageName='';
var temperature=''

// Constants ...
const port = 8000;

//to enable cross origin
app.use(cors());

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

const bodyParser = require("body-parser");

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

// create application/json parser
var jsonParser = bodyParser.json();


// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
	  console.log("file---->"+file);
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).fields([{name: 'image', maxCount: 1}, {name: 'xray', maxCount: 1}]);


// Check File Type
function checkFileType(file, cb){
	console.log("check file type :: " + file);
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

//upload image
app.post('/uploadImage', (req, res) => {
  
  var cropImgName = '';
  console.log("request reached");
  console.log(req.body);
  upload(req, res, (err) => {
    console.log("err " + err);
    if(err){
      console.log("request error");
      res.json({
        errorMessage: err
      });
    } else {
		console.log("request else");
		  if(req.files.image == undefined || req.files.xray == undefined){
			
			console.log("request error");
			res.json({
			  errorMessage: 'Error: No File Selected!'
			});
			
		  } else {
			crop_and_temp(req,res);
		  }
    }
  });
});

var crop_and_temp = function ex(req,res){
	imageName=req.files.image[0].filename;
	var xrayImage=req.files.xray[0].filename;
	console.log('xrayImage 2:',xrayImage);
	var temp 
	getImageCropped(imageName, (temp)=>{
		console.log('temperature inside 2:',temp);
		temperature = temp;
	});
	console.log('temperature 2:',temperature);
	
	
	
	//getPersonIdentified(imageName);
	//getXrayAnalysisDetail(xrayImage);
	

	res.set('Content-Type' ,'text/json');
	res.json({
		name:"jeena",
		score:"1",
		xrayresult:"+ve",
		temperature:temperature,
		covidresult:"Covid +ve"
		});
}

function getImageCropped(imgName,callback)
{
	console.log("hitting crop: "+imageCrop);
    request.post(imageCrop , {
		   json: {
		     filename: imgName
		   }
	 }, function optionalCallback(error, response, body) {
		 if (error) {
		  return console.error('upload failed:', error);
		 }
		console.log('body : '+body);
		temperature = body.temperature;
		console.log('temperature1 inside:',temperature);
		callback(temperature);
		//return temperature;
		
	 });
}

function getPersonIdentified(Image){
	const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
	const { IamAuthenticator } = require('ibm-watson/auth');
	const visualRecognition = new VisualRecognitionV3({
	  version: '2018-03-19',
	  authenticator: new IamAuthenticator({
		apikey: 'PBgZZvV0uCxMALG95Cf1yh_C1prfcgF8ztEn-pNpRTUe',
	  }),
	  url: 'https://api.us-south.visual-recognition.watson.cloud.ibm.com/instances/61d41d02-cb88-4443-aa6d-b5108887ef0a',
	});
	const classifyParams = {
	  imagesFile: fs.createReadStream(croppedPath+Image),
	  owners: ['me'],
	  threshold: 0.6,
	  classifierIds: ['EmployeeIdentification_2040637369'],
	};
	visualRecognition.classify(classifyParams)
	  .then(response => {
		const classifiedImages = response.result;

	  var name="";
	 var score=0;
	 var classes = classifiedImages.images[0].classifiers[0].classes
	 if(classes.length==0){
	  name='not identified'
	  score='not identified'
	}
	else{
	  name=classes[0].class
	  score=classes[0].score
	  console.log('name:', name);
	  console.log('score:', score);
	}


	  })
	  .catch(err => {
		console.log('error:', err);
	  });
}

function getXrayAnalysisDetail(Image){
	const VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
	const { IamAuthenticator } = require('ibm-watson/auth');
	const visualRecognition = new VisualRecognitionV3({
	  version: '2018-03-19',
	  authenticator: new IamAuthenticator({
		apikey: 'nuojkVsP9x-9_uvSyURrjJpqxeKDUlzZbhWt_2KrdJHV',
	  }),
	  url: 'https://api.us-south.visual-recognition.watson.cloud.ibm.com/instances/888dfda1-54ba-4d04-bb55-cab2e91cf9f1',
	});
	const classifyParams = {
	  imagesFile: fs.createReadStream(filepath+Image),
	  owners: ['me'],
	  threshold: 0.6,
	  classifierIds: ['COVID_XRAY_MODEL_1078982883'],
	};
	visualRecognition.classify(classifyParams)
	  .then(response => {
		const classifiedImages = response.result;

	  var name="";
	 var score=0;
	 var classes = classifiedImages.images[0].classifiers[0].classes
	 if(classes.length==0){
	  name='not identified'
	  score='not identified'
	}
	else{
	  name=classes[0].class
	  score=classes[0].score
	  console.log('name:', name);
	  console.log('score:', score);
	}
	  })
	  .catch(err => {
		console.log('error:', err);
	  });
}


app.use('/images', express.static(__dirname + '/public/uploads'));
app.listen(port, () => console.log(`Server started on port ${port}`));
