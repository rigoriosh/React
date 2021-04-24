import { useState } from "react";


export const HomeE2 = () => {

    const [newTask, setNewTask] = useState('');
    return (
        <>
            <hr/>
            <form >
                <input type="text" className="form-control"
                    onChange={({target}) => setNewTask(target.value)}/>
            </form>

            <pre>{JSON.stringify(newTask)}</pre>
        </>
    )
}
