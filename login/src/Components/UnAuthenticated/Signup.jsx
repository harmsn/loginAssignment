import {useState,useEffect} from 'react'
import InputField from "../Reusable/InputField"
import { patternPhone } from '../Utils/Validations'
import { Form, Button} from 'antd'
import AuthService from '../Services/login'
import { useLocation,useNavigate,Navigate } from "react-router-dom"
import 'antd/dist/antd.css'
import { connect } from 'react-redux'
import { addProfile } from '../Store/Actions'
import { error,success } from '../Utils/CommonFunctions'

function Signup({dispatch}) {
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [referal, setReferal] = useState("");
  const [flagValid,setFlagValid] = useState(false);
  const {state} = useLocation();
  const  email  = state?.email ? state?.email : ''; 
  let navigate = useNavigate();

  useEffect(()=>{
    if(firstName!==''&&(referal.length===6||referal.length===0)){
      setFlagValid(true);
    }else{
      setFlagValid(false);
    }
  },[firstName,lastName,referal,phone])

  const handleChange = (e,choice) => {
    if(choice === 1){
      setFirstName(e.target.value);
    }else if(choice === 2){
      setLastName(e.target.value);
    }else if(choice === 3){
      setPhone(e.target.value);
    }else if(choice === 4){
      setReferal(e.target.value);
    }
  }

  const onFinish = (values) => {
    if(referal.length===6){
      AuthService.verifyReferral(referal).then((res)=>{
        if((res?.data?.success)){
          AuthService.signUp(firstName,referal,email,localStorage.getItem('token')).then((res)=>{
            dispatch(addProfile(res?.data?.results?.user));
            navigate('/profile');
          }).catch(err=>{
            error(err);
          })
        }else{
          error(res?.data?.message);
        }
      }).catch(err=>{ 
        error(err);
      });
    }else{
      AuthService.signUp(firstName,referal,email,localStorage.getItem('token')).then((res)=>{
        dispatch(addProfile(res?.data?.results?.user));
        navigate('/profile');
      }).catch(err=>{
        error(err);
      })
    }
  };

  return (
    <>
      {localStorage.getItem('token') !==null ? 
        <div>
          <Form
          name="EmailForm"
          onFinish={onFinish}
          autoComplete="off"
          >
            <InputField placeholder={"Enter First Name"} name={firstName} onChange={e => {handleChange(e,1)}} value={firstName} type={"text"}/>
            <InputField placeholder={"Enter Referal Code"} name={referal} onChange={e => handleChange(e,4)} value={referal} type={"text"}/>
            <Button type="primary" htmlType="submit" disabled={flagValid ? false : true}>
              Signup
            </Button>
          </Form> 
        </div> : <Navigate to="/login"/>
      }
    </>
  );
}

export default connect()(Signup)