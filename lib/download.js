const {promisify}=require('util')
const downloadPromisfy=promisify(require('download-git-repo'));
module.exports.download=async function(remoteUrl,projectName){
   try {
     await downloadPromisfy(remoteUrl,projectName)
   } catch (error) {
     throw (error)
   }
}

