
const User = function (id,firstName,lastName,phone,gender){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.gender=gender;

}

User.fromJson = (object) => {
    return new User( object["$"]["id"], object["firstName"], object["lastName"], object["phone"] , object["gender"]);
} 

module.exports = { User }