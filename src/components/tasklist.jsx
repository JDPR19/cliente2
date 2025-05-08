
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Card, Typography, CardContent, TextField, Grid, Button, CircularProgress} from '@mui/material';

export default function tasKList () {
    
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    
    
    const loadTasks = async () => {
        const response = await fetch('https://servidor-production-7090.up.railway.app/tasks');
        const data = await response.json()
        setTasks(data)
    }

    const eliminaTarea = async (id) =>{
    try {
        await fetch(`https://servidor-production-7090.up.railway.app/tasks/${id}`, {
            method: "DELETE",
        })
        setTasks(
            tasks.filter(task => task.id !== id)
        );

    } catch (error) {
        console.log(error);
    }
    };



    useEffect(() => {
        loadTasks();
}, []);
    
    
    return (
        <>
        <h1>Lista</h1>
        {tasks.map((task) => (
                <Card key={task.id} style={{
                    marginBottom:".7rem",
                    backgroundColor:"#343434"
                }}>
                    <CardContent style={{
                        display:'flex',
                        justifyContent:'space-between'
                    }}>
                        <div style={{color:"white"}}>
                        <Typography>{task.title}</Typography>
                        <Typography>{task.description}</Typography>
                        </div>
                        <div>
                            <Button variant='contained' color='inherit' onClick={() => navigate(`/tasks/${task.id}/edit`)}>
                                edit
                            </Button>
                                
                            <Button variant='contained' color='warning' onClick={() => eliminaTarea(task.id)} style={{marginLeft:".5rem"}}>
                                delete
                            </Button>
                        </div>
                    
                    </CardContent>
                </Card>
            ))}
        
        </>
    );
}

