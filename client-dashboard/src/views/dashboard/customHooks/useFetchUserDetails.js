export default function useFetchUserDetails(details) {
    let userData = localStorage.getItem('user');
    userData = JSON.parse(userData);
    if(details == "email"){
        if( userData ){
            return userData.email;
        }
        return "None";
    } else if (details == "name"){
        if( userData ){
            return userData.name;
        }
        return "None";
    }
  return "None";
}
