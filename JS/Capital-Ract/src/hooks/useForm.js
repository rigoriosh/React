import { useState } from "react"


export const useForm = (initialState) => {

    //console.log(initialState)
    /* 
        en el initial state debe venir

        const [fieldsLogin, handledInputChange] = useForm(
        {
            email:'',
            password: ''
        });
    const {email, password} = fieldsLogin;

    <form onSubmit={handleLogin}

    <input type="text" className="form-control" placeholder="Drink name" required name="name" value={name}/>
     */
    
    const [fields, setfields] = useState(initialState)

    const resetFields = () => {
        setfields(initialState);
    }

    const handledInputChange = ({target}) => {
        //console.log(target.value)
        setfields(
            {
                ...fields, [target.name]: target.value
            }
        )
        
    }


    return [fields, handledInputChange, resetFields]
}
