// export a function which is publically available to my route file
module.exports.home = function(request,response){
    return response.end('<h1>Express is up for codial</h1>');
}