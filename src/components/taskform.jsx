import {useState ,useEffect} from "react";
import {Card, Typography, CardContent, TextField, Grid, Button, CircularProgress} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom'

export default function tasKForm () {
    
    const [task, setTask] = useState({
        title:'',
        description:''
    });

    const [loading, setLoading] = useState(false);
    const [editar, setEditar] = useState(false);

    const navegacion = useNavigate();
    const parametro = useParams();
    
    const btnChange = (e) => 
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    

    const submitBtn= async (e) => {
        e.preventDefault();
        setLoading(true)

        if(editar){
        const response = await fetch(`http://localhost:4000/tasks/${parametro.id}`, {
                method: "PUT",
                headers: {
                    "Content-type":"application/json",
                },
                body: JSON.stringify(task),

            });
            // const data = await response.json();
            // console.log(data);
        }else{

        await fetch('http://localhost:4000/tasks', {
            method:'POST',
            body: JSON.stringify(task),
            headers: {"Content-Type": "application/json"},
        });
        }
        setLoading(false);
        navegacion('/');
    };


        


    const loadTask =async(id) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`)
    const data =await res.json()
    setTask({title: data.title, description: data.description})
    setEditar(true)
    };

    useEffect(() =>{
        if(parametro.id){
            loadTask(parametro.id);
        }
    }, [parametro.id])



    return (
    <Grid container direction="column" alignItems="center" justifyContent="center">
        <Grid item xs={3}> 
            <Card sx={{ mt: 5 }} style={{backgroundColor: "#1e272e", padding: "1rem"}}>
                <Typography variant="5" textAlign="center" color="white">
                    {editar ? "editar" : "crear"}
                </Typography>
                <CardContent>
                    <form onSubmit={submitBtn}>
                        <TextField value={task.title} variant="filled" label="write your title" sx={{display:"block", margin:".5rem 0"}} name="title" onChange={btnChange} inputProps={{style:{color:"white"}}} InputLabelProps={{style:{color:"white"}}}/>

                        <TextField value={task.description} variant="filled" label="write your description" multiline rows={4} sx={{display:"block", margin:".5ren 0"}} name="description" onChange={btnChange} inputProps={{style:{color:"white"}}} InputLabelProps={{style:{color:"white"}}}/>

                        <Button variant="contained" color="primary" type="submit" disabled={!task.title || !task.description}>{loading ?( <CircularProgress color="inherit" size={24}/>) : ( "Save")}</Button>

                        
                    </form>
                </CardContent>
            </Card>
        </Grid>
    </Grid>

    )
}
