import React,{useState,useContext} from 'react';
import {Link, useHistory} from "react-router-dom";
import M from "materialize-css"
import {UserContext} from '../../App'


const Signin = () => {
    const {state,dispatch} = useContext(UserContext);
    const history=useHistory();
    const [password ,setPassword]=useState("");
    const [email ,setEmail]=useState("");
   
    const PostData= () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
           return M.toast({html:"Invaild email",classes:"#c62828 red darken-3"})
            
        }

        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data => {
            if(data.error){    
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
                
            }else{
                // console.log(data);
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "Signedin Success",classes:"#43a047 green darken-3"})
                history.push('/')
            }
        }).catch(err =>{
            console.log(err,email);
        })
    }



    return (
        <div className="mycard">
            <div className="card authcard input-field">
                <h2>Instagram</h2>
                 <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                 onClick={()=>PostData()}
                >
                   SIGNIN
                </button>
                <h6>
                    <Link to="./signup">Dont have an account?</Link>
                </h6>

            </div>
        </div>
    )
}

export default Signin;