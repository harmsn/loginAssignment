import {useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd';
import AuthService from '../Services/login';
import { useNavigate } from "react-router-dom";


function Profile(props) {

  const [userProfile,setProfile] = useState(props?.user?.profile);
  let navigate = useNavigate();

  console.log(props?.user?.profile?._id,props?.user?.profile?.token);

  function logOut(){
    let token = localStorage.getItem('token');
    AuthService.logout(props?.user?.profile?._id,props?.user?.profile?.token).then(res=> {
      navigate('/login');
    }).catch(err=>{
      console.log(err);
    })
  }

  return (
    <>
     <div><p>{userProfile?.firstName}</p>
      <p>{userProfile?.email}</p>
      <p>{userProfile?.expertise}</p>
      <Button onClick={logOut}>Logout</Button></div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    user: state.profile
  };
};

export default connect(
  mapStateToProps
)(Profile)