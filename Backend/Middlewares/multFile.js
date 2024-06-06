const multer = require('multer');
const path = require('path');
const fs = require('fs');
const road = '../public/assets/forms-articles/';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, road));
    },
    filename: function (req, file, cb) {
        const filePath = path.join(__dirname, road, file.originalname);
        if (fs.existsSync(filePath)) {
            deleteFile(filePath);
        }
        cb(null, file.originalname);
    }
});

const deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Erreur lors de la suppression du fichier :', err);
        } else {
            console.log('Fichier supprimé avec succès');
        }
    });
};

const upload = multer({ storage: storage });

module.exports = upload;