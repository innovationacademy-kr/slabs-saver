let AWS = require("aws-sdk");
const path = require("path");
AWS.config.loadFromPath(path.join(__dirname, "../../config/awsconfig.json")); // 인증을 위한 json
let s3 = new AWS.S3();
let multer = require("multer");
let multerS3 = require('multer-s3');

/**
 * s3ImageUpload.single('picture')  사용하는곳에서는 이런식으로 사용한다.
 * 프론트에서 FormData를 사용해 전달하는데 그때 이미지를 넣은 key값을 파라미터로 전달해주면된다.
 */
let s3ImageUpload = (config) => multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.S3_BUCKET,// 버켓이름
		key: function (req, file, cb) {
			const extension = path.extname(file.originalname); // 확장자
			const filename = Date.now().toString() + extension; // 파일명 전달
			const folder = config.folder ? `${config.folder}/` : '';
			cb(null, folder + filename)
		},
		acl: 'public-read', // 권한 설정
		contentType: multerS3.AUTO_CONTENT_TYPE // 파일의 메타데이터중 content-type 설정을 자동으로 맞춰줌
	})
})

module.exports = {
	s3ImageUpload
}