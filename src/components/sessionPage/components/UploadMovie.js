import React, { useState } from 'react';
// import Parse from 'parse';
import { Typography, Button } from '@material-ui/core';
import Progress from './Progress';

// function upload(state_user, state_commerce_id, movie) {
//     var file = new Parse.File(movie.name, movie);
//     var video_commerce = new Parse.Object("Commerce_Videos");

//     if (state_user) {
//         // var counter = 0;
//         this.intervalId = setInterval(() => {
//             // counter++;
//         }, 1000);

//         file.save()
//             .then((_file) => {
//                 video_commerce.set("nameVideo", movie.name);
//                 video_commerce.set("video", _file);
//                 video_commerce.set("leCommerce", Parse.Object.extend("Commerce").createWithoutData(state_commerce_id));
//                 video_commerce.save()
//                     .then((_) => {
//                         clearInterval(this.intervalId);
//                     })
//             }, (error) => {
//                 console.error(error);
//             })
//     } else {
        
//     }
// }

// function onUpload(event) {
//     if (event.target.files.length === 1) {
        
//     } else {
        
//     }
// }

export default function UploadMovie() {

    // const dispatch = useDispatch();

    const [count, setCount] = useState(0);

    return (
        <div style={{padding: '10px'}}>
            <div>
                <Typography>Ajouter une vidéo</Typography>
                {/* <FormControl>
                    <InputLabel htmlFor="my-input">Email address</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text"/>
                    <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                </FormControl> */}
            </div>
            <div style={{background: 'red', width: '100%', height: '200px'}} onClick={() => setCount(count + 1)}>
                Cliquer Ici pour ajouter une vidéo {' '+count}
            </div>
            <Button onClick={() => {console.log("click "+count)}}>Click</Button>
            {
                count % 2 === 0 ? (
                    <div></div>
                ) : (
                    <Progress/>
                )
            }
        </div>
    )
}