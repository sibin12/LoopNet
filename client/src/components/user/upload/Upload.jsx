import React, { useEffect, useState, useRef } from 'react'
import styled from '@emotion/styled'
import CloseIcon from '@mui/icons-material/Close';
import app from "../../../firebase/config";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useSelector } from 'react-redux';
import { videoInstance } from '../../../utils/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



const Container = styled.div`
width:100%;
height:100%;
position:absolute;
top:0;
left:0;
background-color:#000000a7;
display:flex;
align-items:center;
justify-content: center;
`
const Wrapper = styled.div`
z-index:2;
width:600px;
height:630px;
background-color:lightblue;
// background-color:${({ theme }) => theme.bgLighter};
// color:${({ theme }) => theme.text};
padding:20px;
flex-direction:column;
gap:20px;
position:relative;
 ` ;

const Close = styled.div`
 position: absolute;
 top:10px;
 right:10px;
 cursor:pointer;
 `;

const Title = styled.h1`
 `;

const Input = styled.input`
 display:flex;
 width:96%;
 border: 1px solid ${({ theme }) => theme.soft};
 color: ${({ theme }) => theme.text};
border-radius:3px;
padding:10px;
background-color:transparent;
margin-top:10px;
 `;

const Desc = styled.textarea`
 border: 1px solid ${({ theme }) => theme.soft};
 color: ${({ theme }) => theme.text};
border-radius:3px;
padding:10px;
width:96%;
margin-top:10px;
background-color:transparent;
 `;

const Button = styled.button`
border-radius:8px;
border:none;
padding:10px 20px;
font-weight: 500;
cursor: pointer;
margin-top:10px;
background-color:${({theme})=> theme.soft};
color:${({theme})=> theme.text};
`;
const Label = styled.label`
padding:10px;
font-weight: 300;
cursor: pointer;
color:${({theme})=> theme.text};
`;

const Img = styled.img`
width:200px;
height:150px;
`
const Crop = styled.div`
width:230px;
height:180px;
`

const Icon = styled.span`
display:flex;
`

function Upload({ setOpen }) {

    const {user} =useSelector((state)=> state.auth)

    const [img, setImg] = useState(undefined)
    const [video, setVideo] = useState(undefined)
    const [imgPerc, setImgPerc] = useState(0)
    const [videoPerc, setVideoPerc] = useState(0)
    const [inputs, setInputs] = useState({})
    const [tags, setTags] = useState([])
    const [fileValidationErr, setFileValidationErr] = useState('')
    const navigate = useNavigate()


/////////////////////////
const [src, setSrc] = useState(null);
// const [crop, setCrop] = useState({ aspect: 16 / 9 });
const [image, setImage] = useState(null);
const [output, setOutput] = useState(null);


/////////////////////////////
    const handleChange = (e)=>{
        setInputs((prev)=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    const handleTags = (e)=>{
        
        setTags(e.target.value.split(","));
    }
    
    const uploadFile = (file, urlType) =>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file?.name;
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file);
        

        // Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
(snapshot) => {
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//   console.log('Upload is ' + progress + '% done');

urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress))
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
    default:
        break;  
  }
}, 
(err) => {
    toast.error(err.message || 'An error occurred.');
    console.log(err.message)
},
  
() => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setInputs((prev)=>{
            return {...prev, [urlType]:downloadURL}
        })    });
  }

);


    }



    const validateImageFile = (file) => {
      if (!file) {
        toast.error('Please select an image file.')
        // setFileValidationErr('Please select an image file.');
        return false;
      }
  
      const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const fileExtension = file.name.split('.').pop().toLowerCase();
  
      if (!allowedExtensions.includes(fileExtension)) {
        toast.error('Only JPG, JPEG, PNG, or GIF images are allowed.');

        // setFileValidationErr('Only JPG, JPEG, PNG, or GIF images are allowed.');
        return false;
      }
  
      if (file.size > 5 * 1024 * 1024) {
        setFileValidationErr('Image size must be less than 5MB.');
        return false;
      }
  
      setFileValidationErr(''); // Clear any previous validation errors
      return true;
    };
  
    const handleImageFileChange = (e) => {
      const selectedFile = e.target.files[0];
  
      if (validateImageFile(selectedFile)) {
        setImg(selectedFile);
  
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          setSrc(reader.result);
        });
        reader.readAsDataURL(selectedFile);
      }
    };


    const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ unit: '%', width: 50, height: 50 });
  const [croppedImage, setCroppedImage] = useState(null);
  const imageRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageLoaded = (image) => {
    imageRef.current = image;
  };

  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const handleCropComplete = () => {
    console.log('handleCrop😊');
    makeClientCrop();
  };

  const makeClientCrop = async () => {
    console.log('enter😊');
    if (imageRef.current && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImage();
      // console.log(croppedImageUrl,'yes i got it 😘');
      setCroppedImage(croppedImageUrl);
    }
  };
  console.log(croppedImage,'yes i got it 😘💕👌');
  const getCroppedImage = () => {
    return new Promise((resolve) => {
      const image = imageRef.current;
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext('2d');

      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );

      canvas.toBlob((blob) => {
        resolve(URL.createObjectURL(blob));
      });
    });
  };

    useEffect(() => { video && uploadFile(video, "videoUrl") }, [video]);

    useEffect(()=>{ img && uploadFile(img, "imgUrl") }, [img]);

    const handleUpload = async (e)=>{
       e.preventDefault();
       if (!validateImageFile(img)) {
        return ; // Don't proceed with the upload if the image is invalid
      }
         
          videoInstance.post('/',{...inputs, user, tags})
          .then((res)=>{
            console.log(res.data, "response data in uploading");
            setOpen(false)
            if (res.status === 200) {
                navigate(`/video/${res.data._id}`);
              }
          })
          .catch((err)=>{
            toast.error(err.message || 'An error occurred.');
          })

    }

    const handleDelete =()=>{
        console.log("delete the image");
        setImg("")
        setImgPerc("")
        setSrc("")

    }
  
    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}><CloseIcon /></Close>
                <Title>Upload a new video</Title>
                <Label>video:</Label>
                {videoPerc>0 ? ("Uploading:" + videoPerc +"%"):
                (
                   <Input type='file'
                    accept='video/*'
                    onChange={(e)=> setVideo(e.target.files[0])} 
                    />
                )}
                <Input type='text' placeholder='Title'
                name='title'
                onChange={handleChange}
                />
                <Desc placeholder='Description' rows={8}
                name='desc'
                onChange={handleChange}
                />
                <Input type='text' placeholder='Separate the tags with commas.' 
                onChange={handleTags}
                />
                <Label>thumbail image: {imgPerc > 0 ? ("Uploading:" + imgPerc + "%"):"0%"}</Label>
                
                
                    {/* <Input type='file' accept='image/*'
                    onChange={(e)=>{
                      console.log(e.target.files[0]);
                      return selectImage(e.target.files[0])}}
 /> */}
   <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {selectedImage && (
        <div>
          <h2>Selected Image:</h2>
          {/* <img src={selectedImage} alt="Selected" style={{ maxWidth: '30%' }} /> */}
          <h2>Manual Crop:</h2>
          <ReactCrop
            src={selectedImage}
            crop={crop}
            onImageLoaded={handleImageLoaded}
            onChange={handleCropChange}
            onComplete={handleCropComplete}
          />
          {croppedImage && (
            <div>
              <h2>Cropped Image:</h2>
              <img src={croppedImage} alt="Cropped"  />
            </div>
          )}
        </div>
      )}
    </div>
          {fileValidationErr && (
          <p style={{ color: 'red' }}>{fileValidationErr}</p>
        )}
            {/* <Icon  onClick={handleDelete}> 
                           {src && <HighlightOffIcon /> }
                    </Icon>
                 
      {src && <Img src={src}  
      />         }  */}

                <Button onClick={handleUpload}>Upload</Button>
            </Wrapper>

        </Container>
    )
}

export default Upload
